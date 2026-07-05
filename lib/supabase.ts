import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Demo } from './demos';

/**
 * BLUEGRASS DIGITAL FORGE — Supabase Integration
 *
 * Primary persistence target for Admin panel CRUD (forge_demos table + "demos" Storage bucket).
 * Also used (read-only) by public pages (home + /work) as live optional source.
 *
 * CRITICAL SAFETY (per project rules — DO NOT BREAK):
 * - Supabase is PRIMARY for new/edited demo saves from Admin.
 * - localStorage + DEFAULT_DEMOS remain FULLY FUNCTIONAL as fallback.
 * - If Supabase client missing, any write/read fails, or network error → silently use localStorage path.
 * - getPublicDemos() and public hardcoded DEFAULT_DEMOS are NEVER touched.
 * - Existing admin UI, password gate, export-to-ts, JSON import/export, reset — all preserved.
 * - Drag & drop image: attempts Supabase Storage first → returns public URL. Falls back to base64 data URL.
 *
 * Table: "forge_demos"
 * Recommended columns: id (text PK), title, slug, category, href, description, image, sort_order (int), visible (bool)
 * Flexible read mapper supports camelCase / snake_case variants.
 *
 * Storage: bucket named exactly "demos" (make public, configure anon INSERT/SELECT policies for demo-images/*).
 *
 * Use NEXT_PUBLIC_ keys only.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false, // public demo reads only, no sessions needed
        },
      })
    : null;

/** Shared robust row → Demo mapper. Supports common column name variants. */
function mapRowToDemo(row: any): Demo {
  const get = (keys: string[], fallback: any = undefined) => {
    for (const k of keys) {
      if (row[k] != null) return row[k];
    }
    return fallback;
  };

  const sortOrderRaw = get(['sortOrder', 'sort_order', 'sortorder', 'order'], 99);
  const visibleRaw = get(['visible', 'is_visible', 'Visible'], true);

  return {
    id: String(get(['id', 'ID', 'uuid'], `sb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)),
    title: String(get(['title', 'Title', 'name'], '')),
    slug: String(get(['slug', 'Slug'], '')),
    category: String(get(['category', 'Category', 'type'], 'Other')),
    href: String(get(['href', 'url', 'link', 'Href'], '')),
    description: String(get(['description', 'Description', 'desc', 'short_desc'], '')),
    image: get(['image', 'Image', 'thumbnail', 'thumb', 'img']) || undefined,
    sortOrder: Number(sortOrderRaw) || 99,
    visible: visibleRaw === true || visibleRaw === 'true' || visibleRaw === 1 || visibleRaw === 't',
  };
}

/**
 * New function: getDemosFromSupabase()
 * Fetches visible demos from the forge_demos table.
 * Returns Demo[] on success with rows, or null on any error/empty/misconfig.
 * Never throws to callers — always allows safe fallback.
 */
export async function getDemosFromSupabase(): Promise<Demo[] | null> {
  if (!supabase) {
    // No keys configured — silently use existing system (local DEFAULT_DEMOS)
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('forge_demos')
      .select('*');

    if (error) {
      console.warn('[Supabase] Query error (will fallback):', error.message);
      return null;
    }

    if (!Array.isArray(data) || data.length === 0) {
      // Empty table is valid but we fall back so public site is never blank
      return null;
    }

    const mapped = data
      .map(mapRowToDemo)
      .filter((d) => d.visible && d.title.trim() && d.href.trim())
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return mapped.length > 0 ? mapped : null;
  } catch (err) {
    console.warn('[Supabase] getDemosFromSupabase failed gracefully (fallback to local demos):', err);
    return null;
  }
}

/**
 * Admin-specific fetch: returns ALL rows (visible + hidden) for the full admin table.
 * Returns Demo[] on success (may be empty), or null on config/error/network.
 * Does NOT fallback or filter — caller (admin) decides what to show.
 */
export async function getAllDemosFromSupabase(): Promise<Demo[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('forge_demos')
      .select('*');

    if (error) {
      console.warn('[Supabase] getAllDemosFromSupabase error (fallback to localStorage):', error.message);
      return null;
    }

    if (!Array.isArray(data)) return [];
    const mapped = data.map(mapRowToDemo).sort((a, b) => a.sortOrder - b.sortOrder);
    return mapped;
  } catch (err) {
    console.warn('[Supabase] getAllDemosFromSupabase failed (will use localStorage):', err);
    return null;
  }
}

/**
 * Drag & drop / file image upload → Supabase Storage bucket "demos".
 * Returns a public https URL on success. Returns null on any failure.
 * Caller (admin) MUST fallback to base64 data URL when this returns null.
 */
export async function uploadImageToDemosBucket(file: File): Promise<string | null> {
  if (!supabase) {
    console.warn('[Supabase] Storage upload skipped — no client configured (base64 fallback)');
    return null;
  }
  try {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    const path = `demo-images/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safe}`;

    const { data, error } = await supabase.storage
      .from('demos')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.warn('[Supabase] Storage upload error (using base64 fallback):', error.message);
      return null;
    }

    const { data: pub } = supabase.storage.from('demos').getPublicUrl(path);
    return pub?.publicUrl ?? null;
  } catch (err) {
    console.warn('[Supabase] uploadImageToDemosBucket exception (base64 fallback):', err);
    return null;
  }
}

/**
 * Primary save path for Admin: insert or update a full Demo row.
 * Uses upsert on "id". Writes sort_order + visible (snake) + other fields.
 * Returns true on success. Never throws — caller falls back to localStorage.
 */
export async function upsertDemoToSupabase(demo: Demo): Promise<boolean> {
  if (!supabase) return false;
  try {
    const row = {
      id: demo.id,
      title: demo.title,
      slug: demo.slug,
      category: demo.category,
      href: demo.href,
      description: demo.description || '',
      image: demo.image || null,
      sort_order: demo.sortOrder,
      visible: !!demo.visible,
    };
    const { error } = await supabase
      .from('forge_demos')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] upsertDemoToSupabase error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] upsertDemoToSupabase exception (LS fallback active):', err);
    return false;
  }
}

/**
 * Delete by id from Supabase (primary). Returns true on success.
 * Admin always also keeps a localStorage backup copy.
 */
export async function deleteDemoFromSupabase(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('forge_demos')
      .delete()
      .eq('id', id);
    if (error) {
      console.warn('[Supabase] deleteDemoFromSupabase error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] deleteDemoFromSupabase exception:', err);
    return false;
  }
}

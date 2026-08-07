import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Demo } from './demos';

/**
 * BLUEGRASS DIGITAL FORGE — Supabase Integration
 *
 * Primary persistence for Admin CRUD (forge_demos table + "demos" Storage bucket).
 * Public pages read live data when available; localStorage/IndexedDB remain fallbacks.
 */

// NEXT_PUBLIC_* must live in project-root .env.local (next to package.json).
// Next.js does not load env files from subfolders such as supabase/.
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();

/** Runtime NEXT_PUBLIC_SUPABASE_URL (empty string if unset). Safe to surface in admin diagnostics. */
export const publicSupabaseUrl = supabaseUrl;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null =
  isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

// Server-side Supabase client that uses the service role key when available.
// Use this in server API routes that require elevated privileges (analytics, admin uploads, etc.).
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || '';

export const supabaseServer: SupabaseClient | null =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

export type SupabaseError = {
  code: string;
  message: string;
  hint?: string;
  details?: string;
};

export type SupabaseResult<T> = {
  ok: boolean;
  data: T | null;
  error: SupabaseError | null;
  configured: boolean;
};

export type SupabaseConnectionStatus = {
  configured: boolean;
  connected: boolean;
  rowCount: number | null;
  error: SupabaseError | null;
};

export type BulkSyncResult = {
  ok: boolean;
  upserted: number;
  deleted: number;
  error: SupabaseError | null;
};

function toSupabaseError(err: unknown, fallbackCode = 'unknown'): SupabaseError {
  if (err && typeof err === 'object') {
    const e = err as Record<string, unknown>;
    return {
      code: String(e.code ?? fallbackCode),
      message: String(e.message ?? 'Unknown Supabase error'),
      hint: e.hint != null ? String(e.hint) : undefined,
      details: e.details != null ? String(e.details) : undefined,
    };
  }
  return { code: fallbackCode, message: String(err) };
}

function success<T>(data: T, configured = true): SupabaseResult<T> {
  return { ok: true, data, error: null, configured };
}

function failure<T>(error: SupabaseError, configured = true): SupabaseResult<T> {
  console.error(`[Supabase] ${error.code}: ${error.message}`, error.hint ?? '');
  return { ok: false, data: null, error, configured };
}

function notConfigured<T>(): SupabaseResult<T> {
  return {
    ok: false,
    data: null,
    error: {
      code: 'not_configured',
      message: 'Supabase keys missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local',
    },
    configured: false,
  };
}

/** Shared row → Demo mapper. Supports camelCase / snake_case variants. */
function mapRowToDemo(row: Record<string, unknown>): Demo {
  const get = (keys: string[], fallback: unknown = undefined) => {
    for (const k of keys) {
      if (row[k] != null) return row[k];
    }
    return fallback;
  };

  const sortOrderRaw = get(['sortOrder', 'sort_order', 'sortorder', 'order'], 99);
  const sortOrder = Number(sortOrderRaw) || 99;
  const visibleRaw = get(['visible', 'is_visible', 'Visible'], true);
  const featuredRaw = get(['featured', 'is_featured', 'Featured'], undefined);

  // When featured column is missing/null, treat first 4 by sortOrder as featured (legacy back-compat)
  let featured: boolean;
  if (featuredRaw === true || featuredRaw === 'true' || featuredRaw === 1 || featuredRaw === 't') {
    featured = true;
  } else if (featuredRaw === false || featuredRaw === 'false' || featuredRaw === 0 || featuredRaw === 'f') {
    featured = false;
  } else {
    featured = sortOrder > 0 && sortOrder <= 4;
  }

  const imageAltRaw = get(['imageAlt', 'image_alt', 'alt'], undefined);
  const imageAlt =
    typeof imageAltRaw === 'string' && imageAltRaw.trim()
      ? imageAltRaw.trim()
      : undefined;

  return {
    id: String(get(['id', 'ID', 'uuid'], `sb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)),
    title: String(get(['title', 'Title', 'name'], '')),
    slug: String(get(['slug', 'Slug'], '')),
    category: String(get(['category', 'Category', 'type'], 'Other')),
    href: String(get(['href', 'url', 'link', 'Href'], '')),
    description: String(get(['description', 'Description', 'desc', 'short_desc'], '')),
    image: (get(['image', 'Image', 'thumbnail', 'thumb', 'img']) as string | undefined) || undefined,
    imageAlt,
    sortOrder,
    visible: visibleRaw === true || visibleRaw === 'true' || visibleRaw === 1 || visibleRaw === 't',
    featured,
  };
}

function demoToRow(
  demo: Demo,
  options: { includeFeatured?: boolean; includeImageAlt?: boolean } = {}
): Record<string, unknown> {
  const { includeFeatured = true, includeImageAlt = true } = options;
  const row: Record<string, unknown> = {
    id: demo.id,
    title: demo.title,
    slug: demo.slug,
    category: demo.category,
    href: demo.href,
    description: demo.description || '',
    image: demo.image?.startsWith('data:') ? null : (demo.image || null),
    sort_order: demo.sortOrder,
    visible: !!demo.visible,
  };
  if (includeFeatured) {
    row.featured = !!demo.featured;
  }
  if (includeImageAlt) {
    row.image_alt = demo.imageAlt?.trim() || null;
  }
  return row;
}

/** True when PostgREST rejects the row because a column is not migrated yet. */
function isMissingColumnError(
  error: { message?: string; code?: string } | null,
  column: string
): boolean {
  if (!error) return false;
  const msg = (error.message || '').toLowerCase();
  return (
    msg.includes(column.toLowerCase()) &&
    (msg.includes('column') || msg.includes('schema cache') || msg.includes('could not find'))
  );
}

function isMissingFeaturedColumnError(error: { message?: string; code?: string } | null): boolean {
  return isMissingColumnError(error, 'featured');
}

function isMissingImageAltColumnError(error: { message?: string; code?: string } | null): boolean {
  return isMissingColumnError(error, 'image_alt');
}

/** Setting key for ordered homepage Featured Work slugs (max FEATURED_HOMEPAGE_LIMIT). */
export const HOMEPAGE_FEATURED_SLUGS_KEY = 'homepage_featured_slugs';

/**
 * Read ordered homepage featured slugs from forge_settings.
 * Returns null when unset / table missing / not configured (caller uses fallbacks).
 */
export async function getHomepageFeaturedSlugsFromSupabase(): Promise<SupabaseResult<string[] | null>> {
  if (!supabase) return notConfigured();

  try {
    const { data, error } = await supabase
      .from('forge_settings')
      .select('value')
      .eq('key', HOMEPAGE_FEATURED_SLUGS_KEY)
      .maybeSingle();

    if (error) {
      // Table may not exist yet — treat as empty so defaults apply
      if (
        error.message?.toLowerCase().includes('forge_settings') ||
        error.code === '42P01' ||
        error.message?.toLowerCase().includes('schema cache')
      ) {
        return success(null);
      }
      return failure(toSupabaseError(error));
    }

    if (!data?.value) return success(null);

    const raw = data.value;
    const list = Array.isArray(raw)
      ? raw
      : typeof raw === 'object' && raw !== null && Array.isArray((raw as { slugs?: unknown }).slugs)
        ? (raw as { slugs: unknown[] }).slugs
        : null;

    if (!list) return success(null);

    const slugs = list
      .map((s) => String(s || '').trim().toLowerCase())
      .filter(Boolean);

    return success(slugs.length > 0 ? slugs : null);
  } catch (err) {
    return failure(toSupabaseError(err, 'settings_read'));
  }
}

/**
 * Persist ordered homepage featured slugs (up to 6) in forge_settings.
 */
export async function setHomepageFeaturedSlugsInSupabase(
  slugs: string[]
): Promise<SupabaseResult<string[]>> {
  if (!supabase) return notConfigured();

  const cleaned = [
    ...new Set(
      slugs
        .map((s) => String(s || '').trim().toLowerCase())
        .filter(Boolean)
    ),
  ].slice(0, 6);

  try {
    const { error } = await supabase.from('forge_settings').upsert(
      {
        key: HOMEPAGE_FEATURED_SLUGS_KEY,
        value: cleaned,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );

    if (error) {
      return failure({
        ...toSupabaseError(error),
        hint:
          error.message?.toLowerCase().includes('forge_settings')
            ? 'Run forge_settings migration in supabase/schema.sql'
            : undefined,
      });
    }

    return success(cleaned);
  } catch (err) {
    return failure(toSupabaseError(err, 'settings_write'));
  }
}

/** Quick health check — verifies table access and returns row count. */
export async function checkSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  if (!supabase) {
    return { configured: false, connected: false, rowCount: null, error: notConfigured().error };
  }

  try {
    const { count, error } = await supabase
      .from('forge_demos')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return { configured: true, connected: false, rowCount: null, error: toSupabaseError(error) };
    }
    return { configured: true, connected: true, rowCount: count ?? 0, error: null };
  } catch (err) {
    return { configured: true, connected: false, rowCount: null, error: toSupabaseError(err, 'network') };
  }
}

/** Public: visible demos only. Returns null on error/misconfig so callers can fallback. */
export async function getDemosFromSupabase(): Promise<Demo[] | null> {
  const result = await getAllDemosFromSupabaseResult();
  if (!result.ok || !result.data) return null;

  const visible = result.data
    .filter((d) => d.visible && d.title.trim() && d.href.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return visible.length > 0 ? visible : null;
}

/** Admin fetch with structured result. */
export async function getAllDemosFromSupabaseResult(): Promise<SupabaseResult<Demo[]>> {
  if (!supabase) return notConfigured();

  try {
    const { data, error } = await supabase.from('forge_demos').select('*');

    if (error) return failure(toSupabaseError(error));
    if (!Array.isArray(data)) return success([]);

    const mapped = data
      .map((row) => mapRowToDemo(row as Record<string, unknown>))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return success(mapped);
  } catch (err) {
    return failure(toSupabaseError(err, 'fetch_exception'));
  }
}

/** Back-compat wrapper used by demos.ts */
export async function getAllDemosFromSupabase(): Promise<Demo[] | null> {
  const result = await getAllDemosFromSupabaseResult();
  return result.ok ? result.data : null;
}

export async function uploadImageToDemosBucket(file: File): Promise<SupabaseResult<string>> {
  const shouldUseServerUpload = process.env.NODE_ENV === 'production' || !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabase || shouldUseServerUpload) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/supabase/upload', {
        method: 'POST',
        body: formData,
      });
      const json = (await response.json()) as { ok?: boolean; url?: string; error?: string; code?: string };

      if (!response.ok || !json.ok || !json.url) {
        return failure({
          code: json.code || 'storage_upload',
          message: json.error || 'Image upload failed through the server endpoint',
        });
      }

      return success(json.url);
    } catch (err) {
      return failure(toSupabaseError(err, 'storage_exception'));
    }
  }

  try {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    const path = `demo-images/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safe}`;

    const { error } = await supabase.storage
      .from('demos')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (error) return failure(toSupabaseError(error, 'storage_upload'));

    const { data: pub } = supabase.storage.from('demos').getPublicUrl(path);
    const url = pub?.publicUrl;
    if (!url) {
      return failure({ code: 'storage_url', message: 'Upload succeeded but public URL was empty' });
    }
    return success(url);
  } catch (err) {
    return failure(toSupabaseError(err, 'storage_exception'));
  }
}

export async function upsertDemoToSupabaseResult(demo: Demo): Promise<SupabaseResult<Demo>> {
  if (!supabase) return notConfigured();

  if (demo.image?.startsWith('data:')) {
    return failure({
      code: 'base64_rejected',
      message: 'Base64 images cannot be saved to Supabase. Upload to Storage or use an /assets/ path.',
      hint: 'Use drag-and-drop upload or enter /assets/demo-name.jpg',
    });
  }

  try {
    let options = { includeFeatured: true, includeImageAlt: true };
    let { error } = await supabase
      .from('forge_demos')
      .upsert(demoToRow(demo, options), { onConflict: 'id' });

    // Graceful path until migrations run: strip missing optional columns and retry
    if (error && isMissingImageAltColumnError(error)) {
      options = { ...options, includeImageAlt: false };
      ({ error } = await supabase
        .from('forge_demos')
        .upsert(demoToRow(demo, options), { onConflict: 'id' }));
    }

    if (error && isMissingFeaturedColumnError(error)) {
      options = { ...options, includeFeatured: false };
      ({ error } = await supabase
        .from('forge_demos')
        .upsert(demoToRow(demo, options), { onConflict: 'id' }));
    }

    if (error) return failure(toSupabaseError(error, 'upsert'));
    return success(demo);
  } catch (err) {
    return failure(toSupabaseError(err, 'upsert_exception'));
  }
}

/** Back-compat boolean wrapper */
export async function upsertDemoToSupabase(demo: Demo): Promise<boolean> {
  const result = await upsertDemoToSupabaseResult(demo);
  return result.ok;
}

export async function deleteDemoFromSupabaseResult(id: string): Promise<SupabaseResult<true>> {
  if (!supabase) return notConfigured();

  try {
    // .select('id') returns deleted rows — without it PostgREST reports success even when
    // RLS blocks the delete or the id does not exist (0 rows removed).
    const { data, error } = await supabase
      .from('forge_demos')
      .delete()
      .eq('id', id)
      .select('id');

    if (error) return failure(toSupabaseError(error, 'delete'));

    if (!data || data.length === 0) {
      return failure({
        code: 'delete_no_rows',
        message: `No row deleted for id "${id}". The demo may not exist in forge_demos, or the DELETE policy blocked removal.`,
        hint: 'Run supabase/schema.sql in the Supabase SQL Editor — ensure forge_demos_anon_delete policy exists.',
      });
    }

    return success(true);
  } catch (err) {
    return failure(toSupabaseError(err, 'delete_exception'));
  }
}

export async function deleteDemoFromSupabase(id: string): Promise<boolean> {
  const result = await deleteDemoFromSupabaseResult(id);
  return result.ok;
}

/** Bulk upsert all demos — used by Force Sync and JSON import. */
export async function bulkUpsertDemosToSupabase(demos: Demo[]): Promise<BulkSyncResult> {
  if (!supabase) {
    return {
      ok: false,
      upserted: 0,
      deleted: 0,
      error: notConfigured().error,
    };
  }

  const baseDemos = demos.filter((d) => !d.image?.startsWith('data:'));

  if (baseDemos.length === 0 && demos.length > 0) {
    return {
      ok: false,
      upserted: 0,
      deleted: 0,
      error: {
        code: 'base64_only',
        message: 'All demos have base64 images. Upload images to Supabase Storage first.',
      },
    };
  }

  try {
    let options = { includeFeatured: true, includeImageAlt: true };
    let rows = baseDemos.map((d) => demoToRow(d, options));
    let { error } = await supabase.from('forge_demos').upsert(rows, { onConflict: 'id' });

    if (error && isMissingImageAltColumnError(error)) {
      options = { ...options, includeImageAlt: false };
      rows = baseDemos.map((d) => demoToRow(d, options));
      ({ error } = await supabase.from('forge_demos').upsert(rows, { onConflict: 'id' }));
    }

    if (error && isMissingFeaturedColumnError(error)) {
      options = { ...options, includeFeatured: false };
      rows = baseDemos.map((d) => demoToRow(d, options));
      ({ error } = await supabase.from('forge_demos').upsert(rows, { onConflict: 'id' }));
      if (!error) {
        console.warn(
          '[Supabase] forge_demos.featured column missing — synced without it. Run migration in supabase/schema.sql.'
        );
      }
    }

    if (error) {
      const supaErr = toSupabaseError(error, 'bulk_upsert');
      console.error('[Supabase] bulkUpsert failed:', supaErr);
      return { ok: false, upserted: 0, deleted: 0, error: supaErr };
    }

    return { ok: true, upserted: rows.length, deleted: 0, error: null };
  } catch (err) {
    const supaErr = toSupabaseError(err, 'bulk_upsert_exception');
    return { ok: false, upserted: 0, deleted: 0, error: supaErr };
  }
}

/** Full sync: upsert all current demos, remove Supabase rows not in the list. */
export async function syncAllDemosToSupabase(demos: Demo[]): Promise<BulkSyncResult> {
  const upsertResult = await bulkUpsertDemosToSupabase(demos);
  if (!upsertResult.ok || !supabase) return upsertResult;

  const keepIds = new Set(demos.map((d) => d.id));

  try {
    const { data: existing, error: fetchErr } = await supabase.from('forge_demos').select('id');
    if (fetchErr) {
      return {
        ...upsertResult,
        error: toSupabaseError(fetchErr, 'sync_fetch'),
      };
    }

    const orphanIds = (existing ?? [])
      .map((r) => String((r as { id: string }).id))
      .filter((id) => !keepIds.has(id));

    if (orphanIds.length === 0) {
      return { ...upsertResult, deleted: 0 };
    }

    const { data: deletedRows, error: deleteErr } = await supabase
      .from('forge_demos')
      .delete()
      .in('id', orphanIds)
      .select('id');

    if (deleteErr) {
      return {
        ...upsertResult,
        error: toSupabaseError(deleteErr, 'sync_delete'),
      };
    }

    const deletedCount = deletedRows?.length ?? 0;
    if (deletedCount < orphanIds.length) {
      const removed = new Set((deletedRows ?? []).map((r) => String((r as { id: string }).id)));
      const stillPresent = orphanIds.filter((id) => !removed.has(id));
      return {
        ...upsertResult,
        deleted: deletedCount,
        error: {
          code: 'sync_delete_partial',
          message: `Only ${deletedCount} of ${orphanIds.length} orphan row(s) deleted from Supabase.`,
          hint: stillPresent.length
            ? `Still present: ${stillPresent.slice(0, 5).join(', ')}${stillPresent.length > 5 ? '…' : ''}. Check forge_demos DELETE RLS policy.`
            : 'Check forge_demos DELETE RLS policy (see supabase/schema.sql).',
        },
      };
    }

    return { ...upsertResult, deleted: deletedCount };
  } catch (err) {
    return {
      ...upsertResult,
      error: toSupabaseError(err, 'sync_exception'),
    };
  }
}
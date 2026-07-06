import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Demo } from './demos';

/**
 * BLUEGRASS DIGITAL FORGE — Supabase Integration
 *
 * Primary persistence for Admin CRUD (forge_demos table + "demos" Storage bucket).
 * Public pages read live data when available; localStorage/IndexedDB remain fallbacks.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
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
  const visibleRaw = get(['visible', 'is_visible', 'Visible'], true);

  return {
    id: String(get(['id', 'ID', 'uuid'], `sb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)),
    title: String(get(['title', 'Title', 'name'], '')),
    slug: String(get(['slug', 'Slug'], '')),
    category: String(get(['category', 'Category', 'type'], 'Other')),
    href: String(get(['href', 'url', 'link', 'Href'], '')),
    description: String(get(['description', 'Description', 'desc', 'short_desc'], '')),
    image: (get(['image', 'Image', 'thumbnail', 'thumb', 'img']) as string | undefined) || undefined,
    sortOrder: Number(sortOrderRaw) || 99,
    visible: visibleRaw === true || visibleRaw === 'true' || visibleRaw === 1 || visibleRaw === 't',
  };
}

function demoToRow(demo: Demo): Record<string, unknown> {
  return {
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
  if (!supabase) return notConfigured();

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
    const { error } = await supabase
      .from('forge_demos')
      .upsert(demoToRow(demo), { onConflict: 'id' });

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

  const rows = demos
    .filter((d) => !d.image?.startsWith('data:'))
    .map(demoToRow);

  if (rows.length === 0 && demos.length > 0) {
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
    const { error } = await supabase
      .from('forge_demos')
      .upsert(rows, { onConflict: 'id' });

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
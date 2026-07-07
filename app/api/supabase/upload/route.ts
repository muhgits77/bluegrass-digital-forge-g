import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && (serviceRoleKey || anonKey)
  ? createClient(supabaseUrl, serviceRoleKey || anonKey, {
      auth: { persistSession: false },
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: 'Missing upload file', code: 'missing_file' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Supabase is not configured on the server. Add SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL.',
          code: 'not_configured',
        },
        { status: 500 }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    const path = `demo-images/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`;
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes], { type: file.type || 'application/octet-stream' });

    const { error } = await supabase.storage.from('demos').upload(path, blob, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, code: error.name || 'storage_upload' },
        { status: 500 }
      );
    }

    const { data: pub } = supabase.storage.from('demos').getPublicUrl(path);
    if (!pub?.publicUrl) {
      return NextResponse.json(
        { ok: false, error: 'Upload succeeded but no public URL was returned', code: 'storage_url' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url: pub.publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown upload error';
    return NextResponse.json({ ok: false, error: message, code: 'upload_exception' }, { status: 500 });
  }
}

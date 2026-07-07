import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Prefer the shared server-side Supabase client from `lib/supabase.ts`.
const supabase = supabaseServer;

const CANDIDATES = ["analytics", "page_views", "site_analytics", "events"];

// Simple in-memory cache to reduce provider load. TTL configurable via ANALYTICS_CACHE_TTL_MS (ms).
const CACHE_TTL = parseInt(process.env.ANALYTICS_CACHE_TTL_MS || "300000", 10); // default 5 minutes
const CACHE = new Map<string, { ts: number; payload: any }>();

async function tryTable(table: string, since?: Date) {
  if (!supabase) return null;
  try {
    // total rows (within range if since provided)
    let total = 0;
    if (since) {
      const head = await supabase.from(table).select("id", { head: true, count: "exact" }).gte("created_at", since.toISOString());
      if (head.error) throw head.error;
      total = head.count ?? 0;
    } else {
      const head = await supabase.from(table).select("id", { head: true, count: "exact" });
      if (head.error) throw head.error;
      total = head.count ?? 0;
    }

    // unique visitors since date — best-effort: fetch up to 5000 recent rows and compute unique visitor_id
    const { data: recent, error: recentErr } = await supabase
      .from(table)
      .select("visitor_id, created_at")
      .gte("created_at", (since || new Date(0)).toISOString())
      .order("created_at", { ascending: false })
      .limit(5000);

    if (recentErr) throw recentErr;
    const uniq = new Set((recent || []).map((r: any) => r.visitor_id).filter(Boolean));

    return { table, totalViews: total, uniqueVisitors: uniq.size };
  } catch (err) {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const range = url.searchParams.get("range") || "30d";
    const cacheKey = `summary:${range}`;

    // Return cached response when fresh
    const cached = CACHE.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json(cached.payload);
    }

    // determine since date by range
    let since = new Date();
    if (range === "24h") {
      since = new Date(Date.now() - 24 * 3600 * 1000);
    } else if (range === "7d") {
      since = new Date(Date.now() - 7 * 24 * 3600 * 1000);
    } else {
      since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    }

    for (const t of CANDIDATES) {
      const res = await tryTable(t, since);
      if (res) {
        const out = { ok: true, provider: "supabase", table: t, summary: { totalViews: res.totalViews, uniqueVisitors: res.uniqueVisitors } };
        CACHE.set(cacheKey, { ts: Date.now(), payload: out });
        return NextResponse.json(out);
      }
    }

    // Fallback mock data
    const mockTotal = 12432;
    const mockUnique = 3187;
    const out = { ok: true, provider: "mock", summary: { totalViews: mockTotal, uniqueVisitors: mockUnique } };
    CACHE.set(cacheKey, { ts: Date.now(), payload: out });
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Prefer the shared server-side Supabase client from `lib/supabase.ts`.
const supabase = supabaseServer;

const CANDIDATES = ["analytics", "page_views", "site_analytics", "events"];

// Simple in-memory cache to reduce provider load. TTL configurable via ANALYTICS_CACHE_TTL_MS (ms).
const CACHE_TTL = parseInt(process.env.ANALYTICS_CACHE_TTL_MS || "300000", 10); // default 5 minutes
let CACHE: { ts: number; payload: any } | null = null;

async function tryTable(table: string) {
  if (!supabase) return null;
  try {
    // total rows
    const head = await supabase.from(table).select("id", { head: true, count: "exact" });
    if (head.error) throw head.error;
    const total = head.count ?? 0;

    // unique visitors last 30 days — best-effort: fetch up to 2000 recent rows and compute unique visitor_id
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const { data: recent, error: recentErr } = await supabase
      .from(table)
      .select("visitor_id, created_at")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false })
      .limit(2000);

    if (recentErr) throw recentErr;
    const uniq = new Set((recent || []).map((r: any) => r.visitor_id).filter(Boolean));

    return { table, totalViews: total, uniqueVisitors30d: uniq.size };
  } catch (err) {
    return null;
  }
}

export async function GET() {
  // Return cached response when fresh
  if (CACHE && Date.now() - CACHE.ts < CACHE_TTL) {
    return NextResponse.json(CACHE.payload);
  }
  try {
    for (const t of CANDIDATES) {
      const res = await tryTable(t);
      if (res) {
        const out = { ok: true, provider: "supabase", table: t, summary: { totalViews: res.totalViews, uniqueVisitors30d: res.uniqueVisitors30d } };
        CACHE = { ts: Date.now(), payload: out };
        return NextResponse.json(out);
      }
    }

    // If Supabase is configured but no analytics table found, we can optionally fallback
    // to a provider like PostHog here. PostHog proxying is left as a configurable extension.

    // Fallback mock data
    const mockTotal = 12432;
    const mockUnique = 3187;
    const out = { ok: true, provider: "mock", summary: { totalViews: mockTotal, uniqueVisitors30d: mockUnique } };
    CACHE = { ts: Date.now(), payload: out };
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Prefer shared server client; falls back to null when service role not present.
const supabase = supabaseServer;

const CANDIDATES = ["analytics", "page_views", "site_analytics", "events"];

// Cache: configurable TTL via ANALYTICS_CACHE_TTL_MS (ms). Default 5 minutes.
const CACHE_TTL = parseInt(process.env.ANALYTICS_CACHE_TTL_MS || "300000", 10);
const CACHE = new Map<string, { ts: number; payload: any }>();

function buildBuckets(range: string) {
  const now = new Date();
  if (range === "24h") {
    // hourly buckets, last 24 hours
    return Array.from({ length: 24 }).map((_, i) => {
      const d = new Date(Date.now() - (23 - i) * 3600 * 1000);
      return { key: d.toISOString().slice(0, 13), date: d.toISOString() };
    });
  }
  const days = range === "7d" ? 7 : 30;
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return { key: d.toISOString().slice(0, 10), date: d.toISOString().slice(0, 10) };
  });
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const range = url.searchParams.get("range") || "30d";
    const cacheKey = `visits:${range}`;

    const cached = CACHE.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json(cached.payload);
    }

    // determine since
    let since: Date;
    if (range === "24h") {
      since = new Date(Date.now() - 24 * 3600 * 1000);
    } else if (range === "7d") {
      since = new Date(Date.now() - 7 * 24 * 3600 * 1000);
    } else {
      since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    }

    // Try Supabase tables for visits data
    if (supabase) {
      for (const t of CANDIDATES) {
        try {
          const { data, error } = await supabase
            .from(t)
            .select("created_at")
            .gte("created_at", since.toISOString())
            .order("created_at", { ascending: true })
            .limit(10000);

          if (error) continue;
          if (!data || data.length === 0) continue;

          const buckets = buildBuckets(range);
          const counts: Record<string, number> = {};
          for (const row of data as any[]) {
            const d = new Date(row.created_at);
            const key = range === "24h" ? d.toISOString().slice(0, 13) : d.toISOString().slice(0, 10);
            counts[key] = (counts[key] || 0) + 1;
          }

          const points = buckets.map((b) => ({ date: b.date, value: counts[b.key] || 0 }));
          const out = { ok: true, provider: "supabase", table: t, visits: points };
          CACHE.set(cacheKey, { ts: Date.now(), payload: out });
          return NextResponse.json(out);
        } catch (e) {
          continue;
        }
      }
    }

    // Fallback mock visits
    const buckets = buildBuckets(range);
    const mock = buckets.map((b, i) => ({ date: b.date, value: Math.max(1, Math.round(30 + Math.sin(i / 3) * 10 + Math.random() * 16)) }));
    const out = { ok: true, provider: "mock", visits: mock };
    CACHE.set(cacheKey, { ts: Date.now(), payload: out });
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

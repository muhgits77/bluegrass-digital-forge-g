import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Prefer shared server client; falls back to null when service role not present.
const supabase = supabaseServer;

const CANDIDATES = ["analytics", "page_views", "site_analytics", "events"];

// Cache: configurable TTL via ANALYTICS_CACHE_TTL_MS (ms). Default 5 minutes.
const CACHE_TTL = parseInt(process.env.ANALYTICS_CACHE_TTL_MS || "300000", 10);
let CACHE: { ts: number; payload: any } | null = null;

export async function GET() {
  if (CACHE && Date.now() - CACHE.ts < CACHE_TTL) {
    return NextResponse.json(CACHE.payload);
  }
  try {
    // Try Supabase tables for visits-by-day data
    if (supabase) {
      const since = new Date();
      since.setDate(since.getDate() - 29); // last 30 days
      for (const t of CANDIDATES) {
        try {
          const { data, error } = await supabase
            .from(t)
            .select("created_at")
            .gte("created_at", since.toISOString())
            .order("created_at", { ascending: true })
            .limit(5000);

          if (error) continue;
          if (!data || data.length === 0) continue;

          // Aggregate counts per day
          const counts: Record<string, number> = {};
          for (const row of data as any[]) {
            const d = new Date(row.created_at).toISOString().slice(0, 10);
            counts[d] = (counts[d] || 0) + 1;
          }
          const days = Array.from({ length: 30 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            const key = d.toISOString().slice(0, 10);
            return { date: key, value: counts[key] || 0 };
          });

          const out = { ok: true, provider: "supabase", table: t, visits: days };
          CACHE = { ts: Date.now(), payload: out };
          return NextResponse.json(out);
        } catch (e) {
          continue;
        }
      }
    }

    // Fallback mock visits (smooth curve)
    const days = 30;
    const mock = Array.from({ length: days }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return { date: d.toISOString().slice(0, 10), value: Math.max(5, Math.round(40 + Math.sin(i / 3) * 12 + Math.random() * 18)) };
    });
    const out = { ok: true, provider: "mock", visits: mock };
    CACHE = { ts: Date.now(), payload: out };
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

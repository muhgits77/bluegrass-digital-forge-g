import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Prefer shared server client; falls back to null when service role key absent.
const supabase = supabaseServer;

const CANDIDATES = ["analytics", "page_views", "site_analytics", "events"];

// In-memory cache with configurable TTL via ANALYTICS_CACHE_TTL_MS (ms). Default 5 minutes.
const CACHE_TTL = parseInt(process.env.ANALYTICS_CACHE_TTL_MS || "300000", 10);
let CACHE: { ts: number; payload: any } | null = null;

export async function GET() {
  if (CACHE && Date.now() - CACHE.ts < CACHE_TTL) {
    return NextResponse.json(CACHE.payload);
  }
  try {
    if (supabase) {
      for (const t of CANDIDATES) {
        try {
          // Attempt to query demo_slug or path fields
          const { data, error } = await supabase
            .from(t)
            .select("demo_slug, path, href")
            .order("created_at", { ascending: false })
            .limit(5000);

          if (error) continue;
          if (!data || data.length === 0) continue;

          const counts: Record<string, number> = {};
          for (const row of data as any[]) {
            const key = row.demo_slug || row.path || row.href || "unknown";
            counts[key] = (counts[key] || 0) + 1;
          }
          const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => ({ title: k, views: v }));
          const out = { ok: true, provider: "supabase", table: t, top: sorted };
          CACHE = { ts: Date.now(), payload: out };
          return NextResponse.json(out);
        } catch (e) {
          continue;
        }
      }
    }

    // Mock top demos
    const mock = [
      { title: "Hickory Forge Steakhouse", views: 432 },
      { title: "Smoky Wheels", views: 378 },
      { title: "Fiesta Taqueria", views: 289 },
      { title: "Bluegrass Fence Co.", views: 210 },
      { title: "Anchorline Guide Service", views: 198 },
    ];
    const out = { ok: true, provider: "mock", top: mock };
    CACHE = { ts: Date.now(), payload: out };
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

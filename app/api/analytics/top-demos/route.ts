import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Prefer shared server client; falls back to null when service role key absent.
const supabase = supabaseServer;

const CANDIDATES = ["analytics", "page_views", "site_analytics", "events"];

// In-memory cache with configurable TTL via ANALYTICS_CACHE_TTL_MS (ms). Default 5 minutes.
const CACHE_TTL = parseInt(process.env.ANALYTICS_CACHE_TTL_MS || "300000", 10);
const CACHE = new Map<string, { ts: number; payload: any }>();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const range = url.searchParams.get("range") || "30d";
    const cacheKey = `top:${range}`;

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

    if (supabase) {
      for (const t of CANDIDATES) {
        try {
          // Attempt to query demo_slug or path fields filtered by date
          const { data, error } = await supabase
            .from(t)
            .select("demo_slug, path, href")
            .gte("created_at", since.toISOString())
            .order("created_at", { ascending: false })
            .limit(10000);

          if (error) continue;
          if (!data || data.length === 0) continue;

          const counts: Record<string, number> = {};
          for (const row of data as any[]) {
            const key = row.demo_slug || row.path || row.href || "unknown";
            counts[key] = (counts[key] || 0) + 1;
          }
          const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => ({ title: k, views: v }));
          const out = { ok: true, provider: "supabase", table: t, top: sorted };
          CACHE.set(cacheKey, { ts: Date.now(), payload: out });
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
    CACHE.set(cacheKey, { ts: Date.now(), payload: out });
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

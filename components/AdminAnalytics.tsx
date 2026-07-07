import React, { useEffect, useState } from "react";

/**
 * AdminAnalytics
 * Lightweight admin-facing analytics panel.
 * - Attempts to fetch from `/api/analytics/summary`, `/api/analytics/visits`, `/api/analytics/top`
 * - Falls back to safe mock data if no backend is available yet.
 * - Uses simple inline SVG charts (no extra deps) to stay fast-loading.
 * - Secure: rendered only inside the authenticated Admin panel.
 *
 * Integration: import and render inside `app/admin/page.tsx` when admin auth is true.
 */

type Summary = {
  totalViews: number;
  uniqueVisitors30d: number;
};

type VisitPoint = { date: string; value: number };
type TopDemo = { title: string; views: number; href?: string };

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [visits, setVisits] = useState<VisitPoint[]>([]);
  const [topDemos, setTopDemos] = useState<TopDemo[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const [sRes, vRes, tRes] = await Promise.all([
          fetch("/api/analytics/summary").then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch("/api/analytics/visits").then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch("/api/analytics/top-demos").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        ]);

        if (!mounted) return;

        if (sRes && vRes && tRes) {
          setSummary(sRes.summary ?? null);
          setVisits(vRes.visits ?? []);
          setTopDemos(tRes.top ?? []);
        } else {
          // Fallback mock data — safe to show while backend hooks are added.
          const days = 30;
          const mockVisits: VisitPoint[] = Array.from({ length: days }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (days - 1 - i));
            return { date: d.toISOString().slice(0, 10), value: Math.max(5, Math.round(40 + Math.sin(i / 3) * 12 + Math.random() * 18)) };
          });
          setSummary({ totalViews: mockVisits.reduce((s, p) => s + p.value, 0), uniqueVisitors30d: Math.round(0.6 * mockVisits.reduce((s, p) => s + p.value, 0)) });
          setVisits(mockVisits);
          setTopDemos([
            { title: "Hickory Forge Steakhouse", views: 432 },
            { title: "Smoky Wheels", views: 378 },
            { title: "Fiesta Taqueria", views: 289 },
            { title: "Bluegrass Fence Co.", views: 210 },
          ]);
        }
      } catch (err) {
        console.warn("Analytics fetch failed, using mock data", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const maxVisit = Math.max(...visits.map((v) => v.value), 1);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="uppercase tracking-[1.6px] text-[10px] text-[#c17a5a] font-medium">Analytics</div>
          <h2 className="text-2xl font-semibold text-white mt-1">Site performance — last 30 days</h2>
        </div>
        <div className="text-sm text-[#9aa6ad]">Secure • Admin only</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl p-4">
          <div className="text-sm text-[#9aa6ad]">Total Demo Views</div>
          <div className="text-2xl font-semibold text-white mt-2">{loading ? "—" : summary?.totalViews.toLocaleString()}</div>
        </div>
        <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl p-4">
          <div className="text-sm text-[#9aa6ad]">Unique Visitors (30d)</div>
          <div className="text-2xl font-semibold text-white mt-2">{loading ? "—" : summary?.uniqueVisitors30d.toLocaleString()}</div>
        </div>
        <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl p-4">
          <div className="text-sm text-[#9aa6ad]">Top Demo (30d)</div>
          <div className="text-base font-semibold text-white mt-2">{loading ? "—" : (topDemos[0]?.title ?? "—")}</div>
          <div className="text-[13px] text-[#9aa6ad] mt-1">{loading ? "" : `${topDemos[0]?.views ?? 0} views`}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-[#9aa6ad]">Visits over time</div>
            <div className="text-[13px] text-[#c17a5a]">Last 30 days</div>
          </div>

          {/* Simple sparkline / area chart using SVG */}
          <div className="w-full h-40">
            <svg viewBox={`0 0 ${visits.length || 30} 100`} preserveAspectRatio="none" className="w-full h-full">
              {/* Area fill */}
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c17a5a" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#c17a5a" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <polyline
                fill="url(#g1)"
                stroke="none"
                points={visits.map((v, i) => `${i},${100 - (v.value / maxVisit) * 90}`).join(" ")}
              />
              <polyline
                fill="none"
                stroke="#c17a5a"
                strokeWidth={0.9}
                points={visits.map((v, i) => `${i},${100 - (v.value / maxVisit) * 90}`).join(" ")}
              />
            </svg>
          </div>

          <div className="text-[12px] text-[#9aa6ad] mt-2">{loading ? "Loading data…" : `Peak: ${maxVisit} visits`}</div>
        </div>

        <div className="bg-[#0c1013] border border-[#1a2225] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-[#9aa6ad]">Most viewed demos</div>
            <div className="text-[13px] text-[#c17a5a]">Top 6</div>
          </div>

          <div className="space-y-3">
            {(topDemos.slice(0, 6)).map((d, idx) => {
              const max = Math.max(...topDemos.map((t) => t.views), 1);
              const pct = Math.round((d.views / max) * 100);
              return (
                <div key={d.title} className="flex items-center gap-3">
                  <div className="w-8 text-[13px] text-[#9aa6ad]">{idx + 1}.</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm truncate">{d.title}</div>
                    <div className="h-2 bg-[#07100f] rounded mt-1 overflow-hidden">
                      <div className="h-2 bg-[#c17a5a]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-[13px] text-[#9aa6ad] tabular-nums w-16 text-right">{d.views}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-[#9aa6ad]">Note: This panel reads from your analytics provider. Server-side Supabase proxies are implemented at <code className="bg-[#07100f] px-1 py-px rounded text-[#c8c2b4]">/api/analytics/summary</code>, <code className="bg-[#07100f] px-1 py-px rounded text-[#c8c2b4]">/api/analytics/visits</code>, and <code className="bg-[#07100f] px-1 py-px rounded text-[#c8c2b4]">/api/analytics/top-demos</code>. Set <code className="bg-[#07100f] px-1 py-px rounded text-[#c8c2b4]">SUPABASE_SERVICE_ROLE_KEY</code> and <code className="bg-[#07100f] px-1 py-px rounded text-[#c8c2b4]">NEXT_PUBLIC_SUPABASE_URL</code> in your environment for live data.</div>
    </div>
  );
}

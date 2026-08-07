import React, { useEffect, useState } from "react";

/**
 * AdminAnalytics
 * - Fetches click-focused GA4 metrics from `/api/analytics/ga4-clicks`
 * - Falls back to safe mock metrics in development or when GA4 is not configured.
 * - Exposes click counts for demo cards, quote requests, top clicked demos, and referrer sources.
 */

type TopDemo = { title: string; clicks: number; path?: string };
type Referrer = { source: string; clicks: number };
type AnalyticsData = {
  demoClicks: number;
  quoteClicks: number;
  totalClicks: number;
  topDemos: TopDemo[];
  topReferrers: Referrer[];
};

const MOCK_DATA: AnalyticsData = {
  demoClicks: 378,
  quoteClicks: 92,
  totalClicks: 720,
  topDemos: [
    { title: "Hickory Forge Steakhouse", clicks: 142, path: "/templates/steakhouse" },
    { title: "Fiesta Taqueria", clicks: 118, path: "/templates/mexican" },
    { title: "Cumberland Smash", clicks: 96, path: "/templates/food-truck" },
    { title: "Bluegrass Fence Co.", clicks: 78, path: "/templates/fencing" },
    { title: "Anchorline Guide Service", clicks: 64, path: "/templates/outdoor" },
  ],
  topReferrers: [
    { source: "google.com", clicks: 194 },
    { source: "facebook.com", clicks: 148 },
    { source: "bing.com", clicks: 78 },
    { source: "newsletter", clicks: 62 },
    { source: "direct", clicks: 54 },
  ],
};

export default function AdminAnalytics() {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("30d");
  const [data, setData] = useState<AnalyticsData>(MOCK_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics/ga4-clicks?range=${range}`);
        if (!mounted) return;

        if (res.ok) {
          const payload = await res.json();
          if (payload?.ok && payload?.analytics) {
            setData(payload.analytics);
          } else {
            setData(MOCK_DATA);
          }
        } else {
          setData(MOCK_DATA);
        }
      } catch (error) {
        console.warn("GA4 analytics fetch failed", error);
        if (mounted) setData(MOCK_DATA);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [range]);

  const buttons = [
    { key: "24h", label: "24 hours" },
    { key: "7d", label: "7 days" },
    { key: "30d", label: "30 days" },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="uppercase tracking-wider text-[11px] text-[#c17a5a] font-semibold">Click Insights</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white leading-tight">Demo click performance — {range === "24h" ? "Last 24 hours" : range === "7d" ? "Last 7 days" : "Last 30 days"}</h2>
        </div>

        <div role="tablist" aria-label="Analytics time range" className="inline-flex rounded-full bg-[#07100f] border border-[#1a2225] p-1">
          {buttons.map((button) => {
            const active = range === button.key;
            return (
              <button
                key={button.key}
                type="button"
                role="tab"
                aria-pressed={active}
                onClick={() => setRange(button.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${active ? "bg-[#c17a5a] text-black" : "text-[#c8c2b4] hover:bg-white/10"}`}
              >
                {button.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3 mb-6">
        <div className="rounded-3xl border border-[#1a2225] bg-[#0a0f12] p-6 shadow-[0_22px_60px_rgba(2,6,23,0.55)]">
          <div className="text-sm text-[#9aa6ad]">Demo Card Clicks</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="text-4xl font-extrabold text-white tabular-nums">{loading ? "—" : data.demoClicks.toLocaleString()}</div>
            <span className="inline-flex rounded-full bg-[#c17a5a]/15 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#f3d7b4]">Open live site</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#8d9ca2]">How many times visitors opened a live demo from the card CTA.</p>
        </div>

        <div className="rounded-3xl border border-[#1a2225] bg-[#0a0f12] p-6 shadow-[0_22px_60px_rgba(2,6,23,0.55)]">
          <div className="text-sm text-[#9aa6ad]">Quote Button Clicks</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="text-4xl font-extrabold text-white tabular-nums">{loading ? "—" : data.quoteClicks.toLocaleString()}</div>
            <span className="inline-flex rounded-full bg-[#c17a5a]/15 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#f3d7b4]">Get Custom Quote</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#8d9ca2]">Quote CTA interaction volume from the admin and public experience.</p>
        </div>

        <div className="rounded-3xl border border-[#1a2225] bg-[#0a0f12] p-6 shadow-[0_22px_60px_rgba(2,6,23,0.55)]">
          <div className="text-sm text-[#9aa6ad]">Total Click Signals</div>
          <div className="mt-4 text-4xl font-extrabold text-white tabular-nums">{loading ? "—" : data.totalClicks.toLocaleString()}</div>
          <p className="mt-3 text-sm leading-6 text-[#8d9ca2]">A broad indicator of CTA interest across demos and quote actions.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-[#1a2225] bg-[#0a0f12] p-6 shadow-[0_22px_60px_rgba(2,6,23,0.55)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c17a5a]">Top clicked demos</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Top 5 demos by click volume</h3>
            </div>
            <span className="rounded-full bg-[#c17a5a]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f3d7b4]">{range === "24h" ? "24h" : range === "7d" ? "7d" : "30d"}</span>
          </div>

          <div className="space-y-4">
            {data.topDemos.map((demo, index) => {
              const max = Math.max(...data.topDemos.map((item) => item.clicks), 1);
              const width = Math.round((demo.clicks / max) * 100);
              return (
                <div key={demo.title} className="rounded-3xl bg-[#07100f] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{index + 1}. {demo.title}</p>
                      {demo.path ? <p className="mt-1 text-xs text-[#8d9ca2] truncate">{demo.path}</p> : null}
                    </div>
                    <div className="text-sm font-semibold text-[#c17a5a] tabular-nums">{demo.clicks}</div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-[#c17a5a]" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="rounded-3xl border border-[#1a2225] bg-[#0a0f12] p-6 shadow-[0_22px_60px_rgba(2,6,23,0.55)]">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c17a5a]">Top referrers</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Traffic sources</h3>
          </div>

          <div className="space-y-4">
            {data.topReferrers.map((referrer) => (
              <div key={referrer.source} className="flex items-center justify-between gap-3 rounded-3xl bg-[#07100f] p-4">
                <div>
                  <p className="text-sm font-medium text-white">{referrer.source}</p>
                  <p className="mt-1 text-xs text-[#8d9ca2]">{Math.round((referrer.clicks / Math.max(data.totalClicks, 1)) * 100)}% of click traffic</p>
                </div>
                <div className="text-sm font-semibold text-[#c17a5a] tabular-nums">{referrer.clicks}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-6 rounded-3xl border border-[#1a2225] bg-[#07100f]/50 p-5 text-sm text-[#b1b8be]">
        <p className="font-semibold text-[#f3d7b4]">GA4 service account setup</p>
        <p className="mt-3 leading-7">
          To enable live GA4 analytics, set these environment variables:
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-5 text-[#9aa6ad]">
          <li><code className="rounded bg-[#0b1418] px-1 py-px">GOOGLE_SERVICE_ACCOUNT_EMAIL</code></li>
          <li><code className="rounded bg-[#0b1418] px-1 py-px">GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code> (preserve newline escapes as <code className="rounded bg-[#0b1418] px-1 py-px">\n</code>)</li>
          <li><code className="rounded bg-[#0b1418] px-1 py-px">GOOGLE_GA4_PROPERTY_ID</code></li>
          <li><code className="rounded bg-[#0b1418] px-1 py-px">GOOGLE_GA4_DEMO_CLICK_EVENT_NAMES</code> (optional)</li>
          <li><code className="rounded bg-[#0b1418] px-1 py-px">GOOGLE_GA4_QUOTE_CLICK_EVENT_NAMES</code> (optional)</li>
        </ul>
        <p className="mt-3 leading-7 text-[#8d9ca2]">
          The service account needs Analytics Data API access for your GA4 property. If the API is not configured, the panel continues to show mock fallback data.
        </p>
      </div>
    </div>
  );
}

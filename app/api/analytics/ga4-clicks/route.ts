import { NextResponse } from "next/server";
import crypto from "crypto";

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
const GA4_PROPERTY_ID = process.env.GOOGLE_GA4_PROPERTY_ID;
const DEMO_CLICK_EVENT_NAMES = (process.env.GOOGLE_GA4_DEMO_CLICK_EVENT_NAMES || "open_live_site,click_demo,demo_click").split(",").map((s) => s.trim()).filter(Boolean);
const QUOTE_CLICK_EVENT_NAMES = (process.env.GOOGLE_GA4_QUOTE_CLICK_EVENT_NAMES || "get_custom_quote,quote_click,click_quote").split(",").map((s) => s.trim()).filter(Boolean);
const CLICK_EVENT_NAMES = Array.from(new Set([...DEMO_CLICK_EVENT_NAMES, ...QUOTE_CLICK_EVENT_NAMES]));

const MOCK_RESPONSE = {
  ok: true,
  provider: "mock",
  analytics: {
    demoClicks: 378,
    quoteClicks: 92,
    totalClicks: 720,
    topDemos: [
      { title: "Hickory Forge Steakhouse", clicks: 142, path: "/templates/steakhouse" },
      { title: "Smoky Wheels", clicks: 118, path: "/templates/food-truck" },
      { title: "Fiesta Taqueria", clicks: 96, path: "/templates/mexican" },
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
  },
};

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function getDateRange(range: string) {
  if (range === "24h") {
    return { startDate: "yesterday", endDate: "today" };
  }
  if (range === "7d") {
    return { startDate: "7daysAgo", endDate: "today" };
  }
  return { startDate: "30daysAgo", endDate: "today" };
}

function buildEventFilter(eventNames: string[]) {
  return {
    orGroup: {
      expressions: eventNames.map((eventName) => ({
        filter: {
          fieldName: "eventName",
          stringFilter: {
            matchType: "EXACT",
            value: eventName,
          },
        },
      })),
    },
  };
}

function buildReportBody(range: string, dimensions: Array<{ name: string }>, eventNames: string[]) {
  return {
    dateRanges: [getDateRange(range)],
    dimensions,
    metrics: [{ name: "eventCount" }],
    dimensionFilter: buildEventFilter(eventNames),
    limit: 50,
    orderBys: [
      {
        metric: { metricName: "eventCount" },
        desc: true,
      },
    ],
  };
}

function parseRows(rows: any[], keyIndex = 0) {
  return rows.reduce((acc: Record<string, number>, row) => {
    const key = row.dimensionValues?.[keyIndex]?.value?.trim() || "unknown";
    const count = parseInt(row.metricValues?.[0]?.value ?? "0", 10);
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + count;
    return acc;
  }, {});
}

async function getGoogleAccessToken() {
  if (!SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error("Missing Google service account credentials");
  }

  const key = SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n");
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: SERVICE_ACCOUNT_EMAIL,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );

  const unsignedJwt = `${header}.${payload}`;
  const signature = crypto.createSign("RSA-SHA256").update(unsignedJwt).sign(key, "base64");
  const signedJwt = `${unsignedJwt}.${base64UrlEncode(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Google token request failed: ${tokenRes.status} ${text}`);
  }

  const tokenJson = await tokenRes.json();
  if (!tokenJson.access_token) {
    throw new Error(`Google token response missing access_token: ${JSON.stringify(tokenJson)}`);
  }

  return tokenJson.access_token as string;
}

async function runReport(accessToken: string, propertyId: string, body: any) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA4 report failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function GET(request: Request) {
  try {
    if (!SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_PRIVATE_KEY || !GA4_PROPERTY_ID) {
      return NextResponse.json(MOCK_RESPONSE);
    }

    const url = new URL(request.url);
    const range = (url.searchParams.get("range") || "30d") as "24h" | "7d" | "30d";
    const accessToken = await getGoogleAccessToken();

    const [eventReport, demoReport, referrerReport] = await Promise.all([
      runReport(accessToken, GA4_PROPERTY_ID, buildReportBody(range, [{ name: "eventName" }], CLICK_EVENT_NAMES)),
      runReport(accessToken, GA4_PROPERTY_ID, buildReportBody(range, [{ name: "pagePath" }], DEMO_CLICK_EVENT_NAMES)),
      runReport(accessToken, GA4_PROPERTY_ID, buildReportBody(range, [{ name: "sourceMedium" }], CLICK_EVENT_NAMES)),
    ]);

    const events = parseRows(eventReport.rows || []);
    const demos = parseRows(demoReport.rows || []);
    const sources = parseRows(referrerReport.rows || []);

    const demoClicks = DEMO_CLICK_EVENT_NAMES.reduce((sum, eventName) => sum + (events[eventName] || 0), 0);
    const quoteClicks = QUOTE_CLICK_EVENT_NAMES.reduce((sum, eventName) => sum + (events[eventName] || 0), 0);
    const totalClicks = Object.values(events).reduce((sum, value) => sum + value, 0);

    const topDemos = Object.entries(demos)
      .filter(([path]) => path && path !== "unknown")
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path, clicks]) => ({ title: path.replace(/\/\/?templates\//, ""), clicks, path }));

    const topReferrers = Object.entries(sources)
      .filter(([source]) => source && source !== "unknown")
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, clicks]) => ({ source, clicks }));

    const analytics = {
      demoClicks,
      quoteClicks,
      totalClicks,
      topDemos: topDemos.length > 0 ? topDemos : MOCK_RESPONSE.analytics.topDemos,
      topReferrers: topReferrers.length > 0 ? topReferrers : MOCK_RESPONSE.analytics.topReferrers,
    };

    return NextResponse.json({ ok: true, provider: "ga4", analytics });
  } catch (error) {
    console.warn("GA4 click analytics fallback", error);
    return NextResponse.json(MOCK_RESPONSE);
  }
}

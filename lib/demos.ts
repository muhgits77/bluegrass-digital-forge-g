/**
 * BLUEGRASS DIGITAL FORGE — Demo Management
 * 
 * Shared data layer for public homepage / work pages and the /admin panel.
 *
 * PUBLIC DEMOS (CRITICAL — UNCHANGED):
 *   - getPublicDemos() ALWAYS returns the hardcoded DEFAULT_DEMOS array below.
 *   - Public pages (/, /work) use this + optional live Supabase via getDemosFromSupabase().
 *   - To permanently bake changes: use Admin "Export to demos.ts" → paste into this file.
 *
 * ADMIN PANEL (Supabase primary + lightweight local backup):
 *   - getDemos(), addDemo(), updateDemo(), deleteDemo() write to Supabase FIRST (forge_demos).
 *   - localStorage stores minimal metadata only (no base64). Full copy in IndexedDB.
 *   - On Supabase failure → surfaces error to admin UI; IndexedDB/localStorage used for read fallback.
 *   - forceSyncToSupabase() bulk-pushes all demos; "Force Sync" in admin panel.
 *   - Drag & drop images → Supabase Storage "demos" bucket. Base64 never saved to Supabase.
 *
 * Fields used by cards: title, href (url), description (short), category (badge), image (thumbnail).
 * Featured Work (homepage): demos with featured=true, sorted by sortOrder, max FEATURED_HOMEPAGE_LIMIT.
 * All existing demos preserved exactly.
 *
 * Follows Master Project Settings + Critical Safety Rules.
 */

/** How many featured cards the homepage "Featured Work" section shows. */
export const FEATURED_HOMEPAGE_LIMIT = 6;

/**
 * Exact homepage Featured Work order (slug list wins over featured flags / remote data).
 * Bluegrass Market & Mercantile and other Tier 2 demos must never appear here.
 */
export const HOMEPAGE_FEATURED_SLUGS = [
  "fiesta-taqueria",
  "truckdash",
  "blue-door-smokehouse",
  "anchorline-guide-service",
  "bluegrass-fence-co",
  "ignite-fitness-company",
] as const;

/**
 * Curated placement tiers for /work grid grouping.
 * Tier 1 = primary examples · Tier 2 = supporting · else = more examples.
 * Keys are demo slugs (TruckDash uses slug "truckdash").
 */
export const WORK_TIER1_SLUGS = [
  "fiesta-taqueria",
  "smoky-wheels",
  "cumberland-smash",
  "cluckin-chaos",
  "sea-island-soul",
  "truckdash",
  "blue-door-smokehouse",
  "hickory-forge-steakhouse",
  "anchorline-guide-service",
  "bluegrass-fence-co",
  "ignite-fitness-company",
  "ridge-pasture-care",
] as const;

export const WORK_TIER2_SLUGS = [
  "bluegrass-market-mercantile",
  "bourbon-ridge-artisan-studio",
  "lakeside-harmony-massage",
  "la-hacienda-cumberland",
  "sunny-hollow-donut-dash",
  "landing-point-bait-tackle",
] as const;

import type {
  SupabaseConnectionStatus,
  BulkSyncResult,
  SupabaseError,
} from './supabase';
import {
  saveBackup,
  loadMinimalBackup,
  loadFullBackup,
  clearLocalBackups,
  getStorageStatus,
  type StorageStatus,
  type SaveBackupResult,
} from './demoStorage';
import { hasDemoLanding } from './demoLandings';

/**
 * Dynamic import keeps @supabase/supabase-js out of the public homepage bundle.
 * Admin/API paths still load it on demand when these helpers run.
 */
async function supabaseApi() {
  return import('./supabase');
}

export interface Demo {
  id: string;
  title: string;
  slug: string;
  /** Badge label on the card (e.g. "Food Truck", "Restaurant"). */
  category: string;
  href: string;
  /** Subtitle / short description shown under the title. */
  description: string;
  image?: string; // Can be /assets/... path, Supabase Storage public URL, or base64 (fallback only)
  /**
   * SEO image alt: "[Business type] website demo for [location] — [key feature]".
   * Falls back to a generated local alt in DemoCard when omitted.
   */
  imageAlt?: string;
  sortOrder: number;
  visible: boolean;
  /**
   * When true, eligible for the homepage "Featured Work" section.
   * Homepage shows featured + visible demos sorted by sortOrder (first FEATURED_HOMEPAGE_LIMIT).
   * /work still lists all visible demos.
   */
  featured: boolean;
}

export type DemoDataSource = 'supabase' | 'indexeddb' | 'localStorage' | 'defaults';

export type DemosLoadResult = {
  demos: Demo[];
  source: DemoDataSource;
  supabaseConfigured: boolean;
  supabaseError?: string;
};

export type DemoOperationResult = {
  demos: Demo[];
  supabaseOk: boolean;
  backup: SaveBackupResult;
  error?: string;
  warning?: string;
};

export type ForceSyncResult = BulkSyncResult & {
  demos: Demo[];
  backup: SaveBackupResult;
};

/** Custom event name fired when admin publishes or mutates demos. */
export const DEMOS_PUBLISHED_EVENT = "bdf:demos-published";

/** BroadcastChannel name for cross-tab demo sync (custom events do not cross tabs). */
const DEMOS_BROADCAST_CHANNEL = "bdf-demos-sync";

export type DemosPublishedDetail = {
  demos: Demo[];
  allDemos?: Demo[];
  ts: number;
  source: "admin" | "storage" | "broadcast";
};

// The editable source of truth for all public demos.
// Placement Map: Tier 1 first (food trucks grouped), then Tier 2, then more examples.
// Homepage Featured Work: featured=true, sorted by sortOrder, max FEATURED_HOMEPAGE_LIMIT (6).
// Add new entries following the exact shape (see commented template at bottom of array).
const DEFAULT_DEMOS: Demo[] = [
  // ——— Tier 1: Food truck cluster ———
  {
    id: "demo-3",
    title: "Fiesta Taqueria",
    slug: "fiesta-taqueria",
    category: "Food Truck",
    href: "https://fiesta-taqueria.lovable.app",
    description:
      "Mexican food truck website for Wayne County and Lake Cumberland — menu, today’s location, catering notes. Portfolio example built in Monticello.",
    image: "/assets/demo-fiesta-taqueria.jpg",
    imageAlt:
      "Mexican food truck website demo for Wayne County and Lake Cumberland with digital menu and location updates",
    sortOrder: 1,
    visible: true,
    featured: true,
  },
  {
    id: "demo-2",
    title: "Smoky Wheels",
    slug: "smoky-wheels",
    category: "Food Truck",
    href: "https://smoky-wheels.lovable.app",
    description:
      "Kentucky food truck site with live “Where We Are Today” location updates, festival calendar, online ordering, and easy menu photos from a mobile dashboard.",
    image: "/assets/demo-smoky-wheels.jpg",
    imageAlt:
      "Kentucky food truck website demo for Lake Cumberland with live location updates and online ordering",
    sortOrder: 2,
    visible: true,
    featured: false,
  },
  {
    id: "demo-21",
    title: "Cumberland Smash",
    slug: "cumberland-smash",
    category: "Food Truck",
    href: "https://cumberland-smash.vercel.app",
    description:
      "Smashburger food truck for Lake Cumberland — menu, today’s location, and weekend lake-road stops. Portfolio example built in Monticello.",
    image: "/assets/demo-cumberland-smash.jpg",
    imageAlt:
      "Smashburger food truck website demo for Lake Cumberland with menu and location updates",
    sortOrder: 3,
    visible: true,
    featured: false,
  },
  {
    id: "demo-22",
    title: "Cluckin Chaos",
    slug: "cluckin-chaos",
    category: "Food Truck",
    href: "https://cluckin-chaos.vercel.app",
    description:
      "Crispy chicken food truck with live location, bold menu, and festival-ready layout for Lake Cumberland operators.",
    image: "/assets/demo-cluckin-chaos.jpg",
    imageAlt:
      "Chicken food truck website demo for Lake Cumberland with digital menu and location updates",
    sortOrder: 4,
    visible: true,
    featured: false,
  },
  {
    id: "demo-16",
    title: "Sea Island Soul",
    slug: "sea-island-soul",
    category: "Food Truck",
    href: "https://sea-island-soul.lovable.app",
    description:
      "Gullah Geechee Lowcountry food truck example — location, menu, and heritage story for Beaufort and SC coastal routes.",
    image: "/assets/demo-sea-island-soul.jpg",
    imageAlt:
      "Lowcountry food truck website demo for Beaufort SC with menu and location updates",
    sortOrder: 5,
    visible: true,
    featured: false,
  },
  {
    id: "demo-truckdash",
    title: "TruckDash",
    slug: "truckdash",
    category: "Food Truck App",
    href: "/truckdash",
    description:
      "Bluegrass Command Center for Kentucky food trucks — schedule, live map, flyer studio, offline tools. Flat one-time pricing; you own your purchase.",
    image: "/assets/demo-smoky-wheels.jpg",
    imageAlt:
      "TruckDash food truck dashboard product for Kentucky operators — schedule and live location tools",
    sortOrder: 6,
    visible: true,
    featured: true,
  },
  // ——— Tier 1: Restaurants, guides, outdoor, fitness ———
  {
    id: "demo-17",
    title: "Blue Door Smokehouse",
    slug: "blue-door-smokehouse",
    category: "BBQ Restaurant",
    href: "https://blue-door-smokehouse.lovable.app",
    description:
      "Kentucky pit BBQ website for Lake Cumberland — menu, catering, and a warm local supper-house feel. Portfolio example built in Monticello.",
    image: "/assets/demo-blue-door-smokehouse.jpg",
    imageAlt:
      "BBQ restaurant website demo for Lake Cumberland with pit-smoked menu and catering",
    sortOrder: 7,
    visible: true,
    featured: true,
  },
  {
    id: "demo-1",
    title: "Hickory Forge Steakhouse",
    slug: "hickory-forge-steakhouse",
    category: "Steakhouse",
    href: "https://hickory-forge-steakhouse.lovable.app",
    description:
      "Warm steakhouse website for Lake Cumberland restaurants. Digital menu, reservations built by Monticello KY website designer.",
    image: "/assets/demo-hickory-forge.jpg",
    imageAlt:
      "Steakhouse website demo for Lake Cumberland restaurants with digital menu and reservations",
    sortOrder: 8,
    visible: true,
    featured: false,
  },
  {
    id: "demo-9",
    title: "Anchorline Guide Service",
    slug: "anchorline-guide-service",
    category: "Fishing Guide",
    href: "https://lake-cumberland-lines.lovable.app",
    description:
      "Lake Cumberland fishing guide site with species-based trip booking, captain bios, and trophy striper hunts.",
    image: "/assets/demo-anchorline.png",
    imageAlt:
      "Fishing guide website demo for Lake Cumberland with trip booking and captain bios",
    sortOrder: 9,
    visible: true,
    featured: true,
  },
  {
    id: "demo-18",
    title: "Bluegrass Fence Co.",
    slug: "bluegrass-fence-co",
    category: "Fence & Outdoor",
    href: "https://bluegrass-fence-co.lovable.app",
    description:
      "Family-owned fence builder site for Somerset, Lake Cumberland, and Central Kentucky — services, portfolio, and free-quote path.",
    image: "/assets/demo-bluegrass-fence.jpg",
    imageAlt:
      "Fence company website demo for Somerset KY and Lake Cumberland with services and free quotes",
    sortOrder: 10,
    visible: true,
    featured: true,
  },
  {
    id: "demo-4",
    title: "Ignite Fitness Company",
    slug: "ignite-fitness-company",
    category: "Fitness",
    href: "https://ignite-fitness-co.lovable.app",
    description:
      "Local gym website example with class schedules, memberships, and a clear path to join — built for Monticello and Lake Cumberland towns.",
    image: "/assets/demo-ignite-fitness.jpg",
    imageAlt:
      "Gym and fitness website demo for local Kentucky with class schedules and membership sign-ups",
    sortOrder: 11,
    visible: true,
    featured: true,
  },
  {
    id: "demo-14",
    title: "Ridge Pasture Care",
    slug: "ridge-pasture-care",
    category: "Land & Pasture Services",
    href: "https://ridge-pasture-care.lovable.app",
    description:
      "Family-owned Wayne County site for brush hogging, fence building, pasture renovation, and land clearing with free-quote requests.",
    image: "/assets/demo-ridge-pasture.jpg",
    imageAlt:
      "Land and pasture services website demo for Wayne County with fence building and free quotes",
    sortOrder: 12,
    visible: true,
    featured: false,
  },
  // ——— Tier 2: Supporting examples ———
  {
    id: "demo-23",
    title: "Bluegrass Market & Mercantile",
    slug: "bluegrass-market-mercantile",
    category: "Market & Mercantile",
    href: "https://bg-market.lovable.app",
    description:
      "Central Kentucky marketplace of antiques, handmade goods, and local craft — booths, hours, and a warm local story.",
    image: "/assets/demo-bluegrass-market.webp",
    imageAlt:
      "Market and mercantile website demo for Central Kentucky with antiques and handmade goods",
    sortOrder: 20,
    visible: true,
    featured: false,
  },
  {
    id: "demo-20",
    title: "Bourbon Ridge Artisan Studio",
    slug: "bourbon-ridge-artisan-studio",
    category: "Artisan Studio",
    href: "https://bourbon-ridge.lovable.app",
    description:
      "Kentucky maker studio example — classes, handmade goods, and a clear local story for Bluegrass craft shops.",
    image: "/assets/demo-bourbon-ridge.png",
    imageAlt:
      "Artisan studio website demo for Kentucky makers with classes and handmade goods",
    sortOrder: 21,
    visible: true,
    featured: false,
  },
  {
    id: "demo-24",
    title: "Lakeside Harmony Massage",
    slug: "lakeside-harmony-massage",
    category: "Massage Therapy",
    href: "https://lakeside-harmony-massage.vercel.app",
    description:
      "Therapeutic massage site for Jamestown and Lake Cumberland — services, booking path, and calm local wellness feel.",
    image: "/assets/demo-lakeside-harmony.jpg",
    imageAlt:
      "Massage therapy website demo for Jamestown KY and Lake Cumberland with services and booking",
    sortOrder: 22,
    visible: true,
    featured: false,
  },
  {
    id: "demo-19",
    title: "La Hacienda Cumberland",
    slug: "la-hacienda-cumberland",
    category: "Mexican Restaurant",
    href: "https://hacienda-cumberland.lovable.app",
    description:
      "Lakeside Mexican kitchen example for Lake Cumberland — menu, story, and supper-after-the-water feel near Somerset.",
    image: "/assets/demo-la-hacienda.jpg",
    imageAlt:
      "Mexican restaurant website demo for Lake Cumberland with digital menu and lakeside dining feel",
    sortOrder: 23,
    visible: true,
    featured: false,
  },
  {
    id: "demo-10",
    title: "Sunny Hollow Donut Dash",
    slug: "sunny-hollow-donut-dash",
    category: "Donut Shop",
    href: "https://sunny-hollow-donut-dash.lovable.app",
    description:
      "Small-town donut shop example for Monticello and Wayne County morning traffic — daily menu, simple pre-orders, lake-road visitor friendly.",
    image: "/assets/demo-sunny-hollow.png",
    imageAlt:
      "Donut shop website demo for Monticello KY and Lake Cumberland with online ordering and daily menu",
    sortOrder: 24,
    visible: true,
    featured: false,
  },
  {
    id: "demo-13",
    title: "Landing Point Bait & Tackle",
    slug: "landing-point-bait-tackle",
    category: "Bait & Tackle Shop",
    href: "https://cumberland-landing-demo.lovable.app",
    description:
      "Wayne County bait shop site with live bait availability, tackle catalog, fishing reports, and call-ahead holds for Lake Cumberland anglers.",
    image: "/assets/demo-landing-point.jpg",
    imageAlt:
      "Bait and tackle shop website demo for Wayne County and Lake Cumberland with live bait availability",
    sortOrder: 25,
    visible: true,
    featured: false,
  },
  // ——— More examples (lower visibility) ———
  {
    id: "demo-11",
    title: "Cumberland Forge Steakhouse",
    slug: "cumberland-forge-steakhouse",
    category: "Steakhouse",
    href: "https://cumberland-forge-steakhouse.lovable.app",
    description:
      "Cinematic fine-dining steakhouse site with dry-aged cuts, wild game, bourbon flights, and nightly reservations.",
    image: "/assets/demo-cumberland-forge.png",
    imageAlt:
      "Fine-dining steakhouse website demo for Lake Cumberland with reservations and bourbon flights",
    sortOrder: 40,
    visible: true,
    featured: false,
  },
  {
    id: "demo-12",
    title: "Han River BBQ",
    slug: "han-river-bbq",
    category: "Korean BBQ",
    href: "https://han-river-sizzle.lovable.app",
    description:
      "Authentic Korean BBQ site with sizzling table grills, hand-cut bulgogi and kalbi, fresh banchan, and group reservations.",
    image: "/assets/demo-han-river.png",
    imageAlt:
      "Korean BBQ restaurant website demo with table grills, menu, and group reservations",
    sortOrder: 41,
    visible: true,
    featured: false,
  },
  {
    id: "demo-8",
    title: "Hickory & Bloom",
    slug: "hickory-bloom",
    category: "Florist",
    href: "https://bluegrass-bloom-showcase.lovable.app",
    description:
      "Elegant local florist site with same-day delivery, weddings, sympathy, and custom bouquet ordering.",
    image: "/assets/demo-hickory-bloom.png",
    imageAlt:
      "Florist website demo for Kentucky with same-day delivery and wedding bouquets",
    sortOrder: 42,
    visible: true,
    featured: false,
  },
  {
    id: "demo-5",
    title: "Summit Tire & Auto",
    slug: "summit-tire-and-auto",
    category: "Auto Service",
    href: "https://summit-tire-and-auto.lovable.app",
    description:
      "Trustworthy tire shop website with service booking and instant quotes.",
    image: "/assets/demo-summit-tire.jpg",
    imageAlt:
      "Auto service website demo for tire shops with service booking and instant quotes",
    sortOrder: 43,
    visible: true,
    featured: false,
  },
  {
    id: "demo-6",
    title: "Summit Auto Showcase",
    slug: "summit-auto-showcase",
    category: "Car Dealership",
    href: "https://summit-auto-showcase.lovable.app",
    description:
      "Sleek auto dealership website with inventory, financing, and trade-ins.",
    image: "/assets/demo-summit-auto.jpg",
    imageAlt:
      "Car dealership website demo with vehicle inventory, financing, and trade-ins",
    sortOrder: 44,
    visible: true,
    featured: false,
  },
  {
    id: "demo-7",
    title: "Heritage Home Furniture & Appliances",
    slug: "heritage-home-furniture",
    category: "Furniture Store",
    href: "https://heritage-home-furniture-and-appliances.lovable.app",
    description:
      "Elegant furniture store website with showroom catalog and financing.",
    image: "/assets/demo-heritage-home.png",
    imageAlt:
      "Furniture store website demo with showroom catalog and financing options",
    sortOrder: 45,
    visible: true,
    featured: false,
  },
  {
    id: "demo-15",
    title: "Blade Haven",
    slug: "blade-haven",
    category: "Specialty Retail",
    href: "https://blade-haven-demo.lovable.app",
    description:
      "Showcase site for a collector knife shop with featured blades, instruments, and store story.",
    image: "/assets/demo-blade-haven.jpg",
    imageAlt:
      "Specialty knife shop website demo with featured blades and store story",
    sortOrder: 46,
    visible: true,
    featured: false,
  },

  // ============================================================
  // ADD NEW DEMOS HERE — Easy future-proof structure (no quota)
  // ============================================================
  // Copy this template, fill in, then uncomment. Use next available sortOrder.
  // For thumbnails: place real photo in /public/assets/demo-your-name.jpg (or .png)
  // Follow Master Project Settings: authentic Kentucky / local imagery only.
  // Set featured: true + low sortOrder for homepage Featured Work (max 6).
  //
  // {
  //   id: "demo-marsh-to-market",
  //   title: "Marsh to Market",
  //   slug: "marsh-to-market",
  //   category: "Food Truck",
  //   href: "https://marsh-to-market.lovable.app",
  //   description: "Fresh local seafood and produce truck with SC marsh-to-table menus, festival calendar, and on-the-go location tracking.",
  //   image: "/assets/demo-marsh-to-market.jpg",
  //   imageAlt: "Seafood food truck website demo for Lowcountry SC with festival calendar and location tracking",
  //   sortOrder: 50,
  //   visible: true,
  //   featured: false,
  // },
];

/**
 * Normalize a demo object from storage/import/Supabase so older payloads
 * without `featured` still work (back-compat: first 4 by sortOrder are featured).
 */
export function normalizeDemo(raw: Partial<Demo> & { title?: string; href?: string }): Demo {
  const sortOrder = Number(raw.sortOrder) || 99;
  const featuredRaw = raw.featured as unknown;
  let featured: boolean;
  if (featuredRaw === true || featuredRaw === "true" || featuredRaw === 1 || featuredRaw === "t") {
    featured = true;
  } else if (featuredRaw === false || featuredRaw === "false" || featuredRaw === 0 || featuredRaw === "f") {
    featured = false;
  } else {
    // Legacy data without featured flag → first N by sortOrder count as featured
    featured = sortOrder > 0 && sortOrder <= FEATURED_HOMEPAGE_LIMIT;
  }

  const visibleRaw = raw.visible as unknown;
  const visible =
    visibleRaw === false || visibleRaw === "false" || visibleRaw === 0 || visibleRaw === "f"
      ? false
      : true;

  const imageAlt =
    typeof raw.imageAlt === "string" && raw.imageAlt.trim()
      ? raw.imageAlt.trim()
      : undefined;

  return {
    id: String(raw.id || `demo-${Date.now()}`),
    title: String(raw.title || ""),
    slug: String(raw.slug || ""),
    category: String(raw.category || "Other"),
    href: String(raw.href || ""),
    description: String(raw.description || ""),
    image: raw.image || undefined,
    imageAlt,
    sortOrder,
    visible,
    featured,
  };
}

export function normalizeDemos(list: Partial<Demo>[]): Demo[] {
  return list.map((d) => normalizeDemo(d)).sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Select demos for homepage Featured Work (or fall back to first N visible). */
export function selectFeaturedDemos(demos: Demo[], limit = FEATURED_HOMEPAGE_LIMIT): Demo[] {
  const visible = demos.filter(
    (d) => d.visible && d.title.trim() && d.href.trim() && d.slug.trim()
  );
  const bySlug = new Map(visible.map((d) => [d.slug.toLowerCase(), d]));

  // Placement Map: exact forced order (never Bluegrass Market or other Tier 2)
  const forced: Demo[] = [];
  for (const slug of HOMEPAGE_FEATURED_SLUGS) {
    const d = bySlug.get(slug);
    if (d) forced.push(d);
    if (forced.length >= limit) break;
  }
  if (forced.length > 0) {
    return forced.slice(0, limit);
  }

  // Fallback: featured flags by sortOrder, then first N visible
  const featured = visible
    .filter((d) => d.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  return [...visible].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, limit);
}

/** Slugify helper for unique slugs */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Internal: localStorage → defaults (sync, for slug checks). Always normalized. */
function loadFromLocalOrDefaults(): Demo[] {
  if (typeof window === "undefined") return [...DEFAULT_DEMOS];
  const fromLocal = loadMinimalBackup();
  if (fromLocal && fromLocal.length > 0) return normalizeDemos(fromLocal);
  return [...DEFAULT_DEMOS];
}

/** Load with full source metadata for admin status display. */
export async function getDemosWithMeta(): Promise<DemosLoadResult> {
  const supaResult = await (await supabaseApi()).getAllDemosFromSupabaseResult();

  if (supaResult.ok && supaResult.data) {
    if (supaResult.data.length > 0) {
      return {
        demos: normalizeDemos(supaResult.data),
        source: 'supabase',
        supabaseConfigured: supaResult.configured,
      };
    }
    // Connected but empty — try local backups before showing empty table
    if (typeof window !== "undefined") {
      const fromIdb = await loadFullBackup();
      if (fromIdb && fromIdb.length > 0) {
        return { demos: normalizeDemos(fromIdb), source: 'indexeddb', supabaseConfigured: true };
      }
      const fromLocal = loadMinimalBackup();
      if (fromLocal && fromLocal.length > 0) {
        return { demos: normalizeDemos(fromLocal), source: 'localStorage', supabaseConfigured: true };
      }
    }
    return { demos: [], source: 'supabase', supabaseConfigured: supaResult.configured };
  }

  if (typeof window !== "undefined") {
    const fromIdb = await loadFullBackup();
    if (fromIdb && fromIdb.length > 0) {
      return {
        demos: normalizeDemos(fromIdb),
        source: 'indexeddb',
        supabaseConfigured: supaResult.configured,
        supabaseError: supaResult.error?.message,
      };
    }
    const fromLocal = loadMinimalBackup();
    if (fromLocal && fromLocal.length > 0) {
      return {
        demos: normalizeDemos(fromLocal),
        source: 'localStorage',
        supabaseConfigured: supaResult.configured,
        supabaseError: supaResult.error?.message,
      };
    }
  }

  return {
    demos: [...DEFAULT_DEMOS],
    source: 'defaults',
    supabaseConfigured: supaResult.configured,
    supabaseError: supaResult.error?.message,
  };
}

/** Get all demos for Admin. Prefers Supabase, then IndexedDB, localStorage, defaults. */
export async function getDemos(): Promise<Demo[]> {
  const { demos } = await getDemosWithMeta();
  return demos;
}

/** Sync snapshot for slug uniqueness during form typing. */
function getDemosForChecks(): Demo[] {
  return loadFromLocalOrDefaults();
}

export async function getSupabaseStatus(): Promise<SupabaseConnectionStatus> {
  return (await supabaseApi()).checkSupabaseConnection();
}

export function getLocalStorageStatus(): StorageStatus {
  return getStorageStatus();
}

/** Get only visible demos, sorted by sortOrder (for public pages / work gallery) */
export function getPublicDemos(): Demo[] {
  // Switched to hardcoded source (DEFAULT_DEMOS). Ignores any localStorage data.
  // Guarantees no quota issues + keeps public demos in version control.
  // Admin may still load from LS for its own table, but this always uses the array below.
  return [...DEFAULT_DEMOS]
    .filter((d) => d.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Look up a visible public demo by slug (for /work/[slug] landings). */
export function getPublicDemoBySlug(slug: string): Demo | undefined {
  if (!slug) return undefined;
  let normalized = slug;
  try {
    normalized = decodeURIComponent(slug);
  } catch {
    // keep raw
  }
  normalized = normalized.trim().replace(/^\/+|\/+$/g, "").toLowerCase();
  return getPublicDemos().find(
    (d) => d.slug && d.slug.toLowerCase() === normalized
  );
}

/** Homepage Featured Work — featured + visible, or first N if none flagged. */
export function getFeaturedPublicDemos(limit = FEATURED_HOMEPAGE_LIMIT): Demo[] {
  return selectFeaturedDemos(getPublicDemos(), limit);
}

/** Visible demos from localStorage backup — used for instant cross-tab refresh before Supabase confirms. */
export function getPublicDemosFromLocalStorage(): Demo[] | null {
  const all = loadFromLocalOrDefaults();
  const visible = normalizeDemos(all)
    .filter((d) => d.visible && d.title.trim() && d.href.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return visible.length > 0 ? visible : null;
}

/** Featured subset from localStorage for instant homepage refresh. */
export function getFeaturedPublicDemosFromLocalStorage(
  limit = FEATURED_HOMEPAGE_LIMIT
): Demo[] | null {
  const all = getPublicDemosFromLocalStorage();
  if (!all) return null;
  const featured = selectFeaturedDemos(all, limit);
  return featured.length > 0 ? featured : null;
}

/** Notify open public pages (same tab + other tabs) that demos changed. */
export function dispatchDemosPublished(
  demos: Demo[],
  source: DemosPublishedDetail["source"] = "admin"
): void {
  if (typeof window === "undefined") return;

  const normalized = normalizeDemos(demos);
  const visible = normalized
    .filter((d) => d.visible && d.title.trim() && d.href.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const detail: DemosPublishedDetail = {
    demos: visible,
    allDemos: normalized,
    ts: Date.now(),
    source,
  };

  window.dispatchEvent(
    new CustomEvent<DemosPublishedDetail>(DEMOS_PUBLISHED_EVENT, { detail })
  );

  try {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(DEMOS_BROADCAST_CHANNEL);
      channel.postMessage(detail);
      channel.close();
    }
  } catch (e) {
    console.warn("[Demos] BroadcastChannel publish failed (storage fallback still active)", e);
  }
}

/** Save minimal localStorage + IndexedDB backup (Supabase is primary). */
export async function saveDemos(demos: Demo[], source: 'admin' | 'import' | 'sync' | 'reset' = 'admin'): Promise<SaveBackupResult> {
  return saveBackup(demos, source);
}

function formatSupabaseError(err: SupabaseError | null): string {
  if (!err) return 'Unknown Supabase error';
  let msg = err.message;
  if (err.hint) msg += ` (${err.hint})`;
  if (
    err.code === '42501' ||
    err.code === 'delete_no_rows' ||
    err.code === 'sync_delete_partial' ||
    err.message.toLowerCase().includes('row-level security')
  ) {
    msg += ' — Check RLS policies on forge_demos (see supabase/schema.sql).';
  }
  if (err.code === 'not_configured') {
    msg += ' — Copy .env.local.example to .env.local and restart dev server.';
  }
  return msg;
}

async function finalizeOperation(
  demos: Demo[],
  supabaseOk: boolean,
  error?: string,
  warning?: string
): Promise<DemoOperationResult> {
  const backup = await saveBackup(demos, 'admin');
  return { demos, supabaseOk, backup, error, warning };
}

/** Add a new demo — Supabase first, then local backup. */
export async function addDemo(newDemo: Omit<Demo, "id">): Promise<DemoOperationResult> {
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const demoWithId: Demo = { ...newDemo, id };

  const supaResult = await (await supabaseApi()).upsertDemoToSupabaseResult(demoWithId);
  if (!supaResult.ok) {
    const current = await getDemos();
    const fallbackList = [...current.filter((d) => d.id !== id), demoWithId]
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return finalizeOperation(
      fallbackList,
      false,
      `Supabase save failed: ${formatSupabaseError(supaResult.error)}`,
      'Demo saved to local backup only. Use Force Sync when Supabase is available.'
    );
  }

  const fresh = await (await supabaseApi()).getAllDemosFromSupabaseResult();
  const list = fresh.ok && fresh.data && fresh.data.length > 0
    ? fresh.data
    : [...(await getDemos()).filter((d) => d.id !== id), demoWithId];

  return finalizeOperation(
    list.sort((a, b) => a.sortOrder - b.sortOrder),
    true,
    undefined,
    demoWithId.image?.startsWith('data:')
      ? 'Image stored locally only. Upload to Supabase Storage or use /assets/ path.'
      : undefined
  );
}

/** Update existing demo — Supabase first, then local backup. */
export async function updateDemo(id: string, updates: Partial<Demo>): Promise<DemoOperationResult> {
  const baseList = await getDemos();
  const existing = baseList.find((d) => d.id === id);
  if (!existing) {
    return finalizeOperation(baseList, false, `Demo "${id}" not found.`);
  }

  const merged: Demo = { ...existing, ...updates, id };
  const supaResult = await (await supabaseApi()).upsertDemoToSupabaseResult(merged);

  if (!supaResult.ok) {
    const fallbackList = baseList
      .map((d) => (d.id === id ? merged : d))
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return finalizeOperation(
      fallbackList,
      false,
      `Supabase save failed: ${formatSupabaseError(supaResult.error)}`,
      'Changes saved to local backup only. Use Force Sync when Supabase is available.'
    );
  }

  const fresh = await (await supabaseApi()).getAllDemosFromSupabaseResult();
  const list = fresh.ok && fresh.data
    ? fresh.data
    : baseList.map((d) => (d.id === id ? merged : d));

  return finalizeOperation(
    list.sort((a, b) => a.sortOrder - b.sortOrder),
    true,
    undefined,
    merged.image?.startsWith('data:')
      ? 'Image stored locally only. Upload to Supabase Storage or use /assets/ path.'
      : undefined
  );
}

/** Delete demo — Supabase first, then local/IndexedDB backup only after confirmed removal. */
export async function deleteDemo(id: string): Promise<DemoOperationResult> {
  const current = await getDemos();
  const existing = current.find((d) => d.id === id);
  if (!existing) {
    return finalizeOperation(current, false, `Demo "${id}" not found.`);
  }

  const updated = current.filter((d) => d.id !== id);

  const supaResult = await (await supabaseApi()).deleteDemoFromSupabaseResult(id);
  if (!supaResult.ok) {
    return finalizeOperation(
      current,
      false,
      `Supabase delete failed: ${formatSupabaseError(supaResult.error)}`,
      'Demo was NOT removed. Check Supabase connection, RLS delete policy, or use Force Sync after fixing.'
    );
  }

  // Belt-and-suspenders: confirm the row is gone before mutating local backups.
  const fresh = await (await supabaseApi()).getAllDemosFromSupabaseResult();
  if (fresh.ok && fresh.data?.some((d) => d.id === id)) {
    return finalizeOperation(
      current,
      false,
      `Supabase delete failed: row "${id}" still exists after delete. Check forge_demos DELETE RLS policy.`,
      'Demo was NOT removed from Supabase or local backup.'
    );
  }

  const list = fresh.ok && fresh.data ? fresh.data : updated;
  return finalizeOperation(list, true);
}

/** Upload image to Supabase Storage. Returns the public URL and any error details. */
export async function uploadDemoImage(file: File): Promise<{ url: string | null; error?: string; code?: string }> {
  const result = await (await supabaseApi()).uploadImageToDemosBucket(file);
  if (!result.ok) {
    const message = result.error?.message || 'Unknown Supabase storage error';
    console.warn('[Supabase] Image upload failed:', message);
    return { url: null, error: message, code: result.error?.code };
  }
  return { url: result.data };
}

/** Push all demos to Supabase and refresh local backups. */
export async function forceSyncToSupabase(demos?: Demo[]): Promise<ForceSyncResult> {
  const list = demos ?? (await getDemos());
  const syncResult = await (await supabaseApi()).syncAllDemosToSupabase(list);
  const backup = await saveBackup(list, 'sync');

  let freshList = list;
  if (syncResult.ok) {
    const fresh = await (await supabaseApi()).getAllDemosFromSupabaseResult();
    if (fresh.ok && fresh.data) freshList = fresh.data;
  }

  return { ...syncResult, demos: freshList, backup };
}

/** Reset local backups to factory defaults. Does NOT clear Supabase. */
export async function resetToDefaults(): Promise<DemoOperationResult> {
  const defaults = [...DEFAULT_DEMOS];
  clearLocalBackups();
  const backup = await saveBackup(defaults, 'reset');
  return { demos: defaults, supabaseOk: true, backup };
}

/** Check if slug is unique (excluding optional current id). Uses fast local snapshot for typing UX. */
export function isSlugUnique(slug: string, excludeId?: string): boolean {
  const demos = getDemosForChecks();
  return !demos.some((d) => d.slug === slug && d.id !== excludeId);
}

/** Generate a unique slug (uses local check snapshot for speed during editing) */
export function generateUniqueSlug(title: string, excludeId?: string): string {
  let base = slugify(title) || "demo";
  let candidate = base;
  let counter = 1;
  while (!isSlugUnique(candidate, excludeId)) {
    candidate = `${base}-${counter}`;
    counter++;
  }
  return candidate;
}

/** Map internal Demo to the shape expected by DemoCard + pages (backwards compatible) */
export function toCardProps(d: Demo) {
  // Primary card link: first-party landing when it exists; otherwise external live demo.
  // Landing pages are defined in lib/demoLandings.ts (Phase A: 4 priority demos).
  const hasLanding = Boolean(d.slug && hasDemoLanding(d.slug));

  return {
    title: d.title,
    subtitle: d.description,
    category: d.category,
    /** Primary navigation target (same-site landing preferred). */
    href: hasLanding && d.slug ? `/work/${d.slug}` : d.href,
    /** External live demo URL when primary href is a landing page. */
    liveHref: hasLanding ? d.href : undefined,
    image: d.image,
    imageAlt: d.imageAlt,
    slug: d.slug,
    isPortfolioLanding: hasLanding,
  };
}

/**
 * Generate clean, ready-to-paste TypeScript source for the DEFAULT_DEMOS array.
 * Used by the Admin "Export to demos.ts" feature.
 * Output matches the exact shape, formatting style, and key order used in this file.
 * Includes a helpful header comment for the user.
 */
export function generateDemosTsCode(demos: Demo[]): string {
  const sorted = [...demos]
    .map((d) => ({
      ...d,
      image: d.image?.startsWith("data:") ? undefined : d.image,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const header = `// ======================================================\n// BLUEGRASS DIGITAL FORGE — DEFAULT_DEMOS (ready to paste)\n// \n// HOW TO USE:\n// 1. Copy everything below (the const DEFAULT_DEMOS ... ] block).\n// 2. In lib/demos.ts, find and REPLACE the entire "const DEFAULT_DEMOS: Demo[] = [ ... ];" section.\n// 3. (Strongly recommended) Replace any base64 data: URLs in "image" fields with\n//    clean paths like "/assets/demo-your-name.jpg" (add real photos to public/assets/).\n//    This keeps the JS bundle small and follows the Critical Image & Visuals Rule.\n// 4. Save, commit, push, and deploy. Public pages will now use the updated hardcoded list.\n// 5. The commented example templates at the bottom of the array in lib/demos.ts can stay.\n// ======================================================\n\nconst DEFAULT_DEMOS: Demo[] = [\n`;

  const itemStrings = sorted.map((d, idx) => {
    const fields: string[] = [
      `    id: ${JSON.stringify(d.id)},`,
      `    title: ${JSON.stringify(d.title)},`,
      `    slug: ${JSON.stringify(d.slug)},`,
      `    category: ${JSON.stringify(d.category)},`,
      `    href: ${JSON.stringify(d.href)},`,
      `    description: ${JSON.stringify(d.description)},`,
    ];
    if (d.image != null) {
      fields.push(`    image: ${JSON.stringify(d.image)},`);
    }
    if (d.imageAlt != null) {
      fields.push(`    imageAlt: ${JSON.stringify(d.imageAlt)},`);
    }
    fields.push(`    sortOrder: ${d.sortOrder},`);
    fields.push(`    visible: ${d.visible},`);
    fields.push(`    featured: ${d.featured === true},`);
    const closing = `  }${idx < sorted.length - 1 ? "," : ""}`;
    return `  {\n${fields.join("\n")}\n${closing}`;
  });

  const body = itemStrings.join("\n\n");
  const footer = `\n];`;

  return header + body + footer;
}

// NOTE FOR FUTURE EDITS:
// To add many more demos (e.g. 30+ food trucks), just append objects to DEFAULT_DEMOS above.
// Descriptions render in full on demo cards (no line-clamp). Write complete, local SEO-friendly blurbs.
// Always provide accurate local thumbnail paths.
// Set featured: true (and a low sortOrder) for homepage "Featured Work" cards (max 6 shown).
// Prefer Admin Panel → Featured Work section to swap demos without editing this file.
// The structure is: title | href | description (subtitle) | category (badge) | image | featured


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
 * ADMIN PANEL (Supabase primary + safe localStorage fallback):
 *   - getDemos(), addDemo(), updateDemo(), deleteDemo() now use Supabase (forge_demos) as PRIMARY target.
 *   - Every write also writes a backup copy to localStorage (bdf_demos_v1).
 *   - On any Supabase failure (no keys, error, network) → fully falls back to previous localStorage + DEFAULT behavior.
 *   - Drag & drop images: Admin calls uploadDemoImage() → Supabase Storage bucket "demos" (public URL stored).
 *     Falls back to base64 data URL stored only in localStorage when upload fails.
 *   - Admin UI + all existing features (JSON export/import, Export to demos.ts, reset, publish) remain intact.
 *   - "Publish Changes" keeps LS in sync; main data now lives in Supabase for live public updates.
 *
 * Fields used by cards: title, href (url), description (short), category, image (thumbnail).
 * All existing demos preserved exactly.
 *
 * Follows Master Project Settings + Critical Safety Rules.
 */

import {
  getAllDemosFromSupabase,
  uploadImageToDemosBucket,
  upsertDemoToSupabase,
  deleteDemoFromSupabase,
} from './supabase';

export interface Demo {
  id: string;
  title: string;
  slug: string;
  category: string;
  href: string;
  description: string;
  image?: string; // Can be /assets/... path, Supabase Storage public URL, or base64 (fallback only)
  sortOrder: number;
  visible: boolean;
}

const STORAGE_KEY = "bdf_demos_v1";

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
// This lightweight array replaces localStorage for display.
// Add new entries following the exact shape (see commented template at bottom of array).
const DEFAULT_DEMOS: Demo[] = [
  {
    id: "demo-1",
    title: "Hickory Forge Steakhouse",
    slug: "hickory-forge-steakhouse",
    category: "Restaurant",
    href: "https://hickory-forge-steakhouse.lovable.app",
    description: "Warm steakhouse website for Lake Cumberland restaurants. Digital menu, reservations built by Monticello KY website designer.",
    image: "/assets/demo-hickory-forge.jpg",
    sortOrder: 1,
    visible: true,
  },
  {
    id: "demo-2",
    title: "Smoky Wheels",
    slug: "smoky-wheels",
    category: "Food Truck",
    href: "https://smoky-wheels.lovable.app",
    description: "Bold food truck website Kentucky that leads with easy on-the-fly “Where We Are Today” location updates from a simple mobile dashboard — plus festival calendar, online ordering, beautiful food photos, and menu updates. Built by the Monticello KY website designer.",
    image: "/assets/demo-smoky-wheels.jpg",
    sortOrder: 2,
    visible: true,
  },
  {
    id: "demo-3",
    title: "Fiesta Taqueria",
    slug: "fiesta-taqueria",
    category: "Mexican Restaurant",
    href: "https://fiesta-taqueria.lovable.app",
    description: "Authentic Mexican restaurant website for Wayne County with menu, catering and local SEO — Monticello KY website designer example.",
    image: "/assets/demo-fiesta-taqueria.jpg",
    sortOrder: 3,
    visible: true,
  },
  {
    id: "demo-4",
    title: "Ignite Fitness Company",
    slug: "ignite-fitness-company",
    category: "Fitness",
    href: "https://ignite-fitness-company.lovable.app",
    description: "Energetic gym website with class schedules and membership sign-ups.",
    image: "/assets/demo-ignite-fitness.jpg",
    sortOrder: 4,
    visible: true,
  },
  {
    id: "demo-5",
    title: "Summit Tire & Auto",
    slug: "summit-tire-and-auto",
    category: "Auto Service",
    href: "https://summit-tire-and-auto.lovable.app",
    description: "Trustworthy tire shop website with service booking and instant quotes.",
    image: "/assets/demo-summit-tire.jpg",
    sortOrder: 5,
    visible: true,
  },
  {
    id: "demo-6",
    title: "Summit Auto Showcase",
    slug: "summit-auto-showcase",
    category: "Car Dealership",
    href: "https://summit-auto-showcase.lovable.app",
    description: "Sleek auto dealership website with inventory, financing, and trade-ins.",
    image: "/assets/demo-summit-auto.jpg",
    sortOrder: 6,
    visible: true,
  },
  {
    id: "demo-7",
    title: "Heritage Home Furniture & Appliances",
    slug: "heritage-home-furniture",
    category: "Furniture Store",
    href: "https://heritage-home-furniture-and-appliances.lovable.app",
    description: "Elegant furniture store website with showroom catalog and financing.",
    image: "/assets/demo-heritage-home.png",
    sortOrder: 7,
    visible: true,
  },
  {
    id: "demo-8",
    title: "Hickory & Bloom",
    slug: "hickory-bloom",
    category: "Florist",
    href: "https://bluegrass-bloom-showcase.lovable.app",
    description: "Elegant local florist site with same-day delivery, weddings, sympathy, and custom bouquet ordering.",
    image: "/assets/demo-hickory-bloom.png",
    sortOrder: 8,
    visible: true,
  },
  {
    id: "demo-9",
    title: "Anchorline Guide Service",
    slug: "anchorline-guide-service",
    category: "Fishing Guide",
    href: "https://lake-cumberland-lines.lovable.app",
    description: "Lake Cumberland fishing guide site with species-based trip booking, captain bios, and trophy striper hunts.",
    image: "/assets/demo-anchorline.png",
    sortOrder: 9,
    visible: true,
  },
  {
    id: "demo-10",
    title: "Sunny Hollow Donut Dash",
    slug: "sunny-hollow-donut-dash",
    category: "Donut Shop",
    href: "https://sunny-hollow-donut-dash.lovable.app",
    description: "Cheerful small-town donut shop site with online ordering, daily menu, and Stripe checkout for pre-orders.",
    image: "/assets/demo-sunny-hollow.png",
    sortOrder: 10,
    visible: true,
  },
  {
    id: "demo-11",
    title: "Cumberland Forge Steakhouse",
    slug: "cumberland-forge-steakhouse",
    category: "Steakhouse",
    href: "https://cumberland-forge-steakhouse.lovable.app",
    description: "Cinematic fine-dining steakhouse site with dry-aged cuts, wild game, bourbon flights, and nightly reservations.",
    image: "/assets/demo-cumberland-forge.png",
    sortOrder: 11,
    visible: true,
  },
  {
    id: "demo-12",
    title: "Han River BBQ",
    slug: "han-river-bbq",
    category: "Korean BBQ",
    href: "https://han-river-sizzle.lovable.app",
    description: "Authentic Korean BBQ site with sizzling table grills, hand-cut bulgogi and kalbi, fresh banchan, and group reservations.",
    image: "/assets/demo-han-river.png",
    sortOrder: 12,
    visible: true,
  },
  {
    id: "demo-13",
    title: "Landing Point Bait & Tackle",
    slug: "landing-point-bait-tackle",
    category: "Bait & Tackle Shop",
    href: "https://cumberland-landing-demo.lovable.app",
    description: "Wayne County bait shop site with live bait availability, tackle catalog, fishing reports, and call-ahead holds for Lake Cumberland anglers.",
    image: "/assets/demo-landing-point.jpg",
    sortOrder: 13,
    visible: true,
  },
  {
    id: "demo-14",
    title: "Ridge Pasture Care",
    slug: "ridge-pasture-care",
    category: "Land & Pasture Services",
    href: "https://ridge-pasture-care.lovable.app",
    description: "Family-owned Wayne County site for brush hogging, fence building, pasture renovation, and land clearing with free-quote requests.",
    image: "/assets/demo-ridge-pasture.jpg",
    sortOrder: 14,
    visible: true,
  },
  {
    id: "demo-15",
    title: "Blade Haven",
    slug: "blade-haven",
    category: "Specialty Retail",
    href: "https://blade-haven-demo.lovable.app",
    description: "Showcase site for a collector knife shop with featured blades, instruments, and store story.",
    image: "/assets/demo-blade-haven.jpg",
    sortOrder: 15,
    visible: true,
  },
    
  // ============================================================
  // ADD NEW DEMOS HERE — Easy future-proof structure (no quota)
  // ============================================================
  // Copy this template, fill in, then uncomment. Use next available sortOrder.
  // For thumbnails: place real photo in /public/assets/demo-your-name.jpg (or .png)
  // Follow Master Project Settings: authentic Kentucky / local imagery only.
  // Example food truck entries (add your real deployed URLs + accurate local photos):
  //
  // {
  //   id: "demo-marsh-to-market",
  //   title: "Marsh to Market",
  //   slug: "marsh-to-market",
  //   category: "Food Truck",
  //   href: "https://marsh-to-market.lovable.app",
  //   description: "Fresh local seafood and produce truck with SC marsh-to-table menus, festival calendar, and on-the-go location tracking.",
  //   image: "/assets/demo-marsh-to-market.jpg",
  //   sortOrder: 18,
  //   visible: true,
  // },
  // {
  //   id: "demo-palmetto-wheels",
  //   title: "Palmetto Wheels",
  //   slug: "palmetto-wheels",
  //   category: "Food Truck",
  //   href: "https://palmetto-wheels.lovable.app",
  //   description: "Authentic Charleston-area Lowcountry food truck with soulful Southern cooking, daily location updates via simple dashboard, and rich local photography.",
  //   image: "/assets/demo-palmetto-wheels.jpg",
  //   sortOrder: 19,
  //   visible: true,
  // },
  // {
  //   id: "demo-palmetto-boil",
  //   title: "Palmetto Boil",
  //   slug: "palmetto-boil",
  //   category: "Food Truck",
  //   href: "https://palmetto-boil.lovable.app",
  //   description: "Coastal SC seafood boil truck — shrimp, crab, crawfish boils, classic sides, and real-time “Where We Are Today” updates for events and pop-ups.",
  //   image: "/assets/demo-palmetto-boil.jpg",
  //   sortOrder: 20,
  //   visible: true,
  // },
  // {
  //   id: "demo-sea-island-soul",
  //   title: "Sea Island Soul",
  //   slug: "sea-island-soul",
  //   category: "Food Truck",
  //   href: "https://sea-island-soul.lovable.app",
  //   description: "Gullah Geechee heritage food truck serving Lowcountry soul food with live location tracking, beautiful food imagery, and easy menu + hours management.",
  //   image: "/assets/demo-sea-island-soul.jpg",
  //   sortOrder: 21,
  //   visible: true,
  // },
];

/** Slugify helper for unique slugs */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Internal: pure localStorage + DEFAULT fallback (used for safety net + fast slug checks) */
function loadFromLocalOrDefaults(): Demo[] {
  if (typeof window === "undefined") return [...DEFAULT_DEMOS];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Demo[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load demos from localStorage", e);
  }
  return [...DEFAULT_DEMOS];
}

/**
 * Get all demos for Admin.
 * PRIMARY: Supabase (getAllDemosFromSupabase) — returns [] if table empty but connected.
 * FALLBACK: localStorage or DEFAULT_DEMOS (exact previous behavior).
 * This powers the admin table while keeping every old code path safe.
 */
export async function getDemos(): Promise<Demo[]> {
  // Supabase is now the primary save target for admin CRUD.
  // If client not configured or fetch fails for any reason → seamless local fallback.
  try {
    const fromSupa = await getAllDemosFromSupabase();
    if (fromSupa !== null) {
      return fromSupa; // authoritative (may legitimately be empty)
    }
  } catch (e) {
    console.warn('[Supabase] getDemos Supabase path failed — using localStorage fallback', e);
  }
  return loadFromLocalOrDefaults();
}

/** Sync snapshot used only for slug uniqueness checks during form typing (responsive, no await). */
function getDemosForChecks(): Demo[] {
  return loadFromLocalOrDefaults();
}

/** Get only visible demos, sorted by sortOrder (for public pages) */
export function getPublicDemos(): Demo[] {
  // Switched to hardcoded source (DEFAULT_DEMOS). Ignores any localStorage data.
  // Guarantees no quota issues + keeps public demos in version control.
  // Admin may still load from LS for its own table, but this always uses the array below.
  return [...DEFAULT_DEMOS]
    .filter((d) => d.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Visible demos from localStorage backup — used for instant cross-tab refresh before Supabase confirms. */
export function getPublicDemosFromLocalStorage(): Demo[] | null {
  const all = loadFromLocalOrDefaults();
  const visible = all
    .filter((d) => d.visible && d.title.trim() && d.href.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return visible.length > 0 ? visible : null;
}

/** Notify open public pages (same tab + other tabs) that demos changed. */
export function dispatchDemosPublished(
  demos: Demo[],
  source: DemosPublishedDetail["source"] = "admin"
): void {
  if (typeof window === "undefined") return;

  const visible = demos
    .filter((d) => d.visible && d.title.trim() && d.href.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const detail: DemosPublishedDetail = {
    demos: visible,
    allDemos: demos,
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

/** Save demos array to localStorage — used as backup / safety net for admin (Supabase is primary). */
export function saveDemos(demos: Demo[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
    // Dispatch storage event so other tabs/pages (and multi-tab admin) can react
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch (e) {
    console.error("Failed to save demos to localStorage backup", e);
  }
}

/** Add a new demo.
 * PRIMARY: writes to Supabase via upsert.
 * ALWAYS also writes backup to localStorage.
 * Returns authoritative list (prefers fresh Supabase list on success).
 */
export async function addDemo(newDemo: Omit<Demo, "id">): Promise<Demo[]> {
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const demoWithId: Demo = { ...newDemo, id };

  // Always maintain localStorage backup (safety)
  const localCurrent = loadFromLocalOrDefaults();
  const lsUpdated = [...localCurrent.filter((d) => d.id !== id), demoWithId];
  saveDemos(lsUpdated);

  // Primary target: Supabase
  const supaSuccess = await upsertDemoToSupabase(demoWithId);
  if (supaSuccess) {
    // Return live state from Supabase when possible
    const fresh = await getAllDemosFromSupabase();
    if (fresh !== null) return fresh;
  } else {
    console.warn('[Admin] Supabase addDemo failed — localStorage backup is active.');
  }
  return lsUpdated.sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Update existing demo by id.
 * PRIMARY: Supabase upsert with merged fields.
 * Backup written to localStorage on every call.
 */
export async function updateDemo(id: string, updates: Partial<Demo>): Promise<Demo[]> {
  // Build local backup version
  const localCurrent = loadFromLocalOrDefaults();
  const lsUpdated = localCurrent.map((d) => (d.id === id ? { ...d, ...updates } : d));
  saveDemos(lsUpdated);

  // Get a base (prefer live) then merge for Supabase write
  const baseList = await getDemos(); // safe — will not infinitely recurse
  const existing = baseList.find((d) => d.id === id) || ({} as Demo);
  const merged: Demo = { ...existing, ...updates, id };

  const supaSuccess = await upsertDemoToSupabase(merged);
  if (supaSuccess) {
    const fresh = await getAllDemosFromSupabase();
    if (fresh !== null) return fresh.sort((a, b) => a.sortOrder - b.sortOrder);
  } else {
    console.warn('[Admin] Supabase updateDemo failed — localStorage backup is active.');
  }
  return lsUpdated.sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Delete demo by id.
 * PRIMARY: Supabase delete.
 * Always keeps an updated localStorage backup of the remaining list.
 */
export async function deleteDemo(id: string): Promise<Demo[]> {
  const current = await getDemos();
  const updated = current.filter((d) => d.id !== id);
  saveDemos(updated);

  const supaSuccess = await deleteDemoFromSupabase(id);
  if (supaSuccess) {
    const fresh = await getAllDemosFromSupabase();
    if (fresh !== null) return fresh;
  } else {
    console.warn('[Admin] Supabase deleteDemo failed — localStorage backup is active.');
  }
  return updated;
}

/** Wrapper so admin imports only from @/lib/demos (keeps surface minimal).
 * Tries Supabase Storage upload first. Returns public URL or null (caller falls back).
 */
export async function uploadDemoImage(file: File): Promise<string | null> {
  return uploadImageToDemosBucket(file);
}

/** Reset to original defaults (localStorage only).
 * Does not clear Supabase table — use for local recovery or when Supabase is not connected.
 * To clear Supabase data, use the Supabase dashboard or delete rows manually.
 */
export function resetToDefaults(): Demo[] {
  saveDemos([...DEFAULT_DEMOS]);
  return [...DEFAULT_DEMOS];
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
  return {
    title: d.title,
    subtitle: d.description,
    category: d.category,
    href: d.href,
    image: d.image,
  };
}

/**
 * Generate clean, ready-to-paste TypeScript source for the DEFAULT_DEMOS array.
 * Used by the Admin "Export to demos.ts" feature.
 * Output matches the exact shape, formatting style, and key order used in this file.
 * Includes a helpful header comment for the user.
 */
export function generateDemosTsCode(demos: Demo[]): string {
  const sorted = [...demos].sort((a, b) => a.sortOrder - b.sortOrder);

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
    fields.push(`    sortOrder: ${d.sortOrder},`);
    fields.push(`    visible: ${d.visible},`);
    const closing = `  }${idx < sorted.length - 1 ? "," : ""}`;
    return `  {\n${fields.join("\n")}\n${closing}`;
  });

  const body = itemStrings.join("\n\n");
  const footer = `\n];`;

  return header + body + footer;
}

// NOTE FOR FUTURE EDITS:
// To add many more demos (e.g. 30+ food trucks), just append objects to DEFAULT_DEMOS above.
// Descriptions render on demo cards (line-clamp-2 mobile, line-clamp-3 desktop).
// Always provide accurate local thumbnail paths.
// No other files need changes for new demos to appear on /work and homepage featured area.
// The structure is: title | href (as url) | description | category | image (thumbnail)


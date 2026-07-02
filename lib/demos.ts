/**
 * BLUEGRASS DIGITAL FORGE — Demo Management
 * 
 * Shared data layer for public homepage / work pages and the /admin panel.
 * 
 * Persistence: localStorage (client-side only)
 * - Easy to export as JSON
 * - Images can be base64 data URLs (uploaded via admin) or static paths
 * - Changes made in /admin are immediately reflected when public pages are loaded/refreshed
 * - "Publish Changes" in admin forces a save + visual confirmation
 * 
 * Follows Master Project Settings: clean, maintainable, performant.
 */

export interface Demo {
  id: string;
  title: string;
  slug: string;
  category: string;
  href: string;
  description: string;
  image?: string; // Can be /assets/... path OR base64 data: URL (from admin drag-and-drop)
  sortOrder: number;
  visible: boolean;
}

const STORAGE_KEY = "bdf_demos_v1";

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
    description: "Bold food truck website Kentucky with live schedule, menu and ordering for Lake Cumberland businesses. Built by the Monticello KY website designer.",
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
  {
    id: "demo-16",
    title: "Bluegrass Digital Forge Templates",
    slug: "bluegrass-templates",
    category: "Template Library",
    href: "https://bluegrass-digital-forge-templates.lovable.app",
    description: "Browse the full lineup of ready-to-launch website templates for local Kentucky businesses.",
    image: "/assets/demo-bluegrass-templates.jpg",
    sortOrder: 16,
    visible: true,
  },
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

/** Get all demos (from localStorage or defaults) */
export function getDemos(): Demo[] {
  if (typeof window === "undefined") return [...DEFAULT_DEMOS];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Demo[];
      // Merge any missing defaults or keep user data
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load demos from localStorage", e);
  }
  return [...DEFAULT_DEMOS];
}

/** Get only visible demos, sorted by sortOrder (for public pages) */
export function getPublicDemos(): Demo[] {
  return getDemos()
    .filter((d) => d.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Save demos array to localStorage */
export function saveDemos(demos: Demo[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demos));
    // Dispatch storage event so other tabs/pages can react (optional)
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch (e) {
    console.error("Failed to save demos", e);
  }
}

/** Add a new demo. Returns the saved list. */
export function addDemo(newDemo: Omit<Demo, "id">): Demo[] {
  const demos = getDemos();
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const demoWithId: Demo = { ...newDemo, id };
  const updated = [...demos, demoWithId];
  saveDemos(updated);
  return updated;
}

/** Update existing demo by id */
export function updateDemo(id: string, updates: Partial<Demo>): Demo[] {
  const demos = getDemos();
  const updated = demos.map((d) => (d.id === id ? { ...d, ...updates } : d));
  saveDemos(updated);
  return updated;
}

/** Delete demo by id */
export function deleteDemo(id: string): Demo[] {
  const demos = getDemos();
  const updated = demos.filter((d) => d.id !== id);
  saveDemos(updated);
  return updated;
}

/** Reset to original defaults (useful for testing / recovery) */
export function resetToDefaults(): Demo[] {
  saveDemos([...DEFAULT_DEMOS]);
  return [...DEFAULT_DEMOS];
}

/** Check if slug is unique (excluding optional current id) */
export function isSlugUnique(slug: string, excludeId?: string): boolean {
  const demos = getDemos();
  return !demos.some((d) => d.slug === slug && d.id !== excludeId);
}

/** Generate a unique slug */
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

/**
 * First-party SEO content for demo landing pages at /work/[slug].
 * Portfolio examples only — not live client sites. Keep copy warm and understated.
 */

export type DemoLandingSampleItem = {
  name: string;
  detail: string;
};

export type DemoLandingContent = {
  slug: string;
  /** Document title (without site name suffix if layout adds one) */
  title: string;
  metaDescription: string;
  h1: string;
  /** Short eyebrow under the portfolio label */
  categoryLabel: string;
  intro: string;
  featuresHeading: string;
  features: string[];
  sampleHeading: string;
  sampleIntro?: string;
  sampleItems: DemoLandingSampleItem[];
  serviceAreaNote?: string;
  whyItHelps: string;
  /** Path to specialty hub, e.g. /food-truck-websites */
  specialtyHub: string;
  specialtyHubLabel: string;
  relatedSlugs: string[];
};

const LANDINGS: Record<string, DemoLandingContent> = {
  "smoky-wheels": {
    slug: "smoky-wheels",
    title: "Food Truck Website Example | Smoky Wheels – Lake Cumberland",
    metaDescription:
      "A working example of a food truck website for Lake Cumberland — today’s location, a simple menu, and festival stops. Built in Monticello, KY. Portfolio piece by Bluegrass Digital Forge.",
    h1: "Smoky Wheels – Food Truck Website Example",
    categoryLabel: "Food truck",
    intro:
      "A working example of a food truck site built for the way operators actually move around Lake Cumberland — location updates, a simple menu, and festival stops. Built in Monticello as a portfolio piece you can click through and study.",
    featuresHeading: "What’s on this example",
    features: [
      "A clear “where we are today” area for daily spots and hours",
      "Menu with photos and short descriptions",
      "Festival and event notes so regulars know the weekend plan",
      "Easy phone and map links for people searching from the road",
      "A simple path for pre-orders or catering questions",
      "Mobile layout that works in a parking lot or marina lot",
    ],
    sampleHeading: "Sample menu language (example only)",
    sampleIntro:
      "Real sites need readable text Google and customers can both use — not just photos. Here’s the kind of wording that fits a Lake Cumberland truck:",
    sampleItems: [
      {
        name: "Smoked brisket sandwich",
        detail:
          "Slow-smoked, house sauce, pickles — the kind of plate people look up before they leave the ramp.",
      },
      {
        name: "Lake day nachos",
        detail:
          "Pulled pork, queso, jalapeños — built for groups walking up from the lot.",
      },
      {
        name: "Festival special",
        detail:
          "Half rack and slaw when the truck’s booked at a weekend event near Burnside or downtown Monticello.",
      },
      {
        name: "Where we are today",
        detail:
          "Example note: “Conley Bottom marina lot · 11–3” or “Monticello lunch stop · sold out of brisket after 1.”",
      },
    ],
    serviceAreaNote:
      "Language on a truck site like this often mentions marina lots, Main Street lunch stops, and festival weekends from Monticello toward Jamestown, Russell Springs, Burnside, and Somerset — wherever the week actually takes the truck.",
    whyItHelps:
      "Food truck customers mostly need two answers: where are you, and what’s on the menu. A clear site makes those easy to find on a phone, so people aren’t guessing from a half-updated social post while they’re already in the car.",
    specialtyHub: "/food-truck-websites",
    specialtyHubLabel: "Food truck websites",
    relatedSlugs: [
      "fiesta-taqueria",
      "hickory-forge-steakhouse",
      "anchorline-guide-service",
    ],
  },

  "anchorline-guide-service": {
    slug: "anchorline-guide-service",
    title: "Fishing Guide Website Example | Lake Cumberland",
    metaDescription:
      "Portfolio example of a Lake Cumberland fishing guide website — trip types, booking path, and plain captain language. Built in Monticello, KY by Bluegrass Digital Forge.",
    h1: "Anchorline Guide Service – Fishing Guide Website Example",
    categoryLabel: "Fishing guide",
    intro:
      "A quiet, practical example of how a Lake Cumberland fishing guide site can read — trip types, a simple way to inquire, and language that sounds like the water, not a brochure from three states away. Built in Monticello as a portfolio piece for captains who launch from the usual ramps.",
    featuresHeading: "What’s on this example",
    features: [
      "Species-based trip pages (striper, bass, multi-species)",
      "Clear half-day and full-day options",
      "Captain bio and what to bring",
      "Gallery space for real days on the water",
      "Simple inquiry form for date and party size",
      "Meeting-point notes for common launches",
    ],
    sampleHeading: "Sample trip types (example only)",
    sampleIntro:
      "Guides book when anglers understand the day. Text like this helps more than a single “contact us” button:",
    sampleItems: [
      {
        name: "Half-day striper hunt",
        detail:
          "Morning or afternoon on the lake — good for visitors staying near Jamestown or State Dock who want a focused few hours.",
      },
      {
        name: "Full-day multi-species",
        detail:
          "A longer day that can flex with the bite — striper, bass, or whatever’s moving.",
      },
      {
        name: "Bass-focused mornings",
        detail:
          "For anglers who want structure and cover work rather than a mixed charter feel.",
      },
      {
        name: "What to bring",
        detail:
          "Sunscreen, layers, snacks, and a cooler if you plan to keep fish within the rules — spelled out so first-timers aren’t guessing.",
      },
    ],
    serviceAreaNote:
      "This kind of site usually mentions the ramps a captain actually uses — State Dock and Jamestown, Creelsboro, Conley Bottom and Beaver Creek near Monticello, Burnside approaches, and quieter access around Russell Springs or the southern shore when the week calls for it.",
    whyItHelps:
      "Out-of-town anglers often compare a few options from the cabin or the truck. Clear trip types, honest photos, and an easy phone or form path make it simpler to choose a captain without a long back-and-forth on social media.",
    specialtyHub: "/fishing-guide-websites",
    specialtyHubLabel: "Fishing guide websites",
    relatedSlugs: [
      "smoky-wheels",
      "fiesta-taqueria",
      "hickory-forge-steakhouse",
    ],
  },

  "fiesta-taqueria": {
    slug: "fiesta-taqueria",
    title: "Food Truck Website Example | Fiesta Taqueria – Lake Cumberland",
    metaDescription:
      "Portfolio Mexican food truck website example for Monticello and Wayne County — menu, today’s location, catering notes for locals and lake traffic. Built in Monticello, KY.",
    h1: "Fiesta Taqueria – Food Truck Website Example",
    categoryLabel: "Food truck",
    intro:
      "A simple example of a Mexican food truck site with a readable menu, a clear “where we are” path, and catering notes — the kind of page that works for both locals in Monticello and weekend lake traffic around Wayne County. Built here as a portfolio piece, not a live truck listing.",
    featuresHeading: "What’s on this example",
    features: [
      "Digital menu you can actually read on a phone",
      "Today’s location and hours made easy to find",
      "Catering and large-order notes",
      "Warm photography of real food (not stock filler)",
      "Tap-to-call and map links for people already on the road",
      "Space for specials without redesigning the whole site",
    ],
    sampleHeading: "Sample menu language (example only)",
    sampleIntro:
      "Menus that exist as real text help both guests and search. Example wording for a Wayne County Mexican truck:",
    sampleItems: [
      {
        name: "Street tacos",
        detail:
          "Al pastor, carne asada, pollo — short descriptions so someone scanning after a day on the water can decide fast.",
      },
      {
        name: "Family trays",
        detail:
          "Built for groups — cabin crowds, marina lots, or a table that doesn’t want twelve separate orders.",
      },
      {
        name: "Catering for local events",
        detail:
          "Notes for Monticello, Albany, and Jamestown gatherings — a form or phone path beats a buried email address.",
      },
      {
        name: "Where we are today",
        detail:
          "Example note: “Downtown Monticello lunch · 11–2” or “Saturday at the festival lot near Burnside.”",
      },
    ],
    serviceAreaNote:
      "A truck site like this often speaks to Monticello and Wayne County first, with natural nods to Albany, Jamestown, marina lots, and boaters stopping for lunch after Conley Bottom or other nearby launches.",
    whyItHelps:
      "When someone searches for tacos near the lake, they want the menu, where the truck is today, and whether you can handle a group — without hunting through old social posts. A clean page answers that without much fuss.",
    specialtyHub: "/food-truck-websites",
    specialtyHubLabel: "Food truck websites",
    relatedSlugs: [
      "smoky-wheels",
      "hickory-forge-steakhouse",
      "anchorline-guide-service",
    ],
  },

  "hickory-forge-steakhouse": {
    slug: "hickory-forge-steakhouse",
    title: "Steakhouse Website Example | Lake Cumberland",
    metaDescription:
      "Warm steakhouse website example for Lake Cumberland restaurants — digital menu, reservation feel, neighborhood tone. Portfolio piece built in Monticello, KY.",
    h1: "Hickory Forge Steakhouse – Restaurant Website Example",
    categoryLabel: "Steakhouse",
    intro:
      "A warmer, neighborhood-style steakhouse example — less cinematic flash, more “good supper after a day on the water.” Digital menu, a simple reservation path, and a tone that fits Lake Cumberland rather than a big-city chain template. Built in Monticello as a portfolio sample.",
    featuresHeading: "What’s on this example",
    features: [
      "Menu sections for steaks, sides, and specials",
      "Reservation or call-ahead path",
      "About section that feels local, not corporate",
      "Photo-led presentation of the room and the plate",
      "Hours and location for phone users",
      "Room for bourbon or house specials without clutter",
    ],
    sampleHeading: "Sample menu language (example only)",
    sampleIntro:
      "This example leans into a friendly supper-house feel — different from a fine-dining showcase:",
    sampleItems: [
      {
        name: "Hand-cut ribeye",
        detail:
          "A straightforward steak description with the sides people expect — no overwrought language.",
      },
      {
        name: "Lake supper sides",
        detail:
          "Loaded potato, seasonal vegetables, house salad — the kind of list a family table actually orders from.",
      },
      {
        name: "Weekend specials",
        detail:
          "A short board for Friday prime rib or a catch special when it makes sense — updated without a full redesign.",
      },
      {
        name: "Reservations",
        detail:
          "A simple form or tap-to-call for Saturday nights when boaters and locals both show up hungry.",
      },
    ],
    serviceAreaNote:
      "Copy on a site like this can sit comfortably between Monticello, the Wayne County shore, and weekend guests coming through Burnside, Nancy, or Jamestown for a sit-down meal after the lake.",
    whyItHelps:
      "A steakhouse site doesn’t need to shout. Clear menu, honest photos, and an easy way to reserve or call are usually enough — especially when guests are deciding between a few local options on their phone.",
    specialtyHub: "/work",
    specialtyHubLabel: "All website examples",
    relatedSlugs: [
      "fiesta-taqueria",
      "smoky-wheels",
      "anchorline-guide-service",
    ],
  },
};

/** Short blurbs for hub “Live examples” cards — unique from full landing intros. */
export const HUB_DEMO_BLURBS: Record<string, string> = {
  "smoky-wheels":
    "Location updates, menu, and festival stops for a truck that moves around the lake — a simple reference for Kentucky food truck sites.",
  "anchorline-guide-service":
    "Trip types, captain intro, and a plain booking path for striper and multi-species days on Lake Cumberland.",
  "fiesta-taqueria":
    "Mexican food truck example with a readable menu, today’s location, and catering notes for Wayne County and lake traffic.",
  "hickory-forge-steakhouse":
    "A warmer neighborhood steakhouse layout with menu and reservation feel for Lake Cumberland supper traffic.",
};

export function getDemoLanding(slug: string): DemoLandingContent | undefined {
  return LANDINGS[slug];
}

export function hasDemoLanding(slug: string): boolean {
  return Boolean(LANDINGS[slug]);
}

export function getAllDemoLandingSlugs(): string[] {
  return Object.keys(LANDINGS);
}

export function getDemoLandings(): DemoLandingContent[] {
  return Object.values(LANDINGS);
}

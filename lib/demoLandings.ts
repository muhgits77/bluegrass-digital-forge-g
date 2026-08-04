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
      "A quiet, practical example of how a Lake Cumberland fishing guide site can read — trip types, a simple way to inquire, and language that sounds like the water, not a brochure from three states away. Built in Monticello as a portfolio piece for captains who launch from the usual ramps. Real builds: flat one-time pricing and full ownership of the finished site.",
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
      "landing-point-bait-tackle",
      "smoky-wheels",
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
      "A simple example of a Mexican food truck site with a readable menu, a clear “where we are” path, and catering notes — the kind of page that works for both locals in Monticello and weekend lake traffic around Wayne County. Portfolio piece only (not a live truck listing). Real projects: flat one-time pricing, full ownership of the code.",
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
      "A warmer, neighborhood-style steakhouse example — less cinematic flash, more “good supper after a day on the water.” Digital menu, a simple reservation path, and a tone that fits Lake Cumberland rather than a big-city chain template. Built in Monticello as a portfolio sample. Flat one-time pricing on real projects; you own the code.",
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
    specialtyHub: "/restaurant-websites",
    specialtyHubLabel: "Restaurant websites",
    relatedSlugs: [
      "sunny-hollow-donut-dash",
      "fiesta-taqueria",
      "smoky-wheels",
    ],
  },

  "landing-point-bait-tackle": {
    slug: "landing-point-bait-tackle",
    title: "Bait Shop Website Example | Lake Cumberland & Wayne County",
    metaDescription:
      "Portfolio bait and tackle website example for Lake Cumberland — live bait notes, tackle, fishing reports, call-ahead holds. Built in Monticello, KY.",
    h1: "Landing Point Bait & Tackle – Shop Website Example",
    categoryLabel: "Bait & tackle shop",
    intro:
      "A working example of a bait and tackle shop site for Lake Cumberland anglers — live bait notes, tackle they can scan on a phone, and a simple call-ahead path before they leave the ramp. Built in Monticello as a portfolio piece for shops that serve marina traffic and weekend boaters.",
    featuresHeading: "What’s on this example",
    features: [
      "Live bait availability notes that can change with the day",
      "Tackle catalog space without feeling like a big-box warehouse",
      "Fishing report or lake conditions notes",
      "Call-ahead holds for bait before a launch",
      "Hours and directions for ramps and marina approaches",
      "Mobile layout that works with weak signal near the water",
    ],
    sampleHeading: "Sample shop language (example only)",
    sampleIntro:
      "Anglers decide fast on a busy Saturday. Text like this helps more than a single “contact us” button:",
    sampleItems: [
      {
        name: "Live bait board",
        detail:
          "Example note: “Shad and minnows in · nightcrawlers low — call ahead if you need a dozen.”",
      },
      {
        name: "Tackle for the lake",
        detail:
          "Short lists for striper and bass gear — the stuff people actually ask for at Conley Bottom or Burnside approaches.",
      },
      {
        name: "Weekend fishing notes",
        detail:
          "A quiet report line: water color, what locals are throwing, nothing that pretends to be a TV weather segment.",
      },
      {
        name: "Call-ahead holds",
        detail:
          "Hold a couple dozen bait before you leave the cabin — one tap to call the shop from the parking lot.",
      },
    ],
    serviceAreaNote:
      "A shop site like this usually speaks to Wayne County launches, marina lots, and weekend boaters moving between Monticello, Jamestown, Burnside, and the ramps in between — people who need bait before the boat goes in the water.",
    whyItHelps:
      "Anglers already have a full morning. They want to know if you have bait, what tackle is stocked, and how to get there — without a long scroll through social posts. A clear page answers that before they drive to the wrong lot.",
    specialtyHub: "/fishing-guide-websites",
    specialtyHubLabel: "Fishing guide websites",
    relatedSlugs: [
      "anchorline-guide-service",
      "smoky-wheels",
      "hickory-forge-steakhouse",
    ],
  },

  "sunny-hollow-donut-dash": {
    slug: "sunny-hollow-donut-dash",
    title: "Donut Shop Website Example | Small-Town Kentucky",
    metaDescription:
      "Portfolio donut shop website example for small-town Kentucky — daily menu, simple pre-orders, morning traffic feel. Built in Monticello for Lake Cumberland visitors and locals.",
    h1: "Sunny Hollow Donut Dash – Shop Website Example",
    categoryLabel: "Donut shop",
    intro:
      "A cheerful, small-town example of a donut shop site — daily menu, simple pre-order path, and a tone that fits Monticello mornings and weekend lake visitors stopping for coffee and something sweet. Built here as a portfolio piece, not a live bakery listing.",
    featuresHeading: "What’s on this example",
    features: [
      "Daily menu that can change without a full redesign",
      "Simple online ordering or pre-order path",
      "Hours and pickup notes for morning traffic",
      "Photo space for real donuts and drinks",
      "Tap-to-call for last-minute dozen orders",
      "Mobile layout for people already in the car",
    ],
    sampleHeading: "Sample menu language (example only)",
    sampleIntro:
      "Morning customers decide quickly. Readable text helps both regulars and lake visitors:",
    sampleItems: [
      {
        name: "Classic glazed dozen",
        detail:
          "The everyday box — short description so out-of-towners know what they’re picking up.",
      },
      {
        name: "Weekend specials",
        detail:
          "Maple bacon, seasonal fruit glaze, or whatever the fryer has that morning — listed in plain language.",
      },
      {
        name: "Coffee and cold drinks",
        detail:
          "Enough to pair with the box for a cabin drive or a Main Street breakfast.",
      },
      {
        name: "Pre-order for Saturday",
        detail:
          "Example note: “Reserve a dozen before 8 a.m. pickup — useful when the lake road is already busy.”",
      },
    ],
    serviceAreaNote:
      "This kind of shop page often sits between Monticello and Wayne County morning traffic and weekend guests heading toward Jamestown, Burnside, or the southern shore — people who want a quick stop without a long hunt online.",
    whyItHelps:
      "When someone wants donuts on the way to the lake, they need hours, today’s flavors, and a way to order or call — not a dead Facebook page. A simple site makes that easy on a phone.",
    specialtyHub: "/restaurant-websites",
    specialtyHubLabel: "Restaurant websites",
    relatedSlugs: [
      "hickory-forge-steakhouse",
      "fiesta-taqueria",
      "smoky-wheels",
    ],
  },

  "bluegrass-fence-co": {
    slug: "bluegrass-fence-co",
    title: "Fence Company Website Example | Bluegrass Fence Co. – Lake Cumberland",
    metaDescription:
      "Portfolio fence builder website for Somerset, Lake Cumberland, and Central Kentucky — services, project photos, free-quote path. Flat pricing. Built in Monticello, KY.",
    h1: "Bluegrass Fence Co. – Fence & Outdoor Website Example",
    categoryLabel: "Fence & outdoor",
    intro:
      "A practical portfolio example of a fence company website — clear service list, real project photos, and an easy free-quote path for homeowners around Somerset, Lake Cumberland, and Central Kentucky. Built in Monticello as a sample, not a live contractor listing.",
    featuresHeading: "What’s on this example",
    features: [
      "Service pages for residential, farm, and specialty fencing",
      "Portfolio gallery of real-looking installs",
      "Simple free-quote or estimate request form",
      "Service-area language for Somerset and lake towns",
      "Tap-to-call for property owners already on site",
      "Mobile layout that works on a job site phone",
    ],
    sampleHeading: "Sample service language (example only)",
    sampleIntro:
      "Fence buyers want to know what you build and how to get a number — not a long brochure:",
    sampleItems: [
      {
        name: "Privacy & residential",
        detail:
          "Wood, vinyl, and horizontal styles — short descriptions so a homeowner can match the look they want.",
      },
      {
        name: "Farm & horse fence",
        detail:
          "Pasture and paddock work common around Wayne County and the ridges outside town.",
      },
      {
        name: "Chain link & security",
        detail:
          "Straightforward options for shops, yards, and rental properties.",
      },
      {
        name: "Free quote path",
        detail:
          "Example note: “Tell us the approximate length and style — we call back from Monticello / Somerset area.”",
      },
    ],
    serviceAreaNote:
      "A fence site like this usually speaks to Somerset, Monticello, Wayne County, and property owners around Lake Cumberland — people comparing builders after a storm, a new lot, or a livestock upgrade.",
    whyItHelps:
      "Fence work is local and visual. Clear services, honest photos, and a quote form beat a Facebook page that’s hard to search from a driveway. Flat one-time pricing and full code ownership keep the build as practical as the fence itself.",
    specialtyHub: "/work",
    specialtyHubLabel: "All portfolio examples",
    relatedSlugs: [
      "ridge-pasture-care",
      "ignite-fitness-company",
      "anchorline-guide-service",
    ],
  },

  "ignite-fitness-company": {
    slug: "ignite-fitness-company",
    title: "Gym Website Example | Local Fitness – Lake Cumberland",
    metaDescription:
      "Portfolio gym website example for Monticello and Lake Cumberland towns — class schedules, memberships, join path. Flat pricing. Built in Monticello, KY.",
    h1: "Ignite Fitness Company – Gym Website Example",
    categoryLabel: "Fitness / gym",
    intro:
      "A clean example of a local gym website — class schedules, membership options, and a clear path to join without agency noise. Built in Monticello as a portfolio piece for fitness studios serving Wayne County and nearby lake towns.",
    featuresHeading: "What’s on this example",
    features: [
      "Class schedule layout that scans on a phone",
      "Membership tiers or “start here” options",
      "Trainer or coach intro space",
      "Tap-to-call and simple inquiry form",
      "Photo-led feel of the floor and energy",
      "Hours and location for first-time visitors",
    ],
    sampleHeading: "Sample gym language (example only)",
    sampleIntro:
      "New members decide fast. Plain wording helps more than hype:",
    sampleItems: [
      {
        name: "Group classes",
        detail:
          "Morning strength, evening HIIT, weekend mobility — listed so people can see if it fits their week.",
      },
      {
        name: "Membership options",
        detail:
          "Month-to-month or simple packages — no maze of fine print on the first screen.",
      },
      {
        name: "First visit",
        detail:
          "Example note: “Walk-ins welcome · call ahead for a free intro day.”",
      },
      {
        name: "Local feel",
        detail:
          "Language that fits a small-town gym near the lake — not a national chain template.",
      },
    ],
    serviceAreaNote:
      "This kind of gym page often serves Monticello, Albany, and drivers from Jamestown or Russell Springs who want a straightforward place to train without a long commute to a big-city club.",
    whyItHelps:
      "People searching for a gym near home want schedule, price shape, and a way to walk in or call. A fast site answers that — with flat one-time build pricing and full ownership of the code when you’re ready for the real thing.",
    specialtyHub: "/work",
    specialtyHubLabel: "All portfolio examples",
    relatedSlugs: [
      "bluegrass-fence-co",
      "ridge-pasture-care",
      "fiesta-taqueria",
    ],
  },

  "ridge-pasture-care": {
    slug: "ridge-pasture-care",
    title: "Land & Pasture Services Website | Wayne County KY",
    metaDescription:
      "Portfolio land and pasture services website for Wayne County — brush hogging, fence work, land clearing, free quotes. Built in Monticello, KY by Bluegrass Digital Forge.",
    h1: "Ridge Pasture Care – Land & Pasture Website Example",
    categoryLabel: "Land & pasture services",
    intro:
      "A working example of a rural services website for Wayne County — brush hogging, fence building, pasture renovation, and land clearing with a free-quote request. Portfolio piece built in Monticello; not a live contractor listing.",
    featuresHeading: "What’s on this example",
    features: [
      "Clear list of land and pasture services",
      "Free-quote request path for acreage work",
      "Local language for ridges, pastures, and fence lines",
      "Photo space for equipment and finished fields",
      "Tap-to-call for same-week questions",
      "Mobile layout for owners standing in the field",
    ],
    sampleHeading: "Sample service language (example only)",
    sampleIntro:
      "Landowners want to know if you do their kind of job — and how to reach you:",
    sampleItems: [
      {
        name: "Brush hogging & mowing",
        detail:
          "Overgrown lots, fence rows, and seasonal cleanup around the ridge.",
      },
      {
        name: "Fence building & repair",
        detail:
          "Pasture and property line work — natural partner language with fence-focused demos.",
      },
      {
        name: "Pasture renovation",
        detail:
          "Seeding, clearing, and prep when a field needs more than a single pass.",
      },
      {
        name: "Free quote",
        detail:
          "Example note: “Share acreage and what you need done — we reply from Monticello / Wayne County.”",
      },
    ],
    serviceAreaNote:
      "Copy on a site like this sits naturally in Wayne County — Monticello and the surrounding ridges — with work requests from owners who also look toward Albany, Jamestown, and lake-road properties.",
    whyItHelps:
      "Rural service buyers rarely want a flashy brochure. They want services, proof you work this land, and a quote form that works on a phone. Flat pricing and full ownership match how these businesses already operate.",
    specialtyHub: "/work",
    specialtyHubLabel: "All portfolio examples",
    relatedSlugs: [
      "bluegrass-fence-co",
      "anchorline-guide-service",
      "ignite-fitness-company",
    ],
  },

  "blue-door-smokehouse": {
    slug: "blue-door-smokehouse",
    title: "BBQ Restaurant Website Example | Blue Door Smokehouse – Lake Cumberland",
    metaDescription:
      "Portfolio Kentucky pit BBQ website for Lake Cumberland — menu, catering, local supper-house feel. Flat pricing. Built in Monticello, KY.",
    h1: "Blue Door Smokehouse – BBQ Website Example",
    categoryLabel: "BBQ restaurant",
    intro:
      "A warm pit-BBQ restaurant example for Lake Cumberland — readable menu, catering notes, and a tone that feels like a real Kentucky smokehouse rather than a chain template. Portfolio piece built in Monticello; not a live restaurant listing.",
    featuresHeading: "What’s on this example",
    features: [
      "Menu sections for plates, sandwiches, and sides",
      "Catering and group-order path",
      "Story / pitmaster space with local feel",
      "Hours and location for lake and town traffic",
      "Photo-led presentation of real smoked plates",
      "Tap-to-call for Saturday night crowds",
    ],
    sampleHeading: "Sample menu language (example only)",
    sampleIntro:
      "BBQ guests decide with their eyes and a few plain words:",
    sampleItems: [
      {
        name: "Brisket plate",
        detail:
          "Slow-smoked, house sauce, pickles — short enough to read after a day on the water.",
      },
      {
        name: "Pulled pork & ribs",
        detail:
          "Family trays and half racks for cabin groups and marina-lot crowds.",
      },
      {
        name: "Catering",
        detail:
          "Notes for church dinners, reunions, and lake weekends — form or phone, not a buried email.",
      },
      {
        name: "Hours",
        detail:
          "Example note: “Friday–Sunday pit hours · call ahead for large trays.”",
      },
    ],
    serviceAreaNote:
      "A smokehouse site like this can sit between Monticello, Somerset, and weekend guests coming off the lake through Burnside, Jamestown, or Nancy — people hunting supper after the boat is tied up.",
    whyItHelps:
      "Clear menu, honest food photos, and an easy catering path convert better than a photo dump on social. Real projects use flat one-time pricing and full ownership of the finished site.",
    specialtyHub: "/restaurant-websites",
    specialtyHubLabel: "Restaurant websites",
    relatedSlugs: [
      "hickory-forge-steakhouse",
      "fiesta-taqueria",
      "smoky-wheels",
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
  "landing-point-bait-tackle":
    "Bait availability, tackle notes, and call-ahead holds for Lake Cumberland anglers and lake-road traffic.",
  "sunny-hollow-donut-dash":
    "Small-town donut shop with daily menu and a simple pre-order path for morning and lake-road traffic.",
  "bluegrass-fence-co":
    "Fence builder example for Somerset and Lake Cumberland — services, project photos, and a free-quote path.",
  "ignite-fitness-company":
    "Local gym layout with class schedules, memberships, and a clear join path for small-town Kentucky.",
  "ridge-pasture-care":
    "Wayne County land and pasture services — brush hogging, fence work, free quotes for ridge properties.",
  "blue-door-smokehouse":
    "Kentucky pit BBQ layout with menu, catering, and a local supper-house feel for lake and town traffic.",
  "sea-island-soul":
    "Lowcountry Gullah Geechee food truck example — heritage menu and mobile location for SC coastal routes.",
};

function normalizeLandingSlug(slug: string): string {
  if (!slug) return "";
  let s = slug;
  try {
    s = decodeURIComponent(s);
  } catch {
    // keep raw
  }
  return s.trim().replace(/^\/+|\/+$/g, "").toLowerCase();
}

export function getDemoLanding(slug: string): DemoLandingContent | undefined {
  return LANDINGS[normalizeLandingSlug(slug)];
}

export function hasDemoLanding(slug: string): boolean {
  return Boolean(LANDINGS[normalizeLandingSlug(slug)]);
}

export function getAllDemoLandingSlugs(): string[] {
  return Object.keys(LANDINGS);
}

export function getDemoLandings(): DemoLandingContent[] {
  return Object.values(LANDINGS);
}

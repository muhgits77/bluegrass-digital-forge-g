import type { LocalLandingProps } from "@/components/LocalLandingPage";

export const content: LocalLandingProps = {
  path: "/web-design-russell-springs-ky",
  label: "RUSSELL SPRINGS, KY — RUSSELL COUNTY",
  h1: "Web Design for Russell Springs, KY Businesses",
  intro:
    "Russell Springs sits in Russell County on the Cumberland Parkway and US 127, a short drive from Jamestown and the lake. I build websites for Russell Springs and Russell County businesses from my shop in Monticello.",
  sections: [
    {
      title: "On the way to the lake",
      body: "Lake Cumberland State Resort Park, the State Dock area and Wolf Creek Dam are all nearby in Russell County, so plenty of lake traffic passes through Russell Springs. A clear website helps weekend visitors find you, not just locals who already know where you are.",
    },
    {
      title: "Town businesses and lake businesses",
      body: "Restaurants, shops, auto and service businesses in town, plus fishing guides, lake house owners, rentals and dock services closer to the water. Each needs something a little different: hours and menus, rates and booking, or a service list and tap-to-call.",
    },
    {
      title: "Small sites that do the job",
      body: "Most Russell County businesses don't need a 20-page site. They need a fast one that loads on spotty signal, answers the common questions and makes it easy to call or message. That's what I build.",
    },
  ],
  builds: [
    "Mobile-first sites with tap-to-call and clear hours",
    "Booking or inquiry forms for guides, rentals and lake houses",
    "Menus and specials for restaurants and food trucks",
    "Service lists and quote forms for contractors and shops",
    "Flat one-time pricing; you own the finished site and code",
  ],
  areaServed: [
    { type: "City", name: "Russell Springs" },
    { type: "City", name: "Jamestown" },
    { type: "City", name: "Creelsboro" },
    { type: "AdministrativeArea", name: "Russell County" },
    { type: "Place", name: "Lake Cumberland" },
  ],
  serviceName: "Web design for Russell Springs, KY businesses",
  notLocal: {
    href: "https://bluegrasstemplates.com/small-business-website-templates",
    label: "Small business website templates",
  },
};

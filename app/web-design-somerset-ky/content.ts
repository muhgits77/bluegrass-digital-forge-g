import type { LocalLandingProps } from "@/components/LocalLandingPage";

export const content: LocalLandingProps = {
  path: "/web-design-somerset-ky",
  label: "SOMERSET, KY — PULASKI COUNTY",
  h1: "Web Design for Somerset, KY Businesses",
  intro:
    "Somerset is the Pulaski County seat and the biggest town on the north side of Lake Cumberland. I'm a web designer about a half-hour south in Monticello, building fast, honest websites for Somerset businesses.",
  sections: [
    {
      title: "A busier town means more competition in search",
      body: "Somerset has more restaurants, contractors, shops and service businesses than the smaller lake towns, all along US 27 and the Cumberland Parkway. When someone searches on a phone, the business with clear hours, services and a tap-to-call button usually gets the call.",
    },
    {
      title: "Town traffic and lake traffic",
      body: "Burnside, Nancy and the Waitsboro area are close by, so Somerset businesses serve both locals and people heading to the lake. Your site can speak to both: what you do in town, and how you help lake house owners and visitors.",
    },
    {
      title: "Built for the businesses that keep Pulaski County running",
      body: "Restaurants and food trucks, contractors and home services, auto and tire shops, retail stores, salons and professional offices. Each gets a site that fits how its customers actually decide, not a one-size-fits-all theme.",
    },
  ],
  builds: [
    "Mobile-first sites with tap-to-call and clear hours",
    "Service lists, service areas and quote or contact forms",
    "Menus, specials and today's location for restaurants and food trucks",
    "Local search basics: page titles, descriptions and Google Business Profile tie-in",
    "Flat one-time pricing; you own the finished site and code",
  ],
  areaServed: [
    { type: "City", name: "Somerset" },
    { type: "City", name: "Burnside" },
    { type: "City", name: "Nancy" },
    { type: "AdministrativeArea", name: "Pulaski County" },
    { type: "Place", name: "Lake Cumberland" },
  ],
  serviceName: "Web design for Somerset, KY businesses",
  notLocal: {
    href: "https://bluegrasstemplates.com/small-business-website-templates",
    label: "Small business website templates",
  },
};

import type { LocalLandingProps } from "@/components/LocalLandingPage";

export const content: LocalLandingProps = {
  path: "/contractor-websites",
  label: "SPECIALTY — CONTRACTOR WEBSITES",
  h1: "Contractor Websites for the Lake Cumberland Area",
  intro:
    "Websites for plumbers, roofers, HVAC companies, builders, lawn and tree crews, pressure washers and other trades in Wayne, Pulaski, Russell and McCreary counties. Built in Monticello, KY.",
  sections: [
    {
      title: "Get the phone ringing",
      body: "When a pipe bursts or a storm takes shingles, people search on a phone and call the first business that looks real and local. A contractor site should lead with tap-to-call, what you do, and where you work.",
    },
    {
      title: "Lake houses are part of the work",
      body: "Lake Cumberland has a lot of second homes, docks and boathouses. Owners often hire from a distance and need to trust you before they call. Clear service lists, photos of your own work and a simple quote form help.",
    },
    {
      title: "Show your service area plainly",
      body: "Name the towns and counties you actually cover, from Monticello and Albany to Somerset, Russell Springs, Jamestown and Whitley City, so the right customers find you and the wrong ones don't waste your time.",
    },
  ],
  builds: [
    "Tap-to-call header and an emergency banner if you take after-hours calls",
    "Service pages for each kind of job you want more of",
    "Free quote or estimate request forms",
    "Project photo galleries using your own photos",
    "Optional quote calculators (roofing, fence, HVAC, pressure washing)",
    "Flat one-time pricing; you own the finished site and code",
  ],
  areaServed: [
    { type: "AdministrativeArea", name: "Wayne County" },
    { type: "AdministrativeArea", name: "Pulaski County" },
    { type: "AdministrativeArea", name: "Russell County" },
    { type: "AdministrativeArea", name: "McCreary County" },
    { type: "Place", name: "Lake Cumberland" },
  ],
  serviceName: "Contractor websites for the Lake Cumberland area",
  notLocal: {
    href: "https://bluegrasstemplates.com/contractor-website-templates",
    label: "Contractor website templates",
  },
};

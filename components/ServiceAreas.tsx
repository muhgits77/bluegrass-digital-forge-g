import Link from "next/link";

/**
 * ServiceAreas — Strong, natural local SEO content for Lake Cumberland boat ramp towns.
 * Placed on homepage, services, and optionally a dedicated page.
 * Uses authentic Kentucky voice: neighborly, helpful, specific but never stuffed.
 * Mobile-first grid. Matches existing Tailwind + design system (earthy borders, warm accents).
 */

const areas = [
  {
    town: "Monticello, KY",
    detail: "Conley Bottom Resort & Beaver Creek Marina",
    desc: "Home base. Websites for marinas, bait shops, food trucks, and lake outfitters serving Wayne County launches.",
  },
  {
    town: "Jamestown, KY",
    detail: "State Dock, Lake Cumberland Marina & Recreation Area",
    desc: "Russell County’s busiest houseboat and guide center. Sites that help visitors find rentals, charters, and dinners dockside.",
  },
  {
    town: "Russell Springs, KY",
    detail: "Ramps off US 127 & KY 80 near Jamestown",
    desc: "Quiet access points popular with locals. Perfect for fishing guide and small marina sites that rank for real searches.",
  },
  {
    town: "Burnside, KY",
    detail: "Burnside Marina",
    desc: "Pulaski County gateway. Restaurant, lodging, and marina websites built for weekend boaters and families.",
  },
  {
    town: "Nancy, KY",
    detail: "Lee’s Ford Marina Resort",
    desc: "Popular full-service marina. Booking pages, menus, and local SEO for resorts and guides in the Nancy area.",
  },
  {
    town: "Somerset, KY",
    detail: "Nearby Pulaski County ramps & services",
    desc: "The largest nearby city. Strong sites for auto, dining, retail, and services that draw lake traffic.",
  },
  {
    town: "Albany, KY",
    detail: "Clinton County lake access",
    desc: "Southern shore businesses. Clean, fast sites that speak to weekenders heading to the water from Clinton County.",
  },
  {
    town: "Ferguson, KY",
    detail: "Local Pulaski ramps near Somerset/Burnside",
    desc: "Small-community feel with real lake traffic. Ideal for shops, contractors, and service businesses that need simple, trustworthy sites.",
  },
  {
    town: "Creelsboro, KY",
    detail: "Creelsboro Boat Ramp & Cumberland River access",
    desc: "Scenic public ramp loved by anglers. Sites for guides, cabins, and tackle that target serious Lake Cumberland fishermen.",
  },
];

export default function ServiceAreas() {
  return (
    <section className="py-12 border-t border-[#1a2225] bg-[#050708]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl mb-8">
          <div className="label tracking-[2px]">LAKE CUMBERLAND SERVICE AREAS</div>
          <h2 className="section-title tracking-tight mt-2">
            Websites for every major boat ramp town on the lake.
          </h2>
          <p className="mt-3 text-[15.5px] text-[#9aa6ad]">
            From Conley Bottom and Beaver Creek in Monticello to State Dock in Jamestown, Burnside Marina, Lee’s Ford near Nancy, Creelsboro, and all the ramps between — I build sites for the marinas, fishing guides, restaurants, and shops that serve Lake Cumberland visitors and locals. Real places. Real customers. Built by a neighbor in Monticello.
          </p>
          <p className="mt-2 text-[14.5px] text-[#c8cfd3]">Food truck owners especially love the real-time location and schedule tools — update today’s spot, hours, and festival stops from your phone so customers always find the truck.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5 flex flex-col"
            >
              <div>
                <div className="font-semibold tracking-tight text-[17px] text-white">
                  {area.town}
                </div>
                <div className="text-[#c17a5a] text-[13px] mt-0.5 font-medium tracking-tight">
                  {area.detail}
                </div>
              </div>
              <p className="mt-3 text-[14.5px] text-[#9aa6ad] leading-relaxed flex-1">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[14.5px]">
          <p className="text-[#8a9599]">
            Your customers launch here. Make sure they find you.
          </p>
          <Link
            href="/quote"
            className="btn btn-secondary text-sm px-6 py-2.5"
          >
            Get a local site for your ramp town →
          </Link>
          <Link
            href="/contact"
            className="text-[#f4a261] hover:underline text-sm"
          >
            Or just tell me about your spot
          </Link>
        </div>

        {/* Additive South Carolina expansion — does not modify existing Lake Cumberland content */}
        <div className="mt-10 pt-6 border-t border-[#1a2225]">
          <div className="text-[12.5px] uppercase tracking-[1.5px] text-[#c17a5a] mb-1">EXPANDING OUR REACH</div>
          <p className="text-[14.5px] text-[#9aa6ad]">
            We now also build websites for businesses across the South Carolina Lowcountry. <Link href="/south-carolina" className="text-[#f4a261] underline hover:text-white">See Charleston SC web design, Summerville small business websites, North Charleston restaurant sites &amp; more →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

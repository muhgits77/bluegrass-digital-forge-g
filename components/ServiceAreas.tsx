import Link from "next/link";

/**
 * ServiceAreas — Lake Cumberland boat ramp towns.
 * Full grid for /service-areas (and compact teaser for homepage / services).
 * Priority towns link to in-page anchors on /service-areas for deeper local content.
 */

const areas = [
  {
    town: "Monticello, KY",
    detail: "Conley Bottom Resort & Beaver Creek Marina",
    desc: "Home base. Websites for marinas, bait shops, food trucks, and lake outfitters serving Wayne County launches. Flat pricing, full ownership — built by a neighbor who lives here.",
    href: "/service-areas",
  },
  {
    town: "Jamestown, KY",
    detail: "State Dock, Lake Cumberland Marina & Recreation Area",
    desc: "Russell County’s busiest houseboat and guide center. Sites that help visitors find rentals, charters, and dinners dockside — especially peak-season searches.",
    href: "/service-areas#jamestown",
  },
  {
    town: "Russell Springs, KY",
    detail: "Ramps off US 127 & KY 80 near Jamestown",
    desc: "Quiet access points popular with locals. Perfect for fishing guide and small marina sites that rank for real nearby searches, not just big marina names.",
    href: "/service-areas#russell-springs",
  },
  {
    town: "Burnside, KY",
    detail: "Burnside Marina",
    desc: "Pulaski County gateway. Restaurant, lodging, and marina websites built for weekend boaters and families coming up US 27.",
    href: "/service-areas#burnside",
  },
  {
    town: "Nancy, KY",
    detail: "Lee’s Ford Marina Resort",
    desc: "Popular full-service marina. Booking pages, menus, and local SEO for resorts, guides, and shops in the Nancy area.",
    href: "/service-areas#nancy",
  },
  {
    town: "Somerset, KY",
    detail: "Nearby Pulaski County ramps & services",
    desc: "The largest nearby city. Strong sites for auto, dining, retail, and services that draw lake traffic year-round.",
    href: "/service-areas",
  },
  {
    town: "Albany, KY",
    detail: "Clinton County lake access · Grider Hill area",
    desc: "Southern shore businesses. Clean, fast sites that speak to weekenders heading to the water from Clinton County and points south.",
    href: "/service-areas#albany",
  },
  {
    town: "Ferguson, KY",
    detail: "Local Pulaski ramps near Somerset/Burnside",
    desc: "Small-community feel with real lake traffic. Ideal for shops, contractors, and service businesses that need simple, trustworthy sites.",
    href: "/service-areas",
  },
  {
    town: "Creelsboro, KY",
    detail: "Creelsboro Boat Ramp & Cumberland River access",
    desc: "Scenic public ramp loved by anglers. Sites for guides, cabins, and tackle that target serious Lake Cumberland fishermen.",
    href: "/service-areas",
  },
];

const compactTowns: { label: string; href: string }[] = [
  { label: "Monticello", href: "/service-areas" },
  { label: "Jamestown", href: "/service-areas#jamestown" },
  { label: "Burnside", href: "/service-areas#burnside" },
  { label: "Somerset", href: "/service-areas" },
  { label: "Russell Springs", href: "/service-areas#russell-springs" },
  { label: "Nancy", href: "/service-areas#nancy" },
  { label: "Albany", href: "/service-areas#albany" },
  { label: "Creelsboro", href: "/service-areas" },
];

type ServiceAreasProps = {
  /** full = exhaustive cards (dedicated page). compact = high-impact teaser. */
  variant?: "full" | "compact";
};

export default function ServiceAreas({ variant = "full" }: ServiceAreasProps) {
  if (variant === "compact") {
    return (
      <section className="section-block bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl mb-8">
            <div className="label mb-2">Lake Cumberland service areas</div>
            <h2 className="section-title tracking-tight">
              Built for the towns around the lake.
            </h2>
            <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed">
              Marinas, guides, restaurants, and shops from Monticello to
              Jamestown, Burnside, Russell Springs, Nancy, Albany, and every
              major ramp town — handcrafted by a neighbor who lives here. Flat
              pricing. You own the code.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {compactTowns.map((town) => (
              <Link key={town.label} href={town.href} className="area-chip hover:border-[var(--copper)]/50 transition-colors">
                {town.label}
              </Link>
            ))}
            <Link href="/south-carolina" className="area-chip area-chip--accent">
              + Lowcountry SC
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 text-[14.5px]">
            <Link href="/service-areas" className="btn btn-secondary text-sm px-6 py-2.5">
              See all service areas →
            </Link>
            <Link
              href="/marina-websites"
              className="text-[var(--copper-bright)] hover:underline text-sm font-semibold"
            >
              Marina sites →
            </Link>
            <Link
              href="/fishing-guide-websites"
              className="text-[var(--copper-bright)] hover:underline text-sm font-semibold"
            >
              Guide sites →
            </Link>
            <Link
              href="/food-truck-websites"
              className="text-[var(--copper-bright)] hover:underline text-sm font-semibold"
            >
              Food truck sites →
            </Link>
            <Link
              href="/south-carolina"
              className="text-[var(--copper-bright)] hover:underline text-sm font-semibold"
            >
              Charleston SC →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl mb-9">
          <div className="label tracking-[2px]">LAKE CUMBERLAND SERVICE AREAS</div>
          <h2 className="section-title tracking-tight mt-2">
            Websites for every major boat ramp town on the lake.
          </h2>
          <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed">
            From Conley Bottom and Beaver Creek in Monticello to State Dock in
            Jamestown, Burnside Marina, Lee’s Ford near Nancy, Creelsboro, and all
            the ramps between — sites for the marinas, fishing guides, restaurants,
            and shops that serve Lake Cumberland. Real places. Real customers.
            Built by a neighbor in Monticello. Flat one-time pricing. Full
            ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area, index) => (
            <Link
              key={index}
              href={area.href}
              className="area-card flex flex-col hover:border-[var(--copper)]/40 transition-colors"
            >
              <div>
                <div className="font-semibold tracking-tight text-[17px] text-white">
                  {area.town}
                </div>
                <div className="text-[var(--warm)] text-[13px] mt-0.5 font-medium tracking-tight">
                  {area.detail}
                </div>
              </div>
              <p className="mt-3 text-[14.5px] text-[var(--text-muted)] leading-relaxed flex-1">
                {area.desc}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[14.5px]">
          <p className="text-[var(--text-muted)]">
            Your customers launch here. Make sure they find you.
          </p>
          <Link href="/quote" className="btn btn-secondary text-sm px-6 py-2.5">
            Get a local site for your ramp town →
          </Link>
          <Link
            href="/contact"
            className="text-[var(--gold-light)] hover:underline text-sm"
          >
            Or just tell me about your spot
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)]">
          <div className="text-[12.5px] uppercase tracking-[1.5px] text-[var(--warm)] mb-1">
            EXPANDING OUR REACH
          </div>
          <p className="text-[14.5px] text-[var(--text-muted)]">
            We also build websites across the South Carolina Lowcountry.{" "}
            <Link
              href="/south-carolina"
              className="text-[var(--gold-light)] underline hover:text-white"
            >
              Charleston SC web design, Summerville small business websites &amp;
              more →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

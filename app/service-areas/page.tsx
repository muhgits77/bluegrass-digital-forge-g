import type { Metadata } from "next";
import Link from "next/link";
import ServiceAreas from "@/components/ServiceAreas";

export const metadata: Metadata = {
  title: "Lake Cumberland Boat Ramp Towns | Service Areas | Monticello KY Website Designer",
  description: "Bluegrass Digital Forge serves all major Lake Cumberland boat ramp towns: Monticello, Jamestown, Burnside, Nancy, Creelsboro, Russell Springs, Somerset, Albany, Ferguson and Wayne County. Local websites for marinas, fishing guides, restaurants and shops.",
  keywords: [
    "Lake Cumberland boat ramp towns",
    "Monticello KY website designer",
    "Jamestown KY web design",
    "Burnside marina website",
    "Creelsboro fishing guide site",
    "Lake Cumberland business websites",
  ],
};

export default function ServiceAreasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">SERVICE AREAS — LAKE CUMBERLAND</div>
        <h1 className="section-title tracking-tight mt-2">
          Websites for Lake Cumberland boat ramp towns.
        </h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">
          Handcrafted by a neighbor in Monticello for the marinas, fishing guides, restaurants, rentals, and shops that make every ramp from Conley Bottom to Creelsboro special. Mobile-first. Fast. Authentic Kentucky voice. Full ownership.
        </p>
      </div>

      {/* The rich areas grid */}
      <div className="mt-10">
        <ServiceAreas />
      </div>

      {/* Why local matters — helpful, non-stuffed */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
          <h3 className="font-semibold text-lg tracking-tight">Why towns near the ramps need better sites</h3>
          <p className="mt-3 text-[15px] text-[#9aa6ad] leading-relaxed">
            Boaters and families search on their phones at the ramp, in the parking lot, or while planning Friday night on the water. They look for “houseboat rental Jamestown”, “fishing guide Lake Cumberland”, “best steak near Burnside Marina”, or “bait shop Monticello KY”. A fast, clear, local-feeling site wins the click and the booking.
          </p>
        </div>
        <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
          <h3 className="font-semibold text-lg tracking-tight">What we build for lake businesses</h3>
          <ul className="mt-3 space-y-2 text-[15px] text-[#c8cfd3]">
            <li>• Mobile menus and real-time availability that load instantly on spotty signal</li>
            <li>• Simple booking or contact flows that turn visitors into reservations</li>
            <li>• Honest photos and copy that feel like the lake — not generic stock</li>
            <li>• Local SEO tuned to actual searches around each ramp and town</li>
            <li>• You own the site and code. No subscriptions to cancel later.</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h2 className="text-2xl tracking-tight font-semibold">Ready to show up for the boaters at your ramp?</h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me which town or marina you’re in — Monticello, Jamestown, Creelsboro, Burnside, anywhere on the lake — and I’ll send a flat-price proposal built for your customers.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary px-8">Get a free quote in 2 minutes →</Link>
          <Link href="/work" className="btn btn-secondary px-7">See Lake Cumberland demos</Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold">Contact me directly</Link>
        </div>
        <p className="mt-4 text-xs text-[#8a9599]">Serving every ramp town on Lake Cumberland from the heart of Monticello, KY.</p>
      </div>
    </div>
  );
}

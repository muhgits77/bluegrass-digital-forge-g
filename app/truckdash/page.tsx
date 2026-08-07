import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "TruckDash | Food Truck Command Center | Bluegrass Digital Forge",
  description:
    "TruckDash is a food-truck command center for schedules, live location sharing, and flyer tools. Built for Kentucky operators — custom quote, ask for details.",
  keywords: [
    "TruckDash",
    "food truck dashboard Kentucky",
    "food truck flyer studio",
    "Kentucky food truck software",
    "Lake Cumberland food truck tools",
  ],
  alternates: { canonical: canonicalUrl("/truckdash") },
  openGraph: { url: canonicalUrl("/truckdash") },
};

export default function TruckDashPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="max-w-2xl">
        <div className="label tracking-[2px]">TRUCKDASH — FOOD TRUCK WEB APP</div>
        <h1 className="section-title tracking-tight mt-2">
          Food-truck command center for real operators
        </h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">
          TruckDash is our dashboard for Kentucky food truckers who need more than a
          brochure site — schedules, live location sharing, and flyer tools in one
          place. Built for people who are prepping, driving, and serving, not sitting
          at a desk.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-[#1a2225] bg-[#0a0c0f] p-7 md:p-9">
        <h2 className="text-xl font-semibold tracking-tight">What it covers</h2>
        <ul className="mt-4 space-y-2.5 text-[15px] text-[#c8cfd3]">
          <li className="flex gap-2.5">
            <span className="text-[#c17a5a] mt-0.5">→</span>
            Schedule manager for daily spots and festival weekends
          </li>
          <li className="flex gap-2.5">
            <span className="text-[#c17a5a] mt-0.5">→</span>
            Live map with location sharing
          </li>
          <li className="flex gap-2.5">
            <span className="text-[#c17a5a] mt-0.5">→</span>
            Flyer studio for menus, events, and QR-ready graphics
          </li>
          <li className="flex gap-2.5">
            <span className="text-[#c17a5a] mt-0.5">→</span>
            Offline-friendly tools when festival Wi-Fi is spotty
          </li>
        </ul>
        <p className="mt-6 text-[15px] text-[#9aa6ad]">
          <span className="font-medium text-[#c9b9a8]">Pricing:</span> Custom quote —
          ask for details. Honest scope-based pricing; no hidden monthly software lock-in
          for the build itself.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Ask about TruckDash →
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact Brian
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h3 className="text-xl font-semibold tracking-tight">Need a website too?</h3>
        <p className="text-[#8a9599] mt-1 max-w-lg mx-auto">
          Pair TruckDash with a food truck website that shows “Where We Are Today” and
          your live menu.
        </p>
        <div className="mt-5 flex gap-3 justify-center flex-wrap">
          <Link href="/food-truck-websites" className="btn btn-secondary">
            Food truck websites
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Website pricing
          </Link>
          <Link href="/quote" className="btn btn-primary">
            Get a quote →
          </Link>
        </div>
      </div>
    </div>
  );
}

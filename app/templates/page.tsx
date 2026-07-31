import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Website Templates | Monticello KY & Charleston SC Website Designer — Lake Cumberland & Lowcountry",
  description: "Ready-to-launch templates for Lake Cumberland business websites, food truck website Kentucky, and Charleston SC / Lowcountry small business sites. Customizable by the Monticello KY website designer.",
  keywords: ["Monticello KY website designer", "Lake Cumberland business websites", "food truck website Kentucky", "Wayne County web design", "Web Design Charleston SC", "Summerville Small Business Website"],
  alternates: { canonical: canonicalUrl("/templates") },
  openGraph: { url: canonicalUrl("/templates") },
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="label tracking-[1.6px]">TEMPLATES — LAKE CUMBERLAND BUSINESS WEBSITES</div>
      <h1 className="section-title tracking-tight mt-1">Ready-to-Launch Templates for Monticello KY Website Designer &amp; Lake Cumberland Businesses</h1>
      <p className="mt-3 text-[#8a9599] max-w-prose">
        High-quality, locally tuned templates for food truck website Kentucky, restaurants, marinas and shops. Built by the Monticello KY website designer for Wayne County web design. Fast to customize and launch. The same templates and approach power our new Charleston SC and Lowcountry web design work for Summerville small businesses and North Charleston restaurants.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {[
          { name: "Food Truck", desc: "Bold menus, schedule, online ordering, and directions that actually convert." },
          { name: "Steakhouse / Restaurant", desc: "Appetizing photo hero, digital menu, reservations, and event inquiries." },
          { name: "Barber & Salon", desc: "Services grid, booking links, gallery, and easy tap-to-call." },
          { name: "Auto / Tire Shop", desc: "Service menus, instant quote forms, reviews, and local SEO that works." },
          { name: "Marina / Guide Service", desc: "Trip packages, captain stories, calendar booking, and strong local search presence." },
          { name: "Retail & Boutique", desc: "Clean catalog, hours, story, and contact that feels like walking in the door." },
        ].map((t, i) => (
          <div key={i} className="card p-6 rounded-2xl hover:border-[#f4a261]/50 transition">
            <div className="font-semibold tracking-tight">{t.name}</div>
            <p className="text-[14.5px] text-[#9aa6ad] mt-1.5 leading-snug">{t.desc}</p>
            <Link href="/quote" className="btn btn-secondary mt-5 text-sm inline-flex">Start with this template →</Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/work" className="text-[#3ddbd9] hover:underline">Or browse the full live demo collection →</Link>
      </div>
    </div>
  );
}

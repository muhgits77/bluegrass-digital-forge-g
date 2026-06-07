"use client";

import DemoCard from "@/components/DemoCard";
import Link from "next/link";
import { motion } from "framer-motion";

const allDemos = [
  { title: "Hickory Forge Steakhouse", subtitle: "Warm, appetizing steakhouse website with digital menu and reservations.", category: "Restaurant", href: "https://hickory-forge-steakhouse.lovable.app", color: "#c17a5a" },
  { title: "Smoky Wheels", subtitle: "Bold BBQ food truck website with live schedule and online ordering.", category: "Food Truck", href: "https://smoky-wheels.lovable.app", color: "#d97757" },
  { title: "Fiesta Taqueria", subtitle: "Vibrant taqueria website with colorful menu, catering, and contact.", category: "Mexican Restaurant", href: "https://fiesta-taqueria.lovable.app", color: "#e07a3d" },
  { title: "Ignite Fitness Company", subtitle: "Energetic gym website with class schedules and membership sign-ups.", category: "Fitness", href: "https://ignite-fitness-company.lovable.app", color: "#3ddbd9" },
  { title: "Summit Tire & Auto", subtitle: "Trustworthy tire shop website with service booking and instant quotes.", category: "Auto Service", href: "https://summit-tire-and-auto.lovable.app", color: "#5a7a9a" },
  { title: "Summit Auto Showcase", subtitle: "Sleek auto dealership website with inventory, financing, and trade-ins.", category: "Car Dealership", href: "https://summit-auto-showcase.lovable.app", color: "#4a6a8a" },
  { title: "Heritage Home Furniture & Appliances", subtitle: "Elegant furniture store website with showroom catalog and financing.", category: "Furniture Store", href: "https://heritage-home-furniture-and-appliances.lovable.app", color: "#8a6f5a" },
  { title: "Hickory & Bloom", subtitle: "Elegant local florist site with same-day delivery, weddings, sympathy, and custom bouquet ordering.", category: "Florist", href: "https://bluegrass-bloom-showcase.lovable.app", color: "#9a6a8a" },
  { title: "Anchorline Guide Service", subtitle: "Lake Cumberland fishing guide site with species-based trip booking, captain bios, and trophy striper hunts.", category: "Fishing Guide", href: "https://lake-cumberland-lines.lovable.app", color: "#3a7a9a" },
  { title: "Sunny Hollow Donut Dash", subtitle: "Cheerful small-town donut shop site with online ordering, daily menu, and Stripe checkout for pre-orders.", category: "Donut Shop", href: "https://sunny-hollow-donut-dash.lovable.app", color: "#d9a05a" },
  { title: "Cumberland Forge Steakhouse", subtitle: "Cinematic fine-dining steakhouse site with dry-aged cuts, wild game, bourbon flights, and nightly reservations.", category: "Steakhouse", href: "https://cumberland-forge-steakhouse.lovable.app", color: "#5c4033" },
  { title: "Han River BBQ", subtitle: "Authentic Korean BBQ site with sizzling table grills, hand-cut bulgogi and kalbi, fresh banchan, and group reservations.", category: "Korean BBQ", href: "https://han-river-sizzle.lovable.app", color: "#c25a4a" },
  { title: "Landing Point Bait & Tackle", subtitle: "Wayne County bait shop site with live bait availability, tackle catalog, fishing reports, and call-ahead holds for Lake Cumberland anglers.", category: "Bait & Tackle Shop", href: "https://cumberland-landing-demo.lovable.app", color: "#4a7a6a" },
  { title: "Ridge Pasture Care", subtitle: "Family-owned Wayne County site for brush hogging, fence building, pasture renovation, and land clearing with free-quote requests.", category: "Land & Pasture Services", href: "https://ridge-pasture-care.lovable.app", color: "#5a6a4a" },
  { title: "Blade Haven", subtitle: "Showcase site for a collector knife shop with featured blades, instruments, and store story.", category: "Specialty Retail", href: "https://blade-haven-demo.lovable.app", color: "#6a6a7a" },
  { title: "Bluegrass Digital Forge Templates", subtitle: "Browse the full lineup of ready-to-launch website templates for local Kentucky businesses.", category: "Template Library", href: "https://bluegrass-digital-forge-templates.lovable.app", color: "#3ddbd9" },
];

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="max-w-2xl mb-8">
        <div className="label tracking-[1.5px]">MY WORK</div>
        <h1 className="section-title tracking-tight">Live demo sites for every local business.</h1>
        <p className="mt-3 text-[15px] text-[#9aa6ad]">Click any card to open the live site in a new tab. All are fictional examples. Each one shows the exact quality, speed, and local focus you get with a real Bluegrass Digital Forge website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allDemos.map((d, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: Math.min(idx * 0.018, 0.2), ease: [0.22, 1, 0.36, 1] }}
          >
            <DemoCard {...d} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center border-t border-[#1a2225] pt-9">
        <h3 className="text-xl font-semibold tracking-tight">Don&apos;t see your kind of business?</h3>
        <p className="text-[14.5px] text-[#9aa6ad] mt-1">Every site is custom-built. Tell me what you do and I&apos;ll show you what makes sense.</p>
        <Link href="/quote" className="btn btn-primary mt-5 inline-flex">Get a Quote →</Link>
      </div>
    </div>
  );
}

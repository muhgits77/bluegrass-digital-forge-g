"use client";

import React, { useState, useEffect } from "react";
import DemoCard from "@/components/DemoCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPublicDemos, toCardProps } from "@/lib/demos";

/**
 * MAJOR CHANGE: Full work page now uses admin-managed dynamic demos (localStorage powered)
 * Sorted + visible only. Changes made in /admin are reflected (with storage sync).
 */
function useAllPublicDemos() {
  const [allDemos, setAllDemos] = useState(() => getPublicDemos().map(toCardProps));

  useEffect(() => {
    const refresh = () => setAllDemos(getPublicDemos().map(toCardProps));
    window.addEventListener("storage", refresh);
    window.addEventListener("bdf:demos-published", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("bdf:demos-published", refresh);
    };
  }, []);

  return allDemos;
}



export default function WorkPage() {
  const allDemos = useAllPublicDemos();

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="max-w-2xl mb-8">
        <div className="label tracking-[1.5px]">MY WORK — LAKE CUMBERLAND &amp; WAYNE COUNTY</div>
        <h1 className="section-title tracking-tight">Real demo websites for Monticello KY &amp; Lake Cumberland businesses.</h1>
        <p className="mt-3 text-[15px] text-[#9aa6ad]">Click cards to view live demos. These show the exact quality and local Kentucky character you get: food truck sites, restaurants, marinas, and shops around the lake. Every site is built by a neighbor in Monticello.</p>
      </div>

      {/* Internal link to services for SEO + flow */}
      <div className="mb-6 text-sm">
        <Link href="/services" className="text-[#f4a261] hover:underline">See flat pricing &amp; packages →</Link>
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
        <h2 className="text-xl font-semibold tracking-tight">Need something custom?</h2>
        <p className="text-[14.5px] text-[#9aa6ad] mt-1">Food truck website Kentucky, restaurant site, marina or shop — tell me about your business in Monticello or around Lake Cumberland.</p>
        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary">Get a Quote →</Link>
          <Link href="/contact" className="btn btn-secondary">Contact the local builder</Link>
        </div>
      </div>
    </div>
  );
}

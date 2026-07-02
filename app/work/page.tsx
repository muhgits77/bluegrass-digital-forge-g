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
        <div className="label tracking-[1.5px]">MY WORK</div>
        <h1 className="section-title tracking-tight">Live demo sites for every local Lake Cumberland business.</h1>
        <p className="mt-3 text-[15px] text-[#9aa6ad]">Click any card to open the live site. All are fictional examples showing the exact premium quality and authentic Kentucky focus you receive. Each preview reflects the warm, practical style local businesses need around the lake.</p>
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

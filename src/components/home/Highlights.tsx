"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const videos = [
  {
    id: 1,
    title: "TPL Opening Ceremony Highlights",
    category: "VIDEO",
    image: "/images/slider/sliderTPL.jpeg",
  },
  {
    id: 2,
    title: "Top 10 Goals of the Month",
    category: "VIDEO",
    image: "/images/slider/sliderMen.png",
  },
  {
    id: 3,
    title: "Exclusive Interview: Player of the Week",
    category: "VIDEO",
    image: "/images/slider/sliderWomen.png",
  },
  {
    id: 4,
    title: "Behind the Scenes at TPL Academy",
    category: "VIDEO",
    image: "/images/slider/image.png",
  },
];

export default function Highlights() {
  return (
    <section className="py-16 bg-[#0a0f14] px-4 md:px-12 text-white border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white leading-none">
            LATEST VIDEOS
          </h2>
          <Link
            href="/galleries?tab=videos"
            className="text-[9px] font-black tracking-widest border border-slate-700 hover:border-amber-500 rounded-full px-4 py-2 hover:bg-amber-500 hover:text-slate-950 transition-all uppercase flex items-center gap-1 cursor-pointer text-slate-300 font-bold shrink-0"
          >
            <span>SEE ALL</span>
            <span className="text-[11px]">→</span>
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {videos.map((video) => (
            <Link
              key={video.id}
              href="/galleries?tab=videos"
              className="group cursor-pointer flex-shrink-0 w-[280px] md:w-[320px] snap-start text-white block"
            >
              <div className="relative h-[180px] w-full rounded-2xl overflow-hidden mb-4 border border-slate-800">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  sizes="320px"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center pl-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-slate-950"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold mb-2">
                <span className="text-slate-300 bg-slate-800 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:text-amber-500 transition-colors">
                {video.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

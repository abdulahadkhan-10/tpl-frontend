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
    <section className="py-16 bg-white px-4 md:px-12 text-gray-900 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold uppercase tracking-wide">LATEST VIDEOS</h2>
            <Link href="/galleries?tab=videos" className="text-sm font-semibold border border-gray-300 rounded-full px-6 py-2 hover:bg-gray-100 transition-colors">
              SEE ALL
            </Link>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer flex-shrink-0 w-[280px] md:w-[320px] snap-start text-gray-900">
              <div className="relative h-[180px] w-full rounded-2xl overflow-hidden mb-4 border border-gray-200">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center pl-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold mb-2">
                <span className="text-gray-800 bg-gray-200 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:text-amber-600 transition-colors">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

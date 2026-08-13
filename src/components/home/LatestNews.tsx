"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { articlesData } from "../news/NewsData";

const news = articlesData.slice(0, 3);

export default function LatestNews() {
  return (
    <section className="py-16 bg-white px-6 md:px-12 text-slate-900 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tight text-slate-900 leading-none">
              LATEST NEWS
            </h2>
          </div>
          <Link 
            href="/news" 
            className="text-[9px] font-black tracking-widest border border-slate-200 hover:border-amber-500 rounded-full px-4 py-2 hover:bg-amber-500 hover:text-slate-950 transition-all uppercase flex items-center gap-1 cursor-pointer text-slate-700 font-bold"
          >
            <span>SEE ALL</span>
            <span className="text-[11px]">→</span>
          </Link>
        </div>

        {/* News Grid - Standing Portrait Rectangle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link 
              key={item.id} 
              href={`/news/${item.id}`}
              className="group flex flex-col bg-[#0d1527] rounded-2xl border border-slate-800 hover:border-amber-500/80 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)] transition-all duration-300 overflow-hidden shadow-md h-[380px] w-full max-w-[320px] mx-auto"
            >
              {/* Image Container with portrait/standing ratio (Height: 220px) */}
              <div className="relative h-[220px] w-full overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
                {/* Category overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-block text-[8px] font-black uppercase px-2.5 py-1.5 rounded-full tracking-wider shadow ${item.categoryBg}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  {/* Date */}
                  <span className="block text-[8px] font-black tracking-widest text-slate-400 font-mono uppercase">
                    {item.date}
                  </span>
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-black italic uppercase leading-snug text-white group-hover:text-amber-500 transition-colors tracking-wide line-clamp-2">
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className="text-slate-300 text-[11px] font-semibold leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

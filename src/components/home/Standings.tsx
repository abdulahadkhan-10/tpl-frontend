"use client";

import React from "react";
import Image from "next/image";

const standingsData = [
  { pos: 1, name: "LONDON UNITED", logo: "/images/TPL_logo_White.png", pts: 47, p: 22, w: 14, d: 5, l: 3, gd: 24, color: "bg-green-600" },
  { pos: 2, name: "MANCHESTER ELITE", logo: "/images/TPL_logo_White.png", pts: 43, p: 22, w: 13, d: 4, l: 5, gd: 19, color: "bg-green-600" },
  { pos: 3, name: "CHELSEA FOUNDATION", logo: "/images/TPL_logo_White.png", pts: 40, p: 22, w: 12, d: 4, l: 6, gd: 14, color: "bg-green-600" },
  { pos: 4, name: "ARSENAL ACADEMY", logo: "/images/TPL_logo_White.png", pts: 38, p: 22, w: 11, d: 5, l: 6, gd: 10, color: "bg-green-600" },
  { pos: 5, name: "WEST HAM UNITED", logo: "/images/TPL_logo_White.png", pts: 36, p: 22, w: 11, d: 3, l: 8, gd: 5, color: "bg-green-600" },
  { pos: 6, name: "TOTTENHAM HOTSPUR", logo: "/images/TPL_logo_White.png", pts: 35, p: 22, w: 10, d: 5, l: 7, gd: 3, color: "bg-blue-500" },
];

export default function Standings() {
  return (
    <section className="py-16 bg-slate-50 px-4 md:px-12 text-slate-900">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-slate-900">STANDINGS</h2>
          <button className="text-xs font-bold border border-slate-300 rounded-full px-6 py-2 hover:bg-slate-200 transition-colors uppercase">
            View Full Table
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase">
            <div className="col-span-2 text-center">POS</div>
            <div className="col-span-4">CLUB</div>
            <div className="col-span-1 text-center font-extrabold text-slate-800">PTS &uarr;</div>
            <div className="col-span-1 text-center">P</div>
            <div className="col-span-1 text-center">W</div>
            <div className="col-span-1 text-center">D</div>
            <div className="col-span-1 text-center">L</div>
            <div className="col-span-1 text-center">GD</div>
          </div>

          {/* Standings Rows */}
          <div className="divide-y divide-slate-100">
            {standingsData.map((club) => (
              <div 
                key={club.pos}
                className="grid grid-cols-12 gap-2 px-6 py-4 items-center text-sm font-semibold hover:bg-slate-50 transition-colors relative"
              >
                {/* Left Colored Indicator Bar based on reference image */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${club.color}`}></div>
                
                <div className="col-span-2 text-center font-bold text-base text-slate-800">
                  {club.pos}
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center p-1 shadow-sm border border-slate-200">
                    <Image
                      src={club.logo}
                      alt={club.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-extrabold text-slate-900 tracking-wide">{club.name}</span>
                </div>
                <div className="col-span-1 text-center font-extrabold text-slate-900 text-base">
                  {club.pts}
                </div>
                <div className="col-span-1 text-center text-slate-600">{club.p}</div>
                <div className="col-span-1 text-center text-slate-600">{club.w}</div>
                <div className="col-span-1 text-center text-slate-600">{club.d}</div>
                <div className="col-span-1 text-center text-slate-600">{club.l}</div>
                <div className="col-span-1 text-center text-slate-600">{club.gd}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

type MatchCardData = {
  id: number;
  status: "scheduled" | "live" | "finished";
  timeText: string;
  timeOnly: string;
  home: string;
  away: string;
  homeShort: string;
  awayShort: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: string;
  awayScore: string;
  btnText: string;
  btnHref: string;
};

const matchesData: MatchCardData[] = [
  {
    id: 1,
    status: "scheduled",
    timeText: "13 AUG | 19:00",
    timeOnly: "19:00",
    home: "LIONS FC",
    homeShort: "LIO",
    away: "CITY WINGS",
    awayShort: "WIN",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "-",
    awayScore: "-",
    btnText: "MATCH CENTRE",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 2,
    status: "live",
    timeText: "LIVE NOW | 65'",
    timeOnly: "65'",
    home: "SPARTANS",
    homeShort: "SPA",
    away: "KRAKEN UT",
    awayShort: "KRA",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "2",
    awayScore: "1",
    btnText: "WATCH LIVE ⊙",
    btnHref: "/live"
  },
  {
    id: 3,
    status: "scheduled",
    timeText: "14 AUG | 20:45",
    timeOnly: "20:45",
    home: "FALCONS",
    homeShort: "FAL",
    away: "IRONWORKS",
    awayShort: "IRO",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "-",
    awayScore: "-",
    btnText: "MATCH CENTRE",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 4,
    status: "finished",
    timeText: "FT | 12 AUG",
    timeOnly: "FT",
    home: "WOLVES",
    homeShort: "WOL",
    away: "METEORS",
    awayShort: "MET",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "3",
    awayScore: "1",
    btnText: "HIGHLIGHTS",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 5,
    status: "scheduled",
    timeText: "15 AUG | 18:30",
    timeOnly: "18:30",
    home: "ARSENAL YTH",
    homeShort: "ARS",
    away: "CHELSEA FD",
    awayShort: "CHE",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "-",
    awayScore: "-",
    btnText: "MATCH CENTRE",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 6,
    status: "finished",
    timeText: "FT | 12 AUG",
    timeOnly: "FT",
    home: "WEST HAM AC",
    homeShort: "WHU",
    away: "LEEDS YTH",
    awayShort: "LEE",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "2",
    awayScore: "0",
    btnText: "HIGHLIGHTS",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 7,
    status: "scheduled",
    timeText: "16 AUG | 17:00",
    timeOnly: "17:00",
    home: "BIRMINGHAM PRO",
    homeShort: "BIR",
    away: "SOUTHAMPTON",
    awayShort: "SOU",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "-",
    awayScore: "-",
    btnText: "MATCH CENTRE",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 8,
    status: "finished",
    timeText: "FT | 11 AUG",
    timeOnly: "FT",
    home: "SPURS AC",
    homeShort: "TOT",
    away: "CRYSTAL PRO",
    awayShort: "CRY",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "4",
    awayScore: "2",
    btnText: "HIGHLIGHTS",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 9,
    status: "scheduled",
    timeText: "17 AUG | 21:00",
    timeOnly: "21:00",
    home: "BRENTFORD YTH",
    homeShort: "BRE",
    away: "LONDON UT",
    awayShort: "LUN",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "-",
    awayScore: "-",
    btnText: "MATCH CENTRE",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  },
  {
    id: 10,
    status: "scheduled",
    timeText: "18 AUG | 19:30",
    timeOnly: "19:30",
    home: "VILLA YOUTH",
    homeShort: "AVL",
    away: "EVERTON PRO",
    awayShort: "EVE",
    homeLogo: "/images/TPL_logo_White.png",
    awayLogo: "/images/TPL_logo_White.png",
    homeScore: "-",
    awayScore: "-",
    btnText: "MATCH CENTRE",
    btnHref: "/match/8abecee6bd2a4266915f18e6098741cf/lun-vs-che"
  }
];

export default function FixturesPreview() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f8fafc] py-5 px-6 md:px-12 border-b border-slate-200 overflow-visible">
      <div className="max-w-[1400px] mx-auto overflow-visible">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tight text-slate-900 leading-none">
              MATCHES
            </h2>
            <p className="text-slate-500 text-[10px] md:text-xs font-semibold mt-1 tracking-wide font-mono">
              August 13 - August 18
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => scroll("left")}
              className="p-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-all cursor-pointer shadow-sm"
              aria-label="Previous Matches"
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-all cursor-pointer shadow-sm"
              aria-label="Next Matches"
            >
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Viewport */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-none py-2 px-1 snap-x snap-mandatory"
        >
          {matchesData.map((match) => {
            const isLive = match.status === "live";

            return (
              <div 
                key={match.id}
                className="snap-start shrink-0 w-[240px] md:w-[260px] rounded-xl p-4 bg-white text-slate-950 flex flex-col justify-between h-[155px] shadow-sm relative border border-slate-200/80 hover:border-amber-500 hover:shadow-[0_8px_20px_rgba(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-300 group select-none overflow-hidden"
              >
                {/* Premium subtle athletic pattern background */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, transparent 50%),
                      linear-gradient(120deg, transparent 24%, rgba(15, 23, 42, 0.02) 24.5%, rgba(15, 23, 42, 0.02) 25.5%, transparent 26%),
                      linear-gradient(60deg, transparent 60%, rgba(15, 23, 42, 0.02) 60.5%, rgba(15, 23, 42, 0.02) 68%, transparent 68.5%),
                      radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 60%)
                    `
                  }}
                />

                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* 1. Header (Date / Time) */}
                  <div className="flex justify-between items-center text-[9px] font-black italic tracking-wide text-slate-550 border-b border-slate-100 pb-1.5 w-full">
                    <div className="flex items-center gap-1 uppercase font-mono">
                      {isLive ? (
                        <span className="flex items-center gap-1.5 text-red-600 font-extrabold">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-650"></span>
                          </span>
                          LIVE
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {match.timeText.split(" | ")[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-600">
                      <span>MD 1</span>
                      <img src="/images/TPL_logo_Dark.png" alt="" className="w-3 h-3 object-contain" />
                    </div>
                  </div>

                  {/* 2. Stacked Teams on Left, Large Score/Time on Right */}
                  <div className="flex justify-between items-center my-2.5 w-full">
                    <div className="flex flex-col gap-1.5 w-[65%]">
                      {/* Home Team */}
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center p-0.5 border border-slate-100 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <img src="/images/TPL_logo_Dark.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-extrabold italic uppercase tracking-wider text-[11px] md:text-xs truncate text-slate-900">
                          {match.home}
                        </span>
                      </div>
                      {/* Away Team */}
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center p-0.5 border border-slate-100 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <img src="/images/TPL_logo_Dark.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-extrabold italic uppercase tracking-wider text-[11px] md:text-xs truncate text-slate-900">
                          {match.away}
                        </span>
                      </div>
                    </div>

                    {/* Score or Time on Right */}
                    <div className="w-[35%] text-right font-black italic text-sm md:text-base text-slate-950 font-mono leading-none">
                      {match.status === "scheduled" ? (
                        <span>{match.timeOnly}</span>
                      ) : (
                        <span className={isLive ? "text-amber-600" : "text-slate-950"}>
                          {match.homeScore}:{match.awayScore}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 3. Action Link Button */}
                  <Link 
                    href={match.btnHref}
                    className="w-full py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer border border-[#ff9f1c]/70 hover:bg-[#ff9f1c] hover:text-slate-950 text-slate-700 font-bold bg-slate-50"
                  >
                    <span>{match.btnText}</span>
                  </Link>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

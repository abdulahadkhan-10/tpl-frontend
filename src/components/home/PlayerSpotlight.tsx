"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

// TPL talent — fictional players drawn from the league's own clubs
const spotlightPlayers = [
  {
    id: "s01",
    name: "Kai OSEI",
    firstName: "Kai",
    lastName: "OSEI",
    pos: "FW",
    ovr: 88,
    team: "FAL",
    nationality: "GHA",
    themeGradient: "from-[#800f1c] via-[#630913] to-[#360308]",
    borderColor: "border-red-500/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s02",
    name: "Marcus BELLWEATHER",
    firstName: "Marcus",
    lastName: "BELLWEATHER",
    pos: "LW",
    ovr: 91,
    team: "WOL",
    nationality: "ENG",
    themeGradient: "from-[#9a6700] via-[#754e00] to-[#3d2900]",
    borderColor: "border-amber-500/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s03",
    name: "Théo LINDQVIST",
    firstName: "Théo",
    lastName: "LINDQVIST",
    pos: "ST",
    ovr: 92,
    team: "EAG",
    nationality: "SWE",
    themeGradient: "from-[#0e488f] via-[#093266] to-[#041a38]",
    borderColor: "border-blue-500/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s04",
    name: "Dominic ACHEBE",
    firstName: "Dominic",
    lastName: "ACHEBE",
    pos: "CM",
    ovr: 89,
    team: "LIO",
    nationality: "NGA",
    themeGradient: "from-[#8a6800] via-[#634a00] to-[#362900]",
    borderColor: "border-yellow-500/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s05",
    name: "Rafael DUARTE",
    firstName: "Rafael",
    lastName: "DUARTE",
    pos: "ST",
    ovr: 94,
    team: "SPA",
    nationality: "POR",
    themeGradient: "from-[#4c1d95] via-[#3b0764] to-[#1e1b4b]",
    borderColor: "border-purple-500/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s06",
    name: "Noah WHITCOMBE",
    firstName: "Noah",
    lastName: "WHITCOMBE",
    pos: "RW",
    ovr: 90,
    team: "KRA",
    nationality: "WAL",
    themeGradient: "from-[#831843] via-[#701a75] to-[#311042]",
    borderColor: "border-pink-500/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s07",
    name: "Amir DELACROIX",
    firstName: "Amir",
    lastName: "DELACROIX",
    pos: "RW",
    ovr: 91,
    team: "IRO",
    nationality: "FRA",
    themeGradient: "from-[#991b1b] via-[#7f1d1d] to-[#450a0a]",
    borderColor: "border-red-600/30",
    photo: "/images/player_placeholder_nobg.png",
  },
  {
    id: "s08",
    name: "Santiago RIOS",
    firstName: "Santiago",
    lastName: "RIOS",
    pos: "CM",
    ovr: 90,
    team: "LUN",
    nationality: "ESP",
    themeGradient: "from-[#065f46] via-[#044e3a] to-[#022c22]",
    borderColor: "border-emerald-500/30",
    photo: "/images/player_placeholder_nobg.png",
  }
];

export default function PlayerSpotlight() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 320 : scrollLeft + 320;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white px-4 md:px-12 text-slate-900 overflow-hidden relative">
      <div className="max-w-[1100px] mx-auto relative">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-slate-950 leading-none">
              PLAYER SPOTLIGHT
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-semibold mt-2 max-w-xl">
              Raw talent turning heads this week — the players scouts are already tracking.
            </p>
          </div>

          {/* Navigation Control Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
              aria-label="Previous Player"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer shadow-md"
              aria-label="Next Player"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable row of FUT Trading Spotlight Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {spotlightPlayers.map((player) => (
            <Link
              key={player.id}
              href={`/player/${slugify(player.name)}`}
              className={`snap-start flex-shrink-0 w-[260px] h-[400px] rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-br ${player.themeGradient} group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 select-none block`}
            >
              {/* Inner Glow / Border */}
              <div className="absolute inset-0 rounded-2xl border-[1.5px] border-white/20 group-hover:border-white/50 transition-colors pointer-events-none z-30" />
              
              {/* Hex / Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17L3 13V7l7-4 7 4v6l-7 4z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: "20px 20px"
                }}
              />

              {/* Big OVR Background Number */}
              <div className="absolute -top-2 -right-4 text-[150px] font-black italic text-white/[0.08] z-0 leading-none select-none tracking-tighter group-hover:scale-110 transition-transform duration-500">
                {player.ovr}
              </div>

              {/* Top Left FUT Badges */}
              <div className="absolute top-5 left-5 flex flex-col items-center z-20 drop-shadow-md">
                <span className="text-3xl font-black text-white leading-none tracking-tighter">{player.ovr}</span>
                <span className="text-sm font-bold text-white/90 leading-none mt-1">{player.pos}</span>
                <div className="w-8 h-[2px] bg-white/30 my-2" />
                <span className="text-[10px] font-black text-white uppercase tracking-wider">{player.nationality}</span>
                <span className="text-[10px] font-black text-white uppercase tracking-wider mt-1">{player.team}</span>
              </div>

              {/* Player Image with Drop Shadow & Gradient Mask */}
              <div className="absolute bottom-[60px] md:bottom-[75px] left-1/2 -translate-x-1/2 w-[220px] h-[260px] md:w-[240px] md:h-[280px] z-10 flex items-end justify-center">
                <Image
                  src={player.photo}
                  alt={`${player.firstName} ${player.lastName}`}
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] transform group-hover:scale-[1.08] transition-transform duration-500 origin-bottom"
                />
              </div>

              {/* Bottom Glassmorphic Nameplate & Stats */}
              <div className="absolute bottom-0 left-0 w-full z-20">
                 {/* Fade into the nameplate */}
                 <div className="h-10 w-full bg-gradient-to-t from-black/80 to-transparent" />
                 
                 <div className="bg-black/80 backdrop-blur-md p-4 pt-0 pb-4 flex flex-col items-center">
                    <h3 className="text-lg md:text-xl font-black italic uppercase text-white tracking-wide text-center drop-shadow-md">
                      {player.name}
                    </h3>
                    <div className="w-full h-[1px] bg-white/10 my-2.5" />
                    <div className="flex w-full justify-between px-2">
                       <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-sm leading-none">{player.ovr + 2}</span>
                          <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">PAC</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-sm leading-none">{player.ovr - 1}</span>
                          <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">SHO</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-sm leading-none">{player.ovr - 3}</span>
                          <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">PAS</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-sm leading-none">{player.ovr + 1}</span>
                          <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">DRI</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-sm leading-none">{Math.max(45, player.ovr - 30)}</span>
                          <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">DEF</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-sm leading-none">{player.ovr - 5}</span>
                          <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">PHY</span>
                       </div>
                    </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

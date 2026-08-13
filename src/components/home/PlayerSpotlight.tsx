"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

// Expanded mock data with more players in Player Spotlight
const spotlightPlayers = [
  {
    id: "s01",
    name: "Julián QUIÑONES",
    firstName: "Julián",
    lastName: "QUIÑONES",
    pos: "FW",
    ovr: 88,
    team: "QAD",
    nationality: "MEX",
    themeGradient: "from-[#800f1c] via-[#630913] to-[#360308]",
    borderColor: "border-red-500/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s02",
    name: "Vinícius JÚNIOR",
    firstName: "Vinícius",
    lastName: "JÚNIOR",
    pos: "LW",
    ovr: 91,
    team: "RMA",
    nationality: "BRA",
    themeGradient: "from-[#9a6700] via-[#754e00] to-[#3d2900]",
    borderColor: "border-amber-500/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s03",
    name: "Erling HAALAND",
    firstName: "Erling",
    lastName: "HAALAND",
    pos: "ST",
    ovr: 92,
    team: "MCI",
    nationality: "NOR",
    themeGradient: "from-[#0e488f] via-[#093266] to-[#041a38]",
    borderColor: "border-blue-500/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s04",
    name: "Jude BELLINGHAM",
    firstName: "Jude",
    lastName: "BELLINGHAM",
    pos: "CM",
    ovr: 89,
    team: "DOR",
    nationality: "ENG",
    themeGradient: "from-[#8a6800] via-[#634a00] to-[#362900]",
    borderColor: "border-yellow-500/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s05",
    name: "Kylian MBAPPÉ",
    firstName: "Kylian",
    lastName: "MBAPPÉ",
    pos: "ST",
    ovr: 94,
    team: "RMA",
    nationality: "FRA",
    themeGradient: "from-[#4c1d95] via-[#3b0764] to-[#1e1b4b]",
    borderColor: "border-purple-500/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s06",
    name: "Lamine YAMAL",
    firstName: "Lamine",
    lastName: "YAMAL",
    pos: "RW",
    ovr: 90,
    team: "BAR",
    nationality: "ESP",
    themeGradient: "from-[#831843] via-[#701a75] to-[#311042]",
    borderColor: "border-pink-500/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s07",
    name: "Mohamed SALAH",
    firstName: "Mohamed",
    lastName: "SALAH",
    pos: "RW",
    ovr: 91,
    team: "LIV",
    nationality: "EGY",
    themeGradient: "from-[#991b1b] via-[#7f1d1d] to-[#450a0a]",
    borderColor: "border-red-600/30",
    photo: "/images/player_placeholder.png",
  },
  {
    id: "s08",
    name: "Pedri GONZÁLEZ",
    firstName: "Pedri",
    lastName: "GONZÁLEZ",
    pos: "CM",
    ovr: 90,
    team: "BAR",
    nationality: "ESP",
    themeGradient: "from-[#065f46] via-[#044e3a] to-[#022c22]",
    borderColor: "border-emerald-500/30",
    photo: "/images/player_placeholder.png",
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
    <section className="py-20 bg-white px-6 md:px-12 text-slate-900 overflow-hidden relative">
      <div className="max-w-[1100px] mx-auto relative">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight text-slate-950 leading-none">
              PLAYER SPOTLIGHT
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-semibold mt-2 max-w-xl">
              Discover the standout performers reshaping the tactical landscape of the league this week. Elite stats, prime form.
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
              className={`snap-start flex-shrink-0 w-[240px] md:w-[260px] h-[410px] rounded-2xl overflow-hidden shadow-2xl relative border ${player.borderColor} bg-gradient-to-b ${player.themeGradient} group cursor-pointer hover:-translate-y-1.5 transition-all duration-300 select-none block`}
            >
              {/* Checkerboard Pattern Grid Overlay */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{
                  backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
                  backgroundSize: "8px 8px"
                }}
              />

              {/* Card Contents */}
              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                
                {/* Top Badges (Team & Country) */}
                <div className="flex items-center gap-2">
                  <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md font-mono tracking-wider shadow">
                    {player.team}
                  </span>
                  <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md font-mono tracking-wider shadow">
                    {player.nationality}
                  </span>
                </div>

                {/* Player Photo */}
                <div className="relative w-full h-[220px] my-auto flex items-end justify-center">
                  <Image
                    src={player.photo}
                    alt={`${player.firstName} ${player.lastName}`}
                    fill
                    sizes="260px"
                    className="object-contain object-bottom transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Player Information & Stats Banner */}
                <div className="border-t border-white/10 pt-3 space-y-3">
                  <div>
                    <span className="block text-[11px] font-semibold text-white/80 italic leading-none mb-1">
                      {player.firstName}
                    </span>
                    <h3 className="text-xl font-black italic uppercase text-white leading-none tracking-tight">
                      {player.lastName}
                    </h3>
                  </div>

                  {/* POS & OVR Footer */}
                  <div className="flex items-center gap-4 text-xs font-mono font-black text-white pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-white/50 font-bold uppercase">POS</span>
                      <span className="text-sm text-white font-extrabold">{player.pos}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-white/50 font-bold uppercase">OVR</span>
                      <span className="text-lg text-white font-black">{player.ovr}</span>
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

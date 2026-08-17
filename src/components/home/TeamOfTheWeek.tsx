"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getTeamOfTheWeek } from "./TeamOfTheWeekData";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const MATCHWEEK = 12;
const FORMATION = "4-3-3";

export default function TeamOfTheWeek() {
  const players = useMemo(() => getTeamOfTheWeek(MATCHWEEK, FORMATION), []);
  const [activePlayerName, setActivePlayerName] = useState<string | null>(null);

  const topPerformer = useMemo(
    () => players.reduce((best, p) => (p.rating > best.rating ? p : best), players[0]),
    [players]
  );

  const activeSpotlightPlayer =
    players.find((p) => p.playerName === activePlayerName) || topPerformer;

  return (
    <section className="py-20 bg-slate-50/50 px-4 md:px-12 text-slate-900 overflow-hidden relative">
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-slate-900 leading-none">
              TEAM OF THE WEEK
            </h2>
            <p className="text-slate-500 text-[10px] md:text-xs mt-2 uppercase font-mono tracking-wider font-semibold">
              MATCHWEEK {MATCHWEEK} | THIS WEEK&apos;S BREAKOUT XI
            </p>
          </div>

          <Link
            href="/standings"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-black text-slate-900 hover:text-amber-600 transition-colors uppercase tracking-widest shrink-0"
          >
            <span>View Full Standings</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Modular Grid: Pitch & Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Tactical Pitch Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-4 md:p-6 relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[480px] md:min-h-[580px]">
            {/* Pitch Markings */}
            <div className="absolute inset-4 border border-slate-200/40 pointer-events-none rounded-2xl">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-200/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-slate-200/40" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-[110px] border-b border-x border-slate-200/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[110px] border-t border-x border-slate-200/40" />
            </div>

            {/* Pitch Grid Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(15,23,42,0.01)_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

            {/* Players Positions mapping */}
            <div className="relative w-full flex-grow h-full min-h-[440px] md:min-h-[500px]">
              {players.map((player) => {
                const isStar = player.playerName === activeSpotlightPlayer.playerName;

                return (
                  <Link
                    key={player.playerId + "-" + player.position}
                    href={`/player/${slugify(player.playerName)}`}
                    onMouseEnter={() => setActivePlayerName(player.playerName)}
                    onFocus={() => setActivePlayerName(player.playerName)}
                    style={{
                      position: "absolute",
                      left: player.coords.left,
                      top: player.coords.top,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="flex flex-col items-center group cursor-pointer z-10"
                  >
                    {/* Circle Player Card with Rating Overlay */}
                    <div className="relative">
                      <span className={`absolute -top-1.5 -right-1.5 z-20 text-[8px] font-black px-1.5 py-0.5 rounded shadow ${
                        isStar ? "bg-amber-400 text-slate-950 font-black" : "bg-slate-900 text-white"
                      }`}>
                        {player.rating}
                      </span>

                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-50 border-2 overflow-hidden flex items-end justify-center shadow-sm group-hover:scale-110 transition-all duration-300 ${
                        isStar
                          ? "border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                          : "border-slate-200 group-hover:border-amber-500"
                      }`}>
                        <Image
                          src="/images/player_placeholder_nobg.png"
                          alt={player.playerName}
                          width={45}
                          height={45}
                          className="object-contain object-bottom translate-y-1"
                        />
                      </div>
                    </div>

                    {/* Position and Name label pill below */}
                    <div className="mt-1.5">
                      <div className={`border rounded px-2.5 py-0.5 shadow-sm flex flex-col items-center min-w-[70px] ${
                        isStar
                          ? "bg-amber-400 border-amber-400 text-slate-950"
                          : "bg-slate-900 border-slate-950 text-white"
                      }`}>
                        <span className={`text-[6.5px] font-black uppercase tracking-wider leading-none mb-0.5 ${
                          isStar ? "text-slate-950/80" : "text-slate-400"
                        }`}>
                          {player.position}
                        </span>
                        <span className="text-[9px] font-black uppercase italic tracking-wide leading-none">
                          {player.playerName.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Spotlight Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Dynamic Spotlight Card for Currently Highlighted Player */}
            <Link
              href={`/player/${slugify(activeSpotlightPlayer.playerName)}`}
              className="relative rounded-3xl bg-white border border-slate-200/80 overflow-hidden min-h-[170px] p-5 flex flex-col justify-between shadow-sm cursor-pointer group hover:border-amber-500/80 transition-all duration-300 block"
            >
              <div className="absolute right-0 bottom-0 top-0 w-1/2 z-0 opacity-20">
                <Image
                  src="/images/tpl_action.png"
                  alt=""
                  fill
                  sizes="400px"
                  className="object-cover object-center transform scale-110 group-hover:scale-115 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10" />

              <div className="relative z-20 flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-600 text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                    <Sparkles size={8} />
                    <span>{activePlayerName ? "PLAYER SPOTLIGHT" : "TOP PERFORMER"}</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-black italic uppercase tracking-tight text-slate-950 mt-2 leading-tight group-hover:text-amber-600 transition-colors">
                    {activeSpotlightPlayer.playerName}
                  </h4>
                  <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wide">
                    {activeSpotlightPlayer.position} | {activeSpotlightPlayer.team}
                  </p>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="block text-[8px] text-slate-400 font-black uppercase tracking-widest leading-none">
                      PERF INDEX
                    </span>
                    <span className="text-3xl font-black text-amber-600 leading-none mt-1 inline-block">
                      {activeSpotlightPlayer.rating}
                    </span>
                  </div>
                  <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest border-b border-amber-500 pb-0.5">
                    VIEW PROFILE →
                  </span>
                </div>
              </div>
            </Link>

            {/* Teaser CTA into the full tool */}
            <Link
              href="/standings"
              className="flex-grow bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col justify-center items-center text-center gap-2 shadow-sm hover:border-amber-500/80 transition-all duration-300 group"
            >
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Want the full lineup builder?
              </span>
              <span className="text-sm font-black uppercase tracking-wide text-slate-900 group-hover:text-amber-600 transition-colors">
                Explore Standings & Rankings →
              </span>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

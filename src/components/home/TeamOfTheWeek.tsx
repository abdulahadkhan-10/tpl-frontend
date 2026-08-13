"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, RefreshCw, Calendar, Sparkles } from "lucide-react";
import { getTeamOfTheWeek, mockRankings } from "./TeamOfTheWeekData";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function TeamOfTheWeek() {
  const [matchweek, setMatchweek] = useState<number>(12);
  const [formation, setFormation] = useState<string>("4-3-3");
  const [selectedRankTab, setSelectedRankTab] = useState<string>("GK");

  const players = getTeamOfTheWeek(matchweek, formation);
  const rankingsList = mockRankings[selectedRankTab] || [];

  // Unified active player state
  const [activePlayerName, setActivePlayerName] = useState<string | null>(null);

  const activeSpotlightPlayer = 
    players.find(p => p.playerName === activePlayerName) ||
    rankingsList.find(p => p.name === activePlayerName) || 
    rankingsList[0] || {
      name: "Jobe Bellingham Jr",
      team: "Birmingham City",
      rating: 98,
      teamLogo: "/images/TPL_logo_White.png"
    };

  const handleMatchweekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMatchweek(Number(e.target.value));
  };

  const handleFormationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormation(e.target.value);
  };

  const handleReset = () => {
    setMatchweek(12);
    setFormation("4-3-3");
    setSelectedRankTab("GK");
    setActivePlayerName(null);
  };

  const handleTabChange = (tab: string) => {
    setSelectedRankTab(tab);
    setActivePlayerName(null);
  };

  return (
    <section className="py-20 bg-slate-50/50 px-6 md:px-12 text-slate-900 overflow-hidden relative">
      <div className="max-w-[1100px] mx-auto space-y-6">
        
        {/* BLOCK 1: Header and Controls Block */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-slate-900 leading-none">
              TEAM OF THE WEEK
            </h2>
            <p className="text-slate-500 text-[10px] md:text-xs mt-2 uppercase font-mono tracking-wider font-semibold">
              MATCHWEEK {matchweek} | THE ELITE XI
            </p>
          </div>

          {/* Selectors / Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Matchweek Dropdown */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-amber-500 transition-colors">
              <Calendar size={13} className="text-amber-500" />
              <select
                value={matchweek}
                onChange={handleMatchweekChange}
                className="bg-transparent text-[11px] font-black text-slate-800 outline-none cursor-pointer appearance-none pr-6 uppercase tracking-wider"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((mw) => (
                  <option key={mw} value={mw} className="bg-white text-slate-800">
                    MATCHWEEK {mw.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-3 pointer-events-none text-slate-400" />
            </div>

            {/* Formation Dropdown */}
            <div className="relative bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-amber-500 transition-colors">
              <span className="text-[10px] text-slate-550 font-extrabold uppercase font-mono">SYS</span>
              <select
                value={formation}
                onChange={handleFormationChange}
                className="bg-transparent text-[11px] font-black text-slate-800 outline-none cursor-pointer appearance-none pr-6 uppercase tracking-wider"
              >
                <option value="4-3-3" className="bg-white text-slate-800">4-3-3</option>
                <option value="4-4-2" className="bg-white text-slate-800">4-4-2</option>
                <option value="4-2-3-1" className="bg-white text-slate-800">4-2-3-1</option>
                <option value="3-4-3" className="bg-white text-slate-800">3-4-3</option>
                <option value="3-5-2" className="bg-white text-slate-800">3-5-2</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 pointer-events-none text-slate-400" />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="bg-slate-50 border border-slate-200 hover:bg-amber-500 hover:text-slate-950 rounded-xl p-2.5 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Reset Filters"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Modular Grid: Pitch (Block 2) & Sidebar (Block 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* BLOCK 2: Tactical Pitch Area */}
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
                const spotlightName = (activeSpotlightPlayer as any).name || (activeSpotlightPlayer as any).playerName;
                const isStar = player.playerName === spotlightName;
                
                return (
                  <Link
                    key={player.playerId + "-" + player.position}
                    href={`/player/${slugify(player.playerName)}`}
                    onMouseEnter={() => setActivePlayerName(player.playerName)}
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
                          src="/images/player_placeholder.png"
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

          {/* BLOCK 3: Right Side Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Position Category Tabs */}
            <div className="flex bg-slate-100 rounded-2xl p-1 border border-slate-200/80 shadow-sm">
              {["GK", "DEF", "MID", "ATT"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 text-[10px] font-black py-2.5 rounded-xl transition-all cursor-pointer ${
                    selectedRankTab === tab 
                      ? "bg-amber-500 text-slate-950 shadow-sm" 
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Spotlight Card for Currently Highlighted Player */}
            {activeSpotlightPlayer && (
              <Link 
                href={`/player/${slugify((activeSpotlightPlayer as any).name || (activeSpotlightPlayer as any).playerName || '')}`}
                className="relative rounded-3xl bg-white border border-slate-200/80 overflow-hidden min-h-[170px] p-5 flex flex-col justify-between shadow-sm cursor-pointer group hover:border-amber-500/80 transition-all duration-300 block"
              >
                <div className="absolute right-0 bottom-0 top-0 w-1/2 z-0 opacity-20">
                  <Image
                    src="/images/tpl_action.png"
                    alt=""
                    fill
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
                      {(activeSpotlightPlayer as any).name || (activeSpotlightPlayer as any).playerName}
                    </h4>
                    <p className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wide">
                      {selectedRankTab} | {activeSpotlightPlayer.team}
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
            )}

            {/* Rankings List */}
            <div className="flex-grow bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-center mb-3 font-mono">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    TOP PERFORMERS - POS 1-{rankingsList.length}
                  </span>
                  <span className="text-[8px] font-bold text-amber-600 uppercase tracking-wider">
                    Click to Open
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {rankingsList.map((player, idx) => {
                    const isSelected = (activePlayerName === player.name) || (!activePlayerName && idx === 0);
                    return (
                      <Link
                        key={player.name}
                        href={`/player/${slugify(player.name)}`}
                        onMouseEnter={() => setActivePlayerName(player.name)}
                        className={`flex items-center justify-between py-2 px-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                          isSelected 
                            ? "bg-amber-50 border-amber-400/80 shadow-xs" 
                            : "border-transparent hover:bg-slate-50 border-b-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-black italic ${isSelected ? "text-amber-600" : "text-slate-400"}`}>
                            {idx + 1}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 overflow-hidden flex items-end justify-center shrink-0">
                            <Image
                              src="/images/player_placeholder.png"
                              alt={player.name}
                              width={25}
                              height={25}
                              className="object-contain translate-y-0.5"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-[11px] font-black uppercase transition-colors ${
                              isSelected ? "text-amber-600" : "text-slate-800"
                            }`}>
                              {player.name}
                            </span>
                            <span className="text-[8px] text-slate-500 font-extrabold">
                              {player.team}
                            </span>
                          </div>
                        </div>
                        <div className={`text-xs font-black ${isSelected ? "text-amber-600" : "text-slate-900"}`}>
                          {player.rating}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/standings"
                className="w-full mt-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer border border-slate-200 hover:border-amber-500 hover:text-slate-950 text-slate-700 font-bold bg-slate-50"
              >
                <span>VIEW FULL RANKINGS →</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

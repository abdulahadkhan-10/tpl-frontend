"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Shield, Activity, Award, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ playername: string }>;
}

// Mock database for player profiles
const mockPlayersDb: Record<string, {
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  teamLogo: string;
  nationality: string;
  age: number;
  height: string;
  strongFoot: string;
  rating: number;
  stats: { goals: number; assists: number; minutes: number; passAccuracy: string };
  attributes: Record<string, number>;
  teammates: { name: string; firstName: string; lastName: string; position: string; rating: number; nationality: string }[];
}> = {
  "jack-porter": {
    name: "Jack Porter",
    firstName: "Jack",
    lastName: "PORTER",
    position: "Goalkeeper",
    team: "Arsenal Academy",
    teamLogo: "/images/TPL_logo_White.png",
    nationality: "ENG",
    age: 18,
    height: "1.89 m",
    strongFoot: "Right",
    rating: 94,
    stats: { goals: 0, assists: 0, minutes: 1180, passAccuracy: "88%" },
    attributes: { Diving: 95, Handling: 92, Kicking: 89, Reflexes: 96, Speed: 78, Positioning: 94 },
    teammates: [
      { name: "Ethan Nwaneri Jr", firstName: "Ethan", lastName: "NWANERI JR", position: "CM", rating: 93, nationality: "ENG" },
      { name: "Myles Lewis-Skelly", firstName: "Myles", lastName: "LEWIS-SKELLY", position: "LB", rating: 95, nationality: "ENG" },
    ]
  },
  "billy-gil": {
    name: "Billy Gil",
    firstName: "Billy",
    lastName: "GIL",
    position: "Midfielder",
    team: "Chelsea Foundation",
    teamLogo: "/images/TPL_logo_White.png",
    nationality: "SCO",
    age: 19,
    height: "1.74 m",
    strongFoot: "Right",
    rating: 88,
    stats: { goals: 6, assists: 12, minutes: 1350, passAccuracy: "92%" },
    attributes: { Pace: 84, Shooting: 81, Passing: 94, Dribbling: 90, Defending: 78, Physical: 82 },
    teammates: [
      { name: "Reece James Jr", firstName: "Reece", lastName: "JAMES JR", position: "CB", rating: 87, nationality: "ENG" },
      { name: "Tammy Abraham Jr", firstName: "Tammy", lastName: "ABRAHAM JR", position: "ST", rating: 89, nationality: "ENG" },
    ]
  },
  "kaelan-casey": {
    name: "Kaelan Casey",
    firstName: "Kaelan",
    lastName: "CASEY",
    position: "Defender",
    team: "West Ham United",
    teamLogo: "/images/TPL_logo_White.png",
    nationality: "ENG",
    age: 18,
    height: "1.86 m",
    strongFoot: "Right",
    rating: 94,
    stats: { goals: 2, assists: 1, minutes: 1420, passAccuracy: "89%" },
    attributes: { Pace: 83, Shooting: 62, Passing: 81, Dribbling: 79, Defending: 95, Physical: 92 },
    teammates: [
      { name: "George Earthy", firstName: "George", lastName: "EARTHY", position: "RB", rating: 97, nationality: "ENG" },
      { name: "Divin Mubama", firstName: "Divin", lastName: "MUBAMA", position: "ST", rating: 88, nationality: "ENG" },
    ]
  }
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function PlayerProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const playerSlug = resolvedParams.playername.toLowerCase();

  // Find player details or construct fallback
  const player = mockPlayersDb[playerSlug] || {
    name: resolvedParams.playername.replace(/-/g, " "),
    firstName: resolvedParams.playername.split("-")[0] || "Pro",
    lastName: resolvedParams.playername.split("-").slice(1).join(" ").toUpperCase() || "PLAYER",
    position: "Forward",
    team: "Talent Pro League FC",
    teamLogo: "/images/TPL_logo_White.png",
    nationality: "KSA",
    age: 22,
    height: "1.82 m",
    strongFoot: "Right",
    rating: 90,
    stats: { goals: 8, assists: 4, minutes: 1200, passAccuracy: "87%" },
    attributes: { Pace: 91, Shooting: 88, Passing: 86, Dribbling: 89, Defending: 72, Physical: 84 },
    teammates: [
      { name: "Ethan Nwaneri Jr", firstName: "Ethan", lastName: "NWANERI JR", position: "CM", rating: 93, nationality: "ENG" },
      { name: "George Earthy", firstName: "George", lastName: "EARTHY", position: "RB", rating: 97, nationality: "ENG" },
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900 font-sans pb-24">
      {/* Top Breadcrumb Header */}
      <div className="max-w-[1100px] mx-auto px-6 pt-8 pb-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={3} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-[1100px] mx-auto px-6 space-y-8">
        
        {/* ============================================================ */}
        {/* HERO PLAYER BANNER (Dark Board with TPL Logo Watermark Background) */}
        {/* ============================================================ */}
        <section className="bg-[#0d1527] rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl text-white relative overflow-hidden">
          
          {/* TPL Logo Background Watermark (Large subtle overlay in BG) */}
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[380px] h-[380px] opacity-[0.07] select-none pointer-events-none z-0">
            <Image
              src="/images/TPL_logo_White.png"
              alt="TPL Background Watermark"
              fill
              className="object-contain"
            />
          </div>

          {/* Grid pattern background texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

          {/* Banner Content Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Player Information */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  <Sparkles size={10} />
                  <span>OFFICIAL PLAYER PROFILE</span>
                </span>
                <span className="bg-slate-800 text-slate-300 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-mono border border-slate-700">
                  {player.nationality}
                </span>
              </div>

              <div>
                <span className="block text-sm font-extrabold text-slate-400 italic uppercase tracking-wider">
                  {player.firstName}
                </span>
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight text-white leading-none mt-1">
                  {player.lastName}
                </h1>
                <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mt-2">
                  {player.position}
                </p>
              </div>

              {/* Club Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl px-4 py-2.5 w-fit mx-auto lg:mx-0 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center p-1 border border-slate-700">
                  <Image
                    src={player.teamLogo}
                    alt={player.team}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-extrabold uppercase text-white tracking-wide">{player.team}</span>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-4 pt-2 max-w-sm mx-auto lg:mx-0 text-center font-mono">
                <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">AGE</span>
                  <span className="text-sm font-black text-white">{player.age} YRS</span>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">HEIGHT</span>
                  <span className="text-sm font-black text-white">{player.height}</span>
                </div>
                <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase">FOOT</span>
                  <span className="text-sm font-black text-white">{player.strongFoot}</span>
                </div>
              </div>
            </div>

            {/* Center Player Photo Showcase */}
            <div className="lg:col-span-3 flex justify-center relative mt-8 lg:mt-0">
              <div className="relative w-[240px] h-[320px] md:w-[280px] md:h-[360px] flex items-end justify-center">
                {/* Heavy Glow behind player */}
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl pointer-events-none scale-90" />
                
                <Image
                  src="/images/player_placeholder_nobg.png"
                  alt={player.name}
                  fill
                  sizes="(max-width: 768px) 240px, 280px"
                  className="object-contain object-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] z-10 scale-[1.05]"
                  priority
                />
                
                {/* Torso Fade-out Gradient */}
                <div className="absolute bottom-[-2px] left-0 w-full h-24 bg-gradient-to-t from-[#0d1527] via-[#0d1527]/80 to-transparent z-20 pointer-events-none" />
              </div>
            </div>

            {/* Right OVR Score Card */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center gap-4">
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl text-center w-full max-w-[220px]">
                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase font-mono block mb-1">
                  PERFORMANCE INDEX
                </span>
                <span className="text-5xl font-black italic text-amber-500 block leading-none my-2 font-mono">
                  {player.rating}
                </span>
                <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-wide bg-emerald-500/10 px-2.5 py-0.5 rounded-full inline-block">
                  TOP FORM
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* STATS & EVALUATION GRID */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Season Metrics (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-black italic uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Activity size={16} className="text-amber-600" />
              <span>SEASON MATCH METRICS</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-3xl font-black text-slate-900 block leading-none font-mono">
                  {player.stats.goals}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2 font-mono">
                  GOALS SCORED
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-3xl font-black text-slate-900 block leading-none font-mono">
                  {player.stats.assists}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2 font-mono">
                  ASSISTS
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-3xl font-black text-slate-900 block leading-none font-mono">
                  {player.stats.minutes}'
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2 font-mono">
                  MINUTES PLAYED
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-3xl font-black text-amber-600 block leading-none font-mono">
                  {player.stats.passAccuracy}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2 font-mono">
                  PASS ACCURACY
                </span>
              </div>
            </div>
          </div>

          {/* Attributes Evaluation (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-black italic uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Award size={16} className="text-amber-600" />
              <span>SCOUT ATTRIBUTE EVALUATION</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              {Object.entries(player.attributes).map(([attr, val]) => (
                <div key={attr} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-black uppercase text-slate-700">
                    <span>{attr}</span>
                    <span className="text-amber-600 font-mono font-black">{val}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* TEAMMATES SECTION (FUT Card Layout Style) */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black italic uppercase tracking-tight text-slate-900">
              TEAMMATES & SQUAD
            </h3>
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">
              {player.team}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {player.teammates.map((teammate, index) => (
              <Link 
                key={index}
                href={`/player/${slugify(teammate.name)}`}
                className="group flex flex-col justify-between w-[260px] h-[400px] bg-gradient-to-br from-[#0d1527] via-[#090e1a] to-[#04060a] rounded-2xl border border-slate-800 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] transition-all duration-300 overflow-hidden shadow-md cursor-pointer select-none relative mx-auto"
              >
                {/* Inner Glow / Border */}
                <div className="absolute inset-0 rounded-2xl border-[1.5px] border-white/10 group-hover:border-amber-500/50 transition-colors pointer-events-none z-30" />
                
                {/* Hex / Pattern Overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17L3 13V7l7-4 7 4v6l-7 4z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: "20px 20px"
                  }}
                />

                {/* Big OVR Background Number */}
                <div className="absolute -top-2 -right-4 text-[150px] font-black italic text-white/[0.04] z-0 leading-none select-none tracking-tighter group-hover:scale-110 group-hover:text-amber-500/[0.05] transition-all duration-500">
                  {teammate.rating}
                </div>

                {/* Top Left FUT Badges */}
                <div className="absolute top-5 left-4 flex flex-col items-center z-20 drop-shadow-md">
                  <span className="text-3xl font-black text-white leading-none tracking-tighter">{teammate.rating}</span>
                  <span className="text-sm font-bold text-white/90 leading-none mt-1">{teammate.position}</span>
                  <div className="w-8 h-[2px] bg-white/30 my-2" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">{teammate.nationality}</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider mt-1">{player.team.slice(0, 3)}</span>
                </div>

                {/* Player Image with Drop Shadow & Gradient Mask */}
                <div className="absolute bottom-[75px] left-1/2 -translate-x-1/2 w-[240px] h-[280px] z-10 flex items-end justify-center">
                  <Image
                    src="/images/player_placeholder_nobg.png"
                    alt={teammate.name}
                    fill
                    sizes="260px"
                    className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] transform group-hover:scale-[1.08] transition-transform duration-500 origin-bottom"
                  />
                </div>

                {/* Bottom Glassmorphic Nameplate & Stats */}
                <div className="absolute bottom-0 left-0 w-full z-20">
                   {/* Fade into the nameplate */}
                   <div className="h-10 w-full bg-gradient-to-t from-black/80 to-transparent" />
                   
                   <div className="bg-black/80 backdrop-blur-md p-4 pt-0 pb-4 flex flex-col items-center">
                      <h3 className="text-lg md:text-xl font-black italic uppercase text-white tracking-wide text-center drop-shadow-md group-hover:text-amber-500 transition-colors">
                        {teammate.name}
                      </h3>
                      <div className="w-full h-[1px] bg-white/10 my-2.5" />
                      <div className="flex w-full justify-between px-2">
                         <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm leading-none">{teammate.rating + 2}</span>
                            <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">PAC</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm leading-none">{teammate.rating - 1}</span>
                            <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">SHO</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm leading-none">{teammate.rating - 3}</span>
                            <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">PAS</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm leading-none">{teammate.rating + 1}</span>
                            <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">DRI</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm leading-none">{Math.max(45, teammate.rating - 30)}</span>
                            <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">DEF</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-white font-bold text-sm leading-none">{teammate.rating - 5}</span>
                            <span className="text-white/50 text-[8px] font-bold uppercase mt-0.5">PHY</span>
                         </div>
                      </div>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trophy, Calendar, MapPin, Shield, Play, HelpCircle, Activity, Award, Star } from "lucide-react";
import OfficialPartners from "@/components/home/OfficialPartners";

type PageProps = {
  params: Promise<{
    matchId: string;
    matchSlug: string;
  }>;
};

type GoalEvent = {
  minute: string;
  player: string;
  type: "goal" | "own-goal" | "penalty";
  isHome: boolean;
};

type LineupPlayer = {
  number: number;
  name: string;
  role: string;
  image: string;
  yellowCard?: boolean;
  redCard?: boolean;
};

type MatchStats = {
  homePossession: number;
  awayPossession: number;
  homeXG: number;
  awayXG: number;
  homeBigChances: number;
  awayBigChances: number;
  homeShotsOnGoal: number;
  awayShotsOnGoal: number;
  homePassAccuracy: number;
  awayPassAccuracy: number;
  homeFouls: number;
  awayFouls: number;
  homeYellowCards: number;
  awayYellowCards: number;
};

type MatchDetails = {
  home: string;
  away: string;
  homeShort: string;
  awayShort: string;
  date: string;
  time: string;
  matchday: string;
  stadium: string;
  city: string;
  homePos: number;
  awayPos: number;
  homeLogo: string;
  awayLogo: string;
  status: "FT" | "LIVE" | "UPCOMING";
  homeScore?: number;
  awayScore?: number;
  goals?: GoalEvent[];
  highlightsVideo?: {
    title: string;
    duration: string;
    thumbnail: string;
  };
  lineups?: {
    formationHome: string;
    formationAway: string;
    startingHome: LineupPlayer[];
    startingAway: LineupPlayer[];
    benchHome: LineupPlayer[];
    benchAway: LineupPlayer[];
  };
  stats?: MatchStats;
};

// Full match details mock DB
const mockMatchesDb: Record<string, MatchDetails> = {
  "lun-vs-che": {
    home: "London United", away: "Chelsea Foundation", homeShort: "LUN", awayShort: "CHE",
    date: "August 13, 2026", time: "19:00", matchday: "Matchday 1",
    stadium: "Bexley Stadium", city: "London",
    homePos: 1, awayPos: 3,
    homeLogo: "/images/TPL_logo_Dark.png", awayLogo: "/images/TPL_logo_Dark.png",
    status: "FT",
    homeScore: 2,
    awayScore: 1,
    goals: [
      { minute: "12'", player: "Elhan Davies", type: "goal", isHome: true },
      { minute: "34'", player: "Billy Gil", type: "penalty", isHome: false },
      { minute: "78'", player: "A. Rahman", type: "goal", isHome: true }
    ],
    highlightsVideo: {
      title: "London United vs Chelsea Foundation - Full Match Highlights | MD1",
      duration: "8:42",
      thumbnail: "/images/slider/sliderTPL.jpeg"
    },
    lineups: {
      formationHome: "4-3-3",
      formationAway: "4-3-3",
      startingHome: [
        { number: 1, name: "Jack Porter", role: "Goalkeeper", image: "/images/slider/sliderMen.png" },
        { number: 2, name: "A. Rahman", role: "Defender", image: "/images/slider/sliderMen.png", yellowCard: true },
        { number: 9, name: "Elhan Davies", role: "Forward", image: "/images/slider/sliderMen.png" }
      ],
      startingAway: [
        { number: 22, name: "Billy Gil", role: "Goalkeeper", image: "/images/slider/sliderMen.png" },
        { number: 8, name: "Reece James Jr", role: "Defender", image: "/images/slider/sliderMen.png" }
      ],
      benchHome: [
        { number: 12, name: "Fahad Al-Harbi", role: "Defender", image: "/images/slider/sliderMen.png" }
      ],
      benchAway: [
        { number: 23, name: "Abdulaziz Al Awardi", role: "Goalkeeper", image: "/images/slider/sliderMen.png" }
      ]
    },
    stats: {
      homePossession: 36,
      awayPossession: 64,
      homeXG: 1.66,
      awayXG: 0.88,
      homeBigChances: 2,
      awayBigChances: 1,
      homeShotsOnGoal: 4,
      awayShotsOnGoal: 3,
      homePassAccuracy: 76,
      awayPassAccuracy: 87,
      homeFouls: 13,
      awayFouls: 10,
      homeYellowCards: 6,
      awayYellowCards: 2
    }
  },
  "man-vs-bir": {
    home: "Manchester Elite", away: "Birmingham City", homeShort: "MAN", awayShort: "BIR",
    date: "August 13, 2026", time: "21:00", matchday: "Matchday 1",
    stadium: "Elite Youth Complex", city: "Manchester",
    homePos: 2, awayPos: 8,
    homeLogo: "/images/TPL_logo_Dark.png", awayLogo: "/images/TPL_logo_Dark.png",
    status: "FT",
    homeScore: 0,
    awayScore: 3,
    goals: [
      { minute: "14'", player: "Jobe Bellingham Jr", type: "goal", isHome: false },
      { minute: "45'", player: "Jordan James Jr", type: "goal", isHome: false },
      { minute: "82'", player: "John Davies Jr", type: "penalty", isHome: false }
    ],
    highlightsVideo: {
      title: "Manchester Elite vs Birmingham City - Highlights & Goals",
      duration: "5:10",
      thumbnail: "/images/slider/sliderTPL.jpeg"
    },
    lineups: {
      formationHome: "4-4-2",
      formationAway: "4-2-3-1",
      startingHome: [
        { number: 1, name: "J. Thompson", role: "Goalkeeper", image: "/images/slider/sliderMen.png" }
      ],
      startingAway: [
        { number: 16, name: "Jobe Bellingham Jr", role: "Goalkeeper", image: "/images/slider/sliderMen.png" }
      ],
      benchHome: [],
      benchAway: []
    },
    stats: {
      homePossession: 42,
      awayPossession: 58,
      homeXG: 0.45,
      awayXG: 2.12,
      homeBigChances: 0,
      awayBigChances: 4,
      homeShotsOnGoal: 1,
      awayShotsOnGoal: 7,
      homePassAccuracy: 79,
      awayPassAccuracy: 89,
      homeFouls: 12,
      awayFouls: 9,
      homeYellowCards: 1,
      awayYellowCards: 1
    }
  },
  "ars-vs-whu": {
    home: "Arsenal Academy", away: "West Ham United", homeShort: "ARS", awayShort: "WHU",
    date: "August 13, 2026", time: "20:30", matchday: "Matchday 1",
    stadium: "Hale End", city: "London",
    homePos: 4, awayPos: 5,
    homeLogo: "/images/TPL_logo_Dark.png", awayLogo: "/images/TPL_logo_Dark.png",
    status: "UPCOMING"
  },
  "liv-vs-lee": {
    home: "Liverpool Academy", away: "Leeds Academy", homeShort: "LIV", awayShort: "LEE",
    date: "August 14, 2026", time: "19:30", matchday: "Matchday 1",
    stadium: "Kirkby Academy", city: "Liverpool",
    homePos: 9, awayPos: 10,
    homeLogo: "/images/TPL_logo_Dark.png", awayLogo: "/images/TPL_logo_Dark.png",
    status: "UPCOMING"
  },
  "tot-vs-avl": {
    home: "Tottenham Hotspur", away: "Aston Villa", homeShort: "TOT", awayShort: "AVL",
    date: "August 14, 2026", time: "21:00", matchday: "Matchday 1",
    stadium: "Hotspur Way", city: "London",
    homePos: 6, awayPos: 7,
    homeLogo: "/images/TPL_logo_Dark.png", awayLogo: "/images/TPL_logo_Dark.png",
    status: "UPCOMING"
  },
  "new-vs-eve": {
    home: "Newcastle United", away: "Everton Youth", homeShort: "NEW", awayShort: "EVE",
    date: "August 15, 2026", time: "15:00", matchday: "Matchday 1",
    stadium: "Darsley Park", city: "Newcastle",
    homePos: 12, awayPos: 11,
    homeLogo: "/images/TPL_logo_Dark.png", awayLogo: "/images/TPL_logo_Dark.png",
    status: "UPCOMING"
  }
};

const topStandings = [
  { pos: 1, short: "LUN", name: "London United", pts: 47, p: 22, gd: 24, logo: "/images/TPL_logo_Dark.png" },
  { pos: 2, short: "MAN", name: "Manchester Elite", pts: 43, p: 22, gd: 19, logo: "/images/TPL_logo_Dark.png" },
  { pos: 3, short: "CHE", name: "Chelsea Foundation", pts: 40, p: 22, gd: 14, logo: "/images/TPL_logo_Dark.png" },
  { pos: 4, short: "ARS", name: "Arsenal Academy", pts: 38, p: 22, gd: 10, logo: "/images/TPL_logo_Dark.png" },
  { pos: 5, short: "WHU", name: "West Ham United", pts: 36, p: 22, gd: 5, logo: "/images/TPL_logo_Dark.png" },
];

const mockVideos = [
  { id: 1, title: "London United vs Chelsea Foundation - Classic League Highlights", duration: "8:42", thumbnail: "/images/slider/sliderTPL.jpeg" },
  { id: 2, title: "Top 5 Goals of Matchday 1 - Talent Pro League", duration: "5:15", thumbnail: "/images/slider/sliderMen.png" },
  { id: 3, title: "Tactical Analysis: Manchester Elite vs Birmingham City Preview", duration: "12:10", thumbnail: "/images/slider/sliderWomen.png" },
];

export default function MatchCentrePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const matchSlug = resolvedParams.matchSlug.toLowerCase();
  
  // Find current match or fallback to default London vs Chelsea
  const match = mockMatchesDb[matchSlug] || mockMatchesDb["lun-vs-che"];

  const isDone = match.status === "FT";

  return (
    <main className="min-h-screen bg-slate-50 text-gray-950 font-sans">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Top horizontal match selection ribbon (Sub-Navbar) */}
      <div className="bg-white border-b border-gray-200 py-4 overflow-x-auto select-none no-scrollbar shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 flex gap-4 min-w-max">
          {Object.entries(mockMatchesDb).map(([slug, m]) => {
            const isSelected = slug === matchSlug;
            return (
              <Link 
                key={slug} 
                href={`/match/8abecee6bd2a4266915f18e6098741cf/${slug}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-black transition-all ${
                  isSelected 
                    ? "bg-[#0b1016] text-white border-[#0b1016] shadow-sm" 
                    : "bg-white text-gray-700 border-gray-200 hover:border-amber-500/40"
                }`}
              >
                <span>{m.homeShort}</span>
                {m.status === "FT" ? (
                  <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-black text-[10px]">
                    {m.homeScore} - {m.awayScore}
                  </span>
                ) : (
                  <span className="opacity-50">VS</span>
                )}
                <span>{m.awayShort}</span>
                <span className="opacity-40">•</span>
                <span>{m.date.split(',')[0]}</span>
                <span className="opacity-40">•</span>
                <span>{m.time}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Match Banner / Hero Area */}
      <section className="relative w-full py-16 px-4 md:px-12 mt-6 overflow-hidden bg-[#06090e] border-y border-gray-200">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/slider/sliderTPL.jpeg"
            alt="Stadium background"
            fill
            className="object-cover opacity-50 filter blur-[1px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/85"></div>
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          <div className="col-span-1 md:col-span-3 flex justify-center md:justify-start">
            <Image
              src="/images/TPL_logo_White.png"
              alt="TPL Logo"
              width={100}
              height={100}
              className="object-contain opacity-95 drop-shadow-2xl"
            />
          </div>

          <div className="col-span-1 md:col-span-9 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
            {/* Home Team */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-4 text-center md:text-left justify-end">
              <span className="text-xl md:text-3xl font-black uppercase text-white tracking-tight">
                {match.home}
              </span>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 shadow-lg border-2 border-amber-500/20">
                <img src={match.homeLogo} alt={match.home} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Score or Time Info */}
            <div className="text-center flex flex-col items-center min-w-[180px]">
              <span className="bg-amber-500 text-black text-[10px] font-black px-3.5 py-1.5 rounded-full mb-3 tracking-widest uppercase">
                {match.matchday}
              </span>
              {match.status === "FT" ? (
                <>
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                    {match.homeScore} - {match.awayScore}
                  </span>
                  <span className="text-[10px] font-black text-amber-500 tracking-wider uppercase mt-2">
                    FT / Full Time
                  </span>
                </>
              ) : (
                <>
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                    {match.time}
                  </span>
                  <span className="text-xs font-bold text-amber-500 tracking-widest uppercase mt-2">
                    {match.date}
                  </span>
                </>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col md:flex-row-reverse items-center gap-4 text-center md:text-right justify-start">
              <span className="text-xl md:text-3xl font-black uppercase text-white tracking-tight">
                {match.away}
              </span>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 shadow-lg border-2 border-amber-500/20">
                <img src={match.awayLogo} alt={match.away} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs (Overview and Standings layout) */}
      <section className="py-12 px-4 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Match Details / Match Summary */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* OVERVIEW CONTENT BLOCK */}
            <div className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4 border-l-4 border-amber-500 pl-3">
                Overview
              </h2>

              {isDone && match.goals && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-black tracking-widest text-amber-600 uppercase mb-4 flex items-center gap-1.5">
                    <Activity size={14} /> Goals Timeline
                  </h3>
                  <div className="space-y-3">
                    {match.goals.map((goal, idx) => (
                      <div key={idx} className={`flex items-center gap-3 text-sm ${goal.isHome ? "justify-start" : "justify-end"}`}>
                        {goal.isHome && (
                          <>
                            <span className="font-extrabold text-amber-600">{goal.minute}</span>
                            <span className="text-gray-700">{goal.player}</span>
                            <span className="text-xs text-gray-400">({goal.type})</span>
                          </>
                        )}
                        {!goal.isHome && (
                          <>
                            <span className="text-xs text-gray-400">({goal.type})</span>
                            <span className="text-gray-700">{goal.player}</span>
                            <span className="font-extrabold text-amber-600">{goal.minute}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights Video Area */}
              {isDone && match.highlightsVideo && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-black tracking-widest text-amber-600 uppercase mb-4 flex items-center gap-1.5">
                    <Play size={14} /> Match Highlights
                  </h3>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 group cursor-pointer border border-gray-150">
                    <Image
                      src={match.highlightsVideo.thumbnail}
                      alt={match.highlightsVideo.title}
                      fill
                      className="object-cover opacity-75 group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play size={24} fill="black" className="ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/70 px-2.5 py-1 rounded text-xs font-bold text-white">
                      {match.highlightsVideo.duration}
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-gray-800 mt-3">{match.highlightsVideo.title}</h4>
                </div>
              )}

              {/* Lineups Section */}
              {isDone && match.lineups && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-black tracking-widest text-amber-600 uppercase mb-4">
                    Lineups ({match.lineups.formationHome} vs {match.lineups.formationAway})
                  </h3>
                  
                  {/* Field Pitch Layout Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {/* Home Team Starting XI */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase text-slate-500 border-b pb-1.5 flex justify-between">
                        <span>{match.home} Starting XI</span>
                        <span className="text-slate-400">Formation: {match.lineups.formationHome}</span>
                      </h4>
                      <div className="space-y-2">
                        {match.lineups.startingHome.map((player) => (
                          <div key={player.number} className="flex items-center gap-3 py-1 text-xs">
                            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-gray-200 flex-shrink-0">
                              <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="w-5 text-center font-bold text-slate-400">{player.number}</span>
                            <span className="font-extrabold text-slate-800 flex-1">{player.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-gray-200 px-2 py-0.5 rounded-full">{player.role}</span>
                            {player.yellowCard && <span className="w-3.5 h-4.5 bg-yellow-400 rounded-sm border border-yellow-500 block shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Away Team Starting XI */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase text-slate-500 border-b pb-1.5 flex justify-between">
                        <span>{match.away} Starting XI</span>
                        <span className="text-slate-400">Formation: {match.lineups.formationAway}</span>
                      </h4>
                      <div className="space-y-2">
                        {match.lineups.startingAway.map((player) => (
                          <div key={player.number} className="flex items-center gap-3 py-1 text-xs">
                            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-gray-200 flex-shrink-0">
                              <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="w-5 text-center font-bold text-slate-400">{player.number}</span>
                            <span className="font-extrabold text-slate-800 flex-1">{player.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-gray-200 px-2 py-0.5 rounded-full">{player.role}</span>
                            {player.yellowCard && <span className="w-3.5 h-4.5 bg-yellow-400 rounded-sm border border-yellow-500 block shrink-0" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benches Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-slate-100">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bench (Home)</h5>
                      {match.lineups.benchHome.length > 0 ? (
                        match.lineups.benchHome.map((player) => (
                          <div key={player.number} className="flex items-center gap-3 py-1 text-xs">
                            <span className="w-5 text-center font-bold text-slate-400">{player.number}</span>
                            <span className="font-bold text-slate-700 flex-1">{player.name}</span>
                            <span className="text-[10px] text-slate-400">{player.role}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">No bench players recorded.</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bench (Away)</h5>
                      {match.lineups.benchAway.length > 0 ? (
                        match.lineups.benchAway.map((player) => (
                          <div key={player.number} className="flex items-center gap-3 py-1 text-xs">
                            <span className="w-5 text-center font-bold text-slate-400">{player.number}</span>
                            <span className="font-bold text-slate-700 flex-1">{player.name}</span>
                            <span className="text-[10px] text-slate-400">{player.role}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">No bench players recorded.</span>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Match Stats Section */}
              {isDone && match.stats && (
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8 border-b pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 border">
                        <img src={match.homeLogo} alt={match.home} className="object-contain" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wide text-slate-500">{match.homeShort}</span>
                    </div>
                    <h3 className="text-base font-black tracking-widest text-slate-800 uppercase">
                      MATCH STATS
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wide text-slate-500">{match.awayShort}</span>
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 border">
                        <img src={match.awayLogo} alt={match.away} className="object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Possession % */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm font-black text-slate-850">
                        <span className="text-lg">{match.stats.homePossession}</span>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Possession %</span>
                        <span className="text-lg">{match.stats.awayPossession}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
                        <div 
                          className="bg-slate-800 h-full transition-all" 
                          style={{ width: `${match.stats.homePossession}%` }}
                        />
                        <div 
                          className="bg-[#38003c] h-full transition-all" 
                          style={{ width: `${match.stats.awayPossession}%` }}
                        />
                      </div>
                    </div>

                    {/* Expected Goals */}
                    <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.homeXG >= match.stats.awayXG ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.homeXG.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Expected Goals</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.awayXG >= match.stats.homeXG ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.awayXG.toFixed(2)}
                      </span>
                    </div>

                    {/* Big Chances */}
                    <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.homeBigChances >= match.stats.awayBigChances ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.homeBigChances}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Big Chances</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.awayBigChances >= match.stats.homeBigChances ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.awayBigChances}
                      </span>
                    </div>

                    {/* Shots on Goal */}
                    <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.homeShotsOnGoal >= match.stats.awayShotsOnGoal ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.homeShotsOnGoal}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Shots on Goal</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.awayShotsOnGoal >= match.stats.homeShotsOnGoal ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.awayShotsOnGoal}
                      </span>
                    </div>

                    {/* Passing Accuracy % */}
                    <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.homePassAccuracy >= match.stats.awayPassAccuracy ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.homePassAccuracy}%
                      </span>
                      <span className="text-xs font-bold text-slate-500">Passing Accuracy %</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.awayPassAccuracy >= match.stats.homePassAccuracy ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.awayPassAccuracy}%
                      </span>
                    </div>

                    {/* Fouls */}
                    <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.homeFouls >= match.stats.awayFouls ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.homeFouls}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Fouls</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.awayFouls >= match.stats.homeFouls ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.awayFouls}
                      </span>
                    </div>

                    {/* Yellow Cards */}
                    <div className="flex items-center justify-between text-sm py-1 border-b border-slate-100">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.homeYellowCards >= match.stats.awayYellowCards ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.homeYellowCards}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Yellow Cards</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${match.stats.awayYellowCards >= match.stats.homeYellowCards ? "bg-[#38003c] text-white" : "text-slate-800"}`}>
                        {match.stats.awayYellowCards}
                      </span>
                    </div>

                  </div>
                </div>
              )}

              {/* Standard stadium and City info cards */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-2">
                    Referee Info
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Referee information is currently unavailable. We'll update you shortly.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xs font-black tracking-widest text-amber-600 uppercase mb-4">
                    GENERAL INFO
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">Stadium and location information</span>
                      <span className="text-sm font-bold text-gray-800 flex items-center gap-2 mt-1">
                        <MapPin size={14} className="text-amber-500" />
                        Stadium: {match.stadium}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-bold text-gray-800 block">
                        City: {match.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Dynamic Standings snippet */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-sm font-black tracking-widest text-amber-600 uppercase">
                  Standings
                </h3>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-left text-xs font-bold">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider">
                      <th className="py-3 px-4">Pos</th>
                      <th className="py-3 px-4">Club</th>
                      <th className="py-3 px-4 text-center">PTS</th>
                      <th className="py-3 px-4 text-center">P</th>
                      <th className="py-3 px-4 text-center">GD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStandings.map((team) => {
                      const isMatchTeam = team.short === match.homeShort || team.short === match.awayShort;
                      return (
                        <tr 
                          key={team.pos} 
                          className={`border-t border-gray-100 transition-colors ${
                            isMatchTeam 
                              ? "bg-purple-50 hover:bg-purple-100/50 text-purple-900 font-extrabold" 
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <td className="py-3 px-4 flex items-center gap-2">
                            <span className="w-1.5 h-3 bg-emerald-500 rounded-full inline-block"></span>
                            {team.pos}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 border border-gray-200 shadow-sm">
                                <img src={team.logo} alt={team.name} className="object-contain w-full h-full" />
                              </div>
                              <span>{team.short}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">{team.pts}</td>
                          <td className="py-3 px-4 text-center">{team.p}</td>
                          <td className="py-3 px-4 text-center">{team.gd}</td>
                        </tr>
                      );
                    })}

                    <tr className="bg-gray-50">
                      <td colSpan={5} className="py-1 px-4 text-center opacity-65 text-[9px] uppercase tracking-wider text-gray-500">
                        Current Match Ranks
                      </td>
                    </tr>

                    {match.homePos > 5 && (
                      <tr className="bg-purple-50 border-t border-purple-100 hover:bg-purple-100/50 transition-colors text-purple-900">
                        <td className="py-3 px-4 font-extrabold text-purple-700">
                          ▼ {match.homePos}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 border border-gray-200">
                              <img src={match.homeLogo} alt={match.home} className="object-contain" />
                            </div>
                            <span>{match.homeShort}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">0</td>
                        <td className="py-3 px-4 text-center">0</td>
                        <td className="py-3 px-4 text-center">0</td>
                      </tr>
                    )}

                    {match.awayPos > 5 && (
                      <tr className="bg-purple-50 border-t border-purple-100 hover:bg-purple-100/50 transition-colors text-purple-900">
                        <td className="py-3 px-4 font-extrabold text-purple-700">
                          ▼ {match.awayPos}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 border border-gray-200">
                              <img src={match.awayLogo} alt={match.away} className="object-contain" />
                            </div>
                            <span>{match.awayShort}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">0</td>
                        <td className="py-3 px-4 text-center">0</td>
                        <td className="py-3 px-4 text-center">0</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-8 text-gray-900">
            Latest Videos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockVideos.map((video) => (
              <div 
                key={video.id} 
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-amber-500/40 transition-all cursor-pointer shadow-sm"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black transform group-hover:scale-110 transition-transform">
                      <Play size={20} fill="black" className="ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold text-sm text-gray-800 group-hover:text-amber-500 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfficialPartners />
    </main>
  );
}

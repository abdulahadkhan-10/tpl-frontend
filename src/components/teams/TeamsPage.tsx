"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, ChevronUp, User, SlidersHorizontal, Sparkles, ArrowRight } from 'lucide-react';

interface TeamStats {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}

interface TeamItem {
  name: string;
  shortName: string;
  division: string;
  stadium: string;
  manager: string;
  letter: string;
  bg: string;
  color: string;
  accent: string;
  region: string;
  stats: TeamStats;
  players: string[];
  founded: string;
  motto: string;
}

const TeamBadge: React.FC<{ team: TeamItem; size?: number }> = ({ team, size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-sm"
    aria-label={`${team.name} badge`}
    role="img"
  >
    <circle cx="50" cy="50" r="48" fill={team.bg} />
    <circle cx="50" cy="50" r="44" fill="none" stroke={team.color} strokeWidth="1.5" opacity="0.3" />
    <circle cx="50" cy="50" r="36" fill="none" stroke={team.color} strokeWidth="0.8" opacity="0.15" />
    <path d="M18 50 A32 32 0 0 1 82 50" fill="none" stroke={team.accent} strokeWidth="2.5" opacity="0.65" />
    <text
      x="50" y="56"
      fontFamily="var(--font-geist-sans), sans-serif"
      fontSize={size > 40 ? 26 : 18}
      fontWeight="900"
      fill={team.color}
      textAnchor="middle"
      dominantBaseline="middle"
    >{team.letter}</text>
    <text
      x="50" y="80"
      fontFamily="var(--font-geist-sans), sans-serif"
      fontSize="7"
      fontWeight="800"
      fill={team.accent}
      textAnchor="middle"
      opacity="0.8"
      letterSpacing="2"
    >TPL</text>
  </svg>
);

const WinRing: React.FC<{ rate: number; accent: string }> = ({ rate, accent }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (rate / 100) * circ;
  return (
    <div className="relative w-13 h-13 flex items-center justify-center">
      <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
        <circle
          cx="26" cy="26" r={r} fill="none"
          stroke={accent} strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          className="transition-[stroke-dasharray] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-slate-900 tabular-nums">{rate}%</span>
      </div>
    </div>
  );
};

const divisionMeta = (division: string) => {
  if (division.includes('Premier')) return { label: 'Premier', cls: 'bg-amber-400 text-slate-950 font-black' };
  if (division.includes('Championship')) return { label: 'Championship', cls: 'bg-slate-900 text-white font-black' };
  return { label: 'Development', cls: 'bg-emerald-600 text-white font-black' };
};

const tplTeams: TeamItem[] = [
  {
    name: 'London United', shortName: 'LUN',
    division: 'U18 Premier', stadium: 'Central Arena', manager: 'Richard Cole',
    letter: 'LU', bg: '#0f172a', color: '#eab308', accent: '#facc15',
    region: 'London', founded: 'Est. 2019', motto: 'Glory Through Unity',
    stats: { played: 22, wins: 14, draws: 5, losses: 3, points: 47, goalsFor: 42, goalsAgainst: 18 },
    players: ['Elhan Davies (CM)', 'Billy Gil (CM)', 'A. Rahman (LW)']
  },
  {
    name: 'Chelsea Foundation', shortName: 'CHE',
    division: 'U18 Premier', stadium: 'Stamford Grounds', manager: 'Frank Lampard Jr',
    letter: 'CF', bg: '#1e3a8a', color: '#ffffff', accent: '#60a5fa',
    region: 'London', founded: 'Est. 2020', motto: 'Building Futures',
    stats: { played: 22, wins: 12, draws: 4, losses: 6, points: 40, goalsFor: 36, goalsAgainst: 22 },
    players: ['Billy Gil (CM)', 'Tammy Abraham Jr (ST)', 'Reece James Jr (RB)']
  },
  {
    name: 'Arsenal Academy', shortName: 'ARS',
    division: 'U18 Premier', stadium: 'Hale End Field', manager: 'Jack Wilshere',
    letter: 'AA', bg: '#991b1b', color: '#ffffff', accent: '#fca5a5',
    region: 'London', founded: 'Est. 2018', motto: 'Victoria Concordia Crescit',
    stats: { played: 22, wins: 11, draws: 5, losses: 6, points: 38, goalsFor: 34, goalsAgainst: 24 },
    players: ['Ethan Nwaneri Jr (CAM)', 'Jack Porter (GK)', 'Myles Lewis-Skelly (CM)']
  },
  {
    name: 'West Ham United', shortName: 'WHU',
    division: 'U18 Premier', stadium: 'East Stadium', manager: 'Mark Noble',
    letter: 'WH', bg: '#7c1c3c', color: '#ffffff', accent: '#38bdf8',
    region: 'London', founded: 'Est. 2021', motto: 'Iron Will, Iron Heart',
    stats: { played: 22, wins: 11, draws: 3, losses: 8, points: 36, goalsFor: 33, goalsAgainst: 28 },
    players: ['Divin Mubama (ST)', 'George Earthy (CAM)', 'Kaelan Casey (CB)']
  },
  {
    name: 'Manchester Elite', shortName: 'MAN',
    division: 'U18 Premier', stadium: 'Elite Pitch 1', manager: 'Alex Ferguson Jr',
    letter: 'ME', bg: '#991b1b', color: '#ffffff', accent: '#fbbf24',
    region: 'North West', founded: 'Est. 2019', motto: 'Red Devils Rising',
    stats: { played: 22, wins: 13, draws: 4, losses: 5, points: 43, goalsFor: 39, goalsAgainst: 20 },
    players: ['J. Thompson (ST)', 'Mason Greenwood Jr (RW)', 'Paul Scholes Jr (CM)']
  },
  {
    name: 'Birmingham City', shortName: 'BIR',
    division: 'U18 Championship', stadium: 'St Andrews Youth', manager: 'John Davies',
    letter: 'BC', bg: '#1d4ed8', color: '#ffffff', accent: '#93c5fd',
    region: 'West Midlands', founded: 'Est. 2020', motto: 'Keep Right On',
    stats: { played: 22, wins: 9, draws: 6, losses: 7, points: 33, goalsFor: 28, goalsAgainst: 26 },
    players: ['John Davies Jr (CM)', 'Jordan James Jr (AM)', 'Jobe Bellingham Jr (CM)']
  },
  {
    name: 'Liverpool Verrrors', shortName: 'LIV',
    division: 'U18 Championship', stadium: 'Riverside Pitch', manager: 'Steve Gerrard Jr',
    letter: 'LV', bg: '#b91c1c', color: '#ffffff', accent: '#fde047',
    region: 'Merseyside', founded: 'Est. 2019', motto: "You'll Never Walk Alone",
    stats: { played: 22, wins: 9, draws: 6, losses: 7, points: 33, goalsFor: 27, goalsAgainst: 27 },
    players: ['Steve Gerrard III (AM)', 'Jayden Danns (ST)', 'Lewis Koumas (LW)']
  },
  {
    name: 'Leeds Academy', shortName: 'LEE',
    division: 'U14 Development', stadium: 'Leeds Complex', manager: 'Paul Robinson',
    letter: 'LA', bg: '#1e293b', color: '#f8fafc', accent: '#fbbf24',
    region: 'Yorkshire & Humber', founded: 'Est. 2021', motto: 'Marching On Together',
    stats: { played: 22, wins: 8, draws: 6, losses: 8, points: 30, goalsFor: 24, goalsAgainst: 28 },
    players: ['Archie Gray Jr (CM)', 'Mateo Joseph (ST)', 'Charlie Crew (CM)']
  }
];

const divisions = ['All', 'U18 Premier', 'U18 Championship', 'U14 Development'];

export default function TeamsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'wins' | 'name'>('points');
  const [divFilter, setDivFilter] = useState('All');
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const filtered = tplTeams
    .filter(t => {
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.manager.toLowerCase().includes(q) || t.stadium.toLowerCase().includes(q);
      const matchDiv = divFilter === 'All' || t.division === divFilter;
      return matchSearch && matchDiv;
    })
    .sort((a, b) => {
      if (sortBy === 'points') return b.stats.points - a.stats.points;
      if (sortBy === 'wins') return b.stats.wins - a.stats.wins;
      return a.name.localeCompare(b.name);
    });

  const totalGoals = filtered.reduce((s, t) => s + t.stats.goalsFor, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20 pb-24 px-6 md:px-12 font-sans text-slate-900 overflow-hidden">
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* ============================================================ */}
        {/* HERO BANNER (Impeccable Dark Board with TPL Watermark) */}
        {/* ============================================================ */}
        <section className="bg-[#0d1527] rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl text-white relative overflow-hidden">
          
          {/* TPL Logo Watermark Background */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.08] select-none pointer-events-none z-0">
            <Image
              src="/images/TPL_logo_White.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Athletic Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  <Sparkles size={10} />
                  <span>TPL OFFICIAL DIRECTORY</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight text-white leading-none">
                ACADEMY CLUBS
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-semibold leading-relaxed">
                Explore elite youth football academies competing in the Talent Pro League. View club profiles, performance analytics, and top prospects.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="flex items-center gap-3 shrink-0">
              {[
                { value: filtered.length, label: 'CLUBS' },
                { value: filtered.reduce((s, t) => s + t.stats.played, 0), label: 'MATCHES' },
                { value: totalGoals, label: 'GOALS', amber: true },
              ].map(s => (
                <div key={s.label} className="flex flex-col justify-center items-center w-20 h-20 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md">
                  <p className={`text-2xl font-black tabular-nums leading-none mb-1 font-mono ${s.amber ? 'text-amber-400' : 'text-white'}`}>{s.value}</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CONTROLS & DIVISION PILLS */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search clubs, managers, stadiums…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold placeholder:text-slate-400 text-slate-800 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Division Pill Filter Row */}
          <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200/80 overflow-x-auto max-w-full">
            {divisions.map((div) => (
              <button
                key={div}
                onClick={() => setDivFilter(div)}
                className={`text-[10px] font-black px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  divFilter === div 
                    ? "bg-amber-500 text-slate-950 shadow-xs" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {div.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center w-full md:w-auto">
            <SlidersHorizontal size={13} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'points' | 'wins' | 'name')}
              className="w-full md:w-auto pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer appearance-none uppercase tracking-wider"
            >
              <option value="points">SORT: POINTS</option>
              <option value="wins">SORT: WINS</option>
              <option value="name">SORT: NAME</option>
            </select>
            <ChevronDown size={12} className="absolute right-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* TEAM CARDS GRID */}
        {/* ============================================================ */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl py-20 text-center shadow-sm">
            <p className="text-slate-400 font-bold text-sm">No clubs match your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((team) => {
                const isOpen = expandedTeam === team.name;
                const meta = divisionMeta(team.division);
                const winRate = Math.round((team.stats.wins / team.stats.played) * 100);
                const gd = team.stats.goalsFor - team.stats.goalsAgainst;

                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={team.name}
                    className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-5">
                      
                      {/* Top Header Row */}
                      <div className="flex items-center gap-4">
                        <div
                          className="shrink-0 rounded-2xl p-1.5 border border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105"
                          style={{ background: `${team.accent}15` }}
                        >
                          <TeamBadge team={team} size={54} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[8px] uppercase tracking-wider px-2 py-0.5 rounded ${meta.cls}`}>
                              {meta.label}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono font-bold">{team.founded}</span>
                          </div>
                          <h2 className="text-lg font-black italic uppercase text-slate-950 leading-tight truncate group-hover:text-amber-600 transition-colors">
                            {team.name}
                          </h2>
                          <p className="text-[10px] italic font-semibold text-slate-400 mt-0.5 truncate">
                            &quot;{team.motto}&quot;
                          </p>
                          
                          <div className="flex items-center gap-4 mt-2 text-[11px] font-bold text-slate-500">
                            <span className="flex items-center gap-1"><User size={12} className="text-slate-400" />{team.manager}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" />{team.stadium}</span>
                          </div>
                        </div>

                        <div className="shrink-0 flex flex-col items-center gap-1">
                          <WinRing rate={winRate} accent={team.accent} />
                          <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider font-mono">WIN %</span>
                        </div>
                      </div>

                      {/* Stats Metric Box Grid */}
                      <div className="pt-4 border-t border-slate-100 grid grid-cols-5 gap-2 font-mono">
                        {[
                          { label: 'MP', value: team.stats.played, color: 'text-slate-700' },
                          { label: 'W', value: team.stats.wins, color: 'text-emerald-600' },
                          { label: 'D', value: team.stats.draws, color: 'text-slate-400' },
                          { label: 'L', value: team.stats.losses, color: 'text-rose-500' },
                          { label: 'PTS', value: team.stats.points, color: 'text-amber-600', bold: true },
                        ].map(s => (
                          <div key={s.label} className="flex flex-col items-center bg-slate-50 rounded-xl py-2 border border-slate-100">
                            <span className={`text-sm font-black tabular-nums ${s.color} ${s.bold ? 'text-base' : ''}`}>{s.value}</span>
                            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider mt-0.5">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Goals info */}
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-wider font-mono">
                        <span>GF <strong className="text-emerald-600">{team.stats.goalsFor}</strong></span>
                        <span>·</span>
                        <span>GA <strong className="text-rose-500">{team.stats.goalsAgainst}</strong></span>
                        <span>·</span>
                        <span>GD <strong className={gd >= 0 ? 'text-emerald-600' : 'text-rose-500'}>{gd > 0 ? '+' : ''}{gd}</strong></span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-1">
                        <button
                          onClick={() => router.push(`/teams/${team.shortName.toLowerCase()}`)}
                          className="w-1/2 py-2.5 rounded-xl bg-[#0d1527] hover:bg-amber-500 hover:text-slate-950 text-white text-[10px] font-black uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Club Profile</span>
                          <ArrowRight size={12} />
                        </button>
                        <button
                          onClick={() => setExpandedTeam(isOpen ? null : team.name)}
                          className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-slate-50"
                        >
                          {isOpen ? <><ChevronUp size={12} /> Hide</> : <><ChevronDown size={12} /> Prospects</>}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Prospects Drawer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden bg-slate-50 border-t border-slate-200/80"
                        >
                          <div className="p-5 space-y-4">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono block">
                              TOP ACADEMY PROSPECTS
                            </span>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {team.players.map((player, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 border border-slate-200/80 shadow-2xs"
                                >
                                  <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0 font-mono"
                                    style={{ backgroundColor: team.bg }}
                                  >
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs font-black text-slate-800 truncate uppercase italic">{player}</span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-1 flex items-center gap-2 font-mono">
                              <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider mr-1">RECENT FORM</span>
                              {['W','W','D','W','L'].map((r, idx) => (
                                <span key={idx} className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black text-white ${r === 'W' ? 'bg-emerald-500' : r === 'D' ? 'bg-slate-400' : 'bg-rose-500'}`}>{r}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}

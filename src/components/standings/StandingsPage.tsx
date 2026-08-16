"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import OfficialPartners from "@/components/home/OfficialPartners";

interface StandingRow {
  pos: number;
  name: string;
  logo: string;
  pts: number;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  color: string;
  players: string[];
}

const initialStandings: StandingRow[] = [
  { pos: 1, name: "LONDON UNITED", logo: "/images/TPL_logo_White.png", pts: 47, p: 22, w: 14, d: 5, l: 3, gf: 42, ga: 18, gd: 24, color: "bg-green-600", players: ["Elhan Davies", "Billy Gil", "A. Rahman"] },
  { pos: 2, name: "MANCHESTER ELITE", logo: "/images/TPL_logo_White.png", pts: 43, p: 22, w: 13, d: 4, l: 5, gf: 39, ga: 20, gd: 19, color: "bg-green-600", players: ["J. Thompson", "Mason Greenwood Jr", "Paul Scholes Jr"] },
  { pos: 3, name: "CHELSEA FOUNDATION", logo: "/images/TPL_logo_White.png", pts: 40, p: 22, w: 12, d: 4, l: 6, gf: 36, ga: 22, gd: 14, color: "bg-green-600", players: ["Billy Gil", "Tammy Abraham Jr", "Reece James Jr"] },
  { pos: 4, name: "ARSENAL ACADEMY", logo: "/images/TPL_logo_White.png", pts: 38, p: 22, w: 11, d: 5, l: 6, gf: 34, ga: 24, gd: 10, color: "bg-green-600", players: ["Ethan Nwaneri Jr", "Jack Porter", "Myles Lewis-Skelly"] },
  { pos: 5, name: "WEST HAM UNITED", logo: "/images/TPL_logo_White.png", pts: 36, p: 22, w: 11, d: 3, l: 8, gf: 33, ga: 28, gd: 5, color: "bg-green-600", players: ["Divin Mubama", "George Earthy", "Kaelan Casey"] },
  { pos: 6, name: "TOTTENHAM HOTSPUR", logo: "/images/TPL_logo_White.png", pts: 35, p: 22, w: 10, d: 5, l: 7, gf: 31, ga: 28, gd: 3, color: "bg-blue-500", players: ["Mikey Moore", "Jamie Donley", "Alfie Devine"] },
  { pos: 7, name: "ASTON VILLA", logo: "/images/TPL_logo_White.png", pts: 33, p: 22, w: 9, d: 6, l: 7, gf: 29, ga: 27, gd: 2, color: "bg-slate-200", players: ["Jaden Philogene", "Jacob Ramsey", "Omari Kellyman"] },
  { pos: 8, name: "BIRMINGHAM CITY", logo: "/images/TPL_logo_White.png", pts: 33, p: 22, w: 9, d: 6, l: 7, gf: 28, ga: 26, gd: 2, color: "bg-slate-200", players: ["John Davies Jr", "Jordan James Jr", "Jobe Bellingham Jr"] },
  { pos: 9, name: "LIVERPOOL ACADEMY", logo: "/images/TPL_logo_White.png", pts: 29, p: 22, w: 8, d: 5, l: 9, gf: 25, ga: 27, gd: -2, color: "bg-slate-200", players: ["Steve Gerrard III", "Jayden Danns", "Lewis Koumas"] },
  { pos: 10, name: "LEEDS ACADEMY", logo: "/images/TPL_logo_White.png", pts: 30, p: 22, w: 8, d: 6, l: 8, gf: 24, ga: 28, gd: -4, color: "bg-slate-200", players: ["Archie Gray Jr", "Mateo Joseph", "Charlie Crew"] },
  { pos: 11, name: "EVERTON YOUTH", logo: "/images/TPL_logo_White.png", pts: 25, p: 22, w: 7, d: 4, l: 11, gf: 22, ga: 32, gd: -10, color: "bg-slate-200", players: [ "Lewis Dobbin", "Tyler Onyango", "Jarrad Branthwaite"] },
  { pos: 12, name: "NEWCASTLE UNITED", logo: "/images/TPL_logo_White.png", pts: 22, p: 22, w: 6, d: 4, l: 12, gf: 20, ga: 34, gd: -14, color: "bg-slate-200", players: ["Lewis Miley", "Elliot Anderson", "Joe White"] },
  { pos: 13, name: "CRYSTAL PALACE", logo: "/images/TPL_logo_White.png", pts: 21, p: 22, w: 5, d: 6, l: 11, gf: 18, ga: 30, gd: -12, color: "bg-slate-200", players: ["Jesurun Rak-Sakyi", "David Ozoh", "Matheus França"] },
  { pos: 14, name: "FULHAM ACADEMY", logo: "/images/TPL_logo_White.png", pts: 20, p: 22, w: 5, d: 5, l: 12, gf: 19, ga: 32, gd: -13, color: "bg-slate-200", players: ["Luke Harris", "Jay Stansfield", "Adrion Pajaziti"] },
  { pos: 15, name: "SOUTHAMPTON YOUTH", logo: "/images/TPL_logo_White.png", pts: 18, p: 22, w: 4, d: 6, l: 12, gf: 16, ga: 31, gd: -15, color: "bg-slate-200", players: ["Tyler Dibling", "Samuel Amo-Ameyaw", "Dom Ballard"] },
  { pos: 16, name: "LEICESTER CITY", logo: "/images/TPL_logo_White.png", pts: 16, p: 22, w: 4, d: 4, l: 14, gf: 15, ga: 35, gd: -20, color: "bg-red-500", players: ["Will Alves", "Wanya Marçal", "Kasey McAteer"] },
  { pos: 17, name: "WOLVERHAMPTON YOUTH", logo: "/images/TPL_logo_White.png", pts: 15, p: 22, w: 3, d: 6, l: 13, gf: 14, ga: 36, gd: -22, color: "bg-red-500", players: ["Nathan Fraser", "Tawanda Chirewa", "Leon Chiwome"] },
  { pos: 18, name: "BRENTFORD ACADEMY", logo: "/images/TPL_logo_White.png", pts: 12, p: 22, w: 2, d: 6, l: 14, gf: 11, ga: 38, gd: -27, color: "bg-red-500", players: ["Yehor Yarmoliuk", "Michael Olakigbe", "Val Adedokun"] },
];

export default function StandingsPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (pos: number) => {
    setExpandedRow(expandedRow === pos ? null : pos);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-[#0f172a]">
            Standings
          </h1>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-500 uppercase">
                  <th className="py-4 pl-6 w-16 text-center">POS</th>
                  <th className="py-4">CLUB</th>
                  <th className="py-4 text-center font-black text-slate-800 w-20">PTS &uarr;</th>
                  <th className="py-4 text-center w-12">P</th>
                  <th className="py-4 text-center w-12">W</th>
                  <th className="py-4 text-center w-12">D</th>
                  <th className="py-4 text-center w-12">L</th>
                  <th className="py-4 text-center w-12">GF</th>
                  <th className="py-4 text-center w-12">GA</th>
                  <th className="py-4 text-center w-12">GD</th>
                  <th className="py-4 text-center w-20">TREND</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialStandings.map((club) => {
                  const isExpanded = expandedRow === club.pos;
                  return (
                    <React.Fragment key={club.pos}>
                      <tr className="hover:bg-slate-50/50 transition-colors relative font-extrabold text-xs text-slate-700">
                        {/* POS */}
                        <td className="py-5 pl-6 text-center relative">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${club.color}`} />
                          <span className="font-extrabold text-sm text-slate-900">{club.pos}</span>
                        </td>

                        {/* CLUB */}
                        <td className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center p-1.5 shadow-sm border border-slate-200 shrink-0">
                              <img
                                src={club.logo}
                                alt={club.name}
                                className="w-full h-full object-contain invert"
                              />
                            </div>
                            <span className="font-extrabold text-slate-900 tracking-wide uppercase text-[13px]">{club.name}</span>
                          </div>
                        </td>

                        {/* PTS */}
                        <td className="py-5 text-center font-black text-slate-900 text-sm">{club.pts}</td>

                        {/* Stats */}
                        <td className="py-5 text-center text-slate-655 font-bold">{club.p}</td>
                        <td className="py-5 text-center text-slate-655 font-bold">{club.w}</td>
                        <td className="py-5 text-center text-slate-655 font-bold">{club.d}</td>
                        <td className="py-5 text-center text-slate-655 font-bold">{club.l}</td>
                        <td className="py-5 text-center text-slate-655 font-bold">{club.gf}</td>
                        <td className="py-5 text-center text-slate-655 font-bold">{club.ga}</td>
                        <td className="py-5 text-center text-slate-655 font-bold">{club.gd}</td>

                        {/* TREND */}
                        <td className="py-5 text-center">
                          <button
                            onClick={() => toggleRow(club.pos)}
                            className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors inline-flex items-center justify-center cursor-pointer"
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Trend Details */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={11} className="bg-slate-50/50 px-8 py-4 text-xs font-bold text-slate-500 animate-fadeIn">
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                              <div>
                                <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Key Academy Prospects</span>
                                <div className="flex flex-wrap gap-2">
                                  {club.players.map((p, idx) => (
                                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-extrabold text-[10px] shadow-sm">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Division Group</span>
                                <span className="text-slate-800 mt-1 block font-black text-xs">UK London Youth League</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <OfficialPartners />
    </main>
  );
}

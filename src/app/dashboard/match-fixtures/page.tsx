"use client";

import React from 'react';
import { Calendar, MapPin, Clock, Trophy, Shield } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function MatchFixturesPage() {
  const fixtures = [
    { id: 1, homeTeam: 'Phoenix XI', awayTeam: 'Apex Strikers', date: 'Saturday, 24 Aug 2026', time: '16:00 IST', venue: 'National Stadium, Pitch 1', round: 'Matchday 5' },
    { id: 2, homeTeam: 'Vanguard FC', awayTeam: 'Phoenix XI', date: 'Sunday, 01 Sep 2026', time: '18:30 IST', venue: 'City Sports Arena', round: 'Matchday 6' },
    { id: 3, homeTeam: 'Phoenix XI', awayTeam: 'Titan Royals', date: 'Saturday, 07 Sep 2026', time: '15:00 IST', venue: 'National Stadium, Pitch 2', round: 'Matchday 7' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center gap-3">
        <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
          <AnimatedIcon name="fixtures" active size={28} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
            League Match Fixtures
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-roboto">
            Official league schedule, stadium venues, kickoff times, and match details.
          </p>
        </div>
      </div>

      {/* Fixtures List */}
      <div className="space-y-4">
        {fixtures.map((fixture) => (
          <div key={fixture.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs hover:border-[#FFB800] transition-all space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <span className="text-xs font-black font-montserrat uppercase tracking-wider text-[#7C5800]">
                {fixture.round}
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <Calendar size={14} className="text-[#FFB800]" />
                <span>{fixture.date}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
              {/* Home */}
              <div className="flex items-center gap-3 w-full md:w-1/3 justify-start">
                <div className="w-10 h-10 rounded-full bg-black text-[#FFB800] font-black flex items-center justify-center text-xs">
                  {fixture.homeTeam.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-extrabold font-montserrat text-sm md:text-base text-[#1A1C1C]">
                  {fixture.homeTeam}
                </span>
              </div>

              {/* VS Pill */}
              <div className="px-4 py-1.5 bg-[#1A1C1C] text-[#FFB800] rounded-full text-xs font-black font-montserrat tracking-wider shadow-xs">
                VS
              </div>

              {/* Away */}
              <div className="flex items-center gap-3 w-full md:w-1/3 justify-end">
                <span className="font-extrabold font-montserrat text-sm md:text-base text-[#1A1C1C] text-right">
                  {fixture.awayTeam}
                </span>
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-black flex items-center justify-center text-xs">
                  {fixture.awayTeam.substring(0, 2).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E5E7EB] text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#7C5800]" />
                <span>{fixture.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#7C5800]" />
                <span>{fixture.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

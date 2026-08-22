"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Trophy, Shield, Activity } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

interface DashboardFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  pitch: string;
  round: string;
  status: 'SCHEDULED' | 'LIVE' | 'FULL_TIME' | 'POSTPONED';
  homeScore?: number | null;
  awayScore?: number | null;
  minute?: number | null;
}

const DEFAULT_FIXTURES: DashboardFixture[] = [
  { id: '1', homeTeam: 'Riverside FC', awayTeam: 'Camden Rovers', date: 'Tuesday, 25 Aug 2026', time: '14:30', venue: 'Riverside Community Stadium', pitch: 'Main Pitch', round: 'Matchday 14', status: 'LIVE', homeScore: 3, awayScore: 1, minute: 74 },
  { id: '2', homeTeam: 'Ashford Town', awayTeam: 'Highfield United', date: 'Tuesday, 25 Aug 2026', time: '17:00', venue: 'Ashford Sports Complex', pitch: 'Pitch 2', round: 'Matchday 14', status: 'SCHEDULED' },
  { id: '3', homeTeam: 'Oldbridge FC', awayTeam: 'Sutton Wanderers', date: 'Thursday, 20 Aug 2026', time: '15:00', venue: 'Oldbridge Arena', pitch: 'Pitch A', round: 'Matchday 13', status: 'FULL_TIME', homeScore: 3, awayScore: 0, minute: 90 },
];

export default function MatchFixturesPage() {
  const [fixtures, setFixtures] = useState<DashboardFixture[]>(DEFAULT_FIXTURES);

  useEffect(() => {
    async function loadLiveFixtures() {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiBaseUrl}/api/fixtures`);
        if (res.ok) {
          const data = await res.json();
          if (data.fixtures && Array.isArray(data.fixtures) && data.fixtures.length > 0) {
            const clubNameMap: Record<string, string> = {
              "club-1": "Riverside FC",
              "club-2": "Camden Rovers",
              "club-3": "Ashford Town",
              "club-4": "Highfield United",
              "club-5": "Oldbridge FC",
              "club-6": "Sutton Wanderers",
            };

            const mapped: DashboardFixture[] = data.fixtures.map((f: any) => {
              const hName = clubNameMap[f.homeClubId] || f.homeClubId || "Home Team";
              const aName = clubNameMap[f.awayClubId] || f.awayClubId || "Away Team";
              const dateObj = new Date(f.kickoff);
              const dateStr = dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
              const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

              return {
                id: f.id,
                homeTeam: hName,
                awayTeam: aName,
                date: dateStr,
                time: timeStr,
                venue: f.venue || "TPL Stadium",
                pitch: f.pitch || "Pitch 1",
                round: "Official Matchday",
                status: f.status,
                homeScore: f.homeScore,
                awayScore: f.awayScore,
                minute: f.minute,
              };
            });

            setFixtures(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load live dashboard fixtures:", err);
      }
    }
    loadLiveFixtures();
  }, []);

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
            Official league schedule, stadium venues, kickoff times, and live match scores.
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
              <div className="flex items-center gap-3">
                {fixture.status === 'LIVE' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black font-montserrat uppercase bg-rose-50 text-rose-600 border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                    LIVE {fixture.minute}&apos;
                  </span>
                )}
                {fixture.status === 'FULL_TIME' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black font-montserrat uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Full Time
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <Calendar size={14} className="text-[#FFB800]" />
                  <span>{fixture.date}</span>
                </div>
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

              {/* Score / VS Pill */}
              {fixture.status === 'LIVE' || fixture.status === 'FULL_TIME' ? (
                <div className="px-5 py-2 bg-[#1A1C1C] text-[#FFB800] rounded-xl text-base font-black font-montserrat tracking-widest shadow-xs">
                  {fixture.homeScore ?? 0} &mdash; {fixture.awayScore ?? 0}
                </div>
              ) : (
                <div className="px-4 py-1.5 bg-[#1A1C1C] text-[#FFB800] rounded-full text-xs font-black font-montserrat tracking-wider shadow-xs">
                  VS
                </div>
              )}

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
                <span>{fixture.venue} ({fixture.pitch})</span>
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


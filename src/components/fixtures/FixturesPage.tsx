"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown, Calendar, Search, RotateCcw, MapPin, Award } from "lucide-react";
import OfficialPartners from "@/components/home/OfficialPartners";

// TYPES FOR THE FIXTURE ARCHITECTURE
type Team = {
  name: string;
  short: string;
  logo: string;
};

type Fixture = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: "TPL Championship" | "TPL Cup";
  season: string;
  matchweek: number;
  date: string;       // format: "YYYY-MM-DD"
  dayName: string;    // e.g. "SATURDAY"
  dayText: string;    // e.g. "15 AUGUST"
  time: string;
  status: "UPCOMING" | "LIVE" | "FT" | "POSTPONED" | "CANCELLED";
  minute?: number;    // Only applicable if status is "LIVE"
  homeScore?: number; // Only applicable if status is "LIVE" or "FT"
  awayScore?: number; // Only applicable if status is "LIVE" or "FT"
  stadium: string;
};

// TEMPORARY FRONTEND DATA
// Replace with fixtures API once backend is implemented.
// FUTURE API DETAILS:
// GET /api/fixtures?competition={comp}&season={season}&matchweek={mw}&status={status}
const mockFixtures: Fixture[] = [
  // MATCHWEEK 1
  {
    id: "match-101",
    homeTeam: { name: "LONDON UNITED", short: "LUN", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "CHELSEA FOUNDATION", short: "CHE", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Championship",
    season: "2026/2027",
    matchweek: 1,
    date: "2026-08-13",
    dayName: "THURSDAY",
    dayText: "13 AUGUST 2026",
    time: "21:45",
    status: "FT",
    homeScore: 2,
    awayScore: 1,
    stadium: "Bexley Stadium"
  },
  {
    id: "match-102",
    homeTeam: { name: "MANCHESTER ELITE", short: "MAN", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "BIRMINGHAM CITY", short: "BIR", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Championship",
    season: "2026/2027",
    matchweek: 1,
    date: "2026-08-13",
    dayName: "THURSDAY",
    dayText: "13 AUGUST 2026",
    time: "23:30",
    status: "FT",
    homeScore: 0,
    awayScore: 3,
    stadium: "Elite Youth Complex"
  },
  {
    id: "match-103",
    homeTeam: { name: "ARSENAL ACADEMY", short: "ARS", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "WEST HAM UNITED", short: "WHU", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Cup",
    season: "2026/2027",
    matchweek: 1,
    date: "2026-08-14",
    dayName: "FRIDAY",
    dayText: "14 AUGUST 2026",
    time: "18:00",
    status: "LIVE",
    minute: 67,
    homeScore: 1,
    awayScore: 0,
    stadium: "Hale End"
  },
  {
    id: "match-104",
    homeTeam: { name: "LIVERPOOL ACADEMY", short: "LIV", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "LEEDS ACADEMY", short: "LEE", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Championship",
    season: "2026/2027",
    matchweek: 1,
    date: "2026-08-14",
    dayName: "FRIDAY",
    dayText: "14 AUGUST 2026",
    time: "22:20",
    status: "UPCOMING",
    stadium: "Kirkby Academy"
  },
  {
    id: "match-105",
    homeTeam: { name: "TOTTENHAM HOTSPUR", short: "TOT", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "ASTON VILLA", short: "AVL", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Championship",
    season: "2026/2027",
    matchweek: 1,
    date: "2026-08-15",
    dayName: "SATURDAY",
    dayText: "15 AUGUST 2026",
    time: "21:00",
    status: "UPCOMING",
    stadium: "Hotspur Way"
  },
  // MATCHWEEK 2
  {
    id: "match-201",
    homeTeam: { name: "NEWCASTLE UNITED", short: "NEW", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "LONDON UNITED", short: "LUN", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Championship",
    season: "2026/2027",
    matchweek: 2,
    date: "2026-08-20",
    dayName: "THURSDAY",
    dayText: "20 AUGUST 2026",
    time: "20:00",
    status: "UPCOMING",
    stadium: "Darsley Park"
  },
  {
    id: "match-202",
    homeTeam: { name: "EVERTON YOUTH", short: "EVE", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "FULHAM ACADEMY", short: "FUL", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Championship",
    season: "2026/2027",
    matchweek: 2,
    date: "2026-08-21",
    dayName: "FRIDAY",
    dayText: "21 AUGUST 2026",
    time: "18:30",
    status: "POSTPONED",
    stadium: "Halewood"
  },
  {
    id: "match-203",
    homeTeam: { name: "SOUTHAMPTON YOUTH", short: "SOU", logo: "/images/TPL_logo_White.png" },
    awayTeam: { name: "LEICESTER CITY", short: "LEI", logo: "/images/TPL_logo_White.png" },
    competition: "TPL Cup",
    season: "2026/2027",
    matchweek: 2,
    date: "2026-08-22",
    dayName: "SATURDAY",
    dayText: "22 AUGUST 2026",
    time: "21:30",
    status: "UPCOMING",
    stadium: "Staplewood Academy"
  }
];

export default function FixturesPage() {
  const [competition, setCompetition] = useState("All");
  const [season, setSeason] = useState("2026/2027");
  const [matchweek, setMatchweek] = useState<number>(1);
  const [statusTab, setStatusTab] = useState<"ALL" | "LIVE" | "UPCOMING" | "RESULTS">("ALL");
  const [fixturesList, setFixturesList] = useState<Fixture[]>(mockFixtures);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

            const mapped: Fixture[] = data.fixtures.map((f: any) => {
              const hName = clubNameMap[f.homeClubId] || f.homeClubId || "Home Team";
              const aName = clubNameMap[f.awayClubId] || f.awayClubId || "Away Team";
              const dateObj = new Date(f.kickoff);
              const dateStr = dateObj.toISOString().split("T")[0];
              const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
              const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
              const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

              let status: "UPCOMING" | "LIVE" | "FT" | "POSTPONED" | "CANCELLED" = "UPCOMING";
              if (f.status === "LIVE") status = "LIVE";
              else if (f.status === "FULL_TIME") status = "FT";
              else if (f.status === "POSTPONED") status = "POSTPONED";

              return {
                id: f.id,
                homeTeam: { name: hName.toUpperCase(), short: hName.slice(0, 3).toUpperCase(), logo: "/images/TPL_logo_White.png" },
                awayTeam: { name: aName.toUpperCase(), short: aName.slice(0, 3).toUpperCase(), logo: "/images/TPL_logo_White.png" },
                competition: "TPL Championship",
                season: "2026/2027",
                matchweek: 1,
                date: dateStr,
                dayName: dayNames[dateObj.getDay()] || "SATURDAY",
                dayText: `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`,
                time: timeStr,
                status,
                minute: f.minute ?? undefined,
                homeScore: f.homeScore ?? undefined,
                awayScore: f.awayScore ?? undefined,
                stadium: f.venue || "TPL Stadium",
              };
            });

            setFixturesList(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load live fixtures:", err);
      }
    }
    loadLiveFixtures();
  }, []);

  // Simulate loading state transitions on matchweek change for polished UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [matchweek, competition, statusTab, season]);

  // FUTURE BACKEND INTEGRATION:
  // These filter states will eventually be passed to the API query parameters.
  // const { data } = useFixturesQuery({ competition, season, matchweek, statusTab });
  
  // FRONTEND FILTERING LOGIC
  const filteredFixtures = fixturesList.filter((fixture) => {
    const matchesCompetition = competition === "All" || fixture.competition === competition;
    const matchesSeason = fixture.season === season;
    const matchesMatchweek = fixture.matchweek === matchweek;
    
    let matchesStatus = true;
    if (statusTab === "LIVE") matchesStatus = fixture.status === "LIVE";
    else if (statusTab === "UPCOMING") matchesStatus = fixture.status === "UPCOMING" || fixture.status === "POSTPONED";
    else if (statusTab === "RESULTS") matchesStatus = fixture.status === "FT";

    return matchesCompetition && matchesSeason && matchesMatchweek && matchesStatus;
  });

  // Group filtered fixtures by date
  const groupedFixtures = filteredFixtures.reduce<Record<string, Fixture[]>>((acc, fixture) => {
    const key = `${fixture.dayName}, ${fixture.dayText}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fixture);
    return acc;
  }, {});

  const handleResetFilters = () => {
    setCompetition("All");
    setSeason("2026/2027");
    setMatchweek(1);
    setStatusTab("ALL");
  };

  const totalMatchweeks = 38; // standard league structure

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Hero Header Area */}
      <section className="bg-gradient-to-b from-[#0b1016] to-[#121b26] text-white py-16 px-4 md:px-12 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('/images/stadium-bg.png')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10 space-y-4">
          <span className="text-amber-500 text-xs font-black uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            League Matches
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Fixtures & Results
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
            Keep track of live match timelines, full-time results, and complete round schedules for the Talent Pro League.
          </p>
        </div>
      </section>

      {/* Interactive Controls & Filters */}
      <section className="max-w-[1200px] mx-auto px-4 mt-8">
        
        {/* Dropdown Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-wrap items-center gap-4">
          
          <div className="flex flex-col space-y-1.5 flex-1 min-w-[200px]">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Competition</span>
            <div className="relative">
              <select
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all"
              >
                <option value="All">All Competitions</option>
                <option value="TPL Championship">TPL Championship</option>
                <option value="TPL Cup">TPL Cup</option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5 min-w-[150px]">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season</span>
            <div className="relative">
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none appearance-none cursor-pointer transition-all"
              >
                <option value="2026/2027">2026/2027</option>
                <option value="2025/2026">2025/2026</option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-end h-full self-end">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 border border-slate-200 hover:border-slate-355 hover:bg-slate-50 text-slate-655 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm active:scale-95"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live / Status Tabs */}
        <div className="flex border-b border-slate-200 mt-8 gap-6 overflow-x-auto no-scrollbar">
          {(["ALL", "LIVE", "UPCOMING", "RESULTS"] as const).map((tab) => {
            const isActive = statusTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`py-3.5 px-1.5 border-b-2 text-xs font-black tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "border-amber-500 text-slate-900 font-extrabold" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "LIVE" && (
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse" />
                )}
                {tab === "ALL" ? "All Matches" : tab === "LIVE" ? "Live Now" : tab === "UPCOMING" ? "Upcoming" : "Results"}
              </button>
            );
          })}
        </div>

        {/* Matchweek Navigation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mt-6 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setMatchweek((prev) => Math.max(1, prev - 1))}
            disabled={matchweek === 1}
            className="flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 disabled:text-slate-300 disabled:pointer-events-none transition-colors group cursor-pointer"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Prev Matchweek</span>
          </button>

          <div className="text-center">
            <span className="block text-xs font-black text-slate-900 uppercase tracking-widest">
              Matchweek {matchweek}
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-wide mt-0.5 block">
              {matchweek === 1 ? "13 Aug — 19 Aug" : matchweek === 2 ? "20 Aug — 26 Aug" : "Schedule TBA"}
            </span>
          </div>

          <button
            onClick={() => setMatchweek((prev) => Math.min(totalMatchweeks, prev + 1))}
            disabled={matchweek === totalMatchweeks}
            className="flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 disabled:text-slate-300 disabled:pointer-events-none transition-colors group cursor-pointer"
          >
            <span className="hidden sm:inline">Next Matchweek</span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Fixtures Listing */}
        <div className="mt-8 mb-16">
          {isLoading ? (
            // Polish loading skeletons
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-2 animate-pulse">
                  <div className="h-8 bg-slate-200 rounded-lg w-1/4" />
                  <div className="h-[70px] bg-white border border-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredFixtures.length === 0 ? (
            // Custom high-fidelity empty state
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm max-w-lg mx-auto mt-6">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">No fixtures found</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                We couldn't find any match records matching your active filters. Try changing your matchweek selection or resetting active competition choices.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 bg-slate-900 hover:bg-black text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            // Grouped Fixtures Stack
            <div className="space-y-8">
              {Object.entries(groupedFixtures).map(([dateLabel, fixtures]) => (
                <div key={dateLabel} className="space-y-3">
                  
                  {/* Date Heading Group Header */}
                  <div className="bg-white border border-slate-200 px-5 py-3.5 rounded-2xl shadow-sm border-l-4 border-l-amber-500">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                      {dateLabel}
                    </span>
                  </div>

                  {/* Fixtures Row Stack */}
                  <div className="space-y-2">
                    {fixtures.map((fixture) => (
                      <Link
                        key={fixture.id}
                        href={`/match/8abecee6bd2a4266915f18e6098741cf/${fixture.id}`}
                        className="block bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:border-amber-500/50 hover:shadow-md hover:scale-[1.002] transition-all p-4 md:px-8 py-4 group relative overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          
                          {/* Left: Competition & Round Details */}
                          <div className="flex items-center gap-2.5 shrink-0 md:w-[220px]">
                            <Award className="w-4 h-4 text-slate-400 shrink-0" />
                            <div className="text-left">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                {fixture.competition}
                              </span>
                              <span className="text-xs font-bold text-slate-700 mt-0.5 block">
                                Matchweek {fixture.matchweek}
                              </span>
                            </div>
                          </div>

                          {/* Center: Matchup Core (Home - Time/Score - Away) */}
                          <div className="flex-1 flex items-center justify-between max-w-2xl mx-auto w-full px-2">
                            
                            {/* Home Team */}
                            <div className="flex-1 flex items-center justify-end gap-3 text-right">
                              <span className="text-xs md:text-sm font-black text-slate-800 tracking-tight group-hover:text-amber-500 transition-colors uppercase">
                                {fixture.homeTeam.name}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 border border-slate-200 shadow-sm shrink-0">
                                <img src={fixture.homeTeam.logo} alt={fixture.homeTeam.name} className="w-full h-full object-contain" />
                              </div>
                            </div>

                            {/* Status and Score/Time Box */}
                            <div className="mx-4 md:mx-6 shrink-0 flex flex-col items-center justify-center min-w-[90px]">
                              {fixture.status === "LIVE" ? (
                                <div className="flex flex-col items-center">
                                  <span className="bg-rose-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                                    LIVE {fixture.minute}'
                                  </span>
                                  <span className="text-sm font-black text-slate-850 tracking-wide mt-1 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                                    {fixture.homeScore} - {fixture.awayScore}
                                  </span>
                                </div>
                              ) : fixture.status === "FT" ? (
                                <div className="flex flex-col items-center">
                                  <span className="bg-slate-200 text-slate-600 font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    FT
                                  </span>
                                  <span className="text-sm font-black text-slate-800 tracking-wide mt-1 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                                    {fixture.homeScore} - {fixture.awayScore}
                                  </span>
                                </div>
                              ) : fixture.status === "POSTPONED" ? (
                                <span className="bg-amber-100 text-amber-700 font-black text-[9px] px-3 py-1.5 rounded-lg uppercase tracking-wider border border-amber-200">
                                  Postponed
                                </span>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <span className="bg-slate-100 text-slate-500 font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider border border-slate-200">
                                    {fixture.time}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                    Upcoming
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Away Team */}
                            <div className="flex-1 flex items-center justify-start gap-3 text-left">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 border border-slate-200 shadow-sm shrink-0">
                                <img src={fixture.awayTeam.logo} alt={fixture.awayTeam.name} className="w-full h-full object-contain" />
                              </div>
                              <span className="text-xs md:text-sm font-black text-slate-800 tracking-tight group-hover:text-amber-500 transition-colors uppercase">
                                {fixture.awayTeam.name}
                              </span>
                            </div>

                          </div>

                          {/* Right: Stadium Venue */}
                          <div className="flex items-center gap-1.5 text-slate-400 shrink-0 md:w-[220px] justify-start md:justify-end text-xs font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-slate-350 shrink-0" />
                            <span className="truncate max-w-[180px] md:max-w-none text-slate-500">
                              {fixture.stadium}
                            </span>
                          </div>

                        </div>
                      </Link>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      <OfficialPartners />
    </main>
  );
}

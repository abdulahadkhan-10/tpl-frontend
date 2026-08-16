"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Star,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Scale,
  Download,
  CheckCircle2,
  Plus,
  Trash2,
  User,
  MapPin,
  Flame,
  Calendar,
  Mail,
  Play
} from 'lucide-react';

interface PlayerAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

interface ScoutedPlayer {
  id: string;
  name: string;
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'CM' | 'DM' | 'LW' | 'RW' | 'ST';
  age: number;
  location: string;
  stars: number;
  rating: number;
  height: string;
  strongFoot: 'Right' | 'Left' | 'Ambidextrous';
  attributes: PlayerAttributes;
  image: string;
  scoutReport: string;
  watchlistStatus: 'High Interest' | 'Scouted Twice' | 'Developing';
  region: string;
}

export default function ScoutingPage() {
  const [players, setPlayers] = useState<ScoutedPlayer[]>([
    {
      id: '1',
      name: 'Elhan Davies',
      position: 'CM',
      age: 16,
      location: 'London',
      stars: 4,
      rating: 88,
      height: '178 cm',
      strongFoot: 'Right',
      attributes: { pace: 78, shooting: 75, passing: 88, dribbling: 84, defending: 76, physical: 80 },
      image: '/images/scout_davies.png',
      scoutReport: 'Excellent composure in possession. Operates as a deep playmaker, breaking lines with vision. Physical robustness developing well.',
      watchlistStatus: 'High Interest',
      region: 'London'
    },
    {
      id: '2',
      name: 'Noah Menzah',
      position: 'RW',
      age: 17,
      location: 'Birmingham',
      stars: 4,
      rating: 92,
      height: '175 cm',
      strongFoot: 'Left',
      attributes: { pace: 94, shooting: 85, passing: 82, dribbling: 91, defending: 35, physical: 68 },
      image: '/images/scout_menzah.png',
      scoutReport: 'Elite explosive acceleration. Dribbles past fullbacks with high body fluidity. Lethal cut-in and shooting ability from the right flank.',
      watchlistStatus: 'Scouted Twice',
      region: 'West Midlands'
    },
    {
      id: '3',
      name: 'Lucas Martin',
      position: 'CB',
      age: 16,
      location: 'Manchester',
      stars: 4,
      rating: 86,
      height: '188 cm',
      strongFoot: 'Right',
      attributes: { pace: 74, shooting: 40, passing: 68, dribbling: 65, defending: 88, physical: 84 },
      image: '/images/scout_martin.png',
      scoutReport: 'Commanding aerial dominance. Vocal in organising defensive lines. Excellent positional reading and slide tackling block timing.',
      watchlistStatus: 'Developing',
      region: 'Greater Manchester'
    },
    {
      id: '4',
      name: 'Jayden Clarke',
      position: 'ST',
      age: 17,
      location: 'Leeds',
      stars: 4,
      rating: 90,
      height: '184 cm',
      strongFoot: 'Right',
      attributes: { pace: 85, shooting: 91, passing: 72, dribbling: 83, defending: 30, physical: 82 },
      image: '/images/scout_clarke.png',
      scoutReport: 'Clinical finisher. Strong hold-up capabilities back-to-goal. High-IQ off-the-ball runs to drag opposing centre backs out of position.',
      watchlistStatus: 'High Interest',
      region: 'Yorkshire & Humber'
    },
    {
      id: '5',
      name: 'Oliver Smith',
      position: 'GK',
      age: 15,
      location: 'Bristol',
      stars: 4,
      rating: 84,
      height: '186 cm',
      strongFoot: 'Right',
      attributes: { pace: 50, shooting: 84, passing: 78, dribbling: 86, defending: 82, physical: 72 },
      image: '/images/scout_smith.png',
      scoutReport: 'Excellent reflexes on line-shots. Active sweeper keeper tendencies. Shows exceptional distribution throwing and long-kicking.',
      watchlistStatus: 'Developing',
      region: 'South West'
    }
  ]);

  const [watchlistIds, setWatchlistIds] = useState<string[]>(['1', '4']);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<ScoutedPlayer | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [showAddReport, setShowAddReport] = useState(false);
  const [reportPdfDownloaded, setReportPdfDownloaded] = useState(false);
  const [newPlayerAddedNotice, setNewPlayerAddedNotice] = useState(false);

  const [trialStatusMap, setTrialStatusMap] = useState<Record<string, 'sent' | 'idle'>>({});
  const [videoRequestedMap, setVideoRequestedMap] = useState<Record<string, 'requested' | 'idle'>>({});
  const [directorEmailText, setDirectorEmailText] = useState('Hi Director, we are highly interested in this player profile and would like to schedule an interview or trials review.');
  const [directorEmailSentMap, setDirectorEmailSentMap] = useState<Record<string, boolean>>({});
  const [showEmailFormMap, setShowEmailFormMap] = useState<Record<string, boolean>>({});

  const [filterPosition, setFilterPosition] = useState('All');
  const [minStars, setMinStars] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion] = useState('London');
  const [sortBy, setSortBy] = useState<'rating' | 'age' | 'name'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: 'CM' as any,
    age: 16,
    location: '',
    stars: 4,
    rating: 80,
    height: '180 cm',
    strongFoot: 'Right' as any,
    scoutReport: '',
    watchlistStatus: 'Developing' as any,
    attributes: { pace: 80, shooting: 70, passing: 75, dribbling: 75, defending: 70, physical: 75 },
    region: 'London'
  });

  const positions = ['All', 'GK', 'CB', 'LB', 'RB', 'CM', 'DM', 'LW', 'RW', 'ST'];
  const starOptions = [0, 3, 4, 5];

  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  const toggleWatchlist = (id: string) => {
    if (watchlistIds.includes(id)) {
      setWatchlistIds(prev => prev.filter(wId => wId !== id));
    } else {
      setWatchlistIds(prev => [...prev, id]);
    }
  };

  const handleCompareCheckbox = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(prev => prev.filter(cId => cId !== id));
    } else {
      if (compareIds.length >= 2) {
        alert('You can select a maximum of 2 players for side-by-side comparison.');
        return;
      }
      setCompareIds(prev => [...prev, id]);
    }
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.location) return;

    const added: ScoutedPlayer = {
      ...newPlayer,
      id: (players.length + 1).toString(),
      image: ''
    };

    setPlayers(prev => [added, ...prev]);
    setNewPlayer({
      name: '',
      position: 'CM',
      age: 16,
      location: '',
      stars: 4,
      rating: 80,
      height: '180 cm',
      strongFoot: 'Right',
      scoutReport: '',
      watchlistStatus: 'Developing',
      attributes: { pace: 80, shooting: 70, passing: 75, dribbling: 75, defending: 70, physical: 75 },
      region: 'London'
    });
    setShowAddReport(false);
    setNewPlayerAddedNotice(true);
    setTimeout(() => setNewPlayerAddedNotice(false), 4000);
  };

  const handleDownloadPdf = () => {
    setReportPdfDownloaded(true);
    setTimeout(() => setReportPdfDownloaded(false), 3000);
  };

  const filteredPlayers = players.filter(p => {
    const matchesPosition = filterPosition === 'All' || p.position === filterPosition;
    const matchesStars = p.stars >= minStars;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesStars && matchesSearch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    let comp = 0;
    if (sortBy === 'rating') comp = a.rating - b.rating;
    else if (sortBy === 'age') comp = a.age - b.age;
    else if (sortBy === 'name') comp = a.name.localeCompare(b.name);

    return sortOrder === 'desc' ? -comp : comp;
  });

  const watchlistedItems = players.filter(p => watchlistIds.includes(p.id));
  const compareItems = players.filter(p => compareIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-500 tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
              <Eye size={14} />
              TPL Scouting Network
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
              Scouting Hub
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Evaluate player attributes, customize scouting targets, compare youth statistics, and build your watchlists.
            </p>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
              <SlidersHorizontal size={12} /> Position:
            </span>
            {positions.map((pos) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={pos}
                onClick={() => setFilterPosition(pos)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${filterPosition === pos
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {pos}
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/50 w-full sm:w-auto justify-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Stars:</span>
              {starOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setMinStars(s)}
                  className={`flex items-center gap-0.5 px-3 py-1 text-xs font-bold rounded-xl transition-all ${minStars === s
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-650 hover:bg-slate-200/50'
                  }`}
                >
                  {s === 0 ? 'All' : <>{s} <Star size={11} className="fill-current" /></>}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/50 w-full sm:w-auto justify-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-1">
                <ArrowUpDown size={12} /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-700 pr-6"
              >
                <option value="rating">Rating</option>
                <option value="age">Age</option>
                <option value="name">Name</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-2 py-0.5 hover:bg-slate-200 text-slate-650 rounded text-[10px] font-black uppercase"
              >
                {sortOrder}
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search prospects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-2xl text-slate-700 placeholder:text-slate-450 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Players Grid and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main List */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {sortedPlayers.map((player) => {
                  const isWatched = watchlistIds.includes(player.id);
                  const isComparedChecked = compareIds.includes(player.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={springConfig}
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className="group relative flex flex-col justify-between bg-white border border-slate-100 rounded-3xl p-5 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer h-[320px] overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[50%] z-0 overflow-hidden bg-slate-50">
                        {player.image ? (
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-350">
                            <User size={24} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                      </div>
                      
                      <div className="relative z-10 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-650 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200/50 hover:bg-white cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={isComparedChecked}
                            onChange={() => handleCompareCheckbox(player.id)}
                            className="w-3.5 h-3.5 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500/20"
                          />
                          Compare
                        </label>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => toggleWatchlist(player.id)}
                          className={`p-1.5 rounded-lg border transition-colors shadow-sm ${isWatched
                            ? 'bg-amber-50 border-amber-200 text-amber-500'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Eye size={12} className={isWatched ? 'fill-current' : ''} />
                        </motion.button>
                      </div>

                      <div className="relative z-10 mt-auto space-y-3 pt-6">
                        <div>
                          <span className="text-base font-black text-slate-900 leading-tight block truncate w-full">
                            {player.name}
                          </span>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {player.position}
                            </span>
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase">
                              Age {player.age}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
                            <span>Rating</span>
                            <span className="text-indigo-600 font-bold">{player.rating}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${player.rating}%` }} className="h-full bg-indigo-600 rounded-full" />
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {player.location}</span>
                          <div className="flex items-center text-amber-500">
                            {[...Array(player.stars)].map((_, i) => <span key={i}>★</span>)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Active Watchlist */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col h-[380px]">
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-4">
                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <Eye size={16} className="text-indigo-600" />
                  Active Watchlist
                </span>
                <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                  {watchlistedItems.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                <AnimatePresence>
                  {watchlistedItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      onClick={() => setSelectedPlayer(item)}
                      className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200/50 relative">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover object-top" />
                          ) : (
                            <User size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800">{item.name} ({item.position})</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Rating: {item.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => toggleWatchlist(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {watchlistedItems.length === 0 && (
                  <div className="text-center py-16 space-y-2">
                    <Eye className="mx-auto text-slate-300" size={32} />
                    <h4 className="text-xs font-bold text-slate-500 uppercase">Watchlist is Empty</h4>
                    <p className="text-xs text-slate-400">Click the eye icon on player cards to watch them.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
              <span className="text-[10px] font-black text-amber-400 tracking-wider uppercase flex items-center gap-1.5 mb-2">
                <Flame size={12} className="fill-current" />
                Scouting Insight
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                You can select up to **2 players** using the checkboxes on their cards and compare their attributes side-by-side!
              </p>
            </div>
          </div>
        </div>

        {/* COMPARISON BAR DRAWER */}
        <AnimatePresence>
          {compareIds.length > 0 && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 text-white px-6 py-4 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center gap-4 z-40 w-[90%] max-w-[650px] justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-900/50 text-indigo-300 rounded-2xl">
                  <Scale size={18} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase">Compare Selection ({compareIds.length}/2)</span>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    {compareItems.map(p => p.name).join(' vs ') || 'Select another player to compare'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCompareIds([])}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-2xl transition-colors"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsComparing(true)}
                  disabled={compareIds.length < 2}
                  className={`px-5 py-2 font-bold rounded-2xl text-xs transition-colors shadow-md ${compareIds.length === 2
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Compare
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PLAYER DETAILS MODAL */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
            >
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={springConfig}
                className="bg-white border border-slate-100 rounded-3xl w-full max-w-[550px] shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh]"
              >
                <div className="bg-slate-950 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center shrink-0 border border-white/10 relative">
                      {selectedPlayer.image ? (
                        <Image src={selectedPlayer.image} alt={selectedPlayer.name} fill className="object-cover object-top" />
                      ) : (
                        <User size={22} className="text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                        Scout Profile
                      </span>
                      <h3 className="text-sm font-black text-white uppercase mt-1 leading-none">
                        {selectedPlayer.name}
                      </h3>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedPlayer(null); setReportPdfDownloaded(false); }} className="p-1 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-700">
                  <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center text-xs font-bold">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 block uppercase text-[10px]">Pos / Age</span>
                      <span className="text-slate-800 uppercase">{selectedPlayer.position} • {selectedPlayer.age} Yrs</span>
                    </div>
                    <div className="space-y-0.5 border-x border-slate-200">
                      <span className="text-slate-400 block uppercase text-[10px]">Height</span>
                      <span className="text-slate-800">{selectedPlayer.height}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400 block uppercase text-[10px]">Strong Foot</span>
                      <span className="text-slate-800">{selectedPlayer.strongFoot}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-black text-slate-800 tracking-wider uppercase block border-b border-slate-100 pb-2">
                      Performance Attributes
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {Object.entries(selectedPlayer.attributes).map(([attr, val]) => (
                        <div key={attr} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                            <span>{attr}</span>
                            <span className="text-indigo-600">{val}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden relative group">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${val}%` }} 
                              transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.1 }}
                              className="h-full bg-indigo-600 rounded-full group-hover:bg-amber-500 transition-colors" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-100/60">
                     <span className="text-xs font-black text-slate-800 tracking-wider uppercase block border-b border-slate-100 pb-2">
                      Lead Scout Observations
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold italic">
                      "{selectedPlayer.scoutReport}"
                    </p>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100/60">
                    <span className="text-xs font-black text-slate-800 tracking-wider uppercase block border-b border-slate-100 pb-2">
                      Scouting Actions
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {trialStatusMap[selectedPlayer.id] === 'sent' ? (
                        <div className="flex-1 min-w-[120px] bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl text-center flex flex-col items-center justify-center font-bold text-xs">
                          <span>✓ Trial Invited</span>
                          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Next Tuesday, 10:00 AM</span>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTrialStatusMap(prev => ({ ...prev, [selectedPlayer.id]: 'sent' }))}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-xl transition-colors shadow-sm"
                        >
                          <Calendar size={14} /> Invite to Trial
                        </motion.button>
                      )}

                      {videoRequestedMap[selectedPlayer.id] === 'requested' ? (
                        <div className="flex-1 min-w-[120px] bg-indigo-50 border border-indigo-100 text-indigo-800 p-3 rounded-xl text-center flex flex-col items-center justify-center font-bold text-xs">
                          <span>✓ Video Requested</span>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setVideoRequestedMap(prev => ({ ...prev, [selectedPlayer.id]: 'requested' }))}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase rounded-xl transition-colors"
                        >
                          <Play size={14} /> Request Video
                        </motion.button>
                      )}

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const id = selectedPlayer.id;
                          setShowEmailFormMap(prev => ({ ...prev, [id]: !prev[id] }));
                          setDirectorEmailSentMap(prev => ({ ...prev, [id]: false }));
                        }}
                        className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 border font-bold text-xs uppercase rounded-xl transition-colors ${showEmailFormMap[selectedPlayer.id]
                          ? 'bg-rose-50 border-rose-100 text-rose-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Mail size={14} /> Contact Director
                      </motion.button>
                    </div>

                    {showEmailFormMap[selectedPlayer.id] && (
                      <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 mt-3 shadow-inner">
                        {directorEmailSentMap[selectedPlayer.id] ? (
                          <div className="text-center py-4 space-y-2">
                            <CheckCircle2 size={24} className="text-emerald-500 mx-auto" />
                            <span className="text-xs font-black text-slate-800 uppercase block">Email Sent!</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex flex-col space-y-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase">To: Youth Director</span>
                              <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50">
                                director.{selectedPlayer.location.toLowerCase()}@tpl-academy.co.uk
                              </span>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase">Message</span>
                              <textarea
                                rows={3}
                                value={directorEmailText}
                                onChange={(e) => setDirectorEmailText(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                              />
                            </div>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                const id = selectedPlayer.id;
                                setDirectorEmailSentMap(prev => ({ ...prev, [id]: true }));
                                setTimeout(() => setShowEmailFormMap(prev => ({ ...prev, [id]: false })), 2000);
                              }}
                              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-xl transition-colors shadow-sm"
                            >
                              Send Message
                            </motion.button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {reportPdfDownloaded && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
                      <CheckCircle2 size={16} />
                      <div className="flex flex-col leading-snug">
                        <span className="font-bold">Scouting PDF Generated!</span>
                        <span className="text-[10px] text-emerald-600">Report details saved.</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleWatchlist(selectedPlayer.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors ${watchlistIds.includes(selectedPlayer.id)
                      ? 'bg-amber-50 border-amber-250 text-amber-600'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {watchlistIds.includes(selectedPlayer.id) ? '✓ Watching' : 'Watch Player'}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadPdf}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    <Download size={14} /> Download Report
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPARISON MODAL DIALOG */}
        <AnimatePresence>
          {isComparing && compareItems.length === 2 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-100 rounded-3xl w-full max-w-[650px] shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh]"
              >
                <div className="bg-indigo-955 p-6 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Scale size={20} className="text-amber-400" />
                    <div>
                      <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                        Tactical Analysis
                      </span>
                      <h3 className="text-sm font-black text-white uppercase mt-1 leading-none">
                        Player Comparison
                      </h3>
                    </div>
                  </div>
                  <button onClick={() => setIsComparing(false)} className="p-1 rounded-lg text-slate-400 hover:bg-indigo-900 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-700">
                  <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-black text-slate-800 uppercase truncate max-w-full">
                        {compareItems[0].name}
                      </span>
                      <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                        {compareItems[0].position}
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        VS
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs font-black text-slate-800 uppercase truncate max-w-full">
                        {compareItems[1].name}
                      </span>
                      <span className="text-[9px] font-black text-indigo-650 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                        {compareItems[1].position}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-slate-100 pb-3 text-slate-500">
                      <span>{compareItems[0].age} Yrs</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Age</span>
                      <span>{compareItems[1].age} Yrs</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-slate-100 pb-3 text-slate-500">
                      <span>{compareItems[0].height}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Height</span>
                      <span>{compareItems[1].height}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-slate-100 pb-3 text-slate-500">
                      <span>{compareItems[0].strongFoot}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Foot</span>
                      <span>{compareItems[1].strongFoot}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-slate-100 pb-3 text-slate-750">
                      <span className="text-indigo-600 font-black">{compareItems[0].rating}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Overall Rating</span>
                      <span className="text-indigo-600 font-black">{compareItems[1].rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <span className="text-xs font-black text-slate-800 tracking-wider uppercase block border-b border-slate-100 pb-2">
                      Core Attributes
                    </span>

                    <div className="space-y-4">
                      {Object.keys(compareItems[0].attributes).map((key) => {
                        const attr = key as keyof PlayerAttributes;
                        const val0 = compareItems[0].attributes[attr];
                        const val1 = compareItems[1].attributes[attr];

                        return (
                          <div key={attr} className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400 px-1">
                              <span className={val0 >= val1 ? 'text-indigo-600 font-black' : ''}>{val0}</span>
                              <span className="text-slate-505 font-bold">{attr}</span>
                              <span className={val1 >= val0 ? 'text-indigo-600 font-black' : ''}>{val1}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden rotate-180">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${val0}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                              <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${val1}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsComparing(false)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Close Comparison
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  MessageSquare, 
  Send, 
  Heart, 
  Share2, 
  Volume2, 
  Settings, 
  Maximize2, 
  Play,
  Calendar,
  Flame
} from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
  badge?: string;
  badgeColor?: string;
}

export default function LiveStreamingPage() {
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [quality, setQuality] = useState('1080p');
  const [chatMessage, setChatMessage] = useState('');
  
  const [chatList, setChatList] = useState<ChatMessage[]>([
    { id: '1', user: 'Scout_Alpha', message: 'Leeds CM #8 is covering immense ground today.', time: '12:01', badge: 'Scout', badgeColor: 'bg-indigo-650 text-white border-indigo-500' },
    { id: '2', user: 'Coach_Dan', message: 'Tactical shifting by London Colts is really paying off.', time: '12:02', badge: 'Coach', badgeColor: 'bg-emerald-650 text-white border-emerald-500' },
    { id: '3', user: 'TPL_Fan_99', message: 'What a strike! Almost had it in the top corner!', time: '12:03' },
    { id: '4', user: 'ProAnalyst', message: 'Possession stats are 54% - 46% right now.', time: '12:04', badge: 'Analyst', badgeColor: 'bg-amber-600 text-white' },
    { id: '5', user: 'Junior_Scout', message: 'Agree, Davies (CM) rating is easily 8.5+ this game.', time: '12:04' },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  useEffect(() => {
    const mockMessages = [
      { user: 'SunderColt', message: 'Is Leeds #10 on the watch list? Incredible dribbling.', badge: '', badgeColor: '' },
      { user: 'Scout_Alpha', message: 'Yes, scouted twice last month. Rating is currently 88.', badge: 'Scout', badgeColor: 'bg-indigo-650 text-white border-indigo-500' },
      { user: 'SoccerMom_TPL', message: 'Go Leeds! Amazing support from the stands.', badge: '', badgeColor: '' },
      { user: 'TacticalEye', message: 'London Colts change formation to 4-3-3 now.', badge: 'Analyst', badgeColor: 'bg-amber-600 text-white' },
      { user: 'RedDevilsTPL', message: 'Match is intense! 12 mins left of full time.', badge: '', badgeColor: '' }
    ];

    const interval = setInterval(() => {
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setChatList(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          user: randomMsg.user,
          message: randomMsg.message,
          time: timeStr,
          badge: randomMsg.badge || undefined,
          badgeColor: randomMsg.badgeColor || undefined
        }
      ]);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You (Admin)',
      message: chatMessage,
      time: timeStr,
      badge: 'Admin',
      badgeColor: 'bg-rose-600 text-white border-rose-500'
    };

    setChatList(prev => [...prev, newMsg]);
    setChatMessage('');
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const upcomingMatches = [
    { id: 'u1', title: 'Southampton Storm vs Leeds Academy', time: 'Tomorrow, 14:00', league: 'U18 Premier', desc: 'Top of the table clash.' },
    { id: 'u2', title: 'TPL Weekly Scouting Review', time: 'Friday, 16:30', league: 'Scout Broadcast', desc: 'Analysis of top defensive prospects.' },
    { id: 'u3', title: 'Birmingham Juniors vs London Colts', time: 'Sunday, 11:00', league: 'U16 Premier Trophy', desc: 'Quarterfinal second leg.' }
  ];

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
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              TPL Live Broadcast Network
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
              Live Streaming
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Watch live league fixtures, training drills, scout showcases, and interact with the TPL community.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Stream Player */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video rounded-[32px] overflow-hidden bg-slate-950 border border-slate-900 shadow-lg group">
              {isPlaying ? (
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-600 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Live
                      </span>
                      <span className="bg-black/40 backdrop-blur-md text-white/95 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-sm">
                        <Eye size={12} />
                        1,842 Viewers
                      </span>
                    </div>
                    
                    <span className="bg-indigo-600 text-white font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      U18 Premier Division
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-3xl px-6 py-3 flex items-center gap-5 text-white shadow-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase">LEE</span>
                        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold shadow-sm">L</div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/5">
                        <span className="text-base font-black tracking-widest text-amber-400">2</span>
                        <span className="text-xs font-bold text-slate-500">:</span>
                        <span className="text-base font-black tracking-widest">1</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-sm">C</div>
                        <span className="text-xs font-black uppercase">COL</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 border-l border-slate-800 pl-4">78:42</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 -mx-6 -mb-6 flex items-center justify-between text-white border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsPlaying(false)}
                        className="p-1 hover:text-amber-400 transition-colors"
                      >
                        <Play size={16} className="fill-current rotate-90" />
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <Volume2 size={16} />
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-16 md:w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select 
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="bg-black/60 border border-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg outline-none"
                      >
                        <option value="1080p">1080p HD</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>

                      <button className="p-1 hover:text-amber-400 transition-colors">
                        <Settings size={15} />
                      </button>
                      <button className="p-1 hover:text-amber-400 transition-colors">
                        <Maximize2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white p-4">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-indigo-650 flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg text-white"
                  >
                    <Play size={28} className="fill-current ml-1" />
                  </motion.button>
                  <span className="text-xs font-semibold text-slate-500 mt-4">Stream Paused. Click play to resume.</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 to-slate-950/40 pointer-events-none" />
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-950 pointer-events-none" />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/50 pb-4 gap-3">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Matchday 8
                  </span>
                  <h2 className="text-lg font-black text-slate-900 uppercase mt-2">
                    Leeds Academy vs London Colts FC
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    Broadcasting live from TPL Stadium Pitch 1. Scout commentary active.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                      hasLiked 
                        ? 'bg-rose-50 border-rose-100 text-rose-600' 
                        : 'bg-slate-50 border-slate-100 text-slate-650 hover:bg-slate-100'
                    }`}
                  >
                    <Heart size={14} className={hasLiked ? 'fill-current' : ''} />
                    <span>{likes}</span>
                  </motion.button>

                  <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-650 px-4 py-2 rounded-2xl text-xs font-bold transition-colors">
                    <Share2 size={14} />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Flame size={12} className="text-amber-500 fill-current animate-pulse" />
                  Live Performance Stats
                </span>

                <div className="grid grid-cols-3 gap-4 text-center py-3 bg-slate-50 border border-slate-200/50 rounded-2xl">
                  <div className="space-y-1">
                    <span className="text-lg font-black text-slate-800">14</span>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Shots</p>
                    <span className="text-[10px] font-black text-indigo-650">9</span>
                  </div>
                  <div className="space-y-1 border-x border-slate-200">
                    <span className="text-lg font-black text-indigo-650">54%</span>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Possession</p>
                    <span className="text-[10px] font-black text-amber-500">46%</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-slate-800">4</span>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Fouls</p>
                    <span className="text-[10px] font-black text-amber-500">7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Chat and Schedule */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Chat Box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm h-[400px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-4">
                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <MessageSquare size={16} className="text-indigo-600" />
                  Live Chat
                </span>
                <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar text-xs">
                {chatList.map((chat) => (
                  <div key={chat.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {chat.badge && (
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${chat.badgeColor}`}>
                            {chat.badge}
                          </span>
                        )}
                        <span className="font-bold text-slate-900">{chat.user}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold">{chat.time}</span>
                    </div>
                    <p className="text-slate-650 leading-snug">{chat.message}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendChat} className="flex items-center gap-2 border-t border-slate-200/50 pt-4 mt-4">
                <input 
                  type="text"
                  placeholder="Send a chat message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700"
                />
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors"
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>

            {/* Schedule */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <Calendar size={16} className="text-amber-500" />
                  Upcoming Streams
                </span>
              </div>

              <div className="space-y-3">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {match.league}
                      </span>
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase">
                        {match.time}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">
                      {match.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                      {match.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

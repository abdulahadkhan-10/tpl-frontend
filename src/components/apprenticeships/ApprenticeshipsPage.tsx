"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Award, CheckCircle2, User, Mail, ChevronRight,
  Landmark, Megaphone, TrendingUp, ClipboardList, Target, Briefcase, Video, Play,
  Building, Tv, Users, UserCheck, Star, Trophy, Info
} from 'lucide-react';

interface Apprentice {
  id: string;
  name: string;
  progress: number;
  role: string;
  bio: string;
}

interface ModuleItem {
  name: string;
  desc: string;
  icon: React.ComponentType<any>;
  color: string;
  levels: number[];
}

const CalendarDaysIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const apprentices: Apprentice[] = [
  { id: '1', name: 'DANIEL JOHNSON', progress: 78, role: 'Finance Apprentice', bio: '...' },
  { id: '2', name: 'SOPHIE KHAN', progress: 65, role: 'Marketing Apprentice', bio: '...' },
  { id: '3', name: 'JAYDEN WILLIAMS', progress: 82, role: 'Business Owner Apprentice', bio: '...' },
  { id: '4', name: 'EMILY ROBERTS', progress: 60, role: 'Event Management Apprentice', bio: '...' },
  { id: '5', name: 'AARON PATEL', progress: 71, role: 'Content Creation Apprentice', bio: '...' }
];

const modules: ModuleItem[] = [
  { name: 'FINANCE', desc: 'Budgeting, forecasting, financial reports and money management.', icon: Landmark, color: 'emerald', levels: [67, 45, 80, 50, 60] },
  { name: 'MARKETING', desc: 'Social media, branding, campaigns and digital marketing.', icon: Megaphone, color: 'purple', levels: [58, 82, 75, 60, 72] },
  { name: 'SALES', desc: 'Lead generation, pitching, negotiation and closing deals.', icon: TrendingUp, color: 'sky', levels: [74, 55, 90, 48, 65] },
  { name: 'ADMINISTRATION', desc: 'Office systems, data management, communication and scheduling.', icon: ClipboardList, color: 'orange', levels: [63, 70, 85, 55, 78] },
  { name: 'EVENT MANAGEMENT', desc: 'Event planning, logistics, operations and on-site management.', icon: CalendarDaysIcon, color: 'rose', levels: [70, 60, 65, 80, 68] },
  { name: 'PROJECT MANAGEMENT', desc: 'Planning, execution, teamwork and project delivery.', icon: Target, color: 'teal', levels: [40, 50, 78, 62, 70] },
  { name: 'BUSINESS DEVELOPMENT', desc: 'Market research, partnerships, growth strategies and networking.', icon: Briefcase, color: 'amber', levels: [66, 72, 88, 58, 80] },
  { name: 'CONTENT CREATION', desc: 'Video production, editing, storytelling and content strategy.', icon: Video, color: 'red', levels: [71, 86, 95, 67, 75] }
];

const colorMap: Record<string, { bg: string; text: string; bar: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-500', badge: 'bg-emerald-500 border-emerald-500 text-white' },
  purple: { bg: 'bg-purple-50 text-purple-600 border-purple-100', text: 'text-purple-700', bar: 'bg-purple-500', badge: 'bg-purple-500 border-purple-500 text-white' },
  sky: { bg: 'bg-sky-50 text-sky-600 border-sky-100', text: 'text-sky-700', bar: 'bg-sky-500', badge: 'bg-sky-500 border-sky-500 text-white' },
  orange: { bg: 'bg-orange-50 text-orange-600 border-orange-100', text: 'text-orange-700', bar: 'bg-orange-500', badge: 'bg-orange-500 border-orange-500 text-white' },
  rose: { bg: 'bg-rose-50 text-rose-600 border-rose-100', text: 'text-rose-700', bar: 'bg-rose-500', badge: 'bg-rose-500 border-rose-500 text-white' },
  teal: { bg: 'bg-teal-50 text-teal-600 border-teal-100', text: 'text-teal-700', bar: 'bg-teal-500', badge: 'bg-teal-500 border-teal-500 text-white' },
  amber: { bg: 'bg-amber-50 text-amber-600 border-amber-100', text: 'text-amber-700', bar: 'bg-amber-500', badge: 'bg-amber-500 border-amber-500 text-white' },
  red: { bg: 'bg-red-50 text-red-600 border-red-100', text: 'text-red-700', bar: 'bg-red-500', badge: 'bg-red-500 border-red-500 text-white' }
};

export default function ApprenticeshipsPage() {
  const [activeApprenticeIndex, setActiveApprenticeIndex] = useState(0);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getActiveLevel = (pct: number) => { if (pct < 50) return 1; if (pct < 80) return 2; return 3; };
  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row gap-6 justify-between items-start"
        >
          <div className="flex-1 flex gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none mb-1">Apprenticeships</h1>
              <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Learn. Grow. Succeed.</h2>
              <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                Real skills. Real experience. Real opportunities. Building the future workforce through football, education, and vocational excellence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'INDUSTRY EXPERIENCE', desc: 'Work on real projects and live events', icon: Building, color: 'text-indigo-650', bg: 'bg-indigo-50' },
            { title: 'EXPERT MENTORS', desc: 'Learn from professionals in the industry', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { title: 'YOUR FUTURE', desc: 'Gain skills, confidence and real opportunities', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
            { title: 'REALITY TV EXPOSURE', desc: 'Check their journey on TPL Reality TV', icon: Tv, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={f.title} 
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start gap-4 shadow-[0_2px_15px_rgb(0,0,0,0.02)] hover:shadow-lg hover:border-indigo-100 transition-all cursor-default"
            >
              <div className={`p-3 ${f.bg} ${f.color} rounded-2xl shrink-0`}>
                <f.icon size={20} />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase leading-tight">{f.title}</h3>
                <p className="text-[11px] text-slate-450 font-bold mt-1 leading-snug">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Apprentices List */}
          <div className="lg:col-span-4">
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase">Our Apprentices</h2>
              </div>
              <div className="space-y-3">
                {apprentices.map((apprentice, idx) => {
                  const isSelected = activeApprenticeIndex === idx;
                  const ringColors = ['stroke-emerald-500', 'stroke-purple-500', 'stroke-sky-500', 'stroke-orange-500', 'stroke-rose-500'];
                  const ringColor = ringColors[idx] || 'stroke-indigo-600';
                  return (
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      key={apprentice.id} 
                      onClick={() => setActiveApprenticeIndex(idx)} 
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                          : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-slate-200/30 overflow-hidden shrink-0">
                          <User size={18} className={isSelected ? 'text-slate-200' : 'text-slate-500'} />
                        </div>
                        <div>
                          <h3 className={`text-xs font-black uppercase ${isSelected ? 'text-white' : 'text-slate-900'}`}>{apprentice.name}</h3>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{apprentice.role}</span>
                        </div>
                      </div>
                      <div className="relative flex flex-col items-center shrink-0">
                        <div className="relative w-10 h-10">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="20" cy="20" r="16" className="stroke-slate-200/20 fill-none" strokeWidth="3.5" />
                            <circle cx="20" cy="20" r="16" className={`${ringColor} fill-none transition-all duration-500`} strokeWidth="3.5" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={2 * Math.PI * 16 * (1 - apprentice.progress / 100)} />
                          </svg>
                          <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>{apprentice.progress}%</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowApplyModal(true)} 
                className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                Apply for program <ChevronRight size={14} />
              </motion.button>
            </div>
          </div>

          {/* Col 2: Learning Progress */}
          <div className="lg:col-span-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase">Learning Progress</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {modules.map((mod) => {
                  const progressPct = mod.levels[activeApprenticeIndex];
                  const activeLevel = getActiveLevel(progressPct);
                  const colors = colorMap[mod.color];
                  const Icon = mod.icon;
                  return (
                    <motion.div 
                      layout
                      key={mod.name} 
                      className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.01)] hover:shadow-md transition-shadow"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.bg}`}>
                        <Icon size={20} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-black text-slate-900 uppercase truncate">{mod.name}</h3>
                        <p className="text-[10px] text-slate-450 font-bold mt-1 line-clamp-1 leading-snug">{mod.desc}</p>
                      </div>

                      <div className="flex flex-col items-center px-4 border-l border-slate-200/50 shrink-0">
                        <span className="text-[8px] font-black text-slate-400 uppercase mb-1">Level</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map(lvl => (
                            <span key={lvl} className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full border ${lvl <= activeLevel ? colors.badge : 'bg-white border-slate-200 text-slate-500'}`}>{lvl}</span>
                          ))}
                        </div>
                      </div>

                      <div className="w-24 flex flex-col shrink-0">
                        <span className={`text-xs font-black ${colors.text} self-end mb-1`}>{progressPct}%</span>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progressPct}%` }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", damping: 15, stiffness: 50, delay: 0.1 }}
                            className={`h-full ${colors.bar}`} 
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-sm flex items-center justify-around gap-6">
            <div className="flex flex-col items-center text-center">
              <Users size={24} className="text-indigo-600 mb-2" />
              <span className="text-xl font-black text-slate-905">80+</span>
              <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mt-1">Active Apprentices</span>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="flex flex-col items-center text-center">
              <GraduationCap size={24} className="text-emerald-600 mb-2" />
              <span className="text-xl font-black text-slate-905">8</span>
              <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mt-1">Modules</span>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="flex flex-col items-center text-center">
              <UserCheck size={24} className="text-purple-600 mb-2" />
              <span className="text-xl font-black text-slate-905">15+</span>
              <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mt-1">Mentors</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-center space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-amber-400">Ready to start?</h2>
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              Become part of something bigger. Develop vocational skills and build your career in sports.
            </p>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowApplyModal(true)} 
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-xl flex items-center justify-center gap-1 shadow-sm"
            >
              Apply now <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>

        {/* APPLY MODAL */}
        <AnimatePresence>
          {showApplyModal && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl space-y-5 max-w-md w-full relative"
              >
                <button onClick={() => { setShowApplyModal(false); setSubmitted(false); }} className="absolute top-4 right-4 text-slate-450 hover:text-slate-700 text-xs font-black cursor-pointer bg-slate-50 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
                
                <div className="border-b border-slate-200/50 pb-4">
                  <span className="text-[9px] font-black text-indigo-650 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase">TPL Careers Gateway</span>
                  <h3 className="text-sm font-black text-slate-905 uppercase mt-3 leading-tight">Apply for TPL Apprenticeship</h3>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-5 text-center space-y-4 py-8 shadow-inner"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }} 
                      animate={{ scale: 1, rotate: 0 }} 
                      transition={{ delay: 0.2, type: "spring", damping: 12 }}
                      className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-sm"
                    >
                      <CheckCircle2 size={24} />
                    </motion.div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">Application Filed!</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">We have registered your details for the program. Our admissions office will review your profile shortly.</p>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setSubmitted(false); setShowApplyModal(false); }} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase">Close</motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">Apprenticeship Role</label>
                      <select className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all text-slate-700"><option>Event Management Apprentice</option><option>Finance Apprentice</option><option>Marketing Apprentice</option></select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">Full Name</label>
                      <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" required placeholder="e.g. Liam Smith" className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all text-slate-700" /></div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</label>
                      <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="email" required placeholder="e.g. liam@email.com" className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all text-slate-700" /></div>
                    </div>
                    <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md mt-2">Submit Application</motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

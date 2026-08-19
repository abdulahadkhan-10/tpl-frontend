"use client";

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Shield, Star, Eye, Calendar, Activity, Download } from 'lucide-react';

const attributeData = [
  { subject: 'Pace', A: 85, fullMark: 100 },
  { subject: 'Shooting', A: 78, fullMark: 100 },
  { subject: 'Passing', A: 82, fullMark: 100 },
  { subject: 'Dribbling', A: 88, fullMark: 100 },
  { subject: 'Defending', A: 45, fullMark: 100 },
  { subject: 'Physical', A: 72, fullMark: 100 },
];

const scoutViewsData = [
  { name: 'Mon', views: 4 },
  { name: 'Tue', views: 7 },
  { name: 'Wed', views: 5 },
  { name: 'Thu', views: 12 },
  { name: 'Fri', views: 18 },
  { name: 'Sat', views: 24 },
  { name: 'Sun', views: 15 },
];

export default function PlayerDashboardWidgets() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Player Card & Radar */}
      <div className="lg:col-span-1 space-y-6">
        {/* FUT Style Player Card */}
        <div className="bg-gradient-to-br from-[#1A1C1C] to-slate-900 rounded-2xl p-6 border border-[#FFB800]/20 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <div className="text-4xl font-black font-montserrat text-[#FFB800]">84</div>
              <div className="text-xs font-bold text-white/60 uppercase tracking-widest">OVR Scout Grade</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-black text-white font-montserrat">ST</div>
              <div className="text-[10px] font-bold text-[#FFB800] uppercase tracking-wider">Position</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center relative z-10">
            <div className="w-24 h-24 rounded-full border-4 border-[#FFB800] bg-slate-800 mb-4 overflow-hidden relative shadow-[0_0_15px_rgba(255,184,0,0.3)]">
               <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200&h=200" alt="Player" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-black font-montserrat text-white">Akshat Gupta</h2>
            <div className="flex items-center gap-2 mt-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Shield size={12} className="text-[#FFB800]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Phoenix XI</span>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
          <h3 className="text-sm font-extrabold font-montserrat uppercase tracking-wider flex items-center gap-2 mb-4 text-[#1A1C1C]">
            <Activity size={16} className="text-[#FFB800]" />
            Scout Attributes
          </h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={attributeData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Attributes" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                <Tooltip wrapperStyle={{ zIndex: 100 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right Column: Exposure & Matches */}
      <div className="lg:col-span-2 space-y-6">
        {/* Exposure Chart */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-extrabold font-montserrat uppercase tracking-wider flex items-center gap-2 text-[#1A1C1C]">
              <Eye size={16} className="text-blue-500" />
              Scout Profile Views
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">+42% this week</span>
          </div>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoutViewsData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Match & Action Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next Match */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
             <h3 className="text-sm font-extrabold font-montserrat uppercase tracking-wider flex items-center gap-2 mb-6 relative z-10 text-emerald-400">
              <Calendar size={16} />
              Next Fixture
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-2xl font-black font-montserrat">PHX</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Phoenix</div>
                </div>
                <div className="text-xs font-black text-slate-500 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">VS</div>
                <div className="text-center">
                  <div className="text-2xl font-black font-montserrat">APX</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Apex</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800/50">
                <p className="text-sm font-bold">Sat, 24 Aug • 16:00 IST</p>
                <p className="text-xs text-slate-400 mt-1">TPL Arena, Pitch 2</p>
              </div>
            </div>
          </div>

          {/* Action Items / Media */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold font-montserrat uppercase tracking-wider flex items-center gap-2 mb-4 text-[#1A1C1C]">
                <Star size={16} className="text-[#FFB800]" />
                Media Vault
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed">Your highlight clips from Matchweek 3 are ready for download. Share them on socials to boost your scout rating.</p>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-sm">
              <Download size={16} />
              Download MP4 (1080p)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

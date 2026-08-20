"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Shield, Trophy, Users, Calendar, Activity, ChevronRight, Sparkles, AlertTriangle, CheckCircle, XCircle, Info, PieChart as PieChartIcon, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import PlayerDashboardWidgets from '@/components/player/PlayerDashboardWidgets';
import SquadInvitationBanner from '@/components/player/SquadInvitationBanner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const goalTrendData = [
  { match: 'M1', scored: 2, conceded: 1 },
  { match: 'M2', scored: 3, conceded: 0 },
  { match: 'M3', scored: 1, conceded: 1 },
  { match: 'M4', scored: 0, conceded: 2 },
  { match: 'M5', scored: 4, conceded: 1 },
];

const squadAvailabilityData = [
  { name: 'Match Fit', value: 12, color: '#10B981' },
  { name: 'Injured', value: 1, color: '#EF4444' },
  { name: 'Pending Medical', value: 2, color: '#F59E0B' },
];

const upcomingScheduleData = [
  { type: 'Training', date: 'Thu, 22 Aug', time: '18:00', venue: 'TPL Training Ground' },
  { type: 'Friendly', date: 'Sat, 24 Aug', time: '16:00', opponent: 'vs Apex Strikers' },
  { type: 'League Opener', date: 'Sat, 31 Aug', time: '15:00', opponent: 'vs Eagles City' },
];

const defaultStartingXI = [
  { id: 1, name: 'D. De Gea', number: 1, pos: 'GK', top: '85%', left: '50%' },
  { id: 2, name: 'A. Wan-Bissaka', number: 29, pos: 'RB', top: '70%', left: '85%' },
  { id: 3, name: 'R. Varane', number: 19, pos: 'CB', top: '75%', left: '62%' },
  { id: 4, name: 'L. Martínez', number: 6, pos: 'CB', top: '75%', left: '38%' },
  { id: 5, name: 'L. Shaw', number: 23, pos: 'LB', top: '70%', left: '15%' },
  { id: 6, name: 'Casemiro', number: 18, pos: 'CDM', top: '55%', left: '50%' },
  { id: 7, name: 'B. Fernandes', number: 8, pos: 'CM', top: '45%', left: '75%' },
  { id: 8, name: 'C. Eriksen', number: 14, pos: 'CM', top: '45%', left: '25%' },
  { id: 9, name: 'Antony', number: 21, pos: 'RW', top: '20%', left: '80%' },
  { id: 10, name: 'M. Rashford', number: 10, pos: 'LW', top: '20%', left: '20%' },
  { id: 11, name: 'A. Martial', number: 9, pos: 'ST', top: '15%', left: '50%' },
];

const formations: Record<string, any[]> = {
  '4-3-3': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'CDM', top: '55%', left: '50%' },
    { posId: 7, role: 'CM', top: '45%', left: '75%' },
    { posId: 8, role: 'CM', top: '45%', left: '25%' },
    { posId: 9, role: 'RW', top: '20%', left: '80%' },
    { posId: 10, role: 'LW', top: '20%', left: '20%' },
    { posId: 11, role: 'ST', top: '15%', left: '50%' },
  ],
  '4-4-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'RM', top: '45%', left: '85%' },
    { posId: 7, role: 'CM', top: '45%', left: '60%' },
    { posId: 8, role: 'CM', top: '45%', left: '40%' },
    { posId: 9, role: 'LM', top: '45%', left: '15%' },
    { posId: 10, role: 'ST', top: '20%', left: '60%' },
    { posId: 11, role: 'ST', top: '20%', left: '40%' },
  ],
  '3-5-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'CB', top: '75%', left: '80%' },
    { posId: 3, role: 'CB', top: '75%', left: '50%' },
    { posId: 4, role: 'CB', top: '75%', left: '20%' },
    { posId: 5, role: 'RWB', top: '55%', left: '90%' },
    { posId: 6, role: 'LWB', top: '55%', left: '10%' },
    { posId: 7, role: 'CM', top: '50%', left: '65%' },
    { posId: 8, role: 'CM', top: '50%', left: '35%' },
    { posId: 9, role: 'CAM', top: '35%', left: '50%' },
    { posId: 10, role: 'ST', top: '15%', left: '65%' },
    { posId: 11, role: 'ST', top: '15%', left: '35%' },
  ],
  '4-2-3-1': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'CDM', top: '55%', left: '65%' },
    { posId: 7, role: 'CDM', top: '55%', left: '35%' },
    { posId: 8, role: 'RAM', top: '35%', left: '80%' },
    { posId: 9, role: 'CAM', top: '40%', left: '50%' },
    { posId: 10, role: 'LAM', top: '35%', left: '20%' },
    { posId: 11, role: 'ST', top: '15%', left: '50%' },
  ],
  '4-1-2-1-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'CDM', top: '60%', left: '50%' },
    { posId: 7, role: 'RCM', top: '45%', left: '70%' },
    { posId: 8, role: 'LCM', top: '45%', left: '30%' },
    { posId: 9, role: 'CAM', top: '35%', left: '50%' },
    { posId: 10, role: 'RS', top: '20%', left: '60%' },
    { posId: 11, role: 'LS', top: '20%', left: '40%' },
  ],
  '5-3-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RWB', top: '65%', left: '90%' },
    { posId: 3, role: 'RCB', top: '75%', left: '70%' },
    { posId: 4, role: 'CB', top: '75%', left: '50%' },
    { posId: 5, role: 'LCB', top: '75%', left: '30%' },
    { posId: 6, role: 'LWB', top: '65%', left: '10%' },
    { posId: 7, role: 'RCM', top: '45%', left: '70%' },
    { posId: 8, role: 'CM', top: '50%', left: '50%' },
    { posId: 9, role: 'LCM', top: '45%', left: '30%' },
    { posId: 10, role: 'RS', top: '20%', left: '65%' },
    { posId: 11, role: 'LS', top: '20%', left: '35%' },
  ],
  '3-4-3': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RCB', top: '75%', left: '75%' },
    { posId: 3, role: 'CB', top: '75%', left: '50%' },
    { posId: 4, role: 'LCB', top: '75%', left: '25%' },
    { posId: 5, role: 'RM', top: '50%', left: '85%' },
    { posId: 6, role: 'RCM', top: '50%', left: '60%' },
    { posId: 7, role: 'LCM', top: '50%', left: '40%' },
    { posId: 8, role: 'LM', top: '50%', left: '15%' },
    { posId: 9, role: 'RW', top: '20%', left: '80%' },
    { posId: 10, role: 'ST', top: '15%', left: '50%' },
    { posId: 11, role: 'LW', top: '20%', left: '20%' },
  ],
  '4-3-2-1': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'RCM', top: '50%', left: '75%' },
    { posId: 7, role: 'CM', top: '55%', left: '50%' },
    { posId: 8, role: 'LCM', top: '50%', left: '25%' },
    { posId: 9, role: 'RAM', top: '35%', left: '65%' },
    { posId: 10, role: 'LAM', top: '35%', left: '35%' },
    { posId: 11, role: 'ST', top: '15%', left: '50%' },
  ]
};

export default function DashboardPage() {
  const auth = useSelector((state: any) => state.auth);
  const role = auth?.role || 'team';
  const isTeam = role === 'team';

  const [formation, setFormation] = useState('4-3-3');
  const [pitchPlayers, setPitchPlayers] = useState<any[]>(defaultStartingXI);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('tpl_tactics');
    if (savedData) {
      try {
        const { savedFormation, savedStartingXI } = JSON.parse(savedData);
        if (savedFormation && formations[savedFormation]) {
          setFormation(savedFormation);
        }
        
        if (savedStartingXI) {
          const mappedPlayers = [];
          const posLayout = formations[savedFormation || '4-3-3'];
          for (const pos of posLayout) {
            if (savedStartingXI[pos.posId]) {
              mappedPlayers.push({
                ...savedStartingXI[pos.posId],
                top: pos.top,
                left: pos.left,
                pos: savedStartingXI[pos.posId].type
              });
            }
          }
          setPitchPlayers(mappedPlayers);
        }
      } catch (e) {
        console.error(e);
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Dossier Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E7EB] shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] rounded-full text-xs font-bold font-montserrat uppercase tracking-wider text-[#7C5800]">
              <Sparkles size={14} className="text-[#FFB800]" />
              <span>{isTeam ? 'Team Manager Control Center' : 'Player Official Dossier'}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#1A1C1C] font-montserrat tracking-tight">
              Welcome to {isTeam ? 'Team Portal' : 'Player Dashboard'}
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              {isTeam
                ? 'Manage your team roster, assigned squad managers, match fixtures, and official league queries.'
                : 'View your official performance metrics, team assignments, fixtures schedule, and submit queries.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={isTeam ? '/dashboard/players' : '/dashboard/stats'}
              className="px-5 py-3 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
            >
              <span>{isTeam ? 'Manage Players' : 'View Performance Stats'}</span>
              <ChevronRight size={16} className="text-[#FFB800]" />
            </Link>
          </div>
        </div>
      </div>

      {!isTeam ? (
        <div className="space-y-6">
          <SquadInvitationBanner />
          <PlayerDashboardWidgets />
        </div>
      ) : (
        <>
          {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isTeam ? (
          <>
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Registered Players</span>
                <Users size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">15 / 18</p>
              <p className="text-[11px] text-emerald-600 font-medium">3 Roster Slots Open</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Team Manager</span>
                <Shield size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">1</p>
              <p className="text-[11px] text-emerald-600 font-medium">Verified Official Lead</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Upcoming Match</span>
                <Calendar size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-xl font-bold font-montserrat text-[#1A1C1C]">vs Apex Strikers</p>
              <p className="text-[11px] text-slate-500 font-medium">Sat, 24 Aug • 16:00 IST</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">League Standing</span>
                <Trophy size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">#2 Position</p>
              <p className="text-[11px] text-emerald-600 font-medium">+6 Goal Difference</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Assigned Team</span>
                <Shield size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">Phoenix XI</p>
              <p className="text-[11px] text-emerald-600 font-medium">Active Squad Member</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Matches Played</span>
                <Activity size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">12</p>
              <p className="text-[11px] text-slate-500 font-medium">850 Mins Played</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Goals & Assists</span>
                <Trophy size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">8 G / 5 A</p>
              <p className="text-[11px] text-emerald-600 font-medium">Top Scorer Rank #4</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Next Match</span>
                <Calendar size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-xl font-bold font-montserrat text-[#1A1C1C]">vs Apex Strikers</p>
              <p className="text-[11px] text-slate-500 font-medium">Sat, 24 Aug • 16:00 IST</p>
            </div>
          </>
        )}
      </div>

      {/* Team Manager Specific Sections */}
      {isTeam && (
        <div className="space-y-6">
          {/* Action Items & Alerts */}
          <div className="bg-[#FFF5F5] rounded-2xl p-6 border border-[#FCA5A5] shadow-xs space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-base font-extrabold font-montserrat text-[#7F1D1D] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              Action Required
            </h2>
            <div className="space-y-3 relative z-10">
              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Missing Medical Consents (2)</p>
                  <p className="text-xs text-slate-500">Alex Johnson and David Smith need medical clearance before Matchday 5.</p>
                </div>
                <button className="ml-auto text-xs font-bold text-red-600 hover:text-red-800 uppercase px-3 py-1 bg-red-50 rounded-lg">Review</button>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-100 shadow-sm">
                <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Player Suspension Notice</p>
                  <p className="text-xs text-slate-500">Marcus Rashford is suspended for the next match (Accumulated Yellows).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Upcoming Schedule */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4">
              <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider flex items-center gap-2">
                <Calendar size={18} className="text-[#FFB800]" />
                Upcoming Schedule
              </h2>
              
              <div className="space-y-3">
                {upcomingScheduleData.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center text-slate-800">
                      <span className="text-[10px] font-bold uppercase">{event.date.split(',')[0]}</span>
                      <span className="text-sm font-black">{event.date.split(' ')[2]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-extrabold text-slate-900 truncate">
                          {event.type}
                        </p>
                        <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {event.opponent ? event.opponent : event.venue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Setup (Preferred XI) */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4 flex flex-col">
              <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider flex items-center gap-2">
                <LayoutTemplate size={18} className="text-[#FFB800]" />
                Tactical Setup
              </h2>
              
              <div className="flex-1 w-full mt-2 flex flex-col items-center justify-center relative">
                {/* The Pitch */}
                <div className="relative w-full max-w-[200px] aspect-[2/3] bg-emerald-600 rounded-lg border-2 border-emerald-500 mx-auto shadow-inner">
                  {/* Pitch Lines */}
                  <div className="absolute top-1/2 left-0 w-full h-px bg-white/40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 border border-white/40 border-t-0" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 border border-white/40 border-b-0" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 border border-white/40 border-t-0" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-4 border border-white/40 border-b-0" />
                  
                  {/* Players (mapped from data) */}
                  {pitchPlayers.map((player) => (
                    <div 
                      key={player.id} 
                      className="absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-sm cursor-pointer group flex justify-center hover:z-20 transition-transform hover:scale-125"
                      style={{ 
                        top: player.top, 
                        left: player.left, 
                        backgroundColor: player.pos === 'GK' ? '#FACC15' : '#FFFFFF',
                        borderColor: player.pos === 'GK' ? '#FFFFFF' : '#E5E7EB'
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none z-30 shadow-lg border border-slate-700">
                        {player.number} • {player.name}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Formation Label & Action */}
                <div className="mt-4 flex items-center justify-between w-full px-2">
                  <div className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {formation}
                  </div>
                  <Link href="/dashboard/tactics" className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 uppercase tracking-wider transition-colors">
                    Edit Setup
                  </Link>
                </div>
              </div>
            </div>

            {/* Data Visualization */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4 flex flex-col">
              <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider flex items-center gap-2">
                <PieChartIcon size={18} className="text-[#FFB800]" />
                Squad Availability
              </h2>
              
              <div className="flex-1 w-full min-h-[200px] mt-2 flex items-center justify-center relative">
                {/* Center text for Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                  <span className="text-2xl font-black font-montserrat text-[#1A1C1C]">15</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Players</span>
                </div>
                
                <div className="w-full h-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={squadAvailabilityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {squadAvailabilityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        wrapperStyle={{ zIndex: 100 }}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 'bold' }}
                        itemStyle={{ color: '#1A1C1C' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Placeholder Area */}
      {isTeam && (
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4">
          <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider">
            Quick Actions & Portal Shortcuts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <>
              <Link href="/dashboard/players" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Players Directory</h3>
                <p className="text-xs text-slate-500 mt-1">Review player details, medical consents, and registration statuses.</p>
              </Link>
              <Link href="/dashboard/managers" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Team Manager Profile</h3>
                <p className="text-xs text-slate-500 mt-1">Review official manager registration and TPL league liaison contacts.</p>
              </Link>
              <Link href="/dashboard/match-fixtures" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Match Fixtures</h3>
                <p className="text-xs text-slate-500 mt-1">Check scheduled fixtures, stadium venues, and kickoff times.</p>
              </Link>
            </>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}

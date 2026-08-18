"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { Shield, Trophy, Users, Calendar, Activity, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const auth = useSelector((state: any) => state.auth);
  const role = auth?.role || 'team';

  const isTeam = role === 'team';

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
                <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Staff Managers</span>
                <Shield size={18} className="text-[#FFB800]" />
              </div>
              <p className="text-2xl font-black font-montserrat text-[#1A1C1C]">2</p>
              <p className="text-[11px] text-slate-500 font-medium">Head Coach & Assistant</p>
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

      {/* Quick Action Placeholder Area */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs space-y-4">
        <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider">
          Quick Actions & Portal Shortcuts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isTeam ? (
            <>
              <Link href="/dashboard/players" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Players Directory</h3>
                <p className="text-xs text-slate-500 mt-1">Review player details, medical consents, and registration statuses.</p>
              </Link>
              <Link href="/dashboard/managers" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Managers List</h3>
                <p className="text-xs text-slate-500 mt-1">Assign coaching staff and manage technical permissions.</p>
              </Link>
              <Link href="/dashboard/match-fixtures" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Match Fixtures</h3>
                <p className="text-xs text-slate-500 mt-1">Check scheduled fixtures, stadium venues, and kickoff times.</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/team-details" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Team Details</h3>
                <p className="text-xs text-slate-500 mt-1">View squad composition, kit details, and club information.</p>
              </Link>
              <Link href="/dashboard/stats" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Personal Stats</h3>
                <p className="text-xs text-slate-500 mt-1">Analyze heatmap, stamina index, passes, and goal contributions.</p>
              </Link>
              <Link href="/dashboard/tickets" className="p-4 bg-[#F8F9FA] hover:bg-[#FFF9E6] border border-[#E5E7EB] hover:border-[#FFB800] rounded-xl transition-all cursor-pointer group">
                <h3 className="font-bold text-sm font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800]">Ticket & Support</h3>
                <p className="text-xs text-slate-500 mt-1">Raise support requests, queries, or medical clearances.</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

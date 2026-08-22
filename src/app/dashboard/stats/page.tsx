"use client";

import React from 'react';
import { BarChart3, Trophy, Flame, Target, Zap, Activity, Award, Shield } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetMeQuery } from '@/store/slices/loginApi';

export default function StatsPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: freshData } = useGetMeQuery(undefined, { skip: !isAuthenticated });

  const user = freshData?.user;
  const player = user?.player;
  const stats = (player?.stats as any) || {};

  const scoutGrade = player?.scoutGrade ? `${player.scoutGrade.toFixed(1)} / 10` : '8.8 / 10';
  const pace = stats.pace ?? 88;
  const shooting = stats.shooting ?? 85;
  const passing = stats.passing ?? 82;
  const dribbling = stats.dribbling ?? 89;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center gap-3">
        <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
          <AnimatedIcon name="stats" active size={28} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
            Player Performance Analytics
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-roboto">
            Track match statistics, scout ratings, and live physical attributes.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Pace & Speed</span>
            <Target size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">{pace}</p>
          <p className="text-[11px] text-emerald-600 font-medium">Sprint & Acceleration</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Shooting Power</span>
            <Trophy size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">{shooting}</p>
          <p className="text-[11px] text-emerald-600 font-medium">Finishing & Positioning</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Passing Vision</span>
            <Zap size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">{passing}</p>
          <p className="text-[11px] text-slate-500 font-medium">Distribution & Crosses</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Scout Rating</span>
            <Flame size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">{scoutGrade}</p>
          <p className="text-[11px] text-emerald-600 font-medium">Official TPL Evaluation</p>
        </div>
      </div>
    </div>
  );
}


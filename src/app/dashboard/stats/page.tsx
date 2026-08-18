"use client";

import React from 'react';
import { BarChart3, Trophy, Flame, Target, Zap, Activity } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function StatsPage() {
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
            Track match statistics, goal contributions, sprint index, and scouting ratings.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Total Goals</span>
            <Target size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">8</p>
          <p className="text-[11px] text-emerald-600 font-medium">0.67 Goals / Match</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Assists</span>
            <Trophy size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">5</p>
          <p className="text-[11px] text-emerald-600 font-medium">13 Goal Involvements</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Pass Accuracy</span>
            <Zap size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">89.4%</p>
          <p className="text-[11px] text-slate-500 font-medium">342 Completed Passes</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold font-montserrat uppercase tracking-wider">Scout Rating</span>
            <Flame size={18} className="text-[#FFB800]" />
          </div>
          <p className="text-3xl font-black font-montserrat text-[#1A1C1C]">8.8 / 10</p>
          <p className="text-[11px] text-emerald-600 font-medium">Pro Grade Rating</p>
        </div>
      </div>
    </div>
  );
}

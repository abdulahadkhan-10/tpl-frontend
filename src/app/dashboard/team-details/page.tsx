"use client";

import React from 'react';
import { Shield, Users, MapPin, Award, CheckCircle2 } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function TeamDetailsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs relative overflow-hidden space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#FFF9E6] rounded-2xl border border-[#FFB800]/40">
            <AnimatedIcon name="team-details" active size={36} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold font-montserrat uppercase tracking-wider text-[#7C5800]">
              Official Club Dossier
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Phoenix XI Football Club
            </h1>
          </div>
        </div>
        <p className="text-slate-600 text-sm max-w-2xl font-roboto">
          View assigned squad information, home stadium ground, coaching staff details, and official team rules.
        </p>
      </div>

      {/* Team Specs Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#7C5800]">
            <MapPin size={18} />
            <h3 className="font-extrabold font-montserrat text-sm uppercase tracking-wider text-[#1A1C1C]">Home Venue</h3>
          </div>
          <p className="text-lg font-bold font-montserrat text-[#1A1C1C]">Metropolitan Sports Complex</p>
          <p className="text-xs text-slate-500 font-medium">Pitch 1 • Turf Ground</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#7C5800]">
            <Users size={18} />
            <h3 className="font-extrabold font-montserrat text-sm uppercase tracking-wider text-[#1A1C1C]">Head Coach</h3>
          </div>
          <p className="text-lg font-bold font-montserrat text-[#1A1C1C]">Alexander Wright</p>
          <p className="text-xs text-slate-500 font-medium">UEFA Pro License Holder</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#7C5800]">
            <Award size={18} />
            <h3 className="font-extrabold font-montserrat text-sm uppercase tracking-wider text-[#1A1C1C]">League Status</h3>
          </div>
          <p className="text-lg font-bold font-montserrat text-[#1A1C1C]">Division 1 Top Tier</p>
          <p className="text-xs text-emerald-600 font-bold">Registration Confirmed</p>
        </div>
      </div>
    </div>
  );
}

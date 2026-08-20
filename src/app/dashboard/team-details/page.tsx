"use client";

import React from 'react';
import { Shield, Users, MapPin, Award, CheckCircle2, Mail, Phone, Calendar } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetMeQuery } from '@/store/slices/loginApi';

export default function TeamDetailsPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: freshData } = useGetMeQuery(undefined, { skip: !isAuthenticated });

  const user = freshData?.user;
  const player = user?.player;
  const team = player?.team;
  const primaryManager = team?.managers?.[0];

  const teamName = team?.name || 'Riverside Rovers FC';
  const headCoach = primaryManager?.fullName || 'Marcus Vance';
  const coachEmail = primaryManager?.email || team?.email || 'marcus.vance@tpl.dev';
  const coachPhone = primaryManager?.contactNumber || '+44 7700 900077';
  const location = team?.cityOrTown || team?.region || 'London, United Kingdom';
  const ageGroup = team?.ageGroup || 'Under 18';

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Header Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs relative overflow-hidden space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#FFF9E6] rounded-2xl border border-[#FFB800]/40">
            <AnimatedIcon name="team-details" active size={36} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold font-montserrat uppercase tracking-wider text-[#7C5800]">
              Official Assigned Squad Dossier
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              {teamName}
            </h1>
          </div>
        </div>
        <p className="text-slate-600 text-sm max-w-2xl font-roboto">
          Official tournament registration, assigned coaching staff contacts, match venue, and squad division specs.
        </p>
      </div>

      {/* Team Specs Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#7C5800]">
            <MapPin size={18} />
            <h3 className="font-extrabold font-montserrat text-sm uppercase tracking-wider text-[#1A1C1C]">Home Venue / Base</h3>
          </div>
          <p className="text-lg font-bold font-montserrat text-[#1A1C1C]">{location}</p>
          <p className="text-xs text-slate-500 font-medium">TPL League Circuit • {ageGroup}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#7C5800]">
            <Users size={18} />
            <h3 className="font-extrabold font-montserrat text-sm uppercase tracking-wider text-[#1A1C1C]">Head Coach</h3>
          </div>
          <p className="text-lg font-bold font-montserrat text-[#1A1C1C]">{headCoach}</p>
          <p className="text-xs text-slate-500 font-medium">{coachPhone}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#7C5800]">
            <Award size={18} />
            <h3 className="font-extrabold font-montserrat text-sm uppercase tracking-wider text-[#1A1C1C]">League Status</h3>
          </div>
          <p className="text-lg font-bold font-montserrat text-[#1A1C1C]">TPL Official Division 1</p>
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 size={13} />
            Registration Confirmed & Verified
          </p>
        </div>
      </div>

      {/* Coaching & Staff Contacts */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold font-montserrat uppercase tracking-wider text-[#1A1C1C]">
          Team Leadership Contacts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] space-y-1">
            <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">Head Coach Email</span>
            <div className="flex items-center gap-2 font-medium text-[#1A1C1C]">
              <Mail size={14} className="text-[#7C5800]" />
              <span>{coachEmail}</span>
            </div>
          </div>
          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] space-y-1">
            <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">Squad Age Group</span>
            <div className="flex items-center gap-2 font-medium text-[#1A1C1C]">
              <Shield size={14} className="text-[#7C5800]" />
              <span>{ageGroup} Competitive Category</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  Mail, 
  Phone, 
  Shield, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  LifeBuoy,
  MessageSquare,
  Award
} from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetMeQuery } from '@/store/slices/loginApi';

export default function ManagersPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: freshData } = useGetMeQuery(undefined, { skip: !isAuthenticated });

  const team = freshData?.team;
  const managers = team?.managers || [];
  const primaryManager = managers[0] || {
    fullName: team?.name ? `${team.name} Head Coach` : 'Team Head Coach',
    role: 'Head Coach / Team Manager',
    email: team?.email || 'manager@talentproleague.com',
    contactNumber: '+44 7700 900077',
    dateOfBirth: null,
    homeAddress: team?.cityOrTown || 'United Kingdom',
    emergencyContactName: 'Club Administration',
    emergencyContactRelation: 'Official Contact',
    emergencyContactPhone: '+44 7700 900099',
    agreedToManagerAgreement: true,
    agreedToTournamentRules: true,
    acceptedTerms: true,
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return 'Registered with League';
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn relative pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
            <AnimatedIcon name="managers" active size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Official Team Manager & League Staff
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-roboto">
              Verified dugout lead credentials and TPL-assigned tournament staff.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full w-fit">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span className="text-xs font-bold font-montserrat uppercase tracking-wider">
            Accreditation: Active
          </span>
        </div>
      </div>

      {/* Main Grid: Manager Card & Official Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Primary Team Manager Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1A1C1C] text-[#FFB800] font-montserrat font-extrabold flex items-center justify-center text-xl shadow-md border-2 border-[#FFB800]/30">
                  {primaryManager.fullName
                    ? primaryManager.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                    : 'TM'}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-extrabold font-montserrat text-lg md:text-xl text-[#1A1C1C]">
                      {primaryManager.fullName}
                    </h2>
                    <span className="px-2.5 py-0.5 bg-[#FFF9E6] border border-[#FFB800]/50 text-[#7C5800] text-[10px] font-extrabold font-montserrat uppercase tracking-wider rounded-full">
                      Primary Lead
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {primaryManager.role || 'Head Coach & Team Representative'} • {team?.name || 'Registered Squad'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-600">
                <Award size={14} className="text-[#FFB800]" />
                <span>Authorized Dugout Lead</span>
              </div>
            </div>

            {/* Manager Contact & Registration Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB]/70 space-y-1">
                <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                  Official Email
                </span>
                <div className="flex items-center gap-2 font-medium text-[#1A1C1C]">
                  <Mail size={14} className="text-[#7C5800] shrink-0" />
                  <span className="truncate">{primaryManager.email || team?.email || 'N/A'}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB]/70 space-y-1">
                <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                  Contact Number
                </span>
                <div className="flex items-center gap-2 font-medium text-[#1A1C1C]">
                  <Phone size={14} className="text-[#7C5800] shrink-0" />
                  <span>{primaryManager.contactNumber || 'Provided during registration'}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB]/70 space-y-1">
                <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                  Team Base Location
                </span>
                <div className="flex items-center gap-2 font-medium text-[#1A1C1C]">
                  <MapPin size={14} className="text-[#7C5800] shrink-0" />
                  <span className="truncate">{primaryManager.homeAddress || team?.cityOrTown || team?.region || 'United Kingdom'}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB]/70 space-y-1">
                <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                  Date of Birth / Registration
                </span>
                <div className="flex items-center gap-2 font-medium text-[#1A1C1C]">
                  <Calendar size={14} className="text-[#7C5800] shrink-0" />
                  <span>{formatDate(primaryManager.dateOfBirth)}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact Information */}
            <div className="p-4 bg-[#FFF9E6]/60 rounded-xl border border-[#FFB800]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold font-montserrat uppercase tracking-wider text-[#7C5800] flex items-center gap-1.5">
                  <LifeBuoy size={14} />
                  Emergency Contact on File
                </span>
                <span className="text-[10px] text-slate-500 font-medium">TPL League Protocol</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Contact Person</span>
                  <span className="font-semibold">{primaryManager.emergencyContactName || 'Club Officer'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Relationship</span>
                  <span className="font-semibold">{primaryManager.emergencyContactRelation || 'Team Administration'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Emergency Phone</span>
                  <span className="font-semibold">{primaryManager.emergencyContactPhone || primaryManager.contactNumber || 'On Record'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Compliance & League Accreditations */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-5">
            <h3 className="text-xs font-extrabold font-montserrat uppercase tracking-wider text-[#1A1C1C] flex items-center gap-2">
              <Shield size={16} className="text-[#FFB800]" />
              Tournament Compliance
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-montserrat">Manager Agreement</h4>
                  <p className="text-[11px] text-emerald-700">Legally signed and countersigned on registration.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-montserrat">Tournament Rules</h4>
                  <p className="text-[11px] text-emerald-700">Code of conduct & league bylaws accepted.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-montserrat">Dugout Pass Issued</h4>
                  <p className="text-[11px] text-emerald-700">Authorized for technical area during all TPL match fixtures.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#1A1C1C] font-montserrat">
                  <AlertCircle size={14} className="text-[#FFB800]" />
                  <span>Update Details</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  To update your official manager details or register a substitute bench coach, please submit an official request to the TPL Registration Desk.
                </p>
                <Link
                  href="/dashboard/tickets"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C5800] hover:text-black font-montserrat transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>Open Registration Ticket →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official TPL Tournament Staff Section (Assigned by TPL Offline) */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FFF9E6] border border-[#FFB800]/50 text-[#7C5800] text-[10px] font-extrabold font-montserrat uppercase tracking-wider rounded-full">
                League Appointed
              </span>
              <h3 className="font-extrabold font-montserrat text-base text-[#1A1C1C] uppercase tracking-tight">
                TPL Tournament Officials & Matchday Staff
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-roboto mt-1">
              Match commissioners, referee panels, and medical professionals are appointed directly by TPL League Authority offline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                Match Operations
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-600">
                TPL Official
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#1A1C1C] font-montserrat">TPL Match Commissioner</h4>
            <p className="text-xs text-slate-500">Oversees pitch protocol, team sheet submissions, and kickoff scheduling.</p>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                Medical & Safety
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-600">
                On-Site Lead
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#1A1C1C] font-montserrat">TPL Certified Medical Staff</h4>
            <p className="text-xs text-slate-500">Official paramedics and emergency sports physios stationed at all tournament grounds.</p>
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold font-montserrat uppercase tracking-wider text-slate-400">
                Officiating Panel
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-600">
                FA Accredited
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#1A1C1C] font-montserrat">League Referee Committee</h4>
            <p className="text-xs text-slate-500">Neutral certified match officials appointed independently for each league tie.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

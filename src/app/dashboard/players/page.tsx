"use client";

import React from 'react';
import { Users, Plus, Search, Filter, ShieldCheck, Mail } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function PlayersPage() {
  const dummyPlayers = [
    { id: 1, name: 'Carlos Rodriguez', position: 'Forward', number: 9, status: 'Active', rating: '8.8' },
    { id: 2, name: 'Liam Davies', position: 'Midfielder', number: 8, status: 'Active', rating: '8.4' },
    { id: 3, name: 'Marcus Vance', position: 'Defender', number: 4, status: 'Active', rating: '8.1' },
    { id: 4, name: 'Kobe Bryan', position: 'Goalkeeper', number: 1, status: 'Pending Clearance', rating: '7.9' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
            <AnimatedIcon name="players" active size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Players Directory
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-roboto">
              Manage team roster, player registration forms, and squad availability.
            </p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer">
          <Plus size={16} className="text-[#FFB800]" />
          <span>Invite New Player</span>
        </button>
      </div>

      {/* Roster Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by player name or position..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#FFB800] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-[#F8F9FA] transition-colors">
            <Filter size={14} />
            <span>Filter Position</span>
          </button>
        </div>
      </div>

      {/* Players Table Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB] font-montserrat font-extrabold uppercase text-[#514532]">
              <tr>
                <th className="px-6 py-3.5">Jersey</th>
                <th className="px-6 py-3.5">Player Name</th>
                <th className="px-6 py-3.5">Position</th>
                <th className="px-6 py-3.5">Clearance Status</th>
                <th className="px-6 py-3.5 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-roboto">
              {dummyPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-montserrat font-black text-sm text-[#1A1C1C]">
                    #{player.number}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1A1C1C]">
                    {player.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {player.position}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      player.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <ShieldCheck size={12} />
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-montserrat font-bold text-sm text-[#7C5800]">
                    {player.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

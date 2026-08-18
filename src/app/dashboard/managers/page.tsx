"use client";

import React from 'react';
import { UserCheck, Plus, Mail, Shield, Phone } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function ManagersPage() {
  const dummyManagers = [
    { id: 1, name: 'Alexander Wright', role: 'Head Coach', email: 'a.wright@tpl.com', phone: '+91 98765 43210', status: 'Primary Lead' },
    { id: 2, name: 'David Miller', role: 'Assistant Manager', email: 'd.miller@tpl.com', phone: '+91 98765 12345', status: 'Staff' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
            <AnimatedIcon name="managers" active size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Team Managers & Technical Staff
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-roboto">
              Manage head coaches, assistant staff, and portal access rights.
            </p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer">
          <Plus size={16} className="text-[#FFB800]" />
          <span>Add Manager</span>
        </button>
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyManagers.map((manager) => (
          <div key={manager.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-4 hover:border-[#FFB800] transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black text-[#FFB800] font-montserrat font-extrabold flex items-center justify-center text-base">
                  {manager.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold font-montserrat text-base text-[#1A1C1C]">{manager.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{manager.role}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-[#FFF9E6] border border-[#FFB800]/40 text-[#7C5800] text-[10px] font-extrabold font-montserrat uppercase tracking-wider rounded-full">
                {manager.status}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#7C5800]" />
                <span>{manager.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#7C5800]" />
                <span>{manager.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

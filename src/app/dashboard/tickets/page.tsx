"use client";

import React from 'react';
import { HelpCircle, Plus, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function TicketsPage() {
  const dummyTickets = [
    { id: 'TKT-1092', subject: 'Kit Size Modification & Jersey Printing', category: 'Equipment', status: 'In Review', date: '16 Aug 2026' },
    { id: 'TKT-1088', subject: 'Player Transfer & Clearance Certificate Request', category: 'Registration', status: 'Resolved', date: '10 Aug 2026' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
            <AnimatedIcon name="tickets" active size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Ticket and Queries Desk
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-roboto">
              Submit support tickets, league inquiries, medical clearances, and dispute requests.
            </p>
          </div>
        </div>

        <button className="px-4 py-2.5 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer">
          <Plus size={16} className="text-[#FFB800]" />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {dummyTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs hover:border-[#FFB800] transition-colors space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black font-montserrat text-[#7C5800] bg-[#FFF9E6] px-2.5 py-1 rounded-full border border-[#FFB800]/30">
                {ticket.id}
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {ticket.status === 'Resolved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                {ticket.status}
              </span>
            </div>

            <h3 className="font-bold font-montserrat text-base text-[#1A1C1C]">{ticket.subject}</h3>

            <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] text-xs text-slate-500 font-medium">
              <span>Category: {ticket.category}</span>
              <span>Submitted: {ticket.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

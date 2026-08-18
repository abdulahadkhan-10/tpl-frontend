import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
  title: 'Dashboard | Talent Pro League',
  description: 'Talent Pro League authenticated portal dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex bg-[#F9F9F9] text-[#1A1C1C] font-roboto overflow-hidden">
      {/* Persistent Sidebar - 100vh viewport height, no sidebar scrollbar */}
      <Sidebar />

      {/* Main Content Area - Full height with independent overflow scrolling */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Portal Header */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-extrabold font-montserrat tracking-wider uppercase text-[#1A1C1C]">
              TPL PORTAL DASHBOARD
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 bg-[#F8F9FA] px-3 py-1 rounded-full border border-[#E5E7EB]">
              Season 2026 Live
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" title="System Online" />
          </div>
        </header>

        {/* Dynamic Page Content Slot with smooth scrolling */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

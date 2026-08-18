"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { LogOut, ChevronLeft, ChevronRight, Menu, X, PanelLeftClose, PanelLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tplLogo = '/images/TPL_logo_Dark.png';

interface MenuItem {
  name: string;
  path: string;
  badge?: string | number;
  iconName: 'dashboard' | 'players' | 'managers' | 'fixtures' | 'team-details' | 'stats' | 'tickets' | 'settings' | 'logout';
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Role check: Redux -> localStorage -> default 'team'
  const activeRole: 'team' | 'player' = auth?.role === 'player' ? 'player' : 'team';

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  // Team Role Menu Items (Direct unified list - No headings)
  const teamMenuItems: MenuItem[] = [
    { name: 'Dashboard', path: '/dashboard', iconName: 'dashboard', badge: 'LIVE' },
    { name: 'Players', path: '/dashboard/players', iconName: 'players', badge: 15 },
    { name: 'Managers', path: '/dashboard/managers', iconName: 'managers', badge: 2 },
    { name: 'Match Fixtures', path: '/dashboard/match-fixtures', iconName: 'fixtures', badge: 5 },
    { name: 'Ticket & Queries', path: '/dashboard/tickets', iconName: 'tickets', badge: 0 },
    { name: 'Settings', path: '/dashboard/settings', iconName: 'settings' },
  ];

  // Player Role Menu Items (Direct unified list - No headings)
  const playerMenuItems: MenuItem[] = [
    { name: 'Dashboard', path: '/dashboard', iconName: 'dashboard', badge: 'LIVE' },
    { name: 'Team Details', path: '/dashboard/team-details', iconName: 'team-details' },
    { name: 'Performance Stats', path: '/dashboard/stats', iconName: 'stats', badge: 'PRO' },
    { name: 'Ticket & Queries', path: '/dashboard/tickets', iconName: 'tickets', badge: 0 },
    { name: 'Settings', path: '/dashboard/settings', iconName: 'settings' },
  ];

  const currentMenuItems = activeRole === 'team' ? teamMenuItems : playerMenuItems;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 bg-[#1A1C1C] text-white rounded-xl shadow-lg border border-[#FFB800]/40 flex items-center justify-center cursor-pointer hover:bg-black transition-all"
        >
          {mobileOpen ? <X size={20} className="text-[#FFB800]" /> : <Menu size={20} className="text-[#FFB800]" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container - Smooth Collapsible Width (280px <-> 82px) with Framer Motion */}
      <motion.aside
        animate={{ width: isCollapsed ? 82 : 280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-[#E5E7EB] z-40 flex flex-col justify-between overflow-hidden select-none shadow-xs transition-transform duration-300 ease-in-out shrink-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand Header & Collapse Toggle */}
        <div className="p-4 pb-3.5 border-b border-[#E5E7EB] shrink-0 flex items-center justify-between min-w-0">
          <Link href="/" className="flex items-center gap-2.5 group overflow-hidden">
            <img src={tplLogo} alt="Talent Pro League" className="h-8 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform" />
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-xs font-extrabold font-montserrat tracking-tight text-[#1A1C1C] uppercase truncate">
                  Talent Pro League
                </span>
                <span className="text-[9px] text-[#7C5800] font-bold uppercase tracking-widest truncate">
                  OFFICIAL PORTAL
                </span>
              </motion.div>
            )}
          </Link>

          {/* Desktop Collapse / Expand Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-black hover:bg-[#F8F9FA] transition-colors cursor-pointer shrink-0 hidden lg:flex items-center justify-center"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <PanelLeftClose size={18} />
            </motion.div>
          </button>
        </div>

        {/* Clean Unified Menu Items (No section headings) */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-hidden flex flex-col justify-start">
          {currentMenuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <motion.div
                key={item.path}
                whileHover={{ x: isCollapsed ? 0 : 3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={`relative flex items-center ${isCollapsed ? 'justify-center px-0 py-3.5' : 'justify-between px-3.5 py-3.5'} rounded-xl text-sm transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-[#FFF9E6] text-[#1A1C1C] border-[#FFB800]/50 shadow-xs font-bold'
                      : 'bg-white text-slate-700 hover:bg-[#F8F9FA] hover:text-black border-transparent hover:border-[#E5E7EB]'
                  }`}
                >
                  {/* Subtle Gold Active Indicator Bar */}
                  {isActive && (
                    <motion.span
                      layoutId="subtleActiveBar"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-[#FFB800] rounded-r-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  <div className={`flex items-center gap-3.5 min-w-0 ${isCollapsed ? 'justify-center' : ''}`}>
                    <AnimatedIcon
                      name={item.iconName}
                      active={isActive}
                      size={20}
                    />
                    {!isCollapsed && (
                      <span className={`font-montserrat truncate text-[13.5px] ${isActive ? 'font-extrabold text-[#1A1C1C]' : 'font-medium'}`}>
                        {item.name}
                      </span>
                    )}
                  </div>

                  {/* Badge Pill (Only in expanded mode) */}
                  {!isCollapsed && item.badge !== undefined && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold font-montserrat shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#FFB800] text-black shadow-xs'
                          : 'bg-[#F3F4F6] text-slate-600 border border-[#E5E7EB]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Log Out Section */}
        <div className="p-3 border-t border-[#E5E7EB] bg-[#F8F9FA] shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            title={isCollapsed ? "Log Out" : undefined}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center py-3 px-0' : 'justify-between px-3.5 py-3'} rounded-xl text-xs font-black text-rose-600 bg-rose-50/80 hover:bg-rose-100/80 border border-rose-200/60 transition-all cursor-pointer group shadow-xs`}
          >
            <div className="flex items-center gap-2.5">
              <AnimatedIcon name="logout" size={18} />
              {!isCollapsed && <span className="font-montserrat uppercase tracking-wider text-xs">Log Out</span>}
            </div>
            {!isCollapsed && (
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform text-rose-500" />
            )}
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}

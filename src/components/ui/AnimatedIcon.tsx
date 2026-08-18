"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Shield,
  BarChart3,
  HelpCircle,
  Settings,
  LogOut,
  LucideIcon
} from 'lucide-react';

interface AnimatedIconProps {
  name: 'dashboard' | 'players' | 'managers' | 'fixtures' | 'team-details' | 'stats' | 'tickets' | 'settings' | 'logout';
  active?: boolean;
  size?: number;
  className?: string;
  colors?: {
    primary?: string;
    secondary?: string;
  };
}

const ICON_MAP: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  players: Users,
  managers: UserCheck,
  fixtures: Calendar,
  'team-details': Shield,
  stats: BarChart3,
  tickets: HelpCircle,
  settings: Settings,
  logout: LogOut,
};

export default function AnimatedIcon({
  name,
  active = false,
  size = 20,
  className = '',
}: AnimatedIconProps) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = ICON_MAP[name] || LayoutDashboard;

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: active ? 1.12 : hovered ? 1.15 : 1,
        rotate: hovered ? [0, -8, 8, 0] : 0,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <IconComponent
        size={size}
        className={`transition-colors duration-200 ${
          active
            ? 'text-[#FFB800] stroke-[2.5]'
            : 'text-slate-600 group-hover:text-black stroke-[2]'
        }`}
      />
    </motion.div>
  );
}

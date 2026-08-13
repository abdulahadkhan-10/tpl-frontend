"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, User, Globe, ChevronDown, Menu } from "lucide-react";

const navItems = [
  { name: "Fixtures", href: "/fixtures", hasDropdown: true },
  { name: "Standings", href: "/standings" },
  { name: "Teams", href: "/teams" },
  { name: "Scouting", href: "/scouting" },
  { name: "News", href: "/news" },
  { name: "Shop", href: "/shop" },
  { name: "Community", href: "/community" },
  { name: "Galleries", href: "/galleries" },
  { name: "About TPL", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMoving, setIsMoving] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  React.useEffect(() => {
    setIsMoving(true);
    const timer = setTimeout(() => setIsMoving(false), 450); // Matches the spring transition time
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <nav className="w-full bg-[#2a1236] text-white py-6 px-6 md:px-12 flex items-center justify-between z-50 sticky top-0 border-b border-white/10 shadow-lg">
      {/* Logo Area */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/images/TPL_logo_White.png"
            alt="TPL Logo"
            width={72}
            height={72}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Primary Navigation - Desktop */}
      <div className="hidden lg:flex items-center space-x-6 text-base font-semibold tracking-wide text-gray-200">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-1.5 transition-colors duration-300 hover:text-[#ffc842] ${
                active ? "text-[#ffc842] font-extrabold" : "text-gray-300"
              } flex items-center gap-1`}
            >
              <span>{item.name}</span>
              {item.hasDropdown && <ChevronDown size={14} className="opacity-80" />}
              {active && (
                <motion.div
                  layoutId="navbar-active-line"
                  className="absolute bottom-[-25px] left-0 right-0 h-[2.5px] bg-[#ffc842]/50 rounded-full flex items-center justify-center overflow-visible"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 26,
                  }}
                >
                  {/* Glowing Laser Base Line in Brand Gold */}
                  <div className="absolute inset-0 bg-[#ffc842] rounded-full shadow-[0_0_8px_rgba(255,200,66,0.7)]" />
                  
                  {/* Minimal Electric Pulse Wave (Only shown when moving) */}
                  {isMoving && (
                    <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                      <svg 
                        className="absolute -top-[4px] left-0 w-full h-[10px] text-[#ffc842] overflow-visible" 
                        viewBox="0 0 100 10" 
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M 0,5 H 35 L 38,3 L 41,7 L 44,2 L 47,8 L 50,3 L 53,7 L 56,5 H 100"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0.3, pathOffset: 0 }}
                          animate={{ pathOffset: [0, 0.7] }}
                          transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 0.3,
                          }}
                          className="drop-shadow-[0_0_3px_#f2aa00]"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Right Side Actions */}
      <div className="hidden lg:flex items-center gap-4">
        <Link 
          href="/register" 
          className="relative group overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black py-2 px-6 rounded-full text-xs transition-all tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.45)] hover:shadow-[0_0_25px_rgba(245,158,11,0.75)] hover:scale-105 transform inline-flex items-center gap-1.5"
        >
          <span>REGISTER</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        <Link href="/login" className="border border-white/20 text-white hover:bg-white/10 font-bold py-2 px-5 rounded-full text-xs transition-all">
          LOGIN
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center">
        <button className="text-white hover:text-[#ffc842]">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
}

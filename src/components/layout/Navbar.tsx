"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Fixtures", href: "/fixtures" },
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
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  React.useEffect(() => {
    setIsMoving(true);
    setMobileOpen(false);
    const timer = setTimeout(() => setIsMoving(false), 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return null;
  }

  return (
    <nav 
      className={`w-full py-4 md:py-5 px-4 md:px-12 flex items-center justify-between z-50 sticky top-0 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg" 
          : "bg-slate-950 border-b border-transparent shadow-sm"
      }`}
    >
      {/* Logo Area - Aligned Left */}
      <div className="flex-none flex items-center justify-start">
        <Link href="/" className="relative z-10 flex items-center">
          <div className="relative w-[120px] md:w-[152px] h-[60px] md:h-[76px]">
            <Image
              src="/images/TPL_logo_White.png"
              alt="TPL Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Primary Navigation - Balanced Center */}
      <div className="hidden xl:flex flex-1 items-center justify-center space-x-4 xl:space-x-6 text-[13px] font-bold tracking-wider text-gray-200">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 transition-colors duration-300 hover:text-amber-400 ${
                active ? "text-amber-400 font-extrabold" : "text-gray-300"
              } flex items-center gap-1.5 uppercase whitespace-nowrap`}
            >
              <span>{item.name}</span>
              {active && (
                <motion.div
                  layoutId="navbar-active-line"
                  className="absolute bottom-[-24px] left-0 right-0 h-[3px] bg-amber-400/50 rounded-full flex items-center justify-center overflow-visible"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 26,
                  }}
                >
                  <div className="absolute inset-0 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Right Side Actions - Aligned Right */}
      <div className="hidden xl:flex flex-none items-center justify-end gap-4">
        <Link href="/login" className="border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-bold py-2 px-5 rounded-xl text-xs transition-all tracking-wider uppercase whitespace-nowrap">
          Login
        </Link>
        <Link 
          href="/register" 
          className="relative group overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black py-2.5 px-6 rounded-xl text-xs transition-all tracking-wider uppercase shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-105 transform inline-flex items-center gap-1 whitespace-nowrap"
        >
          <span>Register</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="xl:hidden flex items-center justify-end flex-1">
        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="text-white hover:text-amber-400 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="xl:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="xl:hidden absolute top-full left-0 right-0 z-40 bg-slate-950 border-b border-slate-800 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="flex flex-col px-6 py-4">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-3.5 border-b border-slate-900 text-sm font-bold uppercase tracking-wider transition-colors ${
                        active ? "text-amber-400" : "text-gray-200 hover:text-amber-400"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-3 pt-5">
                  <Link
                    href="/login"
                    className="border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-bold py-3 px-5 rounded-xl text-xs text-center transition-all tracking-wider uppercase"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black py-3 px-5 rounded-xl text-xs text-center transition-all tracking-wider uppercase"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

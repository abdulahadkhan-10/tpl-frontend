"use client";

import React from "react";
import { motion } from "framer-motion";

type Partner = {
  name: string;
  logo: React.ReactNode;
};

export default function OfficialPartners() {
  const partnersRow1: Partner[] = [
    {
      name: "Matchday Manager",
      logo: (
        <svg viewBox="0 0 100 40" className="h-10 w-auto text-white fill-white">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M13 26l7-14 7 14h-4l-1.4-3h-3.2L17 26h-4zm5.6-6h2.8L20 15.5 18.6 20z" />
          <text x="42" y="25" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">MANAGER</text>
        </svg>
      )
    },
    {
      name: "Fieldwise Analytics",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <path d="M8 25V15M16 25V9M24 25V18" stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" />
          <text x="32" y="22" fontSize="12" fontWeight="black" fontFamily="sans-serif" fill="#0ea5e9">FIELDWISE</text>
        </svg>
      )
    },
    {
      name: "Crestline Bank",
      logo: (
        <svg viewBox="0 0 100 30" className="h-7 w-auto">
          <path d="M5 24V12l9-8 9 8v12H5z" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="27" y="21" fontSize="13" fontWeight="black" fontFamily="sans-serif" fill="#1d4ed8">CRESTLINE</text>
        </svg>
      )
    },
    {
      name: "Solstice",
      logo: (
        <svg viewBox="0 0 100 30" className="h-9 w-auto">
          <text x="0" y="22" fontSize="18" fontWeight="bold" fontStyle="italic" fontFamily="serif" letterSpacing="-1" fill="#e11d48">Solstice</text>
        </svg>
      )
    },
    {
      name: "Northfield Foods",
      logo: (
        <svg viewBox="0 0 100 35" className="h-9 w-auto">
          <path d="M8 22c4-8 12-14 20-14-2 8-10 14-20 14z" fill="#65a30d" />
          <text x="30" y="24" fontSize="12" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5" fill="white">NORTHFIELD</text>
        </svg>
      )
    }
  ];

  const partnersRow2: Partner[] = [
    {
      name: "Streamline Broadcast",
      logo: (
        <svg viewBox="0 0 100 30" className="h-7 w-auto">
          <circle cx="7" cy="15" r="3" fill="#e2e8f0" />
          <path d="M13 9a8.5 8.5 0 010 12M18 4a15 15 0 010 22" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="24" y="21" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="white">STREAMLINE</text>
        </svg>
      )
    },
    {
      name: "Duraline Sport",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <path d="M6 22L16 8l6 4-6 10z" fill="#ff5f00" />
          <text x="26" y="21" fontSize="13" fontWeight="black" fontFamily="sans-serif" fontStyle="italic" fill="white">DURALINE</text>
        </svg>
      )
    },
    {
      name: "Crestworks",
      logo: (
        <svg viewBox="0 0 100 30" className="h-6 w-auto">
          <polygon points="5,25 15,5 25,25" fill="#f97316" />
          <text x="30" y="21" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="white">CRESTWORKS</text>
        </svg>
      )
    },
    {
      name: "Grassroots Alliance",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <circle cx="15" cy="15" r="10" stroke="#22c55e" strokeWidth="2.5" fill="none" />
          <path d="M11 15h8M15 11v8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          <text x="30" y="21" fontSize="9" fontWeight="black" fontFamily="sans-serif" fill="white">GRASSROOTS ALLIANCE</text>
        </svg>
      )
    },
    {
      name: "ReflexVR",
      logo: (
        <svg viewBox="0 0 100 30" className="h-7 w-auto">
          <rect x="5" y="10" width="15" height="10" rx="3" stroke="#00a3e0" strokeWidth="2.5" fill="none" />
          <text x="26" y="21" fontSize="12" fontWeight="black" fontFamily="sans-serif" letterSpacing="1" fill="white">REFLEXVR</text>
        </svg>
      )
    },
    {
      name: "Statline Cards",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <text x="30" y="22" fontSize="16" fontWeight="black" fontStyle="italic" fontFamily="sans-serif" fill="#a855f7">Statline</text>
        </svg>
      )
    }
  ];

  // Triplicate the lists to ensure smooth infinite ticking
  const loopRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const loopRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  return (
    <section className="py-16 bg-[#0a0f14] overflow-hidden w-full space-y-8 select-none">
      <div className="max-w-[1400px] mx-auto px-4 text-center">
        <span className="text-[10px] font-black text-amber-500 tracking-[0.25em] uppercase block mb-8">
          Official Partners & Features
        </span>
      </div>

      <div className="space-y-6">
        {/* Row 1 Slider: Left-moving */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0%,_black_15%,_black_85%,transparent_100%)]">
          <motion.div 
            className="flex items-center gap-16 min-w-full"
            animate={{ x: [0, -1000] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {loopRow1.map((partner, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2.5 shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-10 flex items-center justify-center min-w-[100px]">
                  {partner.logo}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 Slider: Right-moving */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0%,_black_15%,_black_85%,transparent_100%)]">
          <motion.div 
            className="flex items-center gap-16 min-w-full"
            animate={{ x: [-1000, 0] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {loopRow2.map((partner, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2.5 shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-10 flex items-center justify-center min-w-[100px]">
                  {partner.logo}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

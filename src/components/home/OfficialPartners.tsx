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
      name: "EA SPORTS FC",
      logo: (
        <svg viewBox="0 0 100 40" className="h-10 w-auto text-white fill-white">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M15 15h10v3.5H18.5v3h5v3.5h-5v4H25V33H15zM22 17h10L27 31h-4z" />
          <text x="42" y="25" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">SPORTS</text>
        </svg>
      )
    },
    {
      name: "Adobe",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <polygon points="10,25 20,5 30,25" fill="#fa0f1b" />
          <text x="36" y="22" fontSize="14" fontWeight="black" fontFamily="sans-serif" fill="#fa0f1b">Adobe</text>
        </svg>
      )
    },
    {
      name: "Barclays",
      logo: (
        <svg viewBox="0 0 100 30" className="h-7 w-auto">
          <path d="M5 5l8 20L21 5h-4l-4 12-4-12H5z" fill="#00aeef" />
          <text x="24" y="21" fontSize="14" fontWeight="black" fontFamily="sans-serif" fill="#00aeef">BARCLAYS</text>
        </svg>
      )
    },
    {
      name: "Coca-Cola",
      logo: (
        <svg viewBox="0 0 100 30" className="h-9 w-auto">
          <text x="0" y="22" fontSize="18" fontWeight="bold" fontStyle="italic" fontFamily="serif" letterSpacing="-1" fill="#f40009">Coca-Cola</text>
        </svg>
      )
    },
    {
      name: "Guinness",
      logo: (
        <svg viewBox="0 0 100 35" className="h-9 w-auto">
          <path d="M10 5c0 0 8 3 8 9s-6 10-6 10s4-1 6-4s2-6 2-6s-4 4-8 1z" fill="#d4b26f" />
          <text x="26" y="24" fontSize="13" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5" fill="white">GUINNESS</text>
        </svg>
      )
    }
  ];

  const partnersRow2: Partner[] = [
    {
      name: "Microsoft",
      logo: (
        <svg viewBox="0 0 100 30" className="h-7 w-auto">
          <rect x="0" y="5" width="9" height="9" fill="#f25022" />
          <rect x="10" y="5" width="9" height="9" fill="#7fba00" />
          <rect x="0" y="15" width="9" height="9" fill="#00a4ef" />
          <rect x="10" y="15" width="9" height="9" fill="#ffb900" />
          <text x="24" y="21" fontSize="11" fontWeight="bold" fontFamily="sans-serif" fill="white">Microsoft</text>
        </svg>
      )
    },
    {
      name: "Puma",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <path d="M5 25c5-2 9-5 12-9c3-4 6-5 9-3c3 2 5-1 4-4c-1-3-4-2-6 0c-2 2-5 5-9 6s-7 1-10 10" fill="#ff5f00" />
          <text x="32" y="21" fontSize="14" fontWeight="black" fontFamily="sans-serif" fontStyle="italic" fill="white">PUMA</text>
        </svg>
      )
    },
    {
      name: "Avery Dennison",
      logo: (
        <svg viewBox="0 0 100 30" className="h-6 w-auto">
          <polygon points="5,25 15,5 25,25" fill="#ff0000" />
          <polygon points="12,25 19,10 26,25" fill="#ff0000" fillOpacity="0.5" />
          <text x="30" y="21" fontSize="9" fontWeight="bold" fontFamily="sans-serif" fill="white">AVERY DENNISON</text>
        </svg>
      )
    },
    {
      name: "Football Manager",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <circle cx="15" cy="15" r="10" stroke="#00d4b2" strokeWidth="2.5" fill="none" />
          <text x="30" y="21" fontSize="9" fontWeight="black" fontFamily="sans-serif" fill="white">FOOTBALL MANAGER</text>
        </svg>
      )
    },
    {
      name: "Rezzil",
      logo: (
        <svg viewBox="0 0 100 30" className="h-7 w-auto">
          <rect x="5" y="10" width="15" height="10" stroke="#00a3e0" strokeWidth="2.5" fill="none" />
          <text x="26" y="21" fontSize="12" fontWeight="black" fontFamily="sans-serif" letterSpacing="1" fill="white">REZZIL</text>
        </svg>
      )
    },
    {
      name: "Topps",
      logo: (
        <svg viewBox="0 0 100 30" className="h-8 w-auto">
          <text x="30" y="22" fontSize="16" fontWeight="black" fontStyle="italic" fontFamily="sans-serif" fill="#e31b23">Topps</text>
        </svg>
      )
    }
  ];

  // Triplicate the lists to ensure smooth infinite ticking
  const loopRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const loopRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  return (
    <section className="py-16 bg-[#0a0f14] overflow-hidden border-t border-slate-800/80 w-full space-y-8 select-none">
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

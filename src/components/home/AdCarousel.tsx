"use client";

import React from "react";

type Partner = {
  logo: React.ReactNode;
};

const partnersList: Partner[] = [
  {
    logo: (
      <svg viewBox="0 0 100 40" className="h-14 w-auto text-slate-900 fill-slate-900 transition-colors duration-300 hover:text-amber-500">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M15 15h10v3.5H18.5v3h5v3.5h-5v4H25V33H15zM22 17h10L27 31h-4z" />
        <text x="42" y="25" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">SPORTS</text>
      </svg>
    )
  },
  {
    logo: (
      <svg viewBox="0 0 100 30" className="h-12 w-auto">
        <polygon points="10,25 20,5 30,25" fill="#fa0f1b" />
        <text x="36" y="22" fontSize="14" fontWeight="black" fontFamily="sans-serif" fill="#fa0f1b">Adobe</text>
      </svg>
    )
  },
  {
    logo: (
      <svg viewBox="0 0 100 30" className="h-11 w-auto">
        <path d="M5 5l8 20L21 5h-4l-4 12-4-12H5z" fill="#00aeef" />
        <text x="24" y="21" fontSize="14" fontWeight="black" fontFamily="sans-serif" fill="#00aeef">BARCLAYS</text>
      </svg>
    )
  },
  {
    logo: (
      <svg viewBox="0 0 100 30" className="h-14 w-auto">
        <text x="0" y="22" fontSize="18" fontWeight="bold" fontStyle="italic" fontFamily="serif" letterSpacing="-1" fill="#f40009">Coca-Cola</text>
      </svg>
    )
  },
  {
    logo: (
      <svg viewBox="0 0 100 35" className="h-12 w-auto">
        <path d="M10 5c0 0 8 3 8 9s-6 10-6 10s4-1 6-4s2-6 2-6s-4 4-8 1z" fill="#d4b26f" />
        <text x="26" y="24" fontSize="13" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5" fill="#0f172a">GUINNESS</text>
      </svg>
    )
  },
  {
    logo: (
      <svg viewBox="0 0 100 30" className="h-10 w-auto">
        <rect x="0" y="5" width="9" height="9" fill="#f25022" />
        <rect x="10" y="5" width="9" height="9" fill="#7fba00" />
        <rect x="0" y="15" width="9" height="9" fill="#00a4ef" />
        <rect x="10" y="15" width="9" height="9" fill="#ffb900" />
        <text x="24" y="21" fontSize="11" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a">Microsoft</text>
      </svg>
    )
  },
  {
    logo: (
      <svg viewBox="0 0 100 30" className="h-12 w-auto">
        <path d="M5 25c5-2 9-5 12-9c3-4 6-5 9-3c3 2 5-1 4-4c-1-3-4-2-6 0c-2 2-5 5-9 6s-7 1-10 10" fill="#ff5f00" />
        <text x="32" y="21" fontSize="14" fontWeight="black" fontFamily="sans-serif" fontStyle="italic" fill="#0f172a">PUMA</text>
      </svg>
    )
  }
];

// Duplicate the list once for a seamless -50% CSS translate loop
const doubleList = [...partnersList, ...partnersList];

export default function AdCarousel() {
  return (
    <section className="pt-0 pb-4 bg-transparent overflow-hidden w-full select-none relative">
      <style>{`
        @keyframes ticker {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 25s linear infinite;
        }
      `}</style>

      {/* Infinite Logo Slider Container */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0%,_black_15%,_black_85%,transparent_100%)]">
        <div className="ticker-track gap-24">
          {doubleList.map((partner, idx) => (
            <div 
              key={idx} 
              className="flex items-center shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <div className="h-16 flex items-center justify-center min-w-[140px] transition-transform duration-300 hover:scale-105">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

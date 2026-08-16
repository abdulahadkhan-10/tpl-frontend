"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0b1016] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/images/TPL_logo_White.png"
              alt="TPL Logo"
              width={200}
              height={100}
              className="object-contain"
            />
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
              The premier destination for the finest football talent. Raw to Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-amber-500 mb-2 uppercase">League</h4>
              <Link href="/fixtures" className="hover:text-amber-500 transition-colors">Fixtures</Link>
              <Link href="/fixtures" className="hover:text-amber-500 transition-colors">Results</Link>
              <Link href="/standings" className="hover:text-amber-500 transition-colors">Standings</Link>
              <Link href="/teams" className="hover:text-amber-500 transition-colors">Clubs</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-amber-500 mb-2 uppercase">Media</h4>
              <Link href="/news" className="hover:text-amber-500 transition-colors">News</Link>
              <Link href="/galleries?tab=videos" className="hover:text-amber-500 transition-colors">Videos</Link>
              <Link href="/galleries" className="hover:text-amber-500 transition-colors">Galleries</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-amber-500 mb-2 uppercase">About</h4>
              <Link href="/about" className="hover:text-amber-500 transition-colors">About TPL</Link>
              <Link href="/community" className="hover:text-amber-500 transition-colors">Community</Link>
              <Link href="/sponsors" className="hover:text-amber-500 transition-colors">Sponsors</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Talent Pro League. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-amber-500 transition-colors font-bold uppercase"
          >
            Back to Top
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

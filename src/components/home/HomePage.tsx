"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import FixturesPreview from "@/components/home/FixturesPreview";
import AdCarousel from "@/components/home/AdCarousel";
import LatestNews from "@/components/home/LatestNews";
import TeamOfTheWeek from "@/components/home/TeamOfTheWeek";
import PlayerSpotlight from "@/components/home/PlayerSpotlight";
import Highlights from "@/components/home/Highlights";
import OfficialPartners from "@/components/home/OfficialPartners";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    { 
      tag: "TPL MEN'S LEAGUE", 
      titleLine1: "UNCOMPROMISING",
      highlight: "COMPETITION",
      titleLine3: "ON THE PITCH",
      desc: "The absolute pinnacle of local elite football, where the fiercest teams battle for regional supremacy.",
      image: "/images/slider/sliderMen.png",
      btn1Text: "Register Now",
      btn1Href: "/register",
      btn2Text: "View Teams",
      btn2Href: "/teams"
    },
    { 
      tag: "SEASON 2024", 
      titleLine1: "THE RAW TO PRO",
      highlight: "JOURNEY",
      titleLine3: "STARTS HERE",
      desc: "Witness the evolution of the next generation. TPL's new season brings unprecedented talent to the forefront of modern football.",
      image: "/images/tpl_action.png",
      btn1Text: "Explore Standings",
      btn1Href: "/standings",
      btn2Text: "Watch Highlights",
      btn2Href: "/galleries"
    },
    { 
      tag: "TPL ACADEMY", 
      titleLine1: "DEVELOPING THE",
      highlight: "FUTURE",
      titleLine3: "OF FOOTBALL",
      desc: "Unearthing and nurturing the finest young footballing talents from raw capabilities to professional careers.",
      image: "/images/slider/a.jpg",
      btn1Text: "Apprenticeships",
      btn1Href: "/apprenticeships",
      btn2Text: "Scouting Portal",
      btn2Href: "/scouting"
    },
    { 
      tag: "TPL WOMEN'S LEAGUE", 
      titleLine1: "BREAKING NEW",
      highlight: "GROUND",
      titleLine3: "TOGETHER",
      desc: "Showcasing world-class athletic excellence, precision, and tactical maturity on the national stage.",
      image: "/images/slider/foot.jpg",
      btn1Text: "Fixtures",
      btn1Href: "/fixtures",
      btn2Text: "Join Community",
      btn2Href: "/community"
    }
  ];

  const standings = [
    { pos: 1, name: "Falcons FC", logo: "FAL", p: 14, w: 11, d: 2, l: 1, gd: "+18", pts: 35, color: "text-amber-500" },
    { pos: 2, name: "Wolves Utd", logo: "WOL", p: 14, w: 10, d: 3, l: 1, gd: "+15", pts: 33, color: "text-slate-900" },
    { pos: 3, name: "Eagles City", logo: "EAG", p: 14, w: 9, d: 2, l: 3, gd: "+10", pts: 29, color: "text-slate-900" },
    { pos: 4, name: "Lions Ath", logo: "LIO", p: 14, w: 8, d: 4, l: 2, gd: "+7", pts: 28, color: "text-slate-900" },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const activeSlide = slides[currentSlide];

  return (
    <main className="flex min-h-screen flex-col w-full bg-slate-50/30">
      {/* 1. Fixtures Bar */}
      <FixturesPreview />

      {/* 2. Ad Carousel */}
      <AdCarousel />

      {/* 3. Hero Section: The Raw to Pro Journey Starts Here */}
      <section 
        className="relative min-h-[500px] md:min-h-[600px] w-full flex items-center justify-start bg-slate-950 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 95%)",
        }}
      >
        {/* Background Image with Dark Blue Overlay and fade transition */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center select-none pointer-events-none transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-50" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#031b44]/90 via-[#06204c]/75 to-[#0b2b5c]/50 mix-blend-multiply" />

        <div className="relative z-10 max-w-7xl mx-auto px-12 md:px-20 w-full py-20 flex flex-col items-start text-left space-y-6">
          {/* Season Badge */}
          <span className="inline-block bg-[#ffc842] text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            {activeSlide.tag}
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-7xl font-black italic uppercase leading-none tracking-tight text-white max-w-3xl min-h-[140px] md:min-h-[220px] transition-all duration-500">
            {activeSlide.titleLine1} <br />
            <span className="text-[#ffc842]">{activeSlide.highlight}</span> <br />
            {activeSlide.titleLine3}
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-gray-300 text-sm md:text-base font-medium leading-relaxed italic min-h-[60px] transition-all duration-500">
            {activeSlide.desc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href={activeSlide.btn1Href}
              className="px-6 py-3 bg-[#ffc842] hover:bg-[#e6b43b] text-slate-950 font-black rounded-lg text-sm uppercase tracking-wide transition-colors flex items-center gap-2 shadow-lg animate-pulse"
            >
              <span>{activeSlide.btn1Text}</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link 
              href={activeSlide.btn2Href} 
              className="px-6 py-3 border border-white/30 hover:bg-white/10 text-white font-bold rounded-lg text-sm uppercase tracking-wide transition-all"
            >
              {activeSlide.btn2Text}
            </Link>
          </div>
        </div>

        {/* Manual Slider Navigation Controls - Vertically centered on edges */}
        <button 
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 hover:border-white/50 bg-[#0d0f14]/40 hover:bg-[#ffc842] hover:text-black text-white transition-all cursor-pointer shadow-lg"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/20 hover:border-white/50 bg-[#0d0f14]/40 hover:bg-[#ffc842] hover:text-black text-white transition-all cursor-pointer shadow-lg"
        >
          →
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute left-12 md:left-20 bottom-12 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? "w-8 bg-[#ffc842]" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. League Standings Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Heading and Info */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase leading-none text-slate-900 tracking-tight">
              LEAGUE <br />
              STANDINGS
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed italic">
              The battle for the top spot intensifies as we approach matchweek 15. See who holds the line.
            </p>
            <Link 
              href="/standings" 
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-black text-slate-900 hover:text-amber-600 transition-colors uppercase tracking-widest pt-2"
            >
              <span>Full Table</span>
              <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>

          {/* Right Column: Mini Standings Table */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                    <th className="py-3 px-4 text-center w-12">Pos</th>
                    <th className="py-3 px-2">Club</th>
                    <th className="py-3 px-2 text-center w-12">P</th>
                    <th className="py-3 px-2 text-center w-12">W</th>
                    <th className="py-3 px-2 text-center w-12">D</th>
                    <th className="py-3 px-2 text-center w-12">L</th>
                    <th className="py-3 px-2 text-center w-12">GD</th>
                    <th className="py-3 px-4 text-right w-16">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {standings.map((club) => (
                    <tr key={club.pos} className="hover:bg-slate-50/30 transition-colors">
                      {/* POS */}
                      <td className={`py-4 px-4 text-center font-black ${club.color}`}>
                        {club.pos}
                      </td>
                      {/* CLUB */}
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[9px] font-black text-white shrink-0">
                            {club.logo}
                          </div>
                          <span className="font-extrabold text-slate-900 uppercase tracking-wide">
                            {club.name}
                          </span>
                        </div>
                      </td>
                      {/* STATS */}
                      <td className="py-4 px-2 text-center text-slate-500 font-semibold">{club.p}</td>
                      <td className="py-4 px-2 text-center text-slate-500 font-semibold">{club.w}</td>
                      <td className="py-4 px-2 text-center text-slate-500 font-semibold">{club.d}</td>
                      <td className="py-4 px-2 text-center text-slate-500 font-semibold">{club.l}</td>
                      <td className={`py-4 px-2 text-center font-bold ${club.pos === 1 ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {club.gd}
                      </td>
                      <td className="py-4 px-4 text-right font-black text-slate-900">
                        {club.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. Rest of the Sections */}
      <LatestNews />
      <TeamOfTheWeek />
      <PlayerSpotlight />
      <Highlights />
      <OfficialPartners />
    </main>
  );
}

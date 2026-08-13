"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const slides = [
  { 
    id: 1, 
    src: "/images/slider/a.jpg", 
    tag: "TPL ACADEMY",
    title: "DEVELOPING THE FUTURE",
    desc: "Unearthing and nurturing the finest young footballing talents from raw capabilities to professional careers."
  },
  { 
    id: 2, 
    src: "/images/slider/sliderMen.png", 
    tag: "TPL MEN'S LEAGUE",
    title: "UNCOMPROMISING COMPETITION",
    desc: "The absolute pinnacle of local elite football, where the fiercest teams battle for regional supremacy."
  },
  { 
    id: 3, 
    src: "/images/slider/foot.jpg", 
    tag: "TPL WOMEN'S LEAGUE",
    title: "BREAKING NEW GROUND",
    desc: "Showcasing world-class athletic excellence, precision, and tactical maturity on the national stage."
  },
  { 
    id: 4, 
    src: "/images/slider/sliderTPL.jpeg", 
    tag: "TALENT PRO LEAGUE",
    title: "RAW TO PRO JOURNEY",
    desc: "Empowering the next generation of football stars through elite coaching and scouting platforms."
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds for Ken Burns visual timing
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="w-full bg-transparent py-6 md:py-12 px-4 md:px-8 border-b border-black/5 relative flex justify-center overflow-hidden">
      {/* Subtle Background Glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-zinc-200/50 blur-[120px] pointer-events-none rounded-full z-0"></div>
      
      {/* Professional Slider Container */}
      <div className="relative w-full max-w-[1400px] h-[55vh] md:h-[70vh] bg-[#06090e] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl z-10">

        {/* Slides with Ken Burns scaling animation effect */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Slide Image with slow zoom transition */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                priority={index === 0}
              />
            </div>
            
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-black/35"></div>

            {/* Asymmetric Content Positioning (Design Dial high variance) */}
            <div className="absolute inset-0 flex items-center z-20 px-6 md:px-16 lg:px-24">
              <div className="max-w-2xl text-left flex flex-col items-start">
                {/* Staggered text animations using utility transition delays */}
                <span className={`inline-block bg-[#d18116] text-white text-xs font-black px-3.5 py-1.5 rounded-full mb-4 tracking-widest uppercase shadow-md transition-all duration-700 transform ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.tag}
                </span>

                <h1 className={`text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-[1.05] transition-all duration-750 delay-100 transform ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.title}
                </h1>

                <p className={`text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-lg transition-all duration-800 delay-200 transform ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  {slide.desc}
                </p>

                <div className={`flex flex-col sm:flex-row flex-wrap items-center gap-4 transition-all duration-850 delay-300 transform w-full sm:w-auto ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <button className="bg-[#d18116] hover:bg-[#111824] text-white font-extrabold text-xs md:text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_14px_0_rgba(209,129,22,0.39)] hover:shadow-[0_6px_20px_rgba(17,24,36,0.23)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
                    <Play size={14} fill="white" />
                    EXPLORE MATCH CENTRE
                  </button>
                  <button className="bg-white/5 border border-white/10 hover:bg-white hover:text-[#111824] text-white font-extrabold text-xs md:text-sm px-6 py-3.5 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
                    VIEW STANDINGS
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Right Side Fixed TPL Branding Logo (As requested, keeping the TPL logo prominent) */}
      <div className="absolute right-8 md:right-16 bottom-16 md:bottom-24 z-30 pointer-events-none hidden sm:block">
        <Image
          src="/images/TPL_logo_White.png"
          alt="Talent Pro League"
          width={150}
          height={150}
          className="opacity-70 object-contain drop-shadow-2xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-[#d18116] hover:text-white text-white border border-white/5 hover:border-[#d18116] transition-all z-30 shadow-lg cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-[#d18116] hover:text-white text-white border border-white/5 hover:border-[#d18116] transition-all z-30 shadow-lg cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dynamic Slide Indicators (Tails) */}
      <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 flex items-center gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-550 ${
              idx === currentSlide ? "w-12 bg-[#d18116]" : "w-6 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      </div>
    </section>
  );
}

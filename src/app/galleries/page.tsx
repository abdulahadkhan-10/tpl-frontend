"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Image as ImageIcon, Film, Clock, Eye, Heart, Compass } from 'lucide-react';
import OfficialPartners from "@/components/home/OfficialPartners";

interface GalleryItem {
  id: number;
  type: 'highlights' | 'videos' | 'photos';
  title: string;
  thumbnail: string;
  duration?: string;
  views?: string;
  likes?: string;
  date: string;
}

const mockGalleryData: GalleryItem[] = [
  // Highlights
  { id: 1, type: 'highlights', title: 'London United vs Arsenal Academy - Full Highlights', thumbnail: '/images/slider/sliderTPL.jpeg', duration: '10:45', views: '2.5K', likes: '340', date: 'August 12, 2026' },
  { id: 2, type: 'highlights', title: 'TPL Season 2026 Opening Ceremony Moments', thumbnail: '/images/slider/image.png', duration: '08:20', views: '1.8K', likes: '290', date: 'August 11, 2026' },
  { id: 3, type: 'highlights', title: 'Top 10 Under-18 Goals - Round Robin', thumbnail: '/images/slider/sliderMen.png', duration: '05:15', views: '4.2K', likes: '580', date: 'August 9, 2026' },
  
  // Videos
  { id: 4, type: 'videos', title: 'Exclusive Interview: Rising Star Billy Gil', thumbnail: '/images/slider/sliderWomen.png', duration: '12:30', views: '890', likes: '120', date: 'August 10, 2026' },
  { id: 5, type: 'videos', title: 'Behind The Scenes: How TPL Teams Train', thumbnail: '/images/slider/image.png', duration: '18:10', views: '1.1K', likes: '150', date: 'August 8, 2026' },
  { id: 6, type: 'videos', title: 'Scouting Report: Tactical Analysis of London United', thumbnail: '/images/slider/sliderMen.png', duration: '14:22', views: '730', likes: '95', date: 'August 7, 2026' },
  
  // Photos
  { id: 7, type: 'photos', title: 'TPL opening ceremony crowd & flags', thumbnail: '/images/slider/sliderTPL.jpeg', views: '950', likes: '210', date: 'August 12, 2026' },
  { id: 8, type: 'photos', title: 'London United team celebrations in dressing room', thumbnail: '/images/slider/image.png', views: '1.2K', likes: '430', date: 'August 11, 2026' },
  { id: 9, type: 'photos', title: 'Action shot: Slide tackle in the box', thumbnail: '/images/slider/sliderWomen.png', views: '870', likes: '190', date: 'August 9, 2026' }
];

export default function GalleriesPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as 'highlights' | 'videos' | 'photos' || 'highlights';
  const [activeTab, setActiveTab] = useState<'highlights' | 'videos' | 'photos'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'highlights' || tabParam === 'videos' || tabParam === 'photos') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const filteredItems = mockGalleryData.filter(item => item.type === activeTab);
  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  return (
    <main className="min-h-screen bg-slate-50/50 pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <span className="text-[11px] font-bold text-amber-500 tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
            <Compass size={14} />
            TPL Gallery Archives
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
            Galleries
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
            Browse through match highlights, community videos, and stunning matchday photo streams.
          </p>
        </motion.div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 gap-6 overflow-x-auto no-scrollbar">
          {(['highlights', 'videos', 'photos'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-1.5 border-b-2 text-xs font-black tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive 
                    ? "border-amber-500 text-slate-900 font-extrabold" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === 'highlights' && <Film size={14} />}
                {tab === 'videos' && <Play size={14} />}
                {tab === 'photos' && <ImageIcon size={14} />}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Grid Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={springConfig}
                key={item.id}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden group shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative h-[200px] w-full bg-slate-100 overflow-hidden border-b border-slate-50">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.type !== 'photos' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center pl-1 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                        <Play size={20} fill="black" stroke="black" />
                      </div>
                    </div>
                  )}
                  {item.duration && (
                    <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock size={10} /> {item.duration}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                  <h3 className="text-sm font-black text-slate-800 leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100/50">
                    <span className="flex items-center gap-1"><Eye size={12} /> {item.views} Views</span>
                    <span className="flex items-center gap-1"><Heart size={12} /> {item.likes} Likes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
      <OfficialPartners />
    </main>
  );
}

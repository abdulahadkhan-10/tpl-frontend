"use client";

import React from 'react';
import { Play } from 'lucide-react';

interface HighlightItem {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  zone?: string;
  duration: string;
  thumbnail: string;
}

interface LatestHighlightsProps {
  onViewAll?: () => void;
  limit?: number;
  filterCategory?: string;
  filterSubcategory?: string;
  filterZone?: string;
  searchQuery?: string;
}

export const LatestHighlights: React.FC<LatestHighlightsProps> = ({
  onViewAll,
  limit,
  filterCategory = 'All',
  filterSubcategory = '',
  filterZone = '',
  searchQuery = ''
}) => {
  const highlights: HighlightItem[] = [
    { id: '1', title: 'London United 3-2 Manchester Elite', category: 'U18 Premier Division', duration: '05:12', thumbnail: '/placeholder.png' },
    { id: '2', title: 'Top 10 Goals This Week', category: 'TPL Highlights', duration: '04:35', thumbnail: '/placeholder.png' },
    { id: '3', title: 'Player Spotlight: J. Thompson', category: 'Rising Star', duration: '03:45', thumbnail: '/placeholder.png' },
    { id: '4', title: 'Chelsea Foundation vs Arsenal Academy', category: 'U18 Premier Division', duration: '06:20', thumbnail: '/placeholder.png' },
    { id: '5', title: 'Best Defensive Blocks - Round 22', category: 'TPL compilations', duration: '02:50', thumbnail: '/placeholder.png' },
    { id: '6', title: 'Exclusive Interview: Coach Martinez', category: 'TPL Podcast', duration: '08:15', thumbnail: '/placeholder.png' },
    { id: 'h1', title: 'Men U18: London vs Midlands - Round Robin Knockout', category: 'TPL Highlights', subcategory: 'TPL season 2027 men', zone: 'Knockouts - Round Robin', duration: '05:40', thumbnail: '/placeholder.png' },
    { id: 'h2', title: 'London Zone Semi-Final Highlights 2027', category: 'TPL Highlights', subcategory: 'TPL season 2027 men', zone: 'Zone London', duration: '04:15', thumbnail: '/placeholder.png' },
    { id: 'h3', title: 'West Midlands Zone: Best Goals 2027', category: 'TPL Highlights', subcategory: 'TPL season 2027 men', zone: 'Zone West Midlands', duration: '03:22', thumbnail: '/placeholder.png' },
    { id: 'h4', title: 'East Midlands Derby: Full Match Recap 2027', category: 'TPL Highlights', subcategory: 'TPL season 2027 men', zone: 'Zone East Midlands', duration: '06:05', thumbnail: '/placeholder.png' },
    { id: 'h5', title: 'Wales Divisional Championship Highlights', category: 'TPL Highlights', subcategory: 'TPL season 2027 men', zone: 'Wales', duration: '04:55', thumbnail: '/placeholder.png' },
    { id: 'hw1', title: 'Women U18: Manchester vs Birmingham Elite 2027', category: 'TPL Highlights', subcategory: 'TPL Season 2027 women', duration: '05:30', thumbnail: '/placeholder.png' },
    { id: 'hs1', title: 'TPL Schools Cup: Brighton Academy vs Oakfield High', category: 'TPL Highlights', subcategory: 'TPL Schools', duration: '04:10', thumbnail: '/placeholder.png' },
    { id: 'hi1', title: 'TPL International: UK Select vs Spain U18 Friendly', category: 'TPL Highlights', subcategory: 'TPL international', duration: '07:15', thumbnail: '/placeholder.png' },
    { id: 'r1', title: 'TPL Reality Show: Episode 1 - The Selection Day', category: 'TPL Reality TV Show', duration: '22:45', thumbnail: '/placeholder.png' },
    { id: 'r2', title: 'TPL Reality Show: Episode 2 - Bootcamp Drama', category: 'TPL Reality TV Show', duration: '24:10', thumbnail: '/placeholder.png' },
    { id: 'p1', title: 'TPL Podcast Ep 12: Next-Gen English Scouting', category: 'TPL Podcast', duration: '45:30', thumbnail: '/placeholder.png' },
    { id: 'p2', title: 'TPL Podcast Ep 13: Tactics & Modern Youth Football', category: 'TPL Podcast', duration: '50:15', thumbnail: '/placeholder.png' }
  ];

  const filteredHighlights = highlights.filter((item) => {
    const matchesCategory =
      filterCategory === 'All' ||
      item.category.toLowerCase().includes(filterCategory.toLowerCase());

    const matchesSubcategory =
      !filterSubcategory ||
      filterSubcategory === 'All Subcategories' ||
      (item.subcategory && item.subcategory.toLowerCase() === filterSubcategory.toLowerCase());

    const matchesZone =
      !filterZone ||
      filterZone === 'All Zones' ||
      (item.zone && item.zone.toLowerCase() === filterZone.toLowerCase());

    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSubcategory && matchesZone && matchesSearch;
  });

  const displayedHighlights = limit ? filteredHighlights.slice(0, limit) : filteredHighlights;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-black text-slate-800 tracking-wider uppercase">
          Latest Highlights
        </span>
        {onViewAll && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              onViewAll();
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-850 transition-colors"
          >
            View All
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-4 justify-start">
        {displayedHighlights.map((item) => (
          <div 
            key={item.id} 
            className="flex gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition-colors"
          >
            <div className="relative w-28 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-100">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-1.5 bg-white/90 backdrop-blur rounded-full text-slate-900 shadow-md">
                  <Play size={10} fill="currentColor" />
                </div>
              </div>
              <span className="absolute right-1 bottom-1 px-1 bg-slate-905/90 text-[8px] font-bold text-white rounded">
                {item.duration}
              </span>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-indigo-650 transition-colors line-clamp-2">
                {item.title}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold mt-1">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

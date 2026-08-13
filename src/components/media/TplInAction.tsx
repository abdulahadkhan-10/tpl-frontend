"use client";

import React from 'react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface TplInActionProps {
  onViewAll?: () => void;
  limit?: number;
}

export const TplInAction: React.FC<TplInActionProps> = ({ onViewAll, limit }) => {
  const items: GalleryItem[] = [
    { id: '1', title: 'Youth Coaching & Development', category: 'Training', image: '/placeholder.png' },
    { id: '2', title: 'Matchday Mascot Celebrations', category: 'Entertainment', image: '/placeholder.png' },
    { id: '3', title: 'High-Octane Match Action', category: 'Matchday', image: '/placeholder.png' },
    { id: '4', title: 'Professional Live Broadcasting', category: 'Media Coverage', image: '/placeholder.png' },
    { id: '5', title: 'Pre-Match Tactical Briefing', category: 'Tactics', image: '/placeholder.png' },
    { id: '6', title: 'Fans Packing the Stands', category: 'Atmosphere', image: '/placeholder.png' },
    { id: '7', title: 'Post-Match Trophy Celebration', category: 'Glory', image: '/placeholder.png' },
    { id: '8', title: 'Under-18 Trials & Scouting Day', category: 'Scouting', image: '/placeholder.png' }
  ];

  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-black text-slate-800 tracking-wider uppercase">
          TPL In Action
        </span>
        {onViewAll && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              onViewAll();
            }}
            className="text-xs font-bold text-indigo-650 hover:text-indigo-800 transition-colors"
          >
            View All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {displayedItems.map((item, index) => {
          const cropClasses = [
            'object-cover object-center scale-100',
            'object-cover object-left scale-105 saturate-110',
            'object-cover object-right scale-100 hue-rotate-[10deg]',
            'object-cover object-center scale-105 brightness-95'
          ];
          
          return (
            <div 
              key={item.id} 
              className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-slate-100"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className={`w-full h-full transition-all duration-500 group-hover:scale-110 ${cropClasses[index % cropClasses.length]}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end">
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest leading-none">
                  {item.category}
                </span>
                <span className="text-[11px] font-bold text-white mt-1.5 leading-snug truncate">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

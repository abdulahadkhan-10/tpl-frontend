"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ChevronRight, 
  Newspaper,
  Mail,
  CheckCircle2
} from 'lucide-react';

import { articlesData, Article } from './NewsData';

const categories = ['All', 'Match Reports', 'Scouting', 'Transfers', 'Academy', 'Announcements'];

export default function NewsStoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
    } else {
      setBookmarkedIds(prev => [...prev, id]);
    }
  };

  const filteredArticles = articlesData.filter(art => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articlesData.find(art => art.featured);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-500 tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
              <Newspaper size={14} />
              TPL Journal & Publishing
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
              News & Stories
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Stay updated with announcements, scouts match reports, transfer talk, and youth training highlights.
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Filter:</span>
            {categories.map((cat) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 text-xs font-bold rounded-2xl border transition-colors ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search news & stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-2xl text-slate-700 placeholder:text-slate-450 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Featured Story */}
        {featuredArticle && searchQuery === '' && (activeCategory === 'All' || activeCategory === featuredArticle.category) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springConfig}
            className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-[400px] bg-slate-100">
              <Image 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden z-10" />
            </div>
            
            <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Featured Story
                  </span>
                  <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-slate-905 leading-tight">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {featuredArticle.readTime}</span>
                  <span className="flex items-center gap-1.5"><MessageSquare size={13} /> {featuredArticle.comments} Comments</span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button 
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleBookmark(featuredArticle.id)}
                    className={`p-2 rounded-xl border transition-colors shadow-sm ${
                      bookmarkedIds.includes(featuredArticle.id)
                        ? 'bg-amber-50 border-amber-255 text-amber-550'
                        : 'bg-white border-slate-200 text-slate-400 hover:text-slate-650'
                    }`}
                  >
                    <Bookmark size={14} className={bookmarkedIds.includes(featuredArticle.id) ? 'fill-current' : ''} />
                  </motion.button>
                  <Link href={`/news/${featuredArticle.id}`}>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                    >
                      Read <ChevronRight size={14} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Latest News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles
              .filter(art => !art.featured || (searchQuery !== '' || activeCategory !== 'All'))
              .map((art) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={springConfig}
                  key={art.id} 
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-md transition-shadow flex flex-col justify-between min-h-[360px] group"
                >
                  <Link href={`/news/${art.id}`} className="flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="relative h-44 bg-slate-100 w-full overflow-hidden shrink-0">
                        <Image
                          src={art.image}
                          alt={art.title}
                          fill
                          sizes="(max-w-768px) 100vw, 33vw"
                          className="object-cover transform group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                          <span className="text-[8px] font-black text-indigo-600 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            {art.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{art.date}</span>
                        <h3 className="text-xs font-black text-slate-800 uppercase line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-[10px] text-slate-455 font-bold line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="p-5 border-t border-slate-100 flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3 text-[9px] text-slate-400 font-bold">
                      <span className="flex items-center gap-1"><Clock size={11} /> {art.readTime}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={11} /> {art.comments}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button 
                        whileTap={{ scale: 0.85 }}
                        onClick={() => toggleBookmark(art.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          bookmarkedIds.includes(art.id)
                            ? 'bg-amber-50 border-amber-200 text-amber-505'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Bookmark size={12} className={bookmarkedIds.includes(art.id) ? 'fill-current' : ''} />
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.85 }} className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-150 transition-colors">
                        <Share2 size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="col-span-full bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm">
              <Newspaper className="mx-auto text-slate-350 mb-3" size={36} />
              <h3 className="text-sm font-bold text-slate-800 uppercase">No articles found</h3>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Newsletter widget */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[9px] font-black text-amber-400 tracking-wider uppercase leading-none">
                TPL Newsletter Digest
              </span>
              <h2 className="text-lg md:text-xl font-black uppercase leading-tight">
                Get raw academy talent alerts straight to your inbox
              </h2>
              <p className="text-xs text-slate-300 max-w-xl font-semibold leading-relaxed">
                Subscribe to get scouts reports, tactical updates, streaming reminders, and gear sales notifications.
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-96">
              {subscribed ? (
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="text-amber-400" size={24} />
                  <div className="flex flex-col text-xs font-bold leading-snug">
                    <span>Subscription Confirmed!</span>
                    <span className="text-[10px] text-slate-300 mt-0.5">Thank you for subscribing.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white border border-white/10 focus:border-white text-xs font-bold rounded-2xl placeholder:text-slate-450 focus:text-slate-800 transition-all outline-none"
                    />
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs uppercase tracking-wider"
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ArrowLeft, Clock, MessageSquare, Share2, Bookmark, Sparkles, Heart } from "lucide-react";
import { articlesData } from "./NewsData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;

  // Find the active article or fallback
  const article = articlesData.find((art) => art.id === articleId) || articlesData[0];

  // Simple like counter state
  const [likes, setLikes] = React.useState(12);
  const [hasLiked, setHasLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const { scrollYProgress } = useScroll();

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  // Get related articles (excluding the current one)
  const relatedArticles = articlesData
    .filter((art) => art.id !== article.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900 font-sans pb-24">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Top Breadcrumbs */}
      <div className="max-w-[800px] mx-auto px-6 pt-8 pb-4">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={3} />
          <span>Back to News</span>
        </Link>
      </div>

      <div className="max-w-[800px] mx-auto px-6 space-y-8">
        {/* Article Header Card */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              <Sparkles size={10} />
              <span>{article.category}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold font-mono">
              {article.date}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight text-slate-950 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 font-bold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime}</span>
              <span className="flex items-center gap-1.5"><MessageSquare size={14} /> {article.comments} Comments</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleLike}
                className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                  hasLiked 
                    ? "bg-rose-50 border-rose-200 text-rose-500" 
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Heart size={14} className={hasLiked ? "fill-current" : ""} />
                <span>{likes}</span>
              </button>

              <button 
                onClick={() => setIsBookmarked(prev => !prev)}
                className={`p-2 rounded-xl border transition-colors ${
                  isBookmarked 
                    ? "bg-amber-50 border-amber-200 text-amber-600" 
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
                aria-label="Bookmark article"
              >
                <Bookmark size={14} className={isBookmarked ? "fill-current" : ""} />
              </button>

              <button 
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors bg-slate-50"
                aria-label="Share article"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="relative h-[250px] md:h-[400px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Full Article Content */}
        <article className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm text-slate-800 leading-[1.8] text-base md:text-lg tracking-[0.015em] font-medium space-y-8">
          {article.content.split("\n\n").map((para, idx) => (
            <p key={idx} className="first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:text-amber-600 first-letter:leading-none">
              {idx === 0 ? para : para.replace(/^[A-Z]/, (c) => c)}
            </p>
          ))}
        </article>

        {/* Related News Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-black italic uppercase tracking-tight text-slate-900 px-2">
            RELATED NEWS & STORIES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art) => (
              <Link 
                key={art.id} 
                href={`/news/${art.id}`}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between min-h-[280px] group cursor-pointer"
              >
                <div className="relative h-32 bg-slate-100 w-full overflow-hidden shrink-0">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transform group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <span className="block text-[8px] font-black text-slate-400 font-mono uppercase">{art.date}</span>
                    <h4 className="text-xs font-black text-slate-800 uppercase line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors mt-1">
                      {art.title}
                    </h4>
                  </div>

                  <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider block border-b border-transparent group-hover:border-amber-500 w-fit pb-0.5 transition-colors">
                    READ STORY →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

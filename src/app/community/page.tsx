"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Heart, 
  Eye, 
  BarChart3, 
  Check, 
  Share2, 
  Flame,
  User,
  X
} from 'lucide-react';

interface DiscussionThread {
  id: string;
  title: string;
  category: 'Matches' | 'Scouting' | 'Shop' | 'General';
  replies: number;
  views: number;
  author: string;
  time: string;
}

interface SocialPost {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
  time: string;
}

export default function CommunityPage() {
  // Poll state
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState({
    davies: 142,
    mensah: 189,
    clarke: 84
  });

  // Player of the Week poll state
  const [hasVotedPlayer, setHasVotedPlayer] = useState(false);
  const [votedOptionPlayer, setVotedOptionPlayer] = useState<string | null>(null);
  const [pollVotesPlayer, setPollVotesPlayer] = useState({
    davies: 98,
    thompson: 156,
    rahman: 112
  });

  // Tournament Awards state
  const [activePollCategory, setActivePollCategory] = useState<string | null>('Goal of the Week');
  const [awardVotes, setAwardVotes] = useState<Record<string, { voted: boolean; option: string; votes: Record<string, number> }>>({
    'Best Keeper': { voted: false, option: '', votes: { 'David Miller (Southampton)': 120, 'Liam Carter (London)': 85, 'Alex Rose (Leeds)': 64 } },
    'Best Forward': { voted: false, option: '', votes: { 'J. Thompson (Manchester)': 240, 'E. Okafor (Birmingham)': 180, 'A. Johnson (Chelsea)': 145 } },
    'Best Defender': { voted: false, option: '', votes: { 'Harry Styles (London)': 110, 'Toby Alder (Southampton)': 95, 'Marcus Cole (Arsenal)': 80 } },
    'Best Midfield': { voted: false, option: '', votes: { 'Ethan Davies (London)': 195, 'Billy Gil (Chelsea)': 112, 'Sam Smith (Leeds)': 75 } },
    'Best Wing': { voted: false, option: '', votes: { 'Noah Mensah (London)': 150, 'A. Rahman (London)': 185, 'L. Williams (Arsenal)': 130 } },
    'Player of the Tournament': { voted: false, option: '', votes: { 'Ethan Davies (London)': 320, 'J. Thompson (Manchester)': 290, 'A. Rahman (London)': 210 } },
  });

  // Discussions state
  const [threads, setThreads] = useState<DiscussionThread[]>([
    { id: 't1', title: 'Matchday 8 Prediction: Who wins between Southampton Storm and Leeds Academy?', category: 'Matches', replies: 24, views: 152, author: 'striker_pro', time: '2 hours ago' },
    { id: 't2', title: 'Is Ethan Davies ready for first-team football in the EFL Championship?', category: 'Scouting', replies: 18, views: 98, author: 'midfield_tactics', time: '4 hours ago' },
    { id: 't3', title: 'Puma training gear templates look stellar. Has anyone purchased the hoodie?', category: 'Shop', replies: 6, views: 42, author: 'kit_collector', time: '1 day ago' },
    { id: 't4', title: 'Upcoming U16 Developmental trials location announced for next Saturday.', category: 'General', replies: 11, views: 76, author: 'coach_ross', time: '2 days ago' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Matches' | 'Scouting' | 'Shop' | 'General'>('General');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Social feed state
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    { id: 's1', author: 'Scout Alpha', handle: '@ScoutAlpha', content: 'Scouting at the TPL games is a breath of fresh air. Pure raw talent, high intensity, and stellar coaching setups. #RawToPro #TPLScouting', likes: 28, time: '1h' },
    { id: 's2', author: 'London Colt Fan', handle: '@Fanatical_Colt', content: 'Just ordered the official Home Jersey from the Shop! Delivery was extremely fast. Crest detail is outstanding. ⚽🔥', likes: 14, time: '3h' },
    { id: 's3', author: 'Tactical Analyst', handle: '@TplAnalyst', content: 'Davies positional mapping in Matchday 8 was world-class. Covered over 11.2km and registered a 92% pass accuracy. Scout watch lists are filling up.', likes: 37, time: '5h' }
  ]);

  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  const handleVote = (option: 'davies' | 'mensah' | 'clarke') => {
    if (hasVoted) return;
    setPollVotes(prev => ({ ...prev, [option]: prev[option] + 1 }));
    setVotedOption(option);
    setHasVoted(true);
  };

  const handleVotePlayer = (option: 'davies' | 'thompson' | 'rahman') => {
    if (hasVotedPlayer) return;
    setPollVotesPlayer(prev => ({ ...prev, [option]: prev[option] + 1 }));
    setVotedOptionPlayer(option);
    setHasVotedPlayer(true);
  };

  const handleVoteAward = (category: string, nominee: string) => {
    setAwardVotes(prev => {
      const current = prev[category];
      if (current.voted) return prev;
      return {
        ...prev,
        [category]: {
          voted: true,
          option: nominee,
          votes: { ...current.votes, [nominee]: current.votes[nominee] + 1 }
        }
      };
    });
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newThread: DiscussionThread = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      replies: 0,
      views: 1,
      author: 'You (Admin)',
      time: 'Just now'
    };

    setThreads(prev => [newThread, ...prev]);
    setNewTitle('');
    setShowCreateForm(false);
  };

  const handleLikePost = (id: string) => {
    setSocialPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const totalVotes = pollVotes.davies + pollVotes.mensah + pollVotes.clarke;
  const getPercent = (val: number) => Math.round((val / totalVotes) * 100);

  const totalVotesPlayer = pollVotesPlayer.davies + pollVotesPlayer.thompson + pollVotesPlayer.rahman;
  const getPercentPlayer = (val: number) => Math.round((val / totalVotesPlayer) * 100);

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
              <MessageSquare size={14} />
              TPL Fan Platform & Forums
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
              Fan Hub & Community
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Connect with other football enthusiasts, pitch in on discussion boards, vote in polls, and read social highlights.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Forums & Social Feed */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Discussion Forums */}
            <motion.div 
              layout 
              className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <Flame size={16} className="text-rose-500 fill-current" />
                  Active Discussions
                </span>
                
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-full transition-colors shadow-sm"
                >
                  <Plus size={14} /> Start Thread
                </motion.button>
              </div>

              {/* Create Thread Form */}
              <AnimatePresence>
                {showCreateForm && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleCreateThread} 
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 overflow-hidden"
                  >
                    <h4 className="text-xs font-black text-slate-800 uppercase font-mono tracking-wider">Start a New Discussion</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <input 
                          type="text"
                          required
                          placeholder="What would you like to discuss?"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as any)}
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        >
                          <option value="General">General</option>
                          <option value="Matches">Matches</option>
                          <option value="Scouting">Scouting</option>
                          <option value="Shop">Shop</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-4 py-2 bg-slate-200/50 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Post Thread
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Forums Lists */}
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {threads.map((thread) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={springConfig}
                      key={thread.id} 
                      className="p-5 bg-white border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {thread.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">Posted by {thread.author} • {thread.time}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors leading-snug">
                          {thread.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold shrink-0 self-end md:self-center">
                        <span className="flex items-center gap-1.5"><MessageSquare size={13} /> {thread.replies} Replies</span>
                        <span className="flex items-center gap-1.5"><Eye size={13} /> {thread.views} Views</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Social Feed Activity */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
              <div className="border-b border-slate-200/50 pb-4">
                <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                  Fan Activity Wall
                </h3>
              </div>

              <div className="space-y-4">
                {socialPosts.map((post) => (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    key={post.id} 
                    className="p-5 bg-white border border-slate-100 rounded-2xl flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 leading-none">{post.author}</span>
                          <span className="text-[10px] text-slate-400 font-medium leading-none">{post.handle}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{post.time} ago</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold pt-2 border-t border-slate-100">
                        <motion.button 
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer ${
                            post.hasLiked ? 'text-rose-500' : ''
                          }`}
                        >
                          <Heart size={13} className={post.hasLiked ? 'fill-current' : ''} />
                          <span>{post.likes}</span>
                        </motion.button>

                        <motion.button 
                          whileTap={{ scale: 0.85 }}
                          className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                          <Share2 size={13} />
                          <span>Share</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Fan Polls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                <span className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <BarChart3 size={16} className="text-amber-500" />
                  Interactive Fan Polls
                </span>
              </div>

              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Cast your vote for the weekly highlights and upcoming tournament awards before the Ultimate Final.
              </p>

              <div className="space-y-4">
                
                {/* Goal of the Week */}
                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActivePollCategory(activePollCategory === 'Goal of the Week' ? null : 'Goal of the Week')}
                    className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                      activePollCategory === 'Goal of the Week' ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-xs font-bold text-slate-800">Goal of the Week</span>
                      {hasVoted && (
                        <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                          <Check size={12} /> Voted
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {hasVoted ? 'Voted' : activePollCategory === 'Goal of the Week' ? 'Close' : 'Vote'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {activePollCategory === 'Goal of the Week' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-slate-50 border-t border-slate-100 space-y-4 overflow-hidden"
                      >
                        <p className="text-xs text-slate-500 font-semibold">Which academy highlight impressed you the most in Matchday 7?</p>
                        
                        {hasVoted ? (
                          <div className="space-y-3 pt-1">
                            {/* Option 1 */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <span>Ethan Davies (CM)</span>
                                <span>{getPercent(pollVotes.davies)}%</span>
                              </div>
                              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${getPercent(pollVotes.davies)}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>

                            {/* Option 2 */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <span>Noah Mensah (RW)</span>
                                <span>{getPercent(pollVotes.mensah)}%</span>
                              </div>
                              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${getPercent(pollVotes.mensah)}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>

                            {/* Option 3 */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <span>Jayden Clarke (ST)</span>
                                <span>{getPercent(pollVotes.clarke)}%</span>
                              </div>
                              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${getPercent(pollVotes.clarke)}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200/50 pt-3 text-[10px] text-slate-400 font-semibold">
                              <span>Total Votes: {totalVotes}</span>
                              <button onClick={() => { setHasVoted(false); setVotedOption(null); }} className="text-indigo-600 hover:text-indigo-700 font-bold">
                                Reset
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2 pt-1">
                            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleVote('davies')} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors">
                              Ethan Davies (CM) - long range bullet
                            </motion.button>
                            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleVote('mensah')} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors">
                              Noah Mensah (RW) - Solo dribble run
                            </motion.button>
                            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleVote('clarke')} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors">
                              Jayden Clarke (ST) - Overhead bicycle kick
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Player of the Week */}
                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActivePollCategory(activePollCategory === 'Player of the Week' ? null : 'Player of the Week')}
                    className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                      activePollCategory === 'Player of the Week' ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-xs font-bold text-slate-800">Player of the Week</span>
                      {hasVotedPlayer && (
                        <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                          <Check size={12} /> Voted
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {hasVotedPlayer ? 'Voted' : activePollCategory === 'Player of the Week' ? 'Close' : 'Vote'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {activePollCategory === 'Player of the Week' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-slate-50 border-t border-slate-100 space-y-4 overflow-hidden"
                      >
                        <p className="text-xs text-slate-500 font-semibold">Which breakout player had the most impact in Matchday 7?</p>
                        
                        {hasVotedPlayer ? (
                          <div className="space-y-3 pt-1">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <span>Ethan Davies (CM)</span>
                                <span>{getPercentPlayer(pollVotesPlayer.davies)}%</span>
                              </div>
                              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${getPercentPlayer(pollVotesPlayer.davies)}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <span>J. Thompson (ST)</span>
                                <span>{getPercentPlayer(pollVotesPlayer.thompson)}%</span>
                              </div>
                              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${getPercentPlayer(pollVotesPlayer.thompson)}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <span>A. Rahman (LW)</span>
                                <span>{getPercentPlayer(pollVotesPlayer.rahman)}%</span>
                              </div>
                              <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${getPercentPlayer(pollVotesPlayer.rahman)}%` }} className="h-full bg-indigo-600 rounded-full" />
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200/50 pt-3 text-[10px] text-slate-400 font-semibold">
                              <span>Total Votes: {totalVotesPlayer}</span>
                              <button onClick={() => { setHasVotedPlayer(false); setVotedOptionPlayer(null); }} className="text-indigo-600 hover:text-indigo-700 font-bold">
                                Reset
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2 pt-1">
                            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleVotePlayer('davies')} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors">
                              Ethan Davies (CM) - London United
                            </motion.button>
                            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleVotePlayer('thompson')} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors">
                              J. Thompson (ST) - Manchester Elite
                            </motion.button>
                            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleVotePlayer('rahman')} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors">
                              A. Rahman (LW) - London United
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tournament Awards */}
                {Object.keys(awardVotes).map((category) => {
                  const isSelected = activePollCategory === category;
                  const data = awardVotes[category];
                  return (
                    <div key={category} className="border border-slate-100 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setActivePollCategory(isSelected ? null : category)}
                        className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                          isSelected ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-xs font-bold text-slate-800 truncate">{category}</span>
                          {data.voted && (
                            <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                              <Check size={12} /> Voted
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                          {data.voted ? 'Voted' : isSelected ? 'Close' : 'Vote'}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-slate-50 border-t border-slate-100 space-y-4 overflow-hidden"
                          >
                            {data.voted ? (
                              <div className="space-y-3 pt-1">
                                {Object.keys(data.votes).map((nominee) => {
                                  const votes = data.votes[nominee];
                                  const total = Object.values(data.votes).reduce((a, b) => a + b, 0);
                                  const pct = Math.round((votes / total) * 100);
                                  return (
                                    <div key={nominee} className="space-y-1">
                                      <div className="flex justify-between text-xs font-bold text-slate-705">
                                        <span className="truncate">{nominee}</span>
                                        <span>{pct}%</span>
                                      </div>
                                      <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-indigo-650 rounded-full" />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="space-y-2 pt-1">
                                {Object.keys(data.votes).map((nominee) => (
                                  <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    key={nominee}
                                    onClick={() => handleVoteAward(category, nominee)}
                                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-left text-xs font-bold text-slate-750 hover:bg-slate-100 transition-colors"
                                  >
                                    {nominee}
                                  </motion.button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

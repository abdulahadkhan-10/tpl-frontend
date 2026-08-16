"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, X, Check, Mail, Building, Landmark, Star, Handshake } from "lucide-react";
import OfficialPartners from "@/components/home/OfficialPartners";

interface SponsorTier {
  id: string;
  name: string;
  benefits: string[];
  price: string;
  popular?: boolean;
}

const sponsorTiers: SponsorTier[] = [
  {
    id: "tier-1",
    name: "Supporting Sponsor",
    price: "Custom",
    benefits: [
      "Logo on official website partner directory",
      "Shared social media appreciation post",
      "Invitation to seasonal academy showcases",
    ]
  },
  {
    id: "tier-2",
    name: "Gold Partner",
    price: "Custom",
    popular: true,
    benefits: [
      "Primary placement on all digital platform headers",
      "Pitchside banner advertising at home stadiums",
      "Dedicated social media integration & branding campaign",
      "Exclusive player & staff meet-and-greet sessions",
    ]
  },
  {
    id: "tier-3",
    name: "Development Partner",
    price: "Custom",
    benefits: [
      "Official partner naming rights for U18 academy division",
      "Full branding placement on all team jerseys",
      "Global broadcasting coverage and custom commercial reels",
      "Joint community pathway development programs",
    ]
  }
];

const sponsorLogos = [
  {
    name: "EA SPORTS FC",
    logo: (
      <svg viewBox="0 0 100 40" className="h-14 w-auto text-white fill-white">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M15 15h10v3.5H18.5v3h5v3.5h-5v4H25V33H15zM22 17h10L27 31h-4z" />
        <text x="42" y="25" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">SPORTS</text>
      </svg>
    )
  },
  {
    name: "Adobe",
    logo: (
      <svg viewBox="0 0 100 30" className="h-12 w-auto">
        <polygon points="10,25 20,5 30,25" fill="#fa0f1b" />
        <text x="36" y="22" fontSize="14" fontWeight="black" fontFamily="sans-serif" fill="#fa0f1b">Adobe</text>
      </svg>
    )
  },
  {
    name: "Barclays",
    logo: (
      <svg viewBox="0 0 100 30" className="h-10 w-auto">
        <path d="M5 5l8 20L21 5h-4l-4 12-4-12H5z" fill="#00aeef" />
        <text x="24" y="21" fontSize="14" fontWeight="black" fontFamily="sans-serif" fill="#00aeef">BARCLAYS</text>
      </svg>
    )
  },
  {
    name: "Coca-Cola",
    logo: (
      <svg viewBox="0 0 100 30" className="h-12 w-auto">
        <text x="0" y="22" fontSize="18" fontWeight="bold" fontStyle="italic" fontFamily="serif" letterSpacing="-1" fill="#f40009">Coca-Cola</text>
      </svg>
    )
  },
  {
    name: "Microsoft",
    logo: (
      <svg viewBox="0 0 100 30" className="h-10 w-auto">
        <rect x="0" y="5" width="9" height="9" fill="#f25022" />
        <rect x="10" y="5" width="9" height="9" fill="#7fba00" />
        <rect x="0" y="15" width="9" height="9" fill="#00a4ef" />
        <rect x="10" y="15" width="9" height="9" fill="#ffb900" />
        <text x="24" y="21" fontSize="11" fontWeight="bold" fontFamily="sans-serif" fill="white">Microsoft</text>
      </svg>
    )
  },
  {
    name: "Puma",
    logo: (
      <svg viewBox="0 0 100 30" className="h-11 w-auto">
        <path d="M5 25c5-2 9-5 12-9c3-4 6-5 9-3c3 2 5-1 4-4c-1-3-4-2-6 0c-2 2-5 5-9 6s-7 1-10 10" fill="#ff5f00" />
        <text x="32" y="21" fontSize="14" fontWeight="black" fontFamily="sans-serif" fontStyle="italic" fill="white">PUMA</text>
      </svg>
    )
  }
];

const doubledLogos = [...sponsorLogos, ...sponsorLogos, ...sponsorLogos];

export default function SponsorsPage() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", tier: "Gold Partner" });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.company && formData.email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setShowInquiryModal(false);
        setFormData({ name: "", company: "", email: "", tier: "Gold Partner" });
      }, 2000);
    }
  };

  const springConfig = { type: "spring", damping: 15, stiffness: 100 } as const;

  return (
    <div className="min-h-screen bg-[#070b0e] text-slate-100 font-sans pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-widest">
            <Handshake size={14} /> TPL Partner Network
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight uppercase">
            Sponsors & Partners
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Collaborating with global brands and local organizations to support the next generation of youth football talent.
          </p>
        </motion.div>

        {/* Brand Logo Ticker (Actual Sponsor Logos and Increased Size) */}
        <div className="relative w-full overflow-hidden py-10 border-y border-slate-800/80 bg-[#0a0f13] [mask-image:_linear-gradient(to_right,transparent_0%,_black_15%,_black_85%,transparent_100%)]">
          <div className="ticker-wrap flex items-center overflow-hidden whitespace-nowrap">
            <motion.div 
              className="flex items-center gap-20 min-w-full"
              animate={{ x: [0, -1500] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {doubledLogos.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="h-16 flex items-center justify-center min-w-[120px]">
                    {item.logo}
                  </div>
                  <span className="text-sm font-black text-slate-300 uppercase tracking-widest">{item.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sponsorship Tiers Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-black text-amber-500 uppercase tracking-[0.25em]">Sponsorship Tiers</h2>
            <p className="text-xl font-bold text-white">Choose Your Level of Engagement</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorTiers.map((tier) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={tier.id}
                className={`bg-[#0a0f13] border rounded-3xl p-8 flex flex-col justify-between relative shadow-lg ${
                  tier.popular ? "border-amber-500" : "border-slate-800/80"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white uppercase">{tier.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-amber-500">{tier.price}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">/ Annually</span>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-slate-800/50">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-semibold leading-relaxed">
                        <Check size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, tier: tier.name }));
                    setShowInquiryModal(true);
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider mt-8 cursor-pointer transition-all ${
                    tier.popular
                      ? "bg-amber-500 text-black hover:bg-amber-600 shadow-md shadow-amber-500/10"
                      : "bg-[#0f1720] border border-slate-700 hover:border-slate-550 text-white"
                  }`}
                >
                  Select Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join the Elite Block */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-800/80 bg-[#0a0f13] p-8 text-center space-y-4 max-w-xl mx-auto w-full shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <Sparkles className="text-amber-500 w-8 h-8 mb-2" />
          <h3 className="text-2xl font-black text-slate-100">Join the Elite</h3>
          <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
            Elevate your brand alongside industry leaders. Let's build something exceptional together.
          </p>
          <button 
            onClick={() => setShowInquiryModal(true)}
            className="w-full max-w-xs rounded-full bg-amber-500 hover:bg-amber-600 text-black py-4 text-xs font-black tracking-wider uppercase transition-colors shadow-md shadow-amber-500/10 cursor-pointer"
          >
            Become a Partner
          </button>
        </div>

      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0f13] border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-xl relative space-y-6"
            >
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="border-b border-slate-800/50 pb-4">
                <h4 className="text-lg font-black text-slate-100 uppercase tracking-wide">Sponsorship Inquiry</h4>
                <p className="text-xs text-slate-400 mt-1">Submit your details to get in touch with our team.</p>
              </div>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <h5 className="text-sm font-black text-slate-100">Proposal Sent!</h5>
                  <p className="text-xs text-slate-400 max-w-xs">We appreciate your interest. A representative will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-[#070b0e] border border-slate-800 rounded-xl text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-amber-500 text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Company</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-2.5 bg-[#070b0e] border border-slate-800 rounded-xl text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-amber-500 text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. partner@acme.com"
                      className="w-full px-4 py-2.5 bg-[#070b0e] border border-slate-800 rounded-xl text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-amber-500 text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Partnership Tier</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData(prev => ({ ...prev, tier: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-[#070b0e] border border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500 text-slate-300"
                    >
                      <option value="Supporting Sponsor">Supporting Sponsor</option>
                      <option value="Gold Partner">Gold Partner</option>
                      <option value="Development Partner">Development Partner</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-colors mt-2 cursor-pointer"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <OfficialPartners />
    </div>
  );
}

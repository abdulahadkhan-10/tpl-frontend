"use client";

import React, { useState } from "react";
import { 
  HeartHandshake, 
  Briefcase, 
  Building,
  Target
} from "lucide-react";
import { RiInstagramLine, RiYoutubeLine } from "react-icons/ri";
import OfficialPartners from "@/components/home/OfficialPartners";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'structure' | 'health'>('mission');

  return (
    <main className="bg-white text-slate-800 min-h-screen px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs text-amber-600 font-bold uppercase tracking-widest">ABOUT TALENT PRO LEAGUE</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-slate-900 tracking-tight">
            Passion. Purpose. <span className="text-amber-500">Legacy.</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            We are a hybrid commercial and community ecosystem engineered to discover grassroots talent, broadcast premium stories, and build sustainable pathways for local youth.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex overflow-x-auto md:overflow-x-visible whitespace-nowrap border-b border-slate-200 mb-12 max-w-4xl mx-auto justify-start md:justify-center scrollbar-none">
          {[
            { id: 'mission', label: 'Mission & Vision', icon: <Target className="w-4 h-4" /> },
            { id: 'structure', label: 'Company Structure', icon: <Building className="w-4 h-4" /> },
            { id: 'health', label: 'NHS & Well-Being', icon: <HeartHandshake className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 font-bold text-[10px] md:text-sm uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                activeTab === tab.id 
                  ? 'border-[#2a1236] text-[#2a1236] bg-[#2a1236]/5' 
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Body */}
        <div className="max-w-5xl mx-auto mb-20">
          
          {/* Mission & Vision */}
          {activeTab === 'mission' && (
            <div className="grid md:grid-cols-12 gap-8 items-start animate-fadeIn">
              <div className="md:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold uppercase text-slate-900 tracking-tight">Discover, Develop, and Excel</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  TPL is designed to rewrite player discovery norms. Historically, scouting has relied on subjective networks, excluding talent in underrepresented areas. Our mission is to leverage public digital media and systematic open trials to ensure equal access to semi-pro and pro opportunities.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Real Talent", desc: "No bias. We evaluate purely on technical and physical metrics." },
                    { title: "Real Stories", desc: "Uncut documentaries showing weekly apprentice struggles and successes." },
                    { title: "Real Emotion", desc: "Capturing the joy, pressure, and legacy of local grassroots squads." },
                    { title: "Real Impact", desc: "Investing back into local hubs to ensure physical activity flourishes." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-amber-600 text-sm mb-1 uppercase">{item.title}</h4>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm space-y-6">
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">THE 5-STEP VALUE WHEEL</span>
                <div className="space-y-4">
                  {[
                    "DISCOVER - Tap into unrecognized talent nationwide.",
                    "DEVELOP - Provide premium mentoring and fitness advice.",
                    "EXPOSE - Put players on screens watched by millions.",
                    "EMPOWER - Offer direct contracts, scholarships, and roles.",
                    "INSPIRE - Reinvest in grassroots pride and legacies."
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3 text-xs md:text-sm text-slate-700 items-start">
                      <span className="font-mono text-amber-600 font-bold">0{i+1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Company Structure */}
          {activeTab === 'structure' && (
            <div className="space-y-10 animate-fadeIn">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[10px] text-[#7C5800] font-black font-montserrat uppercase tracking-widest bg-[#FFF9E6] px-3 py-1 rounded-full border border-[#FFB800]/30">
                  Global Corporate Architecture
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-montserrat uppercase text-slate-900 tracking-tight">
                  The Enterprise Ecosystem
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-roboto">
                  Talent Pro League operates within a multi-tiered corporate structure, backed by international venture builders, commercial operators, and broadcast media platforms.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {/* 1. BRAHM Global Holdings */}
                <div className="h-full p-7 rounded-[8px] bg-white border border-[#E5E7EB] shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:border-[#FFB800] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                  <div className="space-y-5 flex-1 flex flex-col">
                    {/* Uniform Header Slot */}
                    <div className="h-20 flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB] shrink-0">
                      <img 
                        src="/images/brahm-logo.png" 
                        alt="BRAHM Global Holdings Logo" 
                        className="h-16 md:h-18 w-auto object-contain max-w-[170px] transition-transform duration-300 group-hover:scale-105" 
                      />
                      <span className="text-[9px] font-black font-montserrat text-[#7C5800] bg-[#FFF9E6] px-2.5 py-1 rounded-[4px] border border-[#FFB800]/30 uppercase tracking-widest text-right shrink-0">
                        Holding Co
                      </span>
                    </div>

                    {/* Uniform Title Slot */}
                    <div className="min-h-[52px] flex flex-col justify-center shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold font-montserrat uppercase tracking-widest block">PARENT HOLDING & VENTURE BUILDER</span>
                      <h4 className="font-black font-montserrat text-slate-900 uppercase text-lg tracking-tight mt-0.5">
                        BRAHM Global Holdings
                      </h4>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      {/* Headline Quote */}
                      <div className="p-3.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] space-y-1">
                        <p className="text-xs font-bold font-montserrat text-slate-900 uppercase tracking-wide">
                          Building Businesses That Endure.
                        </p>
                        <p className="text-[11px] text-slate-500 font-roboto italic leading-snug">
                          "Building enterprises with the ambition to shape industries and drive lasting value."
                        </p>
                      </div>

                      <p className="text-slate-600 text-xs font-roboto leading-relaxed">
                        BRAHM Global Holdings is an international venture builder and holding company creating exceptional businesses across technology, education, sport, hospitality, and premium consumer brands.
                      </p>

                      {/* Key Pillars */}
                      <ul className="space-y-2 text-xs font-roboto text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-1.5 shrink-0"></span>
                          <span>Strategic venture builder & long-term capital backing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-1.5 shrink-0"></span>
                          <span>Multi-sector ecosystem across Sport, Tech & Media</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-1.5 shrink-0"></span>
                          <span>Global enterprise vision & industry-shaping scale</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Uniform Footer Slot */}
                  <div className="pt-4 border-t border-[#E5E7EB] h-12 flex items-center justify-between shrink-0">
                    <a 
                      href="https://brahmglobalholdings.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold font-montserrat text-[#7C5800] hover:text-[#000000] uppercase tracking-wider transition-colors"
                    >
                      <span>Visit brahmglobalholdings.com</span>
                      <span className="text-base leading-none">→</span>
                    </a>
                  </div>
                </div>

                {/* 2. YFHA Group Limited */}
                <div className="h-full p-7 rounded-[8px] bg-white border border-[#E5E7EB] shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:border-[#000000] transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="space-y-5 flex-1 flex flex-col">
                    {/* Uniform Header Slot */}
                    <div className="h-20 flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB] shrink-0">
                      <div className="p-2.5 bg-slate-100 rounded-[4px] border border-slate-200 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-slate-800" />
                        <span className="font-bold text-slate-900 text-xs font-montserrat uppercase tracking-wider">YFHA</span>
                      </div>
                      <span className="text-[9px] font-black font-montserrat text-slate-700 bg-slate-100 px-2.5 py-1 rounded-[4px] border border-slate-200 uppercase tracking-widest text-right shrink-0">
                        Commercial
                      </span>
                    </div>

                    {/* Uniform Title Slot */}
                    <div className="min-h-[52px] flex flex-col justify-center shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold font-montserrat uppercase tracking-widest block">COMMERCIAL & OPERATIONS ARM</span>
                      <h4 className="font-black font-montserrat text-slate-900 uppercase text-lg tracking-tight mt-0.5">
                        YFHA Group Limited
                      </h4>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="p-3.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] space-y-1">
                        <p className="text-xs font-bold font-montserrat text-slate-900 uppercase tracking-wide">
                          Commercial & Operations Hub
                        </p>
                        <p className="text-[11px] text-slate-500 font-roboto italic leading-snug">
                          "Managing tournaments, corporate visibility & digital SaaS platforms."
                        </p>
                      </div>

                      <p className="text-slate-600 text-xs font-roboto leading-relaxed">
                        Manages core league registrations, tournament logistics, sponsorship packages, merchandise sales, and the athletic digital SaaS scouting subscription database.
                      </p>

                      {/* Key Pillars */}
                      <ul className="space-y-2 text-xs font-roboto text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0"></span>
                          <span>National Tournament revenue & ticketing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0"></span>
                          <span>Sponsorship packages & corporate rights</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0"></span>
                          <span>Apparel, kits, and digital scouting SaaS</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Uniform Footer Slot */}
                  <div className="pt-4 border-t border-[#E5E7EB] h-12 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-bold font-montserrat text-slate-400 uppercase tracking-wider">
                      Commercial Infrastructure & SaaS
                    </span>
                  </div>
                </div>

                {/* 3. TPL Media & Entertainment */}
                <div className="h-full p-7 rounded-[8px] bg-white border border-[#E5E7EB] shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:border-[#FFB800] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                  <div className="space-y-5 flex-1 flex flex-col">
                    {/* Uniform Header Slot */}
                    <div className="h-20 flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB] shrink-0">
                      <img 
                        src="/images/TPL_logo_Dark.png" 
                        alt="TPL Media & Entertainment Logo" 
                        className="h-12 md:h-14 w-auto object-contain max-w-[150px]" 
                      />
                      <span className="text-[9px] font-black font-montserrat text-[#7C5800] bg-[#FFF9E6] px-2.5 py-1 rounded-[4px] border border-[#FFB800]/30 uppercase tracking-widest text-right shrink-0">
                        Media & Broadcast
                      </span>
                    </div>

                    {/* Uniform Title Slot */}
                    <div className="min-h-[52px] flex flex-col justify-center shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold font-montserrat uppercase tracking-widest block">BROADCAST & ENTERTAINMENT ARM</span>
                      <h4 className="font-black font-montserrat text-slate-900 uppercase text-lg tracking-tight mt-0.5">
                        TPL Media & Entertainment
                      </h4>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="p-3.5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] space-y-1">
                        <p className="text-xs font-bold font-montserrat text-slate-900 uppercase tracking-wide">
                          Broadcast & Original Content
                        </p>
                        <p className="text-[11px] text-slate-500 font-roboto italic leading-snug">
                          "Uncut documentaries, reality TV series & global digital broadcasts."
                        </p>
                      </div>

                      <p className="text-slate-600 text-xs font-roboto leading-relaxed">
                        Captures raw grassroots sports stories, producing uncut documentaries, unscripted reality series, and digital broadcasts reaching global audiences.
                      </p>

                      {/* Key Pillars */}
                      <ul className="space-y-2 text-xs font-roboto text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-1.5 shrink-0"></span>
                          <span>Original documentary & reality series production</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-1.5 shrink-0"></span>
                          <span>YouTube network & ad-revenue distribution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#FFB800] rounded-full mt-1.5 shrink-0"></span>
                          <span>Digital player spotlights & brand media rights</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Uniform Footer Slot */}
                  <div className="pt-4 border-t border-[#E5E7EB] h-12 flex items-center justify-between gap-2 text-xs font-montserrat uppercase tracking-wider font-bold shrink-0">
                    <a 
                      href="https://instagram.com/talentproleague" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-[#1A1C1C] hover:text-pink-600 transition-colors"
                    >
                      <RiInstagramLine className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>@talentproleague</span>
                    </a>
                    <a 
                      href="https://youtube.com/@talentproleague" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-[#1A1C1C] hover:text-red-600 transition-colors"
                    >
                      <RiYoutubeLine className="w-4 h-4 text-red-600 shrink-0" />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[4px] bg-[#F8F9FA] border border-[#E5E7EB] text-center text-xs text-slate-500 max-w-2xl mx-auto font-roboto">
                Note: Operational initiatives are strategically structured across Brahm Global Holdings, YFHA Group, and TPL Media & Entertainment to maximize brand reach, commercial sustainability, and global exposure.
              </div>
            </div>
          )}

          {/* NHS & Well-Being */}
          {activeTab === 'health' && (
            <div className="grid md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-mono text-emerald-600 uppercase font-bold">HEALTHIER LIFESTYLES</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase">In Partnership with the NHS</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  TPL programs incorporate NHS guidelines to tackle obesity, build teamwork, improve physical fitness, and provide accessible spaces for community inclusion.
                </p>
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-800 leading-relaxed">
                  "Talent is everywhere. Healthy, active lives should be too." By aligning with regional trusts, we ensure our players access professional wellness support.
                </div>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Physical Well-being", desc: "Active match structures that encourage daily cardiovascular training and physical metrics tracking." },
                  { title: "Mental Wellness", desc: "1-to-1 mentoring to reduce youth anxiety, build self-confidence, and foster positive self-worth." },
                  { title: "Teamwork & Discipline", desc: "Football teaches critical cooperation skills that shape characters and build reliable future professionals." },
                  { title: "Disadvantaged Support", desc: "We target underrepresented areas, providing entry exemptions for talent unable to afford standard kits." }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm space-y-2">
                    <h4 className="font-bold text-slate-900 uppercase text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div> 

      </div>
      <OfficialPartners />
    </main>
  );
}

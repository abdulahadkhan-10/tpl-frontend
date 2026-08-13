"use client";

import React, { useState } from "react";
import { 
  HeartHandshake, 
  Briefcase, 
  Building,
  Target
} from "lucide-react";
import OfficialPartners from "@/components/home/OfficialPartners";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'structure' | 'health'>('mission');

  return (
    <main className="bg-white text-slate-800 min-h-screen py-16 px-4 md:py-24 font-sans">
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
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h3 className="text-2xl font-bold uppercase text-slate-900">The Hybrid Enterprise Model</h3>
                <p className="text-xs md:text-sm text-slate-600">
                  We balance commercial efficiency with authentic social impact by separating operations into two distinct arms managed under YFHA Group.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Commercial */}
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-400/10 rounded-xl">
                      <Briefcase className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-lg">YFHA Group Limited</h4>
                      <span className="text-[10px] text-slate-500 font-mono">COMMERCIAL ARM</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Manages core league registrations, sponsorship packages, television contracts, merchandise sales, and the digital scouting subscription SaaS database.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      National Tournament revenue & ticketing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      YouTube ad & Premium views share
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                      Apparel, kits, and corporate visibility packages
                    </li>
                  </ul>
                </div>

                {/* CIC Foundation */}
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl">
                      <HeartHandshake className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-lg">TPL Foundation CIC</h4>
                      <span className="text-[10px] text-slate-500 font-mono">COMMUNITY ARM (COMMUNITY INTEREST COMPANY)</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    A non-profit vehicle dedicated to grassroots empowerment, securing local government grants, hosting youth safety workshops, and providing scholarships.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      NHS healthy lifestyles and mental wellness
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Free access trials for disadvantaged areas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      Local employment & accredited training schemes
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-100/50 border border-slate-200 text-center text-xs text-slate-500 max-w-xl mx-auto">
                Note: In initial startup stages, all actions run under YFHA Group Limited to minimize overhead. The CIC structure activates sequentially as regional operations scale.
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

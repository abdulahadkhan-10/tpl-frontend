"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, UserRound, ShieldAlert, Award } from "lucide-react";

export default function RegisterPlayerPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("MID");
  const [age, setAge] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-sans p-4 relative">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200/50 p-8 space-y-6 relative overflow-hidden">
        
        {/* Top actions */}
        <div className="flex justify-between items-center">
          <Link 
            href="/register"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
          <span className="text-[10px] bg-indigo-100 text-indigo-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Step {step} of 3
          </span>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="text-center space-y-2">
              <UserRound className="w-12 h-12 text-indigo-600 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Player Info</h2>
              <p className="text-sm text-slate-500 font-medium">Enter your personal registration details.</p>
            </div>

            <div className="space-y-1">
              <label htmlFor="fullName" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Cristiano Junior"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="position" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Preferred Position</label>
                <select
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                  <option value="GK">Goalkeeper (GK)</option>
                  <option value="DEF">Defender (DEF)</option>
                  <option value="MID">Midfielder (MID)</option>
                  <option value="ATT">Forward (ATT)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="age" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Age</label>
                <input
                  id="age"
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
            >
              Continue to Agreements
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <ShieldAlert className="w-12 h-12 text-indigo-600 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Medical & Agreements</h2>
              <p className="text-sm text-slate-500 font-medium">Verify you accept the TPL waiver and medical consent terms.</p>
            </div>

            <div className="space-y-4 max-h-[220px] overflow-y-auto border border-slate-200 rounded-xl p-3 bg-slate-50 text-[11px] text-slate-500 leading-relaxed no-scrollbar">
              <p className="font-bold text-slate-700 mb-1">1. Consent to Participate</p>
              <p>I hereby request that I be allowed to participate in the trials and subsequent season of the Talent Pro League. I certify that I am in fit physical condition to execute all required drills and matches.</p>
              <p className="font-bold text-slate-700 mt-2 mb-1">2. Medical Waiver</p>
              <p>In the event of physical injury, I authorize the TPL staff to request secure medical services and agree to assume all costs associated with treatment.</p>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
            >
              Accept and Complete Registration
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Onboarded!</h3>
            <p className="text-sm text-slate-500">Congratulations <strong className="text-slate-800">{fullName}</strong>! You have been successfully registered as a player for the season.</p>
            
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-3 text-left w-full">
              <Award className="w-8 h-8 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[10px] text-indigo-500 font-black uppercase tracking-wider block">Position Assigned</span>
                <span className="text-xs font-bold text-slate-800">{position} • Roster Status: Pending Manager Verification</span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full bg-slate-900 hover:bg-black text-white text-center font-bold py-3 rounded-xl transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

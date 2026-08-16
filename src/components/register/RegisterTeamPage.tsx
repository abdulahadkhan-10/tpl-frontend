"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, CreditCard, Shield, Users } from "lucide-react";

export default function RegisterTeamPage() {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [email, setEmail] = useState("");
  
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
          <span className="text-[10px] bg-amber-100 text-amber-700 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Step {step} of 3
          </span>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="text-center space-y-2">
              <Users className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Team Details</h2>
              <p className="text-sm text-slate-500 font-medium">Enter details about the team you are registering.</p>
            </div>

            <div className="space-y-1">
              <label htmlFor="teamName" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Team Name</label>
              <input
                id="teamName"
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Riyadh Falcons"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="managerName" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Manager Name</label>
              <input
                id="managerName"
                type="text"
                required
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="e.g. Coach Abdullah"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
            >
              Continue to Payment
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <CreditCard className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Registration Fee</h2>
              <p className="text-sm text-slate-500 font-medium">Complete team entry fee to secure league slot.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Payment</span>
                <span className="text-2xl font-black text-slate-800">$250.00</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase">Secure slot</span>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
            >
              Simulate Secure Payment
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Team Registered!</h3>
            <p className="text-sm text-slate-500">Your team <strong className="text-slate-800">{teamName}</strong> has been secured for TPL. Use the invite link below to onboard your roster players.</p>
            
            <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 select-all overflow-x-auto whitespace-nowrap">
              https://talentproleague.com/register/player?team={encodeURIComponent(teamName)}
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

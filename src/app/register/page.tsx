"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Users, UserRound } from "lucide-react";

export default function SelectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-sans p-4 relative">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/80 hover:text-white font-bold transition-all text-sm cursor-pointer group bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-3xl w-full text-center space-y-6 bg-black/45 p-6 md:p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Register for the League</h1>
          <p className="text-sm md:text-base text-gray-200">Select how you want to join the Talent Pro League.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Team Manager Card */}
          <Link
            href="/register/team"
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Users size={32} strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Register a New Team</h2>
            <p className="text-xs md:text-sm text-slate-500 mb-6 flex-1">As a Team Manager, you will register your team, pay the fee, and invite your 15 players.</p>
            <span className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 text-center text-sm md:text-base rounded-xl transition-all">Get Started</span>
          </Link>

          {/* Player Card */}
          <Link
            href="/register/player"
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <UserRound size={32} strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Register as a Player</h2>
            <p className="text-xs md:text-sm text-slate-500 mb-6 flex-1">Join an existing team by filling out your personal details, medical info, and consent forms.</p>
            <span className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 text-center text-sm md:text-base rounded-xl transition-all">Join a Team</span>
          </Link>
        </div>

        {/* Redirect to Log In */}
        <div className="text-center pt-6">
          <p className="text-sm text-gray-200 font-medium">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="font-bold text-amber-400 hover:underline cursor-pointer"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

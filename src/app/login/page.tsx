"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowLeft, LogIn, CheckCircle2, User, Users } from "lucide-react";

export default function LoginPage() {
  const [loginType, setLoginType] = useState<"team" | "player">("team");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const isTeam = loginType === "team";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-sans p-4 relative">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200/50 p-8 space-y-6 relative overflow-hidden transition-all duration-300">
        
        {/* Dynamic decorative gradients */}
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl pointer-events-none transition-all duration-500 ${isTeam ? "bg-amber-500/10" : "bg-indigo-500/10"}`} />
        <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-xl pointer-events-none transition-all duration-500 ${isTeam ? "bg-amber-500/5" : "bg-indigo-500/5"}`} />

        {/* Top actions */}
        <div className="flex justify-start">
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Logo and title */}
        <div className="text-center space-y-2">
          <Image src="/images/TPL_logo_Dark.png" alt="TPL Logo" width={80} height={80} className="mx-auto object-contain mb-2" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Welcome Back</h2>
          <p className="text-sm text-slate-500 font-medium">Access your Talent Pro League account portal.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/30 gap-1.5">
          <button
            type="button"
            onClick={() => setLoginType("team")}
            className={`flex-grow flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer ${
              isTeam
                ? "bg-amber-500 text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Login</span>
          </button>

          <button
            type="button"
            onClick={() => setLoginType("player")}
            className={`flex-grow flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer ${
              !isTeam
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Player Login</span>
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-800">Login Successful!</h3>
            <p className="text-xs text-slate-500">Redirecting to TPL home portal...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-bold text-slate-600 uppercase tracking-wide">Password</label>
                <a href="#forgot" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2 flex items-center justify-center gap-2 text-white ${
                isTeam 
                  ? "bg-amber-500 hover:bg-amber-600 hover:shadow-lg" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Log In as {isTeam ? "Team Manager" : "Player"}</span>
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className={`font-bold hover:underline ${isTeam ? "text-amber-600" : "text-indigo-600"}`}
            >
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBaseUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to process request. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error occurred. Please verify backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 relative z-10 space-y-6 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1C1C] border border-[#FFB800]/40 shadow-md mb-1">
            <ShieldCheck size={28} className="text-[#FFB800]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-montserrat tracking-tight text-[#1A1C1C] uppercase">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            {isSubmitted
              ? "Check your inbox for password recovery instructions."
              : "Enter your registered email address and we'll dispatch a secure password reset link."}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
            <AlertTriangle size={16} className="shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-6">
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
              <p className="text-sm font-extrabold text-emerald-900 font-montserrat uppercase">
                Reset Link Dispatched
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                If an account exists for <strong className="font-bold text-emerald-900">{email}</strong>, you will receive an email shortly with a secure link valid for 30 minutes.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="w-full py-3 bg-[#F8F9FA] hover:bg-slate-100 border border-[#E5E7EB] text-slate-700 text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Try Another Email
              </button>

              <Link
                href="/login"
                className="w-full py-3.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] text-xs font-black font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold font-montserrat uppercase tracking-wider text-slate-700 block">
                Account Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@talentproleague.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]/30 focus:border-[#FFB800] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] text-xs font-black font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#FFB800]" />
                  <span>Dispatching Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

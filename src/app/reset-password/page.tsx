"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, KeyRound, Loader2, ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setErrorMsg("Missing or invalid password reset token. Please request a new link.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters in length.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBaseUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to reset password. The link may have expired.");
      }
    } catch (err) {
      setErrorMsg("Network error occurred. Please verify server connection.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !isSuccess) {
    return (
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
          <AlertTriangle size={28} />
        </div>
        <h1 className="text-2xl font-black font-montserrat uppercase text-[#1A1C1C]">
          Invalid Reset Link
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          This password reset link is invalid or incomplete. Please request a new password recovery email.
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex items-center justify-center w-full py-3.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] text-xs font-black font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-md"
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80 relative z-10 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1C1C] border border-[#FFB800]/40 shadow-md mb-1">
          <KeyRound size={28} className="text-[#FFB800]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-montserrat tracking-tight text-[#1A1C1C] uppercase">
          Set New Password
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          {isSuccess
            ? "Your account credentials have been successfully updated."
            : "Create a secure new password for your Talent Pro League account."}
        </p>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
          <AlertTriangle size={16} className="shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="space-y-6 text-center">
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
            <p className="text-sm font-extrabold text-emerald-900 font-montserrat uppercase">
              Password Reset Complete
            </p>
            <p className="text-xs text-emerald-700 font-medium">
              Your password has been changed securely. You can now access your dashboard.
            </p>
          </div>

          <Link
            href="/login"
            className="w-full py-3.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] text-xs font-black font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Proceed to Sign In</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="pass" className="text-xs font-bold font-montserrat uppercase tracking-wider text-slate-700 block">
              New Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="pass"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]/30 focus:border-[#FFB800] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPass" className="text-xs font-bold font-montserrat uppercase tracking-wider text-slate-700 block">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="confirmPass"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFB800]/30 focus:border-[#FFB800] transition-all"
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
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Confirm & Reset Password</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<div className="text-white text-xs font-bold font-montserrat uppercase">Loading security protocol...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 text-center space-y-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-2xl font-black font-montserrat tracking-tight text-[#1A1C1C]">
            Something went wrong!
          </h2>
          
          <p className="text-slate-500 text-sm mt-2">
            An unexpected error occurred while rendering this page. Our team has been notified.
          </p>

          <div className="mt-8">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold bg-[#1A1C1C] text-white hover:bg-black transition-all shadow-md group cursor-pointer"
            >
              <RefreshCcw size={18} className="group-hover:-rotate-90 transition-transform duration-300" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

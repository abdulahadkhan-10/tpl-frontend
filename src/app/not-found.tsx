import Link from "next/link";
import { Ghost, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 text-center space-y-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1A1C1C]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Ghost size={32} />
          </div>
          
          <h2 className="text-4xl font-black font-montserrat tracking-tight text-[#1A1C1C]">
            404
          </h2>
          <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wider mt-1">
            Page Not Found
          </h3>
          
          <p className="text-slate-500 text-sm mt-2">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold bg-[#FFB800] text-black hover:bg-[#E5A600] transition-all shadow-md group cursor-pointer"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

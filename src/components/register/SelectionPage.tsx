"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const SelectionPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-outfit p-4 relative">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <button 
          onClick={() => window.location.href = '/'} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-all text-sm cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="max-w-4xl w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Register for the League</h1>
          <p className="text-lg text-slate-600">Select how you want to join the Talent Pro League.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Team Manager Card */}
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center hover:shadow-2xl hover:border-amber-500 transition-all cursor-pointer group"
               onClick={() => router.push('/register/team')}>
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Register a New Team</h2>
            <p className="text-slate-500 mb-8 flex-1">As a Team Manager, you will register your team, pay the fee, and invite your 15 players.</p>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 text-lg rounded-xl">Get Started</Button>
          </div>

          {/* Player Card */}
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center hover:shadow-2xl hover:border-indigo-500 transition-all cursor-pointer group"
               onClick={() => router.push('/register/player')}>
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Register as a Player</h2>
            <p className="text-slate-500 mb-8 flex-1">Join an existing team by filling out your personal details, medical info, and consent forms.</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 text-lg rounded-xl">Join a Team</Button>
          </div>
        </div>

        {/* Redirect to Log In */}
        <div className="text-center pt-6">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account?{' '}
            <button 
              onClick={() => window.location.href = '/login'} 
              className="font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

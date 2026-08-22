"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/store/slices/loginApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { Mail, Lock, ArrowLeft, LogIn, ShieldAlert, CheckCircle2, User, Eye, EyeOff } from 'lucide-react';
import { RiTeamLine } from 'react-icons/ri';

const tplLogo = '/images/TPL_logo_Dark.png';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'team' | 'player'>('team');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const result = await login({ email, password, role: loginType }).unwrap();
      dispatch(setCredentials({
        user: result.user || result.team,
        role: result.role || (result.user?.roleType?.toLowerCase()) || loginType,
        token: result.token
      }));
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) {
      setLocalError(err?.data?.error || err?.data?.message || 'Login failed. Please try again.');
    }
  };

  const isTeam = loginType === 'team';

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-outfit p-4 pt-16">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200/50 p-8 space-y-6 relative overflow-hidden transition-all duration-300">

        {/* Dynamic decorative gradients */}
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl pointer-events-none transition-all duration-500 ${isTeam ? 'bg-amber-500/10' : 'bg-indigo-500/10'}`} />
        <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-xl pointer-events-none transition-all duration-500 ${isTeam ? 'bg-amber-500/5' : 'bg-indigo-500/5'}`} />

        {/* Top actions */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Logo and title */}
        <div className="text-center space-y-2">
          <img src={tplLogo} alt="TPL Logo" className="h-16 mx-auto object-contain mb-2" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Welcome Back</h2>
          <p className="text-sm text-slate-500 font-medium">Access your Talent Pro League account portal.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/30 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setLoginType('team');
              setLocalError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer ${isTeam
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
              }`}
          >
            <RiTeamLine className="w-4 h-4" />
            <span>Team</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginType('player');
              setLocalError(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer ${!isTeam
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
              }`}
          >
            <User className="w-4 h-4" />
            <span>Player Login</span>
          </button>
        </div>

        {/* Alerts */}
        {localError && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-xs text-rose-700 font-medium animate-fadeIn">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p>{localError}</p>
          </div>
        )}

        {success && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2.5 text-xs text-emerald-700 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
            <p>Login successful! Launching Portal...</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <Input
                id="email"
                type="email"
                placeholder={isTeam ? "team@tpl.com" : "player@tpl.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`pl-10 h-11 bg-white/70 border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-0 text-sm transition-all duration-350 ${isTeam ? 'focus:border-amber-500 focus:ring-amber-500' : 'focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</Label>
              <Link href="/forgot-password" className="text-[11px] font-bold text-slate-500 hover:text-black transition-colors">Forgot?</Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`pl-10 pr-10 h-11 bg-white/70 border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-0 text-sm transition-all duration-350 ${isTeam ? 'focus:border-amber-500 focus:ring-amber-500' : 'focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || success}
            className={`w-full h-11 text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-6 duration-350 ${isTeam
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
              }`}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </>
            )}
          </Button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-medium">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className={`font-bold hover:underline cursor-pointer duration-350 ${isTeam ? 'text-amber-600' : 'text-indigo-650'
                }`}
            >
              Register here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

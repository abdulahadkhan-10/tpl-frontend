"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Sliders, Shield, Edit2, Check, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials } from '@/store/slices/authSlice';
import { useUpdateMeMutation, useGetMeQuery } from '@/store/slices/loginApi';
import { useState, useEffect } from 'react';
export default function SettingsPage() {
  const springConfig = { type: 'spring', damping: 15, stiffness: 100 } as const;

  const { user: reduxUser, role, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateMe] = useUpdateMeMutation();
  const { data: freshData } = useGetMeQuery(undefined, { skip: !isAuthenticated });

  const user = freshData?.user || freshData?.team || reduxUser;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateMe(formData).unwrap();
      const updatedUser = result.user || result.team;

      // Update local state and Redux
      dispatch(setCredentials({ user: updatedUser, role: role as any }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-500 tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
              <Shield size={14} />
              TPL Portal Control
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.03em] leading-tight">
              Portal Settings
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Configure portal settings, administrator credentials, custom notifications, and security protocols.
            </p>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Admin Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springConfig}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-650 rounded-xl">
                  <User size={18} />
                </div>
                <span className="text-sm font-bold text-slate-900 uppercase">
                  User Profile
                </span>
              </div>

              {isAuthenticated && (
                isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                      title="Save Changes"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          fullName: user?.fullName || user?.name || '',
                          email: user?.email || ''
                        });
                      }}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit2 size={16} />
                  </button>
                )
              )}
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex flex-col">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Full Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span className="font-black text-slate-800 mt-1">{user?.fullName || user?.name || 'Not Available'}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Registered Email</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-black text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span className="font-black text-indigo-600 mt-1">{user?.email || 'Not Available'}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Access Level Role</span>
                <span className="font-black mt-1 uppercase text-[9px] bg-slate-100 px-2 py-0.5 rounded-full w-fit text-indigo-600">
                  {role || 'Unknown'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Portal Configurations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springConfig, delay: 0.05 }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/50 pb-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-650 rounded-xl">
                <Sliders size={18} />
              </div>
              <span className="text-sm font-bold text-slate-900 uppercase">
                Portal Configurations
              </span>
            </div>

            <div className="space-y-4 text-xs font-bold text-slate-600">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                <span>Enable Real-time Match Scouting alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 shrink-0" />
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                <span>Enable Live Streaming Broadcast notices</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 shrink-0" />
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                <span>Dynamic high contrast layout widgets</span>
                <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 shrink-0" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

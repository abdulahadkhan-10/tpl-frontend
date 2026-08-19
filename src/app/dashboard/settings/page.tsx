"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Lock, User, Bell, Shield, Save } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials } from '@/store/slices/authSlice';
import { useUpdateMeMutation, useGetMeQuery } from '@/store/slices/loginApi';

export default function SettingsPage() {
  const { user: reduxUser, role, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const { data: freshData } = useGetMeQuery(undefined, { skip: !isAuthenticated });

  const activeUser = freshData?.user || freshData?.team || reduxUser;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  useEffect(() => {
    if (activeUser) {
      setFormData({
        fullName: activeUser.fullName || activeUser.name || '',
        email: activeUser.email || '',
      });
    }
  }, [activeUser]);

  const handleSave = async () => {
    try {
      const result = await updateMe(formData).unwrap();
      const updatedUser = result.user || result.team;
      dispatch(setCredentials({ user: updatedUser, role: role as any, token: (reduxUser as any)?.token }));
      // Optionally show a success toast here
    } catch (error) {
      console.error('Failed to update profile', error);
      // Optionally show an error toast here
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex items-center gap-3">
        <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
          <AnimatedIcon name="settings" active size={28} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
            Account & Security Settings
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-roboto">
            Update personal profile info, notifications, password credentials, and security preferences.
          </p>
        </div>
      </div>

      {/* Settings Form Container */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-xs space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
          <h2 className="text-sm font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            Security & Credentials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isUpdating}
            className="px-6 py-3 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save size={16} className="text-[#FFB800]" />
            <span>{isUpdating ? 'Saving...' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

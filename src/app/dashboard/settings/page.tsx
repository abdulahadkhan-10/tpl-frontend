"use client";

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Lock, 
  User, 
  Bell, 
  Shield, 
  Save, 
  Eye, 
  EyeOff, 
  Users, 
  ArrowRightLeft, 
  Mail, 
  Phone, 
  X, 
  CheckCircle2, 
  AlertCircle,
  History,
  Calendar,
  Clock,
} from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials } from '@/store/slices/authSlice';
import { 
  useUpdateMeMutation, 
  useGetMeQuery, 
  useTransferTeamManagerMutation 
} from '@/store/slices/loginApi';

export default function SettingsPage() {
  const { user: reduxUser, role, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const [transferTeamManager, { isLoading: isTransferring }] = useTransferTeamManagerMutation();
  const { data: freshData, refetch } = useGetMeQuery(undefined, { skip: !isAuthenticated });

  const activeUser = freshData?.user || freshData?.team || reduxUser;
  const managers = freshData?.team?.managers || [];
  const managerHistory = freshData?.team?.managerHistory || [];


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  // Transfer Modal State
  const [selectedManager, setSelectedManager] = useState<any | null>(null);
  const [transferForm, setTransferForm] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    role: '',
  });
  const [transferError, setTransferError] = useState('');
  const [transferSuccess, setTransferSuccess] = useState('');

  useEffect(() => {
    if (activeUser) {
      setFormData(prev => ({
        ...prev,
        fullName: activeUser.fullName || activeUser.name || '',
        email: activeUser.email || '',
      }));
    }
  }, [activeUser]);

  const handleSave = async () => {
    setStatusMessage(null);
    try {
      const result = await updateMe(formData).unwrap();
      const updatedUser = result.user || result.team;
      dispatch(setCredentials({ user: updatedUser, role: role as any, token: (reduxUser as any)?.token }));
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      setStatusMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error: any) {
      console.error('Failed to update profile', error);
      setStatusMessage({ 
        type: 'error', 
        text: error?.data?.error || 'Failed to save settings. Please check your current password.' 
      });
    }
  };

  const handleOpenTransferModal = (manager: any) => {
    setSelectedManager(manager);
    setTransferForm({
      fullName: '',
      email: '',
      contactNumber: '',
      role: manager.role || 'Assistant Manager',
    });
    setTransferError('');
    setTransferSuccess('');
  };

  const handleCloseTransferModal = () => {
    setSelectedManager(null);
    setTransferForm({ fullName: '', email: '', contactNumber: '', role: '' });
    setTransferError('');
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedManager) return;
    setTransferError('');

    if (!transferForm.fullName.trim() || !transferForm.contactNumber.trim()) {
      setTransferError('Please provide both the new manager full name and contact number.');
      return;
    }

    try {
      await transferTeamManager({
        managerId: selectedManager.id,
        fullName: transferForm.fullName.trim(),
        email: transferForm.email.trim() || undefined,
        contactNumber: transferForm.contactNumber.trim(),
        role: transferForm.role.trim() || selectedManager.role,
      }).unwrap();

      refetch();
      setTransferSuccess(`Manager spot successfully transferred to ${transferForm.fullName}!`);
      setTimeout(() => {
        handleCloseTransferModal();
        setStatusMessage({ 
          type: 'success', 
          text: `Manager spot successfully transferred to ${transferForm.fullName}!` 
        });
      }, 900);
    } catch (error: any) {
      console.error('Failed to transfer manager', error);
      setTransferError(error?.data?.error || 'Failed to transfer manager. Please try again.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
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
            Update personal profile info, notifications, password credentials, and manager transfer options.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl border text-sm font-bold flex items-center gap-2 ${
          statusMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {statusMessage.type === 'success' ? <Shield size={16} /> : <Lock size={16} />}
          {statusMessage.text}
        </div>
      )}

      {/* Transfer Manager Section (Displayed for Teams) */}
      {(role === 'team' || managers.length > 0) && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#FFF9E6] text-[#7C5800] rounded-lg border border-[#FFB800]/40">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-sm md:text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider">
                  Transfer Manager
                </h2>
                <p className="text-xs text-slate-500 font-roboto">
                  Reassign or handover any manager spot to a new person with updated contact details.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
              {managers.length} Active {managers.length === 1 ? 'Manager' : 'Managers'}
            </span>
          </div>

          {managers.length === 0 ? (
            <div className="p-6 text-center text-slate-500 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs">
              No team managers registered yet. You can add managers from the Managers tab.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {managers.map((manager: any) => (
                <div 
                  key={manager.id} 
                  className="bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] p-5 space-y-4 hover:border-[#FFB800] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1A1C1C] text-[#FFB800] font-montserrat font-extrabold flex items-center justify-center text-sm uppercase">
                        {manager.fullName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'TM'}
                      </div>
                      <div>
                        <h3 className="font-bold font-montserrat text-sm text-[#1A1C1C]">
                          {manager.fullName}
                        </h3>
                        <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#FFF9E6] border border-[#FFB800]/40 text-[#7C5800] text-[10px] font-extrabold font-montserrat uppercase tracking-wider rounded-md">
                          {manager.role || 'Team Staff'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-[#E5E7EB] pt-3">
                    {manager.email && (
                      <div className="flex items-center gap-2 truncate">
                        <Mail size={13} className="text-[#7C5800] shrink-0" />
                        <span className="truncate">{manager.email}</span>
                      </div>
                    )}
                    {manager.contactNumber && (
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-[#7C5800] shrink-0" />
                        <span>{manager.contactNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenTransferModal(manager)}
                      className="w-full py-2.5 px-4 bg-white hover:bg-[#1A1C1C] text-[#1A1C1C] hover:text-[#FFB800] border border-[#E5E7EB] hover:border-[#1A1C1C] rounded-xl text-xs font-bold font-montserrat uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow"
                    >
                      <ArrowRightLeft size={14} className="text-[#FFB800]" />
                      <span>Transfer Manager</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Managers & Tenure History */}
          {managerHistory.length > 0 && (
            <div className="pt-6 border-t border-[#E5E7EB] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History size={18} className="text-[#7C5800]" />
                  <h3 className="text-xs md:text-sm font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider">
                    Previous Managers & Tenure History
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {managerHistory.length} Past Records
                </span>
              </div>

              <div className="space-y-3">
                {managerHistory.map((historyItem: any) => (
                  <div
                    key={historyItem.id}
                    className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-700 font-montserrat font-bold flex items-center justify-center text-xs uppercase shrink-0">
                        {historyItem.fullName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'PM'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1A1C1C] font-montserrat text-sm">{historyItem.fullName}</span>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase rounded">
                            {historyItem.role || 'Former Staff'}
                          </span>
                        </div>
                        {historyItem.transferredTo && (
                          <p className="text-[11px] text-slate-500 mt-0.5 font-roboto">
                            Handed over to: <span className="font-semibold text-slate-700">{historyItem.transferredTo}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:text-right">
                      <div className="flex items-center gap-1.5 text-slate-500 font-roboto">
                        <Calendar size={13} className="text-slate-400" />
                        <span>
                          {new Date(historyItem.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} – {new Date(historyItem.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#FFF9E6] border border-[#FFB800]/40 text-[#7C5800] font-bold font-montserrat rounded-lg flex items-center gap-1 text-[10px] uppercase">
                        <Clock size={11} />
                        <span>
                          {(() => {
                            const start = new Date(historyItem.startDate);
                            const end = new Date(historyItem.endDate);
                            const diffDays = Math.max(1, Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
                            if (diffDays < 30) return `${diffDays} days tenure`;
                            const months = Math.floor(diffDays / 30.4375);
                            if (months < 12) return `${months} mo tenure`;
                            const years = Math.floor(months / 12);
                            const remMonths = months % 12;
                            return remMonths > 0 ? `${years}y ${remMonths}m tenure` : `${years} yr tenure`;
                          })()}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}


      {/* Account & Profile Form Container */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-xs space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">
                {role === 'team' ? 'Team Name' : 'Full Name'}
              </label>
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
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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

      {/* Transfer Manager Modal */}
      {selectedManager && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl max-w-lg w-full overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-[#1A1C1C] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFF9E6]/10 text-[#FFB800] rounded-xl border border-[#FFB800]/30">
                  <ArrowRightLeft size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold font-montserrat text-base text-white uppercase tracking-tight">
                    Transfer Manager Spot
                  </h3>
                  <p className="text-xs text-slate-400 font-roboto">
                    Reassign {selectedManager.fullName}&apos;s spot to a new person
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseTransferModal}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleTransferSubmit} className="p-6 space-y-4">
              {transferError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{transferError}</span>
                </div>
              )}

              {transferSuccess && (
                <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{transferSuccess}</span>
                </div>
              )}

              {/* Current Manager Summary Badge */}
              <div className="p-3 bg-[#FFF9E6] border border-[#FFB800]/40 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Current Position:</span>
                <span className="font-bold text-[#7C5800] uppercase font-montserrat">
                  {selectedManager.fullName} ({selectedManager.role || 'Staff'})
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">
                  New Manager Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={transferForm.fullName}
                  onChange={(e) => setTransferForm({ ...transferForm, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">
                  New Manager Contact / Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +44 7911 123456"
                  value={transferForm.contactNumber}
                  onChange={(e) => setTransferForm({ ...transferForm, contactNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">
                  New Manager Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. alex.johnson@example.com"
                  value={transferForm.email}
                  onChange={(e) => setTransferForm({ ...transferForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">
                  Role / Designation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Head Coach, Assistant Manager, Technical Lead"
                  value={transferForm.role}
                  onChange={(e) => setTransferForm({ ...transferForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseTransferModal}
                  disabled={isTransferring}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isTransferring}
                  className="px-5 py-2.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ArrowRightLeft size={15} />
                  <span>{isTransferring ? 'Transferring...' : 'Confirm Transfer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


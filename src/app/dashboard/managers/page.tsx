"use client";

import React, { useState } from 'react';
import { UserCheck, Plus, Mail, Shield, Phone, X, Save } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetMeQuery, useAddTeamManagerMutation } from '@/store/slices/loginApi';

export default function ManagersPage() {
  const { role, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: freshData, refetch } = useGetMeQuery(undefined, { skip: !isAuthenticated });
  const [addTeamManager, { isLoading: isAdding }] = useAddTeamManagerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    role: 'Assistant Manager',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const managers = freshData?.team?.managers || [];

  const handleAddManager = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await addTeamManager(formData).unwrap();
      refetch();
      setIsModalOpen(false);
      setFormData({ fullName: '', email: '', contactNumber: '', role: 'Assistant Manager' });
    } catch (error: any) {
      setErrorMsg(error?.data?.error || 'Failed to add manager. Please try again.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF9E6] rounded-xl border border-[#FFB800]/40">
            <AnimatedIcon name="managers" active size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Team Managers & Technical Staff
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-roboto">
              Manage head coaches, assistant staff, and portal access rights.
            </p>
          </div>
        </div>

        {role === 'team' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={16} className="text-[#FFB800]" />
            <span>Add Manager</span>
          </button>
        )}
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managers.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 bg-white border border-[#E5E7EB] rounded-2xl">
            No managers found. Click "Add Manager" to add one.
          </div>
        ) : (
          managers.map((manager: any) => (
            <div key={manager.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-4 hover:border-[#FFB800] transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black text-[#FFB800] font-montserrat font-extrabold flex items-center justify-center text-base uppercase">
                    {manager.fullName?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold font-montserrat text-base text-[#1A1C1C]">{manager.fullName}</h3>
                    <p className="text-xs text-slate-500 font-medium">{manager.role}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-[#FFF9E6] border border-[#FFB800]/40 text-[#7C5800] text-[10px] font-extrabold font-montserrat uppercase tracking-wider rounded-full">
                  {manager.role === 'Head Coach' ? 'Primary Lead' : 'Staff'}
                </span>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] space-y-2 text-xs text-slate-600">
                {manager.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#7C5800]" />
                    <span>{manager.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#7C5800]" />
                  <span>{manager.contactNumber}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Manager Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
              <h2 className="font-bold font-montserrat text-[#1A1C1C]">Add New Manager</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddManager} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="E.g. David Miller"
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="E.g. d.miller@tpl.com"
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Contact Number</label>
                <input
                  required
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  placeholder="+91 98765 12345"
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider font-montserrat">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-medium focus:outline-none focus:border-[#FFB800]"
                >
                  <option value="Head Coach">Head Coach</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Physio">Physio</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isAdding}
                  className="w-full py-3 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} className="text-[#FFB800]" />
                  <span>{isAdding ? 'Adding...' : 'Save Manager'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

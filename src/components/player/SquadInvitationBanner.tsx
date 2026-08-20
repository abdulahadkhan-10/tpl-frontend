"use client";

import React, { useState } from 'react';
import { Shield, Check, X, Bell, Trophy, MapPin, Users, Loader2 } from 'lucide-react';
import { useGetMyInvitationsQuery, useRespondToInvitationMutation, useGetMeQuery } from '@/store/slices/loginApi';

export default function SquadInvitationBanner() {
  const { data: inviteData, isLoading, refetch } = useGetMyInvitationsQuery();
  const { refetch: refetchMe } = useGetMeQuery();
  const [respondToInvitation, { isLoading: isResponding }] = useRespondToInvitationMutation();

  const [actioningId, setActioningId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const invitations = inviteData?.invitations || [];

  if (isLoading || invitations.length === 0) {
    return null;
  }

  const handleResponse = async (invitationId: string, action: 'ACCEPT' | 'REJECT') => {
    setActioningId(invitationId);
    setFeedbackMsg(null);
    try {
      await respondToInvitation({ invitationId, action }).unwrap();
      setFeedbackMsg({
        type: 'success',
        text: action === 'ACCEPT' ? '🎉 Squad invitation accepted! Welcome to the team!' : 'Invitation declined.',
      });
      refetch();
      refetchMe();
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err?.data?.error || 'Failed to process invitation. Please try again.',
      });
    } finally {
      setActioningId(null);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-bold font-montserrat flex items-center justify-between border ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="p-1 hover:opacity-70">
            <X size={14} />
          </button>
        </div>
      )}

      {invitations.map((invite: any) => {
        const team = invite.team;
        const manager = team?.managers?.[0];
        const isCurrentActioning = actioningId === invite.id && isResponding;

        return (
          <div
            key={invite.id}
            className="relative overflow-hidden bg-gradient-to-r from-[#1A1C1C] via-[#242727] to-[#1A1C1C] rounded-2xl border-2 border-[#FFB800] p-6 shadow-xl text-white"
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFB800] text-black text-[11px] font-black font-montserrat uppercase tracking-wider rounded-full shadow-sm animate-pulse">
                    <Bell size={12} />
                    Official Squad Invitation
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-montserrat">
                    {team?.ageGroup || 'Competitive Division'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-black font-montserrat text-white tracking-tight flex items-center gap-2">
                    <span>{team?.name || 'Tournament Team'}</span>
                    <span className="text-[#FFB800] font-normal text-sm">has invited you to join their official squad!</span>
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-300 flex-wrap">
                    {manager && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users size={14} className="text-[#FFB800]" />
                        <span>Head Coach: <strong className="text-white">{manager.fullName}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin size={14} className="text-[#FFB800]" />
                      <span>{team?.cityOrTown || team?.region || 'United Kingdom'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Trophy size={14} className="text-[#FFB800]" />
                      <span>Talent Pro League Division 1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  disabled={isCurrentActioning}
                  onClick={() => handleResponse(invite.id, 'ACCEPT')}
                  className="px-6 py-3 bg-[#FFB800] hover:bg-[#E5A600] text-black text-xs font-black font-montserrat uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  {isCurrentActioning ? (
                    <Loader2 size={16} className="animate-spin text-black" />
                  ) : (
                    <Check size={16} className="stroke-[3]" />
                  )}
                  <span>Accept Invitation</span>
                </button>

                <button
                  disabled={isCurrentActioning}
                  onClick={() => handleResponse(invite.id, 'REJECT')}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-xl transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  <X size={15} />
                  <span>Decline</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

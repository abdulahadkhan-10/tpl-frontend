"use client";

import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  Clock, 
  UserCheck, 
  UserPlus, 
  Mail, 
  Trash2, 
  ArrowRight,
  MapPin, 
  HeartPulse, 
  Shirt, 
  FileCheck, 
  Users, 
  Send,
  ShieldAlert,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  useGetMeQuery, 
  useAddInvitationMutation, 
  useDeleteInvitationMutation 
} from '@/store/slices/loginApi';
import toast from 'react-hot-toast';

// ─── Prisma Schema Types ──────────────────────────────────────────────────────

export interface PrismaUser {
  id: string;
  email: string;
  fullName: string;
  roleType: string;
  isActive: boolean;
  createdAt?: string;
}

export interface PrismaPlayer {
  id: string;
  userId: string;
  user: PrismaUser;
  teamId?: string | null;
  position: string;
  dateOfBirth: string;
  pricingTier: string;
  stats?: any;
  scoutGrade?: number | null;
  gender?: string | null;
  nationality?: string | null;
  homeAddress?: string | null;
  mobileNumber?: string | null;
  emergencyContactName?: string | null;
  emergencyContactRelation?: string | null;
  emergencyContactPhone?: string | null;
  medicalConditions?: string | null;
  allergies?: string | null;
  medicationDetails?: string | null;
  gpName?: string | null;
  previousClub?: string | null;
  shirtSize?: string | null;
  shortsSize?: string | null;
  sockSize?: string | null;
  instagramUsername?: string | null;
  tiktokUsername?: string | null;
  youtubeChannel?: string | null;
  confirmedInfoCorrect?: boolean;
  acceptedPlayerAgreement?: boolean;
  signature?: string | null;
  signatureDate?: string | null;
  parentName?: string | null;
  parentRelationship?: string | null;
  parentPhone?: string | null;
  parentEmail?: string | null;
}

export interface PrismaInvitation {
  id: string;
  teamId: string;
  playerEmail: string;
  playerName?: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export type SquadMember = 
  | { type: 'PLAYER'; id: string; data: PrismaPlayer }
  | { type: 'INVITATION'; id: string; data: PrismaInvitation };

// Helper: Extract Initials from Player Name (e.g. "Marcus Stoinis" -> "MS")
function getInitials(name: string): string {
  if (!name) return 'PL';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── Premium Avatar Component ─────────────────────────────────────────────────

const SquadAvatar = ({ 
  name, 
  isPending = false 
}: { 
  name: string; 
  isPending?: boolean; 
}) => {
  const initials = getInitials(name);

  return (
    <div
      className={`w-11 h-11 shrink-0 rounded-md flex items-center justify-center font-extrabold font-montserrat tracking-wider text-xs select-none transition-all ${
        isPending
          ? 'bg-[#F8F9FA] text-slate-600 border border-[#E5E7EB]'
          : 'bg-[#1A1C1C] text-[#FFB800] border border-[#1A1C1C] shadow-xs'
      }`}
    >
      <span>{initials}</span>
    </div>
  );
};

// ─── Animation Framer Variants ────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function PlayersPage() {
  const { data: meData, isLoading, refetch } = useGetMeQuery();
  const [addInvitationApi, { isLoading: isInviting }] = useAddInvitationMutation();
  const [deleteInvitationApi] = useDeleteInvitationMutation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'ACCEPTED' | 'PENDING'>('ALL');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');

  // Modal States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerEmail, setNewPlayerEmail] = useState('');
  const [selectedPlayerForView, setSelectedPlayerForView] = useState<PrismaPlayer | null>(null);
  const [selectedPendingInvite, setSelectedPendingInvite] = useState<PrismaInvitation | null>(null);

  // Extract Backend Team Data
  const teamData = meData?.team;
  const backendPlayers: PrismaPlayer[] = teamData?.players || [];
  const backendInvitations: PrismaInvitation[] = teamData?.invitations || [];

  // Unified Roster List
  const squadMembers: SquadMember[] = useMemo(() => {
    const playerMembers: SquadMember[] = backendPlayers.map((p) => ({
      type: 'PLAYER',
      id: p.id,
      data: p,
    }));

    const inviteMembers: SquadMember[] = backendInvitations
      .filter((inv) => inv.status === 'PENDING')
      .map((inv) => ({
        type: 'INVITATION',
        id: inv.id,
        data: inv,
      }));

    return [...playerMembers, ...inviteMembers];
  }, [backendPlayers, backendInvitations]);

  // Filtered Roster
  const filteredSquad = useMemo(() => {
    return squadMembers.filter((member) => {
      let name = '';
      let email = '';
      let pos = 'Unknown';
      let isPending = false;

      if (member.type === 'PLAYER') {
        name = member.data.user?.fullName || 'Player';
        email = member.data.user?.email || '';
        pos = member.data.position || 'Unknown';
        isPending = false;
      } else {
        name = member.data.playerName || 'Invited Player';
        email = member.data.playerEmail || '';
        pos = 'Pending Registration';
        isPending = true;
      }

      const matchesSearch = 
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        selectedFilter === 'ALL' ||
        (selectedFilter === 'ACCEPTED' && !isPending) ||
        (selectedFilter === 'PENDING' && isPending);

      const matchesPos = 
        selectedPosition === 'ALL' || 
        (member.type === 'PLAYER' && member.data.position.toUpperCase() === selectedPosition);

      return matchesSearch && matchesStatus && matchesPos;
    });
  }, [squadMembers, searchQuery, selectedFilter, selectedPosition]);

  // KPI Metrics
  const totalCount = squadMembers.length;
  const registeredCount = squadMembers.filter((m) => m.type === 'PLAYER').length;
  const pendingCount = squadMembers.filter((m) => m.type === 'INVITATION').length;

  // Handle Send Invitation
  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim() || !newPlayerEmail.trim()) {
      toast.error('Please enter player name and email');
      return;
    }

    try {
      await addInvitationApi({
        playerName: newPlayerName.trim(),
        playerEmail: newPlayerEmail.trim(),
      }).unwrap();
      toast.success(`Invitation sent to ${newPlayerEmail}`);
      setShowInviteModal(false);
      setNewPlayerName('');
      setNewPlayerEmail('');
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.error || 'Failed to send invitation');
    }
  };

  // Handle Cancel Invitation
  const handleCancelInvitation = async (invitationId: string) => {
    try {
      await deleteInvitationApi(invitationId).unwrap();
      toast.success('Invitation cancelled');
      setSelectedPendingInvite(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.error || 'Failed to cancel invitation');
    }
  };

  return (
    <div className="space-y-6 pb-12 text-[#1A1C1C] font-roboto">
      {/* ─── Page Header & Key Actions ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-md border border-[#E5E7EB] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#FFB800] text-black text-[10px] font-black font-montserrat uppercase tracking-widest rounded-xs">
              TEAM SQUAD DIRECTORY
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {teamData?.name ? `${teamData.name} Roster` : 'Squad Roster'}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black font-montserrat tracking-tight text-[#1A1C1C] uppercase">
            Players & Invitations
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
            Monitor registration progress, squad invitations, and verified player scouting dossiers.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-5 py-2.5 bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold font-montserrat uppercase tracking-wider rounded-md transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-[#1A1C1C] shrink-0"
        >
          <UserPlus size={16} className="text-[#FFB800]" />
          <span>+ Invite Player</span>
        </button>
      </div>

      {/* ─── Roster Summary KPI Bar ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-md p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-slate-400">
              Total Squad Roster
            </span>
            <span className="block text-2xl font-black font-montserrat text-[#1A1C1C] mt-0.5">
              {totalCount}
            </span>
          </div>
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center border border-[#E5E7EB]">
            <Users size={18} className="text-slate-700" />
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-md p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-emerald-600">
              Profiles Registered
            </span>
            <span className="block text-2xl font-black font-montserrat text-[#1A1C1C] mt-0.5">
              {registeredCount}
            </span>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-md flex items-center justify-center border border-emerald-200">
            <UserCheck size={18} className="text-emerald-700" />
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-md p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-bold font-montserrat uppercase tracking-widest text-amber-600">
              Pending Registration
            </span>
            <span className="block text-2xl font-black font-montserrat text-[#1A1C1C] mt-0.5">
              {pendingCount}
            </span>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-md flex items-center justify-center border border-amber-200">
            <Clock size={18} className="text-amber-700" />
          </div>
        </div>
      </div>

      {/* ─── Controls: Tab Filters & Search ──────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-md border border-[#E5E7EB] shadow-xs">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold font-montserrat uppercase transition-all cursor-pointer ${
              selectedFilter === 'ALL'
                ? 'bg-[#1A1C1C] text-[#FFB800]'
                : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({totalCount})
          </button>

          <button
            onClick={() => setSelectedFilter('ACCEPTED')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold font-montserrat uppercase transition-all cursor-pointer ${
              selectedFilter === 'ACCEPTED'
                ? 'bg-emerald-700 text-white'
                : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200'
            }`}
          >
            Registered ({registeredCount})
          </button>

          <button
            onClick={() => setSelectedFilter('PENDING')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold font-montserrat uppercase transition-all cursor-pointer ${
              selectedFilter === 'PENDING'
                ? 'bg-[#FFB800] text-black'
                : 'bg-[#F8F9FA] text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pending Invite ({pendingCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by player name or email..."
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-md text-xs font-medium focus:outline-none focus:border-[#FFB800] focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ─── UNCLUTTERED PREMIUM SQUAD CARDS GRID ──────────────────────────────── */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-400 font-montserrat text-xs uppercase tracking-wider font-bold">
          Loading team roster data...
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredSquad.map((member) => {
            if (member.type === 'PLAYER') {
              const player = member.data;
              const playerName = player.user?.fullName || 'Player Profile';
              const playerEmail = player.user?.email || '';

              return (
                <motion.div
                  key={`player-${player.id}`}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedPlayerForView(player)}
                  className="bg-white rounded-md border border-[#E5E7EB] p-5 shadow-xs hover:shadow-md hover:border-[#FFB800] transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle Top Gold Highlight Bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-3">
                    {/* Header Row: Initials Avatar + Soft Pill */}
                    <div className="flex items-center justify-between gap-3">
                      <SquadAvatar name={playerName} isPending={false} />
                      
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-[10.5px] font-bold font-montserrat">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Registered
                      </span>
                    </div>

                    {/* Name & Subtitle */}
                    <div className="pt-1">
                      <h3 className="text-base font-extrabold font-montserrat text-[#1A1C1C] group-hover:text-[#7C5800] transition-colors line-clamp-1">
                        {playerName}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {player.position} {player.nationality ? `• ${player.nationality}` : ''}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-1">
                        {playerEmail}
                      </p>
                    </div>
                  </div>

                  {/* Clean Footer Divider & Link */}
                  <div className="mt-5 pt-3 border-t border-[#E5E7EB]/80 flex items-center justify-between text-xs">
                    <span className="text-[10.5px] font-extrabold font-montserrat uppercase text-slate-400">
                      Tier: {player.pricingTier?.replace('_', ' ') || 'Standard'}
                    </span>

                    <span className="text-[11.5px] font-extrabold font-montserrat text-[#7C5800] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      View Profile <ChevronRight size={13} />
                    </span>
                  </div>
                </motion.div>
              );
            } else {
              const invite = member.data;
              const playerName = invite.playerName || 'Invited Player';
              const playerEmail = invite.playerEmail;

              return (
                <motion.div
                  key={`invite-${invite.id}`}
                  variants={cardVariants}
                  whileHover={{ y: -3 }}
                  className="bg-[#F8F9FA] rounded-md border border-[#E5E7EB] p-5 shadow-xs flex flex-col justify-between relative group hover:border-amber-400 transition-all"
                >
                  <div className="space-y-3">
                    {/* Header Row: Initials Avatar + Pending Pill */}
                    <div className="flex items-center justify-between gap-3">
                      <SquadAvatar name={playerName} isPending={true} />
                      
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-[10.5px] font-bold font-montserrat">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Pending Invite
                      </span>
                    </div>

                    {/* Name & Invitation Subtitle */}
                    <div className="pt-1">
                      <h3 className="text-base font-extrabold font-montserrat text-[#1A1C1C] line-clamp-1">
                        {playerName}
                      </h3>
                      <p className="text-xs text-amber-700 font-semibold mt-0.5">
                        Registration Form Pending
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-1">
                        {playerEmail}
                      </p>
                    </div>
                  </div>

                  {/* Footer Actions for Pending Invites */}
                  <div className="mt-5 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                    <span className="text-[10.5px] font-medium text-slate-400">
                      Invitation Sent
                    </span>
                    <button
                      onClick={() => setSelectedPendingInvite(invite)}
                      className="text-[11.5px] font-extrabold font-montserrat text-slate-700 hover:text-black uppercase underline cursor-pointer"
                    >
                      Manage Invite
                    </button>
                  </div>
                </motion.div>
              );
            }
          })}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && filteredSquad.length === 0 && (
        <div className="bg-white border border-[#E5E7EB] rounded-md p-12 text-center my-6 shadow-xs">
          <Users size={32} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-extrabold font-montserrat uppercase text-[#1A1C1C]">
            No Squad Members Registered Yet
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 mb-5">
            Click "+ Invite Player" to send email registration links to your team members.
          </p>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-5 py-2.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] text-xs font-bold font-montserrat uppercase tracking-wider rounded-md transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <UserPlus size={16} />
            <span>Invite First Player</span>
          </button>
        </div>
      )}

      {/* ─── MODAL 1: Invite New Player Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-[#E5E7EB] rounded-md max-w-md w-full p-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#FFF9E6] border border-[#FFB800]/40 rounded-md text-[#7C5800]">
                    <UserPlus size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold font-montserrat uppercase text-[#1A1C1C]">
                      Invite Player to Squad
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Player receives an invitation email to complete registration.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-1 text-slate-400 hover:text-black cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSendInvitation} className="space-y-4 text-xs font-montserrat">
                <div>
                  <label className="block font-extrabold uppercase text-[11px] text-slate-700 mb-1">
                    Player Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Stoinis"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-md text-xs font-medium focus:outline-none focus:border-[#FFB800] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-extrabold uppercase text-[11px] text-slate-700 mb-1">
                    Player Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="player@example.com"
                    value={newPlayerEmail}
                    onChange={(e) => setNewPlayerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-md text-xs font-medium focus:outline-none focus:border-[#FFB800] focus:bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 bg-white text-slate-600 font-bold uppercase border border-[#E5E7EB] rounded-md hover:bg-[#F8F9FA] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isInviting}
                    className="px-5 py-2 bg-[#1A1C1C] text-[#FFB800] font-black uppercase rounded-md hover:bg-black cursor-pointer flex items-center gap-1.5"
                  >
                    <Send size={13} /> {isInviting ? 'Sending...' : 'Send Invite'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 2: Pending Invitation Details Drawer ──────────────────────── */}
      <AnimatePresence>
        {selectedPendingInvite && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-[#E5E7EB] rounded-md max-w-md w-full p-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <SquadAvatar name={selectedPendingInvite.playerName || 'Invited Player'} isPending={true} />
                  <div>
                    <h3 className="text-base font-extrabold font-montserrat uppercase text-[#1A1C1C]">
                      {selectedPendingInvite.playerName || 'Invited Player'}
                    </h3>
                    <p className="text-xs text-amber-700 font-bold">
                      Pending Invitation & Registration
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPendingInvite(null)}
                  className="text-slate-400 hover:text-black cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 font-montserrat text-xs">
                <div className="bg-[#F8F9FA] p-3.5 rounded-md border border-[#E5E7EB] space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Invited Email</span>
                    <span className="font-bold text-[#1A1C1C]">{selectedPendingInvite.playerEmail}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Status</span>
                    <span className="font-bold text-amber-700">Waiting for player to accept invitation and submit registration form</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Once the player completes registration, their profile card will automatically unlock into a full, interactive scouting file.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <button
                  onClick={() => handleCancelInvitation(selectedPendingInvite.id)}
                  className="px-3.5 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-md font-bold text-xs uppercase hover:bg-rose-100 cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 size={14} /> Cancel Invite
                </button>

                <button
                  onClick={() => setSelectedPendingInvite(null)}
                  className="px-4 py-2 bg-[#1A1C1C] text-white font-bold text-xs uppercase rounded-md hover:bg-black cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 3: Full Prisma Player Profile Dossier ─────────────────────── */}
      <AnimatePresence>
        {selectedPlayerForView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-[#E5E7EB] rounded-md max-w-3xl w-full p-6 md:p-8 shadow-2xl relative my-8 overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-start pb-5 border-b border-[#E5E7EB] mb-6">
                <div className="flex items-center gap-4">
                  <SquadAvatar 
                    name={selectedPlayerForView.user?.fullName || 'Player'} 
                    isPending={false} 
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold font-montserrat text-[10px] uppercase rounded-xs">
                        Profile Verified
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        Tier: {selectedPlayerForView.pricingTier?.replace('_', ' ') || 'Standard'}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black font-montserrat uppercase text-[#1A1C1C]">
                      {selectedPlayerForView.user?.fullName}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Position: {selectedPlayerForView.position} • DOB: {selectedPlayerForView.dateOfBirth ? new Date(selectedPlayerForView.dateOfBirth).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlayerForView(null)}
                  className="p-1.5 text-slate-400 hover:text-black rounded-md cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Prisma Schema Comprehensive Sections */}
              <div className="space-y-6 font-montserrat text-xs max-h-[62vh] overflow-y-auto pr-2 custom-scrollbar">
                
                {/* 1. Account & User Identity (Prisma User Model) */}
                <div className="bg-[#F8F9FA] p-4 rounded-md border border-[#E5E7EB]">
                  <h4 className="text-xs font-black uppercase text-[#1A1C1C] mb-3 flex items-center gap-2">
                    <UserCheck size={15} className="text-[#FFB800]" /> Account & Identity (Prisma User Model)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Full Name</span>
                      <span className="font-extrabold text-[#1A1C1C]">{selectedPlayerForView.user?.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</span>
                      <span className="font-extrabold text-[#1A1C1C]">{selectedPlayerForView.user?.email}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Scout Grade</span>
                      <span className="font-black text-[#7C5800] text-sm">{selectedPlayerForView.scoutGrade || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Personal & Contact Details */}
                <div className="border border-[#E5E7EB] rounded-md p-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-[#1A1C1C] flex items-center gap-2">
                    <MapPin size={15} className="text-slate-700" /> Personal & Contact Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gender</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.gender || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Nationality</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.nationality || 'International'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Mobile Number</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.mobileNumber || 'Not provided'}</span>
                    </div>
                    <div className="sm:col-span-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Home Address</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.homeAddress || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Emergency Contact & Medical Dossier */}
                <div className="border border-[#E5E7EB] rounded-md p-4 space-y-3 bg-[#FFFDF7]">
                  <h4 className="text-xs font-black uppercase text-[#1A1C1C] flex items-center gap-2">
                    <HeartPulse size={15} className="text-rose-600" /> Emergency Contact & Medical
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Emergency Contact</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.emergencyContactName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Relationship</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.emergencyContactRelation || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Emergency Phone</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.emergencyContactPhone || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Medical Conditions</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.medicalConditions || 'None'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Allergies</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.allergies || 'None'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">GP Doctor Name</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.gpName || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Kit Sizes & Previous Club */}
                <div className="border border-[#E5E7EB] rounded-md p-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-[#1A1C1C] flex items-center gap-2">
                    <Shirt size={15} className="text-slate-700" /> Gear Sizes & Club History
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Shirt Size</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.shirtSize || 'L'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Shorts Size</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.shortsSize || 'M'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Sock Size</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.sockSize || 'Standard'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Previous Club</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.previousClub || 'None'}</span>
                    </div>
                  </div>
                </div>

                {/* 5. Social Handles & Signatures */}
                <div className="border border-[#E5E7EB] rounded-md p-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-[#1A1C1C] flex items-center gap-2">
                    <FileCheck size={15} className="text-emerald-700" /> Social Handles & Legal Signatures
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Instagram</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.instagramUsername ? `@${selectedPlayerForView.instagramUsername}` : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Digital Signature</span>
                      <span className="font-bold text-[#1A1C1C]">{selectedPlayerForView.signature || 'Electronically Signed'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Signature Date</span>
                      <span className="font-bold text-[#1A1C1C]">
                        {selectedPlayerForView.signatureDate ? new Date(selectedPlayerForView.signatureDate).toLocaleDateString() : 'Confirmed'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase font-montserrat text-slate-400">
                  Prisma Verified Profile • TPL System
                </span>
                <button
                  onClick={() => setSelectedPlayerForView(null)}
                  className="px-5 py-2.5 bg-[#1A1C1C] text-[#FFB800] font-black uppercase text-xs rounded-md hover:bg-black cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  useGetTicketsQuery,
  useGetTicketDetailsQuery,
  useCreateTicketMutation,
  useAddMessageMutation,
  useUpdateTicketStatusMutation,
  Ticket,
} from '@/store/slices/ticketApi';
import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  X,
  AlertTriangle,
  Loader2,
  Inbox,
  User,
  Shield,
  HelpCircle
} from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export default function TicketsPage() {
  // Redux state
  const { user, role } = useSelector((state: RootState) => state.auth);
  const isManager = role === 'team';
  const isAdmin = role === 'admin';

  // API Queries & Mutations
  const { data: ticketsData, isLoading: isLoadingList, error: listError, refetch } = useGetTicketsQuery();
  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();
  const [addMessage, { isLoading: isReplying }] = useAddMessageMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateTicketStatusMutation();

  // State management
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming'); // for Team Managers
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Create ticket form fields
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // New message field
  const [replyMessage, setReplyMessage] = useState('');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load ticket details query
  const { data: detailsData, isLoading: isLoadingDetails } = useGetTicketDetailsQuery(
    selectedTicketId ?? '',
    { skip: !selectedTicketId }
  );

  const selectedTicket = detailsData?.ticket;

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedTicket?.messages, isLoadingDetails]);

  // Set default tab based on role
  useEffect(() => {
    if (isManager) {
      setActiveTab('incoming');
    }
  }, [role, isManager]);

  // Filter tickets based on role and active tab
  const getFilteredTickets = () => {
    if (!ticketsData?.tickets) return [];
    
    if (isManager) {
      const currentTeamId = user?.id || user?.team?.id;
      if (activeTab === 'incoming') {
        // Player tickets routed to this team manager
        return ticketsData.tickets.filter(t => t.target === 'TEAM' && (!currentTeamId || t.teamId === currentTeamId));
      } else {
        // Tickets this team manager raised to the admin
        return ticketsData.tickets.filter(t => t.target === 'ADMIN' || (currentTeamId && t.creatorTeamId === currentTeamId));
      }
    }
    return ticketsData.tickets;
  };

  const filteredTickets = getFilteredTickets();

  // Create ticket handler
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!subject.trim() || !message.trim()) {
      setFormError('Subject and initial message are required.');
      return;
    }

    try {
      await createTicket({ subject, category, message }).unwrap();
      // Reset form
      setSubject('');
      setCategory('GENERAL');
      setMessage('');
      setIsModalOpen(false);
      if (isManager) {
        setActiveTab('outgoing');
      }
      refetch();
    } catch (err: any) {
      setFormError(err?.data?.error || 'Failed to submit ticket. Please try again.');
    }
  };

  // Reply handler
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyMessage.trim()) return;

    try {
      await addMessage({ ticketId: selectedTicketId, message: replyMessage }).unwrap();
      setReplyMessage('');
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  // Status update handler
  const handleStatusChange = async (newStatus: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED') => {
    if (!selectedTicketId) return;
    try {
      await updateStatus({ ticketId: selectedTicketId, status: newStatus }).unwrap();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Get status color styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black font-montserrat uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Resolved
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black font-montserrat uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <Clock size={12} className="text-amber-600" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black font-montserrat uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
            <Inbox size={12} className="text-slate-600" />
            Open
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-roboto">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[4px] border border-[#E5E7EB] shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#F8F9FA] rounded-[4px] border border-[#E5E7EB]">
            <AnimatedIcon name="tickets" active size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black font-montserrat text-[#1A1C1C] uppercase tracking-tight">
              Queries & Help Desk
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-roboto">
              {isAdmin 
                ? 'Manage incoming support requests and query resolutions across the league.' 
                : 'Raise questions, request clearances, or submit league feedback.'}
            </p>
          </div>
        </div>

        {/* Create Ticket Button (Not shown for Admins since they only resolve tickets) */}
        {!isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#000000] hover:bg-[#1A1C1C] text-white text-xs font-black font-montserrat uppercase tracking-widest rounded-[4px] border border-black transition-all hover:shadow-md flex items-center justify-center gap-2 cursor-pointer duration-200"
          >
            <Plus size={14} className="text-[#FFB800]" />
            <span>New Ticket</span>
          </button>
        )}
      </div>

      {/* Role Tabs for Team Managers */}
      {isManager && (
        <div className="flex bg-[#F8F9FA] p-1 rounded-[4px] border border-[#E5E7EB] max-w-md gap-1">
          <button
            onClick={() => {
              setActiveTab('incoming');
              setSelectedTicketId(null);
            }}
            className={`flex-1 py-3 text-xs font-black font-montserrat uppercase tracking-wider rounded-[4px] transition-all cursor-pointer ${
              activeTab === 'incoming'
                ? 'bg-white text-[#1A1C1C] border border-[#E5E7EB] shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            Player Inquiries
          </button>
          <button
            onClick={() => {
              setActiveTab('outgoing');
              setSelectedTicketId(null);
            }}
            className={`flex-1 py-3 text-xs font-black font-montserrat uppercase tracking-wider rounded-[4px] transition-all cursor-pointer ${
              activeTab === 'outgoing'
                ? 'bg-white text-[#1A1C1C] border border-[#E5E7EB] shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            Queries to Admin
          </button>
        </div>
      )}

      {/* Main Panel - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Ticket List View (left column) */}
        <div className={`${selectedTicketId ? 'hidden lg:block lg:col-span-5' : 'col-span-12'} bg-white rounded-[4px] border border-[#E5E7EB] overflow-hidden flex flex-col`}>
          <div className="p-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
            <span className="text-xs font-black font-montserrat uppercase tracking-widest text-[#1A1C1C]">
              Ticket List ({filteredTickets.length})
            </span>
          </div>

          <div className="divide-y divide-[#E5E7EB] overflow-y-auto max-h-[600px] flex-1">
            {isLoadingList ? (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#FFB800]" />
                <p className="text-xs">Loading tickets...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <Inbox size={32} className="text-slate-300" />
                <p className="text-xs font-bold font-montserrat uppercase tracking-wider">No tickets found</p>
                <p className="text-xs text-slate-500">Tickets will show up here when they are raised.</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-5 cursor-pointer transition-all duration-150 flex flex-col gap-2 hover:bg-[#F8F9FA] ${
                    selectedTicketId === ticket.id 
                      ? 'bg-[#F8F9FA] border-l-[3px] border-[#FFB800] pl-[17px]' 
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black font-montserrat text-[#7C5800] bg-[#FFF9E6] px-2 py-0.5 rounded-[4px] border border-[#FFB800]/20">
                      TKT-{ticket.ticketNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#1A1C1C] line-clamp-1 font-montserrat">
                    {ticket.subject}
                  </h3>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-medium">
                    <span className="uppercase tracking-wider font-montserrat text-[10px] text-slate-400">
                      Category: {ticket.category.replace('_', ' ')}
                    </span>
                    {getStatusBadge(ticket.status)}
                  </div>

                  {/* Creator Info */}
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1.5 border-t border-[#E5E7EB]/50">
                    <User size={10} />
                    <span>
                      {ticket.creatorUser?.fullName || ticket.creatorTeam?.name || 'Unknown'}
                    </span>
                    {ticket.creatorUser?.email && (
                      <span className="text-slate-400/70">({ticket.creatorUser.email})</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Conversation Stream (right column) */}
        <div className={`${selectedTicketId ? 'col-span-12 lg:col-span-7' : 'hidden lg:flex lg:col-span-7'} bg-white rounded-[4px] border border-[#E5E7EB] flex flex-col min-h-[500px]`}>
          {selectedTicketId ? (
            <>
              {/* Active Ticket Header */}
              <div className="p-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedTicketId(null)}
                    className="lg:hidden p-1.5 text-slate-500 hover:text-[#1A1C1C] cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black font-montserrat text-[#7C5800] bg-[#FFF9E6] px-2 py-0.5 rounded-[4px] border border-[#FFB800]/20">
                        TKT-{selectedTicket?.ticketNumber}
                      </span>
                      {selectedTicket && getStatusBadge(selectedTicket.status)}
                    </div>
                    <h2 className="font-black font-montserrat text-sm text-[#1A1C1C] line-clamp-1 uppercase tracking-tight mt-1">
                      {selectedTicket?.subject}
                    </h2>
                  </div>
                </div>

                {/* Status Switcher for resolver (Managers or Admins) */}
                {(isAdmin || (isManager && selectedTicket?.target === 'TEAM')) && selectedTicket && (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedTicket.status}
                      disabled={isUpdatingStatus}
                      onChange={(e) => handleStatusChange(e.target.value as any)}
                      className="bg-white border border-[#E5E7EB] rounded-[4px] text-xs px-2.5 py-1.5 font-bold font-montserrat uppercase tracking-wider text-slate-700 focus:border-black focus:ring-1 focus:ring-black outline-none cursor-pointer"
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Message History */}
              <div className="flex-1 p-5 overflow-y-auto max-h-[450px] min-h-[300px] bg-[#F8F9FA]/40 space-y-4">
                {isLoadingDetails ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-6 h-6 animate-spin text-[#FFB800]" />
                  </div>
                ) : (
                  selectedTicket?.messages?.map((msg) => {
                    const isSelf = 
                      (role === 'team' && msg.senderTeamId === user?.id) || 
                      (role !== 'team' && msg.senderUserId === user?.id);

                    const senderName = msg.senderUser?.fullName || msg.senderTeam?.name || 'System';
                    
                    let senderRole = 'Member';
                    if (msg.senderUser?.roleType === 'ADMIN') {
                      senderRole = 'League Admin';
                    } else if (msg.senderTeamId) {
                      senderRole = 'Team Manager';
                    } else if (msg.senderUser?.roleType === 'PLAYER') {
                      senderRole = 'Player';
                    }

                    return (
                      <div 
                        key={msg.id} 
                        className={`flex flex-col max-w-[80%] gap-1 ${
                          isSelf ? 'ml-auto items-end' : 'items-start'
                        }`}
                      >
                        {/* Sender Label */}
                        <span className="text-[10px] font-black font-montserrat uppercase tracking-wider text-slate-400">
                          {senderName} • {senderRole}
                        </span>

                        {/* Text bubble */}
                        <div className={`p-4 rounded-[4px] text-xs font-roboto leading-relaxed ${
                          isSelf 
                            ? 'bg-[#000000] text-white border border-black' 
                            : 'bg-white text-[#1A1C1C] border border-[#E5E7EB] shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
                        }`}>
                          {msg.message}
                        </div>

                        {/* Timestamp */}
                        <span className="text-[9px] text-slate-400 font-medium">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Reply Box */}
              {selectedTicket?.status !== 'RESOLVED' ? (
                <form onSubmit={handleSendReply} className="p-4 border-t border-[#E5E7EB] flex items-center gap-3">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your response here..."
                    disabled={isReplying}
                    className="flex-1 bg-white border border-[#E5E7EB] rounded-[4px] text-xs p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-slate-400 text-[#1A1C1C] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isReplying || !replyMessage.trim()}
                    className="p-3 bg-[#000000] hover:bg-[#1A1C1C] text-white rounded-[4px] border border-black transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    {isReplying ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#FFB800]" />
                    ) : (
                      <Send size={14} className="text-[#FFB800]" />
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 border-t border-[#E5E7EB] text-center text-xs text-emerald-800 font-bold font-montserrat uppercase tracking-wider flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  This query has been marked as resolved
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <MessageSquare size={48} className="text-slate-200 mb-3" />
              <p className="text-xs font-bold font-montserrat uppercase tracking-wider">Select a ticket</p>
              <p className="text-xs text-slate-500 mt-1">Select a query from the list to view the full dialogue thread.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs" 
          />

          {/* Modal Container */}
          <div className="bg-white max-w-lg w-full rounded-[4px] border border-[#E5E7EB] shadow-2xl relative z-10 overflow-hidden animate-scaleIn font-roboto">
            {/* Header */}
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F8F9FA]">
              <span className="text-xs font-black font-montserrat uppercase tracking-widest text-[#1A1C1C]">
                Raise Support Query
              </span>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-[4px] text-xs text-red-700 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-500 shrink-0" />
                  <p>{formError}</p>
                </div>
              )}

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black font-montserrat uppercase tracking-wider text-slate-600 block">
                  Subject / Inquiry Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your issue..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-[4px] text-xs p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-[#1A1C1C] transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black font-montserrat uppercase tracking-wider text-slate-600 block">
                  Inquiry Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-[4px] text-xs p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-[#1A1C1C] transition-all cursor-pointer font-bold font-montserrat uppercase tracking-wider"
                >
                  <option value="GENERAL">General</option>
                  <option value="EQUIPMENT">Equipment</option>
                  <option value="REGISTRATION">Registration</option>
                  <option value="MATCH_SCHEDULE">Match Schedule</option>
                  <option value="MEDICAL">Medical</option>
                  <option value="DISPUTE">Dispute</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black font-montserrat uppercase tracking-wider text-slate-600 block">
                  Detailed Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide all relevant details to help resolve your request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-[4px] text-xs p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black outline-none text-[#1A1C1C] transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E7EB] hover:bg-[#F8F9FA] text-slate-600 rounded-[4px] text-xs font-bold font-montserrat uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 bg-[#FFB800] hover:bg-[#E5A400] text-black rounded-[4px] text-xs font-black font-montserrat uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCreating ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <span>Submit Query</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

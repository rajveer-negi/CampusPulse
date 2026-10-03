'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Send, Search, Users, Sparkles, Pin, CheckCheck, ArrowLeft, Bot } from 'lucide-react';
import { Community, MentorPeer, ChatMessage, StudentProfile } from '@/lib/types';

interface MessagesTabProps {
  student: StudentProfile;
  communities: Community[];
  mentorsPeers: MentorPeer[];
  communityChats: Record<string, ChatMessage[]>;
  directChats: Record<string, ChatMessage[]>;
  onSendMessage: (channelId: string, text: string, isDirect: boolean) => void;
  onOpenAiModal: () => void;
  selectedType: 'community' | 'direct';
  selectedId: string;
  onSelectConversation: (type: 'community' | 'direct', id: string) => void;
  mobileShowChat: boolean;
  setMobileShowChat: (show: boolean) => void;
}

export default function MessagesTab({
  student,
  communities,
  mentorsPeers,
  communityChats,
  directChats,
  onSendMessage,
  onOpenAiModal,
  selectedType,
  selectedId,
  onSelectConversation,
  mobileShowChat,
  setMobileShowChat,
}: MessagesTabProps) {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [searchChannel, setSearchChannel] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current active conversation
  const joinedCommunities = communities.filter((c) => c.joined);

  const currentCommunity = communities.find((c) => c.id === selectedId);
  const currentDirect = mentorsPeers.find((p) => p.id === selectedId);

  const currentMessages = useMemo(() => {
    return selectedType === 'community'
      ? communityChats[selectedId] || []
      : directChats[selectedId] || [];
  }, [selectedType, selectedId, communityChats, directChats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length, selectedId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(selectedId, inputMessage.trim(), selectedType === 'direct');
    setInputMessage('');
  };

  return (
    <div className="bg-white dark:bg-[#0d0e14] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden shadow-xs flex flex-col md:flex-row h-[calc(100dvh-140px)] sm:h-[75vh] sm:min-h-[550px]">
      {/* LEFT COLUMN: Channels and Direct Messages List (Page 3 Top Wireframe) */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-[#1d1f2b] flex flex-col bg-slate-50/50 dark:bg-[#090a0f] ${
          mobileShowChat ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Header & Filter */}
        <div className="p-4 border-b border-slate-200 dark:border-[#1d1f2b] bg-white dark:bg-[#0d0e14] space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Campus Messages</h2>
            <button
              onClick={onOpenAiModal}
              className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Bot</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchChannel}
              onChange={(e) => setSearchChannel(e.target.value)}
              placeholder="Filter channels or people..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-[#12131b] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-[#222432] rounded-xl focus:bg-white dark:focus:bg-[#161724] focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-4">
          {/* Pinned AI Advisor Channel */}
          <div>
            <div className="px-2 py-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                AI Assistant
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live 24/7
              </span>
            </div>

            <button
              onClick={() => onSelectConversation('direct', 'ai-advisor')}
              className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center gap-3 border mt-1 ${
                selectedId === 'ai-advisor'
                  ? 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white border-indigo-700 shadow-sm'
                  : 'bg-indigo-50/80 hover:bg-indigo-100/80 border-indigo-200/90 text-indigo-950'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs relative">
                <Bot className="w-5 h-5 text-amber-300" />
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white absolute -bottom-0.5 -right-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold truncate flex items-center gap-1 ${selectedId === 'ai-advisor' ? 'text-white' : 'text-indigo-950'}`}>
                    <span>Campus AI Advisor</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase font-semibold">
                      AI
                    </span>
                  </span>
                  <span className={`text-[10px] ${selectedId === 'ai-advisor' ? 'text-indigo-200' : 'text-slate-400'}`}>Now</span>
                </div>
                <p className={`text-[11px] truncate mt-0.5 ${selectedId === 'ai-advisor' ? 'text-indigo-200' : 'text-slate-600'}`}>
                  Instant answers on clubs, workshops & careers
                </p>
              </div>
            </button>
          </div>

          {/* Section 1: Communities Channels (Sketched on Page 3) */}
          <div className="pt-2">
            <div className="px-2 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Communities ({joinedCommunities.length})
              </span>
              <span className="text-[10px] text-indigo-600 font-semibold">Club Lounges</span>
            </div>

            <div className="space-y-1 mt-1">
              {joinedCommunities.map((c) => {
                const isActive = selectedType === 'community' && selectedId === c.id;
                const lastMsg = (communityChats[c.id] || []).slice(-1)[0];
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectConversation('community', c.id)}
                    className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-3 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'hover:bg-white text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.gradient} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                    >
                      {c.shortCode.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {c.shortCode} Community
                        </span>
                        <span className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {lastMsg ? '10m' : 'New'}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {lastMsg ? lastMsg.content : 'Official announcements and discussions'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Direct Messages (Sketched on Page 3) */}
          <div className="pt-2">
            <div className="px-2 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Direct Messages ({mentorsPeers.filter((p) => p.connected).length})
              </span>
              <span className="text-[10px] text-slate-400">Mentors & Peers</span>
            </div>

            <div className="space-y-1 mt-1">
              {mentorsPeers.map((person) => {
                const isActive = selectedType === 'direct' && selectedId === person.id;
                const personMsgs = directChats[person.id] || [];
                const lastMsg = personMsgs.slice(-1)[0];
                return (
                  <button
                    key={person.id}
                    onClick={() => onSelectConversation('direct', person.id)}
                    className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-3 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white absolute -bottom-0.5 -right-0.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {person.name}
                        </span>
                        <span className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                          Active
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {lastMsg ? lastMsg.content : `${person.role} · ${person.branch.split(' ')[0]}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Active Live Chat Window */}
      <div
        className={`flex-1 flex flex-col bg-white dark:bg-[#070709] ${
          !mobileShowChat ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Top Active Chat Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-[#1d1f2b] flex items-center justify-between bg-white dark:bg-[#0d0e14] z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileShowChat(false)}
              className="p-1.5 md:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
              aria-label="Back to channels"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {selectedId === 'ai-advisor' ? (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Campus AI Advisor</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Official 24/7 AI Guide · Instant & Fast Replies ⚡
                  </p>
                </div>
              </div>
            ) : selectedType === 'community' && currentCommunity ? (
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentCommunity.gradient} flex items-center justify-center text-white font-bold text-xs`}
                >
                  {currentCommunity.shortCode.slice(0, 3)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentCommunity.name} Channel
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {currentCommunity.membersCount} students · Led by {currentCommunity.leadName}
                  </p>
                </div>
              </div>
            ) : currentDirect ? (
              <div className="flex items-center gap-2.5">
                <img
                  src={currentDirect.avatar}
                  alt={currentDirect.name}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentDirect.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {currentDirect.role} · {currentDirect.branch}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Helper</span>
            </button>
          </div>
        </div>

        {/* Message Bubble Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40 dark:bg-[#070709]">
          {currentMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Users className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Start the conversation</p>
              <p className="text-xs max-w-xs mt-1 text-slate-400 dark:text-slate-500">
                Say hello, ask workshop questions, or discuss projects with your peers!
              </p>
            </div>
          ) : (
            currentMessages.map((msg) => {
              const isMine = msg.isMine;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMine && (
                    msg.channelId === 'ai-advisor' ? (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Bot className="w-4 h-4 text-amber-300" />
                      </div>
                    ) : msg.avatar ? (
                      <img
                        src={msg.avatar}
                        alt={msg.senderName}
                        className="w-8 h-8 rounded-xl object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {msg.senderName.slice(0, 2).toUpperCase()}
                      </div>
                    )
                  )}

                  <div className={`max-w-[80%] sm:max-w-md space-y-1 ${isMine ? 'items-end' : ''}`}>
                    {!isMine && (
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{msg.senderName}</span>
                        {msg.isAnnouncement && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-semibold flex items-center gap-0.5">
                            <Pin className="w-2.5 h-2.5" /> Announcement
                          </span>
                        )}
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMine
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-xs shadow-xs'
                          : msg.isAnnouncement
                          ? 'bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 rounded-tl-xs'
                          : 'bg-white dark:bg-[#12131b] border border-slate-200/90 dark:border-[#1d1f2b] text-slate-800 dark:text-slate-100 rounded-tl-xs shadow-2xs'
                      }`}
                    >
                      {msg.isTyping ? (
                        <div className="flex items-center gap-1.5 py-1 px-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]" />
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:300ms]" />
                          <span className="text-[11px] text-indigo-400 font-medium ml-1.5">Analyzing campus data...</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">{msg.content}</div>
                      )}
                    </div>

                    <div
                      className={`text-[10px] flex items-center gap-1 ${
                        isMine ? 'justify-end text-slate-400' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMine && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips when in AI Chat */}
        {selectedId === 'ai-advisor' && (
          <div className="px-3 sm:px-4 py-2 bg-indigo-50/70 dark:bg-[#0d0e14] border-t border-indigo-100 dark:border-[#1d1f2b] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0">Try asking:</span>
            {[
              'Which club is best for 1st year CS?',
              'Prerequisites for Autonomous Robotics?',
              'How to join GDSC Core Team?',
              '1st year career roadmap',
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSendMessage('ai-advisor', prompt, true);
                }}
                className="px-2.5 py-1 bg-white dark:bg-[#161724] hover:bg-indigo-50 dark:hover:bg-[#1f2133] text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/60 rounded-lg whitespace-nowrap transition-colors shrink-0 shadow-2xs font-medium cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Message Input Box */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#0d0e14] border-t border-slate-200 dark:border-[#1d1f2b]">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                selectedId === 'ai-advisor'
                  ? 'Ask campus AI advisor anything about clubs, workshops...'
                  : selectedType === 'community'
                  ? `Message #${currentCommunity?.shortCode || 'community'} channel...`
                  : `Message ${currentDirect?.name || 'peer'}...`
              }
              className="flex-1 px-4 py-2.5 text-sm bg-slate-100 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl focus:outline-none focus:bg-white dark:focus:bg-[#161724] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

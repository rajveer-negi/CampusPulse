'use client';

import React from 'react';
import { X, Users, Mail, Sparkles, Check, HelpCircle, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Community } from '@/lib/types';

interface CommunityModalProps {
  community: Community | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleJoin: (id: string) => void;
  onAskAiAboutClub: (clubName: string) => void;
}

export default function CommunityModal({
  community,
  isOpen,
  onClose,
  onToggleJoin,
  onAskAiAboutClub,
}: CommunityModalProps) {
  if (!isOpen || !community) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d0e14] w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] flex flex-col max-h-[92dvh] sm:max-h-[90vh] overflow-hidden">
        {/* Banner with gradient */}
        <div
          className={`p-6 bg-gradient-to-r ${community.gradient} text-white relative shrink-0`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-xl backdrop-blur-sm transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold mb-2 backdrop-blur-md">
            {community.category}
          </span>
          <h2 className="text-xl font-bold leading-tight text-white">{community.name}</h2>
          <p className="text-xs text-white/90 mt-1 max-w-md">{community.shortDesc}</p>

          <div className="flex items-center gap-4 mt-4 text-xs text-white/80">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4" />
              {community.membersCount} Active Members
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4" />
              {community.upcomingEventCount} Upcoming Events
            </span>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Detailed Leader Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Official Committee Brief (By Leadership)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#12131b] border border-slate-200/80 dark:border-[#1d1f2b] rounded-2xl p-4">
              {community.detailedInfo}
            </p>
          </div>

          {/* Committee Lead Card */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Leadership & Contact Info
            </h3>
            <div className="p-3.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-2xl flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{community.leadName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{community.leadRole} · {community.leadBranch}</p>
              </div>
              <a
                href={`mailto:${community.leadContact}`}
                className="px-3 py-1.5 bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-[#2b2d3d] hover:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Lead</span>
              </a>
            </div>
          </div>

          {/* Leader FAQs */}
          {community.faqs && community.faqs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Frequently Asked Questions (Freshers & Juniors)
                </h3>
              </div>
              <div className="space-y-2">
                {community.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl text-xs space-y-1"
                  >
                    <p className="font-semibold text-indigo-950 dark:text-indigo-200">Q: {faq.question}</p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {community.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 bg-slate-100 dark:bg-[#1a1b26] text-slate-600 dark:text-slate-300 rounded-lg font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white dark:bg-[#0d0e14] border-t border-slate-200 dark:border-[#1d1f2b] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAiAboutClub(community.name);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Ask AI about {community.shortCode}</span>
          </button>

          <button
            onClick={() => onToggleJoin(community.id)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] cursor-pointer ${
              community.joined
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-sm shadow-indigo-600/30'
            }`}
          >
            {community.joined ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Joined Community</span>
              </>
            ) : (
              <>
                <span>Join Community</span>
                <span className="text-indigo-200 text-xs">· Free</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

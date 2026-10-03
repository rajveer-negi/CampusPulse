'use client';

import React from 'react';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, Bookmark, Share2, Sparkles, ExternalLink } from 'lucide-react';
import { WorkshopOrEvent } from '@/lib/types';

interface WorkshopModalProps {
  workshop: WorkshopOrEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRegister: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
}

export default function WorkshopModal({
  workshop,
  isOpen,
  onClose,
  onToggleRegister,
  onToggleBookmark,
  isBookmarked,
}: WorkshopModalProps) {
  if (!isOpen || !workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d0e14] w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] flex flex-col max-h-[92dvh] sm:max-h-[90vh] overflow-hidden">
        {/* Banner with image and badge */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-xl backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
              {workshop.communityName}
            </span>
            <h2 className="text-lg sm:text-xl font-bold leading-tight mt-1 text-white">
              {workshop.title}
            </h2>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Key Schedule Row */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-2xl text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-400 text-[10px]">Date</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{workshop.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-400 text-[10px]">Timing</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{workshop.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-400 text-[10px]">Venue</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{workshop.venue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-400 text-[10px]">Seats Available</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {workshop.seatsLeft} of {workshop.seatsTotal} left
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
              About This Session
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {workshop.summary}
            </p>
          </div>

          {/* Prerequisites */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1.5">
              Prerequisites & Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 rounded-xl p-3">
              {workshop.prerequisites}
            </p>
          </div>

          {/* Speakers */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Instructors & Mentors
            </h3>
            <div className="space-y-2">
              {workshop.speakers.map((sp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200/80 dark:border-[#1d1f2b] rounded-xl text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{sp.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{sp.role}</p>
                  </div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{sp.org}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {workshop.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 bg-slate-100 dark:bg-[#1a1b26] text-slate-600 dark:text-slate-300 rounded-lg"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white dark:bg-[#0d0e14] border-t border-slate-200 dark:border-[#1d1f2b] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(workshop.id)}
              className={`p-2.5 rounded-xl border transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                  : 'border-slate-200 dark:border-[#1d1f2b] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
              }`}
              title={isBookmarked ? 'Saved in Favourites' : 'Add to Favourites'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(
                    `Check out this campus workshop: ${workshop.title} by ${workshop.communityName}`
                  );
                }
              }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1d1f2b] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onToggleRegister(workshop.id)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all min-h-[44px] cursor-pointer ${
              workshop.registered
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-sm shadow-indigo-600/30'
            }`}
          >
            {workshop.registered ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Registered (Cancel)</span>
              </>
            ) : (
              <>
                <span>Register for Workshop</span>
                <span className="text-indigo-200 text-xs">· Free</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

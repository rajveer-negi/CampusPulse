'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Download,
  Filter,
  X,
  ChevronRight,
  Plus,
  Flame,
  Briefcase,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { CalendarEvent } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
  onToggleEventStatus: (id: string) => void;
  theme?: ThemeColor;
}

export default function CalendarModal({
  isOpen,
  onClose,
  events,
  onToggleEventStatus,
  theme = 'indigo',
}: CalendarModalProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Academic' | 'Workshop' | 'Placement' | 'Hackathon' | 'Administration'>('All');
  const [selectedMonth, setSelectedMonth] = useState<'October 2026' | 'All'>('October 2026');
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredEvents = events.filter((e) => {
    if (selectedFilter !== 'All' && e.type !== selectedFilter) return false;
    return true;
  });

  // Client-side iCalendar (.ics) download export generator
  const exportIcsCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CampusPulse//Campus Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      ...events.map((e, index) => [
        'BEGIN:VEVENT',
        `UID:campuspulse-${e.id}-${index}@campus.edu`,
        `SUMMARY:${e.title}`,
        `DESCRIPTION:${e.description.replace(/\n/g, ' ')}`,
        `LOCATION:${e.venueOrLink}`,
        `STATUS:CONFIRMED`,
        'END:VEVENT',
      ].join('\r\n')),
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'CampusPulse_Academic_Calendar_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadFeedback('Calendar (.ics) downloaded! Ready to import into Google Calendar or Apple Calendar.');
    setTimeout(() => setDownloadFeedback(null), 3500);
  };

  const getPriorityBadge = (priority: 'urgent' | 'high' | 'normal') => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            Urgent Deadline
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            High Priority
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
            Scheduled
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Academic':
        return <BookOpen className="w-4 h-4 text-rose-600" />;
      case 'Placement':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'Workshop':
        return <CalendarIcon className="w-4 h-4 text-indigo-600" />;
      case 'Hackathon':
        return <Flame className="w-4 h-4 text-purple-600" />;
      default:
        return <CalendarIcon className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d0e14] w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Campus Deadlines & Academic Calendar
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Oct 2026 Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Assignments, mid-term tests, placement cutoffs & club workshop schedules
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportIcsCalendar}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer"
              title="Export .ics to Google Calendar"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .ics</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Feedback Banner */}
        {downloadFeedback && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800 px-4 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{downloadFeedback}</span>
          </div>
        )}

        {/* Filter Pills Toolbar */}
        <div className="p-3 bg-slate-50 dark:bg-[#12131b] border-b border-slate-200/90 dark:border-[#1d1f2b] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {(['All', 'Academic', 'Workshop', 'Placement', 'Hackathon', 'Administration'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === filter
                    ? `${themeConfig.primaryBg} text-white shadow-2xs`
                    : 'bg-white dark:bg-[#1a1b26] hover:bg-slate-200 dark:hover:bg-[#222433] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2b2d3d]'
                }`}
              >
                {filter === 'All' ? 'All Deadlines' : filter}
              </button>
            ))}
          </div>

          <button
            onClick={exportIcsCalendar}
            className="sm:hidden text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .ics</span>
          </button>
        </div>

        {/* Calendar Timeline List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3.5 divide-y divide-slate-100 dark:divide-[#1d1f2b]">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`pt-3.5 first:pt-0 p-3 rounded-2xl transition-all ${
                evt.isCompleted
                  ? 'bg-slate-50 dark:bg-[#12131b]/60 opacity-75'
                  : 'hover:bg-slate-50/80 dark:hover:bg-[#151622]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* Date badge */}
                  <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex flex-col items-center justify-center text-indigo-800 dark:text-indigo-300 shrink-0 font-bold p-1 shadow-2xs">
                    <span className="text-[10px] uppercase font-semibold leading-tight text-indigo-600 dark:text-indigo-400">
                      {evt.date.split(' ')[0]}
                    </span>
                    <span className="text-lg font-black leading-none tabular-nums text-slate-900 dark:text-white">
                      {evt.date.split(' ')[1]?.replace(',', '')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {getTypeIcon(evt.type)}
                        <span>{evt.categoryLabel}</span>
                      </span>
                      {getPriorityBadge(evt.priority)}
                      {evt.deadline && (
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.2 rounded border border-rose-100 dark:border-rose-900/50">
                          {evt.deadline}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-sm font-bold text-slate-900 dark:text-white leading-snug ${
                        evt.isCompleted ? 'line-through text-slate-500 dark:text-slate-500' : ''
                      }`}
                    >
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        {evt.time}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        {evt.venueOrLink}
                      </span>
                      <span>·</span>
                      <span className="text-slate-500 dark:text-slate-400">{evt.organizer}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleEventStatus(evt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      evt.isCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-[#1a1b26] hover:bg-slate-200 dark:hover:bg-[#242636] text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${evt.isCompleted ? 'fill-emerald-600 dark:fill-emerald-400 text-white' : ''}`} />
                    <span>{evt.isCompleted ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#12131b] border-t border-slate-200 dark:border-[#1d1f2b] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Synced with Campus Semester Syllabus & Academic Calendar</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-[#1a1b26] hover:bg-slate-300 dark:hover:bg-[#252738] text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Compass,
  ShieldCheck,
  Flame,
  BookOpen,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { StudentProfile, Community, WorkshopOrEvent, StudyMaterial, CalendarEvent } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';
import CampusLogo from '@/components/CampusLogo';
import StudyMaterialsSection from '@/components/StudyMaterialsSection';

interface HomeTabProps {
  student: StudentProfile;
  communities: Community[];
  workshops: WorkshopOrEvent[];
  studyMaterials: StudyMaterial[];
  calendarEvents: CalendarEvent[];
  theme?: ThemeColor;
  onOpenWorkshop: (ws: WorkshopOrEvent) => void;
  onOpenCommunity: (c: Community) => void;
  onOpenAiModal: (initialPrompt?: string) => void;
  onOpenCalendarModal: () => void;
  onToggleRegister: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onUpvoteMaterial: (id: string) => void;
  onContributeMaterial: (newMaterial: Omit<StudyMaterial, 'id' | 'upvotes' | 'downloads'>) => void;
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({
  student,
  communities,
  workshops,
  studyMaterials,
  calendarEvents,
  theme = 'indigo',
  onOpenWorkshop,
  onOpenCommunity,
  onOpenAiModal,
  onOpenCalendarModal,
  onToggleRegister,
  onToggleBookmark,
  onUpvoteMaterial,
  onContributeMaterial,
  setActiveTab,
}: HomeTabProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  // Filter recommendations based on student's interested areas and branch
  const recommendedWorkshops = workshops.filter((w) => {
    const matchesInterest = student.interestedAreas.some((interest) =>
      w.tags.some(
        (t) =>
          interest.toLowerCase().includes(t.toLowerCase()) ||
          t.toLowerCase().includes(interest.toLowerCase())
      )
    );
    return w.isRecommended || matchesInterest;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Personalized Hero Greeting Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-slate-800">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img
            src="/assets/hero_campus_banner_1790951261041.jpg"
            alt="Campus Tech Atrium"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative p-5 sm:p-8 z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-md flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Junior Induction 2026-27 Active
              </span>
              <span className="text-xs text-slate-400 font-medium">
                · {student.classYear.split(' ')[0] || 'FE'} · {student.branch} · {student.division}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CampusLogo size="lg" theme={theme} withText={false} variant="dark" />
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Welcome to Campus, <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-200 bg-clip-text text-transparent">{student.name.split(' ')[0]}</span>!
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Discover official student chapters, hands-on workshops, syllabus notes, and alumni networks tailored to your goal in{' '}
              <span className="text-indigo-200 font-semibold">{student.futurePath || 'Engineering'}</span>.
            </p>

            {/* Quick stats & Calendar trigger strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1 text-xs text-slate-300">
              <div>
                <span className="text-lg font-black text-white tabular-nums">{student.stats.activityScore}</span>
                <span className="text-slate-400 ml-1.5">Points</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div>
                <span className="text-lg font-black text-white tabular-nums">{student.stats.communitiesJoined}</span>
                <span className="text-slate-400 ml-1.5">Clubs Joined</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div>
                <span className="text-lg font-black text-white tabular-nums">{student.stats.networkCount}+</span>
                <span className="text-slate-400 ml-1.5">Network</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <button
                onClick={onOpenCalendarModal}
                className="text-xs font-semibold text-rose-300 hover:text-white flex items-center gap-1 transition-colors underline underline-offset-4"
              >
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>View Deadlines Calendar</span>
              </button>
            </div>
          </div>

          {/* Quick AI Trigger Box in Hero */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-3xl flex flex-col gap-3 md:w-72 shrink-0">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Campus AI Query Advisor</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Ask about workshops, exam deadlines, DSA notes, or club recruitment roadmaps.
            </p>
            <button
              onClick={() => onOpenAiModal(`Which technical committee should I join for ${student.branch}?`)}
              className={`w-full py-2.5 px-3 text-white rounded-xl text-xs font-bold shadow-md transition-all text-center cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
            >
              Ask AI Recommendation
            </button>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Campus Deadlines Alert Strip (Change 4) */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/30 border border-rose-200/90 dark:border-rose-900/50 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Next Campus Deadline: Assignment 1 (Data Structures & C++)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                Oct 08
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Submit lab codes & memory trace diagrams on Moodle LMS · Google Internship Cutoff on Oct 12
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCalendarModal}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#12131b] hover:bg-slate-50 dark:hover:bg-[#1a1b26] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 shadow-2xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Open Full Calendar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Study Materials Section (Change 8) */}
      <StudyMaterialsSection
        materials={studyMaterials}
        student={student}
        theme={theme}
        onUpvote={onUpvoteMaterial}
        onContributeMaterial={onContributeMaterial}
      />

      {/* 4. Best Recommendations: Workshops */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Best Recommendations: Workshops</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                Curated for You
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hands-on lab sessions aligned with your {student.interestedAreas.slice(0, 2).join(' & ')} interests
            </p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className={`text-xs font-semibold ${themeConfig.primaryText} hover:underline flex items-center gap-1 transition-colors cursor-pointer`}
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedWorkshops.map((ws) => {
            const isBookmarked = student.favourites.includes(ws.id);
            return (
              <div
                key={ws.id}
                className="group bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200 dark:border-[#1d1f2b] hover:border-indigo-400 dark:hover:border-indigo-500 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                {/* Image Header with seats & bookmark */}
                <div
                  className="relative h-44 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onOpenWorkshop(ws)}
                >
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Seats remaining chip */}
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-semibold text-white border border-white/20">
                    <span className="text-emerald-400 font-bold">{ws.seatsLeft}</span> seats left
                  </div>

                  {/* Bookmark button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(ws.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-colors cursor-pointer"
                    title={isBookmarked ? 'Saved' : 'Bookmark'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-white'
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
                      {ws.communityName}
                    </span>
                    <h3 className="text-sm font-bold text-white line-clamp-1 leading-snug">
                      {ws.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {ws.date.split(',')[1] || ws.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {ws.time.split('-')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {ws.summary}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 border-t border-slate-100 dark:border-[#1d1f2b] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenWorkshop(ws)}
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Details & Syllabus
                    </button>

                    <button
                      onClick={() => onToggleRegister(ws.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        ws.registered
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : `${themeConfig.primaryBg} ${themeConfig.primaryHover} text-white shadow-xs`
                      }`}
                    >
                      {ws.registered ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Registered</span>
                        </>
                      ) : (
                        <span>Quick Register</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Recommended Campus Communities */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Recommended Campus Communities & Clubs
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Official chapters authored by committee leads, ready for junior membership
            </p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className={`text-xs font-semibold ${themeConfig.primaryText} hover:underline flex items-center gap-1 cursor-pointer`}
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {communities.slice(0, 3).map((comm) => (
            <div
              key={comm.id}
              onClick={() => onOpenCommunity(comm)}
              className="group bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200 dark:border-[#1d1f2b] p-5 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${comm.gradient} flex items-center justify-center text-white font-bold text-sm shadow-xs`}
                  >
                    {comm.shortCode.slice(0, 3)}
                  </div>
                  {comm.joined ? (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Member
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      Open to Juniors
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                    {comm.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {comm.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-[#1d1f2b] flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {comm.membersCount} students
                </span>
                <span className={`font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5 ${themeConfig.primaryText}`}>
                  View Club <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

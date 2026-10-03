'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  Calendar,
  MapPin,
  Check,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Bookmark,
  Briefcase,
  GraduationCap,
  Layers,
  Compass,
} from 'lucide-react';
import { Community, WorkshopOrEvent, MentorPeer, StudentProfile, AlumniProfile, PlacementOpportunity } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';
import AlumniSection from '@/components/AlumniSection';
import PlacementsSection from '@/components/PlacementsSection';

interface ExploreTabProps {
  communities: Community[];
  workshops: WorkshopOrEvent[];
  mentorsPeers: MentorPeer[];
  alumni: AlumniProfile[];
  placements: PlacementOpportunity[];
  student: StudentProfile;
  theme?: ThemeColor;
  onOpenWorkshop: (ws: WorkshopOrEvent) => void;
  onOpenCommunity: (c: Community) => void;
  onToggleJoinCommunity: (id: string) => void;
  onToggleRegisterWorkshop: (id: string) => void;
  onToggleBookmarkWorkshop: (id: string) => void;
  onToggleConnectUser: (id: string) => void;
  onToggleConnectAlumni: (id: string) => void;
  onApplyPlacement: (id: string) => void;
  onStartChatWithUser: (user: MentorPeer) => void;
  searchFilter: string;
}

export default function ExploreTab({
  communities,
  workshops,
  mentorsPeers,
  alumni,
  placements,
  student,
  theme = 'indigo',
  onOpenWorkshop,
  onOpenCommunity,
  onToggleJoinCommunity,
  onToggleRegisterWorkshop,
  onToggleBookmarkWorkshop,
  onToggleConnectUser,
  onToggleConnectAlumni,
  onApplyPlacement,
  onStartChatWithUser,
  searchFilter,
}: ExploreTabProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  // Primary sub-navigation for Explore
  const [activeSection, setActiveSection] = useState<'all' | 'clubs' | 'workshops' | 'alumni' | 'placements' | 'mentors'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Technical',
    'Robotics & Hardware',
    'Competitive Coding',
    'Entrepreneurship',
    'Creative & Design',
  ];

  const filteredCommunities = communities.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      !searchFilter ||
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
      c.leadName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredWorkshops = workshops.filter((w) => {
    const matchesSearch =
      !searchFilter ||
      w.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      w.communityName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      w.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesSearch;
  });

  const filteredPeople = mentorsPeers.filter((p) => {
    const matchesSearch =
      !searchFilter ||
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.branch.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.specialties.some((s) => s.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Explore Main Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-[#1d1f2b] scrollbar-none text-xs">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'all'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>All Explore</span>
        </button>

        <button
          onClick={() => setActiveSection('alumni')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'alumni'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
          <span>Alumni Networks ({alumni.length})</span>
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </button>

        <button
          onClick={() => setActiveSection('placements')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'placements'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
          <span>Placements & Internships ({placements.length})</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        <button
          onClick={() => setActiveSection('clubs')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeSection === 'clubs'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          Clubs & Chapters ({communities.length})
        </button>

        <button
          onClick={() => setActiveSection('workshops')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeSection === 'workshops'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          Workshops ({workshops.length})
        </button>

        <button
          onClick={() => setActiveSection('mentors')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeSection === 'mentors'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          Campus Mentors & Peers
        </button>
      </div>

      {/* 2. Alumni Network Section (Change 5) */}
      {(activeSection === 'all' || activeSection === 'alumni') && (
        <AlumniSection
          alumni={alumni}
          student={student}
          theme={theme}
          onToggleConnectAlumni={onToggleConnectAlumni}
          onSendDirectMessage={(name, role) => {}}
        />
      )}

      {/* 3. Placement Opportunities Section (Change 6) */}
      {(activeSection === 'all' || activeSection === 'placements') && (
        <PlacementsSection
          placements={placements}
          student={student}
          theme={theme}
          onApplyPlacement={onApplyPlacement}
        />
      )}

      {/* Category Pills (for Clubs & Workshops) */}
      {(activeSection === 'all' || activeSection === 'clubs' || activeSection === 'workshops') && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">Filter By Domain:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? `${themeConfig.primaryBg} text-white shadow-xs`
                  : 'bg-white dark:bg-[#12131b] hover:bg-slate-100 dark:hover:bg-[#1a1b26] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#222432]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 4. Communities Section */}
      {(activeSection === 'all' || activeSection === 'clubs') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Communities & Student Chapters
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Technical, competitive, and research committees welcoming juniors
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {filteredCommunities.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCommunities.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Card top banner */}
                <div
                  className={`p-4 bg-gradient-to-r ${c.gradient} text-white cursor-pointer`}
                  onClick={() => onOpenCommunity(c)}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      {c.category}
                    </span>
                    <span className="text-xs font-semibold text-white/90">
                      {c.membersCount} Members
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2 leading-snug">
                    {c.name}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {c.shortDesc}
                  </p>

                  <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#12131b] p-2.5 rounded-xl border border-slate-100 dark:border-[#1d1f2b]">
                    <p>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Lead:</span> {c.leadName} ({c.leadRole})
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Upcoming:</span> {c.upcomingEventCount} sessions this month
                    </p>
                  </div>

                  {/* Footer Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-[#1d1f2b]">
                    <button
                      onClick={() => onOpenCommunity(c)}
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      View Info
                    </button>

                    <button
                      onClick={() => onToggleJoinCommunity(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        c.joined
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : `${themeConfig.primaryBg} ${themeConfig.primaryHover} text-white shadow-xs`
                      }`}
                    >
                      {c.joined ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Joined</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Join Club</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Workshops & Seminars Section */}
      {(activeSection === 'all' || activeSection === 'workshops') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Workshops & Seminars Catalog
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive hands-on bootcamps, speaker sessions, and tech primers
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {filteredWorkshops.length} Scheduled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredWorkshops.map((ws) => {
              const isBookmarked = student.favourites.includes(ws.id);
              return (
                <div
                  key={ws.id}
                  className="bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200 dark:border-[#1d1f2b] p-4 sm:p-5 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 justify-between"
                >
                  <div
                    className="w-full sm:w-36 h-36 sm:h-auto rounded-2xl overflow-hidden bg-slate-900 shrink-0 relative cursor-pointer"
                    onClick={() => onOpenWorkshop(ws)}
                  >
                    <img
                      src={ws.image}
                      alt={ws.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-semibold">
                      {ws.type}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-indigo-400">
                          {ws.communityName}
                        </span>
                        <button
                          onClick={() => onToggleBookmarkWorkshop(ws.id)}
                          className="text-slate-400 hover:text-amber-400 transition-colors p-1 cursor-pointer"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>

                      <h3
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-400 transition-colors cursor-pointer mt-0.5 line-clamp-1"
                        onClick={() => onOpenWorkshop(ws)}
                      >
                        {ws.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {ws.summary}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-[#1d1f2b]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          {ws.date.split(',')[1] || ws.date}
                        </span>
                        <span>·</span>
                        <span className="text-emerald-500 font-semibold">
                          {ws.seatsLeft} seats left
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => onOpenWorkshop(ws)}
                          className="text-xs font-semibold text-indigo-400 hover:underline cursor-pointer"
                        >
                          View Syllabus
                        </button>

                        <button
                          onClick={() => onToggleRegisterWorkshop(ws.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            ws.registered
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : `${themeConfig.primaryBg} ${themeConfig.primaryHover} text-white shadow-xs`
                          }`}
                        >
                          {ws.registered ? 'Registered' : 'Register Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Campus Mentors & Peers Section */}
      {(activeSection === 'all' || activeSection === 'mentors') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Senior Mentors & Campus Peers
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Senior club mentors and peer freshmen in {student.branch.split(' ')[0]}
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {filteredPeople.length} Profiles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPeople.map((person) => (
              <div
                key={person.id}
                className="bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200 dark:border-[#1d1f2b] p-4 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {person.name}
                      </h3>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                          person.role === 'Club Lead'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : person.role === 'Senior Mentor'
                            ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                            : 'bg-slate-100 dark:bg-[#181924] text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {person.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{person.branch}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {person.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {person.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181924] text-slate-600 dark:text-slate-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-[#1d1f2b] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onToggleConnectUser(person.id)}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      person.connected
                        ? 'bg-slate-100 dark:bg-[#181924] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#202130]'
                        : `${themeConfig.primaryBg} ${themeConfig.primaryHover} text-white`
                    }`}
                  >
                    {person.connected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onStartChatWithUser(person)}
                    className="p-2 text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl border border-indigo-200 dark:border-indigo-900 transition-colors cursor-pointer"
                    title="Direct Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

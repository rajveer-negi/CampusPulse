'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  Sparkles,
  Bell,
  Home,
  Compass,
  MessageSquare,
  User,
  GraduationCap,
  Calendar,
  ChevronRight,
  Edit3,
  Palette,
  Briefcase,
  BookOpen,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { StudentProfile } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';
import CampusLogo from '@/components/CampusLogo';

interface NavbarProps {
  student: StudentProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiModal: (initialPrompt?: string) => void;
  onOpenRegisterModal: () => void;
  onOpenCalendarModal: () => void;
  onOpenAuthModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  registeredCount: number;
  theme?: ThemeColor;
  onSelectTheme?: (theme: ThemeColor) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Navbar({
  student,
  activeTab,
  setActiveTab,
  onOpenAiModal,
  onOpenRegisterModal,
  onOpenCalendarModal,
  onOpenAuthModal,
  searchQuery,
  setSearchQuery,
  registeredCount,
  theme = 'indigo',
  onSelectTheme,
  darkMode = false,
  onToggleDarkMode,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  // Close hamburger menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowNotifications(false);
        setShowThemePicker(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Assignment 1 Due Soon',
      text: 'Data Structures & C++ submission cutoff on Oct 08 at 11:59 PM.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Google Summer Internship Drive',
      text: 'Application portal deadline is Oct 12. Check Explore → Placements.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Workshop Confirmed',
      text: 'Your registration for Full-Stack Cloud with GDSC is active!',
      time: '2h ago',
      unread: false,
    },
  ];

  const handleNavSelect = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const studentName = student?.name || 'Aaryan Shaikh';
  const firstName = studentName.split(' ')[0] || 'Student';
  const initials = studentName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const branchName = student?.branch || 'Computer Engineering';
  const classYear = student?.classYear || 'FE (First Year Junior)';
  const shortYear = classYear.split(' ')[0] || 'FE';
  const division = student?.division || 'Division B';
  const rollNo = student?.rollNo || 'CS-2024-042';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md border-b shadow-2xs transition-colors duration-200 ${
          darkMode
            ? 'bg-[#070709]/95 border-[#1c1d25] text-slate-100'
            : 'bg-white/95 border-slate-200/80 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Main Bar Row */}
          <div className="h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Top-Left: Hamburger & Brand Logo */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className={`p-2 rounded-xl transition-all flex items-center justify-center min-w-[40px] min-h-[40px] cursor-pointer ${
                  darkMode
                    ? 'text-slate-200 hover:bg-white/10'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                }`}
                title="Open Campus Navigation Menu"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Brand Logo Component */}
              <div
                onClick={() => setActiveTab('home')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <CampusLogo
                  size="md"
                  theme={theme}
                  withText={true}
                  variant={darkMode ? 'dark' : 'light'}
                />
              </div>
            </div>

            {/* Desktop Search & AI Input */}
            <div className="hidden sm:flex flex-1 max-w-lg mx-2 sm:mx-4">
              <div className="relative w-full flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workshops, clubs, study notes, placements..."
                  className={`w-full pl-10 pr-26 py-2 text-xs sm:text-sm rounded-xl transition-all border ${
                    darkMode
                      ? 'bg-[#101117] hover:bg-[#14151f] focus:bg-[#0c0d12] text-slate-100 placeholder-slate-500 border-[#222432] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      : 'bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 border-slate-200/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                  }`}
                />
                <div className="absolute inset-y-0 right-1 flex items-center pr-1">
                  <button
                    type="button"
                    onClick={() => onOpenAiModal()}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white rounded-lg shadow-2xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                    title="Ask AI Campus Advisor"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
              {/* Mobile Search Toggle */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className={`sm:hidden p-2 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-300 hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Toggle search"
              >
                {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {/* Mobile AI Quick Trigger */}
              <button
                type="button"
                onClick={() => onOpenAiModal()}
                className={`sm:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white rounded-xl shadow-2xs active:scale-95 transition-transform cursor-pointer ${themeConfig.primaryBg}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI</span>
              </button>

              {/* Calendar Quick Action */}
              <button
                type="button"
                onClick={onOpenCalendarModal}
                className={`p-2 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer relative ${
                  darkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                }`}
                title="Open Campus Deadlines Calendar"
              >
                <Calendar className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {/* Light / Dark Mode Toggle Button */}
              {onToggleDarkMode && (
                <button
                  type="button"
                  onClick={onToggleDarkMode}
                  className={`p-2 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${
                    darkMode
                      ? 'text-amber-400 hover:text-amber-300 hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode (#070709)'}
                  aria-label="Toggle Light/Dark Mode"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600" />
                  )}
                </button>
              )}

              {/* Customizable Palette Switcher Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowThemePicker(!showThemePicker)}
                  className={`p-2 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer relative ${
                    darkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title="Customize Color Palette"
                >
                  <Palette className="w-5 h-5" />
                  <span
                    className={`absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ${themeConfig.primaryBg} ring-1 ring-white`}
                  />
                </button>

                {showThemePicker && onSelectTheme && (
                  <div
                    className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                      darkMode ? 'bg-[#101117] border-[#222432] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <div
                      className={`px-2.5 pb-2 border-b flex items-center justify-between ${
                        darkMode ? 'border-slate-800' : 'border-slate-100'
                      }`}
                    >
                      <span className="text-xs font-bold">Choose Palette</span>
                      <span className="text-[10px] text-slate-400">Live Switch</span>
                    </div>
                    <div className="space-y-1 mt-1.5">
                      {(Object.keys(THEME_CONFIGS) as ThemeColor[]).map((tKey) => {
                        const cfg = THEME_CONFIGS[tKey];
                        const isCurrent = theme === tKey;
                        return (
                          <button
                            key={tKey}
                            type="button"
                            onClick={() => {
                              onSelectTheme(tKey);
                              setShowThemePicker(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                              isCurrent
                                ? darkMode ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-900'
                                : darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-50 text-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${cfg.previewClass}`}
                              />
                              <span>{cfg.name}</span>
                            </div>
                            {isCurrent && (
                              <span className="text-[10px] text-indigo-400 font-bold">
                                Active
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    activeTab === 'home'
                      ? `${themeConfig.primaryLightBg} ${themeConfig.primaryText} font-bold`
                      : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    activeTab === 'explore'
                      ? `${themeConfig.primaryLightBg} ${themeConfig.primaryText} font-bold`
                      : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  Explore
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'messages'
                      ? `${themeConfig.primaryLightBg} ${themeConfig.primaryText} font-bold`
                      : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span>Messages</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    activeTab === 'profile'
                      ? `${themeConfig.primaryLightBg} ${themeConfig.primaryText} font-bold`
                      : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  Profile
                </button>
              </nav>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer ${
                    darkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </button>

                {showNotifications && (
                  <div
                    className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl shadow-xl border py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                      darkMode ? 'bg-[#101117] border-[#222432] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between px-3 pb-2 border-b ${
                        darkMode ? 'border-slate-800' : 'border-slate-100'
                      }`}
                    >
                      <span className="text-xs font-bold">Campus Alerts</span>
                      <span className="text-[11px] text-indigo-400 font-semibold">3 New</span>
                    </div>
                    <div className="divide-y divide-slate-100/20 max-h-72 overflow-y-auto mt-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl transition-colors ${
                            darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold">{n.title}</p>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Student Profile Initial Avatar Button */}
              <button
                type="button"
                onClick={onOpenRegisterModal}
                className={`flex items-center gap-2 pl-1 pr-1.5 sm:pr-2.5 py-1 rounded-xl border border-transparent transition-all cursor-pointer ${
                  darkMode ? 'hover:bg-white/10 hover:border-slate-700' : 'hover:bg-slate-100 hover:border-slate-200'
                }`}
                title="Edit Student Profile & Preferences"
              >
                <div
                  className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${themeConfig.previewClass} text-white font-extrabold text-xs flex items-center justify-center shadow-xs`}
                >
                  {initials}
                </div>
                <div className="hidden md:block text-left">
                  <span
                    className={`text-xs font-bold block leading-tight ${
                      darkMode ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    {firstName}
                  </span>
                  <span
                    className={`text-[10px] ${themeConfig.primaryText} font-bold block leading-none truncate max-w-[80px]`}
                  >
                    {shortYear} · {division.replace('Division ', 'Div ')}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Dropdown */}
          {mobileSearchOpen && (
            <div className="sm:hidden pb-3 pt-1 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workshops, notes, placements..."
                  className="w-full pl-9 pr-24 py-2 text-xs bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    onOpenAiModal(searchQuery);
                  }}
                  className={`absolute right-1.5 top-1.5 px-2.5 py-1 text-xs font-semibold text-white rounded-lg flex items-center gap-1 shadow-xs cursor-pointer ${themeConfig.primaryBg}`}
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>AI</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hamburger Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide-in Drawer Container */}
          <div
            className={`relative w-full max-w-xs sm:max-w-sm h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250 border-r transition-colors ${
              darkMode ? 'bg-[#0a0b10] border-[#1d1f2b] text-slate-100' : 'bg-white border-slate-200'
            }`}
          >
            {/* Drawer Header: Student Profile Card */}
            <div className={`p-5 bg-gradient-to-br ${themeConfig.previewClass} text-white relative`}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md p-0.5 shadow-md">
                  <div className="w-full h-full rounded-[14px] bg-slate-900/60 flex items-center justify-center font-black text-lg text-white">
                    {initials}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-bold text-base text-white leading-tight">
                    {studentName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/90">
                    <span className="font-semibold text-white">{shortYear}</span>
                    <span>·</span>
                    <span>{division}</span>
                    <span>·</span>
                    <span className="font-mono text-[11px] text-amber-300">{rollNo}</span>
                  </div>
                  <p className="text-[11px] text-white/80 truncate max-w-[180px]">
                    {branchName}
                  </p>
                </div>
              </div>

              {/* Quick Actions inside Drawer */}
              <div className="mt-3.5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenRegisterModal();
                  }}
                  className="py-1.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="py-1.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Switch User</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Mini Strip */}
            <div
              className={`grid grid-cols-3 divide-x py-2.5 text-center text-xs border-b ${
                darkMode
                  ? 'bg-[#070709] border-[#1d1f2b] text-slate-300 divide-[#1d1f2b]'
                  : 'bg-slate-50 border-slate-200/80 divide-slate-100'
              }`}
            >
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase">Score</p>
                <p className={`font-black ${themeConfig.primaryText}`}>{student?.stats?.activityScore || 0} pts</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase">Clubs</p>
                <p className={`font-black ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {student?.stats?.communitiesJoined || 0}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase">Network</p>
                <p className={`font-black ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                  {student?.stats?.networkCount || 0}+
                </p>
              </div>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Campus Navigation
                </p>

                <button
                  type="button"
                  onClick={() => handleNavSelect('home')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'home'
                      ? `${themeConfig.primaryBg} text-white shadow-2xs`
                      : darkMode
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4" />
                    <span>Home & Study Materials</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavSelect('explore')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'explore'
                      ? `${themeConfig.primaryBg} text-white shadow-2xs`
                      : darkMode
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4" />
                    <span>Explore (Clubs, Alumni, Placements)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavSelect('messages')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'messages'
                      ? `${themeConfig.primaryBg} text-white shadow-2xs`
                      : darkMode
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>Community Chats & Mentors</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavSelect('profile')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? `${themeConfig.primaryBg} text-white shadow-2xs`
                      : darkMode
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4" />
                    <span>Student Profile & Color Theme</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              </div>

              {/* Display Theme Mode in Drawer */}
              {onToggleDarkMode && (
                <div className="space-y-1">
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Display Appearance
                  </p>
                  <button
                    type="button"
                    onClick={onToggleDarkMode}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      darkMode
                        ? 'bg-[#12131b] border-[#222432] text-amber-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                      <span>{darkMode ? 'Dark Mode (#070709)' : 'Light Mode'}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {darkMode ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              )}

              {/* Deadlines & Calendar */}
              <div className="space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Academic Tools
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenCalendarModal();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    darkMode
                      ? 'bg-rose-950/30 text-rose-300 border-rose-900/50 hover:bg-rose-950/50'
                      : 'bg-rose-50 text-rose-800 border-rose-100 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    <span>Campus Deadlines Calendar</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                    Active
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAiModal();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    darkMode
                      ? 'bg-indigo-950/30 text-indigo-200 border-indigo-900/50 hover:bg-indigo-950/50'
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900 border-indigo-100 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Ask AI Campus Advisor</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white">
                    Instant
                  </span>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div
              className={`p-4 border-t flex items-center justify-between text-xs ${
                darkMode ? 'border-[#1d1f2b] bg-[#070709] text-slate-400' : 'border-slate-200 bg-slate-50/50 text-slate-500'
              }`}
            >
              <span className={`font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                CampusPulse
              </span>
              <span className="text-[11px]">Academic Term 2026-27</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React from 'react';
import { Home, Compass, MessageSquare, User, Sparkles } from 'lucide-react';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiModal: () => void;
  unreadCount?: number;
  theme?: ThemeColor;
  darkMode?: boolean;
}

export default function BottomNav({
  activeTab,
  setActiveTab,
  onOpenAiModal,
  unreadCount = 2,
  theme = 'indigo',
  darkMode = false,
}: BottomNavProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
    },
    {
      id: 'ai-fab',
      label: 'AI Guide',
      icon: Sparkles,
      isSpecial: true,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      badge: unreadCount,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`fixed bottom-0 left-0 right-0 z-40 pb-safe sm:hidden shadow-lg transition-colors backdrop-blur-lg border-t ${
        darkMode
          ? 'bg-[#070709]/95 border-[#1d1f2b] text-slate-300'
          : 'bg-white/95 border-slate-200/80 text-slate-700'
      }`}
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={onOpenAiModal}
                className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] relative -top-2 group focus:outline-none cursor-pointer"
                aria-label="Ask AI Campus Advisor"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${themeConfig.previewClass} flex items-center justify-center text-white shadow-md group-active:scale-95 transition-transform`}
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
                <span className={`text-[10px] font-bold ${themeConfig.primaryText} mt-0.5`}>
                  AI Guide
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors relative cursor-pointer ${
                isActive
                  ? `${themeConfig.primaryText} font-bold`
                  : darkMode
                  ? 'text-slate-400 hover:text-slate-100'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1">
                {tab.label}
              </span>
              {isActive && (
                <span className={`w-1 h-1 ${themeConfig.primaryBg} rounded-full mt-0.5`} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

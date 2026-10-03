'use client';

import React from 'react';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface CampusLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: ThemeColor;
  withText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export default function CampusLogo({
  size = 'md',
  theme = 'indigo',
  withText = true,
  className = '',
  variant = 'light',
}: CampusLogoProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const sizeMap = {
    sm: { box: 'w-7 h-7', svg: 28, text: 'text-sm', subtext: 'text-[9px]' },
    md: { box: 'w-9 h-9', svg: 36, text: 'text-base', subtext: 'text-[10px]' },
    lg: { box: 'w-12 h-12', svg: 48, text: 'text-xl', subtext: 'text-xs' },
    xl: { box: 'w-16 h-16', svg: 64, text: 'text-2xl', subtext: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // Unique gradient IDs to prevent DOM collision
  const gradId = `logo-grad-${theme}-${size}`;
  const pulseGradId = `pulse-grad-${theme}-${size}`;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon SVG Emblem */}
      <div className={`relative ${currentSize.box} shrink-0 group`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              {theme === 'emerald' && (
                <>
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#0d9488" />
                </>
              )}
              {theme === 'cyan' && (
                <>
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#2563eb" />
                </>
              )}
              {theme === 'violet' && (
                <>
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#c026d3" />
                </>
              )}
              {theme === 'amber' && (
                <>
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#ea580c" />
                </>
              )}
              {theme === 'crimson' && (
                <>
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#dc2626" />
                </>
              )}
              {(!['emerald', 'cyan', 'violet', 'amber', 'crimson'].includes(theme) || theme === 'indigo') && (
                <>
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </>
              )}
            </linearGradient>

            <linearGradient id={pulseGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Rounded Shield Badge Background */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill={`url(#${gradId})`}
          />

          {/* Academic Graduation Mortarboard Cap */}
          {/* Top Diamond Diamond */}
          <path
            d="M24 9L38 16L24 23L10 16L24 9Z"
            fill="white"
            fillOpacity="0.95"
          />

          {/* Under cap skullcap arc */}
          <path
            d="M15 19V27C15 31.5 19 35 24 35C29 35 33 31.5 33 27V19L24 23.5L15 19Z"
            fill="white"
            fillOpacity="0.2"
          />

          {/* Mortarboard Tassel Ribbon */}
          <path
            d="M35 17.5V26.5C35 27.5 33.5 28 33.5 28"
            stroke="#fde047"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="33.5" cy="28.5" r="1.5" fill="#fde047" />

          {/* Dynamic Heartbeat / Pulse Waveform passing across */}
          <path
            d="M8 29.5H16L18.5 25L21.5 34L26 21L29 33L31.5 27.5L34 29.5H40"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Network Nodes */}
          <circle cx="16" cy="29.5" r="1.8" fill="#38bdf8" />
          <circle cx="26" cy="21" r="2.2" fill="#fbbf24" />
          <circle cx="34" cy="29.5" r="1.8" fill="#34d399" />
        </svg>

        {/* Ambient Glow */}
        <div
          className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${themeConfig.previewClass} opacity-20 blur-xs -z-10 group-hover:opacity-40 transition-opacity`}
        />
      </div>

      {/* Brand Typography */}
      {withText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-black tracking-tight ${currentSize.text} ${
                variant === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Campus<span className={`${themeConfig.primaryText}`}>Pulse</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span
            className={`${currentSize.subtext} font-semibold uppercase tracking-wider text-slate-400 mt-0.5`}
          >
            Junior Onboarding & Hub
          </span>
        </div>
      )}
    </div>
  );
}

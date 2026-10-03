export type ThemeColor = 'indigo' | 'emerald' | 'cyan' | 'violet' | 'amber' | 'crimson';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  label: string;
  previewClass: string;
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  primaryLightBg: string;
  primaryBorder: string;
  primaryRing: string;
  gradientFrom: string;
  gradientTo: string;
  accentBadge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  shadowColor: string;
}

export const THEME_CONFIGS: Record<ThemeColor, ThemeConfig> = {
  indigo: {
    id: 'indigo',
    name: 'Electric Indigo',
    label: 'Modern Campus Tech (Default)',
    previewClass: 'from-indigo-600 to-violet-600',
    primaryBg: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    primaryText: 'text-indigo-600',
    primaryLightBg: 'bg-indigo-50',
    primaryBorder: 'border-indigo-200',
    primaryRing: 'focus:ring-indigo-500',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-violet-600',
    accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-200',
    shadowColor: 'shadow-indigo-600/25',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    label: 'Campus Quad & Fresh Vibes',
    previewClass: 'from-emerald-600 to-teal-600',
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryText: 'text-emerald-600',
    primaryLightBg: 'bg-emerald-50',
    primaryBorder: 'border-emerald-200',
    primaryRing: 'focus:ring-emerald-500',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-600',
    accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
    shadowColor: 'shadow-emerald-600/25',
  },
  cyan: {
    id: 'cyan',
    name: 'Ocean Cyan',
    label: 'Cyber & Cloud Engineering',
    previewClass: 'from-cyan-600 to-blue-600',
    primaryBg: 'bg-cyan-600',
    primaryHover: 'hover:bg-cyan-700',
    primaryText: 'text-cyan-600',
    primaryLightBg: 'bg-cyan-50',
    primaryBorder: 'border-cyan-200',
    primaryRing: 'focus:ring-cyan-500',
    gradientFrom: 'from-cyan-600',
    gradientTo: 'to-blue-600',
    accentBadge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-700',
    badgeBorder: 'border-cyan-200',
    shadowColor: 'shadow-cyan-600/25',
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    label: 'AI & Creative Horizon',
    previewClass: 'from-violet-600 to-fuchsia-600',
    primaryBg: 'bg-violet-600',
    primaryHover: 'hover:bg-violet-700',
    primaryText: 'text-violet-600',
    primaryLightBg: 'bg-violet-50',
    primaryBorder: 'border-violet-200',
    primaryRing: 'focus:ring-violet-500',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-fuchsia-600',
    accentBadge: 'bg-violet-50 text-violet-700 border-violet-200',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700',
    badgeBorder: 'border-violet-200',
    shadowColor: 'shadow-violet-600/25',
  },
  amber: {
    id: 'amber',
    name: 'Sunset Amber',
    label: 'Robotics & Hardware Spark',
    previewClass: 'from-amber-600 to-orange-600',
    primaryBg: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    primaryText: 'text-amber-600',
    primaryLightBg: 'bg-amber-50',
    primaryBorder: 'border-amber-200',
    primaryRing: 'focus:ring-amber-500',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-orange-600',
    accentBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-200',
    shadowColor: 'shadow-amber-600/25',
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Flame',
    label: 'Competitive Hackathon & Drive',
    previewClass: 'from-rose-600 to-red-600',
    primaryBg: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    primaryText: 'text-rose-600',
    primaryLightBg: 'bg-rose-50',
    primaryBorder: 'border-rose-200',
    primaryRing: 'focus:ring-rose-500',
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-red-600',
    accentBadge: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200',
    shadowColor: 'shadow-rose-600/25',
  },
};

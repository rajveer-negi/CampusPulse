'use client';

import React, { useState } from 'react';
import {
  Edit3,
  Share2,
  Award,
  Users,
  Bookmark,
  History,
  Calendar,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  Github,
  Linkedin,
  Sparkles,
  Palette,
  LogOut,
  GraduationCap,
  Briefcase,
  Layers,
  Plus,
  X,
  Save,
  Globe,
  FileText,
  Sun,
  Moon,
} from 'lucide-react';
import { StudentProfile, WorkshopOrEvent, Community, StudyMaterial, PlacementOpportunity } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface ProfileTabProps {
  student: StudentProfile;
  workshops: WorkshopOrEvent[];
  communities: Community[];
  studyMaterials?: StudyMaterial[];
  placements?: PlacementOpportunity[];
  onOpenEditModal: () => void;
  onOpenWorkshop: (ws: WorkshopOrEvent) => void;
  onOpenCommunity: (c: Community) => void;
  onToggleBookmark: (id: string) => void;
  onSelectTheme: (theme: ThemeColor) => void;
  onSignOut: () => void;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function ProfileTab({
  student,
  workshops,
  communities,
  studyMaterials = [],
  placements = [],
  onOpenEditModal,
  onOpenWorkshop,
  onOpenCommunity,
  onToggleBookmark,
  onSelectTheme,
  onSignOut,
  onUpdateProfile,
  darkMode = false,
  onToggleDarkMode,
}: ProfileTabProps) {
  const currentTheme = student.themeColor || 'indigo';
  const themeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.indigo;

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'theme' | 'workshops' | 'bookmarks' | 'academic'>('overview');
  const [copied, setCopied] = useState(false);
  const [isEditingInline, setIsEditingInline] = useState(false);

  // Editable Form State
  const [editName, setEditName] = useState(student.name);
  const [editBranch, setEditBranch] = useState(student.branch);
  const [editYear, setEditYear] = useState(student.classYear);
  const [editDivision, setEditDivision] = useState(student.division);
  const [editRollNo, setEditRollNo] = useState(student.rollNo);
  const [editPrnNo, setEditPrnNo] = useState(student.prnNo || 'PRN-2024-010482');
  const [editCgpa, setEditCgpa] = useState(student.cgpa?.toString() || '8.85');
  const [editBio, setEditBio] = useState(student.bio || '');
  const [editFuturePath, setEditFuturePath] = useState(student.futurePath || '');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(
    student.skills || ['Python', 'TypeScript', 'C++', 'React', 'Data Structures']
  );

  // Favourites list
  const favouriteWorkshops = workshops.filter((w) => student.favourites.includes(w.id));
  const favouriteCommunities = communities.filter((c) => student.favourites.includes(c.id));
  const favouriteMaterials = studyMaterials.filter((m) => student.favourites.includes(m.id));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out ${student.name}'s campus student profile (${student.branch}, Roll ${student.rollNo}) on CampusPulse!`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!skillsList.includes(newSkillInput.trim())) {
      const updated = [...skillsList, newSkillInput.trim()];
      setSkillsList(updated);
      onUpdateProfile({ skills: updated });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skillsList.filter((s) => s !== skillToRemove);
    setSkillsList(updated);
    onUpdateProfile({ skills: updated });
  };

  const handleSaveInlineEdit = () => {
    onUpdateProfile({
      name: editName,
      branch: editBranch as any,
      classYear: editYear,
      division: editDivision,
      rollNo: editRollNo,
      prnNo: editPrnNo,
      cgpa: parseFloat(editCgpa) || 8.85,
      bio: editBio,
      futurePath: editFuturePath,
      skills: skillsList,
    });
    setIsEditingInline(false);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* 1. Profile Header Card */}
      <div className={`rounded-3xl border overflow-hidden shadow-xs transition-colors duration-200 ${
        darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
      }`}>
        {/* Cover top gradient */}
        <div
          className={`h-32 sm:h-36 bg-gradient-to-r ${themeConfig.previewClass} relative transition-all duration-300`}
        />

        <div className="p-4 sm:p-8 -mt-12 sm:-mt-16 relative space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-3 sm:gap-4">
              <div
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr ${themeConfig.previewClass} text-white font-black text-2xl sm:text-3xl flex items-center justify-center ring-4 ring-white shadow-md shrink-0 select-none`}
              >
                {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Distinct high-contrast name badge with thick white border */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-slate-950/95 dark:bg-black/95 backdrop-blur-md rounded-2xl border-[2.5px] border-white shadow-xl ring-2 ring-white/60">
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {student.name}
                    </h1>
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full ${themeConfig.badgeBg} ${themeConfig.badgeText} border border-white/60 shadow-xs`}
                    >
                      {student.classYear.split(' ')[0] || 'FE'}
                    </span>
                  </div>
                </div>

                <p className={`text-xs sm:text-sm font-semibold pl-0.5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {student.branch} · {student.division}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono pl-0.5">
                  <span>
                    Roll: <strong className={darkMode ? 'text-slate-200 font-bold' : 'text-slate-800'}>{student.rollNo}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    PRN: <strong className={darkMode ? 'text-slate-200 font-bold' : 'text-slate-800'}>{student.prnNo || '2024010482'}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 w-full sm:w-auto">
              <button
                onClick={() => setIsEditingInline(!isEditingInline)}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
                  darkMode
                    ? 'bg-[#1a1b26] hover:bg-[#232433] text-slate-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingInline ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              <button
                onClick={handleShare}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Link!' : 'Share Profile'}</span>
              </button>
            </div>
          </div>

          {/* 3 Key Stats Boxes */}
          <div className={`grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl text-center border ${
            darkMode ? 'bg-[#12131b] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200/90'
          }`}>
            <div className="space-y-0.5">
              <p className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                Activity Score
              </p>
              <p className={`text-lg sm:text-2xl font-black ${themeConfig.primaryText} tabular-nums`}>
                {student.stats.activityScore}
              </p>
              <p className="text-[10px] text-slate-500">Points</p>
            </div>

            <div className={`space-y-0.5 border-l ${darkMode ? 'border-[#1d1f2b]' : 'border-slate-200'}`}>
              <p className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                CGPA
              </p>
              <p className={`text-lg sm:text-2xl font-black tabular-nums ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {student.cgpa || 8.85}
              </p>
              <p className="text-[10px] text-emerald-500 font-semibold">Semester 1</p>
            </div>

            <div className={`space-y-0.5 border-l ${darkMode ? 'border-[#1d1f2b]' : 'border-slate-200'}`}>
              <p className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                Clubs
              </p>
              <p className={`text-lg sm:text-2xl font-black tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {student.stats.communitiesJoined}
              </p>
              <p className="text-[10px] text-slate-500">Joined</p>
            </div>

            <div className={`space-y-0.5 border-l ${darkMode ? 'border-[#1d1f2b]' : 'border-slate-200'}`}>
              <p className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                Network
              </p>
              <p className={`text-lg sm:text-2xl font-black tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {student.stats.networkCount}+
              </p>
              <p className="text-[10px] text-slate-500">Connections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Profile Edit Form (Toggled when user clicks Edit Profile) */}
      {isEditingInline && (
        <div className={`rounded-3xl border-2 p-6 shadow-md space-y-4 animate-in fade-in duration-200 ${
          darkMode ? 'bg-[#0d0e14] border-indigo-500/50 text-slate-100' : 'bg-white border-indigo-300 text-slate-900'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${
            darkMode ? 'border-[#1d1f2b]' : 'border-slate-100'
          }`}>
            <h3 className="text-base font-bold flex items-center gap-2">
              <Edit3 className={`w-4 h-4 ${themeConfig.primaryText}`} />
              <span>Edit Student Information</span>
            </h3>
            <button
              onClick={() => setIsEditingInline(false)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Year</label>
              <select
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-slate-900 dark:text-slate-100"
              >
                <option value="FE (First Year Junior)">FE (1st Year Junior)</option>
                <option value="SE (Second Year Junior)">SE (2nd Year Junior)</option>
                <option value="TE (Third Year Junior)">TE (3rd Year Junior)</option>
                <option value="BE (Final Year Senior)">BE (Final Year Senior)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department / Branch</label>
              <select
                value={editBranch}
                onChange={(e) => setEditBranch(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-slate-900 dark:text-slate-100"
              >
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication">Electronics & Telecomm</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Class / Division</label>
              <input
                type="text"
                value={editDivision}
                onChange={(e) => setEditDivision(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Roll Number</label>
              <input
                type="text"
                value={editRollNo}
                onChange={(e) => setEditRollNo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl font-mono text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">PRN Registration No</label>
              <input
                type="text"
                value={editPrnNo}
                onChange={(e) => setEditPrnNo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl font-mono text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cumulative CGPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={editCgpa}
                onChange={(e) => setEditCgpa(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl font-mono text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Role / Career Track</label>
              <input
                type="text"
                value={editFuturePath}
                onChange={(e) => setEditFuturePath(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Student Bio</label>
              <textarea
                rows={2}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditingInline(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveInlineEdit}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-1.5 cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-Tabs Toolbar */}
      <div className={`flex items-center gap-1.5 overflow-x-auto pb-1 border-b scrollbar-none text-xs ${
        darkMode ? 'border-[#1d1f2b]' : 'border-slate-200'
      }`}>
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'overview'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : darkMode
              ? 'text-slate-300 hover:bg-white/10'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Overview & Skills
        </button>

        <button
          onClick={() => setActiveSubTab('theme')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'theme'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : darkMode
              ? 'text-slate-300 hover:bg-white/10'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Color & Theme Mode</span>
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </button>

        <button
          onClick={() => setActiveSubTab('workshops')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'workshops'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : darkMode
              ? 'text-slate-300 hover:bg-white/10'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Registered Sessions ({student.history.length})
        </button>

        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`px-4 py-2 font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'bookmarks'
              ? `${themeConfig.primaryBg} text-white shadow-xs`
              : darkMode
              ? 'text-slate-300 hover:bg-white/10'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bookmarks ({student.favourites.length})
        </button>
      </div>

      {/* Sub-Tab 1: Overview & Skills */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Bio & Career Track */}
          <div className={`rounded-3xl border p-6 space-y-4 transition-colors ${
            darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Career Track & Student Bio
            </h3>

            <div className={`p-3 border rounded-2xl flex items-center gap-2.5 ${
              darkMode ? 'bg-[#12131b] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200'
            }`}>
              <Sparkles className={`w-4 h-4 ${themeConfig.primaryText}`} />
              <span className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Target Track:</span>
              <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{student.futurePath || 'Full-Stack & Applied AI Engineer'}</span>
            </div>

            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {student.bio ||
                'First year Computer Engineering student passionate about distributed systems, open-source AI, and competitive programming.'}
            </p>
          </div>

          {/* Technical Skills Showcase (Add & Remove) */}
          <div className={`rounded-3xl border p-6 space-y-4 transition-colors ${
            darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Skills & Tech Stack Tags
              </h3>
              <span className="text-xs text-slate-400">{skillsList.length} Added</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    darkMode
                      ? 'bg-[#1a1b26] hover:bg-[#232433] text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-500 cursor-pointer"
                    title="Remove skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill input form */}
            <form onSubmit={handleAddSkill} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add skill (e.g. Next.js, Docker, Java, Figma)..."
                className={`flex-1 px-3 py-2 border rounded-xl text-xs transition-colors ${
                  darkMode
                    ? 'bg-[#12131b] border-[#222432] text-white placeholder-slate-500 focus:border-indigo-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1 cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Social & Contact Strip */}
          <div className={`rounded-3xl border p-6 space-y-3 transition-colors ${
            darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Verified Student Profiles & Portfolios
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 border rounded-xl flex items-center gap-2.5 ${
                darkMode ? 'bg-[#12131b] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200'
              }`}>
                <Mail className="w-4 h-4 text-slate-400" />
                <span className={`font-medium truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{student.email}</span>
              </div>

              <div className={`p-3 border rounded-xl flex items-center gap-2.5 ${
                darkMode ? 'bg-[#12131b] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200'
              }`}>
                <Github className={`w-4 h-4 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`} />
                <a
                  href={student.github.startsWith('http') ? student.github : `https://${student.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline font-medium truncate"
                >
                  {student.github}
                </a>
              </div>

              <div className={`p-3 border rounded-xl flex items-center gap-2.5 ${
                darkMode ? 'bg-[#12131b] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200'
              }`}>
                <Linkedin className="w-4 h-4 text-blue-400" />
                <a
                  href={student.linkedin.startsWith('http') ? student.linkedin : `https://${student.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline font-medium truncate"
                >
                  {student.linkedin}
                </a>
              </div>

              <div className={`p-3 border rounded-xl flex items-center gap-2.5 ${
                darkMode ? 'bg-[#12131b] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200'
              }`}>
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className={`font-medium truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {student.portfolioUrl || 'https://aaryan.dev'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Customizable Color Palette & Light/Dark Mode (Change 1) */}
      {activeSubTab === 'theme' && (
        <div className={`rounded-3xl border p-6 space-y-6 transition-colors ${
          darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
        }`}>
          {/* Light / Dark Mode Toggle Feature Card (#070709) */}
          <div className={`rounded-2xl border p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
            darkMode ? 'bg-[#12131b] border-[#222432]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30' : 'bg-slate-900 text-white'
              }`}>
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-200" />}
              </div>
              <div>
                <h4 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <span>Display Mode</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                    {darkMode ? 'Dark (#070709)' : 'Light Mode'}
                  </span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {darkMode
                    ? 'Ultra-deep dark theme active with custom hex #070709 background and vivid accents.'
                    : 'Clean light campus background active for crisp high daylight contrast.'}
                </p>
              </div>
            </div>
            {onToggleDarkMode && (
              <button
                type="button"
                onClick={onToggleDarkMode}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0 ${
                  darkMode
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode (#070709)'}</span>
              </button>
            )}
          </div>

          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <Palette className={`w-5 h-5 ${themeConfig.primaryText}`} />
              <span>Customizable Color Palette</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select your personalized campus theme palette. Updates all primary buttons, badges, gradients, and active navigations across CampusPulse in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(THEME_CONFIGS) as ThemeColor[]).map((themeKey) => {
              const cfg = THEME_CONFIGS[themeKey];
              const isSelected = currentTheme === themeKey;

              return (
                <div
                  key={themeKey}
                  onClick={() => onSelectTheme(themeKey)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? darkMode
                        ? 'border-indigo-400 shadow-md bg-[#161722] ring-2 ring-indigo-400/20'
                        : 'border-slate-900 shadow-md bg-slate-50/80 ring-2 ring-slate-900/10'
                      : darkMode
                      ? 'border-[#1d1f2b] hover:border-slate-700 bg-[#12131b]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {/* Color preview ribbon */}
                  <div
                    className={`h-12 w-full rounded-xl bg-gradient-to-r ${cfg.previewClass} shadow-xs flex items-center justify-end p-2.5 text-white`}
                  >
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cfg.name}</span>
                      {isSelected && (
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText} border ${cfg.badgeBorder}`}>
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cfg.label}</p>
                  </div>

                  <div className={`pt-2 border-t flex items-center gap-2 ${darkMode ? 'border-[#1d1f2b]' : 'border-slate-200/60'}`}>
                    <span className={`w-3 h-3 rounded-full ${cfg.primaryBg}`} />
                    <span className={`text-[11px] font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Preview Accent</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Registered Workshops */}
      {activeSubTab === 'workshops' && (
        <div className={`rounded-3xl border p-6 space-y-4 transition-colors ${
          darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Enrolled Bootcamps & Verified Activity
          </h3>

          <div className={`space-y-3 divide-y ${darkMode ? 'divide-[#1d1f2b]' : 'divide-slate-100'}`}>
            {student.history.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-indigo-400 block">
                    {item.communityName} · {item.type}
                  </span>
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  <span className="text-slate-400">{item.date}</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Certificate Earned'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : item.status === 'Attended'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Bookmarks */}
      {activeSubTab === 'bookmarks' && (
        <div className={`rounded-3xl border p-6 space-y-5 transition-colors ${
          darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Saved Workshops & Resources
          </h3>

          <div className="space-y-3">
            {favouriteWorkshops.map((ws) => (
              <div
                key={ws.id}
                onClick={() => onOpenWorkshop(ws)}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                  darkMode
                    ? 'bg-[#12131b] hover:bg-[#181924] border-[#1d1f2b]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-indigo-400">{ws.communityName}</span>
                  <h4 className={`font-bold text-xs sm:text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ws.title}</h4>
                  <span className="text-xs text-slate-400">{ws.date}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(ws.id);
                  }}
                  className="text-amber-400 hover:text-amber-500 p-1 cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 fill-amber-400" />
                </button>
              </div>
            ))}

            {favouriteWorkshops.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">
                No bookmarks yet. Save workshops, clubs, and notes to access them quickly here!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sign Out / Account Switcher Footer */}
      <div className={`rounded-2xl border p-4 flex items-center justify-between transition-colors ${
        darkMode ? 'bg-[#0d0e14] border-[#1d1f2b]' : 'bg-slate-50 border-slate-200'
      }`}>
        <div>
          <span className={`text-xs font-bold block ${darkMode ? 'text-white' : 'text-slate-800'}`}>Active Student Session</span>
          <span className="text-[11px] text-slate-400">{student.email}</span>
        </div>

        <button
          onClick={onSignOut}
          className={`px-4 py-2 rounded-xl border text-xs font-semibold text-rose-500 flex items-center gap-1.5 transition-colors cursor-pointer ${
            darkMode
              ? 'bg-[#12131b] hover:bg-rose-950/30 border-[#222432] hover:border-rose-900'
              : 'bg-white hover:bg-rose-50 border-slate-200 hover:border-rose-200'
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Switch Account / Sign Out</span>
        </button>
      </div>
    </div>
  );
}

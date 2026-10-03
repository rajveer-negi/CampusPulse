'use client';

import React, { useState } from 'react';
import {
  X,
  Check,
  GraduationCap,
  Briefcase,
  Layers,
  Compass,
  Home,
  Clock,
  Target,
  ChevronDown,
  Sparkles,
  User,
  Mail,
  Phone,
  Github,
  Linkedin,
} from 'lucide-react';
import { StudentProfile, BranchType } from '@/lib/types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

const ALL_BRANCHES: BranchType[] = [
  'Computer Engineering',
  'Artificial Intelligence & Data Science',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
];

const ALL_YEARS = [
  'FE (First Year Junior)',
  'SE (Second Year)',
  'TE (Third Year)',
  'BE (Final Year)',
  'ME / M.Tech (Postgraduate)',
];

const ALL_DIVISIONS = [
  'Division A',
  'Division B',
  'Division C',
  'Division D',
  'Division E',
  'Division F',
  'Division G',
  'Honours / Elective Batch',
];

const ALL_SEMESTERS = [
  'Semester 1 (Autumn 2026)',
  'Semester 2 (Spring 2027)',
  'Semester 3 (Autumn 2027)',
  'Semester 4 (Spring 2028)',
  'Semester 5 (Autumn 2028)',
  'Semester 6 (Spring 2029)',
  'Semester 7 & 8 (Final Year)',
];

const ALL_RESIDENCE_TYPES = [
  'Day Scholar (Local Commuter)',
  'Campus Hostel (Hostelite)',
  'Paying Guest (PG / Flat Nearby)',
];

const ALL_CAREER_PATHS = [
  'Full-Stack & Applied AI Engineer',
  'AI & Machine Learning Researcher',
  'Cloud Infrastructure & DevOps Engineer',
  'Autonomous Robotics & Embedded Systems Engineer',
  'Competitive Coder & Algorithmic Problem Solver',
  'Cybersecurity & Ethical Hacking Specialist',
  'Data Science & Business Intelligence Analyst',
  'UI/UX & Product Design Specialist',
  'Mobile App Developer (iOS / Android / Flutter)',
  'Higher Studies & MS / PhD Aspirant',
  'Tech Startup Founder / Entrepreneur',
  'Custom Career Track...',
];

const ALL_PRIMARY_GOALS = [
  'Discover Technical Workshops & Bootcamps',
  'Join Core Committee / Club Technical Teams',
  'Find Senior Mentors & Project Guidance',
  'Form Hackathon Teams & Build Portfolio',
  'Coding Rounds & Placement Prep',
  'Open-Source & Research Publications',
];

const ALL_WORKSHOP_FORMATS = [
  'Weekend In-Person Labs (Saturday/Sunday)',
  'Weekday Evening Sessions (After 4 PM)',
  'Hybrid / Online Bootcamps',
  'Any Format (Flexible Availability)',
];

const ALL_INTEREST_AREAS = [
  'AI & Machine Learning',
  'Web Development',
  'Robotics & Hardware',
  'Competitive Programming',
  'Cloud & DevOps',
  'UI/UX & Product Design',
  'Cyber Security',
  'IoT & Embedded Systems',
  'Game Dev & 3D',
  'Startup & Entrepreneurship',
];

const ALL_COMMITTEES = [
  'GDSC Student Chapter',
  'Robotics & Automation Society',
  'ACM Student Chapter',
  'IEEE Student Branch',
  'E-Cell Entrepreneurship Club',
  'Design Syndicate',
];

export default function RegisterModal({
  isOpen,
  onClose,
  student,
  onSave,
}: RegisterModalProps) {
  const [formData, setFormData] = useState<StudentProfile>({
    ...student,
    semester: student.semester || 'Semester 1 (Autumn 2026)',
    residenceType: student.residenceType || 'Day Scholar (Local Commuter)',
    primaryGoal: student.primaryGoal || 'Discover Technical Workshops & Bootcamps',
    preferredFormat: student.preferredFormat || 'Weekend In-Person Labs (Saturday/Sunday)',
  });

  const [isCustomPath, setIsCustomPath] = useState(
    Boolean(student.futurePath && !ALL_CAREER_PATHS.includes(student.futurePath))
  );

  if (!isOpen) return null;

  const toggleInterest = (area: string) => {
    setFormData((prev) => {
      const exists = prev.interestedAreas.includes(area);
      const updated = exists
        ? prev.interestedAreas.filter((a) => a !== area)
        : [...prev.interestedAreas, area];
      return { ...prev, interestedAreas: updated };
    });
  };

  const toggleCommittee = (comm: string) => {
    setFormData((prev) => {
      const exists = prev.interestedCommittees.includes(comm);
      const updated = exists
        ? prev.interestedCommittees.filter((c) => c !== comm)
        : [...prev.interestedCommittees, comm];
      return { ...prev, interestedCommittees: updated };
    });
  };

  const handleCareerPathSelect = (val: string) => {
    if (val === 'Custom Career Track...') {
      setIsCustomPath(true);
      setFormData((prev) => ({ ...prev, futurePath: '' }));
    } else {
      setIsCustomPath(false);
      setFormData((prev) => ({ ...prev, futurePath: val }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d0e14] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] flex flex-col max-h-[92dvh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Junior Student Registration & Preferences
              </h2>
              <p className="text-xs text-indigo-200">
                Configure your academic details, dropdown filters & AI recommendations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Academic Summary Strip */}
        <div className="px-5 sm:px-6 py-2 bg-indigo-50/80 dark:bg-indigo-950/40 border-b border-indigo-100/80 dark:border-indigo-900/50 flex items-center justify-between gap-2 overflow-x-auto text-[11px] text-indigo-900 dark:text-indigo-200">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-indigo-700 dark:text-indigo-400">Profile Snapshot:</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1b26] border border-indigo-200 dark:border-indigo-800 font-semibold text-slate-800 dark:text-slate-200">
              {formData.classYear.split(' ')[0] || 'FE'}
            </span>
            <span>·</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1b26] border border-indigo-200 dark:border-indigo-800 font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px] sm:max-w-none">
              {formData.branch}
            </span>
            <span>·</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1b26] border border-indigo-200 dark:border-indigo-800 font-semibold text-slate-800 dark:text-slate-200">
              {formData.division}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>AI Guided</span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section 1: Academic & Personal Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                01. Personal & Academic Details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                    placeholder="e.g. Aaryan Shaikh"
                  />
                </div>
              </div>

              {/* Branch Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch / Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value as BranchType })
                    }
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Academic Row: Year (Dropdown), Division (Dropdown), Semester (Dropdown) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Year Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class & Year <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.classYear}
                    onChange={(e) => setFormData({ ...formData, classYear: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Division Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Division <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_DIVISIONS.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Semester Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Semester
                </label>
                <div className="relative">
                  <select
                    value={formData.semester || ALL_SEMESTERS[0]}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_SEMESTERS.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Roll Number & Campus Residence Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Roll Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono text-slate-900"
                  placeholder="e.g. CS-2024-042"
                />
              </div>

              {/* Campus Residence Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accommodation / Living Type
                </label>
                <div className="relative">
                  <select
                    value={formData.residenceType || ALL_RESIDENCE_TYPES[0]}
                    onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_RESIDENCE_TYPES.map((res) => (
                      <option key={res} value={res}>
                        {res}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Mail className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                02. Contact & Networking Links
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / Personal Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                  placeholder="student@campus.edu"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone No.
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                    placeholder="github.com/username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Interested Areas & Future Paths with Career Track Dropdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  03. Interested Areas & Future Paths
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
                {formData.interestedAreas.length} selected
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Select skills and domains you want to learn. Our recommendation engine and AI advisor will prioritize workshops in these fields:
            </p>

            <div className="flex flex-wrap gap-2">
              {ALL_INTEREST_AREAS.map((area) => {
                const isSelected = formData.interestedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleInterest(area)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30 font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    <span>{area}</span>
                  </button>
                );
              })}
            </div>

            {/* Target Career Track Dropdown + Custom Field */}
            <div className="pt-2 space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Target Future Career Path / Aspirations <span className="text-indigo-600">(Dropdown Select)</span>
              </label>
              <div className="relative">
                <select
                  value={
                    isCustomPath
                      ? 'Custom Career Track...'
                      : ALL_CAREER_PATHS.includes(formData.futurePath)
                      ? formData.futurePath
                      : 'Custom Career Track...'
                  }
                  onChange={(e) => handleCareerPathSelect(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                >
                  {ALL_CAREER_PATHS.map((path) => (
                    <option key={path} value={path}>
                      {path}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Show text input when Custom is selected or when user wants to fine-tune */}
              {(isCustomPath || !ALL_CAREER_PATHS.includes(formData.futurePath)) && (
                <div className="pt-1">
                  <input
                    type="text"
                    value={formData.futurePath}
                    onChange={(e) => setFormData({ ...formData, futurePath: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                    placeholder="Enter custom career aspiration (e.g. Quantum Computing Software Specialist)"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Custom track saved directly to your profile.
                  </p>
                </div>
              )}
            </div>

            {/* Primary Campus Goal Dropdown & Preferred Workshop Format Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Campus Goal & Mentorship Need
                </label>
                <div className="relative">
                  <select
                    value={formData.primaryGoal || ALL_PRIMARY_GOALS[0]}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_PRIMARY_GOALS.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Workshop / Event Format
                </label>
                <div className="relative">
                  <select
                    value={formData.preferredFormat || ALL_WORKSHOP_FORMATS[0]}
                    onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                    className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer text-slate-900 font-medium"
                  >
                    {ALL_WORKSHOP_FORMATS.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Interested Committees */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  04. Preferred Campus Committees
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
                {formData.interestedCommittees.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALL_COMMITTEES.map((comm) => {
                const isSelected = formData.interestedCommittees.includes(comm);
                return (
                  <button
                    key={comm}
                    type="button"
                    onClick={() => toggleCommittee(comm)}
                    className={`p-3 rounded-xl text-xs font-medium text-left transition-all border flex items-center justify-between cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-300 text-indigo-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-semibold">{comm}</span>
                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#1d1f2b] flex items-center justify-between gap-3 sticky bottom-0 bg-white/95 dark:bg-[#0d0e14]/95 backdrop-blur-md pb-1">
            <span className="text-xs text-slate-400 hidden sm:inline">
              All dropdown preferences auto-sync with AI Advisor & recommendation feeds
            </span>
            <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#1a1b26] hover:bg-slate-200 dark:hover:bg-[#252738] rounded-xl transition-colors min-h-[40px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] min-h-[40px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Registration Profile</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

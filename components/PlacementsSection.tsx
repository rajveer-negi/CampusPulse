'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  DollarSign,
  Award,
  Sparkles,
  X,
  Send,
  Building,
} from 'lucide-react';
import { PlacementOpportunity, StudentProfile } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface PlacementsSectionProps {
  placements: PlacementOpportunity[];
  student: StudentProfile;
  theme?: ThemeColor;
  onApplyPlacement: (id: string) => void;
}

export default function PlacementsSection({
  placements,
  student,
  theme = 'indigo',
  onApplyPlacement,
}: PlacementsSectionProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const [selectedType, setSelectedType] = useState<'All' | 'Full-Time' | 'Summer Internship' | 'Eligible'>('All');
  const [selectedPlacement, setSelectedPlacement] = useState<PlacementOpportunity | null>(null);
  const [applyModalPlacement, setApplyModalPlacement] = useState<PlacementOpportunity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const studentCgpa = student.cgpa || 8.85;

  const filteredPlacements = placements.filter((p) => {
    if (selectedType === 'Full-Time') return p.type === 'Full-Time';
    if (selectedType === 'Summer Internship') return p.type === 'Summer Internship';
    if (selectedType === 'Eligible') {
      const meetsCgpa = studentCgpa >= p.eligibility.minCgpa;
      const meetsBranch =
        p.eligibility.eligibleBranches.includes('All Engineering Branches') ||
        p.eligibility.eligibleBranches.some((b) => student.branch.includes(b) || b.includes(student.branch));
      return meetsCgpa && meetsBranch;
    }
    return true;
  });

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalPlacement) return;

    onApplyPlacement(applyModalPlacement.id);
    setToastMessage(`Application submitted for ${applyModalPlacement.role} at ${applyModalPlacement.company}! Status: Applied.`);
    setApplyModalPlacement(null);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Briefcase className={`w-5 h-5 ${themeConfig.primaryText}`} />
              <span>Campus Placement & Internship Portal</span>
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
              Season 2026-27 Active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified campus recruitment drives, summer analyst internships, and CTC compensation breakdowns
          </p>
        </div>

        {/* Student CGPA Eligibility Quick Badge */}
        <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-[#12131b] border border-transparent dark:border-[#1d1f2b] rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Your Standing: {studentCgpa} CGPA</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold">
            Eligible for 95% drives
          </span>
        </div>
      </div>

      {/* Filter Tabs Toolbar */}
      <div className="bg-white dark:bg-[#0d0e14] rounded-2xl border border-slate-200 dark:border-[#1d1f2b] p-2.5 flex items-center gap-1.5 overflow-x-auto shadow-2xs">
        {(['All', 'Full-Time', 'Summer Internship', 'Eligible'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedType(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedType === tab
                ? `${themeConfig.primaryBg} text-white shadow-2xs`
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {tab === 'Eligible' ? '✨ Eligible for Me' : tab}
          </button>
        ))}
      </div>

      {/* Opportunities List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPlacements.map((job) => {
          const isEligible =
            studentCgpa >= job.eligibility.minCgpa &&
            (job.eligibility.eligibleBranches.includes('All Engineering Branches') ||
              job.eligibility.eligibleBranches.some((b) => student.branch.includes(b)));

          return (
            <div
              key={job.id}
              className="group bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200 dark:border-[#1d1f2b] hover:border-indigo-300 dark:hover:border-indigo-500 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Top Row: Company Emblem & Package */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${job.companyColor} text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0`}
                    >
                      {job.companyInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {job.company}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 dark:bg-[#1a1b26] text-slate-700 dark:text-slate-300">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">
                        {job.role}
                      </p>
                    </div>
                  </div>

                  {/* Compensation Badge */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block leading-tight">
                      {job.stipendOrCTC.split('+')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Stipend / CTC</span>
                  </div>
                </div>

                {/* Location & Deadline countdown */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    Deadline: {job.applicationDeadline} ({job.daysRemaining} days left)
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Eligibility Pill Strip */}
                <div className="p-2.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200/80 dark:border-[#1d1f2b] rounded-2xl text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Min CGPA:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{job.eligibility.minCgpa}+</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                      {job.eligibility.eligibleYears.join(', ')}
                    </span>
                  </div>

                  {isEligible ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      You are Eligible
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                      Criteria Check
                    </span>
                  )}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1a1b26] text-slate-600 dark:text-slate-300 text-[10px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Status */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#1d1f2b] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlacement(job)}
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  View Rounds & Details
                </button>

                {job.status === 'Applied' ? (
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Applied · In Review</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setApplyModalPlacement(job)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all active:scale-95 cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                  >
                    Apply with 1-Click
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedPlacement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0d0e14] w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20">
                  {selectedPlacement.company} · {selectedPlacement.type}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                  {selectedPlacement.role}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Compensation: {selectedPlacement.stipendOrCTC} · {selectedPlacement.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlacement(null)}
                className="p-1.5 text-slate-300 hover:text-white rounded-xl bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Role Description:</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedPlacement.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Selection & Interview Rounds:</h4>
                <div className="space-y-1.5">
                  {selectedPlacement.rounds.map((round, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-xl">
                      <span className="w-5 h-5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{round}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1.5">Eligibility Criteria:</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-xl">
                    <span className="text-slate-400 block">Cutoff CGPA</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPlacement.eligibility.minCgpa} and above</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-xl">
                    <span className="text-slate-400 block">Eligible Years</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPlacement.eligibility.eligibleYears.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#12131b] border-t border-slate-200 dark:border-[#1d1f2b] flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPlacement(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1a1b26] cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const toApply = selectedPlacement;
                  setSelectedPlacement(null);
                  setApplyModalPlacement(toApply);
                }}
                className={`py-2 px-5 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1-Click Application Confirmation Modal */}
      {applyModalPlacement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0d0e14] w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden flex flex-col">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Confirm Application: {applyModalPlacement.company}
                </h3>
                <p className="text-xs text-indigo-200">
                  Role: {applyModalPlacement.role}
                </p>
              </div>
              <button
                onClick={() => setApplyModalPlacement(null)}
                className="p-1 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="p-5 space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Applicant Details:</span>
                <p>• Candidate: {student.name}</p>
                <p>• Branch & Year: {student.branch} ({student.classYear})</p>
                <p>• Roll No: {student.rollNo} · CGPA: {studentCgpa}</p>
                <p>• Email: {student.email}</p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-300 text-[11px]">
                <span className="font-bold">Verified T&P Registration:</span>
                <p>
                  Your student record and academic transcripts will be forwarded to {applyModalPlacement.company}’s university recruiting team.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalPlacement(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`py-2 px-5 rounded-xl font-bold text-white shadow-xs flex items-center gap-1.5 cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

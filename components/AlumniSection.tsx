'use client';

import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Plus,
  X,
  Send,
  Linkedin,
  Filter,
  GraduationCap,
} from 'lucide-react';
import { AlumniProfile, StudentProfile } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface AlumniSectionProps {
  alumni: AlumniProfile[];
  student: StudentProfile;
  theme?: ThemeColor;
  onToggleConnectAlumni: (id: string) => void;
  onSendDirectMessage: (name: string, role: string) => void;
}

export default function AlumniSection({
  alumni,
  student,
  theme = 'indigo',
  onToggleConnectAlumni,
  onSendDirectMessage,
}: AlumniSectionProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  
  // Mentorship / Referral Request Modal State
  const [activeAlumniModal, setActiveAlumniModal] = useState<AlumniProfile | null>(null);
  const [requestType, setRequestType] = useState<'Referral' | 'Mock Interview' | 'Resume Review' | '1:1 Coffee Chat'>('Resume Review');
  const [resumeLink, setResumeLink] = useState('');
  const [requestNote, setRequestNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const companies = ['All', 'Google', 'Amazon Web Services (AWS)', 'Microsoft', 'NVIDIA', 'Goldman Sachs'];
  const domains = ['All', 'Distributed Systems', 'Cloud & DevOps', 'Applied AI', 'Quantitative Low-Latency'];

  const filteredAlumni = alumni.filter((a) => {
    const matchesCompany = selectedCompany === 'All' || a.company.includes(selectedCompany);
    const matchesDomain =
      selectedDomain === 'All' ||
      a.domain.toLowerCase().includes(selectedDomain.toLowerCase());
    const matchesSearch =
      !searchFilter ||
      a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.role.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.branch.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCompany && matchesDomain && matchesSearch;
  });

  const handleSendMentorshipRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlumniModal) return;

    setToastMessage(`Request for ${requestType} sent to ${activeAlumniModal.name}! Check your messages tab.`);
    setActiveAlumniModal(null);
    setResumeLink('');
    setRequestNote('');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <GraduationCap className={`w-5 h-5 ${themeConfig.primaryText}`} />
            <span>Alumni Networks & Mentorship Directory</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Connect directly with verified campus graduates now at Tier-1 tech giants for referrals & mock interviews
          </p>
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          {filteredAlumni.length} Verified Alumni
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#0d0e14] rounded-2xl border border-slate-200 dark:border-[#1d1f2b] p-3.5 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Company:</span>
          {companies.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCompany(c)}
              className={`px-3 py-1 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCompany === c
                  ? `${themeConfig.primaryBg} text-white shadow-2xs`
                  : 'bg-slate-100 dark:bg-[#181a24] hover:bg-slate-200 dark:hover:bg-[#202230] text-slate-700 dark:text-slate-300'
              }`}
            >
              {c.replace(' (AWS)', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Alumni Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAlumni.map((person) => (
          <div
            key={person.id}
            className="group bg-white dark:bg-[#0d0e14] rounded-3xl border border-slate-200/90 dark:border-[#1d1f2b] hover:border-indigo-300 dark:hover:border-indigo-500 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            {/* Top row with Avatar & Company badge */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-xs shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {person.role}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {person.batchYear} · {person.branch.split(' ')[0]}
                    </p>
                  </div>
                </div>

                {/* Company Logo Badge */}
                <div
                  className={`px-2.5 py-1 rounded-xl text-white font-bold text-xs shadow-2xs ${person.companyLogoColor}`}
                >
                  {person.company.split(' ')[0]}
                </div>
              </div>

              {/* Location & Domain */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{person.location}</span>
                <span>·</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium truncate">{person.domain}</span>
              </div>

              {/* Senior Advice Quote */}
              <div className="p-3 bg-slate-50 dark:bg-[#12131b] border border-slate-200/80 dark:border-[#1d1f2b] rounded-2xl text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                {person.topAdvice}
              </div>

              {/* Mentorship tags */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Offers Junior Guidance:
                </span>
                <div className="flex flex-wrap gap-1">
                  {person.offerMentorshipIn.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 text-[10px] font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#1d1f2b] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onToggleConnectAlumni(person.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  person.connected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : `${themeConfig.primaryBg} ${themeConfig.primaryHover} text-white shadow-2xs`
                }`}
              >
                {person.connected ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
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
                type="button"
                onClick={() => setActiveAlumniModal(person)}
                className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#181a24] hover:bg-slate-200 dark:hover:bg-[#202230] text-slate-800 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                title="Request 1:1 Mentorship or Referral"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Mentorship</span>
              </button>

              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-[#1d1f2b] transition-colors"
                title="Open LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mentorship & Referral Request Modal */}
      {activeAlumniModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0d0e14] w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeAlumniModal.avatar}
                  alt={activeAlumniModal.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/20"
                />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Request Guidance: {activeAlumniModal.name}
                  </h3>
                  <p className="text-xs text-indigo-200">
                    {activeAlumniModal.role} @ {activeAlumniModal.company} ({activeAlumniModal.batchYear})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveAlumniModal(null)}
                className="p-1 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendMentorshipRequest} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Assistance Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Resume Review', 'Referral', 'Mock Interview', '1:1 Coffee Chat'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRequestType(type)}
                      className={`p-2 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                        requestType === type
                          ? `${themeConfig.primaryBg} text-white border-transparent`
                          : 'bg-slate-50 dark:bg-[#12131b] hover:bg-slate-100 dark:hover:bg-[#1a1b26] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#222432]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Resume / Portfolio Link (Google Drive / GitHub)
                </label>
                <input
                  type="url"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  placeholder="https://drive.google.com/file/d/your-resume"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Personal Note to Senior *
                </label>
                <textarea
                  rows={3}
                  required
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder={`Hi ${activeAlumniModal.name.split(' ')[0]}, I am a 1st year ${student.branch} student passionate about ${student.futurePath}. Would love your feedback on my roadmap and resume!`}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 space-y-0.5">
                <span className="font-bold">Campus Code of Conduct:</span>
                <p>
                  Alumni volunteer their personal time to guide juniors. Keep messages concise and professional.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveAlumniModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`py-2 px-5 rounded-xl font-bold text-white shadow-xs flex items-center gap-1.5 cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

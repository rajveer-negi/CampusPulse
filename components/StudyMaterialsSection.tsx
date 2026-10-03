'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  ThumbsUp,
  FileText,
  Search,
  Sparkles,
  Upload,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { StudyMaterial, StudentProfile } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';

interface StudyMaterialsSectionProps {
  materials: StudyMaterial[];
  student: StudentProfile;
  theme?: ThemeColor;
  onUpvote: (id: string) => void;
  onContributeMaterial: (newMaterial: Omit<StudyMaterial, 'id' | 'upvotes' | 'downloads'>) => void;
}

export default function StudyMaterialsSection({
  materials,
  student,
  theme = 'indigo',
  onUpvote,
  onContributeMaterial,
}: StudyMaterialsSectionProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Data Structures & Algorithms');
  const [uploadSemester, setUploadSemester] = useState('Semester 1 & 2');
  const [uploadUnit, setUploadUnit] = useState('Units 1-3 Hand Notes');
  const [uploadDescription, setUploadDescription] = useState('');

  const subjects = [
    'All',
    'Data Structures & Algorithms',
    'Engineering Mathematics',
    'Operating Systems',
    'Database Systems',
    'Artificial Intelligence',
  ];

  const types = ['All', 'PDF', 'ZIP', 'NOTES'];

  const filteredMaterials = materials.filter((m) => {
    const matchesSubject = selectedSubject === 'All' || m.subject === selectedSubject;
    const matchesType = selectedType === 'All' || m.fileType === selectedType;
    const matchesSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesType && matchesSearch;
  });

  const handleDownload = (material: StudyMaterial) => {
    setDownloadSuccessToast(`Downloading "${material.title}" (${material.fileSize})...`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    onContributeMaterial({
      title: uploadTitle.trim(),
      subject: uploadSubject,
      semester: uploadSemester,
      branch: student.branch,
      fileType: 'PDF',
      fileSize: '7.8 MB',
      pages: 45,
      author: student.name,
      authorRole: `${student.classYear.split(' ')[0]} Junior Contributor`,
      tags: ['Student Contribution', 'Verified Notes', 'Class of 2026'],
      description: uploadDescription || 'Shared with campus peers to boost semester preparation.',
      previewSummary: [
        'Complete lecture summary and handwritten class problems',
        'Solved homework tutorials and practice examples',
        'Important viva and mid-term exam questions',
      ],
      unit: uploadUnit,
    });

    setIsUploadOpen(false);
    setUploadTitle('');
    setUploadDescription('');
    setDownloadSuccessToast('Thank you! Your notes are submitted & +20 Activity Points awarded.');
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  return (
    <section className="space-y-5">
      {/* Toast Feedback */}
      {downloadSuccessToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className={`w-5 h-5 ${themeConfig.primaryText}`} />
              <span>Campus Study Materials & Academic Hub</span>
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              Exam Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Topper handwritten notes, previous 5 years solved university papers (PYQs), and cheat sheets
          </p>
        </div>

        {/* Upload Notes Action */}
        <button
          onClick={() => setIsUploadOpen(true)}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Contribute Notes (+20 Pts)</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white dark:bg-[#0d0e14] rounded-2xl border border-slate-200 dark:border-[#1d1f2b] p-3.5 space-y-3 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, unit, subject or author..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-[#161724] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Type Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0">Format:</span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedType === t
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-[#181924] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#202130]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0">Subject:</span>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === s
                  ? `${themeConfig.primaryBg} text-white font-semibold shadow-xs`
                  : 'bg-slate-100 dark:bg-[#181924] hover:bg-slate-200 dark:hover:bg-[#202130] text-slate-700 dark:text-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="group bg-white dark:bg-[#0d0e14] rounded-2xl border border-slate-200/90 dark:border-[#1d1f2b] hover:border-indigo-400 dark:hover:border-indigo-500 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            {/* Top row */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 truncate max-w-[190px]">
                  {item.subject}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181924] text-slate-600 dark:text-slate-300 border border-transparent dark:border-[#222432]">
                  {item.fileType} · {item.fileSize}
                </span>
              </div>

              <h3
                onClick={() => setPreviewMaterial(item)}
                className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
              >
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Author info & tags */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#1d1f2b]">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {item.author[0]}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{item.author}</span>
                  <span className="text-slate-400">· {item.pages} pgs</span>
                </div>
                <span className="text-slate-400 text-[10px]">{item.semester}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onUpvote(item.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    item.hasUpvoted
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-[#181924] hover:bg-slate-200 dark:hover:bg-[#222432] text-slate-700 dark:text-slate-300'
                  }`}
                  title="Upvote resource"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${item.hasUpvoted ? 'fill-indigo-600 dark:fill-indigo-400 text-indigo-600 dark:text-indigo-400' : ''}`} />
                  <span>{item.upvotes}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewMaterial(item)}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-[#1a1b26] border border-slate-200 dark:border-[#222432] transition-colors cursor-pointer"
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1 shadow-2xs transition-all cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1. Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20">
                  {previewMaterial.subject} · {previewMaterial.semester}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                  {previewMaterial.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  By {previewMaterial.author} ({previewMaterial.authorRole}) · {previewMaterial.pages} Pages ({previewMaterial.fileSize})
                </p>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="p-1.5 text-slate-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
              <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1">
                <span className="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Syllabus Coverage: {previewMaterial.unit}
                </span>
                <p className="text-slate-600">{previewMaterial.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2">Key Chapters / Included Units:</h4>
                <ul className="space-y-1.5">
                  {previewMaterial.previewSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-800 block">
                    Campus Endorsement
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {previewMaterial.upvotes} student upvotes · {previewMaterial.downloads} downloads
                  </span>
                </div>
                <button
                  onClick={() => onUpvote(previewMaterial.id)}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-semibold text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-1"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Upvote</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(previewMaterial);
                  setPreviewMaterial(null);
                }}
                className={`py-2 px-5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
              >
                <Download className="w-4 h-4" />
                <span>Download {previewMaterial.fileType} Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Contribute Material Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Contribute Study Notes to Campus</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Earn +20 Activity Points & help your junior batchmates excel
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Unit 2 & 3 Handwritten Trees & Graphs Notes"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="Data Structures & Algorithms">Data Structures</option>
                    <option value="Engineering Mathematics">Engineering Math</option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="Database Systems">Database Systems</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semester *</label>
                  <select
                    value={uploadSemester}
                    onChange={(e) => setUploadSemester(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="Semester 1 & 2">Semester 1 & 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Units / Chapters Covered
                </label>
                <input
                  type="text"
                  value={uploadUnit}
                  onChange={(e) => setUploadUnit(e.target.value)}
                  placeholder="e.g. Units 1 to 4 with Solved Examples"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Brief Summary</label>
                <textarea
                  rows={3}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Mention key highlights, professor reference, or exam tips included..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center space-y-1">
                <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                <p className="font-semibold text-slate-700 text-xs">Drop PDF / ZIP here</p>
                <p className="text-[10px] text-slate-400">Up to 50MB per file</p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`py-2 px-5 rounded-xl font-bold text-white shadow-xs ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                >
                  Submit & Earn +20 Points
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

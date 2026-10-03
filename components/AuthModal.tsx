'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, User, Sparkles, GraduationCap } from 'lucide-react';
import CampusLogo from '@/components/CampusLogo';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';
import { UserAccount, StudentProfile, BranchType } from '@/lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAccount: UserAccount;
  onLoginSuccess: (account: UserAccount, updatedProfile?: Partial<StudentProfile>) => void;
  theme?: ThemeColor;
}

export default function AuthModal({
  isOpen,
  onClose,
  userAccount,
  onLoginSuccess,
  theme = 'indigo',
}: AuthModalProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  // Step 1: 'login' (email or Google) -> Step 2: 'student_info' (name, year, branch, class, roll no)
  const [step, setStep] = useState<'login' | 'student_info'>('login');
  const [authMethod, setAuthMethod] = useState<'google' | 'campus_email'>('google');
  
  // Step 1 Form state
  const [emailInput, setEmailInput] = useState('iamrajveernegi@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 2 Form state (Student Info)
  const [name, setName] = useState('Rajveer Negi');
  const [classYear, setClassYear] = useState('FE (First Year Junior)');
  const [branch, setBranch] = useState<BranchType>('Computer Engineering');
  const [division, setDivision] = useState('Division B');
  const [rollNo, setRollNo] = useState('CS-2024-042');
  const [prnNo, setPrnNo] = useState('PRN-2024-08912');

  if (!isOpen) return null;

  // Handle Quick Google Login
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthMethod('google');
      // If user hasn't completed profile onboarding, prompt step 2
      if (!userAccount.isOnboarded) {
        setName('Rajveer Negi');
        setEmailInput('iamrajveernegi@gmail.com');
        setStep('student_info');
      } else {
        onLoginSuccess({
          email: 'iamrajveernegi@gmail.com',
          name: 'Rajveer Negi',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          isAuthenticated: true,
          provider: 'google',
          isOnboarded: true,
        });
        onClose();
      }
    }, 600);
  };

  // Handle Email Login
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthMethod('campus_email');
      const inferredName = emailInput.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      setName(inferredName || 'Campus Student');
      setStep('student_info');
    }, 500);
  };

  // Handle Profile Details Completion
  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAccount: UserAccount = {
      email: emailInput || 'iamrajveernegi@gmail.com',
      name: name.trim() || 'Rajveer Negi',
      avatar:
        authMethod === 'google'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isAuthenticated: true,
      provider: authMethod,
      isOnboarded: true,
    };

    const updatedProfile: Partial<StudentProfile> = {
      name: name.trim() || 'Rajveer Negi',
      email: emailInput || 'iamrajveernegi@gmail.com',
      classYear,
      branch,
      division,
      rollNo,
      prnNo,
    };

    onLoginSuccess(finalAccount, updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0d0e14] w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Brand Logo */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <CampusLogo size="md" theme={theme} variant="dark" />
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {step === 'login' ? 'Sign in to CampusPulse' : 'Complete Your Student Profile'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {step === 'login'
                ? 'Access technical committees, workshops, notes, placements & alumni networks.'
                : 'Help us personalize your academic roadmap, batch notifications, and club events.'}
            </p>
          </div>

          {/* Progress Steps Indicators */}
          <div className="flex items-center gap-2 mt-4">
            <div className={`h-1.5 flex-1 rounded-full ${step === 'login' ? themeConfig.primaryBg : 'bg-emerald-500'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step === 'student_info' ? themeConfig.primaryBg : 'bg-slate-700'}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {step === 'login' ? (
            <div className="space-y-4">
              {/* Quick Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl border-2 border-slate-200 dark:border-[#222432] hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-[#12131b] hover:bg-slate-50 dark:hover:bg-[#181a24] text-slate-800 dark:text-slate-100 font-semibold text-sm flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                {/* Google "G" Vector */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoading ? 'Connecting Google Account...' : 'Continue with Google'}</span>
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-200 dark:border-[#222432] w-full" />
                <span className="bg-white dark:bg-[#0d0e14] px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider absolute">
                  Or Sign in with Email
                </span>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    University / Personal Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="iamrajveernegi@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Password / OTP
                    </label>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Auto-login enabled</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !emailInput.trim()}
                  className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                >
                  <span>{isLoading ? 'Verifying...' : 'Next: Setup Student Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="p-3 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Official campus authentication. Your profile is automatically linked to verified workshops, committee registrations, and academic records.
                </span>
              </div>
            </div>
          ) : (
            /* Step 2: Student Profile Setup (Name, Year, Branch, Division, Roll No) */
            <form onSubmit={handleCompleteProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Student Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rajveer Negi"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Academic Year */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year *
                  </label>
                  <select
                    value={classYear}
                    onChange={(e) => setClassYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  >
                    <option value="FE (First Year Junior)">FE (1st Year / Freshman)</option>
                    <option value="SE (Second Year Junior)">SE (2nd Year / Sophomore)</option>
                    <option value="TE (Third Year Junior)">TE (3rd Year / Junior)</option>
                    <option value="BE (Final Year Senior)">BE (4th Year / Senior)</option>
                  </select>
                </div>

                {/* Branch / Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Branch / Department *
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as BranchType)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  >
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunication">Electronics & Telecomm (EXTC)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>

                {/* Class / Division */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class / Division *
                  </label>
                  <input
                    type="text"
                    required
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    placeholder="Division B / Class 101"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="CS-2024-042"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                  />
                </div>

                {/* University PRN Number */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    PRN / Permanent Registration Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={prnNo}
                    onChange={(e) => setPrnNo(e.target.value)}
                    placeholder="PRN-2024-08912"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#12131b] border border-slate-200 dark:border-[#222432] rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-[#1d1f2b]">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className={`flex-1 py-2.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Profile & Enter Campus</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  Loader2,
  HelpCircle,
  Zap,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  ThumbsUp,
  Share2,
  GraduationCap,
  Briefcase,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { StudentProfile } from '@/lib/types';
import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';
import { getFastCampusAnswer } from '@/lib/aiFastResponses';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  initialPrompt?: string;
  theme?: ThemeColor;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  speed?: string;
  liked?: boolean;
}

export default function AiAdvisorModal({
  isOpen,
  onClose,
  student,
  initialPrompt,
  theme = 'indigo',
}: AiAdvisorModalProps) {
  const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.indigo;

  const [input, setInput] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialWelcome: MessageItem = {
    id: 'welcome',
    sender: 'ai',
    text: `Hello ${student.name.split(' ')[0]}! 👋 I'm your official **CampusPulse AI Advisor & Chatbot**.\n\nI have complete real-time access to our verified campus database:\n• **Student Chapters & Committees**: GDSC, RAS Robotics, ACM, IEEE, E-Cell & Design\n• **Upcoming Deadlines & Tests**: Assignment 1 (Oct 08), Mid-Terms (Oct 19), Google Internships (Oct 12)\n• **Placements & Internships**: Google (₹1.25L/mo), Microsoft (24.5 LPA), NVIDIA, Goldman Sachs\n• **Curated Study Notes**: Topper handwritten guides for DSA, Maths 1, OS & DBMS\n• **Alumni Mentorship**: Referrals from seniors at Google, AWS, Microsoft & NVIDIA\n\nWhat can I assist you with today?`,
    timestamp: 'Just now',
    speed: '⚡ 0.01s',
  };

  const [messages, setMessages] = useState<MessageItem[]>([initialWelcome]);

  const counterRef = useRef(1);
  const localCacheRef = useRef<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    `Which club is best for a 1st year ${student.branch.split(' ')[0]} student?`,
    'What are the key upcoming academic & placement deadlines this week?',
    'Show top placement drives and CGPA cutoffs',
    'Recommend study materials and notes for Data Structures',
    'How do I request an alumni referral or mock interview?',
    'What are the prerequisites for the Autonomous Robotics workshop?',
  ];

  const handleCopyText = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleToggleLike = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
    );
  };

  const handleClearChat = () => {
    setMessages([initialWelcome]);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const count = counterRef.current++;
    const userMsg: MessageItem = {
      id: `user-msg-${count}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const normKey = textToSend.trim().toLowerCase();

    // 1. Instant Cache Check (0ms)
    const cached = localCacheRef.current[normKey];
    if (cached) {
      const aiCount = counterRef.current++;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-msg-${aiCount}`,
          sender: 'ai',
          text: cached,
          timestamp: 'Just now',
          speed: '⚡ Instant (Cache)',
        },
      ]);
      return;
    }

    // 2. High-speed local campus intent match (sub-millisecond reply)
    const fastMatch = getFastCampusAnswer(textToSend, student);
    if (fastMatch.matched) {
      localCacheRef.current[normKey] = fastMatch.reply;
      const aiCount = counterRef.current++;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-msg-${aiCount}`,
          sender: 'ai',
          text: fastMatch.reply,
          timestamp: 'Just now',
          speed: '⚡ Campus Knowledge',
        },
      ]);
      return;
    }

    // 3. Fast Server AI Query via /api/gemini/query
    setLoading(true);
    const aiMsgId = `ai-msg-${counterRef.current++}`;

    try {
      const res = await fetch('/api/gemini/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          studentProfile: student,
        }),
      });

      const data = await res.json();
      const answer = data.reply || 'Campus leads recommend exploring the Explore tab for active workshops.';
      localCacheRef.current[normKey] = answer;

      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'ai',
          text: answer,
          timestamp: 'Just now',
          speed: '⚡ Gemini AI',
        },
      ]);
    } catch (err) {
      console.error(err);
      const fallback = `**Campus Guidance:**\n\n• GDSC: Best for full-stack web and cloud apps.\n• Robotics (RAS): Best for microcontrollers and hardware.\n• ACM: Best for algorithms and competitive coding.\n\nExplore upcoming bootcamps on the **Explore** tab!`;
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'ai',
          text: fallback,
          timestamp: 'Just now',
          speed: '⚡ Campus Knowledge',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`bg-white dark:bg-[#0d0e14] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1d1f2b] flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'w-full h-[96vh] max-w-5xl'
            : 'w-full max-w-3xl h-[88vh] max-h-[750px]'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-indigo-300 shadow-xs">
              <Bot className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  CampusPulse AI Assistant
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <Zap className="w-2.5 h-2.5 text-emerald-300 fill-emerald-300" />
                  Live & Context-Aware
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Trained on official campus committees, syllabus, deadlines & career drives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Expand / Minimize */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden sm:flex p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title={isExpanded ? 'Minimize' : 'Expand full screen'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips Bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-50 dark:bg-[#12131b] border-b border-slate-200/80 dark:border-[#1d1f2b] overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Suggested:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs px-3 py-1 bg-white dark:bg-[#1a1b26] hover:bg-indigo-50 dark:hover:bg-[#232435] text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 border border-slate-200 dark:border-[#2b2d3d] rounded-xl whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-[#070709]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div
                  className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${themeConfig.previewClass} text-white flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed transition-all ${
                  msg.sender === 'user'
                    ? `${themeConfig.primaryBg} text-white shadow-sm font-medium`
                    : 'bg-white dark:bg-[#12131b] border border-slate-200/90 dark:border-[#1d1f2b] text-slate-800 dark:text-slate-100 shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line prose-sm">{msg.text}</div>

                {/* Footer Strip with speed, copy, and like buttons */}
                <div
                  className={`text-[10px] mt-2.5 pt-2 border-t flex items-center justify-between gap-2 ${
                    msg.sender === 'user'
                      ? 'border-white/20 text-white/80 justify-end'
                      : 'border-slate-100 dark:border-[#1d1f2b] text-slate-400'
                  }`}
                >
                  {msg.speed && (
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {msg.speed}
                    </span>
                  )}

                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1 flex items-center gap-1 cursor-pointer"
                        title="Copy Response"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleToggleLike(msg.id)}
                        className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1 flex items-center gap-1 cursor-pointer ${
                          msg.liked ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
                        }`}
                        title="Helpful Answer"
                      >
                        <ThumbsUp className={`w-3 h-3 ${msg.liked ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
                        <span>{msg.liked ? 'Helpful' : 'Like'}</span>
                      </button>
                    </div>
                  )}

                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-slate-500 text-xs">
              <div
                className={`w-8 h-8 rounded-xl ${themeConfig.primaryLightBg} ${themeConfig.primaryText} flex items-center justify-center shrink-0`}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white dark:bg-[#12131b] border border-slate-200 dark:border-[#1d1f2b] rounded-2xl px-4 py-3 shadow-2xs flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">Consulting campus database & compiling answer...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Box */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#0d0e14] border-t border-slate-200 dark:border-[#1d1f2b]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about clubs, deadlines, study notes, placements, alumni..."
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-[#12131b] text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm border border-slate-200 dark:border-[#222432] rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-[#0c0d12] focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50 ${themeConfig.primaryBg} ${themeConfig.primaryHover}`}
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

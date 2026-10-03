'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import HomeTab from '@/components/HomeTab';
import ExploreTab from '@/components/ExploreTab';
import MessagesTab from '@/components/MessagesTab';
import ProfileTab from '@/components/ProfileTab';
import AiAdvisorModal from '@/components/AiAdvisorModal';
import RegisterModal from '@/components/RegisterModal';
import WorkshopModal from '@/components/WorkshopModal';
import CommunityModal from '@/components/CommunityModal';
import CalendarModal from '@/components/CalendarModal';
import AuthModal from '@/components/AuthModal';

import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_COMMUNITIES,
  INITIAL_WORKSHOPS,
  INITIAL_MENTORS_PEERS,
  INITIAL_COMMUNITY_CHATS,
  INITIAL_DIRECT_CHATS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_ALUMNI,
  INITIAL_PLACEMENTS,
} from '@/lib/data';

import {
  StudentProfile,
  Community,
  WorkshopOrEvent,
  MentorPeer,
  ChatMessage,
  StudyMaterial,
  CalendarEvent,
  AlumniProfile,
  PlacementOpportunity,
  UserAccount,
} from '@/lib/types';

import { ThemeColor, THEME_CONFIGS } from '@/lib/theme';
import { getFastCampusAnswer } from '@/lib/aiFastResponses';

export default function CampusPulseApp() {
  // Application State with safe client-side hydration
  const [student, setStudent] = useState<StudentProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStudent = localStorage.getItem('campuspulse_student');
        if (savedStudent) return JSON.parse(savedStudent);
      } catch (e) {}
    }
    return INITIAL_STUDENT_PROFILE;
  });

  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [workshops, setWorkshops] = useState<WorkshopOrEvent[]>(INITIAL_WORKSHOPS);
  const [mentorsPeers, setMentorsPeers] = useState<MentorPeer[]>(INITIAL_MENTORS_PEERS);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [alumni, setAlumni] = useState<AlumniProfile[]>(INITIAL_ALUMNI);
  const [placements, setPlacements] = useState<PlacementOpportunity[]>(INITIAL_PLACEMENTS);
  const [communityChats, setCommunityChats] = useState<Record<string, ChatMessage[]>>(INITIAL_COMMUNITY_CHATS);
  const [directChats, setDirectChats] = useState<Record<string, ChatMessage[]>>(INITIAL_DIRECT_CHATS);

  // User Account & Authentication State (Change 7)
  const [userAccount, setUserAccount] = useState<UserAccount>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAccount = localStorage.getItem('campuspulse_account');
        if (savedAccount) return JSON.parse(savedAccount);
      } catch (e) {}
    }
    return {
      email: 'iamrajveernegi@gmail.com',
      name: 'Rajveer Negi',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      isAuthenticated: true,
      provider: 'google',
      isOnboarded: true,
    };
  });

  // Theme State (Change 1)
  const [theme, setTheme] = useState<ThemeColor>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('campuspulse_theme') as ThemeColor;
        if (savedTheme && THEME_CONFIGS[savedTheme]) return savedTheme;
      } catch (e) {}
    }
    return 'indigo';
  });

  // Dark Mode State with hex #070709
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedDark = localStorage.getItem('campuspulse_darkmode');
        if (savedDark !== null) return savedDark === 'true';
      } catch (e) {}
    }
    return false;
  });

  // Synchronize document/body class with darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    try {
      localStorage.setItem('campuspulse_darkmode', darkMode ? 'true' : 'false');
    } catch (e) {}
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      showToast(next ? 'Dark Mode activated (#070709)' : 'Light Mode activated');
      return next;
    });
  };

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Chat Selection State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopOrEvent | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [selectedChatType, setSelectedChatType] = useState<'community' | 'direct'>('community');
  const [selectedChatId, setSelectedChatId] = useState<string>('comm-1');
  const [mobileShowChat, setMobileShowChat] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Color Theme Customization (Change 1)
  const handleSelectTheme = (newTheme: ThemeColor) => {
    setTheme(newTheme);
    setStudent((prev) => ({ ...prev, themeColor: newTheme }));
    try {
      localStorage.setItem('campuspulse_theme', newTheme);
    } catch (e) {}
    showToast(`Switched palette to ${THEME_CONFIGS[newTheme]?.name || newTheme}`);
  };

  // Workshop Registration Toggle
  const handleToggleRegister = (workshopId: string) => {
    setWorkshops((prev) =>
      prev.map((w) => {
        if (w.id === workshopId) {
          const nextRegistered = !w.registered;
          const nextSeats = nextRegistered ? Math.max(0, w.seatsLeft - 1) : w.seatsLeft + 1;

          setStudent((s) => {
            const historyExists = s.history.some((h) => h.id === `h-${workshopId}`);
            let newHistory = [...s.history];

            if (nextRegistered) {
              if (!historyExists) {
                newHistory.unshift({
                  id: `h-${workshopId}`,
                  title: w.title,
                  type: w.type,
                  date: w.date.split(',')[1] || w.date,
                  status: 'Registered',
                  communityName: w.communityName,
                });
              }
            } else {
              newHistory = newHistory.filter((h) => h.id !== `h-${workshopId}`);
            }

            const updatedStudent = {
              ...s,
              stats: {
                ...s.stats,
                activityScore: nextRegistered ? s.stats.activityScore + 10 : Math.max(0, s.stats.activityScore - 10),
              },
              history: newHistory,
            };

            try {
              localStorage.setItem('campuspulse_student', JSON.stringify(updatedStudent));
            } catch (e) {}

            return updatedStudent;
          });

          showToast(nextRegistered ? `Registered for ${w.title}! (+10 Points)` : `Cancelled registration for ${w.title}`);
          return { ...w, registered: nextRegistered, seatsLeft: nextSeats };
        }
        return w;
      })
    );
  };

  // Favourites Toggle
  const handleToggleBookmark = (id: string) => {
    setStudent((s) => {
      const exists = s.favourites.includes(id);
      const updated = exists ? s.favourites.filter((favId) => favId !== id) : [...s.favourites, id];
      showToast(exists ? 'Removed from Favourites' : 'Saved to Favourites!');
      const newStudent = { ...s, favourites: updated };
      try {
        localStorage.setItem('campuspulse_student', JSON.stringify(newStudent));
      } catch (e) {}
      return newStudent;
    });
  };

  // Join Community Toggle
  const handleToggleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          const nextJoined = !c.joined;
          const nextMembers = nextJoined ? c.membersCount + 1 : c.membersCount - 1;

          setStudent((s) => {
            const updated = {
              ...s,
              stats: {
                ...s.stats,
                communitiesJoined: nextJoined ? s.stats.communitiesJoined + 1 : Math.max(0, s.stats.communitiesJoined - 1),
                activityScore: nextJoined ? s.stats.activityScore + 15 : Math.max(0, s.stats.activityScore - 15),
              },
            };
            try {
              localStorage.setItem('campuspulse_student', JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });

          showToast(nextJoined ? `Welcome to ${c.shortCode}! (+15 Points)` : `Left ${c.shortCode}`);
          return { ...c, joined: nextJoined, membersCount: nextMembers };
        }
        return c;
      })
    );
  };

  // Connect Mentor / Peer Toggle
  const handleToggleConnectUser = (userId: string) => {
    setMentorsPeers((prev) =>
      prev.map((p) => {
        if (p.id === userId) {
          const nextConnected = !p.connected;
          setStudent((s) => {
            const updated = {
              ...s,
              stats: {
                ...s.stats,
                networkCount: nextConnected ? s.stats.networkCount + 1 : s.stats.networkCount - 1,
              },
            };
            try {
              localStorage.setItem('campuspulse_student', JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });
          showToast(nextConnected ? `Connected with ${p.name}!` : `Removed connection`);
          return { ...p, connected: nextConnected };
        }
        return p;
      })
    );
  };

  // Connect Alumni Toggle (Change 5)
  const handleToggleConnectAlumni = (alumniId: string) => {
    setAlumni((prev) =>
      prev.map((a) => {
        if (a.id === alumniId) {
          const nextConnected = !a.connected;
          setStudent((s) => {
            const updated = {
              ...s,
              stats: {
                ...s.stats,
                networkCount: nextConnected ? s.stats.networkCount + 1 : s.stats.networkCount - 1,
                activityScore: nextConnected ? s.stats.activityScore + 10 : s.stats.activityScore,
              },
            };
            try {
              localStorage.setItem('campuspulse_student', JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });
          showToast(nextConnected ? `Connected with ${a.name} @ ${a.company}! (+10 Points)` : `Removed connection`);
          return { ...a, connected: nextConnected };
        }
        return a;
      })
    );
  };

  // Apply to Placement Opportunity (Change 6)
  const handleApplyPlacement = (placementId: string) => {
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.id === placementId) {
          setStudent((s) => {
            const updated = {
              ...s,
              stats: {
                ...s.stats,
                activityScore: s.stats.activityScore + 25,
              },
            };
            try {
              localStorage.setItem('campuspulse_student', JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });
          showToast(`Applied for ${p.role} at ${p.company}! (+25 Points)`);
          return { ...p, status: 'Applied', applicantCount: p.applicantCount + 1 };
        }
        return p;
      })
    );
  };

  // Study Material Upvote & Contribution (Change 8)
  const handleUpvoteMaterial = (materialId: string) => {
    setStudyMaterials((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          const nextUpvoted = !m.hasUpvoted;
          const nextCount = nextUpvoted ? m.upvotes + 1 : m.upvotes - 1;
          showToast(nextUpvoted ? 'Upvoted study resource!' : 'Removed upvote');
          return { ...m, hasUpvoted: nextUpvoted, upvotes: nextCount };
        }
        return m;
      })
    );
  };

  const handleContributeMaterial = (newMaterial: Omit<StudyMaterial, 'id' | 'upvotes' | 'downloads'>) => {
    const createdItem: StudyMaterial = {
      ...newMaterial,
      id: `sm-${Date.now()}`,
      upvotes: 1,
      downloads: 0,
      hasUpvoted: true,
    };
    setStudyMaterials((prev) => [createdItem, ...prev]);
    setStudent((s) => {
      const updated = {
        ...s,
        stats: {
          ...s.stats,
          activityScore: s.stats.activityScore + 20,
        },
      };
      try {
        localStorage.setItem('campuspulse_student', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast('Your study notes were published! +20 Points added.');
  };

  // Calendar Event Status Toggle (Change 4)
  const handleToggleEventStatus = (eventId: string) => {
    setCalendarEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const nextCompleted = !e.isCompleted;
          showToast(nextCompleted ? `Marked "${e.title}" as completed!` : `Marked as pending`);
          return { ...e, isCompleted: nextCompleted };
        }
        return e;
      })
    );
  };

  // Auth & Profile Updates (Change 7)
  const handleLoginSuccess = (account: UserAccount, updatedProfile?: Partial<StudentProfile>) => {
    setUserAccount(account);
    if (updatedProfile) {
      setStudent((prev) => {
        const merged = { ...prev, ...updatedProfile };
        try {
          localStorage.setItem('campuspulse_student', JSON.stringify(merged));
        } catch (e) {}
        return merged;
      });
    }
    try {
      localStorage.setItem('campuspulse_account', JSON.stringify(account));
    } catch (e) {}
    showToast(`Signed in as ${account.name} (${account.email})`);
  };

  const handleSignOut = () => {
    setIsAuthModalOpen(true);
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => {
      const merged = { ...prev, ...updated };
      try {
        localStorage.setItem('campuspulse_student', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
    showToast('Profile updated successfully!');
  };

  // Open Chat directly with user
  const handleStartChatWithUser = (user: MentorPeer) => {
    setSelectedChatType('direct');
    setSelectedChatId(user.id);
    setMobileShowChat(true);
    setActiveTab('messages');
  };

  // Send Chat Message
  const handleSendMessage = (channelId: string, text: string, isDirect: boolean) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      senderName: student.name,
      senderRole: 'FE Junior',
      avatar: student.avatar,
      timestamp: 'Just now',
      content: text,
      isMine: true,
    };

    if (channelId === 'ai-advisor') {
      const typingId = `typing-${Date.now()}`;
      const typingMsg: ChatMessage = {
        id: typingId,
        channelId: 'ai-advisor',
        senderName: 'CampusPulse AI Advisor',
        senderRole: 'AI Campus Guide · Typing...',
        avatar: '',
        timestamp: 'Just now',
        content: '',
        isTyping: true,
      };

      setDirectChats((prev) => ({
        ...prev,
        'ai-advisor': [...(prev['ai-advisor'] || []), newMsg, typingMsg],
      }));

      const fastMatch = getFastCampusAnswer(text, student);
      if (fastMatch.matched) {
        setTimeout(() => {
          setDirectChats((prev) => ({
            ...prev,
            'ai-advisor': (prev['ai-advisor'] || [])
              .filter((m) => m.id !== typingId)
              .concat({
                id: `aimsg-${Date.now()}`,
                channelId: 'ai-advisor',
                senderName: 'CampusPulse AI Advisor',
                senderRole: 'AI Campus Guide · Fast Reply',
                avatar: '',
                timestamp: 'Just now',
                content: fastMatch.reply,
              }),
          }));
        }, 300);
      } else {
        fetch('/api/gemini/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: text, studentProfile: student }),
        })
          .then((r) => r.json())
          .then((data) => {
            setDirectChats((prev) => ({
              ...prev,
              'ai-advisor': (prev['ai-advisor'] || [])
                .filter((m) => m.id !== typingId)
                .concat({
                  id: `aimsg-${Date.now()}`,
                  channelId: 'ai-advisor',
                  senderName: 'CampusPulse AI Advisor',
                  senderRole: 'AI Campus Guide · Online',
                  avatar: '',
                  timestamp: 'Just now',
                  content: data.reply || 'Check Explore tab for upcoming workshops.',
                }),
            }));
          })
          .catch(() => {
            setDirectChats((prev) => ({
              ...prev,
              'ai-advisor': (prev['ai-advisor'] || []).filter((m) => m.id !== typingId),
            }));
          });
      }
    } else if (isDirect) {
      setDirectChats((prev) => ({
        ...prev,
        [channelId]: [...(prev[channelId] || []), newMsg],
      }));
    } else {
      setCommunityChats((prev) => ({
        ...prev,
        [channelId]: [...(prev[channelId] || []), newMsg],
      }));
    }
  };

  const registeredWorkshopsCount = workshops.filter((w) => w.registered).length;

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col transition-colors duration-200 ${
        darkMode ? 'bg-[#070709] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 right-3 sm:right-5 z-50 bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navbar with Logo, Calendar, Theme Switcher, Light/Dark Toggle */}
      <Navbar
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={(prompt) => {
          setAiInitialPrompt(prompt);
          setIsAiModalOpen(true);
        }}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        registeredCount={registeredWorkshopsCount}
        theme={theme}
        onSelectTheme={handleSelectTheme}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Fluid Responsive Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 sm:pb-12">
        {activeTab === 'home' && (
          <HomeTab
            student={student}
            communities={communities}
            workshops={workshops}
            studyMaterials={studyMaterials}
            calendarEvents={calendarEvents}
            theme={theme}
            onOpenWorkshop={(ws) => setSelectedWorkshop(ws)}
            onOpenCommunity={(c) => setSelectedCommunity(c)}
            onOpenAiModal={(prompt) => {
              setAiInitialPrompt(prompt);
              setIsAiModalOpen(true);
            }}
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
            onToggleRegister={handleToggleRegister}
            onToggleBookmark={handleToggleBookmark}
            onUpvoteMaterial={handleUpvoteMaterial}
            onContributeMaterial={handleContributeMaterial}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreTab
            communities={communities}
            workshops={workshops}
            mentorsPeers={mentorsPeers}
            alumni={alumni}
            placements={placements}
            student={student}
            theme={theme}
            onOpenWorkshop={(ws) => setSelectedWorkshop(ws)}
            onOpenCommunity={(c) => setSelectedCommunity(c)}
            onToggleJoinCommunity={handleToggleJoinCommunity}
            onToggleRegisterWorkshop={handleToggleRegister}
            onToggleBookmarkWorkshop={handleToggleBookmark}
            onToggleConnectUser={handleToggleConnectUser}
            onToggleConnectAlumni={handleToggleConnectAlumni}
            onApplyPlacement={handleApplyPlacement}
            onStartChatWithUser={handleStartChatWithUser}
            searchFilter={searchQuery}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesTab
            student={student}
            communities={communities}
            mentorsPeers={mentorsPeers}
            communityChats={communityChats}
            directChats={directChats}
            onSendMessage={handleSendMessage}
            onOpenAiModal={() => setIsAiModalOpen(true)}
            selectedType={selectedChatType}
            selectedId={selectedChatId}
            onSelectConversation={(type, id) => {
              setSelectedChatType(type);
              setSelectedChatId(id);
              setMobileShowChat(true);
            }}
            mobileShowChat={mobileShowChat}
            setMobileShowChat={setMobileShowChat}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            student={student}
            workshops={workshops}
            communities={communities}
            studyMaterials={studyMaterials}
            placements={placements}
            onOpenEditModal={() => setIsRegisterModalOpen(true)}
            onOpenWorkshop={(ws) => setSelectedWorkshop(ws)}
            onOpenCommunity={(c) => setSelectedCommunity(c)}
            onToggleBookmark={handleToggleBookmark}
            onSelectTheme={handleSelectTheme}
            onSignOut={handleSignOut}
            onUpdateProfile={handleUpdateProfile}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        )}
      </main>

      {/* Mobile Bottom Thumb Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        theme={theme}
        darkMode={darkMode}
      />

      {/* Desktop Footer */}
      <footer className={`hidden sm:block border-t py-6 mt-auto transition-colors ${
        darkMode ? 'bg-[#070709] border-[#1d1f2b] text-slate-400' : 'border-slate-200/80 bg-white text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>CampusPulse</span>
            <span>·</span>
            <span>Student Community, Junior Onboarding & Career Placement Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Academic Calendar
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              AI Campus Advisor
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Switch Account
            </button>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        student={student}
        initialPrompt={aiInitialPrompt}
        theme={theme}
      />

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        events={calendarEvents}
        onToggleEventStatus={handleToggleEventStatus}
        theme={theme}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        userAccount={userAccount}
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        student={student}
        onSave={(updated) => {
          handleUpdateProfile(updated);
          setIsRegisterModalOpen(false);
        }}
      />

      <WorkshopModal
        workshop={selectedWorkshop}
        isOpen={Boolean(selectedWorkshop)}
        onClose={() => setSelectedWorkshop(null)}
        onToggleRegister={handleToggleRegister}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={Boolean(selectedWorkshop && student.favourites.includes(selectedWorkshop.id))}
      />

      <CommunityModal
        community={selectedCommunity}
        isOpen={Boolean(selectedCommunity)}
        onClose={() => setSelectedCommunity(null)}
        onToggleJoin={handleToggleJoinCommunity}
        onAskAiAboutClub={(clubName) => {
          setSelectedCommunity(null);
          setAiInitialPrompt(`Tell me more about ${clubName}, what projects they work on, and how freshmen can get involved?`);
          setIsAiModalOpen(true);
        }}
      />
    </div>
  );
}

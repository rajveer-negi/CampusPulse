import { ThemeColor } from './theme';

export type { ThemeColor };

export type BranchType =
  | 'Computer Engineering'
  | 'Artificial Intelligence & Data Science'
  | 'Information Technology'
  | 'Electronics & Telecommunication'
  | 'Mechanical Engineering';

export interface StudentProfile {
  name: string;
  branch: BranchType;
  classYear: string;
  division: string;
  rollNo: string;
  prnNo?: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolioUrl?: string;
  cgpa?: number;
  skills?: string[];
  themeColor?: ThemeColor;
  bio?: string;
  interestedAreas: string[];
  interestedCommittees: string[];
  futurePath: string;
  semester?: string;
  residenceType?: string;
  primaryGoal?: string;
  preferredFormat?: string;
  stats: {
    activityScore: number;
    communitiesJoined: number;
    networkCount: number;
  };
  avatar: string;
  favourites: string[]; // IDs of workshops, events, or communities
  history: {
    id: string;
    title: string;
    type: 'Workshop' | 'Seminar' | 'Event' | 'Hackathon' | 'Guest Lecture';
    date: string;
    status: 'Registered' | 'Attended' | 'Certificate Earned';
    communityName: string;
  }[];
}

export interface UserAccount {
  email: string;
  name: string;
  avatar: string;
  isAuthenticated: boolean;
  provider: 'google' | 'campus_email';
  isOnboarded: boolean;
}

export interface Community {
  id: string;
  name: string;
  shortCode: string;
  category: 'Technical' | 'Robotics & Hardware' | 'Competitive Coding' | 'Entrepreneurship' | 'Creative & Design';
  shortDesc: string;
  detailedInfo: string;
  leadName: string;
  leadRole: string;
  leadBranch: string;
  leadContact: string;
  membersCount: number;
  tags: string[];
  gradient: string;
  accentColor: string;
  joined: boolean;
  upcomingEventCount: number;
  faqs: { question: string; answer: string }[];
}

export interface WorkshopOrEvent {
  id: string;
  title: string;
  type: 'Workshop' | 'Seminar' | 'Hackathon' | 'Guest Lecture';
  communityId: string;
  communityName: string;
  date: string;
  time: string;
  venue: string;
  speakers: { name: string; role: string; org: string }[];
  seatsTotal: number;
  seatsLeft: number;
  tags: string[];
  summary: string;
  prerequisites: string;
  image: string;
  isRecommended: boolean;
  registered: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderRole: string;
  avatar: string;
  timestamp: string;
  content: string;
  isMine?: boolean;
  isAnnouncement?: boolean;
  isTyping?: boolean;
  speed?: string;
}

export interface MentorPeer {
  id: string;
  name: string;
  role: 'Senior Mentor' | 'Club Lead' | 'Peer Junior';
  branch: string;
  year: string;
  specialties: string[];
  bio: string;
  avatar: string;
  connected: boolean;
  unreadCount?: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  semester: string;
  branch: string;
  fileType: 'PDF' | 'DOC' | 'ZIP' | 'NOTES';
  fileSize: string;
  pages: number;
  author: string;
  authorRole: string;
  upvotes: number;
  downloads: number;
  hasUpvoted?: boolean;
  tags: string[];
  description: string;
  previewSummary: string[];
  unit: string;
  downloadUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'Academic' | 'Workshop' | 'Placement' | 'Hackathon' | 'Administration';
  categoryLabel: string;
  date: string; // e.g., '2026-10-10' or 'Oct 10, 2026'
  time: string;
  venueOrLink: string;
  deadline?: string; // e.g., '11:59 PM'
  priority: 'urgent' | 'high' | 'normal';
  description: string;
  organizer: string;
  isRegisteredOrSaved?: boolean;
  isCompleted?: boolean;
}

export interface AlumniProfile {
  id: string;
  name: string;
  batchYear: string;
  branch: string;
  role: string;
  company: string;
  companyLogoColor: string;
  location: string;
  avatar: string;
  domain: string;
  offerMentorshipIn: ('Mock Interviews' | 'Resume Review' | 'Referrals' | '1:1 Coffee Chat' | 'Career Guidance')[];
  topAdvice: string;
  linkedin: string;
  email: string;
  connected: boolean;
  recommendationCount: number;
}

export interface PlacementOpportunity {
  id: string;
  company: string;
  companyInitials: string;
  companyColor: string;
  role: string;
  type: 'Full-Time' | 'Summer Internship' | 'Off-Campus Drive';
  stipendOrCTC: string;
  location: string;
  applicationDeadline: string;
  deadlineDate: string;
  daysRemaining: number;
  eligibility: {
    minCgpa: number;
    eligibleBranches: string[];
    eligibleYears: string[];
  };
  skills: string[];
  rounds: string[];
  description: string;
  status: 'Open' | 'Applied' | 'Shortlisted';
  applicantCount: number;
  openings: number;
  applyLink?: string;
}

import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import {
  INITIAL_COMMUNITIES,
  INITIAL_WORKSHOPS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_PLACEMENTS,
  INITIAL_ALUMNI,
} from '@/lib/data';
import { getFastCampusAnswer } from '@/lib/aiFastResponses';

// High-speed in-memory cache for fast repeated queries
const memoryCache = new Map<string, string>();
const MAX_CACHE_SIZE = 300;

function addToCache(key: string, val: string) {
  if (memoryCache.size >= MAX_CACHE_SIZE) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
  memoryCache.set(key, val);
}

// Compact campus database contexts
const COMPACT_COMMUNITY_SUMMARY = INITIAL_COMMUNITIES.map(
  (c) => `${c.shortCode} (${c.name}): Lead ${c.leadName} (${c.leadRole}). Category: ${c.category}, Focus: ${c.tags.slice(0, 3).join(', ')}. Info: ${c.shortDesc}`
).join('\n');

const COMPACT_WORKSHOP_SUMMARY = INITIAL_WORKSHOPS.map(
  (w) => `${w.title} (${w.communityName}): ${w.date}, ${w.time} @ ${w.venue}. Seats: ${w.seatsLeft}/${w.seatsTotal}. Pre-req: ${w.prerequisites}`
).join('\n');

const COMPACT_DEADLINES_SUMMARY = INITIAL_CALENDAR_EVENTS.map(
  (d) => `${d.date} (${d.time}): ${d.title} [${d.type} - Priority: ${d.priority}] - ${d.venueOrLink}`
).join('\n');

const COMPACT_PLACEMENTS_SUMMARY = INITIAL_PLACEMENTS.map(
  (p) => `${p.company} - ${p.role} (${p.type}): Package: ${p.stipendOrCTC}. Min CGPA: ${p.eligibility.minCgpa}. Deadline: ${p.applicationDeadline}. Key skills: ${p.skills.slice(0, 3).join(', ')}`
).join('\n');

const COMPACT_STUDY_SUMMARY = INITIAL_STUDY_MATERIALS.map(
  (s) => `${s.subject}: "${s.title}" (${s.pages} pgs by ${s.author}). Tags: ${s.tags.slice(0, 3).join(', ')}`
).join('\n');

const COMPACT_ALUMNI_SUMMARY = INITIAL_ALUMNI.map(
  (a) => `${a.name} (${a.batchYear} ${a.branch}) @ ${a.company} as ${a.role}. Offers: ${a.offerMentorshipIn.join(', ')}. Advice: ${a.topAdvice}`
).join('\n');

function buildFallbackAnswer(branch: string, question: string): string {
  const q = question.toLowerCase();
  if (q.includes('placement') || q.includes('internship') || q.includes('job') || q.includes('google')) {
    return `**Top Campus Placement Opportunities:**\n\n• **Google SDE Intern (Summer 2027)**: ₹1.25L/month stipend (Deadline: Oct 12)\n• **Microsoft Associate Cloud Engineer**: 24.5 LPA CTC (Deadline: Oct 20)\n• **NVIDIA Applied AI Intern**: ₹95k/month (Deadline: Oct 25)\n\n*Check the **Explore → Placements** section to submit your application directly!*`;
  }
  if (q.includes('deadline') || q.includes('exam') || q.includes('calendar')) {
    return `**Key Upcoming Deadlines:**\n\n• **Oct 08**: Assignment 1 Submission (Data Structures & C++) on Moodle\n• **Oct 10**: Autonomous Robotics Lab in Lab 204\n• **Oct 12**: Google Summer Internship Application Cutoff\n• **Oct 19**: Mid-Term Unit Test Examination Week begins\n\n*Open the **Campus Calendar** in the navigation bar to track all your personal reminders!*`;
  }
  if (q.includes('notes') || q.includes('study') || q.includes('pyq') || q.includes('dsa')) {
    return `**High-Yield Study Materials Available:**\n\n• **DSA Topper Notes**: 124 pages by Ananya Roy (Rank 1)\n• **Maths 1 PYQ Solved Papers**: Last 5 years solved university exams\n• **Operating Systems Kernel & Concurrency**: Complete syllabus summary\n\n*Scroll down on the **Home** tab to preview or download!*`;
  }
  if (q.includes('club') || q.includes('join')) {
    return `**Recommended Clubs for ${branch}:**\n\n• **GDSC (Google Developer Student Club)**: Modern web dev, Google Cloud Run, and solution hackathons.\n• **ACM Student Chapter**: Data structures, algorithms (DSA), and ICPC coding rounds.\n• **Robotics Society (RAS)**: Microcontrollers (ESP32/Arduino) and embedded hardware.\n\n*Browse communities & RSVP in the **Explore** tab!*`;
  }
  return `**Campus Guidance (${branch}):**\n\n• **Top Technical Clubs**: Connect with **GDSC** for cloud/web, **ACM** for algorithms, and **RAS** for hardware.\n• **Upcoming Action**: Register for the upcoming *Autonomous Robotics* or *Full-Stack Cloud* bootcamps.\n• **Mentorship**: Connect with Google/Microsoft alumni or senior leads in the **Explore** tab!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, studentProfile } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }

    const trimmedQuestion = question.trim();
    const normKey = trimmedQuestion.toLowerCase();
    const branch = studentProfile?.branch || 'Computer Engineering';
    const year = studentProfile?.classYear || 'FE (First Year Junior)';

    // 1. Check in-memory cache first (0ms latency)
    if (memoryCache.has(normKey)) {
      const cached = memoryCache.get(normKey)!;
      return NextResponse.json({ reply: cached, source: 'cache' });
    }

    // 2. High-speed local campus intent match (0ms latency)
    const fastMatch = getFastCampusAnswer(trimmedQuestion, studentProfile);
    if (fastMatch.matched) {
      addToCache(normKey, fastMatch.reply);
      return NextResponse.json({ reply: fastMatch.reply, source: 'fast-knowledge' });
    }

    // 3. Prepare robust fallback answer
    const fallback = buildFallbackAnswer(branch, trimmedQuestion);

    // 4. Gemini API Call
    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are CampusPulse AI Advisor, the official smart campus guide for college students, junior onboarding, technical committees, study materials, placement drives, and alumni networks.
Keep your response ultra-efficient:
1. MAX 90-110 words.
2. Directly answer with high-impact bullet points and bold highlights.
3. Tailor recommendations specifically to the student's branch (${branch}) and academic year (${year}).
4. Cite verified facts from the campus database below where relevant (e.g. specific dates, leads, companies, deadlines).
5. NO greeting fluff, NO robotic disclaimers.

VERIFIED CAMPUS DATA:
COMMUNITIES & CLUBS:
${COMPACT_COMMUNITY_SUMMARY}

WORKSHOPS & BOOTCAMPS:
${COMPACT_WORKSHOP_SUMMARY}

CALENDAR & DEADLINES:
${COMPACT_DEADLINES_SUMMARY}

PLACEMENTS & INTERNSHIPS:
${COMPACT_PLACEMENTS_SUMMARY}

CURATED STUDY MATERIALS:
${COMPACT_STUDY_SUMMARY}

ALUMNI DIRECTORY:
${COMPACT_ALUMNI_SUMMARY}`;

      // Race between Gemini API call and a 4000ms safety timeout
      const apiCall = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: trimmedQuestion,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const timeoutPromise = new Promise<{ text: string }>((resolve) => {
        setTimeout(() => {
          resolve({ text: fallback });
        }, 4000);
      });

      const result = await Promise.race([apiCall, timeoutPromise]);
      const reply = result.text || fallback;

      addToCache(normKey, reply);
      return NextResponse.json({ reply, source: 'gemini-flash' });
    }

    // No API key configured
    addToCache(normKey, fallback);
    return NextResponse.json({ reply: fallback, source: 'fallback' });
  } catch (error: any) {
    console.error('Error generating AI query response:', error);
    const fallback = buildFallbackAnswer('Computer Engineering', 'general');
    return NextResponse.json({ reply: fallback, error: true }, { status: 200 });
  }
}

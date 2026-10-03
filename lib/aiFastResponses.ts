import {
  INITIAL_COMMUNITIES,
  INITIAL_WORKSHOPS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_PLACEMENTS,
  INITIAL_ALUMNI,
} from './data';
import { StudentProfile } from './types';

export interface FastMatchResult {
  matched: boolean;
  reply: string;
}

/**
 * High-speed local knowledge matcher for instant 0ms responses.
 * Detects common campus queries and generates punchy, structured answers immediately.
 */
export function getFastCampusAnswer(query: string, student?: Partial<StudentProfile>): FastMatchResult {
  const q = query.trim().toLowerCase();
  const branch = student?.branch || 'Computer Engineering';

  // 0. Greetings / Intro
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'namaste' ||
    q.startsWith('who are you') ||
    q.startsWith('what can you do')
  ) {
    return {
      matched: true,
      reply: `**Hello! I am your CampusPulse AI Advisor 👋**\n\nI can help you with:\n• Finding the best technical club or committee for **${branch}**\n• Upcoming deadlines, assignments, and exam schedules\n• High-yield study materials & topper notes (DSA, Math, OS)\n• Placement & internship drives (Google, Microsoft, NVIDIA)\n• Connecting with verified campus alumni for referrals & guidance\n\nWhat would you like to explore today?`,
    };
  }

  // 1. Placements & Internships
  if (
    q.includes('placement') ||
    q.includes('internship') ||
    q.includes('job') ||
    q.includes('stipend') ||
    q.includes('ctc') ||
    q.includes('google sde') ||
    q.includes('package')
  ) {
    return {
      matched: true,
      reply: `**Top Campus Placement & Internship Opportunities:**\n\n• **Google SDE Intern (Summer 2027)**: ₹1,25,000/mo stipend. Eligibility: Min 8.0 CGPA, FE/SE/TE. *Deadline: Oct 12!*\n• **Microsoft Associate Cloud Engineer**: 24.5 LPA CTC. Eligibility: Min 7.5 CGPA, TE/BE.\n• **NVIDIA Applied AI Intern**: ₹95,000/mo. CUDA & PyTorch focus. *Deadline: Oct 25.*\n• **Goldman Sachs Summer Analyst**: ₹1,50,000/mo stipend. Strong DSA & probability.\n\n*Head to the **Explore → Placements** tab to track eligibility and submit your profile with 1-click!*`,
    };
  }

  // 2. Calendar / Deadlines / Exam dates
  if (
    q.includes('deadline') ||
    q.includes('calendar') ||
    q.includes('exam') ||
    q.includes('submission') ||
    q.includes('date') ||
    q.includes('when is')
  ) {
    return {
      matched: true,
      reply: `**Upcoming Campus Deadlines & Schedule:**\n\n• **Oct 08 (11:59 PM)**: Assignment 1 Submission — Data Structures & C++ (Moodle LMS)\n• **Oct 10 (10:00 AM)**: Autonomous Robotics Hands-On Lab (Lab 204)\n• **Oct 12 (05:00 PM)**: Google Summer Internship Application Cutoff\n• **Oct 14 (02:30 PM)**: GDSC Full-Stack Cloud & Web Development Masterclass\n• **Oct 19 - Oct 23**: Mid-Term Unit Test Examination Week (Compulsory)\n• **Oct 28**: Term Fee Payment & University Exam Form Deadline\n\n*Check the **Campus Calendar** modal to add reminders to your personal schedule!*`,
    };
  }

  // 3. Study Materials / Notes / PYQ
  if (
    q.includes('study material') ||
    q.includes('notes') ||
    q.includes('pyq') ||
    q.includes('question paper') ||
    q.includes('dsa notes') ||
    q.includes('maths') ||
    q.includes('cheat sheet') ||
    q.includes('syllabus')
  ) {
    return {
      matched: true,
      reply: `**High-Yield Campus Study Materials (Home Tab):**\n\n• **Complete DSA Hand-Annotated Notes**: 124-page guide by Ananya Roy (Rank 1). Trees, Graphs, DP & C++ code.\n• **Engineering Math 1 PYQ Solved Guide**: 5 years solved university papers with step-marking breakdown.\n• **Operating Systems Kernel & Concurrency**: Quick revision on Semaphores, Deadlocks & Paging.\n• **DBMS & SQL Cheat Sheet**: 54 pages of normalization, indexing, and complex queries.\n\n*Scroll down on the **Home** tab to preview or download any syllabus bundle!*`,
    };
  }

  // 4. Alumni Network / Mentors / Referrals
  if (
    q.includes('alumni') ||
    q.includes('referral') ||
    q.includes('mock interview') ||
    q.includes('coffee chat') ||
    q.includes('senior') ||
    q.includes('priya') ||
    q.includes('kunal')
  ) {
    return {
      matched: true,
      reply: `**Featured Campus Alumni (Explore → Alumni Network):**\n\n• **Priya Sharma** (Batch '23): SDE II at **Google** (Distributed Systems). Offers mock interviews & referrals.\n• **Kunal Patil** (Batch '22): Cloud Architect at **AWS**. Mentors in Kubernetes & DevOps.\n• **Sneha Iyer** (Batch '24): Applied AI Engineer at **Microsoft**. Offers resume reviews & GSoC advice.\n• **Siddharth Nair** (Batch '21): Quant Developer VP at **Goldman Sachs**. Low-latency C++ expert.\n\n*You can send a direct 1:1 mentorship or referral request from the **Explore** tab!*`,
    };
  }

  // 5. Languages / What to learn first semester
  if (
    q.includes('language') ||
    q.includes('what to learn') ||
    q.includes('which language') ||
    q.includes('c++') ||
    q.includes('python') ||
    q.includes('programming')
  ) {
    return {
      matched: true,
      reply: `**Recommended Languages for 1st Year (${branch}):**\n\n• **C++ (Primary for DSA & Contests)**: Standard choice for campus placements and ACM ICPC rounds. Focus on STL.\n• **Python (Rapid Prototyping & AI)**: Perfect for scripting, automation, and basic machine learning.\n• **JavaScript / TypeScript (Web & Cloud)**: Required for building modern web applications with GDSC.\n• **Immediate Action**: Attend ACM's *Wednesday Coders Circle* in Lab 101 to build problem-solving fundamentals!`,
    };
  }

  // 6. Which club is best for branch / 1st year
  if (
    (q.includes('which club') || q.includes('best club') || q.includes('recommend club') || q.includes('should i join')) &&
    (q.includes('year') || q.includes('student') || q.includes('freshman') || q.includes('branch') || q.includes('cs') || q.includes('engineer') || q.includes('me'))
  ) {
    if (branch.includes('Mechanical') || q.includes('mechanical') || q.includes('hardware')) {
      return {
        matched: true,
        reply: `**Top Recommendations for ${branch}:**\n\n• **Robotics & Automation Society (RAS)**: Best for CAD modeling, 3D printing, Robocon bot building, and microcontroller automation.\n• **E-Cell (Entrepreneurship Cell)**: Best for product hardware prototyping and startup incubation.\n• **Action Item**: Register for the *Autonomous Robotics Workshop* (Oct 10) in the Explore tab—kits provided!`,
      };
    }
    if (branch.includes('Electronics') || q.includes('electronics') || q.includes('entc') || q.includes('iot')) {
      return {
        matched: true,
        reply: `**Top Recommendations for ${branch}:**\n\n• **Robotics & Automation Society (RAS)**: Hands-on ESP32, sensor integration, ROS2, and PCB design.\n• **GDSC (Google Developer Student Club)**: Cloud IoT endpoints, backend APIs, and firmware telemetry.\n• **Action Item**: Join the Robotics workshop on Oct 10—freshmen get full breadboard and motor kits.`,
      };
    }
    return {
      matched: true,
      reply: `**Top Recommendations for 1st Year ${branch}:**\n\n• **GDSC (Google Developer Student Club)**: Master modern web apps, cloud deployment (Google Cloud Run), and hackathons.\n• **ACM Student Chapter**: Strengthen data structures & algorithms (DSA), C++ problem-solving, and ICPC contest prep.\n• **Robotics (RAS)**: Great if you want hands-on hardware/embedded experience.\n• **Next Step**: Check out the **Explore** tab to join community channels and RSVP for upcoming workshops!`,
    };
  }

  // 7. Robotics workshop prerequisites
  if (
    (q.includes('robot') || q.includes('ras') || q.includes('hardware')) &&
    (q.includes('prereq') || q.includes('require') || q.includes('need') || q.includes('bring') || q.includes('eligib'))
  ) {
    const ws = INITIAL_WORKSHOPS.find((w) => w.id === 'ws-1');
    return {
      matched: true,
      reply: `**Autonomous Robotics Workshop Prerequisites:**\n\n• **Prior Knowledge**: Zero experience required! Freshmen receive step-by-step guidance.\n• **Provided on Campus**: ESP32 microcontrollers, motor drivers, ultrasonic sensors, and breadboards.\n• **What to Bring**: Laptop with Arduino IDE installed & USB-C cable.\n• **Date & Venue**: ${ws ? `${ws.date}, ${ws.time} at ${ws.venue} (${ws.seatsLeft} seats left)` : 'Saturday, Oct 10 at Robotics Lab 204'}.\n• **Action**: Register immediately via the **Explore** tab!`,
    };
  }

  // 8. How to join GDSC / ACM core team
  if (
    (q.includes('core team') || q.includes('recruit') || q.includes('interview') || q.includes('how to join')) &&
    (q.includes('gdsc') || q.includes('acm') || q.includes('ras') || q.includes('club'))
  ) {
    return {
      matched: true,
      reply: `**Freshman Core Team Recruitment Guide:**\n\n1. **GDSC Junior Associates**: Open call throughout October. Active attendees in the Oct 14 cloud workshop receive direct fast-track interview invites!\n2. **ACM Coders Circle**: Join weekly Wednesday problem rounds in Lab 101.\n3. **Selection Criteria**: Showing up consistently, pushing code to GitHub, and helping fellow freshmen troubleshoot bugs.`,
    };
  }

  return { matched: false, reply: '' };
}

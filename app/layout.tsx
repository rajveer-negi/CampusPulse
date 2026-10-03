import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'CampusPulse - Student Community & Junior Onboarding Hub',
  description: 'Professional campus community platform for juniors to discover committees, workshops, events, connect with mentors, and explore careers with an AI advisor.',
  openGraph: {
    title: 'CampusPulse - Student Community & Junior Onboarding Hub',
    description: 'Professional campus community platform for juniors to discover committees, workshops, events, connect with mentors, and explore careers with an AI advisor.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CampusPulse - Student Community & Junior Onboarding Hub',
    description: 'Professional campus community platform for juniors to discover committees, workshops, events, connect with mentors, and explore careers with an AI advisor.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

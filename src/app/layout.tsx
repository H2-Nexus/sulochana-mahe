import type { Metadata, Viewport } from 'next';
import { DM_Mono, Instrument_Serif, Manrope, Noto_Sans_Malayalam, Noto_Serif_Malayalam } from 'next/font/google';
import { LanguageProvider } from '@/i18n/LanguageContext';
import SiteChrome from '@/components/SiteChrome';
import { OPEN_GRAPH_BASE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/lib/metadata';
import '@/styles.css';

// Self-hosted by next/font. The CSS variables feed the --serif / --mono / --sans
// stacks in styles.css; the Malayalam faces are only fetched when Malayalam
// glyphs are on the page, so they are not preloaded.
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });
const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });
const mono = DM_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono' });
const serifMl = Noto_Serif_Malayalam({ subsets: ['malayalam'], weight: ['400', '500'], variable: '--font-serif-ml', preload: false });
const sansMl = Noto_Sans_Malayalam({ subsets: ['malayalam'], weight: ['400', '500', '600'], variable: '--font-sans-ml', preload: false });

export const metadata: Metadata = {
  // Absolute base for Open Graph image URLs; set NEXT_PUBLIC_SITE_URL in production.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: { url: '/brand/favicon.svg', type: 'image/svg+xml' }, apple: '/brand/sm-mark-1024.png' },
  openGraph: { ...OPEN_GRAPH_BASE, title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17100A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [serif, sans, mono, serifMl, sansMl].map((f) => f.variable).join(' ');
  return (
    // The language (lang) and runtime classes (lenis, has-cur) are set on <html> in the browser.
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <SiteChrome />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

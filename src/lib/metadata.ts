import type { Metadata } from 'next';
import { translate } from '@/i18n/translate';

// Server-rendered metadata is in English; the browser keeps document.title in
// the visitor's language (see useSite). Descriptions reuse the site's own copy.

export const SITE_NAME = 'Sulochana Mahe';
export const SITE_TITLE = translate('en', 'meta.title');
export const SITE_DESCRIPTION = translate('en', 'about.intro');

// Next.js replaces (not merges) a parent's openGraph, so every page spreads this.
export const OPEN_GRAPH_BASE = {
  type: 'website',
  siteName: SITE_NAME,
  locale: 'en_IN',
  alternateLocale: ['ml_IN'],
  images: [{ url: '/brand/sm-avatar-1024.png', width: 1024, height: 1024, alt: SITE_NAME }],
} satisfies NonNullable<Metadata['openGraph']>;

// pageMetadata('about', 'about.intro') → title "About — Sulochana Mahe" (via the
// root layout's title template) plus that description.
export function pageMetadata(page: string, descriptionKey?: string): Metadata {
  const title = translate('en', `meta.pages.${page}`);
  return withDescription(title, descriptionKey ? translate('en', descriptionKey) : SITE_DESCRIPTION);
}

export function withDescription(title: string, description: string): Metadata {
  return { title, description, openGraph: { ...OPEN_GRAPH_BASE, title: `${title} — ${SITE_NAME}`, description } };
}

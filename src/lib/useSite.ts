'use client';

import { useEffect, type DependencyList } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '../i18n/LanguageContext';
import { loadRuntime, type SiteDestroy } from './runtime';

// Boots the shared runtime (Lenis, clouds, cursor, menu, reveals) for a page
// and tears it down on unmount. Internal links with data-route play the cloud
// cover transition, then navigate via the Next.js router. Also keeps the document
// title in the current language; `titleName` overrides the page name (Work passes
// the painting's title).
export function useSite(page: string, deps: DependencyList = [], titleName?: string) {
  const router = useRouter();
  const { ready, t } = useLang();
  useEffect(() => {
    // Wait until the stored language is on screen, so the runtime binds to the final text.
    if (!ready) return;
    let cancelled = false;
    let stop: (() => void) | undefined;
    let destroy: SiteDestroy | undefined;
    loadRuntime().then((Site) => {
      if (cancelled) return;
      stop = Site.whenReady(() => {
        destroy = Site.init({ page, navigate: (href) => router.push(href) });
        // Plain <a data-route> links are not prefetched like <Link>, so warm them here.
        document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((a) => {
          const href = a.getAttribute('href');
          if (href && href.startsWith('/')) router.prefetch(href);
        });
      });
    }, (err) => console.error('Failed to load the site runtime', err));
    return () => {
      cancelled = true;
      if (stop) stop();
      if (destroy) destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, ...deps]);
  const key = `meta.pages.${page}`;
  const name = titleName ?? t(key);
  useDocumentTitle(name === key ? t('meta.title') : `${name} — Sulochana Mahe`);
}

// The server's <title> comes from Next.js metadata (English). Next can write it
// back after hydration, so the localized title is re-applied whenever <head> changes.
function useDocumentTitle(title: string) {
  useEffect(() => {
    const apply = () => { if (document.title !== title) document.title = title; };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [title]);
}

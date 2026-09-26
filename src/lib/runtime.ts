import type Lenis from 'lenis';

// Types for the shared animation runtime in site.js, which lives on window.Site.

export type SiteDestroy = (() => void) & { rebuild: () => void };

export interface SiteCurrent {
  lenis: Lenis;
  rebuild: () => void;
  // Clouds close, `apply` swaps the content (it may return a promise), clouds part.
  transition: (apply: () => unknown) => void;
  page: string;
}

export interface SiteRuntime {
  ready: () => boolean;
  whenReady: (cb: () => void) => () => void;
  init: (opts: { page: string; navigate?: (href: string) => void }) => SiteDestroy;
  current?: SiteCurrent | null;
}

declare global {
  interface Window {
    Site?: SiteRuntime;
    SITE_STATIC?: boolean;
    // Globals site.js reads; installed by loadRuntime().
    gsap?: typeof import('gsap').default;
    ScrollTrigger?: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    Lenis?: typeof Lenis;
  }
}

let loading: Promise<SiteRuntime> | null = null;

// site.js touches window as soon as it is evaluated and reads GSAP, ScrollTrigger
// and Lenis from globals, so it is loaded in the browser only, on first use.
export function loadRuntime(): Promise<SiteRuntime> {
  if (!loading) {
    loading = (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ]);
      Object.assign(window, { gsap, ScrollTrigger, Lenis: LenisCtor });
      await import('./site.js');
      return window.Site as SiteRuntime;
    })();
    // Allow a retry on the next page if a chunk failed to download.
    loading.catch(() => { loading = null; });
  }
  return loading;
}

export const currentSite = (): SiteCurrent | null | undefined =>
  typeof window === 'undefined' ? undefined : window.Site?.current;

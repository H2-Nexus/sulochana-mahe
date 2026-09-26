'use client';

import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_LANG, isLang, localize, translate, type Lang, type Localized, type Vars } from './translate';
import { currentSite } from '../lib/runtime';

// Single source of truth for the site language. UI copy lives in strings.ts;
// content in data.ts carries { en, ml } pairs that useLocalized() resolves.

export { LANGUAGES } from './translate';
export type { Lang } from './translate';

const STORAGE_KEY = 'sm-lang';

// Read in the browser only: the server always renders DEFAULT_LANG.
function storedLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}
  return DEFAULT_LANG;
}

const localized = new WeakMap<object, Partial<Record<Lang, unknown>>>();

interface LanguageValue {
  lang: Lang;
  // False until the stored language has been applied in the browser; the
  // animation runtime waits for it so it binds to the final text.
  ready: boolean;
  setLang: (next: string) => void;
  t: (key: string, vars?: Vars) => string;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [ready, setReady] = useState(false);
  const settle = useRef<(() => void) | null>(null);

  // Before the first paint, while the cloud loader still covers the page,
  // switch to the stored language (hydration itself uses the server's English).
  useLayoutEffect(() => {
    const stored = storedLang();
    /* eslint-disable react-hooks/set-state-in-effect -- browser-only value, applied before paint */
    if (stored !== DEFAULT_LANG) setLangState(stored);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    // The provider's effect runs after every child has committed the new language.
    if (settle.current) { settle.current(); settle.current = null; }
  }, [lang, ready]);

  // Plays the cloud transition when the runtime is active, so text swaps out of sight.
  const setLang = useCallback((next: string) => {
    if (!isLang(next) || next === lang) return;
    const site = currentSite();
    const apply = () => new Promise<void>((resolve) => { settle.current = resolve; setLangState(next); });
    if (site && site.transition) site.transition(apply);
    else setLangState(next);
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, ready, setLang, t: (key, vars) => translate(lang, key, vars) }),
    [lang, ready, setLang],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

// Returns `data` with every { en, ml } value resolved to the current language (cached per tree).
export function useLocalized<T extends object>(data: T): Localized<T> {
  const { lang } = useLang();
  let byLang = localized.get(data);
  if (!byLang) localized.set(data, (byLang = {}));
  return (byLang[lang] ??= localize(data, lang)) as Localized<T>;
}

// "Best *works*" → ['Best ', <em>works</em>]. Asterisks mark the accented words.
export function rich(text: string, emStyle?: React.CSSProperties): React.ReactNode[] {
  return String(text).split('*').map((part, i) => (i % 2 ? <em key={i} style={emStyle}>{part}</em> : part));
}

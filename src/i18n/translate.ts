import strings from './strings';

// Plain (server + client) translation helpers. LanguageContext wraps these in React state.

export const LANGUAGES = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'ml', name: 'മലയാളം', short: 'മല' },
] as const;
export type Lang = (typeof LANGUAGES)[number]['code'];
export const DEFAULT_LANG: Lang = 'en';
export const isLang = (v: unknown): v is Lang => LANGUAGES.some((l) => l.code === v);

type Dict = { [key: string]: string | Dict };
const lookup = (lang: Lang, key: string): unknown =>
  key.split('.').reduce<unknown>((o, k) => (o == null ? o : (o as Dict)[k]), strings[lang]);

export type Vars = Record<string, string | number>;

// t('contact.sentBody', { email }) → string with {email} filled in; falls back to English.
export function translate(lang: Lang, key: string, vars?: Vars): string {
  let s = lookup(lang, key);
  if (typeof s !== 'string') s = lookup(DEFAULT_LANG, key);
  if (typeof s !== 'string') return key;
  if (vars) return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  return s;
}

// { en, ml } pairs become plain strings, recursively.
export type Localized<T> = T extends { en: string }
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

type Pair = { en: string; ml?: string };
const isPair = (v: unknown): v is Pair =>
  !!v && typeof v === 'object' && !Array.isArray(v) && typeof (v as Pair).en === 'string';

export function localize<T>(v: T, lang: Lang): Localized<T>;
export function localize(v: unknown, lang: Lang): unknown {
  if (Array.isArray(v)) return v.map((x) => localize(x, lang));
  if (isPair(v)) return (v as Record<string, string | undefined>)[lang] ?? v.en;
  if (v && typeof v === 'object') {
    const o: Record<string, unknown> = {};
    for (const k in v) o[k] = localize((v as Record<string, unknown>)[k], lang);
    return o;
  }
  return v;
}

'use client';

import React from 'react';
import { LANGUAGES, useLang } from '../i18n/LanguageContext';

// English ↔ Malayalam toggle, shared by the header ("header") and the overlay menu ("menu").
// Styles and responsive behaviour live in styles.css under "Language switch".
type Props = { variant?: 'header' | 'menu' } & Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'className'>;

export default function LanguageSwitch({ variant = 'header', ...rest }: Props) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t('lang.label')} className={`lang-switch lang-switch--${variant}`} {...rest}>
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            className="lang-switch__opt"
            aria-pressed={active}
            aria-label={active ? l.name : t('lang.switchTo', { name: l.name })}
            title={l.name}
            onClick={() => setLang(l.code)}
          >
            <span className="lang-switch__full">{l.name}</span>
            <span className="lang-switch__short" aria-hidden="true">{l.short}</span>
          </button>
        );
      })}
    </div>
  );
}

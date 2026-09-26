'use client';

import { useEffect } from 'react';
import { useLang } from '@/i18n/LanguageContext';

// Route-level error boundary. It sits above the cloud overlay (z-index 400),
// which would otherwise keep covering the page if a view fails before the
// animation runtime has parted the clouds.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLang();
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main role="alert" style={{ position: 'fixed', inset: '0', zIndex: '450', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '0 6vw', textAlign: 'center', background: '#17100A', color: '#F1E6CC' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D89A2B' }}>{t('error.kicker')}</span>
      <h1 style={{ margin: '0', fontWeight: '400', fontFamily: 'var(--serif)', fontSize: 'clamp(44px,7vw,110px)', lineHeight: '1' }}>{t('error.title')}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
        <button type="button" onClick={reset} style={{ padding: '14px 24px', borderRadius: '999px', border: '0', background: '#D89A2B', color: '#17100A', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{t('error.retry')}</button>
        {/* A full page load resets the animation runtime as well. */}
        <a href="/" style={{ padding: '14px 24px', borderRadius: '999px', border: '1px solid rgba(241,230,204,.55)', fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('nav.home')}</a>
      </div>
    </main>
  );
}

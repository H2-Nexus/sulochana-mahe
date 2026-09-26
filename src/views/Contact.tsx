'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSite } from '../lib/useSite';
import data from '../data';
import SiteFooter from '../components/SiteFooter';
import SplitChars from '../components/SplitChars';
import { useLang, useLocalized } from '../i18n/LanguageContext';

export default function Contact() {
  useSite('contact');
  const { t } = useLang();
  const { types } = useLocalized(data);
  const params = useSearchParams();
  // The chosen type is stored by its number, so it stays selected if the language changes.
  const pre = types.find((x) => x.n === params.get('type'));
  const [form, setForm] = useState({ name: '', email: '', message: '', type: pre ? pre.n : '' });
  const [sent, setSent] = useState(false);
  const notSent = !sent;
  const firstName = (form.name || '').trim().split(/\s+/)[0];
  const onField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setForm((f) => ({ ...f, [name]: value })); };
  const submit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); };
  const reset = () => { setSent(false); setForm({ name: '', email: '', message: '', type: '' }); };
  const typeOpts = types.map((x) => {
    const sel = form.type === x.n;
    return { t: x.t, sel, bg: sel ? '#F6ECD6' : 'transparent', fg: sel ? '#A8391C' : '#F6ECD6', pick: () => setForm((f) => ({ ...f, type: sel ? '' : x.n })) };
  });
  return (
<>
<main id="top" style={{ background: "#A8391C", color: "#F6ECD6" }}>
<section data-screen-label="Contact" style={{ padding: "170px 4vw clamp(96px,12vw,170px)", display: "flex", flexWrap: "wrap", gap: "clamp(56px,7vw,120px)" }}>
<div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: "36px" }}>
<span data-hfade="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase" }}>{t('contact.kicker')}</span>
<h1 data-ml="sm" style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(64px,10vw,180px)", lineHeight: ".88", letterSpacing: "-.025em" }}>
<span style={{ display: "block", overflow: "hidden", paddingBottom: ".06em" }}><SplitChars text={t('contact.heroLine1')} /></span>
<span style={{ display: "block", overflow: "hidden", paddingBottom: ".06em" }}><em><SplitChars text={t('contact.heroLine2')} /></em></span>
</h1>
<p data-hfade="1" style={{ margin: "0", maxWidth: "420px", fontSize: "18px", lineHeight: "1.65", textWrap: "pretty" }}>{t('contact.intro')}</p>
<div data-hfade="1" style={{ display: "flex", flexDirection: "column", gap: "22px", marginTop: "12px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", opacity: ".85" }}>{t('common.email')}</span><a href="mailto:hello@sulochanamahe.com" style={{ fontFamily: "var(--serif)", fontSize: "30px" }}>hello@sulochanamahe.com</a></div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", opacity: ".85" }}>{t('common.instagram')}</span><a href="https://instagram.com/" target="_blank" rel="noopener" style={{ fontFamily: "var(--serif)", fontSize: "30px" }}>@sulochanamahe</a></div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", opacity: ".85" }}>{t('common.studio')}</span><span style={{ fontFamily: "var(--serif)", fontSize: "30px" }}>{t('common.keralaIndia')}</span></div>
</div>
</div>
<div style={{ flex: "1 1 480px" }}>
{sent && (<>
<div role="status" style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "40px" }}>
<span style={{ width: "14px", height: "14px", background: "#D89A2B", transform: "rotate(45deg)" }} />
<h2 data-ml="keep" style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(40px,4vw,64px)", lineHeight: "1" }}>{t('contact.sentTitle', { name: firstName })}</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", maxWidth: "420px" }}>{t('contact.sentBody', { email: form.email })}</p>
<button onClick={reset} style={{ alignSelf: "flex-start", background: "none", border: "0", borderBottom: "1px solid #F6ECD6", color: "#F6ECD6", padding: "0 0 8px", fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", cursor: "pointer" }}>{t('contact.sendAnother')}</button>
</div>
</>)}
{notSent && (<>
<form data-hfade="1" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<label style={{ display: "flex", flexDirection: "column", gap: "12px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase" }}>{t('contact.nameLabel')}</span><input required name="name" autoComplete="name" value={form.name} onChange={onField} placeholder={t('contact.namePlaceholder')} style={{ background: "transparent", border: "0", borderBottom: "1px solid rgba(246,236,214,.5)", color: "#F6ECD6", fontFamily: "var(--serif)", fontSize: "32px", padding: "6px 0 12px", outline: "none" }} /></label>
<label style={{ display: "flex", flexDirection: "column", gap: "12px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase" }}>{t('contact.emailLabel')}</span><input required type="email" name="email" autoComplete="email" value={form.email} onChange={onField} placeholder="you@example.com" style={{ background: "transparent", border: "0", borderBottom: "1px solid rgba(246,236,214,.5)", color: "#F6ECD6", fontFamily: "var(--serif)", fontSize: "32px", padding: "6px 0 12px", outline: "none" }} /></label>
<div role="group" aria-label={t('contact.typeLabel')} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span aria-hidden="true" style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase" }}>{t('contact.typeLabel')}</span>
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
{(typeOpts || []).map((o, $index) => (<React.Fragment key={$index}>
<button type="button" onClick={o.pick} aria-pressed={o.sel} style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 18px", borderRadius: "999px", border: "1px solid #F6ECD6", background: `${o.bg}`, color: `${o.fg}`, cursor: "pointer", transition: "background .3s,color .3s" }}>{o.t}</button>
</React.Fragment>))}
</div>
</div>
<label style={{ display: "flex", flexDirection: "column", gap: "12px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase" }}>{t('contact.messageLabel')}</span><textarea name="message" rows={4} value={form.message} onChange={onField} placeholder={t('contact.messagePlaceholder')} style={{ background: "transparent", border: "0", borderBottom: "1px solid rgba(246,236,214,.5)", color: "#F6ECD6", fontFamily: "var(--serif)", fontSize: "28px", lineHeight: "1.3", padding: "6px 0 12px", outline: "none", resize: "vertical" }} /></label>
<div style={{ display: "flex", justifyContent: "flex-end" }}>
<button type="submit" data-mag="1" style={{ width: "170px", height: "170px", borderRadius: "50%", background: "#D89A2B", color: "#17100A", border: "0", fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", lineHeight: "1.6", cursor: "pointer" }}><span style={{ display: "block", whiteSpace: "pre-line" }}>{t('contact.submit')}</span></button>
</div>
</form>
</>)}
</div>
</section>
<SiteFooter hideCta />
</main>
</>
  );
}

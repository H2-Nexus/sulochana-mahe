'use client';

import React from 'react';
import { useSite } from '../lib/useSite';
import data from '../data';
import SiteFooter from '../components/SiteFooter';
import SplitChars from '../components/SplitChars';
import { useLang, useLocalized } from '../i18n/LanguageContext';

export default function Services() {
  useSite('services');
  const { t } = useLang();
  const all = useLocalized(data).types;
  const total = String(all.length).padStart(2, '0');
  const types = all.map((x, i) => ({ ...x, dir: (i % 2 ? 'row-reverse' : 'row') as React.CSSProperties['flexDirection'], radius: i % 2 ? '999px 999px 0 0' : '0' }));
  return (
<>
<main id="top" style={{ background: "#EFE3C6", color: "#1E150E" }}>
<section data-screen-label="Services hero" style={{ background: "#17100A", color: "#F1E6CC", padding: "170px 4vw 80px", display: "flex", flexDirection: "column", gap: "40px" }}>
<span data-hfade="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('services.kicker')}</span>
<h1 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(72px,14vw,250px)", lineHeight: ".85", letterSpacing: "-.025em", overflow: "hidden", paddingBottom: ".2em", marginBottom: "-.08em" }}>
<SplitChars text={t('services.title')} emStyle={{ color: "#D89A2B" }} />
</h1>
<nav data-hfade="1" aria-label={t('meta.pages.services')} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
{(types || []).map((x, $index) => (<React.Fragment key={$index}>
<a href={`#type-${x.n}`} style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 18px", borderRadius: "999px", border: "1px solid rgba(241,230,204,.4)" }}>{x.n} {x.t}</a>
</React.Fragment>))}
</nav>
</section>
<div style={{ height: "26px", background: "radial-gradient(circle, #D89A2B 0 3px, transparent 3.5px) 0 50% / 18px 18px repeat-x, linear-gradient(#B8401F,#B8401F) 0 0 / 100% 4px no-repeat, linear-gradient(#B8401F,#B8401F) 0 100% / 100% 4px no-repeat, #1E3827" }} />
{(types || []).map((x, $index) => (<React.Fragment key={$index}>
<section id={`type-${x.n}`} data-screen-label={`Service ${x.n}`} style={{ padding: "clamp(80px,10vw,150px) 4vw", borderBottom: "1px solid rgba(30,21,14,.2)", display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,100px)", alignItems: "center", flexDirection: x.dir }}>
<div data-clip="1" style={{ flex: "1 1 380px", aspectRatio: "4 / 5", maxHeight: "78vh", overflow: "hidden", position: "relative", borderRadius: `${x.radius}` }}>
<div data-clipimg="1" style={{ position: "absolute", inset: "0" }}><div data-parallax="1" style={{ position: "absolute", left: "0", right: "0", top: "-10%", height: "120%", backgroundImage: "url(/mural.png)", backgroundSize: `${x.size}`, backgroundPosition: `${x.pos}` }} /></div>
</div>
<div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: "28px" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#9E3418" }}>{x.n} / {total}</span>
<h2 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(48px,6vw,100px)", lineHeight: "1", overflow: "hidden", paddingBottom: ".12em" }}><span data-rl="1" style={{ display: "block" }}>{x.t}</span></h2>
<p data-fade="1" style={{ margin: "0", maxWidth: "480px", fontSize: "18px", lineHeight: "1.65", color: "#3B2C20", textWrap: "pretty" }}>{x.d}</p>
<div data-fade="1" style={{ display: "flex", gap: "40px", flexWrap: "wrap", borderTop: "1px solid #1E150E", paddingTop: "20px", maxWidth: "480px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#9E3418" }}>{t('services.timeline')}</span><span style={{ fontFamily: "var(--serif)", fontSize: "26px" }}>{x.time}</span></div>
</div>
<a href={`/contact?type=${x.n}`} data-route="contact" data-fade="1" style={{ alignSelf: "flex-start", display: "flex", gap: "14px", alignItems: "center", fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", borderBottom: "1px solid #1E150E", paddingBottom: "8px" }}>{t('services.enquire')} <span>→</span></a>
</div>
</section>
</React.Fragment>))}
<SiteFooter />
</main>
</>
  );
}

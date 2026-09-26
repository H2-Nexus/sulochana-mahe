'use client';

import React from 'react';
import { useSite } from '../lib/useSite';
import data from '../data';
import SiteFooter from '../components/SiteFooter';
import SplitChars from '../components/SplitChars';
import { rich, useLang, useLocalized } from '../i18n/LanguageContext';

export default function Work({ id }: { id: string }) {
  const { t } = useLang();
  const works = useLocalized(data).works;
  const i = Math.max(0, works.findIndex((x) => x.id === id));
  useSite('work', [id], works[i].t);
  const w = works[i], next = works[(i + 1) % works.length], prev = works[(i - 1 + works.length) % works.length];
  const total = String(works.length).padStart(2, '0');
  const zoom = (f: number) => (w.size === 'cover' ? f * 100 + '%' : parseFloat(w.size) * f + '%');
  const heroSize = w.size === 'cover' ? 'cover' : zoom(0.6);
  const loupeSize = w.size === 'cover' ? 'cover' : zoom(0.55);
  const story = (w.story || []).map((p) => ({ p }));
  const details = [
    { t: `${t('work.detail')} I`, z: '×1.5', size: zoom(1.5), mt: '0px', r: '0' },
    { t: `${t('work.detail')} II`, z: '×2.4', size: zoom(2.4), mt: 'clamp(0px,8vw,140px)', r: '999px 999px 0 0' },
    { t: `${t('work.detail')} III`, z: '×3.4', size: zoom(3.4), mt: 'clamp(0px,3vw,50px)', r: '0' }
  ];
  const facts: [key: string, value: string, wide?: boolean][] = [['year', w.y], ['medium', w.m], ['size', w.dim], ['time', w.dur], ['location', w.place, true]];
  return (
<>
<main id="top">
<section data-expandsec="1" data-screen-label="Work hero" style={{ position: "relative", height: "230vh", background: "#0E0906" }}>
<div style={{ position: "sticky", top: "0", height: "100svh", minHeight: "520px", overflow: "hidden" }}>
<div data-expand="1" data-from="inset(18% 34% 12% 34% round 999px 999px 0px 0px)" style={{ position: "absolute", inset: "0", overflow: "hidden" }}>
<div data-hclipimg="1" style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: `${heroSize}`, backgroundPosition: `${w.pos}` }} />
</div>
<div style={{ position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(to top, rgba(14,9,6,.9) 0%, rgba(14,9,6,0) 42%)" }} />
<div style={{ position: "absolute", left: "4vw", right: "4vw", top: "112px", display: "flex", justifyContent: "space-between", gap: "24px", fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase" }}>
<a href="/works" data-route="works" data-hfade="1" style={{ color: "#F1E6CC" }}>{t('work.allWorks')}</a>
<span data-hfade="1" style={{ color: "#D89A2B", textAlign: "right" }}>{w.n} / {total} — {w.m}</span>
</div>
<div style={{ position: "absolute", left: "4vw", right: "4vw", bottom: "clamp(36px,6vh,64px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
<h1 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(56px,10vw,180px)", lineHeight: ".9", letterSpacing: "-.02em", color: "#F1E6CC", overflow: "hidden", paddingBottom: ".2em", marginBottom: "-.08em", maxWidth: "1200px" }}>
<SplitChars text={w.t} />
</h1>
<span data-hfade="1" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#F1E6CC", paddingBottom: "1.4vw" }}><span>{w.y} · {w.dim}</span><span style={{ display: "flex", alignItems: "center", gap: "10px", opacity: ".75" }}>{t('work.scrollHint')} <span style={{ width: "1px", height: "36px", background: "rgba(241,230,204,.3)", position: "relative", overflow: "hidden" }}><span data-scrollline="1" style={{ position: "absolute", inset: "0", background: "#D89A2B" }} /></span></span></span>
</div>
</div>
</section>
<section data-screen-label="Overview" style={{ background: "#EFE3C6", color: "#1E150E", padding: "clamp(88px,11vw,160px) 4vw" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,110px)", alignItems: "flex-start" }}>
<dl data-stagger="1" style={{ flex: "1 1 280px", maxWidth: "420px", margin: "0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px 24px", position: "sticky", top: "110px" }}>
{facts.map(([key, value, wide]) => (
<div key={key} style={{ gridColumn: wide ? "1 / -1" : "auto", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #1E150E", paddingTop: "14px" }}><dt style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#9E3418" }}>{t(`work.${key}`)}</dt><dd style={{ margin: "0", fontFamily: "var(--serif)", fontSize: "26px" }}>{value}</dd></div>
))}
</dl>
<div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: "36px" }}>
<p data-fade="1" data-mlh="1" style={{ margin: "0", fontFamily: "var(--serif)", fontSize: "clamp(32px,3.4vw,54px)", lineHeight: "1.1", textWrap: "pretty" }}>{w.d}</p>
{(story || []).map((p, $index) => (<React.Fragment key={$index}>
<p data-fade="1" style={{ margin: "0", maxWidth: "600px", fontSize: "18px", lineHeight: "1.7", color: "#3B2C20", textWrap: "pretty" }}>{p.p}</p>
</React.Fragment>))}
</div>
</div>
</section>
<section data-screen-label="Look closer" style={{ background: "#17100A", color: "#F1E6CC", padding: "clamp(88px,11vw,160px) 4vw" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "48px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('work.closerKicker')}</span>
<h2 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(44px,6vw,96px)", lineHeight: "1", overflow: "hidden", paddingBottom: ".12em" }}><span data-rl="1" style={{ display: "block" }}>{rich(t('work.closerTitle'), { color: "#D89A2B" })}</span></h2>
</div>
<span data-fade="1" style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", opacity: ".8" }}>{t('work.closerHint')}</span>
</div>
<div data-loupe="1" style={{ position: "relative", aspectRatio: "16 / 9", maxHeight: "86vh", width: "100%" }}>
<div data-clip="1" style={{ position: "absolute", inset: "0", overflow: "hidden" }}>
<div data-clipimg="1" style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: `${loupeSize}`, backgroundPosition: `${w.pos}` }} />
</div>
<div data-lens="1" aria-hidden="true" style={{ position: "absolute", top: "0", left: "0", width: "240px", height: "240px", borderRadius: "50%", overflow: "hidden", border: "2px solid #D89A2B", boxShadow: "0 20px 60px rgba(0,0,0,.5)", pointerEvents: "none", background: "#17100A" }}>
<div data-lensimg="1" style={{ position: "absolute", top: "0", left: "0", backgroundImage: "url(/mural.png)", backgroundSize: `${loupeSize}`, backgroundPosition: `${w.pos}` }} />
</div>
</div>
</section>
<section data-screen-label="Details" style={{ background: "#EFE3C6", color: "#1E150E", padding: "clamp(88px,11vw,160px) 4vw" }}>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "4vw", alignItems: "start" }}>
{(details || []).map((x, $index) => (<React.Fragment key={$index}>
<figure style={{ margin: "0", marginTop: `${x.mt}`, display: "flex", flexDirection: "column", gap: "14px" }}>
<div data-clip="1" style={{ aspectRatio: "3 / 4", overflow: "hidden", position: "relative", borderRadius: `${x.r}` }}>
<div data-clipimg="1" style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: `${x.size}`, backgroundPosition: `${w.pos}` }} />
</div>
<figcaption style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "#5A4533" }}><span>{x.t}</span><span>{x.z}</span></figcaption>
</figure>
</React.Fragment>))}
</div>
</section>
<nav data-screen-label="Prev next" style={{ display: "flex", flexWrap: "wrap", background: "#1E3827", color: "#EFE3C6" }}>
<a href={`/works/${prev.id}`} data-route="work" data-cursor={t('cursor.previous')} style={{ flex: "1 1 420px", display: "flex", alignItems: "center", gap: "32px", padding: "clamp(56px,7vw,110px) 4vw", borderRight: "1px solid rgba(239,227,198,.2)" }}>
<span style={{ width: "clamp(90px,10vw,150px)", flex: "none", aspectRatio: "3 / 4", borderRadius: "999px 999px 0 0", backgroundImage: "url(/mural.png)", backgroundSize: `${prev.size}`, backgroundPosition: `${prev.pos}` }} />
<span style={{ display: "flex", flexDirection: "column", gap: "12px" }}><span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('work.previous')} — {prev.n}</span><span style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px,4vw,64px)", lineHeight: "1" }}>{prev.t}</span></span>
</a>
<a href={`/works/${next.id}`} data-route="work" data-cursor={t('cursor.next')} style={{ flex: "1 1 420px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "32px", padding: "clamp(56px,7vw,110px) 4vw", textAlign: "right" }}>
<span style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}><span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('work.next')} — {next.n} →</span><span style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px,4vw,64px)", lineHeight: "1" }}>{next.t}</span></span>
<span style={{ width: "clamp(90px,10vw,150px)", flex: "none", aspectRatio: "3 / 4", borderRadius: "999px 999px 0 0", backgroundImage: "url(/mural.png)", backgroundSize: `${next.size}`, backgroundPosition: `${next.pos}` }} />
</a>
</nav>
<SiteFooter />
</main>
</>
  );
}

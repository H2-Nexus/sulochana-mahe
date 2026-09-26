'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '../lib/useSite';
import data from '../data';
import SiteFooter from '../components/SiteFooter';
import SplitChars from '../components/SplitChars';
import { useLang, useLocalized } from '../i18n/LanguageContext';
import { currentSite } from '../lib/runtime';

export default function Works() {
  useSite('works');
  const { t } = useLang();
  const [cat, setCat] = useState('All');
  const [view, setView] = useState('Stack');
  useEffect(() => { const id = requestAnimationFrame(() => currentSite()?.rebuild()); return () => cancelAnimationFrame(id); }, [cat, view]);
  const works = useLocalized(data).works;
  const bgs = ['#1E3827', '#17100A', '#5A2413', '#2B3522'];
  const list = works.filter((w) => cat === 'All' || w.cat === cat).map((w, i) => ({ ...w, bg: bgs[i % bgs.length] }));
  const total = String(works.length).padStart(2, '0');
  const isStack = view === 'Stack', isIndex = view === 'Index';
  const pill = (sel: boolean, onBg: string, onFg: string, offFg: string) => ({ sel, bg: sel ? onBg : 'transparent', fg: sel ? onFg : offFg });
  const filters = ['All', 'Wall', 'Temple', 'Canvas'].map((c) => ({ label: t(`works.cats.${c}`), count: c === 'All' ? works.length : works.filter((w) => w.cat === c).length, ...pill(cat === c, '#EFE3C6', '#1E3827', '#EFE3C6'), pick: () => setCat(c) }));
  const views = ['Stack', 'Index'].map((v) => ({ label: t(`works.views.${v}`), ...pill(view === v, '#D89A2B', '#17100A', '#EFE3C6'), pick: () => setView(v) }));
  return (
<>
<main id="top" style={{ background: "#1E3827", color: "#EFE3C6" }}>
<section data-screen-label="Works hero" style={{ padding: "160px 4vw 56px", display: "flex", flexDirection: "column", gap: "48px" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
<span data-hfade="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('works.kicker')}</span>
<h1 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(84px,18vw,320px)", lineHeight: ".84", letterSpacing: "-.03em", overflow: "hidden", paddingBottom: ".2em", marginBottom: "-.08em" }}>
<SplitChars text={t('works.title')} emStyle={{ color: "#D89A2B" }} />
</h1>
</div>
<p data-hfade="1" style={{ margin: "0", maxWidth: "380px", fontSize: "17px", lineHeight: "1.65", color: "#D9CFB4", textWrap: "pretty" }}>{t('works.intro')}</p>
</div>
<div data-hfade="1" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", borderTop: "1px solid rgba(239,227,198,.25)", paddingTop: "24px" }}>
<div role="group" aria-label={t('works.filterLabel')} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
{(filters || []).map((f, $index) => (<React.Fragment key={$index}>
<button onClick={f.pick} aria-pressed={f.sel} style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", padding: "12px 20px", borderRadius: "999px", border: "1px solid #EFE3C6", background: `${f.bg}`, color: `${f.fg}`, cursor: "pointer", transition: "background .3s,color .3s" }}>{f.label} <span style={{ opacity: ".6" }}>{f.count}</span></button>
</React.Fragment>))}
</div>
<div role="group" aria-label={t('works.viewLabel')} style={{ display: "flex", gap: "4px", padding: "4px", border: "1px solid rgba(239,227,198,.35)", borderRadius: "999px" }}>
{(views || []).map((v, $index) => (<React.Fragment key={$index}>
<button onClick={v.pick} aria-pressed={v.sel} style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", padding: "10px 18px", borderRadius: "999px", border: "0", background: `${v.bg}`, color: `${v.fg}`, cursor: "pointer", transition: "background .3s,color .3s" }}>{v.label}</button>
</React.Fragment>))}
</div>
</div>
</section>
{isStack && (<>
<section data-stack="1" data-screen-label="Works stack" style={{ position: "relative" }}>
{(list || []).map((w, $index) => (<React.Fragment key={$index}>
<article data-stackitem="1" style={{ position: "sticky", top: "0", height: "100svh", minHeight: "620px", overflow: "hidden" }}>
<a href={`/works/${w.id}`} data-route="work" data-cursor={t('cursor.view')} data-stackinner="1" style={{ position: "absolute", inset: "0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px 4vw", padding: "100px 4vw 48px", boxSizing: "border-box", background: `${w.bg}`, transformOrigin: "50% 0%" }}>
<div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "22px", maxWidth: "640px" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{w.n} / {total} — {w.m}</span>
<h2 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(48px,7vw,124px)", lineHeight: ".92", letterSpacing: "-.02em", color: "#F1E6CC", textWrap: "balance" }}>{w.t}</h2>
<p style={{ margin: "0", maxWidth: "440px", fontSize: "16px", lineHeight: "1.65", color: "#D9CFB4", textWrap: "pretty" }}>{w.d}</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "#F1E6CC" }}>
<span>{w.y}</span><span>{w.dim}</span><span>{w.place}</span>
</div>
<span style={{ alignSelf: "flex-start", display: "flex", gap: "12px", alignItems: "center", fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#F1E6CC", borderBottom: "1px solid #F1E6CC", paddingBottom: "6px", marginTop: "8px" }}>{t('works.viewWork')}</span>
</div>
<div style={{ flex: "0 1 auto", height: "clamp(260px,64vh,700px)", aspectRatio: `${w.ar}`, maxWidth: "100%", overflow: "hidden", position: "relative", borderRadius: `${w.radius}` }}>
<div style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: `${w.size}`, backgroundPosition: `${w.pos}` }} />
</div>
</a>
</article>
</React.Fragment>))}
</section>
</>)}
{isIndex && (<>
<section data-hoverlist="1" data-screen-label="Works index" style={{ position: "relative", padding: "24px 4vw clamp(96px,12vw,170px)" }}>
<div aria-hidden="true" style={{ display: "flex", gap: "32px", padding: "0 0 14px", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>
<span style={{ width: "56px" }}>{t('works.cols.no')}</span><span style={{ flex: "1 1 380px" }}>{t('works.cols.title')}</span><span style={{ flex: "0 1 180px" }}>{t('works.cols.medium')}</span><span style={{ flex: "0 1 240px" }}>{t('works.cols.location')}</span><span style={{ width: "64px", textAlign: "right" }}>{t('works.cols.year')}</span>
</div>
<div data-rows="1">
{(list || []).map((w, $index) => (<React.Fragment key={$index}>
<a href={`/works/${w.id}`} data-route="work" data-row="1" data-pos={w.pos} data-size={w.size} data-ink="#EFE3C6" data-hl="#D89A2B" data-cursor={t('cursor.view')} style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 32px", padding: "clamp(22px,2.6vw,36px) 0" }}>
<span data-rline="1" style={{ position: "absolute", left: "0", right: "0", top: "0", height: "1px", background: "rgba(239,227,198,.4)" }} />
<span data-rin="1" style={{ width: "56px", fontFamily: "var(--mono)", fontSize: "12px", color: "#D89A2B" }}>{w.n}</span>
<h2 data-rin="1" data-ml="keep" style={{ margin: "0", flex: "1 1 380px", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(34px,4.4vw,68px)", lineHeight: "1" }}><span data-rtitle="1" style={{ display: "inline-block" }}>{w.t}</span></h2>
<span data-rin="1" style={{ flex: "0 1 180px", fontSize: "15px", color: "#D9CFB4" }}>{w.m}</span>
<span data-rin="1" style={{ flex: "0 1 240px", fontSize: "15px", color: "#D9CFB4" }}>{w.place}</span>
<span data-rin="1" style={{ width: "64px", textAlign: "right", fontFamily: "var(--mono)", fontSize: "13px" }}><span data-rarrow="1" style={{ display: "inline-block" }}>{w.y}</span></span>
<span data-rthumb="1" style={{ display: "none", flex: "1 1 100%", height: "220px", backgroundImage: "url(/mural.png)", backgroundSize: `${w.size}`, backgroundPosition: `${w.pos}` }} />
</a>
</React.Fragment>))}
<span style={{ display: "block", height: "1px", background: "rgba(239,227,198,.4)" }} />
</div>
<div data-float="1" aria-hidden="true" style={{ position: "fixed", top: "0", left: "0", width: "280px", aspectRatio: "3 / 4", borderRadius: "999px 999px 0 0", overflow: "hidden", pointerEvents: "none", zIndex: "50", opacity: "0" }}>
<div data-floatimg="1" style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: "400%", backgroundPosition: "50% 0%" }} />
</div>
</section>
</>)}
<SiteFooter />
</main>
</>
  );
}

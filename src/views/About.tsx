'use client';

import React from 'react';
import { useSite } from '../lib/useSite';
import SiteFooter from '../components/SiteFooter';
import SplitChars from '../components/SplitChars';
import { rich, useLang } from '../i18n/LanguageContext';

const STEPS = ['ground', 'line', 'colour', 'outline'];
const COLOURS = [
  { key: 'red', swatch: '#B8401F' }, { key: 'yellow', swatch: '#D89A2B' }, { key: 'green', swatch: '#2F5A3A' },
  { key: 'black', swatch: '#17100A' }, { key: 'white', swatch: '#FBF6EA', ring: true }
];

export default function About() {
  useSite('about');
  const { t } = useLang();
  const storyWords = t('about.story').split(' ').map((w) => ({ w }));
  const steps = STEPS.map((k, i) => ({ n: String(i + 1).padStart(2, '0'), t: t(`about.steps.${k}.t`), d: t(`about.steps.${k}.d`) }));
  return (
<>
<main id="top">
<section data-screen-label="About hero" style={{ position: "relative", minHeight: "100svh", background: "#17100A", padding: "150px 4vw 72px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", overflow: "hidden" }}>
<div style={{ flex: "1 1 560px", display: "flex", flexDirection: "column", gap: "36px" }}>
<span data-hfade="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('about.kicker')}</span>
<h1 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(72px,13vw,230px)", lineHeight: ".86", letterSpacing: "-.025em" }}>
<span style={{ display: "block", overflow: "hidden", paddingBottom: ".2em", marginBottom: "-.08em" }}><SplitChars text={t('about.heroLine1')} /></span>
<span style={{ display: "block", overflow: "hidden", paddingBottom: ".2em", marginBottom: "-.08em", color: "#D89A2B" }}><em><SplitChars text={t('about.heroLine2')} /></em></span>
</h1>
<p data-hfade="1" style={{ margin: "0", maxWidth: "520px", fontSize: "18px", lineHeight: "1.65", color: "#DCCFB3", textWrap: "pretty" }}>{t('about.intro')}</p>
</div>
<div data-hclip="1" style={{ flex: "0 1 380px", minWidth: "240px", aspectRatio: "3 / 4", borderRadius: "999px 999px 0 0", overflow: "hidden", position: "relative" }}>
<div data-hclipimg="1" style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: "300%", backgroundPosition: "83% 42%" }} />
</div>
</section>
<div style={{ height: "26px", background: "radial-gradient(circle, #D89A2B 0 3px, transparent 3.5px) 0 50% / 18px 18px repeat-x, linear-gradient(#B8401F,#B8401F) 0 0 / 100% 4px no-repeat, linear-gradient(#B8401F,#B8401F) 0 100% / 100% 4px no-repeat, #1E3827" }} />
<section data-screen-label="Story" style={{ background: "#EFE3C6", color: "#1E150E", padding: "clamp(96px,13vw,190px) 4vw" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#9E3418" }}>{t('about.storyKicker')}</span>
<p data-words="1" style={{ margin: "40px 0 0", maxWidth: "1200px", fontFamily: "var(--serif)", fontSize: "clamp(32px,4.4vw,70px)", lineHeight: "1.08", letterSpacing: "-.01em" }}>
{(storyWords || []).map((w, $index) => (<React.Fragment key={$index}><span data-word="1" style={{ display: "inline-block", marginRight: ".24em" }}>{w.w}</span></React.Fragment>))}
</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "40px", marginTop: "64px", maxWidth: "900px", marginLeft: "auto" }}>
<p data-fade="1" style={{ margin: "0", flex: "1 1 300px", fontSize: "17px", lineHeight: "1.7", color: "#3B2C20", textWrap: "pretty" }}>{t('about.storyP1')}</p>
<p data-fade="1" style={{ margin: "0", flex: "1 1 300px", fontSize: "17px", lineHeight: "1.7", color: "#3B2C20", textWrap: "pretty" }}>{t('about.storyP2')}</p>
</div>
</section>
<section data-screen-label="Process" style={{ background: "#1E3827", color: "#EFE3C6", padding: "clamp(96px,13vw,190px) 4vw" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", marginBottom: "72px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('about.processKicker')}</span>
<h2 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(44px,6vw,96px)", lineHeight: "1", overflow: "hidden", paddingBottom: ".12em" }}><span data-rl="1" style={{ display: "block" }}>{rich(t('about.processTitle'), { color: "#D89A2B" })}</span></h2>
</div>
</div>
<div data-stagger="1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "4px" }}>
{(steps || []).map((s, $index) => (<React.Fragment key={$index}>
<div style={{ display: "flex", flexDirection: "column", gap: "22px", padding: "32px 28px 40px", background: "#244330", minHeight: "280px" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#D89A2B" }}>{s.n}</span>
<h3 style={{ margin: "auto 0 0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "42px", lineHeight: "1" }}>{s.t}</h3>
<p style={{ margin: "0", fontSize: "15px", lineHeight: "1.65", color: "#CFC4A8" }}>{s.d}</p>
</div>
</React.Fragment>))}
</div>
</section>
<section data-screen-label="Colours" style={{ background: "#EFE3C6", color: "#1E150E", padding: "clamp(96px,13vw,190px) 4vw" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "48px", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#9E3418" }}>{t('about.coloursKicker')}</span>
<h2 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(44px,6vw,96px)", lineHeight: "1", overflow: "hidden", paddingBottom: ".12em" }}><span data-rl="1" style={{ display: "block" }}>{rich(t('about.coloursTitle'), { color: "#9E3418" })}</span></h2>
</div>
<p data-fade="1" style={{ margin: "0", maxWidth: "380px", fontSize: "16px", lineHeight: "1.6", color: "#3B2C20" }}>{t('about.coloursIntro')}</p>
</div>
<div data-stagger="1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "16px" }}>
{COLOURS.map((c) => (
<div key={c.key} style={{ display: "flex", flexDirection: "column", gap: "14px" }}><span style={{ aspectRatio: "3 / 4", borderRadius: "999px 999px 0 0", background: c.swatch, boxShadow: c.ring ? "inset 0 0 0 1px rgba(30,21,14,.15)" : "none" }} /><span style={{ fontFamily: "var(--serif)", fontSize: "26px" }}>{t(`about.colours.${c.key}`)}</span></div>
))}
</div>
</section>
<SiteFooter />
</main>
</>
  );
}

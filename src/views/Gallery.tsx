'use client';

import React from 'react';
import { useSite } from '../lib/useSite';
import data from '../data';
import SiteFooter from '../components/SiteFooter';
import SplitChars from '../components/SplitChars';
import { useLang, useLocalized } from '../i18n/LanguageContext';

// data-gfilter / data-cat hold the English key used by the filter logic in site.js.
const FILTERS = ['All', 'Studio', 'Process', 'Workshops', 'Events'];

export default function Gallery() {
  useSite('gallery');
  const { t } = useLang();
  const items = useLocalized(data).gallery;
  return (
<>
<main id="top" style={{ background: "#17100A" }}>
<section data-screen-label="Gallery canvas" style={{ position: "relative", height: "100svh", minHeight: "640px", overflow: "hidden" }}>
<div data-gcanvas="1" data-cursor={t('cursor.drag')} style={{ position: "absolute", inset: "0", overflow: "hidden", touchAction: "pan-y", userSelect: "none" }}>
{(items || []).map((g, $index) => (<React.Fragment key={$index}>
<button data-gtile="1" data-i={g.i} data-n={g.n} data-cat={g.cat} data-catlabel={t(`gallery.cats.${g.cat}`)} data-title={g.t} data-size={g.size} data-pos={g.pos} data-oy={g.oy} data-cursor={t('cursor.open')} aria-label={t('gallery.openPhoto', { title: g.t })} style={{ position: "absolute", top: "0", left: "0", width: "280px", padding: "0", border: "0", background: "none", color: "inherit", textAlign: "left", cursor: "pointer", willChange: "transform" }}>
<span data-gtin="1" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
<span style={{ display: "block", aspectRatio: `${g.ar}`, overflow: "hidden", position: "relative", background: "#241911" }}>
<span style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: `${g.size}`, backgroundPosition: `${g.pos}`, pointerEvents: "none" }} />
</span>
<span style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "#CFC3A6" }}><span>{g.n} — {g.t}</span><span style={{ color: "#D89A2B" }}>{t(`gallery.cats.${g.cat}`)}</span></span>
</span>
</button>
</React.Fragment>))}
</div>
<div style={{ position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(to top, rgba(23,16,10,.95) 0%, rgba(23,16,10,.6) 24%, rgba(23,16,10,0) 46%), radial-gradient(ellipse at 50% 40%, rgba(23,16,10,0) 50%, rgba(23,16,10,.8) 100%)" }} />
<div style={{ position: "absolute", left: "4vw", right: "4vw", bottom: "clamp(28px,5vh,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", pointerEvents: "none" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span data-hfade="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "#D89A2B" }}>{t('gallery.kicker')}</span>
<h1 style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(72px,12vw,210px)", lineHeight: ".86", letterSpacing: "-.025em", color: "#F1E6CC", overflow: "hidden", paddingBottom: ".2em", marginBottom: "-.08em" }}>
<SplitChars text={t('gallery.title')} emStyle={{ color: "#D89A2B" }} />
</h1>
</div>
<div data-hfade="1" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px", pointerEvents: "auto" }}>
<span style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#F1E6CC", display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "7px", height: "7px", flex: "none", background: "#D89A2B", transform: "rotate(45deg)" }} />{t('gallery.hint')}</span>
<div role="group" aria-label={t('gallery.filterLabel')} style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "8px" }}>
{FILTERS.map((f, i) => (
<button key={f} data-gfilter={f} style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", padding: "10px 16px", borderRadius: "999px", border: "1px solid #F1E6CC", background: i === 0 ? "#F1E6CC" : "transparent", color: i === 0 ? "#17100A" : "#F1E6CC", cursor: "pointer", transition: "background .3s,color .3s" }}>{t(`gallery.cats.${f}`)}</button>
))}
</div>
</div>
</div>
<div data-lb="1" role="dialog" aria-modal="true" aria-label={t('gallery.viewer')} style={{ position: "fixed", inset: "0", zIndex: "350", visibility: "hidden", pointerEvents: "none", opacity: "0", background: "rgba(14,9,6,.96)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "40px 5vw", padding: "96px 5vw 48px", boxSizing: "border-box" }}>
<div data-lbframe="1" style={{ flex: "0 1 auto", height: "min(74vh,820px)", aspectRatio: "4 / 5", maxWidth: "100%", overflow: "hidden", position: "relative" }}>
<div data-lbimg="1" style={{ position: "absolute", inset: "0", backgroundImage: "url(/mural.png)", backgroundSize: "cover", backgroundPosition: "50% 50%" }} />
</div>
<div data-lbtext="1" style={{ flex: "0 1 340px", display: "flex", flexDirection: "column", gap: "18px", color: "#F1E6CC" }}>
<span data-lbidx="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", color: "#D89A2B" }}>01 / 24</span>
<h2 data-lbtitle="1" data-ml="keep" style={{ margin: "0", fontWeight: "400", fontFamily: "var(--serif)", fontSize: "clamp(36px,3.6vw,60px)", lineHeight: "1" }}>Title</h2>
<span data-lbcat="1" style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", opacity: ".8" }}>Studio</span>
<div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
<button data-lbprev="1" aria-label={t('gallery.prevPhoto')} style={{ width: "56px", height: "56px", borderRadius: "50%", border: "1px solid #F1E6CC", background: "transparent", color: "#F1E6CC", fontSize: "18px", cursor: "pointer" }}>←</button>
<button data-lbnext="1" aria-label={t('gallery.nextPhoto')} style={{ width: "56px", height: "56px", borderRadius: "50%", border: "1px solid #F1E6CC", background: "transparent", color: "#F1E6CC", fontSize: "18px", cursor: "pointer" }}>→</button>
</div>
</div>
<button data-lbclose="1" style={{ position: "absolute", top: "28px", right: "4vw", background: "none", border: "0", color: "#F1E6CC", fontFamily: "var(--mono)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", cursor: "pointer", padding: "10px 0" }}>{t('common.close')} ✕</button>
</div>
</section>
<SiteFooter />
</main>
</>
  );
}

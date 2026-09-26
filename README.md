# Sulochana Mahe — Kerala Mural Artist

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript, animated with GSAP 3 (ScrollTrigger) and Lenis smooth scroll. Requires Node.js 20.9 or later.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build in .next/ (every route is prerendered)
npm start          # serve the production build
npm run lint       # ESLint (eslint-config-next, flat config)
npm run typecheck  # tsc --noEmit
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://sulochanamahe.com`) in production so Open Graph image URLs are absolute.

Opens cleanly in Cursor / VS Code. The custom cursor only activates on devices with a fine pointer that can hover (mouse / trackpad); touch devices keep native behaviour.

## Routes

| Route | Route file → view | Links out to |
|---|---|---|
| `/` | `app/page.tsx` → `views/Home.tsx` | `/about`, `/works`, `/works/[id]`, `/services#type-NN`, `/seva`, `/contact` |
| `/about` | `app/about/page.tsx` → `views/About.tsx` | `/contact` (footer CTA) |
| `/works` | `app/works/page.tsx` → `views/Works.tsx` | `/works/[id]` |
| `/works/[id]` | `app/works/[id]/page.tsx` → `views/Work.tsx` | previous / next `/works/[id]`, `/works` |
| `/gallery` | `app/gallery/page.tsx` → `views/Gallery.tsx` | lightbox (in page) |
| `/seva` | `app/seva/page.tsx` → `views/Seva.tsx` | `/gallery`, `/contact?type=05`, YouTube |
| `/services` | `app/services/page.tsx` → `views/Services.tsx` | `/contact?type=NN` |
| `/contact` | `app/contact/page.tsx` → `views/Contact.tsx` | mailto, Instagram |
| anything else | `app/not-found.tsx` → `views/Home.tsx` (404 status) | |

Work ids: `ananthasayanam`, `narasimha`, `brahma`, `lakshmi`, `garuda`, `devotees`. They are prerendered through `generateStaticParams`; any other id returns 404.

## Structure

- `src/app/` — App Router. `layout.tsx` holds `<html>`, fonts (`next/font`), site metadata, the language provider and `SiteChrome`. Each `page.tsx` is a small Server Component that exports its metadata and renders a client view. `error.tsx` is the error boundary.
- `src/views/` — the page views (Client Components). They are not in `src/pages/`, because that folder name would turn on the Pages Router.
- `src/components/SiteChrome.tsx` — cloud loader & page transition, cursor, header, full-screen menu (persistent across routes)
- `src/components/SiteFooter.tsx` — contact CTA, marquee, footer nav
- `src/lib/site.js` — shared animation runtime; behaviour is attached through `data-*` attributes
- `src/lib/runtime.ts` — loads GSAP, ScrollTrigger, Lenis and `site.js` in the browser only (on first use), and types `window.Site`
- `src/lib/useSite.ts` — hook that starts/stops the runtime per page, prefetches `data-route` links and keeps the localized document title
- `src/lib/metadata.ts` — per-page metadata (English), built from `strings.ts`
- `src/data.ts` — works, services, gallery and Teaching & Seva content, in English and Malayalam (YouTube IDs go in `seva.youtube[].yt`, video files in `seva.videos[].src`)
- `src/i18n/` — language context, the `t()` helper (`translate.ts`, which also works on the server) and the UI strings for both languages
- `public/mural.png` — reference mural (replace with real photography)

### data-* hooks used by site.js

`data-route` (internal link → cloud transition), `data-hchar` / `data-hfade` / `data-hclip` (hero intro), `data-rl` (line reveal), `data-fade`, `data-clip`, `data-words` + `data-word` (scrubbed text), `data-parallax`, `data-stagger`, `data-hscroll` + `data-track` (pinned horizontal gallery), `data-hoverlist` + `data-row` (hover preview list), `data-mag` (magnetic), `data-mq` (marquee), `data-cursor="Label"` (cursor bubble), `data-stack` (stacking panels), `data-expand` (arch-to-full-bleed), `data-loupe` (magnifier), `data-countto` (count-up), `data-tline` (timeline progress). The Gallery drag canvas lives in `Site.pages.gallery`.

Pages that re-render their lists (Works filters/views) call `Site.current.rebuild()` (via `currentSite()` from `src/lib/runtime.ts`) to re-bind scroll effects.

## Content to replace

All work images are crops of one reference painting; titles, years, sizes, locations, bio copy, email and Instagram are placeholders. Edit `src/data.ts` and swap images in `public/`.

## Notes

- First visit plays the full cloud loader (0–100). Later navigations use a shorter clouds-close / clouds-part transition (tracked in sessionStorage).
- Internal links are plain `<a href data-route>` elements, not `<Link>`: the runtime intercepts the click, closes the clouds, then calls `router.push`.
- React Strict Mode is off (`next.config.ts`) because double-run effects would replay the cloud intro in development.
- Every route is static, so the site can also be exported as plain files: add `output: 'export'` to `next.config.ts` and deploy `out/`. The host then has to serve `404.html` for unknown paths.

## Brand

Logo files live in `public/brand/` (mark, horizontal and stacked lockups, favicon, 1024 px PNGs). See `public/brand/README.md` for usage, colours and print notes.

## Header & menu

The header scrolls away with the page. Only the round ochre menu button (`[data-menufab]`) is fixed. The clock, inline nav and CTA collapse through media queries in `src/styles.css`: at 1400 / 1240 / 680 px in English and 1600 / 1380 / 760 px in Malayalam, whose labels run longer.

## Languages (English ↔ Malayalam)

- The switch (`src/components/LanguageSwitch.tsx`) sits in the header and in the menu. It collapses to a single round button (offering the other language) below 560 px.
- `src/i18n/LanguageContext.tsx` holds the language state. It is saved in `localStorage` (`sm-lang`), can be forced with `?lang=ml` or `?lang=en`, and is mirrored on `<html lang>`. `t(key, vars)` reads UI copy from `src/i18n/strings.ts`, and `useLocalized(data)` resolves the `L('English', 'മലയാളം')` pairs in `src/data.ts`. Missing Malayalam keys fall back to English.
- The server renders English. In the browser, the stored language is applied before the first paint while the cloud loader still covers the page, and the animation runtime waits for it. This avoids a hydration mismatch and any visible flash. Server metadata (titles, descriptions) is English; `useSite` sets the localized `document.title`.
- Changing the language closes the clouds, swaps the text, re-binds the scroll effects (`Site.current.transition`) and parts the clouds again. The scroll position is kept.
- In strings, `*asterisks*` mark the accented (italic/coloured) words and `\n` marks the line break inside round buttons.
- Hero headings use `SplitChars`, which animates Latin text letter by letter and Malayalam word by word, so conjuncts are never split apart.
- Malayalam uses Noto Serif / Noto Sans Malayalam as per-glyph fallbacks (`--serif`, `--mono` and `--sans` in `styles.css`, fed by the `next/font` variables from `layout.tsx`; the Malayalam faces are not preloaded). The "Malayalam typography" block there handles line height, tracking, italics and display sizes. Mark an element `data-latin` to keep the English treatment, such as the brand wordmark.

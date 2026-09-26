'use client';

import React, { useState, useEffect } from "react";
import { useSite } from "../lib/useSite";
import data from "../data";
import SiteFooter from "../components/SiteFooter";
import SplitChars from "../components/SplitChars";
import { rich, useLang, useLocalized } from "../i18n/LanguageContext";
import { currentSite } from "../lib/runtime";

type Media = { kind: "yt" | "video"; i: number };
type MediaItem = { t: string; dur: string; size: string; pos: string; yt?: string; src?: string };

// The page's smooth scroller, paused while the video modal is open.
const lenis = () => currentSite()?.lenis;

export default function Seva() {
  useSite("seva");
  const { t } = useLang();
  const s = useLocalized(data).seva;
  const [m, setM] = useState<Media | null>(null);
  const open = (kind: Media["kind"], i: number) => {
    lenis()?.stop();
    setM({ kind, i });
  };
  const closeModal = () => {
    lenis()?.start();
    setM(null);
  };
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        lenis()?.start();
        setM(null);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const stats = s.stats.map((x) => ({
    ...x,
    fmt: x.v.toLocaleString("en-IN"),
  }));
  const { classes, photos, timeline } = s;
  const yt = s.youtube.map((v, i) => ({ ...v, open: () => open("yt", i) }));
  const ytFeatured = yt[0] || {},
    ytRest = yt.slice(1);
  const videos = s.videos.map((v, i) => ({
    ...v,
    open: () => open("video", i),
  }));
  const modalOpen = !!m;
  const item: MediaItem | null = m ? (m.kind === "yt" ? s.youtube : s.videos)[m.i] : null;
  // Until a YouTube ID (seva.youtube[].yt) or video file (seva.videos[].src) is added in src/data.ts, the modal shows a "coming soon" card.
  const modal = m && item
    ? {
        t: item.t,
        dur: item.dur,
        size: item.size,
        pos: item.pos,
        yt: m.kind === "yt" && item.yt ? item.yt : "",
        src: m.kind === "video" && item.src ? item.src : "",
        empty: m.kind === "yt" ? !item.yt : !item.src,
        ar: m.kind === "yt" ? "16 / 9" : "9 / 16",
        ratio: m.kind === "yt" ? "1.7778" : "0.5625",
      }
    : {};
  return (
    <>
      <main id="top">
        <section
          data-screen-label="Seva hero"
          style={{
            position: "relative",
            background: "#17100A",
            padding: "160px 4vw 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "40px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              <span
                data-hfade="1"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#D89A2B",
                }}
              >
                {t("seva.kicker")}
              </span>
              <h1
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(72px,13vw,240px)",
                  lineHeight: ".86",
                  letterSpacing: "-.025em",
                }}
              >
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    paddingBottom: ".2em",
                    marginBottom: "-.08em",
                  }}
                >
                  <SplitChars text={t("seva.heroLine1")} />
                </span>
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    paddingBottom: ".2em",
                    marginBottom: "-.08em",
                    paddingLeft: ".8em",
                    color: "#D89A2B",
                  }}
                >
                  <em>
                    <SplitChars text={t("seva.heroLine2")} />
                  </em>
                </span>
              </h1>
            </div>
            <p
              data-hfade="1"
              style={{
                margin: "0 0 2vw",
                maxWidth: "420px",
                fontSize: "18px",
                lineHeight: "1.65",
                color: "#DCCFB3",
                textWrap: "pretty",
              }}
            >
              {t("seva.intro")}
            </p>
          </div>
          <div
            data-hclip="1"
            style={{
              position: "relative",
              marginTop: "clamp(48px,7vw,100px)",
              height: "clamp(320px,62vh,720px)",
              overflow: "hidden",
            }}
          >
            <div data-hclipimg="1" style={{ position: "absolute", inset: "0" }}>
              <div
                data-parallax="1"
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "-10%",
                  height: "120%",
                  backgroundImage: "url(/mural.png)",
                  backgroundSize: "250%",
                  backgroundPosition: "95% 70%",
                }}
              />
            </div>
            <span
              style={{
                position: "absolute",
                left: "24px",
                bottom: "20px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#F1E6CC",
                background: "rgba(23,16,10,.7)",
                padding: "8px 12px",
              }}
            >
              {t("seva.heroCaption")}
            </span>
          </div>
        </section>
        <section
          data-screen-label="Impact"
          style={{
            background: "#EFE3C6",
            color: "#1E150E",
            padding: "clamp(88px,11vw,160px) 4vw",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "#9E3418",
            }}
          >
            {t("seva.impactKicker")}
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "0",
              marginTop: "48px",
              borderTop: "1px solid #1E150E",
            }}
          >
            {(stats || []).map((s, $index) => (
              <React.Fragment key={$index}>
                <div
                  data-fade="1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    padding: "32px 24px 32px 0",
                    borderBottom: "1px solid #1E150E",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(64px,7vw,120px)",
                      lineHeight: ".9",
                      letterSpacing: "-.02em",
                    }}
                  >
                    <span data-countto={s.v}>{s.fmt}</span>
                    <span style={{ color: "#9E3418" }}>{s.suf}</span>
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.5",
                      color: "#3B2C20",
                      maxWidth: "220px",
                    }}
                  >
                    {s.l}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
        <section
          data-screen-label="Teaching"
          style={{
            background: "#1E3827",
            color: "#EFE3C6",
            padding: "clamp(88px,11vw,160px) 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "32px",
              marginBottom: "64px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#D89A2B",
                }}
              >
                {t("seva.teacherKicker")}
              </span>
              <h2
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px,6vw,96px)",
                  lineHeight: "1",
                  overflow: "hidden",
                  paddingBottom: ".12em",
                }}
              >
                <span data-rl="1" style={{ display: "block" }}>
                  {rich(t("seva.teacherTitle"), { color: "#D89A2B" })}
                </span>
              </h2>
            </div>
            <p
              data-fade="1"
              style={{
                margin: "0",
                maxWidth: "400px",
                fontSize: "16px",
                lineHeight: "1.65",
                color: "#D9CFB4",
              }}
            >
              {t("seva.teacherBody")}
            </p>
          </div>
          <div
            data-stagger="1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "4px",
            }}
          >
            {(classes || []).map((c, $index) => (
              <React.Fragment key={$index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                    padding: "30px 28px 36px",
                    background: "#244330",
                    minHeight: "300px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      fontFamily: "var(--mono)",
                      fontSize: "11px",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span style={{ color: "#D89A2B" }}>{c.n}</span>
                    <span style={{ opacity: ".8", textAlign: "right" }}>
                      {c.who}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: "auto 0 0",
                      fontWeight: "400",
                      fontFamily: "var(--serif)",
                      fontSize: "38px",
                      lineHeight: "1",
                    }}
                  >
                    {c.t}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "15px",
                      lineHeight: "1.65",
                      color: "#CFC4A8",
                    }}
                  >
                    {c.d}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <a
            href="/contact?type=05"
            data-route="contact"
            data-fade="1"
            style={{
              display: "inline-flex",
              gap: "14px",
              alignItems: "center",
              marginTop: "48px",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              borderBottom: "1px solid #EFE3C6",
              paddingBottom: "8px",
            }}
          >
            {t("seva.joinClass")}
          </a>
        </section>
        <section
          data-screen-label="YouTube"
          style={{
            background: "#17100A",
            color: "#F1E6CC",
            padding: "clamp(88px,11vw,160px) 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#D89A2B",
                }}
              >
                {t("seva.ytKicker")}
              </span>
              <h2
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px,6vw,96px)",
                  lineHeight: "1",
                  overflow: "hidden",
                  paddingBottom: ".12em",
                }}
              >
                <span data-rl="1" style={{ display: "block" }}>
                  {rich(t("seva.ytTitle"), { color: "#D89A2B" })}
                </span>
              </h2>
            </div>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener"
              data-fade="1"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                borderBottom: "1px solid #F1E6CC",
                paddingBottom: "6px",
              }}
            >
              {t("seva.ytChannel")}
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4vw" }}>
            <button
              onClick={ytFeatured.open}
              data-cursor={t("cursor.play")}
              data-clip="1"
              style={{
                flex: "2 1 520px",
                position: "relative",
                aspectRatio: "16 / 9",
                padding: "0",
                border: "0",
                background: "#241911",
                overflow: "hidden",
                cursor: "pointer",
                textAlign: "left",
                color: "#F1E6CC",
              }}
            >
              <span
                data-clipimg="1"
                style={{
                  position: "absolute",
                  inset: "0",
                  backgroundImage: "url(/mural.png)",
                  backgroundSize: `${ytFeatured.size}`,
                  backgroundPosition: `${ytFeatured.pos}`,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: "0",
                  background:
                    "linear-gradient(to top, rgba(14,9,6,.9), rgba(14,9,6,0) 60%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "84px",
                  height: "84px",
                  margin: "-42px 0 0 -42px",
                  borderRadius: "50%",
                  background: "#B8401F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  color: "#F6ECD6",
                }}
              >
                ▶
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "28px",
                  right: "28px",
                  bottom: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "20px",
                }}
              >
                <span
                  data-mlh="1"
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(26px,2.6vw,42px)",
                    lineHeight: "1.05",
                  }}
                >
                  {ytFeatured.t}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    letterSpacing: ".1em",
                  }}
                >
                  {ytFeatured.dur}
                </span>
              </span>
            </button>
            <div
              style={{
                flex: "1 1 300px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {(ytRest || []).map((v, $index) => (
                <React.Fragment key={$index}>
                  <button
                    onClick={v.open}
                    data-cursor={t("cursor.play")}
                    style={{
                      display: "flex",
                      gap: "18px",
                      alignItems: "center",
                      padding: "18px 0",
                      border: "0",
                      borderTop: "1px solid rgba(241,230,204,.25)",
                      background: "none",
                      color: "#F1E6CC",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        flex: "none",
                        width: "150px",
                        aspectRatio: "16 / 9",
                        position: "relative",
                        backgroundImage: "url(/mural.png)",
                        backgroundSize: `${v.size}`,
                        backgroundPosition: `${v.pos}`,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: "6px",
                          bottom: "6px",
                          background: "rgba(14,9,6,.8)",
                          fontFamily: "var(--mono)",
                          fontSize: "10px",
                          padding: "3px 6px",
                        }}
                      >
                        {v.dur}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "24px",
                        lineHeight: "1.1",
                      }}
                    >
                      {v.t}
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
        <section
          data-screen-label="Videos"
          style={{
            background: "#EFE3C6",
            color: "#1E150E",
            padding: "clamp(88px,11vw,160px) 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
              margin: "0 4vw 48px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#9E3418",
                }}
              >
                {t("seva.videosKicker")}
              </span>
              <h2
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px,6vw,96px)",
                  lineHeight: "1",
                  overflow: "hidden",
                  paddingBottom: ".12em",
                }}
              >
                <span data-rl="1" style={{ display: "block" }}>
                  {rich(t("seva.videosTitle"), { color: "#9E3418" })}
                </span>
              </h2>
            </div>
            <span
              data-fade="1"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#5A4533",
              }}
            >
              {t("seva.videosNote")}
            </span>
          </div>
          <div
            data-lenis-prevent-horizontal="1"
            style={{ overflowX: "auto", padding: "0 4vw 8px" }}
          >
            <div
              data-stagger="1"
              style={{ display: "flex", gap: "20px", width: "max-content" }}
            >
              {(videos || []).map((v, $index) => (
                <React.Fragment key={$index}>
                  <button
                    onClick={v.open}
                    data-cursor={t("cursor.play")}
                    style={{
                      flex: "none",
                      width: "clamp(220px,20vw,300px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "0",
                      border: "0",
                      background: "none",
                      color: "#1E150E",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        width: "100%",
                        aspectRatio: "9 / 16",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "999px 999px 0 0",
                        background: "#DCCDAA",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          inset: "0",
                          backgroundImage: "url(/mural.png)",
                          backgroundSize: `${v.size}`,
                          backgroundPosition: `${v.pos}`,
                          transition: "transform 1s cubic-bezier(.16,1,.3,1)",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          bottom: "22px",
                          width: "56px",
                          height: "56px",
                          marginLeft: "-28px",
                          borderRadius: "50%",
                          background: "#F6ECD6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          color: "#1E150E",
                        }}
                      >
                        ▶
                      </span>
                    </span>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "22px",
                          lineHeight: "1.1",
                        }}
                      >
                        {v.t}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "11px",
                          color: "#9E3418",
                        }}
                      >
                        {v.dur}
                      </span>
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
        <section
          data-screen-label="Photos"
          style={{
            background: "#1E3827",
            color: "#EFE3C6",
            padding: "clamp(88px,11vw,160px) 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#D89A2B",
                }}
              >
                {t("seva.photosKicker")}
              </span>
              <h2
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px,6vw,96px)",
                  lineHeight: "1",
                  overflow: "hidden",
                  paddingBottom: ".12em",
                }}
              >
                <span data-rl="1" style={{ display: "block" }}>
                  {rich(t("seva.photosTitle"), { color: "#D89A2B" })}
                </span>
              </h2>
            </div>
            <a
              href="/gallery"
              data-route="gallery"
              data-fade="1"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                borderBottom: "1px solid #EFE3C6",
                paddingBottom: "6px",
              }}
            >
              {t("seva.fullGallery")}
            </a>
          </div>
          <div style={{ columns: "3 280px", columnGap: "20px" }}>
            {(photos || []).map((p, $index) => (
              <React.Fragment key={$index}>
                <figure
                  data-fade="1"
                  style={{
                    margin: "0 0 28px",
                    breakInside: "avoid",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      aspectRatio: `${p.ar}`,
                      backgroundImage: "url(/mural.png)",
                      backgroundSize: `${p.size}`,
                      backgroundPosition: `${p.pos}`,
                    }}
                  />
                  <figcaption
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.5",
                      color: "#D9CFB4",
                    }}
                  >
                    {p.t}
                  </figcaption>
                </figure>
              </React.Fragment>
            ))}
          </div>
        </section>
        <section
          data-screen-label="Contribution"
          style={{
            background: "#EFE3C6",
            color: "#1E150E",
            padding: "clamp(88px,11vw,160px) 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(40px,6vw,110px)",
            }}
          >
            <div
              style={{
                flex: "1 1 320px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                alignSelf: "flex-start",
                position: "sticky",
                top: "110px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#9E3418",
                }}
              >
                {t("seva.contribKicker")}
              </span>
              <h2
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px,5.4vw,88px)",
                  lineHeight: "1",
                  overflow: "hidden",
                  paddingBottom: ".12em",
                }}
              >
                <span data-rl="1" style={{ display: "block" }}>
                  {rich(t("seva.contribTitle"), { color: "#9E3418" })}
                </span>
              </h2>
              <p
                data-fade="1"
                style={{
                  margin: "0",
                  maxWidth: "380px",
                  fontSize: "16px",
                  lineHeight: "1.65",
                  color: "#3B2C20",
                }}
              >
                {t("seva.contribBody")}
              </p>
            </div>
            <ol
              style={{
                flex: "1.4 1 480px",
                listStyle: "none",
                margin: "0",
                padding: "0 0 0 36px",
                position: "relative",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "6px",
                  top: "8px",
                  bottom: "8px",
                  width: "1px",
                  background: "rgba(30,21,14,.2)",
                }}
              >
                <span
                  data-tline="1"
                  style={{
                    position: "absolute",
                    inset: "0",
                    background: "#9E3418",
                  }}
                />
              </span>
              {(timeline || []).map((e, $index) => (
                <React.Fragment key={$index}>
                  <li
                    data-fade="1"
                    style={{
                      position: "relative",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px 32px",
                      padding: "0 0 48px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-35px",
                        top: "14px",
                        width: "11px",
                        height: "11px",
                        background: "#9E3418",
                        transform: "rotate(45deg)",
                      }}
                    />
                    <span
                      style={{
                        flex: "0 0 110px",
                        fontFamily: "var(--serif)",
                        fontSize: "44px",
                        lineHeight: "1",
                        color: "#9E3418",
                      }}
                    >
                      {e.y}
                    </span>
                    <span
                      style={{
                        flex: "1 1 260px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "30px",
                          lineHeight: "1.1",
                        }}
                      >
                        {e.t}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.65",
                          color: "#3B2C20",
                        }}
                      >
                        {e.d}
                      </span>
                    </span>
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </div>
        </section>
        <section
          data-screen-label="Invite"
          style={{
            background: "#17100A",
            color: "#F1E6CC",
            padding: "clamp(80px,10vw,140px) 4vw",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <h2
            style={{
              margin: "0",
              fontWeight: "400",
              fontFamily: "var(--serif)",
              fontSize: "clamp(44px,6vw,100px)",
              lineHeight: "1",
              maxWidth: "900px",
              overflow: "hidden",
              paddingBottom: ".12em",
            }}
          >
            <span data-rl="1" style={{ display: "block" }}>
              {rich(t("seva.inviteTitle"), { color: "#D89A2B" })}
            </span>
          </h2>
          <a
            href="/contact?type=05"
            data-route="contact"
            data-mag="1"
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              background: "#D89A2B",
              color: "#17100A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              lineHeight: "1.6",
            }}
          >
            <span style={{ whiteSpace: "pre-line" }}>
              {t("seva.inviteButton")}
            </span>
          </a>
        </section>
        {modalOpen && (
          <>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={modal.t}
              data-vmodal="1"
              onClick={closeModal}
              style={{
                position: "fixed",
                inset: "0",
                zIndex: "350",
                background: "rgba(14,9,6,.95)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                padding: "80px 4vw 40px",
                boxSizing: "border-box",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "4vw",
                  background: "none",
                  border: "0",
                  color: "#F1E6CC",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  padding: "10px 0",
                }}
              >
                {t("common.close")} ✕
              </button>
              <div
                onClick={stop}
                style={{
                  position: "relative",
                  width: `min(100%, calc(76vh * ${modal.ratio}))`,
                  aspectRatio: `${modal.ar}`,
                  background: "#000",
                  overflow: "hidden",
                }}
              >
                {modal.yt && (
                  <>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${modal.yt}?autoplay=1&rel=0`}
                      title={modal.t}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        inset: "0",
                        width: "100%",
                        height: "100%",
                        border: "0",
                      }}
                    />
                  </>
                )}
                {modal.src && (
                  <>
                    <video
                      src={modal.src}
                      controls
                      autoPlay
                      playsInline
                      style={{
                        position: "absolute",
                        inset: "0",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </>
                )}
                {modal.empty && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: "0",
                        backgroundImage: "url(/mural.png)",
                        backgroundSize: `${modal.size}`,
                        backgroundPosition: `${modal.pos}`,
                        filter: "brightness(.45)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: "0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        textAlign: "center",
                        padding: "24px",
                        color: "#F1E6CC",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "11px",
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          color: "#D89A2B",
                        }}
                      >
                        {t("seva.soonLabel")}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "28px",
                          maxWidth: "420px",
                          lineHeight: "1.15",
                        }}
                      >
                        {t("seva.soonBody")}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "baseline",
                  color: "#F1E6CC",
                }}
              >
                <span style={{ fontFamily: "var(--serif)", fontSize: "26px" }}>
                  {modal.t}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "#D89A2B",
                  }}
                >
                  {modal.dur}
                </span>
              </div>
            </div>
          </>
        )}
        <SiteFooter />
      </main>
    </>
  );
}

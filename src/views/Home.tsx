'use client';

import React from "react";
import { useSite } from "../lib/useSite";
import data from "../data";
import SiteFooter from "../components/SiteFooter";
import { rich, useLang, useLocalized } from "../i18n/LanguageContext";

export default function Home() {
  useSite("home");
  const { t } = useLang();
  const { works, types } = useLocalized(data);
  const aboutWords = t("home.aboutStatement")
    .split(" ")
    .map((w) => ({ w }));
  return (
    <>
      <main id="top">
        <section
          data-hero="1"
          data-screen-label="Hero"
          style={{
            position: "relative",
            height: "100svh",
            minHeight: "660px",
            overflow: "hidden",
            background: "#0E0906",
          }}
        >
          <div data-lampwall="1" style={{ position: "absolute", inset: "0" }}>
            <div
              style={{
                position: "absolute",
                inset: "0",
                backgroundImage: "url(/mural.png)",
                backgroundSize: "cover",
                backgroundPosition: "40% 50%",
                filter: "brightness(.24) saturate(.5) sepia(.4)",
              }}
            />
            <div
              data-lamp-lit="1"
              style={{
                position: "absolute",
                inset: "0",
                backgroundImage: "url(/mural.png)",
                backgroundSize: "cover",
                backgroundPosition: "40% 50%",
                filter: "saturate(1.1) contrast(1.05)",
              }}
            />
          </div>
          <div
            data-lamp-glow="1"
            style={{
              position: "absolute",
              inset: "0",
              pointerEvents: "none",
              mixBlendMode: "soft-light",
              background:
                "radial-gradient(circle calc(var(--lr) * 1.4) at var(--lx) var(--ly), rgba(255,184,80,.75), transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "0",
              pointerEvents: "none",
              background:
                "linear-gradient(to top, rgba(14,9,6,.94) 0%, rgba(14,9,6,.55) 30%, rgba(14,9,6,0) 55%), linear-gradient(to bottom, rgba(14,9,6,.7) 0%, rgba(14,9,6,0) 20%)",
            }}
          />
          <div
            data-lamphint="1"
            style={{
              position: "absolute",
              left: "4vw",
              top: "124px",
              pointerEvents: "none",
            }}
          >
            <span
              data-hfade="1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#F1E6CC",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  background: "#D89A2B",
                  transform: "rotate(45deg)",
                }}
              />
              {t("home.lampHint")}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              right: "4vw",
              top: "130px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "28px",
              maxWidth: "300px",
              textAlign: "right",
            }}
          >
            <div
              data-hfade="1"
              style={{
                position: "relative",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                data-spin="1"
                viewBox="0 0 120 120"
                width="120"
                height="120"
                style={{ position: "absolute", inset: "0" }}
              >
                <defs>
                  <path
                    id="badgeCircle"
                    d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                  />
                </defs>
                <text
                  data-badge="1"
                  fontSize="10"
                  letterSpacing="3.2"
                  fill="#D89A2B"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  <textPath href="#badgeCircle">{t("home.badge")}</textPath>
                </text>
              </svg>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#B8401F",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <p
              data-hfade="1"
              style={{
                margin: "0",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px,1.8vw,26px)",
                lineHeight: "1.2",
                color: "#F1E6CC",
                textWrap: "pretty",
              }}
            >
              {t("home.lampQuote")}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              left: "4vw",
              right: "4vw",
              bottom: "clamp(40px,6vh,72px)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
            }}
          >
            <h1
              data-latin="1"
              style={{
                margin: "0",
                fontWeight: "400",
                fontFamily: "var(--serif)",
                fontSize: "clamp(76px,15vw,270px)",
                lineHeight: ".86",
                letterSpacing: "-.025em",
                color: "#F1E6CC",
              }}
            >
              <span
                data-htop="1"
                style={{
                  display: "block",
                  overflow: "hidden",
                  paddingBottom: ".2em",
                  marginBottom: "-.08em",
                }}
              >
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  S
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  u
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  l
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  o
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  c
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  h
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  a
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  n
                </span>
                <span data-hchar="1" style={{ display: "inline-block" }}>
                  a
                </span>
              </span>
              <span
                data-hbot="1"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: ".25em",
                  overflow: "hidden",
                  paddingBottom: ".2em",
                  marginBottom: "-.08em",
                  paddingLeft: ".9em",
                }}
              >
                <em style={{ display: "block", color: "#D89A2B" }}>
                  <span data-hchar="1" style={{ display: "inline-block" }}>
                    M
                  </span>
                  <span data-hchar="1" style={{ display: "inline-block" }}>
                    a
                  </span>
                  <span data-hchar="1" style={{ display: "inline-block" }}>
                    h
                  </span>
                  <span data-hchar="1" style={{ display: "inline-block" }}>
                    e
                  </span>
                </em>
              </span>
            </h1>
            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "flex-end",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "#F1E6CC",
                paddingBottom: "1.2vw",
              }}
            >
              <span data-hfade="1" style={{ lineHeight: "1.8" }}>
                {t("home.heroMeta1")}
                <br />
                {t("home.heroMeta2")}
              </span>
              <a
                href="#about"
                data-hfade="1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {t("home.scroll")}
                <span
                  style={{
                    width: "1px",
                    height: "52px",
                    background: "rgba(241,230,204,.25)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    data-scrollline="1"
                    style={{
                      position: "absolute",
                      inset: "0",
                      background: "#D89A2B",
                    }}
                  />
                </span>
              </a>
            </div>
          </div>
        </section>
        <div
          style={{
            height: "26px",
            background:
              "radial-gradient(circle, #D89A2B 0 3px, transparent 3.5px) 0 50% / 18px 18px repeat-x, linear-gradient(#B8401F,#B8401F) 0 0 / 100% 4px no-repeat, linear-gradient(#B8401F,#B8401F) 0 100% / 100% 4px no-repeat, #1E3827",
          }}
        />
        <section
          id="about"
          data-screen-label="About"
          style={{
            background: "#EFE3C6",
            color: "#1E150E",
            padding: "clamp(96px,13vw,190px) 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(48px,6vw,110px)",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flex: "1 1 520px",
                display: "flex",
                flexDirection: "column",
                gap: "48px",
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
                {t("home.aboutKicker")}
              </span>
              <p
                data-words="1"
                style={{
                  margin: "0",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(32px,4.1vw,64px)",
                  lineHeight: "1.08",
                  letterSpacing: "-.01em",
                }}
              >
                {(aboutWords || []).map((w, $index) => (
                  <React.Fragment key={$index}>
                    <span
                      data-word="1"
                      style={{ display: "inline-block", marginRight: ".24em" }}
                    >
                      {w.w}
                    </span>
                  </React.Fragment>
                ))}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "40px",
                  maxWidth: "760px",
                }}
              >
                <p
                  data-fade="1"
                  style={{
                    margin: "0",
                    flex: "1 1 280px",
                    fontSize: "17px",
                    lineHeight: "1.65",
                    color: "#3B2C20",
                    textWrap: "pretty",
                  }}
                >
                  {t("home.aboutP1")}
                </p>
                <p
                  data-fade="1"
                  style={{
                    margin: "0",
                    flex: "1 1 280px",
                    fontSize: "17px",
                    lineHeight: "1.65",
                    color: "#3B2C20",
                    textWrap: "pretty",
                  }}
                >
                  {t("home.aboutP2")}
                </p>
              </div>
              <a
                href="/about"
                data-route="about"
                data-fade="1"
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #1E150E",
                  paddingBottom: "8px",
                }}
              >
                {t("home.readStory")} <span>→</span>
              </a>
            </div>
            <figure
              style={{
                flex: "0 1 400px",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                minWidth: "260px",
              }}
            >
              <div
                data-clip="1"
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  borderRadius: "999px 999px 0 0",
                  overflow: "hidden",
                }}
              >
                <div
                  data-clipimg="1"
                  style={{ position: "absolute", inset: "0" }}
                >
                  <div
                    data-parallax="1"
                    style={{
                      position: "absolute",
                      left: "0",
                      right: "0",
                      top: "-12%",
                      height: "124%",
                      backgroundImage: "url(/mural.png)",
                      backgroundSize: "450%",
                      backgroundPosition: "27% 35%",
                    }}
                  />
                </div>
              </div>
              <figcaption
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#5A4533",
                  paddingTop: "6px",
                }}
              >
                <span>{t("home.detailCaption")}</span>
                <span>2024</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <section
          id="works"
          data-hscroll="1"
          data-screen-label="Works"
          style={{
            position: "relative",
            height: "100vh",
            minHeight: "620px",
            background: "#1E3827",
            color: "#EFE3C6",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: "110px 0 44px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
              padding: "0 4vw",
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
                {t("home.worksKicker")}
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
                  {rich(t("home.worksTitle"), { color: "#D89A2B" })}
                </span>
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                gap: "32px",
                alignItems: "center",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              <span>
                <span data-wcount="1">01</span> / 06
              </span>
              <a
                href="/works"
                data-route="works"
                style={{
                  borderBottom: "1px solid #EFE3C6",
                  paddingBottom: "6px",
                }}
              >
                {t("home.allWorks")}
              </a>
            </div>
          </div>
          <div
            data-trackvp="1"
            style={{
              flex: "1",
              display: "flex",
              alignItems: "center",
              minHeight: "0",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <div
              data-track="1"
              style={{
                display: "flex",
                gap: "4vw",
                alignItems: "flex-end",
                padding: "0 4vw",
                width: "max-content",
              }}
            >
              {(works || []).map((w, $index) => (
                <React.Fragment key={$index}>
                  <a
                    href={`/works/${w.id}`}
                    data-route="work"
                    data-cursor={t("cursor.view")}
                    style={{
                      flex: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                    }}
                  >
                    <div
                      style={{
                        height: "min(52vh,540px)",
                        aspectRatio: `${w.ar}`,
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: `${w.radius}`,
                        background: "#15291C",
                      }}
                    >
                      <div
                        data-wimg="1"
                        style={{
                          position: "absolute",
                          top: "0",
                          bottom: "0",
                          left: "-8%",
                          width: "116%",
                          backgroundImage: "url(/mural.png)",
                          backgroundSize: `${w.size}`,
                          backgroundPosition: `${w.pos}`,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "24px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--mono)",
                            fontSize: "11px",
                            color: "#D89A2B",
                          }}
                        >
                          {w.n}
                        </span>
                        <h3
                          style={{
                            margin: "0",
                            fontWeight: "400",
                            fontFamily: "var(--serif)",
                            fontSize: "clamp(24px,2.2vw,34px)",
                            lineHeight: "1",
                          }}
                        >
                          {w.t}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "11px",
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          opacity: ".8",
                          textAlign: "right",
                        }}
                      >
                        {w.m} · {w.y}
                      </span>
                    </div>
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div
            style={{
              margin: "0 4vw",
              height: "1px",
              background: "rgba(239,227,198,.2)",
            }}
          >
            <div
              data-wbar="1"
              style={{
                height: "1px",
                background: "#D89A2B",
                transform: "scaleX(0)",
                transformOrigin: "left",
              }}
            />
          </div>
        </section>
        <div
          style={{
            height: "26px",
            background:
              "radial-gradient(circle, #D89A2B 0 3px, transparent 3.5px) 0 50% / 18px 18px repeat-x, linear-gradient(#B8401F,#B8401F) 0 0 / 100% 4px no-repeat, linear-gradient(#B8401F,#B8401F) 0 100% / 100% 4px no-repeat, #1E3827",
          }}
        />
        <section
          id="types"
          data-hoverlist="1"
          data-screen-label="What she paints"
          style={{
            position: "relative",
            background: "#EFE3C6",
            color: "#1E150E",
            padding: "clamp(96px,13vw,190px) 4vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "32px",
              marginBottom: "clamp(48px,6vw,90px)",
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
                {t("home.typesKicker")}
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
                  {rich(t("home.typesTitle"), { color: "#9E3418" })}
                </span>
              </h2>
            </div>
            <p
              data-fade="1"
              style={{
                margin: "0",
                maxWidth: "360px",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#3B2C20",
              }}
            >
              {t("home.typesIntro")}
            </p>
          </div>
          <div data-rows="1">
            {(types || []).map((x, $index) => (
              <React.Fragment key={$index}>
                <a
                  href={`/services#type-${x.n}`}
                  data-route="services"
                  data-row="1"
                  data-pos={x.pos}
                  data-size={x.size}
                  data-ink="#1E150E"
                  data-hl="#9E3418"
                  data-cursor={t("cursor.explore")}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "16px 32px",
                    padding: "clamp(24px,3vw,40px) 0",
                    outlineOffset: "6px",
                  }}
                >
                  <span
                    data-rline="1"
                    style={{
                      position: "absolute",
                      left: "0",
                      right: "0",
                      top: "0",
                      height: "1px",
                      background: "#1E150E",
                    }}
                  />
                  <span
                    data-rin="1"
                    style={{
                      width: "56px",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "#9E3418",
                    }}
                  >
                    {x.n}
                  </span>
                  <h3
                    data-rin="1"
                    style={{
                      margin: "0",
                      flex: "1 1 380px",
                      fontWeight: "400",
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(34px,4.6vw,72px)",
                      lineHeight: "1",
                    }}
                  >
                    <span data-rtitle="1" style={{ display: "inline-block" }}>
                      {x.t}
                    </span>
                  </h3>
                  <p
                    data-rin="1"
                    style={{
                      margin: "0",
                      flex: "1 1 260px",
                      maxWidth: "400px",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#3B2C20",
                      textWrap: "pretty",
                    }}
                  >
                    {x.d}
                  </p>
                  <span
                    data-rin="1"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "1px solid #1E150E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                    }}
                  >
                    <span
                      data-rarrow="1"
                      style={{
                        display: "block",
                        fontSize: "20px",
                        transform: "rotate(-45deg) scale(.85)",
                      }}
                    >
                      →
                    </span>
                  </span>
                  <span
                    data-rthumb="1"
                    style={{
                      display: "none",
                      flex: "1 1 100%",
                      height: "200px",
                      backgroundImage: "url(/mural.png)",
                      backgroundSize: `${x.size}`,
                      backgroundPosition: `${x.pos}`,
                    }}
                  />
                </a>
              </React.Fragment>
            ))}
            <span
              style={{ display: "block", height: "1px", background: "#1E150E" }}
            />
          </div>
          <div
            data-float="1"
            aria-hidden="true"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "260px",
              aspectRatio: "3 / 4",
              borderRadius: "999px 999px 0 0",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: "50",
              opacity: "0",
            }}
          >
            <div
              data-floatimg="1"
              style={{
                position: "absolute",
                inset: "0",
                backgroundImage: "url(/mural.png)",
                backgroundSize: "400%",
                backgroundPosition: "50% 0%",
              }}
            />
          </div>
        </section>
        <section
          data-screen-label="Teaching teaser"
          style={{
            background: "#17100A",
            color: "#F1E6CC",
            padding: "clamp(88px,11vw,160px) 4vw",
          }}
        >
          <a
            href="/seva"
            data-route="seva"
            data-cursor={t("cursor.explore")}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "40px 5vw",
            }}
          >
            <div
              data-clip="1"
              style={{
                flex: "0 1 360px",
                minWidth: "220px",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                position: "relative",
                borderRadius: "999px 999px 0 0",
              }}
            >
              <div
                data-clipimg="1"
                style={{
                  position: "absolute",
                  inset: "0",
                  backgroundImage: "url(/mural.png)",
                  backgroundSize: "500%",
                  backgroundPosition: "0% 72%",
                }}
              />
            </div>
            <div
              style={{
                flex: "1 1 420px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
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
                {t("home.teachKicker")}
              </span>
              <h2
                style={{
                  margin: "0",
                  fontWeight: "400",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(40px,5.4vw,90px)",
                  lineHeight: "1.02",
                  textWrap: "balance",
                }}
              >
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    paddingBottom: ".12em",
                  }}
                >
                  <span data-rl="1" style={{ display: "block" }}>
                    {rich(t("home.teachLine1"), { color: "#D89A2B" })}
                  </span>
                </span>
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    paddingBottom: ".12em",
                  }}
                >
                  <span data-rl="1" style={{ display: "block" }}>
                    {rich(t("home.teachLine2"), { color: "#D89A2B" })}
                  </span>
                </span>
              </h2>
              <p
                data-fade="1"
                style={{
                  margin: "0",
                  maxWidth: "480px",
                  fontSize: "17px",
                  lineHeight: "1.65",
                  color: "#DCCFB3",
                  textWrap: "pretty",
                }}
              >
                {t("home.teachBody")}
              </p>
              <span
                data-fade="1"
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #F1E6CC",
                  paddingBottom: "8px",
                }}
              >
                {t("nav.seva")} →
              </span>
            </div>
          </a>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}

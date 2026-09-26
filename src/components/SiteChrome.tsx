'use client';

import React from "react";
import { rich, useLang } from "../i18n/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

const ARCH_PATH =
  "M10 150V60A50 50 0 0 1 110 60V150Z M20 140V60A40 40 0 0 1 100 60V140H97V60A37 37 0 0 0 23 60V140Z M60 36C66 56 78 70 78 90A18 18 0 0 1 42 90C42 70 54 56 60 36Z M60 66C63 76 69 82 69 92A9 9 0 0 1 51 92C51 82 57 76 60 66Z M60 116L67 124L60 132L53 124Z";

// Overlay menu links with the mural crop shown in the preview arch.
const MENU_NAV = [
  { route: "home", href: "/", size: "cover", pos: "34% 50%" },
  { route: "about", href: "/about", size: "450%", pos: "27% 35%" },
  { route: "works", href: "/works", size: "400%", pos: "47% 0%" },
  { route: "gallery", href: "/gallery", size: "600%", pos: "72% 22%" },
  { route: "seva", href: "/seva", size: "500%", pos: "0% 72%", rich: true },
  { route: "services", href: "/services", size: "800%", pos: "98% 1%" },
  { route: "contact", href: "/contact", size: "450%", pos: "100% 85%" },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

function KeralaClock() {
  const { t } = useLang();
  return (
    <>
      {t("common.kerala")}{" "}
      <span data-clock="1" style={{ color: "#F1E6CC" }}>
        --:--
      </span>{" "}
      IST
    </>
  );
}

// Persistent chrome: cloud loader/transition, cursor, header, overlay menu.
export default function SiteChrome() {
  const { t } = useLang();
  return (
    <>
      <div
        data-clouds="1"
        style={{
          position: "fixed",
          inset: "0",
          zIndex: "400",
          overflow: "hidden",
        }}
      >
        <div
          data-sky="1"
          style={{
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(ellipse at 50% 55%, #FDF6E6 0%, #F3DFB4 42%, #E2B066 78%, #C98A3A 100%)",
          }}
        />
        <div data-puffs="1" style={{ position: "absolute", inset: "0" }} />
        <div
          data-loadui="1"
          style={{
            position: "absolute",
            inset: "0",
            opacity: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "26px",
            textAlign: "center",
            color: "#2A1A0E",
            padding: "0 6vw",
          }}
        >
          <svg
            data-loadmeta="1"
            viewBox="0 0 120 150"
            width="44"
            height="55"
            aria-hidden="true"
            style={{ color: "#9E3418" }}
          >
            <path fill="currentColor" fillRule="evenodd" d={ARCH_PATH} />
          </svg>
          <span
            data-loadname="1"
            data-latin="1"
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(56px,10vw,170px)",
              lineHeight: ".9",
              letterSpacing: "-.01em",
            }}
          >
            Sulochana <em style={{ color: "#9E3418" }}>Mahe</em>
          </span>
          <span
            data-loadmeta="1"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              display: "flex",
              gap: "14px",
              alignItems: "center",
            }}
          >
            {t("chrome.loading")}{" "}
            <span
              style={{ width: "28px", height: "1px", background: "#2A1A0E" }}
            />{" "}
            <span
              data-loadcount="1"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              000
            </span>
          </span>
        </div>
      </div>
      <div
        data-cur="1"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "0",
          height: "0",
          zIndex: "2147483000",
          pointerEvents: "none",
          mixBlendMode: "difference",
          opacity: "0",
        }}
      >
        <div
          data-curdot="1"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#F1E6CC",
          }}
        />
        <div
          data-curring="1"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "1.5px solid #F1E6CC",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div
        data-curbub="1"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          background: "#D89A2B",
          zIndex: "2147483000",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: "0",
        }}
      >
        <span
          data-curlabel="1"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#17100A",
          }}
        />
      </div>
      <header
        data-nav="1"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "100",
          color: "#F1E6CC",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            height: "12px",
            background:
              "radial-gradient(circle, #D89A2B 0 2px, transparent 2.5px) 0 50% / 12px 12px repeat-x, linear-gradient(#B8401F,#B8401F) 0 0 / 100% 2px no-repeat, linear-gradient(#B8401F,#B8401F) 0 100% / 100% 2px no-repeat",
          }}
        />
        <div
          data-hrow="1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "20px calc(4vw + 84px) 20px 4vw",
            borderBottom: "1px solid rgba(241,230,204,.14)",
          }}
        >
          <a
            href="/"
            data-route="home"
            aria-label={t("chrome.homeLabel")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flex: "none",
            }}
          >
            <svg
              viewBox="0 0 120 150"
              width="34"
              height="43"
              aria-hidden="true"
              style={{ color: "#D89A2B", flex: "none" }}
            >
              <path fill="currentColor" fillRule="evenodd" d={ARCH_PATH} />
            </svg>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <span
                data-hname="1"
                data-latin="1"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "25px",
                  lineHeight: "1",
                  whiteSpace: "nowrap",
                }}
              >
                Sulochana <em style={{ color: "#D89A2B" }}>Mahe</em>
              </span>
              <span
                data-htag="1"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "9.5px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#CFC3A6",
                  whiteSpace: "nowrap",
                }}
              >
                {t("chrome.tagline")}
              </span>
            </span>
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              flex: "none",
            }}
          >
            <span
              data-hclock="1"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10.5px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "#CFC3A6",
                whiteSpace: "nowrap",
              }}
            >
              <KeralaClock />
            </span>
            <LanguageSwitch variant="header" />
            <a
              href="/contact"
              data-route="contact"
              data-hcta="1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                border: "1px solid rgba(241,230,204,.55)",
                borderRadius: "999px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                transition: "background .35s,color .35s,border-color .35s",
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
              {t("chrome.commission")}
            </a>
          </div>
        </div>
      </header>
      <button
        data-menubtn="1"
        data-menufab="1"
        aria-label={t("chrome.menu")}
        aria-expanded="false"
        style={{
          position: "fixed",
          top: "26px",
          right: "4vw",
          zIndex: "120",
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          border: "0",
          padding: "0",
          background: "#D89A2B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          cursor: "pointer",
          boxShadow: "0 12px 32px rgba(14,9,6,.35)",
        }}
      >
        <span
          data-bar1="1"
          style={{
            width: "24px",
            height: "1.5px",
            background: "#17100A",
            display: "block",
          }}
        />
        <span
          data-bar2="1"
          style={{
            width: "24px",
            height: "1.5px",
            background: "#17100A",
            display: "block",
          }}
        />
      </button>
      <div
        data-menu="1"
        style={{
          position: "fixed",
          inset: "0",
          zIndex: "110",
          visibility: "hidden",
        }}
      >
        <div
          data-mpanel="1"
          style={{
            position: "absolute",
            inset: "0",
            background: "#B8401F",
            transform: "scaleY(0)",
          }}
        />
        <div
          data-mpanel="1"
          style={{
            position: "absolute",
            inset: "0",
            background: "#D89A2B",
            transform: "scaleY(0)",
          }}
        />
        <div
          data-mpanel="1"
          style={{
            position: "absolute",
            inset: "0",
            background: "#17100A",
            transform: "scaleY(0)",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "34px 4vw 32px",
            boxSizing: "border-box",
            color: "#F1E6CC",
          }}
        >
          <div
            data-mfade="1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              paddingRight: "84px",
              minHeight: "46px",
            }}
          >
            <svg
              viewBox="0 0 120 150"
              width="30"
              height="38"
              aria-hidden="true"
              style={{ color: "#D89A2B", flex: "none" }}
            >
              <path fill="currentColor" fillRule="evenodd" d={ARCH_PATH} />
            </svg>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#CFC3A6",
              }}
            >
              {t("chrome.menu")}
              <span data-mhint="1"> — {t("chrome.menuHint")}</span>
            </span>
            <LanguageSwitch variant="menu" style={{ marginLeft: "auto" }} />
          </div>
          <div
            style={{ flex: "1", display: "flex", gap: "4vw", minHeight: "0" }}
          >
            <nav
              style={{
                flex: "1 1 60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {MENU_NAV.map((item, i) => (
                <a
                  key={item.route}
                  href={item.href}
                  data-route={item.route}
                  data-mitem="1"
                  data-size={item.size}
                  data-pos={item.pos}
                  style={{
                    display: "block",
                    overflow: "hidden",
                    padding: ".04em 0",
                  }}
                >
                  <span
                    data-mlink="1"
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "22px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "12px",
                        letterSpacing: ".14em",
                        color: "#D89A2B",
                      }}
                    >
                      {num(i)}
                    </span>
                    <span
                      data-mtext="1"
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "clamp(38px,min(7vw,9vh),120px)",
                        lineHeight: "1",
                      }}
                    >
                      {item.rich
                        ? rich(t("nav.sevaRich"))
                        : t(`nav.${item.route}`)}
                    </span>
                    <span
                      data-mcur="1"
                      style={{
                        width: "10px",
                        height: "10px",
                        background: "#D89A2B",
                        transform: "rotate(45deg)",
                        opacity: "0",
                        alignSelf: "center",
                        flex: "none",
                      }}
                    />
                  </span>
                </a>
              ))}
            </nav>
            <div
              style={{
                flex: "0 1 34%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "32px",
              }}
            >
              <div
                data-mprev="1"
                style={{
                  width: "min(24vw,330px)",
                  aspectRatio: "3 / 4",
                  borderRadius: "999px 999px 0 0",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  data-mprevimg="1"
                  style={{
                    position: "absolute",
                    inset: "0",
                    backgroundImage: "url(/mural.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "34% 50%",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "20px",
              borderTop: "1px solid rgba(241,230,204,.18)",
              paddingTop: "20px",
              fontSize: "14px",
            }}
          >
            <a
              data-mfade="1"
              href="mailto:hello@sulochanamahe.com"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "26px",
              }}
            >
              hello@sulochanamahe.com
            </a>
            <div
              data-mfade="1"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px 28px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              <a href="https://instagram.com/" target="_blank" rel="noopener">
                Instagram ↗
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener">
                YouTube ↗
              </a>
              <span style={{ color: "#CFC3A6" }}>
                <KeralaClock />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import React from "react";
import { rich, useLang } from "../i18n/LanguageContext";

const PAGES = [
  { route: "home", href: "/" },
  { route: "about", href: "/about" },
  { route: "works", href: "/works" },
  { route: "gallery", href: "/gallery" },
  { route: "seva", href: "/seva" },
  { route: "services", href: "/services" },
  { route: "contact", href: "/contact" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
];

const columnLabel: React.CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: "11px",
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "#D89A2B",
  marginBottom: "6px",
};

// Giant wordmark, split letter by letter for the rise-in animation.
const Letters = ({ word }: { word: string }) =>
  word.split("").map((c: string, i: number) => (
    <span key={i} data-fchar="1" style={{ display: "inline-block" }}>
      {c}
    </span>
  ));

export default function SiteFooter({ hideCta = false }: { hideCta?: boolean }) {
  const { t } = useLang();
  const showCta = !hideCta;
  return (
    <>
      {showCta && (
        <>
          <section
            data-screen-label="Contact CTA"
            style={{
              position: "relative",
              background: "#A8391C",
              color: "#F6ECD6",
              padding: "clamp(96px,13vw,190px) 4vw 72px",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              {t("footer.kicker")}
            </span>
            <h2
              data-ml="xl"
              style={{
                margin: "28px 0 0",
                fontWeight: "400",
                fontFamily: "var(--serif)",
                fontSize: "clamp(56px,10.5vw,190px)",
                lineHeight: ".9",
                letterSpacing: "-.02em",
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
                  {rich(t("footer.ctaLine1"))}
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
                  {rich(t("footer.ctaLine2"))}
                </span>
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "48px",
                marginTop: "clamp(56px,7vw,110px)",
              }}
            >
              <p
                style={{
                  margin: "0",
                  maxWidth: "440px",
                  fontSize: "17px",
                  lineHeight: "1.65",
                }}
              >
                {t("footer.ctaBody")}
              </p>
              <a
                href="/contact"
                data-route="contact"
                data-mag="1"
                style={{
                  width: "180px",
                  height: "180px",
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
                  {t("footer.ctaButton")}
                </span>
              </a>
            </div>
          </section>
        </>
      )}
      <footer
        data-footer="1"
        style={{
          position: "relative",
          background: "#17100A",
          color: "#F1E6CC",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            height: "26px",
            background:
              "radial-gradient(circle, #D89A2B 0 3px, transparent 3.5px) 0 50% / 18px 18px repeat-x, linear-gradient(#B8401F,#B8401F) 0 0 / 100% 4px no-repeat, linear-gradient(#B8401F,#B8401F) 0 100% / 100% 4px no-repeat, #1E3827",
          }}
        />
        <div
          data-footpar="1"
          style={{ padding: "clamp(72px,9vw,130px) 4vw 0" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "56px 4vw",
            }}
          >
            <div
              style={{
                flex: "1 1 340px",
                maxWidth: "500px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              <svg
                viewBox="0 0 120 150"
                width="64"
                height="80"
                aria-hidden="true"
                style={{ color: "#D89A2B" }}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 150V60A50 50 0 0 1 110 60V150Z M20 140V60A40 40 0 0 1 100 60V140H97V60A37 37 0 0 0 23 60V140Z M60 36C66 56 78 70 78 90A18 18 0 0 1 42 90C42 70 54 56 60 36Z M60 66C63 76 69 82 69 92A9 9 0 0 1 51 92C51 82 57 76 60 66Z M60 116L67 124L60 132L53 124Z"
                />
              </svg>
              <p
                data-mlh="1"
                style={{
                  margin: "0",
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(30px,3vw,46px)",
                  lineHeight: "1.1",
                  textWrap: "pretty",
                }}
              >
                {t("footer.tagline")}
              </p>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#CFC3A6",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    flex: "none",
                    borderRadius: "50%",
                    background: "#7FB069",
                    boxShadow: "0 0 0 4px rgba(127,176,105,.18)",
                  }}
                />
                {t("footer.status")}
              </span>
            </div>
            <div
              style={{
                flex: "2 1 520px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
                gap: "40px 32px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <span style={columnLabel}>{t("footer.pages")}</span>
                {PAGES.map((p) => (
                  <a
                    key={p.route}
                    href={p.href}
                    data-route={p.route}
                    data-roll="1"
                    data-rollbox="1"
                    style={{
                      display: "block",
                      overflow: "hidden",
                      height: "1.35em",
                      lineHeight: "1.35em",
                      fontSize: "16px",
                    }}
                  >
                    <span
                      data-rollin="1"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span>{t(`nav.${p.route}`)}</span>
                      <span aria-hidden="true" style={{ color: "#D89A2B" }}>
                        {t(`nav.${p.route}`)}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <span style={columnLabel}>{t("footer.studio")}</span>
                <span style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  {t("common.keralaIndia")}
                </span>
                <a
                  href="mailto:hello@sulochanamahe.com"
                  style={{ fontSize: "16px" }}
                >
                  hello@sulochanamahe.com
                </a>
                <span style={{ fontSize: "16px", color: "#CFC3A6" }}>
                  {t("footer.localTime")}{" "}
                  <span data-clock="1" style={{ color: "#F1E6CC" }}>
                    --:--
                  </span>{" "}
                  IST
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <span style={columnLabel}>{t("footer.follow")}</span>
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    style={{ fontSize: "16px" }}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            data-fword="1"
            data-latin="1"
            role="img"
            aria-label="Sulochana Mahe"
            style={{
              marginTop: "clamp(72px,9vw,140px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "2vw",
              fontFamily: "var(--serif)",
              fontSize: "17.4vw",
              lineHeight: ".82",
              letterSpacing: "-.035em",
              whiteSpace: "nowrap",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "block",
                overflow: "hidden",
                paddingBottom: ".14em",
              }}
            >
              <Letters word="Sulochana" />
            </span>
            <em
              aria-hidden="true"
              style={{
                display: "block",
                overflow: "hidden",
                paddingBottom: ".14em",
                color: "#D89A2B",
              }}
            >
              <Letters word="Mahe" />
            </em>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            margin: "0 4vw",
            padding: "24px 0 30px",
            borderTop: "1px solid rgba(241,230,204,.16)",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#CFC3A6",
          }}
        >
          <span>{t("footer.copyright")}</span>
          <span>{t("footer.craft")}</span>
          <a
            href="#top"
            data-mag="1"
            aria-label={t("footer.backToTop")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#F1E6CC",
            }}
          >
            <span>{t("footer.backToTop")}</span>
            <span
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(241,230,204,.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              ↑
            </span>
          </a>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Container from "./Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const LINE_STRONG = "oklch(0.78 0.005 75)";

// Названия девелоперов — proper nouns, остаются в исходном написании.
const FT_DEVELOPERS = [
  "EMAAR", "MERAAS", "DAMAC", "SOBHA", "NAKHEEL",
  "ELLINGTON", "OMNIYAT", "BINGHATTI", "DANUBE", "OBJECT 1",
  "IMTIAZ", "BEYOND", "REPORTAGE", "MAJID AL FUTTAIM",
];

// Districts тоже proper nouns — берём ключи группы из переводов, а сами
// названия районов оставляем как есть (Dubai Marina и т.д.).
function buildDistricts(tFooter) {
  return {
    [tFooter("districts.topGroup")]: [
      "Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Dubai Creek Harbour", "Business Bay", "Dubai Islands",
    ],
    [tFooter("districts.residentialGroup")]: ["JVC", "JLT", "Town Square", "MBR City", "Dubailand"],
    [tFooter("districts.exclusiveGroup")]: ["Sobha Hartland", "Siniya Island", "Mina Al Arab", "Saadiyat Island"],
  };
}

function FooterCol({ title, children }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--sand-deep)",
          marginBottom: 18,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span aria-hidden style={{ display: "inline-block", width: 18, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {children}
      </div>
    </div>
  );
}

function FooterLink({ children }) {
  return (
    <a
      href="#"
      style={{
        fontSize: 13.5,
        color: "var(--ink-2)",
        textDecoration: "none",
        letterSpacing: "-0.005em",
        transition: "color .18s, transform .18s",
        display: "inline-block",
        width: "fit-content",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--ink)";
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--ink-2)";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {children}
    </a>
  );
}

const SOCIALS = [
  {
    href: "https://instagram.com/shangroup",
    label: "Instagram",
    hover: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1.4c2.1 0 2.4 0 3.2.1.8 0 1.2.2 1.5.3.4.1.6.3.9.6.3.3.5.6.6.9.1.3.2.7.3 1.5 0 .8.1 1.1.1 3.2s0 2.4-.1 3.2c0 .8-.2 1.2-.3 1.5-.1.4-.3.6-.6.9-.3.3-.6.5-.9.6-.3.1-.7.2-1.5.3-.8 0-1.1.1-3.2.1s-2.4 0-3.2-.1c-.8 0-1.2-.2-1.5-.3-.4-.1-.6-.3-.9-.6-.3-.3-.5-.6-.6-.9-.1-.3-.2-.7-.3-1.5 0-.8-.1-1.1-.1-3.2s0-2.4.1-3.2c0-.8.2-1.2.3-1.5.1-.4.3-.6.6-.9.3-.3.6-.5.9-.6.3-.1.7-.2 1.5-.3.8 0 1.1-.1 3.2-.1ZM8 0C5.8 0 5.6 0 4.7.1c-.9 0-1.5.2-2 .4-.5.2-1 .5-1.4.9-.4.4-.7.9-.9 1.4-.2.5-.3 1.1-.4 2C0 5.6 0 5.8 0 8s0 2.4.1 3.3c0 .9.2 1.5.4 2 .2.5.5 1 .9 1.4.4.4.9.7 1.4.9.5.2 1.1.3 2 .4.9 0 1.1.1 3.3.1s2.4 0 3.3-.1c.9 0 1.5-.2 2-.4.5-.2 1-.5 1.4-.9.4-.4.7-.9.9-1.4.2-.5.3-1.1.4-2 0-.9.1-1.1.1-3.3s0-2.4-.1-3.3c0-.9-.2-1.5-.4-2-.2-.5-.5-1-.9-1.4-.4-.4-.9-.7-1.4-.9-.5-.2-1.1-.3-2-.4C10.4 0 10.2 0 8 0Zm0 3.9a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm4.3-7c-.5 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.5-1-1-1Z" />
      </svg>
    ),
  },
  {
    href: "https://t.me/shangroup_invest",
    label: "Telegram",
    hover: "oklch(0.65 0.18 240)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M14.6 2.2 1.7 7.1c-.9.3-.9.8-.2 1l3.3 1 1.3 4c.2.4.3.6.6.6.4 0 .5-.2.7-.4l1.6-1.5 3.3 2.4c.6.3 1 .2 1.2-.6L15.3 3c.2-1-.2-1.4-.7-.8Zm-3 3.4-6.2 5.6-.2 2.6L4 9.4l7.6-4.7c.3-.2.6 0 .4.2Z" />
      </svg>
    ),
  },
  {
    href: "https://wa.me/971426188388",
    label: "WhatsApp",
    hover: "oklch(0.55 0.16 145)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.7 9.6c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.7-.1.1-.2.1-.4 0-1-.5-1.7-.9-2.3-2-.2-.3.2-.3.5-.9.1-.1 0-.2 0-.3 0-.1-.4-1-.6-1.3-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.3.1-.5.3s-.7.7-.7 1.7 1 2 1.1 2.1c.1.1 1.4 2.1 3.3 2.9 1.7.7 2 .5 2.4.5.4 0 1.1-.5 1.3-.9.2-.5.2-.8.1-.9-.1-.1-.2-.1-.4-.2ZM8 1.4c-3.6 0-6.6 3-6.6 6.6 0 1.2.3 2.3.9 3.3l-.9 3.3 3.4-.9c1 .5 2.1.8 3.2.8 3.6 0 6.6-3 6.6-6.6S11.6 1.4 8 1.4Z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@shangroup",
    label: "YouTube",
    hover: "oklch(0.6 0.22 25)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M14.7 4.5c-.2-.6-.7-1.1-1.3-1.3C12.2 3 8 3 8 3s-4.2 0-5.4.2c-.6.2-1.1.7-1.3 1.3C1 5.7 1 8 1 8s0 2.3.3 3.5c.2.6.7 1.1 1.3 1.3C3.8 13 8 13 8 13s4.2 0 5.4-.2c.6-.2 1.1-.7 1.3-1.3.3-1.2.3-3.5.3-3.5s0-2.3-.3-3.5ZM6.5 10.4V5.6L10.6 8l-4.1 2.4Z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/shangroup",
    label: "LinkedIn",
    hover: "oklch(0.42 0.13 245)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.6 0H1.4C.6 0 0 .6 0 1.4v13.2C0 15.4.6 16 1.4 16h12.2c.8 0 1.4-.6 1.4-1.4V1.4C15 .6 14.4 0 13.6 0ZM4.5 13.5h-2v-7h2v7Zm-1-8c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2Zm9 8h-2V10c0-.8 0-1.9-1.2-1.9s-1.3.9-1.3 1.8v3.6h-2v-7h1.9v1c.3-.5.9-1 1.9-1 2 0 2.4 1.3 2.4 3.1v3.9h.3Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const isMobile = useIsMobile();
  const tFooter = useTranslations("Footer");
  const tCommon = useTranslations("Common");
  const FT_REAL_ESTATE = tFooter.raw("realEstate");
  const FT_INFO = tFooter.raw("info");
  const FT_DISTRICTS = buildDistricts(tFooter);

  return (
    <Container>
      <footer
        style={{
          marginTop: isMobile ? 70 : 110,
          paddingTop: isMobile ? 40 : 70,
          paddingBottom: isMobile ? 28 : 40,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            borderRadius: 26,
            overflow: "hidden",
            position: "relative",
            background: "var(--surface-warm)",
            padding: isMobile ? "32px 24px" : "44px 52px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
            gap: isMobile ? 28 : 40,
            alignItems: "center",
            marginBottom: isMobile ? 50 : 70,
            boxShadow: NEU_RAISED,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 280,
              height: 280,
              borderRadius: 999,
              background:
                "radial-gradient(circle, oklch(0.86 0.13 88 / .25) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--sand-deep)",
                marginBottom: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span aria-hidden style={{ display: "inline-block", width: 18, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
              {tFooter("ctaCard.kicker")}
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile
                  ? "clamp(26px, 7vw, 34px)"
                  : "clamp(32px, 3.4vw, 44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.012em",
                color: "var(--ink)",
                textWrap: "balance",
              }}
            >
              {tFooter("ctaCard.titleA")}{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
                {tFooter("ctaCard.titleB")}
              </span>
            </h3>
            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", alignItems: "center" }}>
              <PrimaryButton size="lg" trailingArrow>
                {tCommon("actions.leaveRequest")}
              </PrimaryButton>
              <a
                href="https://wa.me/971426188388"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0 22px",
                  height: 56,
                  borderRadius: 999,
                  background: "transparent",
                  color: "var(--ink)",
                  border: `1px solid ${LINE_STRONG}`,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "background .18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(10,10,11,.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="oklch(0.55 0.16 145)">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.7-1.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.6.8.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.2-.6-.4ZM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div
            style={{
              background: "var(--bg)",
              borderRadius: 18,
              padding: 18,
              display: "flex",
              alignItems: "center",
              gap: 16,
              position: "relative",
              zIndex: 2,
              boxShadow: NEU_FLAT,
            }}
          >
            <img
              src="/agent_muhammad.png"
              alt={tFooter("ctaCard.agentName")}
              width={60}
              height={60}
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                flexShrink: 0,
                objectFit: "cover",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.4)",
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}
              >
                {tFooter("ctaCard.agentLabel")}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 19,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                {tFooter("ctaCard.agentName")}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 3 }}>
                {tFooter("ctaCard.agentResponse")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 6,
                  fontSize: 11,
                  color: "oklch(0.5 0.13 145)",
                  fontWeight: 600,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 99, background: "oklch(0.55 0.16 145)" }} />
                {tFooter("ctaCard.online")}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1.05fr 1fr 1.15fr 0.85fr",
            gap: isMobile ? 32 : 50,
            marginBottom: isMobile ? 40 : 56,
          }}
        >
          <FooterCol title={tFooter("columns.realEstate")}>
            {FT_REAL_ESTATE.map((t) => (
              <FooterLink key={t}>{t}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={tFooter("columns.developers")}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "9px 14px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {FT_DEVELOPERS.map((d) => (
                <a
                  key={d}
                  href="#"
                  style={{
                    fontSize: 11.5,
                    color: "var(--ink-2)",
                    textDecoration: "none",
                    letterSpacing: ".06em",
                    fontWeight: 500,
                    transition: "color .18s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-2)")}
                >
                  {d}
                </a>
              ))}
            </div>
          </FooterCol>

          <FooterCol title={tFooter("columns.districts")}>
            {Object.entries(FT_DISTRICTS).map(([group, items], gi) => (
              <div key={group} style={{ marginTop: gi > 0 ? 12 : 0 }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--sand-deep)",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  {group}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map((d) => (
                    <FooterLink key={d}>{d}</FooterLink>
                  ))}
                </div>
              </div>
            ))}
          </FooterCol>

          <FooterCol title={tFooter("columns.info")}>
            {FT_INFO.map((t) => (
              <FooterLink key={t}>{t}</FooterLink>
            ))}
          </FooterCol>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
            gap: isMobile ? 18 : 32,
            alignItems: "center",
            padding: isMobile ? "20px 0" : "24px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: isMobile ? 24 : 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--bg-2)",
                display: "grid",
                placeItems: "center",
                color: "var(--sand-deep)",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M8 14s5-4.5 5-8.5A5 5 0 0 0 3 5.5C3 9.5 8 14 8 14Z" />
                <circle cx="8" cy="6" r="2" />
              </svg>
            </span>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                }}
              >
                {tFooter("contact.officeLabel")}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, marginTop: 2 }}>
                {tFooter("contact.officeAddress")}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: isMobile ? "flex-start" : "center",
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--bg-2)",
                display: "grid",
                placeItems: "center",
                color: "var(--sand-deep)",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M3 4c0 5 4 9 9 9l1.5-1.5-2.5-1-1 1c-1.8-.8-3.4-2.4-4.2-4.2l1-1-1-2.5L4 4Z" />
              </svg>
            </span>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                }}
              >
                {tFooter("contact.supportLabel")}
              </div>
              <a
                href="tel:+97142618838"
                style={{
                  fontSize: 16,
                  color: "var(--ink)",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "-0.01em",
                  display: "block",
                  marginTop: 2,
                }}
              >
                +971&nbsp;4&nbsp;261&nbsp;8838
              </a>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: isMobile ? "flex-start" : "flex-end",
            }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "var(--bg-2)",
                  color: "var(--ink-2)",
                  display: "grid",
                  placeItems: "center",
                  textDecoration: "none",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = s.hover;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-2)";
                  e.currentTarget.style.color = "var(--ink-2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
            gap: isMobile ? 16 : 24,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <style>{`[data-theme="dark"] .footer-brand-logo { filter: invert(1) brightness(1.05); }`}</style>
            <a href="/" aria-label="ShanGroup" style={{ display: "inline-flex", alignItems: "center" }}>
              <img
                src={isMobile ? "/logoSH_01_mobile.svg" : "/Logo_01.svg"}
                alt="ShanGroup"
                className="footer-brand-logo"
                style={{ height: isMobile ? 32 : 28, width: "auto", display: "block" }}
              />
            </a>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                borderRadius: 6,
                background: "var(--bg-2)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--ink-2)",
                letterSpacing: ".08em",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 1 L12 4 V8 C12 10.5 10 12.5 7 13 C4 12.5 2 10.5 2 8 V4 Z" />
              </svg>
              RERA #2087
            </span>
          </div>

          <div
            style={{
              fontSize: 11.5,
              color: "var(--muted)",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".06em",
              textAlign: isMobile ? "left" : "center",
            }}
          >
            {tFooter("bottom.copyright")}{" "}
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
              }}
            >
              {tFooter("bottom.ru")}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 11.5,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            <a
              href="#"
              style={{ color: "var(--muted)", textDecoration: "none", transition: "color .18s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {tFooter("bottom.policy")}
            </a>
            <a
              href="#"
              style={{ color: "var(--muted)", textDecoration: "none", transition: "color .18s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {tFooter("bottom.agreement")}
            </a>
          </div>
        </div>
      </footer>
    </Container>
  );
}

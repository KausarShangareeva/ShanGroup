"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

export default function Projects() {
  const isMobile = useIsMobile();
  const t = useTranslations("FlipPage.projects");
  const items = t.raw("items");
  const launchLabel = t("launchLabel");
  const handoverLabel = t("handoverLabel");
  const fromLabel = t("fromLabel");
  const detailsCta = t("detailsCta");
  const footnote = t("footnote");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 60 : 100,
          paddingBottom: isMobile ? 40 : 70,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
          maxWidth={720}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 16,
          }}
        >
          {items.map((p, i) => (
            <article
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                padding: isMobile ? 20 : 26,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: NEU_RAISED_SM,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--sand-deep)",
                      fontWeight: 700,
                    }}
                  >
                    {p.dev}
                  </div>
                  <h3
                    style={{
                      margin: "4px 0 0",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      fontSize: 21,
                      color: "var(--ink)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--muted)",
                      marginTop: 6,
                    }}
                  >
                    {p.tag}
                  </div>
                </div>
                <div
                  style={{
                    padding: "5px 11px",
                    borderRadius: 999,
                    background:
                      "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                    color: "#3a2d10",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".06em",
                    flexShrink: 0,
                  }}
                >
                  {p.upside}
                </div>
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  background: "var(--bg)",
                  boxShadow: NEU_INSET,
                }}
              >
                <ProjectCell label={launchLabel} value={p.launch} />
                <ProjectCell label={handoverLabel} value={p.handover} />
                <ProjectCell label={fromLabel} value={p.from} isPrice />
              </div>
              <a
                href="#lead"
                style={{
                  all: "unset",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: "var(--bg)",
                  boxShadow:
                    "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                {detailsCta}
              </a>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            padding: "14px 18px",
            borderRadius: 12,
            background: "var(--bg-2)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12.5,
            color: "var(--muted)",
          }}
        >
          <Icon name="info" size={16} />
          {footnote}
        </div>
      </section>
    </Container>
  );
}

function ProjectCell({ label, value, isPrice }) {
  return (
    <div>
      <div
        style={{
          fontSize: 9.5,
          color: "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: ".1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: isPrice ? "'Cormorant Garamond', serif" : "inherit",
          fontWeight: isPrice ? 700 : 600,
          fontSize: isPrice ? 14 : 12.5,
          color: "var(--ink)",
          marginTop: 2,
          letterSpacing: isPrice ? "-0.02em" : 0,
        }}
      >
        {value}
      </div>
    </div>
  );
}

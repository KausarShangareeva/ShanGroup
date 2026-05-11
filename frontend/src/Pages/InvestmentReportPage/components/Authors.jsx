"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Author cards. Initials avatar (deterministic from name) + role + bio +
// credentials chip. No photos to avoid brittle external image deps — initials
// read as a research-firm convention.
function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Authors() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestmentReportPage.authors");
  const items = t.raw("items");

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("kicker")}
          titleA={t("titleA")}
          titleB={t("titleB")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((a, i) => (
            <article
              key={a.id}
              style={{
                background: i === 0 ? "#0c1418" : "var(--bg)",
                color: i === 0 ? "#fff" : "var(--ink)",
                borderRadius: 22,
                padding: isMobile ? 24 : 30,
                boxShadow:
                  i === 0
                    ? "0 18px 36px rgba(8,16,22,.32), inset 0 1px 0 rgba(255,255,255,.06)"
                    : NEU_RAISED,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {i === 0 && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 180,
                    height: 180,
                    borderRadius: 999,
                    background:
                      "radial-gradient(circle, var(--ir-accent-glow), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
              )}

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background:
                      i === 0
                        ? "oklch(0.78 0.11 200)"
                        : "var(--ir-accent-soft)",
                    color: i === 0 ? "#0c1418" : "var(--ir-accent-deep)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    fontSize: 18,
                  }}
                >
                  {initials(a.name)}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: 22,
                      lineHeight: 1.15,
                      letterSpacing: "-0.012em",
                      color: i === 0 ? "#fff" : "var(--ink)",
                    }}
                  >
                    {a.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color:
                        i === 0
                          ? "oklch(0.78 0.11 200)"
                          : "var(--ir-accent-deep)",
                      marginTop: 4,
                    }}
                  >
                    {a.role}
                  </div>
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: i === 0 ? "rgba(255,255,255,.8)" : "var(--muted)",
                  position: "relative",
                  flex: 1,
                }}
              >
                {a.bio}
              </p>

              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: i === 0 ? "rgba(255,255,255,.65)" : "var(--ink-2)",
                  padding: "5px 10px",
                  borderRadius: 999,
                  background:
                    i === 0
                      ? "rgba(255,255,255,.07)"
                      : "var(--bg-2)",
                }}
              >
                {a.credentials}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}

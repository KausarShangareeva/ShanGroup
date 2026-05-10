"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function StatsStrip() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.statsStrip");
  const STATS = t.raw("items");
  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 50 : 80, paddingBottom: isMobile ? 50 : 80 }}>
        <div
          style={{
            borderRadius: 26,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, oklch(0.16 0.015 80) 0%, oklch(0.10 0.01 80) 100%)",
            color: "#fff",
            padding: isMobile ? "40px 24px" : "60px 56px",
            position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -100,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: 999,
              background:
                "radial-gradient(circle, oklch(0.86 0.13 88 / .18) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "oklch(0.78 0.13 78)",
              marginBottom: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              position: "relative",
            }}
          >
            <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "oklch(0.78 0.13 78)", opacity: 0.55 }} />
            {t("kicker")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? 32 : 0,
              position: "relative",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  paddingLeft: !isMobile && i > 0 ? 36 : 0,
                  borderLeft:
                    !isMobile && i > 0 ? "1px solid rgba(255,255,255,.12)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: isMobile
                      ? "clamp(48px, 14vw, 72px)"
                      : "clamp(64px, 6.4vw, 96px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: "oklch(0.86 0.13 88)",
                  }}
                >
                  {s.v}
                </div>
                <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 500, marginTop: 14, color: "#fff", letterSpacing: "-0.005em" }}>
                  {s.l}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginTop: 6, lineHeight: 1.45 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

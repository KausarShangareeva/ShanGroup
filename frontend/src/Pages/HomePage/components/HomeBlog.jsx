"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const LINE_STRONG = "oklch(0.78 0.005 75)";

// Изображения статичны (URLs), tag/date/title/read берутся из переводов.
const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546412414-e1885259563a?w=900&q=80&auto=format&fit=crop",
];

export default function HomeBlog() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.homeBlog");
  const BLOG = t.raw("items").map((item, i) => ({ ...item, img: BLOG_IMAGES[i] }));
  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 60 : 100, paddingBottom: isMobile ? 40 : 70 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
            gap: 24,
            alignItems: "end",
            marginBottom: isMobile ? 24 : 36,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                fontWeight: 500,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--sand-deep)",
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
              {t("kicker")}
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: isMobile
                  ? "clamp(30px, 8vw, 40px)"
                  : "clamp(42px, 4.4vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.012em",
                color: "var(--ink)",
                textWrap: "balance",
              }}
            >
              {t("titleA")}{" "}
              <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 999,
              border: `1px solid ${LINE_STRONG}`,
              color: "var(--ink)",
              textDecoration: "none",
              fontSize: 13.5,
              fontWeight: 500,
              transition: "background .18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(10,10,11,.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {t("ctaAll")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7 H11 M7 3 L11 7 L7 11" />
            </svg>
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {BLOG.map((p, i) => (
            <a
              key={i}
              href="#"
              style={{
                display: "block",
                borderRadius: 22,
                overflow: "hidden",
                background: "var(--bg)",
                textDecoration: "none",
                transition: "transform .25s",
                boxShadow: NEU_RAISED,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div
                style={{
                  aspectRatio: "1.6 / 1",
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "5px 10px",
                    borderRadius: 6,
                    background: "rgba(10,10,11,.85)",
                    color: "oklch(0.86 0.13 88)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9.5,
                    fontWeight: 600,
                    letterSpacing: ".12em",
                  }}
                >
                  {p.tag}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".08em",
                    display: "flex",
                    gap: 12,
                  }}
                >
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read} {t("minutes")}</span>
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--ink)",
                    letterSpacing: "-0.005em",
                    lineHeight: 1.2,
                    marginTop: 10,
                    textWrap: "balance",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--sand-deep)",
                  }}
                >
                  {t("ctaRead")}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7 H11 M7 3 L11 7 L7 11" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}

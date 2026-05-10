"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

// Изображения статичны (URL не локализуется) — порядок соответствует i18n items[i].
const LAUNCH_IMAGES = [
  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
];

export default function Launches() {
  const isMobile = useIsMobile();
  const t = useTranslations("OffPlanPage.launches");
  const items = t.raw("items").map((it, i) => ({ ...it, img: LAUNCH_IMAGES[i] }));

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
            gap: isMobile ? 14 : 18,
          }}
        >
          {items.map((it, i) => (
            <article
              key={i}
              style={{
                background: "var(--bg)",
                borderRadius: 22,
                overflow: "hidden",
                transition: "transform .25s",
                cursor: "pointer",
                boxShadow: NEU_RAISED_SM,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1.3 / 1",
                  backgroundImage: `url(${it.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.55) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "6px 11px 6px 7px",
                    borderRadius: 999,
                    background: "rgba(10,10,11,.7)",
                    backdropFilter: "blur(10px)",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 99,
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.07 80), oklch(0.65 0.08 60))",
                      color: "#0A0A0B",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 800,
                      fontSize: 10,
                    }}
                  >
                    {it.dev.charAt(0)}
                  </span>
                  {it.dev}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    padding: "5px 10px",
                    borderRadius: 999,
                    background:
                      "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                    color: "#3a2d10",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".1em",
                  }}
                >
                  {it.roi}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    right: 14,
                    color: "#fff",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      fontSize: 22,
                      lineHeight: 1.05,
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {it.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,.85)",
                      marginTop: 4,
                    }}
                  >
                    {it.area}
                  </div>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {t("priceFromLabel")}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        fontSize: 22,
                        color: "var(--ink)",
                        marginTop: 2,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {it.priceFrom}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 9.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {t("handoverLabel")}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginTop: 4,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {it.handover}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 14,
                    padding: "10px 12px",
                    borderRadius: 12,
                    background: "var(--bg-2)",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 6,
                    fontSize: 11.5,
                    color: "var(--muted)",
                  }}
                >
                  <span>
                    {t("downLabel")}:{" "}
                    <strong style={{ color: "var(--ink)" }}>{it.down}</strong>
                  </span>
                  <span
                    style={{
                      color: "oklch(0.55 0.13 145)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".06em",
                      fontWeight: 600,
                    }}
                  >
                    → {it.launch}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}

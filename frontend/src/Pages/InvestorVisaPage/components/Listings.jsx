"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED_SM =
  "-4px -4px 10px var(--shadow-light), 4px 4px 12px var(--shadow-dark)";

const LISTING_IMAGES = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80&auto=format&fit=crop",
];

export default function Listings() {
  const isMobile = useIsMobile();
  const t = useTranslations("InvestorVisaPage.listings");
  const items = t.raw("items").map((it, i) => ({ ...it, img: LISTING_IMAGES[i] }));
  const priceLabel = t("priceLabel");
  const yieldLabel = t("yieldLabel");
  const visaReadyBadge = t("visaReadyBadge");
  const visaBonus = t("visaBonus");

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
                      "linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.55) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "6px 11px",
                    borderRadius: 999,
                    background: "rgba(10,10,11,.7)",
                    backdropFilter: "blur(10px)",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  {it.developer}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    padding: "5px 10px",
                    borderRadius: 999,
                    background: "rgba(200,215,235,.95)",
                    color: "#1a2030",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".1em",
                  }}
                >
                  {visaReadyBadge}
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
                    {it.area} · {it.rooms}
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
                      {priceLabel}
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
                      {it.price}
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
                      {yieldLabel}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        fontSize: 22,
                        color: "oklch(0.55 0.13 145)",
                        marginTop: 2,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {it.yield}
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    flexWrap: "wrap",
                    fontSize: 11.5,
                    color: "var(--ink-2)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="var(--silver-deep)"
                      strokeWidth="1.6"
                    >
                      <path d="M2 9 L7 5 L12 9 M3 8 V12 H11 V8" />
                    </svg>
                    {it.status}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--silver-deep)",
                      fontWeight: 600,
                    }}
                  >
                    {visaBonus}
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

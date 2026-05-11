"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";
import { buildDistricts, fmtK } from "./data";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

const LEADER_ACCENTS = {
  yield: { color: "var(--dc-accent-deep)" },
  growth: { color: "var(--dc-green-deep)" },
  entry: { color: "var(--dc-gold)" },
};

export default function CategoryLeaders() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage");
  const items = t.raw("leaders.items");
  const labels = t.raw("leaders.labels");
  const districtsCopy = t.raw("districts");

  const rows = useMemo(() => buildDistricts(districtsCopy), [districtsCopy]);

  const topYield  = rows.reduce((a, b) => (b.netYield > a.netYield ? b : a));
  const topGrowth = rows.reduce((a, b) => (b.growth > a.growth ? b : a));
  const topEntry  = rows.reduce((a, b) => (b.price1br < a.price1br ? b : a));

  const PICKS = {
    yield: { d: topYield,  val: `${topYield.netYield}% ${labels.netYield}` },
    growth: { d: topGrowth, val: `+${topGrowth.growth}% / ${labels.growth.split(" / ")[1] || labels.growth}` },
    entry:  { d: topEntry,  val: `${labels.entry} ${fmtK(topEntry.price1br)}` },
  };

  const leaders = items.map((it) => ({ ...it, ...PICKS[it.id], color: LEADER_ACCENTS[it.id]?.color }));

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <SectionHeader
          kicker={t("leaders.kicker")}
          titleA={t("leaders.titleA")}
          titleB={t("leaders.titleB")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 14 : 18,
          }}
        >
          {leaders.map((l) => (
            <div
              key={l.id}
              style={{
                background: "var(--bg)",
                borderRadius: 24,
                padding: isMobile ? 24 : 30,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: NEU_RAISED,
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "5px 10px 5px 8px",
                    borderRadius: 999,
                    background: `color-mix(in oklab, ${l.color} 14%, transparent)`,
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: l.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: l.color,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {l.title}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily:
                      "'Montserrat', system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    lineHeight: 0.92,
                    fontSize: isMobile ? 28 : 34,
                    color: l.color,
                  }}
                >
                  {l.val}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: isMobile ? 18 : 22,
                    color: "var(--ink)",
                    marginTop: 4,
                  }}
                >
                  {l.d.full}
                </div>
              </div>

              <div style={{ height: 1, background: "var(--line)" }} />

              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  flex: 1,
                }}
              >
                {l.desc}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  { k: labels.netYield, v: `${l.d.netYield}%` },
                  { k: labels.growth,   v: `+${l.d.growth}%` },
                  { k: labels.roi5y,    v: `+${l.d.roi5y.toFixed(0)}%` },
                  { k: labels.entry,    v: fmtK(l.d.price1br) },
                ].map((s) => (
                  <div
                    key={s.k}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "var(--bg-2)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {s.k}
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "'Montserrat', system-ui, -apple-system, sans-serif",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 0.92,
                        fontSize: 17,
                        color: "var(--ink)",
                        marginTop: 2,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

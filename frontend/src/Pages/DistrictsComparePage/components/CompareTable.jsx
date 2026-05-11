"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";
import { buildDistricts, fmtK } from "./data";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

function MiniBar({ value, max, color }) {
  const pct = Math.min(value / max, 1) * 100;
  return (
    <div
      style={{
        height: 5,
        borderRadius: 999,
        background: "var(--line)",
        overflow: "hidden",
        minWidth: 48,
        marginTop: 4,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: 999,
          background: color || "var(--dc-accent-deep)",
          transition: "width .6s ease",
        }}
      />
    </div>
  );
}

function TagPill({ tag, tagHue }) {
  return (
    <span
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: 999,
        background: `oklch(0.65 0.12 ${tagHue} / .18)`,
        color: `oklch(0.38 0.16 ${tagHue})`,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: ".06em",
        textTransform: "uppercase",
        flexShrink: 0,
        whiteSpace: "nowrap",
        display: "inline-block",
        marginTop: 4,
      }}
    >
      {tag}
    </span>
  );
}

export default function CompareTable() {
  const isMobile = useIsMobile();
  const t = useTranslations("DistrictsComparePage");
  const cols = t.raw("table.cols");
  const exp = t.raw("table.expanded");
  const districtsCopy = t.raw("districts");

  const COLS = useMemo(
    () => [
      { id: "score",    l: cols.score,    fmt: (d) => `${d.score}`,                  color: "var(--dc-gold)" },
      { id: "netYield", l: cols.netYield, fmt: (d) => `${d.netYield.toFixed(1)}%`,   color: "var(--dc-accent-deep)" },
      { id: "growth",   l: cols.growth,   fmt: (d) => `+${d.growth}%`,                color: "var(--dc-green-deep)" },
      { id: "roi5y",    l: cols.roi5y,    fmt: (d) => `+${d.roi5y.toFixed(0)}%`,      color: "var(--ink)" },
      { id: "price1br", l: cols.price1br, fmt: (d) => fmtK(d.price1br),               color: "var(--ink)" },
    ],
    [cols]
  );

  const rows = useMemo(() => buildDistricts(districtsCopy), [districtsCopy]);
  const maxVals = useMemo(() => {
    const obj = {};
    COLS.forEach((c) => {
      obj[c.id] = Math.max(...rows.map((d) => d[c.id]));
    });
    return obj;
  }, [COLS, rows]);

  const [sortBy, setSortBy] = useState("score");
  const [sortDir, setSortDir] = useState(-1);
  const [expanded, setExpanded] = useState(null);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const dir = sortBy === "price1br" ? sortDir * -1 : sortDir;
      return (a[sortBy] - b[sortBy]) * dir;
    });
  }, [rows, sortBy, sortDir]);

  const toggle = (col) => {
    if (sortBy === col) setSortDir((d) => d * -1);
    else {
      setSortBy(col);
      setSortDir(-1);
    }
  };

  const colMeta = (id) => COLS.find((c) => c.id === id) || COLS[0];

  return (
    <Container>
      <section
        style={{
          paddingTop: isMobile ? 50 : 90,
          paddingBottom: isMobile ? 30 : 60,
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? 22 : 38,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <SectionHeader
            kicker={t("table.kicker")}
            titleA={t("table.titleA")}
            titleB={t("table.titleB")}
            maxWidth={600}
          />
          {!isMobile && (
            <div
              style={{
                fontSize: 11.5,
                color: "var(--muted)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".06em",
                textAlign: "right",
                lineHeight: 1.5,
                whiteSpace: "pre-line",
              }}
            >
              {t("table.hint")}
            </div>
          )}
        </div>

        {/* Mobile sort pills */}
        {isMobile && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {COLS.map((c) => {
              const a = sortBy === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    padding: "7px 12px",
                    borderRadius: 999,
                    fontSize: 11.5,
                    fontWeight: 600,
                    background: a ? "var(--ink)" : "var(--bg)",
                    color: a ? "var(--ink-inverse)" : "var(--ink-2)",
                    boxShadow: a
                      ? "inset 1px 1px 4px rgba(0,0,0,.35)"
                      : "-1px -1px 4px var(--shadow-light), 1px 1px 4px var(--shadow-dark)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {c.l}
                  {a && (
                    <span style={{ opacity: 0.7 }}>
                      {sortDir === -1 ? "↓" : "↑"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div
          style={{
            background: "var(--bg)",
            borderRadius: isMobile ? 20 : 26,
            overflow: "hidden",
            boxShadow: NEU_RAISED,
          }}
        >
          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr 1fr 100px",
                padding: "14px 24px",
                borderBottom: "1px solid var(--line)",
                background: "var(--bg-2)",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {cols.district}
              </div>
              {COLS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color:
                      sortBy === c.id ? "var(--dc-accent-deep)" : "var(--muted)",
                    fontWeight: sortBy === c.id ? 700 : 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {c.l}
                  {sortBy === c.id && (
                    <span style={{ fontSize: 10 }}>
                      {sortDir === -1 ? "↓" : "↑"}
                    </span>
                  )}
                </button>
              ))}
              <span />
            </div>
          )}

          {sorted.map((d, i) => {
            const isEx = expanded === d.id;
            const isTop3 = i < 3;
            const cm = colMeta(sortBy);
            return (
              <div
                key={d.id}
                style={{
                  borderBottom:
                    i < sorted.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isEx ? null : d.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "auto 1fr auto auto"
                      : "2.2fr 1fr 1fr 1fr 1fr 1fr 100px",
                    gap: isMobile ? 10 : 0,
                    padding: isMobile ? "16px 14px" : "20px 24px",
                    alignItems: "center",
                    background: isEx
                      ? "color-mix(in oklab, var(--dc-accent-deep) 6%, transparent)"
                      : "transparent",
                    transition: "background .18s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: isTop3 ? "var(--dc-accent-deep)" : "var(--bg-2)",
                        color: isTop3 ? "#fff" : "var(--muted)",
                        display: "grid",
                        placeItems: "center",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        boxShadow: isTop3 ? "0 4px 10px var(--dc-accent-glow)" : "none",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: isMobile ? 13.5 : 14.5,
                          fontWeight: 700,
                          color: "var(--ink)",
                          lineHeight: 1.2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: isMobile ? "nowrap" : "normal",
                        }}
                      >
                        {isMobile ? d.name : d.full}
                      </div>
                      <TagPill tag={d.tag} tagHue={d.tagHue} />
                    </div>
                  </div>

                  {!isMobile &&
                    COLS.map((c) => (
                      <div key={c.id}>
                        <div
                          style={{
                            fontFamily:
                              "'Montserrat', system-ui, -apple-system, sans-serif",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 0.92,
                            fontSize: 18,
                            color: c.color,
                          }}
                        >
                          {c.fmt(d)}
                        </div>
                        <MiniBar
                          value={d[c.id]}
                          max={maxVals[c.id]}
                          color={c.color}
                        />
                      </div>
                    ))}

                  {isMobile && (
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily:
                            "'Montserrat', system-ui, -apple-system, sans-serif",
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          lineHeight: 0.92,
                          fontSize: 20,
                          color: cm.color,
                        }}
                      >
                        {cm.fmt(d)}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--muted)",
                          fontFamily: "'JetBrains Mono', monospace",
                          marginTop: 2,
                        }}
                      >
                        {cm.l}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        display: "grid",
                        placeItems: "center",
                        background: isEx ? "var(--dc-accent-deep)" : "var(--bg-2)",
                        color: isEx ? "#fff" : "var(--muted)",
                        transform: isEx ? "rotate(180deg)" : "none",
                        transition: "all .25s",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="chevron" size={11} strokeWidth={2.5} />
                    </div>
                  </div>
                </button>

                {isEx && (
                  <div
                    style={{
                      padding: isMobile ? "18px 14px 22px" : "22px 24px 28px",
                      background:
                        "color-mix(in oklab, var(--dc-accent-deep) 5%, var(--bg))",
                      borderTop: "1px solid var(--line)",
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1.2fr",
                      gap: isMobile ? 18 : 28,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10.5,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}
                      >
                        {exp.about}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13.5,
                          lineHeight: 1.7,
                          color: "var(--ink-2)",
                        }}
                      >
                        {d.desc}
                      </p>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10.5,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 10,
                        }}
                      >
                        {exp.keyMetrics}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        {[
                          { l: exp.grossYield, v: `${d.grossYield}%` },
                          { l: exp.netYield, v: `${d.netYield}%`, acc: true },
                          { l: exp.occupancy, v: `${d.occ}%` },
                          { l: exp.pricePerSqm, v: `$${d.priceSqm}` },
                          { l: exp.roi5y, v: `+${d.roi5y.toFixed(1)}%`, acc: true },
                          { l: exp.score, v: `${d.score}/100` },
                        ].map((r) => (
                          <div
                            key={r.l}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 8,
                            }}
                          >
                            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                              {r.l}
                            </span>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                fontFamily: "'JetBrains Mono', monospace",
                                color: r.acc ? "var(--dc-accent-deep)" : "var(--ink)",
                              }}
                            >
                              {r.v}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10.5,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 10,
                        }}
                      >
                        {exp.whyInvest}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 9,
                          marginBottom: 20,
                        }}
                      >
                        {(d.pros || []).map((p) => (
                          <div
                            key={p}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 9,
                              fontSize: 13.5,
                              color: "var(--ink)",
                            }}
                          >
                            <span
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                background: "var(--dc-accent-deep)",
                                color: "#fff",
                                display: "grid",
                                placeItems: "center",
                                flexShrink: 0,
                              }}
                            >
                              <Icon name="check" size={10} strokeWidth={2.5} />
                            </span>
                            {p}
                          </div>
                        ))}
                      </div>
                      <a
                        href="#lead"
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          boxSizing: "border-box",
                          padding: "12px 18px",
                          borderRadius: 999,
                          display: "block",
                          textAlign: "center",
                          background: "var(--ink)",
                          color: "var(--ink-inverse)",
                          fontSize: 13,
                          fontWeight: 600,
                          boxShadow: "0 6px 14px rgba(10,10,11,.18)",
                        }}
                      >
                        {exp.cta.replace("{name}", d.name)}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: "var(--muted)",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: ".04em",
          }}
        >
          {t("table.footnote")}
        </div>
      </section>
    </Container>
  );
}

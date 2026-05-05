"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";
const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";
const NEU_INSET =
  "inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light)";

const DM_DISTRICTS_GEO = [
  { id: "marina",   name: "Dubai Marina",     x: 18, y: 60, r: 50 },
  { id: "palm",     name: "Palm Jumeirah",    x: 26, y: 52, r: 45 },
  { id: "downtown", name: "Downtown Dubai",   x: 48, y: 55, r: 55 },
  { id: "creek",    name: "Creek Harbour",    x: 60, y: 48, r: 40 },
  { id: "business", name: "Business Bay",     x: 45, y: 58, r: 35 },
  { id: "jvc",      name: "JVC",              x: 36, y: 70, r: 30 },
  { id: "jbr",      name: "JBR",              x: 14, y: 64, r: 28 },
  { id: "islands",  name: "Dubai Islands",    x: 64, y: 30, r: 32 },
  { id: "dxb",      name: "Дубай-аэропорт",   x: 70, y: 50, r: 24 },
];

const DM_PINS = [
  { id: "tranquil",   district: "islands",  x: 64, y: 28, name: "Tranquil Beach",         dev: "SOBHA",            price: 382100,  roi: 11.4, type: "apt" },
  { id: "rosewood",   district: "palm",     x: 25, y: 50, name: "Rosewood Residences",    dev: "OMNIYAT",          price: 7807200, roi: 7.8,  type: "penthouse" },
  { id: "marina-v",   district: "marina",   x: 19, y: 61, name: "Marina Vista",           dev: "EMAAR",            price: 412000,  roi: 12.8, type: "apt" },
  { id: "burj-vista", district: "downtown", x: 48, y: 55, name: "Burj Vista",             dev: "EMAAR",            price: 2100000, roi: 8.4,  type: "apt" },
  { id: "creek-h",    district: "creek",    x: 60, y: 47, name: "Creek Harbour Heights",  dev: "EMAAR",            price: 850000,  roi: 9.6,  type: "apt" },
  { id: "palm-tower", district: "palm",     x: 27, y: 53, name: "Palm Tower",             dev: "NAKHEEL",          price: 4200000, roi: 6.2,  type: "penthouse" },
  { id: "jvc-gardens",district: "jvc",      x: 37, y: 70, name: "JVC Gardens",            dev: "DAMAC",            price: 195000,  roi: 11.8, type: "apt" },
  { id: "atlantis",   district: "palm",     x: 23, y: 49, name: "Atlantis Royal",         dev: "KERZNER",          price: 5800000, roi: 7.0,  type: "penthouse" },
  { id: "bvlgari",    district: "marina",   x: 17, y: 58, name: "Bvlgari Lighthouse",     dev: "MERAAS",           price: 6400000, roi: 6.8,  type: "penthouse" },
  { id: "jbr-tower",  district: "jbr",      x: 13, y: 65, name: "JBR Tower One",          dev: "DUBAI Properties", price: 680000,  roi: 10.2, type: "apt" },
  { id: "celesto",    district: "jvc",      x: 35, y: 71, name: "Celesto 2",              dev: "Tarrad",           price: 144300,  roi: 12.4, type: "studio" },
  { id: "dxb-villa",  district: "creek",    x: 62, y: 49, name: "Creek Villas",           dev: "EMAAR",            price: 3200000, roi: 7.6,  type: "villa" },
];

const DM_TYPES = [
  { id: "all",       label: "Все" },
  { id: "studio",    label: "Студии" },
  { id: "apt",       label: "Апарт." },
  { id: "penthouse", label: "Пентхаусы" },
  { id: "villa",     label: "Виллы" },
];

export default function DubaiMap() {
  const isMobile = useIsMobile();
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState(10_000_000);
  const [active, setActive] = useState("marina-v");
  const [, setHoveredDistrict] = useState(null);

  const visible = DM_PINS.filter(
    (p) => (type === "all" || p.type === type) && p.price <= budget
  );
  const activePin = DM_PINS.find((p) => p.id === active) || visible[0];

  const fmtK = (n) =>
    n >= 1_000_000
      ? "$" + (n / 1_000_000).toFixed(2) + "M"
      : "$" + Math.round(n / 1000) + "K";

  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 60 : 100, paddingBottom: isMobile ? 40 : 70 }}>
        <div style={{ marginBottom: isMobile ? 28 : 40 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 10.5 : 11.5,
              fontWeight: 500,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--sand-deep)",
              marginBottom: isMobile ? 14 : 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span aria-hidden style={{ display: "inline-block", width: 32, height: 1, background: "var(--sand-deep)", opacity: 0.55 }} />
            Карта · {visible.length} объектов
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
            Найдите объект{" "}
            <span style={{ fontStyle: "italic", color: "var(--sand-deep)", fontWeight: 400 }}>
              на&nbsp;карте
            </span>
          </h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <div
            style={{
              padding: 4,
              borderRadius: 999,
              display: "inline-flex",
              gap: 2,
              boxShadow: NEU_INSET,
            }}
          >
            {DM_TYPES.map((t) => {
              const a = t.id === type;
              return (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: "8px 14px",
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: a ? "var(--bg)" : "var(--muted)",
                    background: a ? "var(--ink)" : "transparent",
                    boxShadow: a ? "0 4px 12px rgba(10,10,11,.25)" : "none",
                    transition: "all .2s",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              flex: 1,
              minWidth: 240,
              boxShadow: NEU_FLAT,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--muted)",
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: ".12em",
                whiteSpace: "nowrap",
              }}
            >
              До
            </span>
            <input
              type="range"
              min={150_000}
              max={10_000_000}
              step={50_000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#0A0A0B" }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                whiteSpace: "nowrap",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {fmtK(budget)}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
            gap: isMobile ? 12 : 16,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              overflow: "hidden",
              position: "relative",
              aspectRatio: isMobile ? "1.1 / 1" : "1.4 / 1",
              background:
                "linear-gradient(135deg, oklch(0.94 0.01 220) 0%, oklch(0.90 0.02 220) 100%)",
              boxShadow: NEU_RAISED,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <defs>
                <pattern
                  id="water"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="4" stroke="oklch(0.85 0.02 220)" strokeWidth="0.3" />
                </pattern>
                <linearGradient id="dm-pin-gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="oklch(0.86 0.13 88)" />
                  <stop offset="1" stopColor="oklch(0.74 0.14 78)" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill="url(#water)" opacity="0.5" />

              <path
                d="M 0 78 Q 20 75 28 72 Q 35 68 42 65 Q 50 62 58 60 Q 66 58 75 56 Q 85 54 100 50 L 100 100 L 0 100 Z"
                fill="oklch(0.96 0.02 80)"
              />
              <path
                d="M 0 78 Q 20 75 28 72 Q 35 68 42 65 Q 50 62 58 60 Q 66 58 75 56 Q 85 54 100 50"
                fill="none"
                stroke="oklch(0.78 0.05 80)"
                strokeWidth="0.4"
              />

              <g>
                <circle cx="25" cy="52" r="8" fill="oklch(0.94 0.04 80)" stroke="oklch(0.78 0.05 80)" strokeWidth="0.3" />
                <circle cx="25" cy="52" r="3" fill="oklch(0.96 0.02 80)" stroke="oklch(0.78 0.05 80)" strokeWidth="0.2" />
                {[...Array(8)].map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1={25 + Math.cos(a) * 3}
                      y1={52 + Math.sin(a) * 3}
                      x2={25 + Math.cos(a) * 7.5}
                      y2={52 + Math.sin(a) * 7.5}
                      stroke="oklch(0.78 0.05 80)"
                      strokeWidth="0.4"
                    />
                  );
                })}
              </g>

              <ellipse cx="64" cy="32" rx="6" ry="3.5" fill="oklch(0.94 0.04 80)" stroke="oklch(0.78 0.05 80)" strokeWidth="0.3" />

              {DM_DISTRICTS_GEO.map((d) => (
                <g
                  key={d.id}
                  onMouseEnter={() => setHoveredDistrict(d.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <text
                    x={d.x}
                    y={d.y - 4}
                    fontSize="2"
                    fill="oklch(0.45 0.02 80)"
                    fontFamily="'JetBrains Mono', monospace"
                    textAnchor="middle"
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      pointerEvents: "none",
                    }}
                  >
                    {d.name}
                  </text>
                </g>
              ))}

              <path
                d="M 0 65 Q 30 62 50 60 T 100 55"
                stroke="oklch(0.85 0.02 80)"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="2 1.5"
              />
              <path
                d="M 50 100 L 50 55"
                stroke="oklch(0.85 0.02 80)"
                strokeWidth="0.4"
                fill="none"
                strokeDasharray="1.5 1"
              />
            </svg>

            {visible.map((p) => {
              const isActive = active === p.id;
              const tier = p.price >= 2_180_000 ? "gold" : p.price >= 545_000 ? "sand" : "ink";
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    position: "absolute",
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: `translate(-50%, -100%) ${isActive ? "scale(1.15)" : "scale(1)"}`,
                    transition: "transform .25s cubic-bezier(.34,1.56,.64,1)",
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      filter: isActive
                        ? "drop-shadow(0 4px 10px rgba(10,10,11,.35))"
                        : "drop-shadow(0 2px 4px rgba(10,10,11,.2))",
                    }}
                  >
                    <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                      <path
                        d="M16 39 C 16 39 2 24 2 14 C 2 6 8 1 16 1 C 24 1 30 6 30 14 C 30 24 16 39 16 39 Z"
                        fill={tier === "gold" ? "url(#dm-pin-gold)" : "#0A0A0B"}
                      />
                      <circle cx="16" cy="14" r="6" fill="#fff" />
                      <text
                        x="16"
                        y="17"
                        fontSize="7"
                        fontWeight="700"
                        textAnchor="middle"
                        fill={tier === "gold" ? "#5d4a18" : "#0A0A0B"}
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        {Math.round(p.roi)}
                      </text>
                    </svg>
                  </div>
                </button>
              );
            })}

            {activePin && (
              <div
                style={{
                  position: "absolute",
                  left: `${activePin.x}%`,
                  top: `${activePin.y}%`,
                  transform: "translate(-50%, calc(-100% - 50px))",
                  background: "var(--bg)",
                  borderRadius: 14,
                  padding: "10px 14px",
                  minWidth: 190,
                  zIndex: 20,
                  pointerEvents: "none",
                  boxShadow: NEU_RAISED,
                }}
              >
                <div
                  style={{
                    fontSize: 9.5,
                    color: "var(--muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                  }}
                >
                  {activePin.dev}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginTop: 2,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {activePin.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 6,
                    fontSize: 11.5,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>{fmtK(activePin.price)}</span>
                  <span style={{ color: "oklch(0.5 0.13 145)", fontWeight: 600 }}>ROI {activePin.roi}%</span>
                </div>
              </div>
            )}

            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                background: "rgba(255,255,255,.92)",
                backdropFilter: "blur(10px)",
                borderRadius: 12,
                padding: "8px 12px",
                display: "flex",
                gap: 12,
                fontSize: 10.5,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".08em",
                boxShadow: NEU_FLAT,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#0A0A0B" }} />
                Standard
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: "linear-gradient(180deg, oklch(0.86 0.13 88), oklch(0.74 0.14 78))",
                  }}
                />
                Golden Visa
              </span>
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              maxHeight: isMobile ? 360 : 540,
              overflowY: "auto",
              boxShadow: NEU_FLAT,
            }}
          >
            <div
              style={{
                padding: "6px 10px",
                fontSize: 10.5,
                color: "var(--muted)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              {visible.length} объектов в выборке
            </div>
            {visible.map((p) => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: "10px 12px",
                    borderRadius: 12,
                    background: isActive ? "var(--ink)" : "transparent",
                    color: isActive ? "var(--ink-inverse)" : "var(--ink)",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 8,
                    transition: "all .2s",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 9.5,
                        opacity: isActive ? 0.55 : 0.6,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.dev}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        marginTop: 2,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {fmtK(p.price)}
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: isActive ? "oklch(0.85 0.13 80)" : "oklch(0.5 0.13 145)",
                        marginTop: 2,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      ROI {p.roi}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </Container>
  );
}

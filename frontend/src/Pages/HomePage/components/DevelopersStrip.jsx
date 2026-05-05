"use client";

import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";

const NEU_FLAT =
  "-1px -1px 2px var(--shadow-light), 1px 1px 2px var(--shadow-dark)";

const DEV_LIST = [
  { name: "EMAAR", rera: "1856" },
  { name: "DAMAC", rera: "2032" },
  { name: "SOBHA", rera: "1804" },
  { name: "NAKHEEL", rera: "1023" },
  { name: "MERAAS", rera: "1933" },
  { name: "ELLINGTON", rera: "2241" },
  { name: "OMNIYAT", rera: "1567" },
  { name: "BINGHATTI", rera: "1985" },
];

export default function DevelopersStrip() {
  const isMobile = useIsMobile();
  return (
    <Container>
      <section style={{ paddingTop: isMobile ? 40 : 60, paddingBottom: isMobile ? 40 : 60 }}>
        <div
          style={{
            borderRadius: 22,
            padding: isMobile ? "22px 18px" : "28px 36px",
            boxShadow: NEU_FLAT,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
              gap: isMobile ? 18 : 36,
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--muted)",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
              }}
            >
              Официальный
              <br />
              партнёр Tier-1
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                gap: isMobile ? "16px 12px" : "18px 24px",
              }}
            >
              {DEV_LIST.map((d) => (
                <div
                  key={d.name}
                  style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3 }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: ".14em",
                      color: "var(--ink)",
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9.5,
                      letterSpacing: ".08em",
                      color: "var(--muted)",
                    }}
                  >
                    RERA #{d.rera}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

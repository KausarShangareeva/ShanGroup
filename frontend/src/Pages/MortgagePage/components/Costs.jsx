"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// Список расходов — таблица с двумя колонками (наименование + сумма), на мобилке
// раскрывается вертикально. Описание под заголовком, чтобы держать строки тонкими.
export default function Costs() {
  const isMobile = useIsMobile();
  const t = useTranslations("MortgagePage.costs");
  const items = t.raw("items");

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
        />
        <p
          style={{
            margin: "-22px 0 28px",
            maxWidth: 640,
            fontSize: isMobile ? 14 : 15,
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          {t("subtitle")}
        </p>

        <div
          style={{
            background: "var(--bg)",
            borderRadius: 22,
            padding: isMobile ? 12 : 20,
            boxShadow: NEU_RAISED,
          }}
        >
          {items.map((c, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr 0.6fr",
                gap: isMobile ? 6 : 18,
                padding: isMobile ? "14px 10px" : "18px 16px",
                borderBottom:
                  i < items.length - 1 ? "1px solid var(--line)" : "none",
                alignItems: isMobile ? "stretch" : "center",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {c.t}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {c.d}
              </div>
              <div
                style={{
                  fontFamily:
                    "'Montserrat', system-ui, -apple-system, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  fontSize: 18,
                  color: "var(--accent-blue-deep)",
                  textAlign: isMobile ? "left" : "right",
                  whiteSpace: "nowrap",
                }}
              >
                {c.v}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

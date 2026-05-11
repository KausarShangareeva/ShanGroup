"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Icon from "@/components/Icon/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./SectionHeader";

const NEU_RAISED =
  "-8px -8px 20px var(--shadow-light), 8px 8px 24px var(--shadow-dark)";

// FAQ accordion. Mirrors the RoiPage pattern — first item opens by default so
// the page never shows an empty accordion shell.
export default function Faq() {
  const isMobile = useIsMobile();
  const t = useTranslations("UaeTaxGuidePage.faq");
  const items = t.raw("items");

  const [open, setOpen] = useState(0);

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
            background: "var(--bg)",
            borderRadius: 22,
            padding: isMobile ? 8 : 16,
            boxShadow: NEU_RAISED,
          }}
        >
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                style={{
                  borderBottom:
                    i < items.length - 1
                      ? "1px solid var(--line)"
                      : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    width: "100%",
                    boxSizing: "border-box",
                    padding: isMobile ? "16px 14px" : "22px 22px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile ? 14.5 : 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      textAlign: "left",
                      lineHeight: 1.4,
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: isOpen
                        ? "var(--tx-accent-deep)"
                        : "var(--bg-2)",
                      color: isOpen ? "#fff" : "var(--ink)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      transition: "all .25s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    <Icon name="plus" size={14} strokeWidth={2} />
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 600 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height .35s, opacity .25s",
                    padding: isOpen
                      ? isMobile
                        ? "0 14px 20px"
                        : "0 22px 24px"
                      : "0 22px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? 13.5 : 14.5,
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      maxWidth: 820,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}

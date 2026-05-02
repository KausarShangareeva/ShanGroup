"use client";

// PropertiesMegaMenu — "Новостройки ОАЭ" mega-dropdown.
// Faithful port of the artifact's `MegaMenu`.
//
// Desktop: 3-column main grid (240px / 1fr / 280px):
//   • Left rail: "Объекты офф-план" list + "Топ застройщики" links
//   • Center: 5-col tile grid of types, 5-col tile grid of areas, emirate chips row
//   • Right: featured "Предложение дня" card
// Mobile: fullscreen drawer with everything stacked + horizontal scroll rows.

import { useEffect } from "react";
import Link from "next/link";
import { IcClose, IcArrow } from "@/components/HeroIcons/HeroIcons";
import Container from "@/components/layout/Container";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import styles from "./PropertiesMegaMenu.module.css";

export default function PropertiesMegaMenu({
  open,
  onClose,
  isMobile,
  data,
  onMouseEnter,
  onMouseLeave,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = isMobile ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, isMobile, onClose]);

  if (!open) return null;

  if (isMobile) {
    return (
      <>
        <div onClick={onClose} className={styles.mobileBackdrop} />
        <div className={styles.mobileSheet}>
          <MMHeader onClose={onClose} mobile />
          <div className={styles.mobileBody}>
            <MMSection title="Объекты офф-план">
              <MMList items={data.offplan} onClose={onClose} />
            </MMSection>
            <MMSection title="Типы недвижимости">
              <MMScrollRow items={data.types} onClose={onClose} />
            </MMSection>
            <MMSection title="Популярные районы">
              <MMScrollRow items={data.areas} onClose={onClose} />
            </MMSection>
            <MMSection title="Эмираты">
              <div className={styles.emiratesGridMobile}>
                {data.emirates.map((e) => (
                  <MMEmirateChip key={e.label} {...e} onClose={onClose} />
                ))}
              </div>
            </MMSection>
            <MMSection title="Топ застройщики">
              <div className={styles.devList}>
                {data.developers.map((d) => (
                  <Link
                    key={d.label}
                    href={d.href}
                    onClick={onClose}
                    className={styles.linkRowArrow}
                  >
                    {d.label}
                    <span className={styles.linkArrow}>
                      <IcArrow size={12} rotate={-45} />
                    </span>
                  </Link>
                ))}
              </div>
            </MMSection>
            <MMFeatured featured={data.featured} compact onClose={onClose} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={styles.menu}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Container>
        <div className={styles.grid}>
          {/* Left rail */}
          <div className={styles.rail}>
            <SectionBlock title="Объекты офф-план">
              <MMList items={data.offplan} onClose={onClose} />
            </SectionBlock>
            <SectionBlock title="Топ застройщики">
              <div className={styles.devList}>
                {data.developers.map((d) => (
                  <Link
                    key={d.label}
                    href={d.href}
                    onClick={onClose}
                    className={styles.linkRow}
                  >
                    {d.label}
                  </Link>
                ))}
                {data.ctaAllDevelopers && (
                  <Link
                    href={data.ctaAllDevelopers.href}
                    onClick={onClose}
                    className={`${styles.linkRow} ${styles.linkRowAccent}`}
                  >
                    {data.ctaAllDevelopers.label} →
                  </Link>
                )}
              </div>
            </SectionBlock>
          </div>

          {/* Center grid */}
          <div className={styles.center}>
            <div className={styles.tileGrid}>
              {data.types.map((c) => (
                <MMTile key={c.label} {...c} onClose={onClose} />
              ))}
            </div>
            <div className={styles.tileGrid}>
              {data.areas.map((c) => (
                <MMTile key={c.label} {...c} onClose={onClose} />
              ))}
            </div>
            <div>
              <div className={styles.sectionLabel}>Эмираты</div>
              <div className={styles.emiratesGridDesktop}>
                {data.emirates.slice(0, 7).map((e) => (
                  <MMEmirateChip key={e.label} {...e} onClose={onClose} />
                ))}
                {data.ctaAllEmirates && (
                  <div className={styles.allEmiratesSlot}>
                    <PrimaryButton
                      size="sm"
                      trailingArrow
                      fullWidth
                      href={data.ctaAllEmirates.href}
                      onClick={onClose}
                    >
                      {data.ctaAllEmirates.label}
                    </PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right featured */}
          <MMFeatured featured={data.featured} onClose={onClose} />
        </div>
      </Container>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────

function MMHeader({ onClose, mobile }) {
  return (
    <div className={styles.mobileHeader}>
      <div className={styles.mobileTitle}>Новостройки ОАЭ</div>
      <button
        type="button"
        onClick={onClose}
        className={styles.closeBtn}
        aria-label="Закрыть"
      >
        <IcClose size={14} />
      </button>
    </div>
  );
}

function MMSection({ title, children }) {
  return (
    <div className={styles.mobileSection}>
      <div className={styles.sectionLabel}>{title}</div>
      {children}
    </div>
  );
}

function SectionBlock({ title, children }) {
  return (
    <div className={styles.railSection}>
      <div className={styles.sectionLabel}>{title}</div>
      {children}
    </div>
  );
}

function MMList({ items, onClose }) {
  return (
    <div className={styles.list}>
      {items.map((it) => (
        <Link
          key={it.label}
          href={it.href || "#"}
          onClick={onClose}
          className={`${styles.listRow} ${it.all ? styles.listRowAccent : ""}`}
        >
          <span>
            {it.label}
            {it.all ? " →" : ""}
          </span>
          {it.count && <span className={styles.listRowCount}>{it.count}</span>}
        </Link>
      ))}
    </div>
  );
}

function MMTile({ label, img, href, onClose }) {
  return (
    <Link href={href || "#"} onClick={onClose} className={styles.tile}>
      <div
        className={styles.tileImg}
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className={styles.tileLabel}>{label}</div>
    </Link>
  );
}

function MMScrollRow({ items, onClose }) {
  return (
    <div className={styles.scrollRow}>
      {items.map((c) => (
        <Link
          key={c.label}
          href={c.href || "#"}
          onClick={onClose}
          className={styles.scrollTile}
        >
          <div
            className={styles.scrollTileImg}
            style={{ backgroundImage: `url(${c.img})` }}
          />
          <div className={styles.tileLabel}>{c.label}</div>
        </Link>
      ))}
    </div>
  );
}

function MMEmirateChip({ label, count, img, href, onClose }) {
  return (
    <Link href={href || "#"} onClick={onClose} className={styles.emirateChip}>
      <div
        className={styles.emirateThumb}
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className={styles.emirateText}>
        <div className={styles.emirateName}>{label}</div>
        <div className={styles.emirateCount}>{count}</div>
      </div>
    </Link>
  );
}

function MMFeatured({ featured: f, compact, onClose }) {
  if (!f) return null;
  return (
    <div className={compact ? styles.featuredCompact : ""}>
      <div className={styles.sectionLabel}>Предложение дня</div>
      <div className={styles.featuredCard}>
        <div
          className={styles.featuredImg}
          style={{ backgroundImage: `url(${f.img})` }}
        >
          {f.brand && <div className={styles.featuredBrand}>{f.brand}</div>}
        </div>
        <div className={styles.featuredBody}>
          <div className={styles.featuredName}>{f.name}</div>
          <div className={styles.featuredMeta}>{f.meta}</div>
          <div className={styles.featuredFoot}>
            <div className={styles.featuredPrice}>{f.price}</div>
            <PrimaryButton
              size="sm"
              trailingArrow
              href={f.href || "#"}
              onClick={onClose}
            >
              Подробнее
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

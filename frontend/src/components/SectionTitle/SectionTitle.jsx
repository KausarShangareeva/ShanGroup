import styles from "./SectionTitle.module.css";

/**
 * pills — инлайн-капсулы с изображениями, вставляемые в текст заголовка.
 * В title используйте плейсхолдер {0}, {1}, ... для позиции каждой капсулы.
 *
 * Пример:
 *   title="48 застройщиков {0} на одной странице"
 *   pills={[{ src: "/images/villa.jpg", color: "#e8d5f5" }]}
 *
 * highlight — подсветка слов серым фоном:
 *   [{ word: "застройщиков" }]
 */
function renderTitle(title, highlight, pills) {
  if (!highlight?.length && !pills?.length) return title;

  // Step 1: split by pill placeholders {0}, {1}, etc.
  const pillRegex = /\{(\d+)\}/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = pillRegex.exec(title)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        value: title.slice(lastIndex, match.index),
      });
    }
    segments.push({ type: "pill", index: parseInt(match[1], 10) });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < title.length) {
    segments.push({ type: "text", value: title.slice(lastIndex) });
  }

  // Step 2: apply highlights to text segments, then render pills
  const result = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];

    if (seg.type === "pill") {
      const pill = pills?.[seg.index];
      if (pill) {
        result.push(
          <span
            key={`pill-${i}`}
            className={styles.pill}
            style={pill.color ? { background: pill.color } : {}}
          >
            <img src={pill.src} alt="" className={styles.pillImg} />
          </span>,
        );
      }
      continue;
    }

    // Text segment — apply highlights
    if (!highlight?.length) {
      result.push(seg.value);
      continue;
    }

    let remaining = seg.value;
    while (remaining.length > 0) {
      let earliest = null;
      let earliestIdx = Infinity;

      for (const h of highlight) {
        const idx = remaining.toLowerCase().indexOf(h.word.toLowerCase());
        if (idx !== -1 && idx < earliestIdx) {
          earliestIdx = idx;
          earliest = h;
        }
      }

      if (!earliest) {
        result.push(remaining);
        break;
      }

      if (earliestIdx > 0) {
        result.push(remaining.slice(0, earliestIdx));
      }

      const matched = remaining.slice(
        earliestIdx,
        earliestIdx + earliest.word.length,
      );
      result.push(
        <span key={`hl-${i}-${earliestIdx}`} className={styles.highlight}>
          {matched}
        </span>,
      );

      remaining = remaining.slice(earliestIdx + earliest.word.length);
    }
  }

  return result;
}

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = "left",
  dark = false,
  mb,
  highlight,
  pills,
}) {
  return (
    <div
      className={`${styles.wrapper} ${styles[align]}`}
      style={mb !== undefined ? { marginBottom: mb } : {}}
    >
      {tag && (
        <span className={styles.tag} style={dark ? { color: "#c9963a" } : {}}>
          {tag}
        </span>
      )}
      <h2 className={styles.title} style={dark ? { color: "#fff" } : {}}>
        {renderTitle(title, highlight, pills)}
      </h2>
      {subtitle && (
        <p
          className={styles.subtitle}
          style={dark ? { color: "rgba(255,255,255,0.7)" } : {}}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

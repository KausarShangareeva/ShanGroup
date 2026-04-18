import emojiData from "emoji-datasource-apple/emoji.json";

// Переводим emoji-символ в unified codepoint (напр. "✏️" → "270f")
function getAppleImageUrl(emoji) {
  const codepoints = [...emoji]
    .map((c) => c.codePointAt(0).toString(16).toUpperCase())
    .filter((c) => c !== "FE0F") // убираем variation selector
    .join("-");

  const entry = emojiData.find(
    (e) =>
      e.unified === codepoints ||
      e.non_qualified === codepoints ||
      e.variations?.includes(codepoints)
  );

  if (!entry) return null;

  return `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${entry.unified.toLowerCase()}.png`;
}

export default function TagIcon({ icon, size = 18 }) {
  const src = getAppleImageUrl(icon);

  if (src) {
    return (
      <img
        src={src}
        alt={icon}
        width={size}
        height={size}
        style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
      />
    );
  }

  // fallback — нативный символ
  return (
    <span
      aria-hidden="true"
      style={{ fontSize: size * 0.9, lineHeight: 1, flexShrink: 0 }}
    >
      {icon}
    </span>
  );
}

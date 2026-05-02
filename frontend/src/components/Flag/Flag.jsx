// Crisp inline-SVG flags — no external react-world-flags dependency.
// All flags rendered at 4:3 ratio (~size px wide).
// Codes supported: US, EU, RU, GB, SA, AE.

export default function Flag({ code, size = 16 }) {
  const w = size;
  const h = Math.round(size * 0.72);
  const wrap = (kids) => (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 18"
      style={{
        borderRadius: 3,
        display: "block",
        boxShadow: "inset 0 0 0 .5px rgba(0,0,0,.15)",
      }}
    >
      {kids}
    </svg>
  );

  switch (code) {
    case "US":
      return wrap(
        <>
          <rect width="24" height="18" fill="#B22234" />
          {[1, 3, 5, 7, 9, 11, 13].map((i) => (
            <rect
              key={i}
              y={i * 1.385}
              width="24"
              height="1.385"
              fill="#fff"
            />
          ))}
          <rect width="10" height="9.7" fill="#3C3B6E" />
          {Array.from({ length: 30 }).map((_, i) => {
            const r = Math.floor(i / 6);
            const c = i % 6;
            return (
              <circle
                key={i}
                cx={1 + c * 1.6}
                cy={1 + r * 1.7}
                r=".35"
                fill="#fff"
              />
            );
          })}
        </>,
      );

    case "EU":
      return wrap(
        <>
          <rect width="24" height="18" fill="#003399" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            const cx = 12 + Math.cos(a) * 5.5;
            const cy = 9 + Math.sin(a) * 5.5;
            return (
              <circle key={i} cx={cx} cy={cy} r=".75" fill="#FFCC00" />
            );
          })}
        </>,
      );

    case "RU":
      return wrap(
        <>
          <rect width="24" height="6" y="0" fill="#fff" />
          <rect width="24" height="6" y="6" fill="#0033A0" />
          <rect width="24" height="6" y="12" fill="#DA291C" />
        </>,
      );

    case "GB":
      return wrap(
        <>
          <rect width="24" height="18" fill="#012169" />
          <path d="M0,0 L24,18 M24,0 L0,18" stroke="#fff" strokeWidth="2.5" />
          <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M12,0 V18 M0,9 H24" stroke="#fff" strokeWidth="3.5" />
          <path d="M12,0 V18 M0,9 H24" stroke="#C8102E" strokeWidth="1.8" />
        </>,
      );

    case "SA":
      return wrap(
        <>
          <rect width="24" height="18" fill="#006C35" />
          <text
            x="12"
            y="11"
            textAnchor="middle"
            fill="#fff"
            fontSize="5"
            fontFamily="serif"
            fontWeight="700"
          >
            العربية
          </text>
        </>,
      );

    case "AE":
      // UAE flag: red vertical band on left (1/4 width), green/white/black horizontal stripes on right
      return wrap(
        <>
          <rect width="24" height="6" y="0" x="6" fill="#00732F" />
          <rect width="24" height="6" y="6" x="6" fill="#fff" />
          <rect width="24" height="6" y="12" x="6" fill="#000" />
          <rect width="6" height="18" x="0" y="0" fill="#FF0000" />
        </>,
      );

    default:
      return wrap(<rect width="24" height="18" fill="#888" />);
  }
}

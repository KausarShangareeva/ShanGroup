// Hand-drawn line icons for the rich mega-menu, 1.6px stroke, currentColor.
// Direct port of the artifact's MMIcon. Names map: kind → SVG <g>.

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
};

const PATHS = {
  // Social
  ig: (
    <g {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
    </g>
  ),
  yt: (
    <g {...stroke}>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M10 9.5v5l4-2.5z" fill="currentColor" />
    </g>
  ),
  tg: (
    <g {...stroke}>
      <path d="M3 11l18-7-3 17-6-4-3 4-1-7 11-7-13 6z" />
    </g>
  ),
  wa: (
    <g {...stroke}>
      <path d="M4 20l1.5-4.5A8 8 0 1 1 8.5 18.5L4 20z" />
    </g>
  ),

  // About / company / content
  info: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.01" />
    </g>
  ),
  star: (
    <g {...stroke}>
      <path d="M12 3l2.6 6.3 6.4.5-4.9 4.2 1.5 6.5L12 17l-5.6 3.5 1.5-6.5L3 9.8l6.4-.5L12 3z" />
    </g>
  ),
  doc: (
    <g {...stroke}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" />
      <path d="M14 3v6h6M8 13h8M8 17h6" />
    </g>
  ),
  book: (
    <g {...stroke}>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z" />
      <path d="M4 17h14" />
    </g>
  ),
  help: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 16.5v.01" />
    </g>
  ),

  // Services
  passport: (
    <g {...stroke}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M9 17h6" />
    </g>
  ),
  biz: (
    <g {...stroke}>
      <rect x="3" y="7" width="18" height="14" rx="1.5" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </g>
  ),
  bank: (
    <g {...stroke}>
      <path d="M3 9l9-5 9 5" />
      <path d="M5 9v9M9 9v9M15 9v9M19 9v9M3 19h18" />
    </g>
  ),
  pen: (
    <g {...stroke}>
      <path d="M14 4l6 6-11 11H3v-6L14 4z" />
    </g>
  ),

  // Investment strategies
  trend: (
    <g {...stroke}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </g>
  ),
  key: (
    <g {...stroke}>
      <circle cx="8" cy="14" r="4" />
      <path d="M11 12l9-9 2 2-2 2 2 2-2 2-2-2-2 2" />
    </g>
  ),
  calendar: (
    <g {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </g>
  ),
  swap: (
    <g {...stroke}>
      <path d="M7 4l-4 4 4 4M3 8h14M17 12l4 4-4 4M21 16H7" />
    </g>
  ),

  // Investment programs
  shield: (
    <g {...stroke}>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </g>
  ),
  percent: (
    <g {...stroke}>
      <path d="M5 19L19 5" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </g>
  ),

  // Investment tools
  calc: (
    <g {...stroke}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </g>
  ),
  compare: (
    <g {...stroke}>
      <path d="M12 3v18M5 7l-2 2 2 2M19 17l2-2-2-2M3 9h7M14 15h7" />
    </g>
  ),
  chart: (
    <g {...stroke}>
      <path d="M3 21h18M5 17V9M10 17V5M15 17v-7M20 17V7" />
    </g>
  ),
};

export default function MMIcon({ kind, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {PATHS[kind] || PATHS.info}
    </svg>
  );
}

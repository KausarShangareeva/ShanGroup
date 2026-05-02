// Hand-drawn line icons — 1.5px stroke, square caps, currentColor.
// Faithful port of the artifact's hero-icons.jsx (+ IcClose from nav-extras).
//
// Lighter and more delicate than lucide-react's default 2px stroke; designed
// to pair with the editorial-neumorphic look (Hero, SearchBar, MegaMenus).

function Icon({ d, size = 20, sw = 1.5, fill = "none", children, vb = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      fill={fill}
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

export const IcChevron = ({ size = 14 }) => (
  <Icon size={size} d="M6 9l6 6 6-6" />
);

export const IcSearch = ({ size = 18 }) => (
  <Icon size={size}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);

export const IcPin = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const IcBuilding = ({ size = 16 }) => (
  <Icon size={size}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2M10 21v-3h4v3" />
  </Icon>
);

export const IcDollar = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M12 3v18" />
    <path d="M16 7c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 3 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3" />
  </Icon>
);

export const IcBed = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
    <path d="M3 14h18M3 18h18" />
    <circle cx="7" cy="11.5" r="1.5" />
  </Icon>
);

export const IcSliders = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Icon>
);

export const IcPhone = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Icon>
);

export const IcHeart = ({ size = 16 }) => (
  <Icon
    size={size}
    d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
  />
);

export const IcArrow = ({ size = 14, rotate = -45 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IcCheck = ({ size = 14 }) => (
  <Icon size={size} sw={2} d="M5 12l4 4 10-10" />
);

export const IcVerified = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l2.4 1.7 2.9-.4 1.3 2.6 2.6 1.3-.4 2.9L22 12l-1.7 2.4.4 2.9-2.6 1.3-1.3 2.6-2.9-.4L12 22l-2.4-1.7-2.9.4-1.3-2.6L2.8 16.8l.4-2.9L1.5 11.5l1.7-2.4-.4-2.9 2.6-1.3 1.3-2.6 2.9.4L12 2z"
      fill="#1c8a4a"
    />
    <path
      d="M8.5 12.5l2.5 2.5L16 9.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IcGrid = ({ size = 14 }) => (
  <Icon size={size}>
    <rect x="4" y="4" width="7" height="7" rx="1" />
    <rect x="13" y="4" width="7" height="7" rx="1" />
    <rect x="4" y="13" width="7" height="7" rx="1" />
    <rect x="13" y="13" width="7" height="7" rx="1" />
  </Icon>
);

export const IcList = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
);

export const IcMap = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
    <path d="M9 4v14M15 6v14" />
  </Icon>
);

export const IcStar = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
  </svg>
);

export const IcPlay = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4l14 8-14 8V4z" />
  </svg>
);

export const IcDiamond = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
    <path d="M2 9h20M9 3l-2 6 5 12M15 3l2 6-5 12" />
  </Icon>
);

export const IcTrend = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </Icon>
);

export const IcShield = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

export const IcGlobe = ({ size = 14 }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
  </Icon>
);

export const IcUsers = ({ size = 14 }) => (
  <Icon size={size}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M15 20c.5-2.5 2.5-4 4.5-4 1 0 2 .4 2.5 1" />
  </Icon>
);

export const IcCalendar = ({ size = 14 }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </Icon>
);

export const IcRocket = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M12 2c4 2 6 6 6 11l-3 2H9l-3-2c0-5 2-9 6-11z" />
    <path d="M9 15l-2 4 4-2M15 15l2 4-4-2" />
    <circle cx="12" cy="10" r="1.5" />
  </Icon>
);

// IcClose ported from nav-extras.jsx — kept here for the unified set.
export const IcClose = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M6 6l12 12M18 6l-12 12" />
  </svg>
);

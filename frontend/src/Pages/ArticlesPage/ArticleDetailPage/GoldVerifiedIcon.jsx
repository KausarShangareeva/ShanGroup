export default function GoldVerifiedIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id="goldVerified" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fedb37" />
          <stop offset="35%"  stopColor="#d1b464" />
          <stop offset="100%" stopColor="#9f7928" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#goldVerified)" />
      <polyline
        points="7 12.5 10.5 16 17 8.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

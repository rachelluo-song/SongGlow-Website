export default function LogoMark({ size = 30 }: { size?: number }) {
  // SongGlow stacked-layers mark (2026 rebrand): diamond over two chevrons
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 1.5 L21 7 L12 12.5 L3 7 Z"
        stroke="var(--logo-blue)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M3 11.5 L12 17 L21 11.5"
        stroke="var(--logo-blue)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 16.5 L12 22 L21 16.5"
        stroke="var(--logo-blue)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

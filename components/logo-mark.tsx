export default function LogoMark({ size }: { size?: number }) {
  // Only non-default sizes (the footer's 26px) are pinned inline; the nav's
  // default size stays CSS-controlled so responsive rules can adjust it.
  return (
    <span
      className="logo-mark"
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        style={size && size < 30 ? { width: 14, height: 14 } : undefined}
      >
        <path
          d="M4 16L10 6L14 13L20 6"
          stroke="#FBF9F4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

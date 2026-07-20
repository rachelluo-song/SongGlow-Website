import Link from "next/link";
import LogoMark from "./logo-mark";

/** Banner-style SongGlow logo: layers mark + two-tone wordmark + tagline. */
export default function Logo({
  size = "nav",
}: {
  size?: "nav" | "footer";
}) {
  return (
    <Link href="/" className={`logo logo-${size}`}>
      <LogoMark size={size === "nav" ? 34 : 26} />
      <span className="logo-text">
        <span className="logo-word">
          SONG<span className="logo-glow">GLOW</span>
        </span>
        <span className="logo-tag">PARTS, SOURCED.</span>
      </span>
    </Link>
  );
}

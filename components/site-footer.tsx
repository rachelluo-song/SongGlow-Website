import Link from "next/link";
import LogoMark from "./logo-mark";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <Link href="/" className="logo" style={{ fontSize: 18 }}>
            <LogoMark size={26} />
            SongGlow
          </Link>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-meta">
            © 2026 SongGlow. Electronic component sourcing.
          </div>
        </div>
      </div>
    </footer>
  );
}

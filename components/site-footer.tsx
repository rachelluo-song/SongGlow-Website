import Link from "next/link";
import Logo from "./logo";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <Logo size="footer" />
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/components">Components</Link>
            <Link href="/hardware">Hardware</Link>
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

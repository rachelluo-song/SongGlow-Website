import Link from "next/link";
import Logo from "./logo";

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <Logo size="footer" />
          <div className="footer-links">
            <Link href="/components">Components</Link>
            <Link href="/hardware">Hardware</Link>
            <Link href="/bom-sourcing">BOM Sourcing</Link>
            <Link href="/bom-rfq-template">BOM RFQ Template</Link>
            <Link href="/electronic-component-sourcing-china">
              Sourcing in China
            </Link>
            <Link href="/obsolete-electronic-components">Obsolete Components</Link>
            <Link href="/services">Services</Link>
            <Link href="/quality">Receiving Checks</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/about">About</Link>
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

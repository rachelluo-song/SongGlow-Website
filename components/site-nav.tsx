"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/hardware", label: "Hardware" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/** Section-aware: /hardware/screws/… still highlights "Hardware". */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15.8 15.8L20.5 20.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavSearch() {
  return (
    <form action="/search" className="nav-search" role="search">
      <SearchIcon />
      <input
        type="search"
        name="q"
        placeholder="Search part number…"
        aria-label="Search the catalog"
      />
    </form>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`nav ${menuOpen ? "menu-open" : ""}`}>
      <div className="nav-inner">
        <Logo size="nav" />
        <div className="nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(pathname, link.href) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-cta">
          <NavSearch />
          <Link href="/contact" className="btn btn-navy">
            Contact Us
          </Link>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="nav-menu">
        <NavSearch />
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(pathname, link.href) ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

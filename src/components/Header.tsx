import { useEffect, useRef, useState } from "react";
import type { HeaderData } from "#/lib/types";
import "./Header.css";

export default function Header({ header }: { header: HeaderData }) {
  const navLinks = [header.home, header.buy, header.rent, header.getInTouch];

  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-inner">
        <a href={header.companyName.url || "/"} className="logo">
          {header.companyName.label}
        </a>

        <nav className="nav-desktop" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.id} href={link.url || "#"} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`hamburger${isOpen ? " is-active" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <nav
        className={`nav-mobile${isOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a key={link.id} href={link.url || "#"} className="nav-mobile-link">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

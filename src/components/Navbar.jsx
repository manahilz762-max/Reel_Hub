
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Aperture, Menu, X, ArrowUpRight } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Work", path: "/work" },
  { name: "Team", path: "/portfolios" },
  { name: "Events", path: "/events" },
  { name: "Daily Blogs", path: "/daily-blogs" },
  { name: "Executive", path: "/administration" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="rh-header">
      <nav className="rh-navbar" aria-label="Main navigation">
        <Link
          to="/"
          className="rh-brand"
          aria-label="ReelHub home"
          onClick={closeMenu}
        >
          <span className="rh-brand-symbol" aria-hidden="true">
            <Aperture className="rh-aperture" size={30} strokeWidth={1.1} />
            <span className="rh-symbol-letter">R</span>
          </span>

          <span className="rh-brand-copy">
            <span className="rh-wordmark">
              REEL<span>HUB</span>
            </span>
            <span className="rh-tagline">
              UNIVERSITY MEDIA COLLECTIVE
            </span>
          </span>
        </Link>

        <div className={`rh-nav-links ${menuOpen ? "rh-nav-open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `rh-nav-link ${isActive ? "rh-nav-active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="rh-contact-mobile"
            onClick={closeMenu}
          >
            Let&apos;s Talk <ArrowUpRight size={16} />
          </Link>
        </div>

        <Link to="/contact" className="rh-contact-button">
          <span>Let&apos;s Talk</span>
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </Link>

        <button
          className="rh-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </header>
  );
}

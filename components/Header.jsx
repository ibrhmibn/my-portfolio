"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/#hero", label: "HOME" },
  { href: "/#work", label: "WORK" },
  { href: "/#what-i-can-do", label: "WHAT CAN I DO?" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#awards", label: "AWARDS" },
];

export default function Header({ alwaysShowBackToTop }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(alwaysShowBackToTop || window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysShowBackToTop]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickAway = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`nav-bar ${scrolled ? "scrolled" : ""} ${menuOpen ? "nav-bar--expanded" : ""}`}
      >
        <div className="nav-mobile-header">
          <a href="/" className="nav-left">
            <div className="nav-logo">IB</div>
            <div className="nav-brand">IBRAHIM.EXE</div>
          </a>
          <ThemeToggle className="nav-theme-toggle nav-theme-toggle--mobile" />
          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Selalu dirender; dibuka/ditutup lewat CSS (.nav-bar--expanded) */}
        <div className="nav-mobile-menu" aria-hidden={!menuOpen}>
          <div className="nav-mobile-menu-inner">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                [ {l.label} ]
              </a>
            ))}
            <a href="/#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
              [ HIRE ME ]
            </a>
          </div>
        </div>

        <div className="nav-center">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              [ {l.label} ]
            </a>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle className="nav-theme-toggle nav-theme-toggle--desktop" />
          <a href="/#contact" className="nav-cta">
            [ HIRE ME ]
          </a>
        </div>
      </nav>

      {showBackToTop && !menuOpen && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function WorkHeader() {
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
      setShowBackToTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav ref={navRef} className={`nav-bar ${scrolled ? "scrolled" : ""} ${menuOpen ? "nav-bar--expanded" : ""}`}>
        <div className="nav-mobile-header">
          <a href="/" className="nav-left">
            <div className="nav-logo">IB</div>
            <div className="nav-brand">IBRAHIM</div>
          </a>
          <ThemeToggle className="md:hidden nav-theme-toggle" style={{ position: 'relative', zIndex: 210 }} />
          <button className="md:hidden nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'relative', zIndex: 210 }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-menu-inner">
              <a href="/#contact" className="nav-cta" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Hire Me</a>
            </div>
          </div>
        )}
        <div className="nav-right">
          <ThemeToggle className="nav-theme-toggle hidden md:inline-flex" style={{ marginRight: 8 }} />
          <a href="/#contact" className="nav-cta hidden md:block">Hire Me</a>
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
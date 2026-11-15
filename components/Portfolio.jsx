"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, X, Code2, FlaskConical, Rocket, Trophy, GraduationCap, Minus, Instagram } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "../lib/projects";
import Header from "./Header";
import TypewriterTitle from "./TypewriterTitle";
import Reveal from "./Reveal";
import XIcon from "../components/XIcon";
import RetroWindow from "./RetroWindow";

const SKILLS = [
  { group: "Backend", items: ["PHP", "CodeIgniter 4", "REST APIs", "Query Builder & raw SQL", "Session & role-based auth"] },
  { group: "Data & Ops", items: ["MySQL / MariaDB", "PhpSpreadsheet", "RFID & QR integration", ".env credential hygiene", "Git & GitHub"] },
  { group: "Frontend", items: ["JavaScript", "jQuery", "Bootstrap", "Chart.js dashboards", "Responsive layouts"] },
  { group: "Craft", items: ["Clean Code", "Responsive Design", "UI Precision", "Performance Optimization", "Accessibility"] },
];

const WHAT_I_CAN_DO = [
  {
    group: "Web Development",
    description:
      "Building and testing functional digital systems, from database-driven web applications to RFID and QR-based solutions, with a focus on reliability, usability, and practical problem-solving.",
    visual: "qa",
    size: "large",
    items: ["Web Development", "MySQL", "PHP", "Python", "HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Digital Craftsmanship",
    description:
      "Treating every line of code like a craftsman treats raw material — with patience, precision, and pride in the details. Focused on building clean, maintainable, and user-friendly interfaces that feel effortless to use.",
    visual: "va",
    items: ["Clean Code", "UI Precision", "Responsive Design", "Detail-Oriented", "Performance Tuning", "Pixel-Perfect Layouts"],
  },
];

// Ikon "desktop Windows jadul" untuk bagian What I Can Do
const TECH = [
  { src: "/images/logos/html.png", label: "HTML" },
  { src: "/images/logos/css.png", label: "CSS" },
  { src: "/images/logos/js.png", label: "JavaScript" },
  { src: "/images/logos/react.svg", label: "React" },
  { src: "/images/logos/nodejs.png", label: "Node.js" },
  { src: "/images/logos/php.png", label: "PHP" },
  { src: "/images/logos/mysql.png", label: "MySQL" },
  { src: "/images/logos/python.png", label: "Python" },
  { src: "/images/logos/nextjs.png", label: "Next.js" },
  { src: "/images/logos/tailwind.svg", label: "Tailwind" },
  { src: "/images/workspace/google.png", label: "Google" },
  { src: "/images/workspace/trello.png", label: "Trello" },
  { src: "/images/workspace/canva.png", label: "Canva" },
  { src: "/images/workspace/figma.png", label: "Figma" },
  { src: "/images/workspace/capcut.png", label: "CapCut" },
];

const SOCIALS = [
  { label: "Email", value: "ibrahimtyo39@gmail.com", href: "mailto:ibrahimtyo39@gmail.com", icon: Mail },
  { label: "GitHub", value: "github.com/ibrhmibn", href: "https://github.com/ibrhmibn", icon: Github },
  { label: "Instagram", value: "instagram.com/ibnu_satryo", href: "https://www.instagram.com/ibnu_satryo/", icon: Instagram },
];

const CARDS = [
  "Frontend Dev.",
  "Detail-Oriented",
  "Reliable",
  "Organized",
  "Digital Craftsman",
  "Quick Learner",
  "Creative",
  "Adaptable",
  "User-Focused",
  "Problem Solver",
];

const CARD_SCATTER = [
  { rot: -7, x: 6, y: -4 },
  { rot: 5, x: -8, y: 3 },
  { rot: -3, x: 10, y: 6 },
  { rot: 9, x: -5, y: -6 },
  { rot: -10, x: 4, y: 5 },
  { rot: 4, x: -10, y: -2 },
  { rot: -5, x: 9, y: -5 },
  { rot: 8, x: -3, y: 7 },
  { rot: -8, x: 7, y: 2 },
  { rot: 3, x: -6, y: -7 },
];

const CURRENTLY = [
  { icon: Code2, label: "Building", detail: "Frontend Projects" },
  { icon: FlaskConical, label: "Studying", detail: "UIN Ponorogo" },
  { icon: Rocket, label: "Crafting", detail: "Clean Interfaces" },
];

/* ---------- Ornamen retro ---------- */

// Smiley 8-bit (pixel art murni dari <rect>, tanpa file gambar)
function PixelSmiley({ size = 40, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="3" y="0" width="6" height="12" fill="#ffe600" />
      <rect x="1" y="2" width="10" height="8" fill="#ffe600" />
      <rect x="2" y="1" width="8" height="10" fill="#ffe600" />
      <rect x="3" y="3" width="2" height="2" fill="#1a1a2e" />
      <rect x="7" y="3" width="2" height="2" fill="#1a1a2e" />
      <rect x="3" y="7" width="1" height="1" fill="#1a1a2e" />
      <rect x="4" y="8" width="4" height="1" fill="#1a1a2e" />
      <rect x="8" y="7" width="1" height="1" fill="#1a1a2e" />
    </svg>
  );
}

// Garis pemisah antar-section: putus-putus + bintang pixel
function Divider() {
  return (
    <div className="pixel-divider" aria-hidden="true">
      <i />
      <span>✦</span>
      <span>✦</span>
      <span>✦</span>
      <i />
    </div>
  );
}

// Bintang pixel yang berkedip (posisi diatur lewat style)
function Sparkle({ style, children = "✦" }) {
  return (
    <span className="sparkle" style={style} aria-hidden="true">
      {children}
    </span>
  );
}

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const heroRef = useRef(null);
  const albumRef = useRef(null);
  const touchX = useRef(null);
  const [albumScale, setAlbumScale] = useState(1);
  const [activeIndex, setActiveIndex] = useState(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardPaused, setCardPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = (index) => {
    const normalized = ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    const handleMouse = (e) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const syncMarqueeSpeed = () => {
      const enterSeconds = 8;
      const pxPerSecond = window.innerWidth / enterSeconds;
      const loopDistance = track.scrollWidth / 2;
      const loopSeconds = loopDistance / pxPerSecond;
      heroRef.current?.style.setProperty("--marquee-loop-duration", `${loopSeconds}s`);
    };

    syncMarqueeSpeed();
    // Font Press Start 2P dimuat async -> hitung ulang setelah font siap
    if (document.fonts?.ready) document.fonts.ready.then(syncMarqueeSpeed);
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  // Carousel Work Gallery: tampilan sama persis dengan desktop, hanya diperkecil
  // proporsional agar pas di lebar layar (desktop = skala 1).
  useEffect(() => {
    const el = albumRef.current;
    if (!el) return;
    const BASE_WIDTH = 720;
    const update = () => setAlbumScale(Math.min(1, el.clientWidth / BASE_WIDTH));
    update();
    window.addEventListener("resize", update);
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(el);
    }
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (cardPaused) return;
    const id = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 1500);
    return () => clearInterval(id);
  }, [cardPaused]);

  return (
    <div ref={rootRef} className="portfolio-root">
      <Header />

      {/* ============ HERO ============ */}
      <section id="hero" className="hero-root" ref={heroRef}>
        <div className="bg-name-marquee">
          <div className="bg-name-track" ref={marqueeTrackRef}>
            <span className="bg-name-text">IBRAHIM IBNU SATRYO</span>
            <span className="bg-name-text">IBRAHIM IBNU SATRYO</span>
          </div>
        </div>

        {["t1", "t2", "t3", "t4", "b1", "b2", "b3", "b4"].map((pos) => (
          <div key={pos} className={`bg-name-marquee bg-name-marquee--mobile-extra bg-name-marquee--${pos}`} aria-hidden="true">
            <div className="bg-name-track">
              <span className="bg-name-text">IBRAHIM IBNU SATRYO</span>
              <span className="bg-name-text">IBRAHIM IBNU SATRYO</span>
            </div>
          </div>
        ))}

        {/* bintang-bintang pixel */}
        <Sparkle style={{ top: "22%", left: "8%", fontSize: 28 }} />
        <Sparkle style={{ top: "34%", right: "10%", fontSize: 20, animationDelay: "0.4s" }} />
        <Sparkle style={{ bottom: "26%", left: "14%", fontSize: 18, animationDelay: "0.8s" }} />
        <Sparkle style={{ top: "16%", right: "28%", fontSize: 16, animationDelay: "0.2s" }} />
        <Sparkle style={{ bottom: "18%", right: "8%", fontSize: 26, animationDelay: "0.6s" }} />

        {/* Foto profil di dalam monitor CRT retro */}
        <div className="crt-wrap">
          <div className="crt">
            <div className="crt-screen">
              <img src="/images/profile.png" alt="IBRAHIM IBNU SATRYO" className="profile-image" draggable={false} />
              <div className="crt-scanlines" />
              <div className="crt-titlebar">C:\IBRAHIM\PROFILE.PNG</div>
            </div>
            <div className="crt-plate">
              <span>IB-9000</span>
              <i className="crt-led" />
            </div>
          </div>
          <div className="crt-neck" />
          <div className="crt-base" />
          <PixelSmiley size={56} className="hero-smiley" />
        </div>

        <div className="hero-text">
          <div className="hero-status">
            <span className="blink">●</span> OPEN FOR WORK
          </div>
          <div className="hero-name">FRONTEND DEVELOPER · CRAFTSMAN</div>
          <div className="hero-statement">Old school vibes. New school websites.</div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-text blink">▼ SCROLL DOWN ▼</span>
        </div>
      </section>

      <Divider />

      {/* ============ WORK GALLERY ============ */}
      <section id="work" className="section">
        <RetroWindow title="C:\PORTFOLIO\WORK_GALLERY.EXE" status="📁 Selected projects · click a window to switch">
          <Reveal>
            <div className="work-header">
              <div>
                <div className="section-label">&gt; SELECTED WORK</div>
                <TypewriterTitle text="Work Gallery" />
                <div className="section-desc">A collection of systems, digital projects, and technical work I've built.</div>
              </div>
              <Link href="/work" className="work-album-btn-top">
                VIEW MORE PROJECTS <ExternalLink size={14} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="work-album"
              ref={albumRef}
              style={{ height: 260 * albumScale + 24 }}
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchX.current == null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 40) goTo(activeIndex + (dx < 0 ? 1 : -1));
              }}
            >
              <div className="work-album-inner" style={{ transform: `scale(${albumScale})` }}>
                {PROJECTS.map((project, index) => {
                  const total = PROJECTS.length;

                  let diff = (index - activeIndex + total) % total;
                  if (diff > total / 2) diff -= total;

                  const isCenter = diff === 0;
                  const distance = Math.abs(diff);
                  const dir = isCenter ? 0 : diff / distance;

                  const style = isCenter
                    ? { transform: "translate(-50%, -50%) scale(1)", zIndex: 5, opacity: 1 }
                    : {
                      transform: `translate(calc(-50% + ${dir * (200 + (distance - 1) * 130)}px), -50%) scale(${Math.max(0.55, 1 - distance * 0.28)})`,
                      zIndex: 5 - distance,
                      opacity: distance <= 2 ? Math.max(0, 0.85 - (distance - 1) * 0.55) : 0,
                      pointerEvents: distance <= 2 ? "auto" : "none",
                    };

                  return (
                    <div
                      key={project.num}
                      className={`work-album-item${isCenter ? " work-album-item-center" : ""}`}
                      style={style}
                      onClick={() => !isCenter && goTo(index)}
                    >
                      <div className="work-album-frame">
                        <div className="work-album-bar">
                          <span className="retro-dots" aria-hidden="true">
                            <i className="dot dot-red" />
                            <i className="dot dot-yellow" />
                            <i className="dot dot-green" />
                          </span>
                          <span className="work-album-name">{project.title}</span>
                        </div>
                        <img src={project.image} alt={project.title} className="work-album-img" draggable={false} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="work-info" key={activeProject.num}>
              <h3 className="work-info-title">{activeProject.title}</h3>
              <p className="work-info-desc">{activeProject.desc}</p>

              <a
                href={activeProject.link}
                className="work-info-link"
                target={activeProject.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                ▶ {activeProject.linkText}
              </a>
            </div>
          </Reveal>
        </RetroWindow>
      </section>

      <Divider />

      {/* ============ WHAT I CAN DO ============ */}
      <section id="what-i-can-do" className="section">
        <div className="what-i-can-do-grid">
          <div className="what-i-can-do-left">
            <Reveal>
              <RetroWindow title="MY_COMPUTER" status={`${TECH.length} object(s)`}>
                <div className="section-label">&gt; MY CAPABILITIES</div>
                <TypewriterTitle text="What Can I Do?" />
                <div className="what-i-can-do-desc">
                  I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.
                </div>
                <div className="tech-stack">
                  {TECH.map((t) => (
                    <div className="tech-stack-item" key={t.label}>
                      <img src={t.src} alt={t.label} draggable={false} />
                      <span className="tech-stack-label">{t.label}</span>
                    </div>
                  ))}
                </div>
              </RetroWindow>
            </Reveal>
          </div>

          <div className="what-i-can-do-right">
            {WHAT_I_CAN_DO.map((group, index) => (
              <Reveal key={group.group} delay={150 + index * 120}>
                <RetroWindow
                  title={`0${index + 1}_${group.group.replace(/\s+/g, "_").toUpperCase()}`}
                  className={`bento-card ${group.size === "large" ? "bento-large" : "bento-medium"}`}
                  bodyClassName="bento-body"
                >
                  <div className="bento-header">
                    <div className="bento-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="bento-category">{group.group}</div>
                  </div>

                  <div className="bento-visual">
                    {index === 0 && <img src="/images/gif/coding.gif" alt="Web Development & QA" className="bento-gif" draggable={false} />}
                    {index === 1 && <img src="/images/gif/assistant.gif" alt="Virtual Assistance" className="bento-gif" draggable={false} />}
                    {index === 2 && <img src="/images/gif/social.gif" alt="Content & Digital" className="bento-gif" draggable={false} />}
                  </div>

                  <p className="bento-desc">{group.description}</p>

                  <div className="bento-skills">
                    {group.items.map((item) => (
                      <span key={item} className="bento-tag">{item}</span>
                    ))}
                  </div>
                </RetroWindow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ============ ABOUT ============ */}
      <section id="about" className="section">
        <RetroWindow title="C:\PORTFOLIO\ABOUT_ME.TXT" status="Ln 1, Col 1 · UTF-8">
          <Reveal>
            <div className="section-label">&gt; ABOUT ME</div>
            <TypewriterTitle text={isMobile ? "Frontend Dev.\nCraftsman." : "Frontend Developer. Craftsman."} />
          </Reveal>

          <Reveal delay={100}>
            <div className="about-profile-card">
              <PixelSmiley size={48} className="about-sticker" />
              <div className="about-profile-header">
                <div className="about-profile-image-wrapper">
                  <img src="/images/about/profile.png" alt="Profile" className="about-profile-image" draggable={false} />
                </div>
                <div className="about-profile-info">
                  <div className="about-profile-name">
                    IBRAHIM IBNU SATRYO
                    <img src="/images/about/badge.png" alt="Verified" className="about-profile-badge" draggable={false} />
                  </div>
                  <div className="about-profile-stats">
                    <div className="about-stat-item">
                      <span className="about-stat-label">PROJECTS</span>
                      <span className="about-stat-value">4</span>
                    </div>
                    <div className="about-stat-item">
                      <span className="about-stat-label">CERTIFICATES</span>
                      <span className="about-stat-value">1</span>
                    </div>
                    <div className="about-stat-item">
                      <span className="about-stat-label">STMJ GRADUATED</span>
                      <span className="about-stat-value">2025</span>
                    </div>
                  </div>
                  <div className="about-description">
                    <p>
                      I am a frontend developer who believes that great digital products are built the way a craftsman builds furniture — with patience, precision, and pride in every detail. I focus on creating clean, maintainable interfaces that feel effortless to use, combining technical skill with an eye for design. Every project is an opportunity to refine my craft, learn something new, and deliver work that speaks for itself.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-bottom-row">
                <div className="currently-strip">
                  <div className="currently-strip-label">&gt; CURRENTLY</div>
                  <div className="currently-strip-items">
                    {CURRENTLY.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div className="currently-item" key={item.label}>
                          <span className="currently-icon">
                            <Icon size={16} strokeWidth={2} />
                          </span>
                          <div className="currently-text">
                            <div className="currently-item-label">{item.label}</div>
                            <div className="currently-item-detail">{item.detail}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="card-stack">
                  <div
                    className="card-stack-container"
                    onClick={() => setCardIndex((prev) => (prev + 1) % CARDS.length)}
                    onMouseEnter={() => setCardPaused(true)}
                    onMouseLeave={() => setCardPaused(false)}
                  >
                    {CARDS.map((trait, i) => {
                      const offset = (i - cardIndex + CARDS.length) % CARDS.length;
                      const isExiting = offset === CARDS.length - 1;
                      if (offset > 2 && !isExiting) return null;

                      const scatter = CARD_SCATTER[i];
                      let style;

                      if (isExiting) {
                        style = {
                          "--tx": `${scatter.x + 140}px`,
                          "--ty": `${scatter.y - 60}px`,
                          "--rot": `${scatter.rot + 40}deg`,
                          "--sc": 0.85,
                          "--op": 0,
                          zIndex: 5,
                        };
                      } else {
                        const depth = offset;
                        style = {
                          "--tx": `${scatter.x + depth * 10}px`,
                          "--ty": `${scatter.y + depth * 8}px`,
                          "--rot": `${scatter.rot + depth * (scatter.rot >= 0 ? 5 : -5)}deg`,
                          "--sc": 1 - depth * 0.045,
                          "--op": depth === 0 ? 1 : 0.55 + (2 - depth) * 0.15,
                          zIndex: 30 - depth * 10,
                        };
                      }

                      return (
                        <div
                          key={trait}
                          className={`card-stack-card${offset === 0 ? " card-stack-card-front" : ""}`}
                          style={style}
                        >
                          <div className="card-stack-label">TRAIT</div>
                          <div className="card-stack-value">{trait}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </RetroWindow>
      </section>

      <Divider />

      {/* ============ AWARDS ============ */}
      <section id="awards" className="section">
        <RetroWindow title="C:\PORTFOLIO\AWARDS\" status="3 file(s)">
          <Reveal>
            <div className="section-label">&gt; RECOGNITION</div>
            <TypewriterTitle text="Awards and Achievements" />
            <div className="section-desc">
              A collection of academic and professional recognitions that reflect my dedication to excellence.
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="awards-layout">
              <img src="/images/awards/awards.png" alt="Awards" className="awards-img" />
              <div className="awards-column">
                <div className="award-item" style={{ cursor: "default" }}>
                  <div className="award-icon"><GraduationCap size={18} /></div>
                  <div className="award-title">Dean's List — UIN Ponorogo</div>
                </div>
                <div className="award-item" style={{ cursor: "default" }}>
                  <div className="award-icon"><Trophy size={18} /></div>
                  <div className="award-title">Best Capstone Project</div>
                </div>
                <div className="award-item" style={{ cursor: "default" }}>
                  <div className="award-icon"><Trophy size={18} /></div>
                  <div className="award-title">Sertifikasi Frontend Developer</div>
                </div>
              </div>
            </div>
          </Reveal>
        </RetroWindow>
      </section>

      <Divider />

      {/* ============ CONTACT ============ */}
      <section id="contact" className="section">
        <RetroWindow title="C:\PORTFOLIO\CONTACT.EXE" status="Waiting for your message... ▌">
          <div className="contact-grid">
            <div className="contact-left">
              <Reveal>
                <div className="contact-eyebrow">&gt; GET IN TOUCH</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="contact-headline">
                  LET'S<br />
                  <span className="contact-headline-accent">WORK</span><br />
                  TOGETHER
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="contact-description">Looking for the next problem worth solving.</p>
              </Reveal>
              <Reveal delay={300}>
                <p className="contact-secondary">
                  I am open to freelance, contract, and full-time opportunities. If you have a project that deserves careful craftsmanship — clean code, thoughtful design, and attention to detail — I would love to hear from you. Let's build something worth keeping.
                </p>
              </Reveal>
            </div>

            <div className="contact-right">
              <div className="contact-cards">
                <Reveal delay={200}>
                  <a href="mailto:ibrahimtyo39@gmail.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                    <span className="contact-card-number">01</span>
                    <div className="contact-card-icon"><Mail size={20} /></div>
                    <div className="contact-card-info">
                      <div className="contact-card-label">EMAIL</div>
                      <div className="contact-card-value">ibrahimtyo39@gmail.com</div>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={280}>
                  <a href="https://instagram.com/ibnu_satryo" className="contact-card" target="_blank" rel="noopener noreferrer">
                    <span className="contact-card-number">02</span>
                    <div className="contact-card-icon"><Instagram size={20} /></div>
                    <div className="contact-card-info">
                      <div className="contact-card-label">INSTAGRAM</div>
                      <div className="contact-card-value">@ibnu_satryo</div>
                    </div>
                    <ExternalLink size={16} className="contact-card-arrow" />
                  </a>
                </Reveal>

                <Reveal delay={360}>
                  <a href="https://x.com/ibrhmibn" className="contact-card" target="_blank" rel="noopener noreferrer">
                    <span className="contact-card-number">03</span>
                    <div className="contact-card-icon"><XIcon size={20} /></div>
                    <div className="contact-card-info">
                      <div className="contact-card-label">X</div>
                      <div className="contact-card-value">@ibrhmibn</div>
                    </div>
                    <ExternalLink size={16} className="contact-card-arrow" />
                  </a>
                </Reveal>
                <Reveal delay={440}>
                  <a href="https://github.com/ibrhmibn" className="contact-card" target="_blank" rel="noopener noreferrer">
                    <span className="contact-card-number">04</span>
                    <div className="contact-card-icon"><Github size={20} /></div>
                    <div className="contact-card-info">
                      <div className="contact-card-label">GITHUB</div>
                      <div className="contact-card-value">ibrhmibn</div>
                    </div>
                    <ExternalLink size={16} className="contact-card-arrow" />
                  </a>
                </Reveal>
              </div>
              <Reveal delay={440}>
                <button className="contact-cta" onClick={() => { setIsModalOpen(true); setIsModalMinimized(false); }}>
                  SEND ME A MESSAGE →
                </button>
              </Reveal>
            </div>
          </div>
        </RetroWindow>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="footer-links">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="footer-link blink-link" target="_blank" rel="noopener noreferrer">
              [ {s.label.toUpperCase()} ]
            </a>
          ))}
          <a href="https://x.com/ibrhmibn" className="footer-link blink-link" target="_blank" rel="noopener noreferrer">
            [ X ]
          </a>
        </div>
        <div className="footer-text">© 199X – {new Date().getFullYear()} IBRAHIM IBNU SATRYO · ALL RIGHTS RESERVED</div>
        <div className="footer-best">
          <PixelSmiley size={24} />
          <span>BEST VIEWED IN 800x600 RESOLUTION</span>
          <PixelSmiley size={24} />
        </div>
      </footer>

      {/* ============ MODAL KONTAK (logika tidak berubah) ============ */}
      {isModalOpen && (
        <div className={`contact-modal${isModalMinimized ? " contact-modal--minimized" : ""}`}>
          <div className="contact-modal-header" onClick={() => isModalMinimized && setIsModalMinimized(false)}>
            <span className="retro-dots" aria-hidden="true">
              <i className="dot dot-red" />
              <i className="dot dot-yellow" />
              <i className="dot dot-green" />
            </span>
            <h3 className="contact-modal-title">NEW_MESSAGE.EXE</h3>
            <div className="contact-modal-controls">
              <button
                type="button"
                className="contact-modal-icon-btn contact-modal-minimize-btn"
                aria-label={isModalMinimized ? "Expand" : "Minimize"}
                onClick={(e) => { e.stopPropagation(); setIsModalMinimized((v) => !v); }}
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label="Close"
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isModalMinimized && (
            <div className="contact-modal-inner">
              <form
                className="contact-modal-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const data = {
                    name: form.name.value.trim(),
                    email: form.email.value.trim(),
                    message: form.message.value.trim(),
                  };

                  setFormStatus("submitting");

                  try {
                    await fetch('https://script.google.com/macros/s/AKfycbwV9F9HUEoiTJ0uZ0bKT80D991zShqlqfz6vBxtNVDVQBm4q1nVOnRFRSwDtRDetdJ4/exec', {
                      method: 'POST',
                      mode: 'no-cors',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    });
                    setFormStatus("success");
                    form.reset();
                    setIsModalOpen(false);
                    setShowSuccessModal(true);
                  } catch (error) {
                    setFormStatus("error");
                  }
                }}
              >
                <div className="contact-modal-field">
                  <label className="contact-modal-label">Full Name</label>
                  <input type="text" name="name" className="contact-modal-input" placeholder="Your full name" required />
                </div>

                <div className="contact-modal-field">
                  <label className="contact-modal-label">Email Address</label>
                  <input type="email" name="email" className="contact-modal-input" placeholder="your.email@example.com" required />
                </div>

                <div className="contact-modal-field contact-modal-field--grow">
                  <label className="contact-modal-label">Message</label>
                  <textarea rows="6" name="message" className="contact-modal-input" placeholder="Tell me about your project..." required />
                </div>

                <button type="submit" className="contact-modal-submit" disabled={formStatus === "submitting"}>
                  {formStatus === "submitting" ? "SENDING..." : formStatus === "success" ? "MESSAGE SENT" : "SEND MESSAGE →"}
                </button>

                {formStatus === "error" && (
                  <div className="contact-modal-error">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-modal-bar">
              <span className="retro-dots" aria-hidden="true">
                <i className="dot dot-red" />
                <i className="dot dot-yellow" />
                <i className="dot dot-green" />
              </span>
              <span className="retro-title">SUCCESS.EXE</span>
              <button className="success-modal-close" onClick={() => setShowSuccessModal(false)} aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="success-modal-content">
              <div className="success-modal-icon">✓</div>
              <h3 className="success-modal-title">Message Sent!</h3>
              <p className="success-modal-text">Thanks for reaching out. I'll get back to you as soon as possible.</p>
              <button className="success-modal-btn" onClick={() => setShowSuccessModal(false)}>
                CONTINUE BROWSING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
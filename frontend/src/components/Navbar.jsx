// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import logo from "../assets/Logo.png";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const drawerRef = useRef(null);

  // ── Scroll → glass + shadow ──
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Close drawer on Esc ──
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // ── Click outside to close ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // ── Prevent body scroll when drawer is open ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (href) => {
    setActiveSection(href);
    setIsOpen(false);

    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 88; // header height + buffer
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-500
          ${
            hasScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(14,165,233,0.10)] border-b border-sky-100/60"
              : "bg-white/60 backdrop-blur-lg border-b border-white/30"
          }
        `}
      >
        {/* Subtle gradient line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />

        <nav
          className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-16 sm:h-20 items-center justify-between gap-6">
            {/* ── Logo & Brand ── */}
            <a
              href="/"
              className="group flex items-center gap-3.5 sm:gap-4 flex-shrink-0"
              aria-label="Dunhinda Lanka - Pure Water (Pvt) Ltd"
            >
              <div className="relative">
                <div className="absolute inset-[-6px] rounded-full bg-sky-400/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                <img
                  src={logo}
                  alt="Dunhinda Lanka logo"
                  className="relative h-11 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 group-hover:text-sky-700 transition-colors">
                  Dunhinda Lanka
                </span>
              </div>
            </a>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => scrollToSection(href)}
                  className={`
                    relative px-4 lg:px-5 py-2.5 text-sm lg:text-base font-medium rounded-xl
                    transition-all duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                    ${
                      activeSection === href
                        ? "text-sky-700 bg-sky-50/90 font-semibold shadow-sm"
                        : "text-slate-700 hover:text-sky-700 hover:bg-sky-50/40"
                    }
                  `}
                >
                  {label}
                  {activeSection === href && (
                    <span className="absolute inset-x-4 bottom-1.5 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* ── Desktop CTA ── */}
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="
                hidden md:inline-flex items-center gap-2.5
                px-6 py-3 rounded-xl text-sm lg:text-base font-semibold
                text-white bg-gradient-to-r from-sky-500 to-blue-600
                shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35
                hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
              "
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C12 2 4 10.5 4 15a8 8 0 0016 0c0-4.5-8-13-8-13z" />
              </svg>
              Contact Us
            </button>

            {/* ── Mobile Hamburger ── */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="
                md:hidden flex items-center justify-center h-11 w-11 rounded-xl
                text-slate-700 hover:bg-sky-50 hover:text-sky-700
                active:bg-sky-100 transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
              "
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Overlay ── */}
      <div
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
        className={`
          fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm
          transition-opacity duration-400 md:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ── Mobile Drawer ── */}
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`
          fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm
          bg-white/95 backdrop-blur-xl shadow-2xl
          transition-transform duration-500 ease-out
          md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100/80">
          <div className="flex items-center gap-3.5">
            <img
              src={logo}
              alt="Dunhinda Lanka"
              className="h-10 w-auto object-contain"
            />
            <div>
              <p className="text-lg font-bold text-slate-800">Dunhinda Lanka</p>
              <p className="text-xs font-medium uppercase tracking-wide text-sky-600 mt-0.5">
                Pure Water
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-8 space-y-2">
          {NAV_LINKS.map(({ label, href }, i) => (
            <button
              key={href}
              type="button"
              onClick={() => scrollToSection(href)}
              className={`
                group flex w-full items-center gap-4 px-5 py-4 rounded-xl text-base font-medium
                transition-all duration-400 border
                ${
                  activeSection === href
                    ? "bg-sky-50/80 border-sky-100 text-sky-700"
                    : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }
                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
              `}
              style={{ transitionDelay: isOpen ? `${i * 60 + 100}ms` : "0ms" }}
            >
              <div
                className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                  activeSection === href
                    ? "bg-sky-500"
                    : "bg-slate-300 group-hover:bg-slate-400"
                } transition-colors`}
              />
              {label}
              {activeSection === href && (
                <svg
                  className="ml-auto h-5 w-5 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </nav>

        {/* CTA + tagline */}
        <div className="border-t border-slate-100/80 p-6">
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="
              flex w-full items-center justify-center gap-3 py-4 rounded-xl text-base font-semibold
              text-white bg-gradient-to-r from-sky-500 to-blue-600
              shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35
              active:scale-[0.98] transition-all duration-300
            "
          >
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2C12 2 4 10.5 4 15a8 8 0 0016 0c0-4.5-8-13-8-13z" />
            </svg>
            Contact Us
          </button>

          <p className="mt-5 text-center text-xs uppercase tracking-wider text-slate-400">
            Pure · Natural · Refreshing
          </p>
        </div>
      </div>
    </>
  );
}

// src/components/Footer.jsx
import logo from "../assets/Logo.png";
import footerBg from "../assets/Footer.png";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/dunhindalanka",
    label: "Facebook",
    icon: (
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-7H8v-2.88h2.44V9.8c0-2.42 1.44-3.76 3.64-3.76 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5v1.81H16.8L16.3 15h-2.4v7A10 10 0 0 0 22 12z" />
    ),
  },
  {
    href: "https://www.instagram.com/dunhindalanka",
    label: "Instagram",
    icon: (
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.5h-8.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm6-2.2a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    ),
  },
  {
    href: "https://www.tiktok.com/@dunhindalanka",
    label: "TikTok",
    icon: (
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
    ),
  },
  {
    href: "https://www.youtube.com/@dunhindalanka",
    label: "YouTube",
    icon: (
      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.896 0-7.605-.476c-.941-.262-1.684-1.037-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.104 4 12 4 12 4s5.896 0 7.605.476c.941.262 1.684 1.037 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e, href) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -88;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        /* ─── Root & Background ─── */
        .footer-root {
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          position: relative;
          color: #fff;
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          background: url(${footerBg}) center/cover no-repeat;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.8) contrast(1.2); /* Increased brightness to show more background */
        }

        .footer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, rgba(10,20,36,0.7) 0%, rgba(8,18,34,0.75) 100%); /* More transparent overlay */
        }

        /* ─── Main container ─── */
        .footer-container {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 3.5rem 2rem 2rem; /* Increased padding */
          z-index: 2;
        }

        /* ─── Grid layout ─── */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.8fr;
          gap: 2.5rem;
          margin-bottom: 3rem; /* Increased margin */
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1.5fr;
          }
          .footer-grid > :first-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-container {
            padding: 2rem 1.5rem 1.5rem;
          }
        }

        /* ─── Brand section ─── */
        .brand-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          margin-bottom: 1rem;
        }

        .brand-logo {
          height: 45px; /* Slightly larger */
          width: auto;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .brand-name {
          font-weight: 600;
          font-size: 1.35rem; /* Slightly larger */
          letter-spacing: -0.01em;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Added text shadow */
        }

        .brand-tagline {
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          display: block;
          margin-top: 0.1rem;
        }

        .brand-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          max-width: 300px;
          margin-bottom: 1.5rem;
          font-weight: 400;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1); /* Added text shadow */
        }

        /* ─── Social links ─── */
        .social-links {
          display: flex;
          gap: 0.5rem;
        }

        .social-link {
          width: 36px; /* Slightly larger */
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.15); /* More opaque */
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.9);
          transition: all 0.2s ease;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .social-link:hover {
          background: rgba(59, 130, 246, 0.6);
          color: #fff;
          transform: translateY(-2px);
          border-color: rgba(59, 130, 246, 0.3);
        }

        /* ─── Column headings ─── */
        .col-heading {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 1.25rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        /* ─── Navigation links ─── */
        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin-bottom: 0.6rem;
        }

        .nav-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 400;
          transition: color 0.2s ease;
          display: inline-block;
          padding: 0.2rem 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .nav-link:hover {
          color: #fff;
        }

        /* ─── Contact list ─── */
        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: rgba(255,255,255,0.85);
          font-size: 0.95rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .contact-icon {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.8);
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .contact-text {
          line-height: 1.5;
        }

        .contact-text a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .contact-text a:hover {
          color: #fff;
        }

        /* ─── Newsletter ─── */
        .newsletter-text {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          margin-bottom: 1rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column;
          }
        }

        .newsletter-input {
          flex: 1;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          transition: all 0.2s ease;
        }

        .newsletter-input:focus {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(255,255,255,0.2);
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .newsletter-btn {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.7);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          background: rgba(59, 130, 246, 0.9);
          transform: translateY(-1px);
        }

        /* ─── Bottom bar ─── */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }

        @media (max-width: 640px) {
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-legal a:hover {
          color: rgba(255,255,255,0.9);
        }

        /* ─── PrismStack Credit ─── */
        .prismstack-credit {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.2s ease;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.05);
          font-size: 0.8rem;
        }

        .prismstack-credit:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.1);
        }

        .prismstack-credit svg {
          width: 14px;
          height: 14px;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .prismstack-credit:hover svg {
          opacity: 1;
        }
      `}</style>

      <footer className="footer-root" role="contentinfo">
        {/* Background with overlay */}
        <div className="footer-bg" aria-hidden="true" />
        <div className="footer-overlay" aria-hidden="true" />

        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div>
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "#home")}
                className="brand-link"
              >
                <img src={logo} alt="Dunhinda Lanka" className="brand-logo" />
                <div>
                  <div className="brand-name">Dunhinda Lanka</div>
                  <span className="brand-tagline">Pure Natural Water</span>
                </div>
              </a>

              <p className="brand-desc">
                Premium natural water sourced from the pristine highlands of Sri
                Lanka.
              </p>

              <div className="social-links">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Follow on ${social.label}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <nav aria-label="Quick links">
              <h3 className="col-heading">Quick Links</h3>
              <ul className="nav-list">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href} className="nav-item">
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="nav-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div>
              <h3 className="col-heading">Contact</h3>
              <ul className="contact-list">
                <li className="contact-item">
                  <span className="contact-icon">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span className="contact-text">Badulla, Sri Lanka</span>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <span className="contact-text">
                    <a href="tel:+94771234567">+94 77 123 4567</a>
                  </span>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="contact-text">
                    <a href="mailto:info@dunhindalanka.com">
                      info@dunhindalanka.com
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="col-heading">Newsletter</h3>
              <p className="newsletter-text">
                Subscribe for updates and offers.
              </p>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar - Removed back to top, added PrismStack credit */}
          <div className="footer-bottom">
            <p>© {currentYear} Dunhinda Lanka. All rights reserved.</p>

            <div className="footer-legal">
              {LEGAL_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="https://prismstack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="prismstack-credit"
              aria-label="Built by PrismStack"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2 2 0 01-1.048 1.765L6 12l2.702 1.417a2 2 0 011.048 1.765v5.714a2 2 0 003.02 1.72l4.796-2.87a2 2 0 001.18-1.803V8.057a2 2 0 00-1.18-1.803l-4.796-2.87a2 2 0 00-3.02 1.72z"
                />
              </svg>
              Built by PrismStack
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

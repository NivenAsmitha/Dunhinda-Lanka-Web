// src/pages/Gallery.jsx
// ─────────────────────────────────────────────────────────────
//  DUNHINDA LANKA — Gallery Page · Modern Elevated Design
//  Matches About.jsx + Services.jsx · font-mont · #1e88e5
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

/* ─── Global styles ─────────────────────────────────────────── */
const STYLES = `
  @keyframes ticker {
    from { transform: translateX(0) }
    to   { transform: translateX(-50%) }
  }
  .gallery-ticker { display:flex; width:max-content; animation: ticker 30s linear infinite; }
  .gallery-ticker:hover { animation-play-state: paused; }

  @keyframes floatA {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-16px) rotate(5deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-20px); }
  }
  @keyframes floatC {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-12px) rotate(-4deg); }
  }
  .float-a { animation: floatA 8s ease-in-out infinite; }
  .float-b { animation: floatB 6s ease-in-out infinite; }
  .float-c { animation: floatC 10s ease-in-out infinite; }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .shimmer-text {
    background: linear-gradient(90deg, #0d47a1 0%, #1e88e5 40%, #42a5f5 60%, #0d47a1 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .fade-up   { animation: fadeUp .7s ease both; }
  .fade-up-1 { animation-delay:.10s; }
  .fade-up-2 { animation-delay:.22s; }
  .fade-up-3 { animation-delay:.34s; }
  .fade-up-4 { animation-delay:.46s; }

  /* scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .6s ease, transform .6s ease;
  }
  .reveal.vis { opacity:1; transform:translateY(0); }

  /* card shine */
  .card-shine { position:relative; overflow:hidden; }
  .card-shine::after {
    content:'';
    position:absolute;
    top:-60%; left:-60%;
    width:55%; height:220%;
    background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,.16) 50%, transparent 60%);
    transform:skewX(-20deg);
    transition:left .55s ease;
    pointer-events:none;
  }
  .card-shine:hover::after { left:140%; }

  /* lightbox backdrop */
  @keyframes lbIn {
    from { opacity:0; transform:scale(.94) translateY(12px); }
    to   { opacity:1; transform:scale(1)   translateY(0); }
  }
  .lb-card { animation: lbIn .28s ease both; }

  /* filter pill active indicator */
  .filter-pill-active { box-shadow: 0 4px 14px rgba(30,136,229,.35); }

  .section-rule {
    height:2px;
    background:linear-gradient(90deg, transparent, #90caf9, transparent);
    margin:0 auto; max-width:600px; opacity:.5;
  }
`;

/* ─── Category colour map ───────────────────────────────────── */
const CAT_STYLE = {
  Products:       { bg: "from-[#e3f2fd] to-[#bbdefb]", dot: "#1e88e5", badge: "bg-[#e3f2fd] border-[#90caf9] text-[#1e88e5]" },
  Delivery:       { bg: "from-[#e8f5e9] to-[#c8e6c9]", dot: "#43a047", badge: "bg-[#e8f5e9] border-[#a5d6a7] text-[#388e3c]" },
  Sustainability: { bg: "from-[#fff8e1] to-[#ffecb3]", dot: "#f9a825", badge: "bg-[#fff8e1] border-[#ffe082] text-[#f57f17]" },
  Corporate:      { bg: "from-[#ede7f6] to-[#d1c4e9]", dot: "#7e57c2", badge: "bg-[#ede7f6] border-[#ce93d8] text-[#6a1b9a]" },
};
const defaultCat = { bg: "from-[#e3f2fd] to-[#bbdefb]", dot: "#1e88e5", badge: "bg-[#e3f2fd] border-[#90caf9] text-[#1e88e5]" };

/* ─── Scroll-reveal hook ────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Enhanced Lightbox ─────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;
  const cs = CAT_STYLE[item.category] || defaultCat;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(10,20,40,.7)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/15 border border-white/25 text-white text-2xl flex items-center justify-center hover:bg-white/25 transition z-10 backdrop-blur-sm"
      >‹</button>

      <div
        className="lb-card bg-white rounded-3xl shadow-2xl border border-[#bbdefb] max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colour top band */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${cs.bg}`} />

        {/* Image */}
        <div className="relative overflow-hidden bg-[#f0f8ff]">
          <img src={item.img} alt={item.title} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d47a1]/30 via-transparent to-transparent pointer-events-none" />
          {/* Category badge overlay */}
          <span className={`absolute top-3 left-3 text-[11px] font-mont font-bold px-3 py-1 rounded-full border ${cs.badge}`}>
            {item.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-mont font-bold text-xl text-[#1a237e] mb-2">{item.title}</h3>
          <div className="w-10 h-0.5 rounded-full mb-3" style={{ background: `linear-gradient(90deg,${cs.dot},#42a5f5)` }} />
          <p className="font-mont text-sm text-[#0d47a1] leading-relaxed mb-5">{item.desc}</p>
          <div className="flex justify-between items-center">
            <span className="font-mont text-xs text-[#90a4ae] uppercase tracking-wide">#{item.id} · Dunhinda Lanka</span>
            <button onClick={onClose}
              className="font-mont text-sm font-semibold text-[#1e88e5] hover:text-[#42a5f5] flex items-center gap-1 transition">
              Close ✕
            </button>
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/15 border border-white/25 text-white text-2xl flex items-center justify-center hover:bg-white/25 transition z-10 backdrop-blur-sm"
      >›</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Gallery() {
  const navigate = useNavigate();
  useReveal();

  const categories = ["All", "Products", "Delivery", "Sustainability", "Corporate"];

  const images = [
    { id: 1, title: "Natural Mineral Water 500ml",  category: "Products",       img: logo, desc: "Our best-selling portable 500ml bottle. Perfect for everyday on-the-go hydration." },
    { id: 2, title: "Premium 1 Litre Bottle",        category: "Products",       img: logo, desc: "Family-size pure mineral water ideal for home and office use." },
    { id: 3, title: "Sport Cap 750ml",               category: "Products",       img: logo, desc: "Electrolyte-balanced with a sports cap for active lifestyles and outdoor use." },
    { id: 4, title: "Premium Glass Bottle 750ml",   category: "Products",       img: logo, desc: "Elegant glass bottle for dining and premium events. Zero plastic taste." },
    { id: 5, title: "Family Pack 5L",               category: "Products",       img: logo, desc: "Large refill pack compatible with home and office dispensers. Economical choice." },
    { id: 6, title: "Alkaline Balance Water",        category: "Products",       img: logo, desc: "pH 8.0+ enhanced hydration water focused on wellness and daily balance." },
    { id: 7, title: "Home Delivery Service",         category: "Delivery",       img: logo, desc: "Scheduled doorstep delivery — contactless, flexible, and reliable islandwide." },
    { id: 8, title: "Recycling Initiative",          category: "Sustainability", img: logo, desc: "Our bottle return reward program in Western Province, reducing plastic waste." },
    { id: 9, title: "Corporate Supply Program",      category: "Corporate",      img: logo, desc: "Tailored water solutions for boardrooms, workplaces, and multi-site operations." },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = activeCategory === "All"
    ? images
    : images.filter((i) => i.category === activeCategory);

  const openLightbox  = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevItem = () => setLightboxIdx((p) => (p - 1 + filtered.length) % filtered.length);
  const nextItem = () => setLightboxIdx((p) => (p + 1) % filtered.length);

  const catCount = (cat) => cat === "All" ? images.length : images.filter(i => i.category === cat).length;

  return (
    <div className="bg-[#f8fbff] overflow-x-hidden">
      <style>{STYLES}</style>

      {/* ── TICKER ── */}
      <div className="bg-[#e3f2fd] border-b border-[#bbdefb] overflow-hidden h-9 flex items-center">
        <div className="gallery-ticker font-mont text-[11px] font-semibold tracking-widest text-[#1565c0]">
          {Array(4).fill(["PRODUCTS","HOME DELIVERY","SUSTAINABILITY","CORPORATE SUPPLY","ISLANDWIDE COVERAGE","PURE NATURAL WATER"]).flat().map((t, i) => (
            <span key={i} className="px-7 whitespace-nowrap">
              <span className="text-[#1e88e5] mr-3">💧</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 text-center overflow-hidden"
               style={{ background: "linear-gradient(140deg,#daeeff 0%,#f0f8ff 55%,#e8f4fd 100%)" }}>
        {/* Rings + blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-[#90caf9]/22" />
          <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full border border-[#90caf9]/14" />
          <div className="absolute top-1/3 -left-56 w-[480px] h-[480px] bg-[#42a5f5]/7 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4  w-[400px] h-[400px] bg-[#1e88e5]/6 rounded-full blur-3xl" />
          <span className="float-a absolute top-14 right-[13%] text-5xl opacity-[.15]">💧</span>
          <span className="float-b absolute top-[60%] right-[5%] text-3xl opacity-[.11]">🌊</span>
          <span className="float-c absolute bottom-16 left-[8%]  text-4xl opacity-[.11]">💦</span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 font-mont text-[11px] tracking-widest text-[#90a4ae] uppercase mb-10 fade-up">
            <span className="cursor-pointer hover:text-[#1e88e5] transition-colors" onClick={() => navigate("/")}>Home</span>
            <span className="text-[#bbdefb]">/</span>
            <span className="text-[#1e88e5] font-semibold">Gallery</span>
          </div>

          <span className="fade-up fade-up-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 backdrop-blur-sm text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-6">
            💧 Our Gallery
          </span>

          <h1 className="font-mont font-bold leading-[1.08] mb-5 mt-2 fade-up fade-up-2"
              style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            <span className="text-[#0d47a1] block">Pure Water,</span>
            <span className="shimmer-text block">Every Frame</span>
          </h1>

          <div className="fade-up fade-up-2 w-14 h-1 rounded-full mx-auto mb-5"
               style={{ background: "linear-gradient(90deg,#1e88e5,#42a5f5)" }} />

          <p className="font-mont text-[#1a237e] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 fade-up fade-up-3">
            Explore our bottled water products, delivery services, sustainability initiatives, and company highlights from Dunhinda Lanka.
          </p>

          {/* Glass stat chips */}
          <div className="flex flex-wrap justify-center gap-4 fade-up fade-up-4">
            {[
              { label: "Products",   value: "6+",  icon: "💧" },
              { label: "Categories", value: "4",   icon: "🗂️" },
              { label: "Provinces",  value: "9",   icon: "📍" },
            ].map((s) => (
              <div key={s.label}
                className="bg-white/80 backdrop-blur-sm border border-[#bbdefb] rounded-2xl px-5 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-mont font-bold text-2xl text-[#1e88e5]">{s.value}</div>
                <div className="font-mont text-[10px] text-[#90a4ae] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FILTER BAR ══════════ */}
      <section className="bg-white/90 backdrop-blur-md border-b border-[#e3f2fd] px-6 md:px-12 lg:px-24 py-4 sticky top-0 z-20"
               style={{ boxShadow: "0 2px 16px rgba(30,136,229,.08)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 items-center justify-center md:justify-start">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              const cs = CAT_STYLE[cat] || defaultCat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-mont text-sm font-semibold border transition-all duration-250 ${
                    active
                      ? "bg-[#1e88e5] text-white border-[#1e88e5] filter-pill-active"
                      : "bg-white text-[#1a237e] border-[#bbdefb] hover:border-[#90caf9] hover:bg-[#f0f8ff]"
                  }`}>
                  {cat}
                  <span className={`ml-1.5 text-[11px] font-normal ${active ? "text-white/75" : "text-[#90a4ae]"}`}>
                    ({catCount(cat)})
                  </span>
                </button>
              );
            })}
          </div>
          {/* Result count */}
          <span className="font-mont text-xs text-[#90a4ae] hidden md:block shrink-0">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ══════════ GALLERY GRID ══════════ */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto">

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((item, i) => {
                const cs = CAT_STYLE[item.category] || defaultCat;
                return (
                  <div key={item.id}
                    onClick={() => openLightbox(i)}
                    className="reveal card-shine group bg-white rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
                    style={{ transitionDelay: `${i * 50}ms` }}>

                    {/* Colour top band */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${cs.bg}`} />

                    {/* Image */}
                    <div className="relative overflow-hidden bg-[#f0f8ff]">
                      <img src={item.img} alt={item.title}
                        className="w-full h-52 object-cover group-hover:scale-108 transition-transform duration-500"
                        style={{ '--tw-scale-x':'1.08','--tw-scale-y':'1.08' }}
                      />
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d47a1]/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="font-mont text-white text-xs font-semibold tracking-wide flex items-center gap-1">
                          Click to enlarge <span className="text-base leading-none">→</span>
                        </span>
                      </div>
                      {/* Category badge */}
                      <span className={`absolute top-3 left-3 text-[11px] font-mont font-bold px-3 py-1 rounded-full border ${cs.badge} bg-white/90`}>
                        {item.category}
                      </span>
                      {/* Item number */}
                      <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/85 font-mont font-bold text-[11px] text-[#90a4ae] flex items-center justify-center">
                        {String(item.id).padStart(2,"0")}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <h3 className="font-mont font-bold text-base text-[#1a237e] mb-2">{item.title}</h3>
                      <div className="w-8 h-0.5 rounded-full mb-3 group-hover:w-14 transition-all duration-400"
                           style={{ background: `linear-gradient(90deg,${cs.dot},#42a5f5)` }} />
                      <p className="font-mont text-sm text-[#0d47a1] leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>

                    {/* Bottom accent */}
                    <div className="h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] transition-all duration-500" />
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-28 reveal">
              <div className="text-6xl mb-5">💧</div>
              <h3 className="font-mont font-bold text-xl text-[#1a237e] mb-2">No items yet</h3>
              <p className="font-mont text-[#90a4ae] text-sm">Nothing in this category yet — check back soon.</p>
              <button onClick={() => setActiveCategory("All")}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#1e88e5] text-white font-mont text-sm font-semibold hover:bg-[#42a5f5] transition shadow-md">
                View All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
               style={{ background: "linear-gradient(135deg,#1565c0 0%,#1e88e5 50%,#42a5f5 100%)" }}>
        {/* Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {[680,490,320].map((s,i) => (
            <div key={i} className="absolute rounded-full border border-white/10" style={{ width:s, height:s }} />
          ))}
          <div className="absolute -top-28 -right-28 w-72 h-72 bg-white/7 rounded-full blur-3xl" />
          <div className="absolute -bottom-28 -left-28 w-72 h-72 bg-white/7 rounded-full blur-3xl" />
          {["💧","🌊","💦","🫗"].map((e,i) => (
            <span key={i} className="absolute text-white/10 text-6xl select-none"
              style={{ top:`${14+i*20}%`, left:`${3+i*24}%` }}>{e}</span>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-mont font-semibold border border-white/30 mb-6">
            💧 Pure. Natural. Sri Lankan.
          </span>
          <h2 className="font-mont font-bold text-white leading-[1.08] mt-2 mb-5"
              style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>
            Clean. Fresh.<br/>
            <span style={{ opacity:.9 }}>Reliable.</span>
          </h2>
          <p className="font-mont text-white/85 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Dunhinda Lanka is committed to delivering high-quality bottled water with reliability and care for every customer, every time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/shop")}
              className="px-8 py-3.5 rounded-full bg-white text-[#1e88e5] font-mont font-bold text-sm shadow-xl hover:bg-[#e3f2fd] hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group">
              View All Products
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-full bg-white/15 text-white font-mont font-bold text-sm border border-white/30 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ LIGHTBOX ══════════ */}
      <Lightbox
        item={lightboxIdx !== null ? filtered[lightboxIdx] : null}
        onClose={closeLightbox}
        onPrev={prevItem}
        onNext={nextItem}
      />
    </div>
  );
}
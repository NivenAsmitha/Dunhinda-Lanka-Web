// src/pages/Services.jsx
// ─────────────────────────────────────────────────────────────
//  DUNHINDA LANKA — Services Page · Modern Elevated Design
//  Matches Home.jsx + About.jsx palette · font-mont · #1e88e5
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Global styles ─────────────────────────────────────────── */
const STYLES = `
  @keyframes ticker {
    from { transform: translateX(0) }
    to   { transform: translateX(-50%) }
  }
  .svc-ticker { display:flex; width:max-content; animation: ticker 30s linear infinite; }
  .svc-ticker:hover { animation-play-state: paused; }

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
    transform: translateY(26px);
    transition: opacity .6s ease, transform .6s ease;
  }
  .reveal.vis {
    opacity: 1;
    transform: translateY(0);
  }

  /* card shine sweep */
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

  /* step connector */
  .step-connector::after {
    content:'';
    position:absolute;
    top:26px; left:calc(50% + 24px);
    width:calc(100% - 48px);
    height:1px;
    background: linear-gradient(90deg, #90caf9, #bbdefb);
  }

  .section-rule {
    height:2px;
    background:linear-gradient(90deg, transparent, #90caf9, transparent);
    margin:0 auto; max-width:700px; opacity:.55;
  }

  /* checklist row */
  .why-row {
    transition: all .25s ease;
  }
  .why-row:hover .why-num {
    background: #1e88e5;
    color: white;
  }
  .why-row:hover .why-check {
    opacity: 1;
    transform: scale(1);
  }
  .why-check {
    opacity: 0;
    transform: scale(0.5);
    transition: all .2s ease;
  }
`;

/* ─── Animated counter ──────────────────────────────────────── */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let v = 0;
      const step = to / 55;
      const id = setInterval(() => {
        v += step;
        if (v >= to) { setVal(to); clearInterval(id); }
        else setVal(Math.floor(v));
      }, 18);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Scroll-reveal hook ────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("vis");
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Service icons ─────────────────────────────────────────── */
const ICONS = {
  bottle:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path d="M9 2h6l1 4H8L9 2z"/><rect x="7" y="6" width="10" height="14" rx="2"/><line x1="10" y1="11" x2="14" y2="11"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  bulk:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><rect x="2" y="7" width="9" height="13" rx="1"/><rect x="13" y="7" width="9" height="13" rx="1"/><path d="M6 7V5a2 2 0 0 1 4 0v2M14 7V5a2 2 0 0 1 4 0v2"/></svg>,
  retail:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path d="M3 3h18l-2 9H5L3 3z"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M5 12l1 5h12"/></svg>,
  delivery: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/></svg>,
  corp:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  support:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Services() {
  const navigate = useNavigate();
  useReveal();

  const services = [
    { icon: ICONS.bottle,   num: "01", title: "Bottled Water Supply",  tag: "Core Service",  grad: "from-[#e3f2fd] to-[#bbdefb]", desc: "Clean mineral water for households, offices, shops, schools, and events. Every bottle certified pure from source to shelf." },
    { icon: ICONS.bulk,     num: "02", title: "Bulk Orders",           tag: "High Volume",   grad: "from-[#e8f5e9] to-[#c8e6c9]", desc: "Reliable large-volume supply for businesses, institutions, hotels, and industrial operators with custom scheduling." },
    { icon: ICONS.retail,   num: "03", title: "Retail Distribution",   tag: "Trade",         grad: "from-[#fff8e1] to-[#ffecb3]", desc: "Efficient channel support for supermarkets, convenience stores, and partner outlet networks islandwide." },
    { icon: ICONS.delivery, num: "04", title: "Home Delivery",         tag: "Direct",        grad: "from-[#fce4ec] to-[#f8bbd0]", desc: "Scheduled doorstep delivery — flexible frequency, contactless drop-off, and real-time order tracking." },
    { icon: ICONS.corp,     num: "05", title: "Corporate Supply",      tag: "B2B",           grad: "from-[#ede7f6] to-[#d1c4e9]", desc: "Tailored water arrangements for workplaces, boardrooms, events, and multi-site office operations." },
    { icon: ICONS.support,  num: "06", title: "Customer Support",      tag: "24 / 7",        grad: "from-[#e0f7fa] to-[#b2ebf2]", desc: "Dedicated assistance for orders, product queries, service requests, billing, and business partnership enquiries." },
  ];

  const process = [
    { step: "01", title: "Enquire",  desc: "Submit your requirement online or call us directly.", icon: "📋" },
    { step: "02", title: "Assess",   desc: "We evaluate volume, frequency, and service type.",    icon: "🔍" },
    { step: "03", title: "Agree",    desc: "Pricing and schedule confirmed — no hidden costs.",    icon: "✅" },
    { step: "04", title: "Deliver",  desc: "On-time, every time. Quality checked at dispatch.",   icon: "🚚" },
  ];

  const coverage = [
    { zone: "Western Province",  pts: 320 },
    { zone: "Southern Province", pts: 145 },
    { zone: "Central Province",  pts: 110 },
    { zone: "Eastern Province",  pts: 88  },
    { zone: "Northern Province", pts: 72  },
    { zone: "Uva Province",      pts: 65  },
  ];

  const whyPoints = [
    { text: "Consistent certified quality, every batch, every time",       icon: "🏆" },
    { text: "Fast and dependable order handling with real-time tracking",   icon: "⚡" },
    { text: "Flexible supply options scaled for homes and enterprises",     icon: "📦" },
    { text: "Professional bulk and retail client management",               icon: "🤝" },
    { text: "Sustainable sourcing and eco-conscious packaging",             icon: "🌱" },
    { text: "Dedicated account support with transparent pricing",           icon: "💬" },
  ];

  return (
    <div className="bg-[#f8fbff] overflow-x-hidden">
      <style>{STYLES}</style>

      {/* ── TICKER ── */}
      <div className="bg-[#e3f2fd] border-b border-[#bbdefb] overflow-hidden h-9 flex items-center">
        <div className="svc-ticker font-mont text-[11px] font-semibold tracking-widest text-[#1565c0]">
          {Array(4).fill(["BOTTLED WATER SUPPLY","BULK ORDERS","HOME DELIVERY","RETAIL DISTRIBUTION","CORPORATE SUPPLY","ISLANDWIDE COVERAGE","ISO CERTIFIED"]).flat().map((t, i) => (
            <span key={i} className="px-7 whitespace-nowrap">
              <span className="text-[#1e88e5] mr-3">💧</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="relative w-full min-h-[88vh] flex items-center px-6 md:px-12 lg:px-24 py-24 overflow-hidden"
               style={{ background: "linear-gradient(140deg,#daeeff 0%,#f0f8ff 55%,#e8f4fd 100%)" }}>
        {/* Rings + blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full border border-[#90caf9]/25" />
          <div className="absolute -top-20 -right-20 w-[460px] h-[460px] rounded-full border border-[#90caf9]/15" />
          <div className="absolute top-1/3 -left-56 w-[500px] h-[500px] bg-[#42a5f5]/7 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-[#1e88e5]/6 rounded-full blur-3xl" />
          <span className="float-a absolute top-16 right-[13%] text-5xl opacity-[.16]">💧</span>
          <span className="float-b absolute top-[58%] right-[5%]  text-3xl opacity-[.12]">🌊</span>
          <span className="float-c absolute bottom-20 left-[9%]  text-4xl opacity-[.12]">💦</span>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mont text-[11px] tracking-widest text-[#90a4ae] uppercase mb-10 fade-up">
            <span className="cursor-pointer hover:text-[#1e88e5] transition-colors" onClick={() => navigate("/")}>Home</span>
            <span className="text-[#bbdefb]">/</span>
            <span className="text-[#1e88e5] font-semibold">Services</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="fade-up fade-up-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 backdrop-blur-sm text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-6">
                💧 Our Services
              </span>

              <h1 className="font-mont font-bold leading-[1.08] mb-5 fade-up fade-up-2"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.1rem)" }}>
                <span className="text-[#0d47a1] block">Water Solutions</span>
                <span className="shimmer-text block">Built to Scale</span>
              </h1>

              <div className="fade-up fade-up-2 w-14 h-1 rounded-full mb-5"
                   style={{ background: "linear-gradient(90deg,#1e88e5,#42a5f5)" }} />

              <p className="font-mont text-[#1a237e] text-base md:text-lg leading-relaxed mb-8 fade-up fade-up-3 max-w-xl">
                From single-home delivery to islandwide retail logistics — Dunhinda Lanka provides dependable bottled water services engineered for precision, reliability, and scale.
              </p>

              <div className="flex flex-wrap gap-3 fade-up fade-up-4">
                <button onClick={() => navigate("/contact")}
                  className="px-7 py-3 rounded-full bg-[#1e88e5] text-white font-mont font-semibold shadow-lg hover:bg-[#42a5f5] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group">
                  Get a Quote
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button onClick={() => navigate("/shop")}
                  className="px-7 py-3 rounded-full bg-white text-[#1e88e5] font-mont font-semibold border border-[#90caf9] shadow hover:bg-[#e3f2fd] hover:-translate-y-0.5 transition-all duration-300">
                  Shop Products
                </button>
              </div>
            </div>

            {/* Right — glass stat card */}
            <div className="relative flex justify-center lg:justify-end fade-up fade-up-2">
              <div className="absolute inset-0 bg-[#1e88e5]/10 rounded-3xl blur-2xl scale-95 pointer-events-none" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-[#bbdefb] shadow-2xl p-8 w-full max-w-md">

                {/* Header */}
                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-[#e3f2fd]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e3f2fd] to-[#90caf9] flex items-center justify-center text-xl">💧</div>
                  <div>
                    <div className="font-mont font-bold text-[#0d47a1] text-sm leading-tight">Dunhinda Lanka Services</div>
                    <div className="font-mont text-[10px] text-[#90a4ae] uppercase tracking-wider mt-0.5">Islandwide · Certified · Reliable</div>
                  </div>
                  <span className="ml-auto text-[11px] font-mont font-bold text-[#1e88e5] bg-[#e3f2fd] px-3 py-1 rounded-full border border-[#90caf9]">ISO ✓</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Service Points",     to: 850,   suffix: "+", icon: "📍" },
                    { label: "Deliveries / Month", to: 18000, suffix: "+", icon: "🚚" },
                    { label: "Corporate Clients",  to: 340,   suffix: "+", icon: "🏢" },
                    { label: "On-Time Rate",        to: 98,    suffix: "%", icon: "⏱️" },
                  ].map((s) => (
                    <div key={s.label}
                      className="bg-gradient-to-br from-[#f0f8ff] to-[#e8f4fd] rounded-2xl border border-[#e3f2fd] p-4 hover:border-[#90caf9] hover:shadow-sm transition-all duration-300">
                      <div className="text-lg mb-1">{s.icon}</div>
                      <div className="font-mont font-bold text-xl text-[#1e88e5]"><Counter to={s.to} suffix={s.suffix} /></div>
                      <div className="font-mont text-[10px] text-[#90a4ae] uppercase tracking-wide mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Strip */}
                <div className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                     style={{ background: "linear-gradient(90deg,#1e88e5,#42a5f5)" }}>
                  <span className="text-xl">🌊</span>
                  <span className="font-mont text-white text-sm font-semibold">Built for reliability. Scaled for Sri Lanka.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES GRID ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
              💧 Service Catalogue
            </span>
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-3">
              Six Core <span className="text-[#1e88e5]">Capabilities</span>
            </h2>
            <p className="font-mont text-[#1a237e] text-base max-w-xl mx-auto">
              Each service is designed to meet a specific need — from individual consumers to enterprise-scale supply chains.
            </p>
            <div className="section-rule mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.num}
                className="reveal card-shine group bg-white rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 55}ms` }}>
                {/* Colour top band */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.grad}`} />
                <div className="p-6 pb-4">
                  {/* Icon + tag row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-[#1e88e5] group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      {s.icon}
                    </div>
                    <span className="text-[11px] font-mont font-bold text-[#1e88e5] bg-[#e3f2fd] px-3 py-1 rounded-full border border-[#90caf9]">
                      {s.tag}
                    </span>
                  </div>
                  {/* Ghost num */}
                  <div className="font-mont font-bold text-[52px] leading-none text-[#f0f8ff] select-none -mt-1 mb-0.5">{s.num}</div>
                  <h3 className="font-mont font-bold text-base text-[#1a237e] mb-2">{s.title}</h3>
                  <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] mb-3 group-hover:w-16 transition-all duration-400" />
                  <p className="font-mont text-sm text-[#0d47a1] leading-relaxed">{s.desc}</p>
                </div>
                <div className="h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden"
               style={{ background: "linear-gradient(160deg,#e3f2fd 0%,#f8fbff 55%,#e8f4fd 100%)" }}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#42a5f5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1e88e5]/8  rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
              🔄 How It Works
            </span>
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-3">
              Service in <span className="text-[#1e88e5]">Four Steps</span>
            </h2>
            <p className="font-mont text-[#1a237e] text-base max-w-md mx-auto">
              A simple, transparent process from first contact to reliable delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 relative">
            {/* Connector */}
            <div className="hidden md:block absolute top-[26px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px z-0"
                 style={{ background: "linear-gradient(90deg,#90caf9,#bbdefb,#90caf9)" }} />

            {process.map((p, i) => (
              <div key={p.step}
                className="reveal card-shine relative z-10 bg-white rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center text-center overflow-hidden"
                style={{ transitionDelay: `${i * 90}ms` }}>
                {/* Step bubble */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg relative z-10 font-mont font-bold text-sm text-white"
                     style={{ background: "linear-gradient(135deg,#1e88e5,#42a5f5)" }}>
                  {p.step}
                </div>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-mont font-bold text-base text-[#1a237e] mb-2">{p.title}</h3>
                <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] mb-3" />
                <p className="font-mont text-sm text-[#0d47a1] leading-relaxed">{p.desc}</p>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8fbff] text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-6">
              💧 Why Dunhinda Lanka
            </span>
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-4 leading-tight">
              The Standard Others<br/>
              <span className="text-[#1e88e5]">Measure Against</span>
            </h2>
            <div className="w-14 h-1 rounded-full mb-5" style={{ background:"linear-gradient(90deg,#1e88e5,#42a5f5)" }} />
            <p className="font-mont text-[#1a237e] text-base leading-relaxed mb-4">
              We focus on delivering water services that are practical, dependable, and calibrated to both individual and enterprise-scale needs.
            </p>
            <p className="font-mont text-[#5c7a9e] text-base leading-relaxed mb-8">
              From single home orders to nationwide distribution, our goal is frictionless access to certified clean water.
            </p>
            <button onClick={() => navigate("/about")}
              className="px-7 py-3 rounded-full bg-[#1e88e5] text-white font-mont font-semibold shadow-lg hover:bg-[#42a5f5] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group">
              About Us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Right — animated checklist */}
          <div className="space-y-3 reveal" style={{ transitionDelay:"120ms" }}>
            {whyPoints.map((point, idx) => (
              <div key={idx}
                className="why-row flex items-center gap-4 bg-white border border-[#bbdefb] rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-[#90caf9] hover:-translate-y-0.5 transition-all duration-250 group cursor-default">
                <span className="why-num w-8 h-8 rounded-full bg-[#e3f2fd] text-[#1e88e5] font-mont font-bold text-xs flex items-center justify-center shrink-0 transition-all duration-250">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-lg shrink-0">{point.icon}</span>
                <span className="font-mont text-sm text-[#1a237e] leading-snug">{point.text}</span>
                <span className="why-check ml-auto text-[#1e88e5] font-bold text-base shrink-0">✔</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COVERAGE ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24"
               style={{ background: "linear-gradient(135deg,#e3f2fd 0%,#f8fbff 60%,#e8f4fd 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
                📍 Coverage
              </span>
              <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mt-1 mb-2">
                Islandwide <span className="text-[#1e88e5]">Network</span>
              </h2>
              <p className="font-mont text-[#1a237e] text-sm md:text-base max-w-sm">
                Service points across all major provinces in Sri Lanka.
              </p>
            </div>
            <div className="reveal font-mont text-sm text-[#1e88e5] font-bold bg-white border border-[#90caf9] px-5 py-2.5 rounded-full shadow-sm">
              850+ Total Points
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {coverage.map((z, i) => (
              <div key={z.zone}
                className="reveal card-shine group bg-white rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden"
                style={{ transitionDelay: `${i * 65}ms` }}>
                <div className="font-mont font-bold text-3xl text-[#1e88e5] mb-1 group-hover:scale-105 transition-transform duration-300 inline-block">
                  <Counter to={z.pts} suffix="+" />
                </div>
                <div className="font-mont text-xs text-[#90a4ae] uppercase tracking-wide">{z.zone}</div>
                <div className="h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] transition-all duration-500 mt-3 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HIGHLIGHTS ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#f8fbff] relative overflow-hidden">
        <div className="absolute top-10 right-0  w-56 h-56 bg-[#42a5f5]/20 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-[#1e88e5]/15 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8fbff] text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
                📰 Updates
              </span>
              <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mt-1 mb-2">
                Service <span className="text-[#1e88e5]">Highlights</span>
              </h2>
              <p className="font-mont text-[#1a237e] text-base">Recent improvements and expansions to our water services.</p>
            </div>
            <button onClick={() => navigate("/news")}
              className="reveal font-mont text-sm px-6 py-2.5 rounded-full bg-[#1e88e5] text-white hover:bg-[#42a5f5] hover:-translate-y-0.5 transition-all duration-300 shadow-md flex items-center gap-2 self-start md:self-auto">
              View All News <span className="text-base leading-none">↗</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Feb 2026 · Delivery",    icon:"🚚", title: "Same-day delivery launched in Western Province",        desc: "Orders placed before noon are now delivered the same day across Colombo and suburbs." },
              { tag: "Jan 2026 · Corporate",   icon:"🏢", title: "New corporate water dispenser program for offices",       desc: "Full service including dispenser supply, installation, and scheduled refills for businesses." },
              { tag: "Dec 2025 · Bulk Orders", icon:"📦", title: "Bulk order discounts expanded to all provinces",         desc: "Volume pricing tiers now available nationally, with dedicated account managers for large clients." },
            ].map((n, i) => (
              <article key={n.title}
                className="reveal card-shine group border border-[#bbdefb] rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{ transitionDelay: `${i * 75}ms` }}>
                <div className="h-1.5 w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5]" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] flex items-center justify-center shrink-0 text-xl">{n.icon}</div>
                    <span className="font-mont text-[10px] uppercase tracking-[0.14em] text-[#0d47a1] leading-tight pt-2">{n.tag}</span>
                  </div>
                  <h3 className="font-mont font-semibold text-base text-[#1a237e] mb-2">{n.title}</h3>
                  <div className="w-8 h-0.5 rounded-full bg-[#1e88e5] mb-3 group-hover:w-12 transition-all duration-300" />
                  <p className="font-mont text-[#0d47a1] text-sm leading-relaxed flex-1">{n.desc}</p>
                  <button onClick={() => navigate("/news")}
                    className="mt-5 font-mont text-xs text-[#1e88e5] hover:text-[#42a5f5] inline-flex items-center gap-1 font-semibold">
                    Read more <span className="text-base leading-none">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
               style={{ background:"linear-gradient(135deg,#1565c0 0%,#1e88e5 50%,#42a5f5 100%)" }}>
        {/* Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {[700,500,330].map((s,i) => (
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
            💧 Get Started
          </span>
          <h2 className="font-mont font-bold text-white leading-[1.08] mt-2 mb-5"
              style={{ fontSize:"clamp(2rem,5vw,3.2rem)" }}>
            Need a Water Supply<br/>Partner You Can Trust?
          </h2>
          <p className="font-mont text-white/85 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Contact Dunhinda Lanka for a tailored service proposal. Whether you need daily home delivery or a national supply contract — we're ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-full bg-white text-[#1e88e5] font-mont font-bold text-sm shadow-xl hover:bg-[#e3f2fd] hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group">
              Contact Us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => navigate("/")}
              className="px-8 py-3.5 rounded-full bg-white/15 text-white font-mont font-bold text-sm border border-white/30 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
              Back to Home
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
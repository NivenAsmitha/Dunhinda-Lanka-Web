// src/pages/About.jsx
// ─────────────────────────────────────────────────────────────
//  DUNHINDA LANKA — About Page · Modern Elevated Design
//  Matches Home.jsx palette · font-mont · #1e88e5 accent
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
  .about-ticker { display:flex; width:max-content; animation: ticker 30s linear infinite; }
  .about-ticker:hover { animation-play-state: paused; }

  @keyframes floatA {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-18px) rotate(6deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-12px) rotate(-5deg); }
  }
  @keyframes floatC {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-22px); }
  }
  .float-a { animation: floatA 7s ease-in-out infinite; }
  .float-b { animation: floatB 9s ease-in-out infinite; }
  .float-c { animation: floatC 6s ease-in-out infinite; }

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
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .fade-up   { animation: fadeUp .7s ease both; }
  .fade-up-1 { animation-delay:.10s; }
  .fade-up-2 { animation-delay:.22s; }
  .fade-up-3 { animation-delay:.34s; }
  .fade-up-4 { animation-delay:.46s; }

  .card-shine { position:relative; overflow:hidden; }
  .card-shine::after {
    content:'';
    position:absolute;
    top:-60%; left:-60%;
    width:60%; height:220%;
    background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,.18) 50%, transparent 60%);
    transform:skewX(-20deg);
    transition:left .55s ease;
    pointer-events:none;
  }
  .card-shine:hover::after { left:140%; }

  .section-rule {
    height:2px;
    background:linear-gradient(90deg, transparent, #90caf9, transparent);
    margin:0 auto; max-width:700px; opacity:.55;
  }
`;

/* ─── Animated counter ──────────────────────────────────────── */
function Counter({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let v = 0;
      const step = end / (duration / 16);
      const t = setInterval(() => {
        v += step;
        if (v >= end) { setCount(end); clearInterval(t); }
        else setCount(Math.floor(v));
      }, 16);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Scroll-reveal hook ────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity .65s ease, transform .65s ease";
      io.observe(el);
    });
    return () => io.disconnect();
  });
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function About() {
  const navigate = useNavigate();
  useReveal();

  const whyPoints = [
    { icon: "🏔️", title: "Authentic Highland Origin",     desc: "Sourced exclusively from protected Sri Lankan springs above 2,400 m — naturally filtered through ancient volcanic rock layers for exceptional mineral balance." },
    { icon: "🔍", title: "End-to-End Traceability",        desc: "Every bottle carries a transparent story — from spring protection to bottling facility. Full documentation and batch-level tracking you can trust." },
    { icon: "🌱", title: "Sustainable by Design",          desc: "Eco-conscious bottling, lightweight recyclable packaging, bottle-return programs, and active investment in community clean-water access projects." },
    { icon: "🧪", title: "Premium Quality Assurance",      desc: "Multi-stage micro-filtration, UV sterilization, and rigorous laboratory testing exceed international standards — safety and consistency in every drop." },
    { icon: "💧", title: "Wellness-Focused Formulations",  desc: "Naturally mineral-rich profile with carefully balanced alkaline options (pH 8.0+) designed to support daily hydration, recovery, and long-term health." },
    { icon: "🇱🇰", title: "Sri Lankan Pride & Community", desc: "Proudly local — supporting rural employment, highland conservation, and clean water initiatives in underserved areas near our sources." },
  ];

  const pillars = [
    { icon: "💧", grad: "from-[#e3f2fd] to-[#bbdefb]", accent: "#1e88e5", title: "Natural Purity",          desc: "Untouched highland spring water — filtered by nature over centuries for an exceptional, crisp taste that no treatment can replicate." },
    { icon: "🌿", grad: "from-[#e8f5e9] to-[#c8e6c9]", accent: "#43a047", title: "Responsible Stewardship", desc: "Protecting sources, minimising environmental impact, and giving back to the communities whose lives depend on clean water." },
    { icon: "✅", grad: "from-[#fff8e1] to-[#ffecb3]", accent: "#f9a825", title: "Uncompromising Quality",   desc: "Modern treatment meets strict global standards — every batch is laboratory tested and certified before it ever reaches you." },
  ];

  const timeline = [
    { year: "", title: "Brand Founded",        desc: "Dunhinda Lanka established with a mission to bring pure highland spring water to Sri Lankan homes." },
    { year: "", title: "ISO Certified",         desc: "Achieved full ISO certification across our bottling facility and quality control processes." },
    { year: "", title: "Islandwide Expansion",  desc: "Expanded distribution to all nine provinces with dedicated home and corporate delivery networks." },
    { year: "", title: "Sustainability Launch", desc: "Launched bottle-return reward program and community clean-water station initiative in Badulla." },
    { year: "", title: "Alkaline Range",        desc: "Introduced our pH 8.0+ Alkaline Balance water line, expanding our wellness product portfolio." },
  ];

  return (
    <div className="bg-[#f8fbff] overflow-x-hidden">
      <style>{STYLES}</style>

      {/* ── TICKER ── */}
      <div className="bg-[#e3f2fd] border-b border-[#bbdefb] overflow-hidden h-9 flex items-center">
        <div className="about-ticker font-mont text-[11px] font-semibold tracking-widest text-[#1565c0]">
          {Array(4).fill(["PURE HIGHLAND WATER","ISO CERTIFIED","SUSTAINABLE SOURCING","100% NATURAL","ISLANDWIDE DELIVERY","SRI LANKAN PRIDE"]).flat().map((t, i) => (
            <span key={i} className="px-7 whitespace-nowrap">
              <span className="text-[#1e88e5] mr-3">💧</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="relative w-full min-h-[88vh] flex items-center bg-gradient-to-br from-[#daeeff] via-[#f0f8ff] to-[#e8f4fd] px-6 md:px-12 lg:px-24 py-24 overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full border border-[#90caf9]/25" />
          <div className="absolute -top-20 -right-20 w-[460px] h-[460px] rounded-full border border-[#90caf9]/15" />
          <div className="absolute top-1/3 -left-56 w-[500px] h-[500px] bg-[#42a5f5]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-[#1e88e5]/7 rounded-full blur-3xl" />
          <span className="float-a absolute top-16 right-[14%] text-5xl opacity-[.18]">💧</span>
          <span className="float-b absolute top-[55%] right-[6%]  text-3xl opacity-[.13]">🌊</span>
          <span className="float-c absolute bottom-20 left-[10%] text-4xl opacity-[.13]">💦</span>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mont text-[11px] tracking-widest text-[#90a4ae] uppercase mb-10 fade-up">
            <span className="cursor-pointer hover:text-[#1e88e5] transition-colors" onClick={() => navigate("/")}>Home</span>
            <span className="text-[#bbdefb]">/</span>
            <span className="text-[#1e88e5] font-semibold">About</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <span className="fade-up fade-up-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 backdrop-blur-sm text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-6">
                💧 About Dunhinda Lanka
              </span>

              <h1 className="font-mont font-bold leading-[1.08] mb-5 fade-up fade-up-2"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.1rem)" }}>
                <span className="text-[#0d47a1] block">Pure by Nature.</span>
                <span className="shimmer-text block">Perfected by Care.</span>
              </h1>

              {/* Accent rule */}
              <div className="fade-up fade-up-2 w-14 h-1 rounded-full mb-5"
                   style={{ background: "linear-gradient(90deg,#1e88e5,#42a5f5)" }} />

              <p className="font-mont text-[#1a237e] text-base md:text-lg leading-relaxed mb-8 fade-up fade-up-3 max-w-xl">
                From protected highland springs at over 2,400 m elevation in Sri Lanka, Dunhinda Lanka delivers naturally mineral-rich water — bottled with modern precision, complete traceability, and a deep commitment to quality, sustainability, and community wellbeing.
              </p>

              <div className="flex flex-wrap gap-3 fade-up fade-up-4">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-7 py-3 rounded-full bg-[#1e88e5] text-white font-mont font-semibold shadow-lg hover:bg-[#42a5f5] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
                >
                  Shop Pure Water
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-7 py-3 rounded-full bg-white text-[#1e88e5] font-mont font-semibold border border-[#90caf9] shadow hover:bg-[#e3f2fd] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right — glass stat card */}
            <div className="relative flex justify-center lg:justify-end fade-up fade-up-2">
              <div className="absolute inset-0 bg-[#1e88e5]/10 rounded-3xl blur-2xl scale-95 pointer-events-none" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-[#bbdefb] shadow-2xl p-8 w-full max-w-md">

                {/* Header row */}
                <div className="flex items-center gap-4 mb-7 pb-6 border-b border-[#e3f2fd]">
                  <img src={logo} alt="Dunhinda Lanka" className="w-14 h-14 object-contain drop-shadow" />
                  <div>
                    <div className="font-mont font-bold text-[#0d47a1] text-base leading-tight">Dunhinda Lanka</div>
                    <div className="font-mont text-[10px] text-[#90a4ae] uppercase tracking-wider mt-0.5">Pure Mineral Water · Sri Lanka</div>
                  </div>
                  <span className="ml-auto text-[11px] font-mont font-bold text-[#1e88e5] bg-[#e3f2fd] px-3 py-1 rounded-full border border-[#90caf9]">
                    ISO ✓
                  </span>
                </div>

                {/* 4-stat grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Source Elevation", value: <><Counter end={2400} />m</>, icon: "🏔️" },
                    { label: "Natural Purity",   value: "100%",                       icon: "💧" },
                    { label: "Bottled Since",    value: "2026",                        icon: "📅" },
                    { label: "Every Drop",       value: "Traced",                      icon: "🔍" },
                  ].map((s) => (
                    <div key={s.label}
                      className="bg-gradient-to-br from-[#f0f8ff] to-[#e8f4fd] rounded-2xl border border-[#e3f2fd] p-4 hover:border-[#90caf9] hover:shadow-sm transition-all duration-300">
                      <div className="text-xl mb-1">{s.icon}</div>
                      <div className="font-mont font-bold text-xl text-[#1e88e5]">{s.value}</div>
                      <div className="font-mont text-[10px] text-[#90a4ae] uppercase tracking-wide mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tagline */}
                <div className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                     style={{ background: "linear-gradient(90deg,#1e88e5,#42a5f5)" }}>
                  <span className="text-xl">🌊</span>
                  <span className="font-mont text-white text-sm font-semibold">Pure. Natural. Sri Lankan.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="w-full bg-white border-y border-[#e3f2fd] py-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Source Elevation",   end: 2400,  suffix: "m" },
            { label: "Deliveries / Month", end: 18000, suffix: "+" },
            { label: "Corporate Clients",  end: 340,   suffix: "+" },
            { label: "Community Stations", end: 15,    suffix: "" },
          ].map((s, i) => (
            <div key={s.label}
              className="reveal text-center p-5 rounded-2xl bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] border border-[#e3f2fd] hover:border-[#90caf9] hover:shadow-md transition-all duration-300 group"
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="font-mont font-bold text-3xl md:text-4xl text-[#1e88e5] group-hover:scale-105 transition-transform duration-300">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="font-mont text-xs text-[#90a4ae] uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ WHY DUNHINDA ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
              💧 Our Difference
            </span>
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-3">
              Why <span className="text-[#1e88e5]">Dunhinda Lanka</span> Stands Apart
            </h2>
            <p className="font-mont text-[#1a237e] text-base max-w-xl mx-auto">
              In a world of ordinary hydration, we deliver something extraordinary — water that combines nature's perfection with modern responsibility.
            </p>
            <div className="section-rule mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map((point, i) => (
              <div key={point.title}
                className="reveal card-shine group bg-white rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="p-6 pb-4">
                  <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-2xl">{point.icon}</span>
                  </div>
                  <h3 className="font-mont font-bold text-base text-[#1a237e] mb-2">{point.title}</h3>
                  <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] mb-3 group-hover:w-16 transition-all duration-400" />
                  <p className="font-mont text-sm text-[#0d47a1] leading-relaxed">{point.desc}</p>
                </div>
                <div className="h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CORE PILLARS ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden"
               style={{ background: "linear-gradient(160deg,#e3f2fd 0%,#f8fbff 55%,#e8f4fd 100%)" }}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#42a5f5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1e88e5]/8  rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
              🌊 Our Foundation
            </span>
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-3">
              Our <span className="text-[#1e88e5]">Core Pillars</span>
            </h2>
            <p className="font-mont text-[#1a237e] text-base max-w-xl mx-auto">
              Three foundational values that guide everything we do — from source to shelf.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={p.title}
                className="reveal card-shine group bg-white rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 90}ms` }}>
                {/* Top colour band */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.grad}`} />
                <div className="p-7">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.grad} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{p.icon}</span>
                  </div>
                  <h3 className="font-mont font-bold text-lg text-[#1a237e] mb-3">{p.title}</h3>
                  <div className="w-8 h-0.5 rounded-full mb-4 group-hover:w-14 transition-all duration-400"
                       style={{ background: `linear-gradient(90deg,${p.accent},#42a5f5)` }} />
                  <p className="font-mont text-sm text-[#0d47a1] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TIMELINE ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8fbff] text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
              📅 Milestones
            </span>
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-3">
              Our <span className="text-[#1e88e5]">Journey</span>
            </h2>
            <p className="font-mont text-[#1a237e] text-base max-w-lg mx-auto">
              Key milestones that shaped Dunhinda Lanka into the brand it is today.
            </p>
            <div className="section-rule mt-6" />
          </div>

          <div className="relative">
            {/* Vertical spine */}
            <div className="hidden md:block absolute left-1/2 top-5 bottom-5 w-px -translate-x-1/2"
              style={{ background: "linear-gradient(to bottom, transparent, #90caf9 8%, #90caf9 92%, transparent)" }} />

            <div className="flex flex-col gap-9">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={item.year}
                    className="reveal flex flex-col md:flex-row items-center"
                    style={{ transitionDelay: `${i * 85}ms` }}>

                    {/* Card */}
                    <div className={`flex-1 w-full ${isLeft ? "md:pr-10 md:text-right" : "md:order-3 md:pl-10 md:text-left"}`}>
                      <div className="card-shine group bg-gradient-to-br from-[#f8fbff] to-[#e8f4fd] rounded-2xl border border-[#bbdefb] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                        <h3 className="font-mont font-bold text-base text-[#1a237e] mb-2">{item.title}</h3>
                        <div className={`w-8 h-0.5 rounded-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] mb-2 group-hover:w-14 transition-all duration-300 ${isLeft ? "md:ml-auto" : ""}`} />
                        <p className="font-mont text-sm text-[#0d47a1] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:flex order-2 w-11 h-11 rounded-full bg-[#1e88e5] border-4 border-white shadow-xl items-center justify-center shrink-0 z-10 mx-3 hover:scale-110 transition-transform duration-300">
                      <span className="text-sm">💧</span>
                    </div>

                    {/* Spacer */}
                    <div className={`flex-1 hidden md:block ${isLeft ? "md:order-3" : "md:order-1"}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SUSTAINABILITY ══════════ */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#f8fbff] to-[#e8f4fd] relative overflow-hidden">
        <div className="absolute top-10 right-0  w-56 h-56 bg-[#42a5f5]/20 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-[#1e88e5]/15 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1e88e5] text-xs font-mont font-semibold border border-[#90caf9] mb-5">
                🌱 Impact
              </span>
              <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mt-1 mb-2">
                Sustainability &<br/><span className="text-[#1e88e5]">Community</span>
              </h2>
              <p className="font-mont text-[#1a237e] text-sm md:text-base max-w-md">
                Supporting clean water access, environmental care, and local partnerships across Sri Lanka.
              </p>
            </div>
            <button
              onClick={() => navigate("/sustainability")}
              className="reveal font-mont text-sm px-6 py-2.5 rounded-full bg-[#1e88e5] text-white hover:bg-[#42a5f5] hover:-translate-y-0.5 transition-all duration-300 shadow-md flex items-center gap-2 self-start md:self-auto"
            >
              Learn More <span className="text-base leading-none">↗</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Ongoing · Badulla Region",  icon: "🚰", title: "Community Water Access",      desc: "Providing clean drinking water stations to rural schools and villages near our source areas. Target: 15 stations by 2027." },
              { tag: "Active · Western Province", icon: "♻️", title: "Recycling & Plastic Reduction", desc: "Bottle return reward programs and partnerships with recyclers to minimize our environmental footprint." },
              { tag: "2026 · Nationwide",         icon: "🏔️", title: "Highland Conservation",        desc: "Actively working to protect the spring ecosystems that make our water possible for future generations." },
            ].map((n, i) => (
              <article key={n.title}
                className="reveal card-shine group border border-[#bbdefb] rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{ transitionDelay: `${i * 75}ms` }}>
                <div className="h-1.5 w-full bg-gradient-to-r from-[#1e88e5] to-[#42a5f5]" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] flex items-center justify-center shrink-0 text-xl">
                      {n.icon}
                    </div>
                    <span className="font-mont text-[10px] uppercase tracking-[0.14em] text-[#0d47a1] leading-tight pt-2">{n.tag}</span>
                  </div>
                  <h3 className="font-mont font-semibold text-base text-[#1a237e] mb-2">{n.title}</h3>
                  <div className="w-8 h-0.5 rounded-full bg-[#1e88e5] mb-3 group-hover:w-12 transition-all duration-300" />
                  <p className="font-mont text-[#0d47a1] text-sm leading-relaxed flex-1">{n.desc}</p>
                  <button onClick={() => navigate("/sustainability")}
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
               style={{ background: "linear-gradient(135deg,#1565c0 0%,#1e88e5 50%,#42a5f5 100%)" }}>
        {/* Concentric rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {[700,500,330].map((s,i) => (
            <div key={i} className="absolute rounded-full border border-white/10"
                 style={{ width:s, height:s }} />
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
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            Experience Purity<br/>That Matters
          </h2>
          <p className="font-mont text-white/85 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Choose Dunhinda Lanka — where nature's finest water meets modern care and genuine responsibility. Delivered to your door, islandwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/shop")}
              className="px-8 py-3.5 rounded-full bg-white text-[#1e88e5] font-mont font-bold text-sm shadow-xl hover:bg-[#e3f2fd] hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group">
              Explore Our Range
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={() => navigate("/contact")}
              className="px-8 py-3.5 rounded-full bg-white/15 text-white font-mont font-bold text-sm border border-white/30 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
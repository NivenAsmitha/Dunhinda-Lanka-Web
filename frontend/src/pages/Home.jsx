// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import aboutVideo from "../assets/about-water-video.mp4"; // ← replace with your new video

import hero1 from "../assets/water-hero-1.jpg"; // ← your new hero images
import hero2 from "../assets/water-hero-2.jpg";

import directImg from "../assets/feature-purity.png";
import investImg from "../assets/feature-sustainability.png";
import blockchainImg from "../assets/feature-traceability.png";
import aiImg from "../assets/feature-quality.png";
import byproductImg from "../assets/feature-eco.png";

import prod1 from "../assets/water-500ml.png";
import prod2 from "../assets/water-1L.png";
import prod3 from "../assets/water-1.5L.png";
import prod4 from "../assets/water-5L.png";
import prod5 from "../assets/water-family.png";
import prod6 from "../assets/water-alkaline.png";

export default function Home() {
  const navigate = useNavigate();

  // -------------------------
  // HERO SLIDES
  // -------------------------
  const slides = useMemo(
    () => [
      {
        id: 1,
        title: "Pure. Natural. Sri Lankan.",
        subtitle:
          "Dunhinda Lanka brings crystal-clear mineral water from protected sources to every home and heart.",
        buttonLabel: "Explore Our Water",
        image: hero1,
        route: "/about",
      },
      {
        id: 2,
        title: "Hydration You Can Trust",
        subtitle:
          "From pristine springs to your table — purity, sustainability, and wellness in every drop.",
        buttonLabel: "Discover Our Range",
        image: hero2,
        route: "/products",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  const goToNext = () => setCurrent((p) => (p + 1) % slides.length);
  const goToPrev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  // -------------------------
  // FAQ
  // -------------------------
  const faqs = useMemo(
    () => [
      {
        question: "What is Dunhinda Lanka?",
        answer:
          "Dunhinda Lanka is a trusted Sri Lankan brand delivering pure mineral water sourced from protected natural origins, bottled with care for everyday hydration and wellness.",
      },
      {
        question: "Who can enjoy Dunhinda water?",
        answer:
          "Everyone — families, athletes, offices, hotels, restaurants, and health-conscious individuals who value clean, great-tasting drinking water.",
      },
      {
        question: "Where does the water come from?",
        answer:
          "Our water is sourced from carefully selected natural springs and deep wells in Sri Lanka, naturally filtered through rock layers for exceptional purity and mineral balance.",
      },
      {
        question: "Do you use any special technology?",
        answer:
          "We combine natural sourcing with modern filtration, UV treatment, and strict quality controls. Traceability is ensured through transparent production records.",
      },
      {
        question: "How does Dunhinda support sustainability?",
        answer:
          "We use eco-friendly bottling, promote responsible water sourcing, support local communities, and work towards reducing plastic impact through recycling initiatives.",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (idx) => setOpenIndex((p) => (p === idx ? null : idx));

  // -------------------------
  // PRODUCTS
  // -------------------------
  const products = useMemo(
    () => [
      {
        id: 1,
        name: "Dunhinda Natural Mineral Water 500 ml",
        description: "Portable • Everyday hydration • Rich in natural minerals",
        price: "Rs. 120.00",
        image: prod1,
      },
      {
        id: 2,
        name: "Dunhinda Premium 1 Litre",
        description: "Family size • Ideal for home & office • Pure & refreshing",
        price: "Rs. 220.00",
        image: prod2,
      },
      {
        id: 3,
        name: "Dunhinda Sport 750 ml",
        description: "Sports cap • Electrolyte-balanced • Perfect for active lifestyles",
        price: "Rs. 280.00",
        image: prod3,
      },
      {
        id: 4,
        name: "Dunhinda Glass Bottle 750 ml",
        description: "Premium glass • Elegant dining • Zero plastic taste",
        price: "Rs. 450.00",
        image: prod4,
      },
      {
        id: 5,
        name: "Dunhinda Family Pack 5 L",
        description: "Large refill • Home & office dispenser friendly • Economical",
        price: "Rs. 950.00",
        image: prod5,
      },
      {
        id: 6,
        name: "Dunhinda Alkaline Balance",
        description: "pH 8.0+ • Enhanced hydration • Wellness focused",
        price: "Rs. 380.00",
        image: prod6,
      },
    ],
    []
  );

  const visibleCount = 3;
  const [productIndex, setProductIndex] = useState(0);

  const nextProducts = () => setProductIndex((p) => (p + visibleCount) % products.length);
  const prevProducts = () => setProductIndex((p) => (p - visibleCount + products.length) % products.length);

  const extended = [...products, ...products];
  const visibleProducts = extended.slice(productIndex, productIndex + visibleCount);

  // -------------------------
  // Floating background emojis (water theme)
  // -------------------------
  function FloatingWaterElements() {
    const items = ["💧", "🌊", "🫗", "💦"];
    const [shapes, setShapes] = useState(() =>
      Array.from({ length: 12 }, (_, i) => {
        const baseSpeed = 0.05 + Math.random() * 0.08;
        const angle = Math.random() * Math.PI * 2;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: Math.cos(angle) * baseSpeed,
          vy: Math.sin(angle) * baseSpeed,
          size: 20 + Math.random() * 24,
          emoji: items[i % items.length],
        };
      })
    );

    useEffect(() => {
      let raf;
      const animate = () => {
        setShapes((prev) =>
          prev.map((s) => {
            let { x, y, vx, vy } = s;
            x += vx;
            y += vy;

            if (x < -10 || x > 110) vx = -vx;
            if (y < -10 || y > 110) vy = -vy;

            const wobble = (Math.random() - 0.5) * 0.015;
            vx += wobble;
            vy -= wobble * 0.5; // slight upward preference for water feel

            return { ...s, x: Math.max(-10, Math.min(110, x)), y: Math.max(-10, Math.min(110, y)), vx, vy };
          })
        );
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, []);

    return (
      <div className="pointer-events-none absolute inset-0 z-0">
        {shapes.map((s) => (
          <span
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              opacity: 0.16,
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
            }}
          >
            {s.emoji}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div id="home" className="bg-[#f8fbff]"> {/* light blue-white bg for water theme */}
      {/* ---------------- HERO ---------------- */}
      <section className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === current ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img src={slide.image} alt="hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4 max-w-4xl">
                <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs sm:text-sm border border-white/20 mb-4">
                  💧 Sri Lanka Pure Water
                </p>

                <h1 className="font-mont font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-snug mb-4">
                  {slide.title}
                </h1>

                <p className="font-mont text-white/90 text-sm sm:text-base md:text-lg mb-7">
                  {slide.subtitle}
                </p>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(slide.route)}
                    className="px-7 py-3 rounded-full bg-[#1e88e5] text-white text-sm font-semibold shadow hover:bg-[#42a5f5] transition"
                  >
                    {slide.buttonLabel}
                  </button>

                  <button
                    onClick={() => navigate("/shop")}
                    className="px-7 py-3 rounded-full bg-white/15 text-white text-sm font-semibold border border-white/30 hover:bg-white/25 transition"
                  >
                    Visit Shop
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-[#1e88e5] text-white w-11 h-11 rounded-full shadow z-30 flex items-center justify-center text-2xl border border-white/25 transition"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-[#1e88e5] text-white w-11 h-11 rounded-full shadow z-30 flex items-center justify-center text-2xl border border-white/25 transition"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition border border-white ${
                idx === current ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="w-full bg-[#e3f2fd] py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="md:pr-6">
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-4">
              Pure Water from <span className="text-[#1e88e5]">Sri Lanka’s Heart</span>
            </h2>

            <p className="font-mont text-[#1a237e] text-base md:text-lg leading-relaxed mb-6 text-justify">
              Dunhinda Lanka delivers clean, refreshing mineral water sourced responsibly and bottled with the highest standards of purity and care — for health, family, and the environment.
            </p>

            <ul className="space-y-3 font-mont text-[#1a237e] text-base">
              {[
                "Natural mineral-rich drinking water",
                "Sustainable sourcing & bottling",
                "Traceable quality from source to bottle",
                "Wellness-focused hydration solutions",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-[#42a5f5] text-xl">✔</span>
                  {t}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/about")}
              className="mt-8 px-7 py-3 rounded-full bg-[#1e88e5] text-white font-mont font-semibold hover:bg-[#42a5f5] transition shadow"
            >
              Learn More
            </button>
          </div>

          <div className="w-full md:pl-4">
            <video
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl shadow-md object-cover h-[280px] sm:h-[340px] md:h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section id="services" className="w-full bg-[#f8fbff] py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-4">
              Key <span className="text-[#1e88e5]">Features</span>
            </h2>
            <p className="font-mont text-[#1a237e] text-base md:text-lg mt-3">
              What makes Dunhinda Lanka your trusted water brand.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 auto-rows-[minmax(200px,1fr)]">
            {[
              { img: directImg, title: "Natural Purity", desc: "Sourced from protected springs and wells — naturally filtered." },
              { img: investImg, title: "Sustainable Sourcing", desc: "Responsible water extraction and eco-conscious practices." },
              { img: blockchainImg, title: "Full Traceability", desc: "Know exactly where your water comes from — transparent records.", tall: true },
              { img: aiImg, title: "Quality Assurance", desc: "Rigorous testing & modern treatment for consistent safety." },
              { img: byproductImg, title: "Eco Packaging", desc: "Recyclable bottles and initiatives to reduce environmental impact." },
            ].map((f) => (
              <div
                key={f.title}
                className={`relative rounded-2xl overflow-hidden border border-[#bbdefb] shadow-sm group cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl ${
                  f.tall ? "md:row-span-2" : ""
                }`}
              >
                <img src={f.img} alt={f.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors duration-300" />
                <div className="relative z-10 flex h-full items-center justify-center p-6 text-center text-white">
                  <p className="font-mont font-semibold text-sm md:text-base group-hover:opacity-0 transition-opacity duration-300">
                    {f.title}
                  </p>
                  <p className="font-mont text-xs md:text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center px-6">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRODUCTS ---------------- */}
      <section id="gallery" className="w-full bg-gradient-to-b from-white to-[#e8f4fd] py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-center md:text-left">
              <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1]">
                Popular <span className="text-[#1e88e5]">Products</span>
              </h2>
              <p className="font-mont text-sm md:text-base text-[#0d47a1] mt-2">
                Refreshing, pure water in every size and style.
              </p>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-[#1e88e5] text-white font-mont font-semibold rounded-xl hover:bg-[#42a5f5] active:scale-95 transition-all duration-300 flex items-center gap-2 group shadow-md"
            >
              View All Products
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={prevProducts}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#90caf9] text-white shadow-sm items-center justify-center hover:bg-[#1e88e5] hover:shadow-md transition"
              aria-label="Previous products"
            >
              ‹
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleProducts.map((p) => (
                <div
                  key={`${p.id}-${p.name}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#bbdefb] hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-mont font-semibold text-lg text-[#1a237e]">{p.name}</h3>
                    <p className="font-mont text-[#0d47a1] text-sm mt-2 mb-3 leading-relaxed">{p.description}</p>
                    <p className="font-mont text-[#1a237e] text-lg font-bold mb-4">{p.price}</p>

                    <button
                      onClick={() => navigate("/shop")}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#1e88e5] text-white font-mont text-sm font-semibold hover:bg-[#42a5f5] transition"
                    >
                      View in Shop
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextProducts}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#90caf9] text-white shadow-sm items-center justify-center hover:bg-[#1e88e5] hover:shadow-md transition"
              aria-label="Next products"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- INVESTMENT / COMMUNITY ---------------- */}
      <section className="w-full bg-gradient-to-b from-white to-[#f8fbff] py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <FloatingWaterElements />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-2">
                Sustainability & Community <span className="text-[#1e88e5]">Initiatives</span>
              </h2>
              <p className="font-mont text-[#0d47a1] text-sm md:text-base">
                Supporting clean water access, environmental care, and local partnerships.
              </p>
            </div>

            <button
              onClick={() => navigate("/sustainability")}
              className="font-mont text-sm px-6 py-2.5 rounded-full bg-[#1e88e5] text-white hover:bg-[#42a5f5] transition shadow-md flex items-center gap-2 self-start md:self-auto"
            >
              Learn More <span className="text-lg leading-none">↗</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-5">
              {[
                {
                  title: "Community Water Access Project – Badulla Region",
                  tag: "Ongoing Initiative",
                  desc: "Providing clean drinking water stations to rural schools and villages near our source areas.",
                  meta: ["Target: 15 stations", "Partners: Local NGOs", "Timeline: 2026–2027"],
                },
                {
                  title: "Recycling & Plastic Reduction Campaign",
                  tag: "Active Program",
                  desc: "Encouraging bottle return programs and partnering with recyclers to minimize environmental footprint.",
                  meta: ["Goal: 40% return rate", "Reward system", "Ongoing"],
                },
              ].map((p) => (
                <article
                  key={p.title}
                  className="bg-white border border-[#bbdefb] rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                    <h3 className="font-mont font-semibold text-lg text-[#1a237e]">{p.title}</h3>
                    <span className="text-xs font-mont font-semibold text-[#1e88e5] bg-[#e3f2fd] px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <p className="font-mont text-sm text-[#0d47a1] mb-3">{p.desc}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-mont text-[#1a237e]">
                    {p.meta.map((m) => (
                      <span key={m} className="bg-[#e8f4fd] px-3 py-1 rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[#bbdefb] shadow-md p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-mont font-bold text-xl text-[#0d47a1] mb-2">Share Your Feedback</h3>
                <p className="font-mont text-sm text-[#0d47a1] mb-4 leading-relaxed">
                  Have ideas on hydration, sustainability, new products or community support? Let us know.
                </p>

                <ul className="font-mont text-sm text-[#1a237e] space-y-2 mb-5">
                  {[
                    "New packaging or product suggestions",
                    "Ideas for water access in communities",
                    "Corporate wellness & hydration programs",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 text-[#1e88e5]">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full px-5 py-3 rounded-xl bg-[#1e88e5] text-white font-mont font-semibold hover:bg-[#42a5f5] transition shadow-md"
                >
                  Send Feedback
                </button>
                <p className="font-mont text-[11px] text-[#90a4ae] text-center">
                  Your input helps us serve better and protect our most precious resource — water.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- NEWS ---------------- */}
      <section className="w-full bg-gradient-to-b from-[#e8f4fd] to-[#e3f2fd] py-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-10 right-0 w-48 h-48 bg-[#42a5f5]/25 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-10 left-0 w-64 h-64 bg-[#1e88e5]/25 rounded-full blur-3xl opacity-60" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1] mb-2">
                Latest <span className="text-[#1e88e5]">Updates & News</span>
              </h2>
              <p className="font-mont text-[#0d47a1] text-base md:text-lg mt-2">
                Stay updated on our purity journey, sustainability efforts, and brand milestones.
              </p>
            </div>

            <button
              onClick={() => navigate("/news")}
              className="font-mont text-sm px-6 py-2.5 rounded-full bg-[#1e88e5] text-white hover:bg-[#42a5f5] transition shadow-md flex items-center gap-2 self-start md:self-auto"
            >
              View All News <span className="text-lg leading-none">↗</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Feb 2026 · Brand Update",
                title: "New 5L family refill packs now available islandwide",
                desc: "Convenient, economical, and eco-friendlier option for home and office use.",
              },
              {
                tag: "Jan 2026 · Sustainability",
                title: "Launch of bottle return reward program in Western Province",
                desc: "Customers earn credits for returning used bottles — supporting circular economy.",
              },
              {
                tag: "Dec 2025 · Community",
                title: "Clean water stations opened in three rural schools",
                desc: "Part of our ongoing commitment to provide safe drinking water to children.",
              },
            ].map((n) => (
              <article
                key={n.title}
                className="border border-[#bbdefb] rounded-2xl p-5 md:p-6 bg-gradient-to-br from-white to-[#e3f2fd] hover:from-[#e8f4fd] hover:to-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mont text-[11px] uppercase tracking-[0.12em] text-[#0d47a1] mb-2">{n.tag}</p>
                  <h3 className="font-mont font-semibold text-lg md:text-xl text-[#1a237e] mb-2">{n.title}</h3>
                  <p className="font-mont text-[#0d47a1] text-sm leading-relaxed">{n.desc}</p>
                </div>

                <button
                  onClick={() => navigate("/news")}
                  className="mt-4 font-mont text-xs md:text-sm text-[#1e88e5] hover:text-[#42a5f5] inline-flex items-center gap-1"
                >
                  Read more <span className="text-base leading-none">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="w-full bg-[#f8fbff] py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-mont font-bold text-3xl md:text-4xl text-[#0d47a1]">
              Frequently Asked <span className="text-[#1e88e5]">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={item.question} className="bg-white rounded-2xl shadow-sm border border-[#bbdefb]">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between px-6 py-5"
                  >
                    <span className="font-mont font-semibold text-[#1a237e] text-base">{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-[#90a4ae] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`px-6 pb-5 text-[#0d47a1] text-sm md:text-base font-mont transition-all duration-200 overflow-hidden ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="pt-1 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
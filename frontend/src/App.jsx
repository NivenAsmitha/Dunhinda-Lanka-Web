import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";

// Temporary placeholders so navigation works without errors
function Placeholder({ title }) {
  return (
    <section className="min-h-[70vh] pt-28 px-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">This page is under construction.</p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      {/* keep spacing because navbar is fixed */}
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />

          {/* These are used in your Home.jsx buttons */}
          <Route path="/shop" element={<Placeholder title="Shop" />} />
          <Route path="/investment" element={<Placeholder title="Investment" />} />
          <Route path="/ideas" element={<Placeholder title="Ideas" />} />
          <Route path="/news" element={<Placeholder title="News" />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

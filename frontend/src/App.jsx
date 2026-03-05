import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section id="home" className="min-h-screen p-10">
          Home
        </section>
        <section id="about" className="min-h-screen p-10">
          About
        </section>
        <section id="services" className="min-h-screen p-10">
          Services
        </section>
        <section id="gallery" className="min-h-screen p-10">
          Gallery
        </section>
        <section id="contact" className="min-h-screen p-10">
          Contact
        </section>
      </main>
    </>
  );
}

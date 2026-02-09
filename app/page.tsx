import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";

export default function Home() {
  return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* Accent decorativ */}
        <div className="w-24 h-px bg-wedding-forest/30 mb-12" />

        {/* Hero Section */}
        <header className="space-y-6 mb-12">
          <p className="text-wedding-forest font-sans font-bold tracking-[0.5em] uppercase text-xs md:text-sm opacity-80">
            {"Ne căsătorim"}
          </p>
          <h1 className="text-6xl md:text-9xl font-serif text-wedding-forest leading-tight">
            Izabela & Adelin
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-wedding-forest/90">
            9 August 2026 • România
          </p>
        </header>

        {/* Numărătoare inversă */}
        <Countdown />

        {/* Povestea Noastră */}
        <section className="mt-16 max-w-2xl w-full bg-white/40 backdrop-blur-md border border-white/60 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
          <h2 className="text-3xl font-serif text-wedding-forest mb-6">Povestea Noastră</h2>
          <p className="font-sans text-wedding-forest/90 leading-relaxed">
            {"De la laboratoarele de informatică din anul doi, la o viață plină de aventuri împreună. Suntem extrem de fericiți să începem acest nou capitol și abia așteptăm să sărbătorim alături de voi."}
          </p>

          <div className="mt-10 pt-8 border-t border-wedding-forest/10">
            <p className="text-wedding-rose font-bold tracking-widest uppercase text-[10px] mb-4">
              {"Confirmările se vor face aici în curând"}
            </p>
            <button className="bg-wedding-forest text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:scale-105 transition-all duration-300 shadow-xl opacity-50 cursor-not-allowed">
              {"RSVP Indisponibil"}
            </button>
          </div>
        </section>

        {/* Program */}
        <Schedule />

        {/* Footer Logo */}
        <div className="mt-20 opacity-30">
          <div className="w-16 h-16 border border-wedding-forest rounded-full flex items-center justify-center rotate-45">
            <span className="font-serif text-wedding-forest text-2xl -rotate-45">I&A</span>
          </div>
        </div>
      </main>
  );
}
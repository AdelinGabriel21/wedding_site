import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Location from "./components/Location";
import Gallery from "./components/Gallery";

export default function Home() {
    return (
        <div className="min-h-screen bg-wedding-cream selection:bg-wedding-pink selection:text-wedding-forest">

            {/* --- HERO SECTION CU VIDEO --- */}
            <section className="relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Elementul Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline // Obligatoriu pentru ca autoplay-ul să meargă pe iPhone
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay colorat (strat peste video pentru contrast)
            Folosim wedding-forest cu opacitate 30% pentru un look natural
        */}
                <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]" />

                {/* Conținutul Text (peste video) */}
                <div className="relative z-20 text-center px-6">
                    <p className="text-white font-sans font-bold tracking-[0.5em] uppercase text-xs md:text-sm mb-4 drop-shadow-md">
                        {"Ne căsătorim"}
                    </p>
                    <h1 className="text-6xl md:text-9xl font-serif text-white leading-tight drop-shadow-lg">
                        Izabela & Adelin
                    </h1>
                    <div className="w-16 h-px bg-white/60 mx-auto my-6" />
                    <p className="text-xl md:text-2xl font-serif italic text-white/90 drop-shadow-md">
                        {"9 August 2026 • România"}
                    </p>
                </div>
            </section>

            {/* --- RESTUL PAGINII --- */}
            <main className="flex flex-col items-center justify-center px-6 py-20 text-center">

                {/* Numărătoare Inversă */}
                <Countdown />

                {/* Galerie Foto */}
                <Gallery />

                {/* Povestea Noastră */}
                <section className="mt-16 max-w-2xl w-full bg-white/40 backdrop-blur-md border border-wedding-pink/50 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <h2 className="text-4xl font-serif text-wedding-forest mb-6">{"Povestea Noastră"}</h2>
                    <p className="font-sans text-wedding-forest/90 leading-relaxed text-lg">
                        {"De la laboratoarele de informatică din anul doi, unde codul ne-a adus împreună, la o viață plină de aventuri. Suntem extrem de fericiți să începem acest nou capitol și abia așteptăm să sărbătorim alături de voi."}
                    </p>
                </section>

                {/* Locație */}
                <Location />

                {/* Programul Zilei */}
                <Schedule />

                {/* Secțiune RSVP (Coming Soon) */}
                <section className="mt-20 py-20 border-t border-wedding-forest/10 w-full max-w-2xl">
                    <div className="space-y-6">
                        <p className="text-wedding-rose font-bold tracking-[0.2em] uppercase text-xs">
                            {"Confirmările se vor face aici în curând"}
                        </p>
                        <h3 className="text-2xl font-serif text-wedding-forest">
                            {"Vă rugăm să reveniți pentru detalii"}
                        </h3>
                        <div className="flex justify-center">
                            <button className="bg-wedding-forest/20 text-wedding-forest px-10 py-4 rounded-full font-bold tracking-widest uppercase text-xs cursor-not-allowed border border-wedding-forest/20">
                                {"RSVP Indisponibil"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-20 flex flex-col items-center gap-6 opacity-40">
                    <div className="w-16 h-16 border border-wedding-forest rounded-full flex items-center justify-center rotate-45">
                        <span className="font-serif text-wedding-forest text-2xl -rotate-45">{"I&A"}</span>
                    </div>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-wedding-forest">
                        {"August 2026 • Creat de Adelin"}
                    </p>
                </footer>
            </main>
        </div>
    );
}
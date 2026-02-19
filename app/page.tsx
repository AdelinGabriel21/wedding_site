import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import FadeIn from "./components/FadeIn";

export default function Home() {
    return (
        <div className="min-h-screen bg-wedding-cream selection:bg-wedding-pink selection:text-wedding-forest">

            {/* Hero Section - Acum h-screen pentru impact maxim */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>

                {/* Am schimbat overlay-ul la un gradient pentru a fi mai vizibil textul în partea de jos */}
                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

                <div className="relative z-20 text-center px-6">
                    <p className="text-white font-sans font-bold tracking-[0.5em] uppercase text-xs mb-4 drop-shadow-md">
                        {"Ne căsătorim"}
                    </p>
                    <h1 className="text-6xl md:text-9xl font-serif text-white drop-shadow-2xl">
                        Izabela & Adelin
                    </h1>
                    <div className="w-16 h-px bg-white/60 mx-auto my-8" />
                    <p className="text-xl md:text-2xl font-serif italic text-white/90 drop-shadow-md">
                        {"9 August 2026 • România"}
                    </p>
                </div>

                {/* Un mic indicator vizual (opțional) care sugerează că există conținut mai jos */}
                <div className="absolute bottom-10 z-20 animate-bounce">
                    <div className="w-px h-12 bg-white/50 mx-auto" />
                </div>
            </section>

            <main className="flex flex-col items-center justify-center px-6 py-20 text-center">

                {/* Animație pentru Countdown */}
                <FadeIn>
                    <Countdown />
                </FadeIn>

                {/* Animație pentru Galerie */}
                <div className="w-full">
                    <FadeIn delay={0.2}>
                        <Gallery />
                    </FadeIn>
                </div>

                {/* Animație pentru Povestea Noastră */}
                <FadeIn>
                    <section className="mt-16 max-w-2xl w-full bg-white/40 backdrop-blur-md border border-wedding-pink/50 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-4xl font-serif text-wedding-forest mb-6">{"Povestea Noastră"}</h2>
                        <p className="font-sans text-wedding-forest/90 leading-relaxed text-lg">
                            {"De la laboratoarele de informatică din anul doi, unde codul ne-a adus împreună, la o viață plină de aventuri împreună. Suntem extrem de fericiți să începem acest nou capitol și abia așteptăm să sărbătorim alături de voi."}
                        </p>
                    </section>
                </FadeIn>

                {/* Animație pentru Locație */}
                <FadeIn>
                    <Location />
                </FadeIn>

                {/* Animație pentru Program */}
                <FadeIn>
                    <Schedule />
                </FadeIn>

                {/* Footer */}
                <FadeIn delay={0.4}>
                    <footer className="mt-20 flex flex-col items-center gap-6 opacity-40">
                        <div className="w-16 h-16 border border-wedding-forest rounded-full flex items-center justify-center rotate-45">
                            <span className="font-serif text-wedding-forest text-2xl -rotate-45">{"I&A"}</span>
                        </div>
                        <p className="font-sans text-[10px] tracking-widest uppercase">
                            {"August 2026 • Creat de Adelin"}
                        </p>
                    </footer>
                </FadeIn>

            </main>
        </div>
    );
}
"use client";

import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import FadeIn from "./components/FadeIn";
import RsvpForm from "./components/RsvpForm";
import DressCode from "./components/DressCode";
import Image from "next/image"; // Importă Image din Next.js
import { Phone } from "lucide-react";

export default function Home() {
    const scrollToRsvp = () => {
        const element = document.getElementById("rsvp");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-wedding-bg selection:bg-wedding-rose selection:text-wedding-cream scroll-smooth">
            <Navbar />
            <BackToTop />

            {/* --- SECTION: HOME (HERO) --- */}
            <section
                id="home"
                className="relative h-screen min-h-160 w-full flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Am adăugat poster="/images/hero.png" aici 👇 */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/hero.png"
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]" />

                <div className="relative z-20 w-full h-full flex flex-col items-center justify-between pt-32 pb-12 px-6">
                    <div className="flex-1" />
                    <div className="text-center w-full">
                        <p className="text-wedding-cream font-sans font-bold tracking-[0.5em] uppercase text-xs mb-4 drop-shadow-md">
                            Ne căsătorim
                        </p>
                        <h1 className="text-6xl md:text-9xl font-serif text-white drop-shadow-2xl">
                            Izabela & Adelin
                        </h1>
                        <div className="w-16 h-px bg-white/60 mx-auto my-6 md:my-8" />
                        <p className="text-xl md:text-2xl font-serif italic text-wedding-cream drop-shadow-md">
                            9 August 2026 • Suceava
                        </p>
                    </div>

                    <div className="flex-1" />

                    <div className="w-full flex justify-center scale-90 md:scale-100 mb-8 md:mb-4">
                        <Countdown />
                    </div>

                    <div className="pb-8 z-30">
                        <button
                            onClick={scrollToRsvp}
                            className="inline-flex items-center justify-center bg-wedding-rose text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-wedding-cream hover:text-wedding-text transition-all shadow-2xl hover:scale-105 border border-wedding-rose/50"
                        >
                            Confirmă Prezența
                        </button>
                    </div>
                </div>
            </section>

            <main className="w-full flex flex-col">

                {/* --- SECTION: POVESTEA NOASTRĂ --- */}
                <section className="w-full bg-wedding-pink py-24 md:py-30 px-6">
                    <FadeIn className="max-w-3xl mx-auto text-center">
                        <p className="text-wedding-rose font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Cum a început totul</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-wedding-text mb-8">Povestea Noastră</h2>

                        <div className="font-sans text-wedding-text/90 leading-relaxed text-lg space-y-6">

                            {/* Container pentru citat și semnătură */}
                            <div className="mb-8 px-4 md:px-8">
                                <p className="font-serif italic text-xl md:text-2xl text-wedding-rose mb-2">
                                    „În încercarea personală de a-L căuta pe Dumnezeu, nu numai că ne-am apropiat de El, dar ne-am găsit și unul pe celălalt.”
                                </p>
                                <p className="font-serif italic text-wedding-rose/80 text-right text-base md:text-lg">
                                    - Izabela
                                </p>
                            </div>

                            <p>
                                Totul a început în vara anului 2023, la Școala Misionară a bisericii noastre (AZS-MR). Deși nu ne cunoșteam dinainte, pașii noștri au fost ghidați spre același loc, animați de aceeași dorință spirituală. După prima sesiune de cursuri am început să vorbim și să ne descoperim, iar o lună mai târziu povestea noastră a prins viață oficial.
                            </p>
                            <p>
                                Am continuat să creștem și să învățăm împreună, finalizând cursurile Școlii Misionare. Acum, ne pregătim cu emoție și recunoștință pentru cel mai important pas. Pe <strong>9 August 2026</strong>, cu binecuvântarea lui Dumnezeu, ne vom uni pentru veșnicie.
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* --- SECTION: SCHEDULE --- */}
                <section className="w-full bg-wedding-cream py-2x4 md:py-32 px-6">
                    <FadeIn id="schedule" className="max-w-3xl mx-auto">
                        <Schedule />
                    </FadeIn>
                </section>

                {/* --- SECTION: LOCATION --- */}
                <section className="w-full bg-wedding-bg py-24 md:py-32 px-6">
                    <FadeIn id="location" className="max-w-3xl mx-auto">
                        <Location />
                    </FadeIn>
                </section>

                {/* --- SECTION: DRESS CODE --- */}
                <DressCode />

                {/* --- SECTION: GALLERY --- */}
                <section className="w-full bg-wedding-bg py-24 px-6">
                    <FadeIn id="gallery" className="max-w-5xl mx-auto">
                        <Gallery />
                    </FadeIn>
                </section>

                {/* --- SECTION: CONTACT & RSVP --- */}
                <section className="w-full bg-wedding-bg pb-32 px-6">
                    <div className="max-w-3xl mx-auto space-y-24 md:space-y-32">

                        <FadeIn id="contact" className="w-full">
                            <h2 className="text-4xl md:text-5xl font-serif text-wedding-text mb-10 text-center">Contact</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 font-sans text-center">
                                {/* Card Izabela */}
                                <div className="p-8 bg-wedding-cream rounded-4xl shadow-md border border-white/50 flex flex-col items-center justify-center">
                                    <p className="text-wedding-rose font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Mireasă</p>
                                    <p className="text-2xl font-medium mb-3 text-wedding-text">Izabela</p>
                                    <a
                                        href="tel:+40773304376"
                                        className="inline-flex items-center gap-2 bg-white/60 px-5 py-2.5 rounded-full text-sm font-bold text-wedding-text/80 hover:text-wedding-rose hover:bg-white hover:scale-105 transition-all shadow-sm"
                                    >
                                        <Phone className="w-4 h-4" />
                                        0773 304 376
                                    </a>
                                </div>

                                {/* Card Adelin */}
                                <div className="p-8 bg-wedding-rose text-wedding-cream rounded-4xl shadow-md border border-white/20 flex flex-col items-center justify-center">
                                    <p className="text-wedding-pink font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Mire</p>
                                    <p className="text-2xl font-medium mb-3">Adelin</p>
                                    <a
                                        href="tel:+40773829445"
                                        className="inline-flex items-center gap-2 bg-wedding-pink/40 px-5 py-2.5 rounded-full text-sm font-bold text-wedding-cream hover:bg-wedding-pink/60 hover:scale-105 transition-all shadow-sm"
                                    >
                                        <Phone className="w-4 h-4" />
                                        0773 829 445
                                    </a>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn id="rsvp" className="w-full">
                            <div className="text-center mb-8">
                                <h2 className="text-4xl md:text-5xl font-serif text-wedding-text mb-4 italic">Vei fi alături de noi?</h2>
                                <p className="opacity-80 font-sans tracking-widest uppercase text-xs text-wedding-text">
                                    Te rugăm să confirmi prezența până la data de 1 Iulie 2026.
                                </p>
                            </div>
                            <RsvpForm />
                        </FadeIn>
                    </div>
                </section>

                {/* --- FOOTER CU LOGO --- */}
                <footer className="w-full bg-wedding-text py-16 flex flex-col items-center gap-6">
                    {/* Am revenit la fundalul roz, mărime elegantă și padding potrivit */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-wedding-rose rounded-full flex items-center justify-center shadow-lg p-3 overflow-hidden">
                        <Image
                            src="/images/logo.png"
                            alt="Logo Izabela & Adelin"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain drop-shadow-md"
                        />
                    </div>
                    <div className="space-y-1 text-center">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-wedding-moss font-bold">
                            August 2026 • Dragomirna, Suceava
                        </p>
                        <p className="font-sans text-[10px] italic text-wedding-moss/70">
                            Crafted with Love by Adelin
                        </p>
                    </div>
                </footer>

            </main>
        </div>
    );
}
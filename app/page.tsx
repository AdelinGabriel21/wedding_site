import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import FadeIn from "./components/FadeIn";

export default function Home() {
    return (
        <div className="min-h-screen bg-wedding-cream selection:bg-wedding-pink selection:text-wedding-forest scroll-smooth">
            {/* Componente Globale de Navigație */}
            <Navbar />
            <BackToTop />

            {/* --- SECTION: HOME (HERO) --- */}
            <section
                id="home"
                className="relative h-screen min-h-[650px] w-full flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Fundal Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>

                {/* Overlay întunecat */}
                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

                {/* Container flexibil pentru conținut (evită suprapunerea pe ecrane mici) */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-between pt-32 pb-12 px-6">

                    {/* Spațiu invizibil sus pentru a împinge textul spre mijloc */}
                    <div className="flex-1" />

                    {/* Blocul de Text */}
                    <div className="text-center w-full">
                        <p className="text-white font-sans font-bold tracking-[0.5em] uppercase text-xs mb-4 drop-shadow-md">
                            {"Ne căsătorim"}
                        </p>
                        <h1 className="text-6xl md:text-9xl font-serif text-white drop-shadow-2xl">
                            {"Izabela & Adelin"}
                        </h1>
                        <div className="w-16 h-px bg-white/60 mx-auto my-6 md:my-8" />
                        <p className="text-xl md:text-2xl font-serif italic text-white/90 drop-shadow-md">
                            {"9 August 2026 • România"}
                        </p>
                    </div>

                    {/* Spațiu invizibil între text și cronometru */}
                    <div className="flex-1" />

                    {/* Cronometrul la bază (în fluxul paginii, FĂRĂ absolute) */}
                    <div className="w-full flex justify-center scale-90 md:scale-100">
                        <Countdown />
                    </div>
                </div>
            </section>

            <main className="flex flex-col items-center justify-center px-6 py-20 text-center space-y-32 md:space-y-48">

                {/* Povestea Noastră */}
                <FadeIn>
                    <section className="max-w-2xl w-full bg-white/40 backdrop-blur-md border border-wedding-pink/50 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                        <h2 className="text-4xl font-serif text-wedding-forest mb-6">{"Povestea Noastră"}</h2>
                        <p className="font-sans text-wedding-forest/90 leading-relaxed text-lg">
                            {"De la laboratoarele de informatică din anul doi, unde codul ne-a adus împreună, la o viață plină de aventuri împreună. Suntem extrem de fericiți să începem acest nou capitol și abia așteptăm să sărbătorim alături de voi."}
                        </p>
                    </section>
                </FadeIn>

                {/* --- SECTION: SCHEDULE --- */}
                <div id="schedule" className="w-full pt-20">
                    <FadeIn>
                        <Schedule />
                    </FadeIn>
                </div>

                {/* --- SECTION: LOCATION --- */}
                <div id="location" className="w-full pt-20">
                    <FadeIn>
                        <Location />
                    </FadeIn>
                </div>

                {/* --- SECTION: DRESS CODE --- */}
                <section id="dress-code" className="w-full max-w-2xl mx-auto pt-20">
                    <FadeIn>
                        <div className="bg-white/50 backdrop-blur-sm border-2 border-wedding-moss/30 p-10 md:p-16 rounded-[3rem] shadow-inner">
                            <h2 className="text-4xl font-serif text-wedding-forest mb-6">{"Dress Code"}</h2>
                            <p className="font-sans text-wedding-forest/80 leading-relaxed text-lg">
                                {"Pentru a completa atmosfera magică a locației Forest Barn, vă sugerăm o ținută de tip "}
                                <span className="font-bold text-wedding-rose">{"Black Tie / Elegant"}</span>.
                                <br /><br />
                                {"Sugerăm culori calde și naturale (verde forest, crem, roz pal, bej) pentru a ne asorta cu decorul din inima pădurii."}
                            </p>
                        </div>
                    </FadeIn>
                </section>

                {/* --- SECTION: GALLERY --- */}
                <div id="gallery" className="w-full pt-20">
                    <FadeIn>
                        <Gallery />
                    </FadeIn>
                </div>

                {/* --- SECTION: CONTACT --- */}
                <section id="contact" className="w-full max-w-3xl mx-auto pt-20">
                    <FadeIn>
                        <h2 className="text-4xl font-serif text-wedding-forest mb-12">{"Contact"}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-wedding-forest font-sans">
                            <div className="p-6 bg-white/30 rounded-2xl border border-wedding-pink/30">
                                <p className="text-wedding-rose font-bold uppercase tracking-[0.2em] text-[10px] mb-3">{"Mireasă"}</p>
                                <p className="text-xl font-medium">{"Izabela"}</p>
                                <p className="text-sm opacity-70">{"07xx xxx xxx"}</p>
                            </div>
                            <div className="p-6 bg-white/30 rounded-2xl border border-wedding-pink/30">
                                <p className="text-wedding-rose font-bold uppercase tracking-[0.2em] text-[10px] mb-3">{"Mire"}</p>
                                <p className="text-xl font-medium">{"Adelin"}</p>
                                <p className="text-sm opacity-70">{"07xx xxx xxx"}</p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* --- SECTION: RSVP --- */}
                <section id="rsvp" className="w-full max-w-2xl mx-auto pt-20 pb-20">
                    <FadeIn>
                        <div className="bg-wedding-forest text-wedding-cream p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            {/* Element decorativ fundal */}
                            <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl" />

                            <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">{"Vei fi alături de noi?"}</h2>
                            <p className="mb-10 opacity-80 font-sans tracking-wide">
                                {"Confirmările vor fi disponibile în curând prin formularul nostru personalizat."}
                            </p>

                            <div className="flex flex-col items-center gap-4">
                                <button className="bg-wedding-cream text-wedding-forest px-12 py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] opacity-50 cursor-not-allowed shadow-lg">
                                    {"RSVP În Curând"}
                                </button>
                                <p className="text-[10px] uppercase tracking-tighter opacity-60">{"Termen limită: 1 Iulie 2026"}</p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* Footer */}
                <footer className="mt-20 flex flex-col items-center gap-8 opacity-40 pb-10">
                    <div className="w-16 h-16 border border-wedding-forest rounded-full flex items-center justify-center rotate-45">
                        <span className="font-serif text-wedding-forest text-2xl -rotate-45">{"I&A"}</span>
                    </div>
                    <div className="space-y-2">
                        <p className="font-sans text-[10px] tracking-[0.3em] uppercase">
                            {"August 2026 • Dragomirna, Suceava"}
                        </p>
                        <p className="font-sans text-[9px] italic">
                            {"Crafted with Love by Adelin"}
                        </p>
                    </div>
                </footer>

            </main>
        </div>
    );
}
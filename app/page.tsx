import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import FadeIn from "./components/FadeIn";
import RsvpForm from "./components/RsvpForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-wedding-bg selection:bg-wedding-rose selection:text-wedding-cream scroll-smooth">
            <Navbar />
            <BackToTop />

            {/* --- SECTION: HOME (HERO) --- */}
            <section
                id="home"
                className="relative h-screen min-h-162.5 w-full flex flex-col items-center justify-center overflow-hidden"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[2px]" />

                <div className="relative z-20 w-full h-full flex flex-col items-center justify-between pt-32 pb-12 px-6">
                    <div className="flex-1" />
                    <div className="text-center w-full">
                        <p className="text-wedding-cream font-sans font-bold tracking-[0.5em] uppercase text-xs mb-4 drop-shadow-md">
                            {"Ne căsătorim"}
                        </p>
                        <h1 className="text-6xl md:text-9xl font-serif text-white drop-shadow-2xl">
                            {"Izabela & Adelin"}
                        </h1>
                        <div className="w-16 h-px bg-white/60 mx-auto my-6 md:my-8" />
                        <p className="text-xl md:text-2xl font-serif italic text-wedding-cream drop-shadow-md">
                            {"9 August 2026 • România"}
                        </p>
                    </div>
                    <div className="flex-1" />
                    <div className="w-full flex justify-center scale-90 md:scale-100">
                        <Countdown />
                    </div>
                </div>
            </section>

            {/* MAIN WRAPPER - Fără constrângeri de lățime pentru a permite Color Blocking */}
            <main className="w-full flex flex-col">

                {/* --- SECTION: POVESTEA NOASTRĂ (Fundal Roz Pudrat Imersiv) --- */}
                <section className="w-full bg-wedding-pink py-24 md:py-32 px-6">
                    <FadeIn className="max-w-3xl mx-auto text-center">
                        <p className="text-wedding-rose font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Cum a început totul</p>
                        <h2 className="text-4xl md:text-5xl font-serif text-wedding-text mb-6">Povestea Noastră</h2>
                        <p className="font-sans text-wedding-text/90 leading-relaxed text-lg">
                            De la laboratoarele de informatică din anul doi, unde codul ne-a adus împreună, la o viață plină de aventuri împreună. Suntem extrem de fericiți să începem acest nou capitol și abia așteptăm să sărbătorim alături de voi.
                        </p>
                    </FadeIn>
                </section>

                {/* --- SECTION: SCHEDULE & LOCATION (Fundal Crem Luminos) --- */}
                <section id="schedule-location" className="w-full bg-wedding-cream py-24 md:py-32 px-6">
                    <div className="max-w-3xl mx-auto space-y-24">
                        <div id="schedule"><FadeIn><Schedule /></FadeIn></div>
                        <div id="location"><FadeIn><Location /></FadeIn></div>
                    </div>
                </section>

                {/* --- SECTION: DRESS CODE (Fundal Verde Moss Imersiv) --- */}
                <section id="dress-code" className="w-full bg-wedding-moss py-24 md:py-32 px-6 text-wedding-cream">
                    <FadeIn className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">Dress Code</h2>
                        <p className="font-sans text-white/90 leading-relaxed text-lg">
                            Pentru a completa atmosfera magică a locației Forest Barn, vă sugerăm o ținută de tip <span className="font-bold text-wedding-text">Black Tie / Elegant</span>.
                            <br /><br />
                            Sugerăm culori calde și naturale pentru a ne asorta cu decorul din inima pădurii.
                        </p>
                    </FadeIn>
                </section>

                {/* --- SECTION: GALLERY (Fundal Kaki) --- */}
                <section id="gallery" className="w-full bg-wedding-bg py-24 px-6">
                    <FadeIn className="max-w-5xl mx-auto">
                        <Gallery />
                    </FadeIn>
                </section>

                {/* --- SECTION: CONTACT & RSVP (Fundal Kaki - Aici aducem casetele înapoi) --- */}
                <section className="w-full bg-wedding-bg pb-32 px-6">
                    <div className="max-w-3xl mx-auto space-y-24 md:space-y-32">

                        {/* Contact Cards */}
                        <FadeIn id="contact" className="w-full">
                            <h2 className="text-4xl md:text-5xl font-serif text-wedding-text mb-10 text-center">Contact</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 font-sans text-center">
                                {/* Card Mireasă */}
                                <div className="p-8 bg-wedding-cream rounded-4xl shadow-md border border-white/50">
                                    <p className="text-wedding-rose font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Mireasă</p>
                                    <p className="text-2xl font-medium mb-1 text-wedding-text">Izabela</p>
                                    <p className="text-sm text-wedding-text/70">07xx xxx xxx</p>
                                </div>
                                {/* Card Mire */}
                                <div className="p-8 bg-wedding-rose text-wedding-cream rounded-4xl shadow-md border border-white/20">
                                    <p className="text-wedding-pink font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Mire</p>
                                    <p className="text-2xl font-medium mb-1">Adelin</p>
                                    <p className="text-sm opacity-90">07xx xxx xxx</p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* RSVP Form */}
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

                {/* --- FOOTER (Fundal Verde Închis Contrastant) --- */}
                <footer className="w-full bg-wedding-text py-16 flex flex-col items-center gap-6">
                    <div className="w-14 h-14 bg-wedding-rose text-wedding-cream rounded-full flex items-center justify-center shadow-lg">
                        <span className="font-serif text-xl">I&A</span>
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
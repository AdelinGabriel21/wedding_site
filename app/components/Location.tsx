"use client";

import { MapPin, Navigation } from "lucide-react";

export default function Location() {
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=The+Forest+Barn+Dragomirna&query_place_id=ChIJf4Vbc5P5NEcRmIw9xdpxpgE";

    return (
        // Am redus py-20 la py-4 md:py-8 pentru a tăia din spațiul excesiv
        <section className="w-full max-w-4xl mx-auto px-6 py-4 md:py-8 text-center">
            <h2 className="text-4xl font-serif text-wedding-text mb-12">Locație</h2>

            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 overflow-hidden shadow-2xl">

                {/* Partea superioară: Imaginea locației cu Pin-ul suprapus */}
                <div className="relative h-64 md:h-80 w-full flex items-center justify-center border-b border-white/40 bg-wedding-moss/20">
                    {/* Imaginea Barn.png așezată sub pin */}
                    <img
                        src="/images/Barn.png"
                        alt="The Forest Barn"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Un filtru subtil întunecat (20%) peste imagine ca să iasă în evidență pin-ul alb */}
                    <div className="absolute inset-0 bg-wedding-text/20"></div>

                    {/* Pin-ul de locație așezat deasupra (z-10) */}
                    <MapPin className="relative z-10 w-12 h-12 text-white drop-shadow-md opacity-90" />
                </div>

                <div className="p-8 md:p-12">
                    <h3 className="text-2xl font-serif text-wedding-text mb-2">The Forest Barn</h3>
                    <p className="text-wedding-text/80 font-sans mb-6">
                        Sat Dragomirna, Comuna Mitocu Dragomirnei, Jud. Suceava <br/>
                    </p>

                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-wedding-text text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-wedding-rose transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Navigation className="w-4 h-4" />
                        Vezi pe Hartă / Navighează
                    </a>
                </div>
            </div>
        </section>
    );
}
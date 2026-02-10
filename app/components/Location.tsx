"use client";

import { MapPin, Navigation } from "lucide-react";

export default function Location() {
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=The+Forest+Barn+Dragomirna&query_place_id=ChIJf4Vbc5P5NEcRmIw9xdpxpgE";

    return (
        <section className="py-20 w-full max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif text-wedding-forest mb-12">Locație</h2>

            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 overflow-hidden shadow-sm">
                {/* Imagine de tip placeholder pentru locație */}
                <div className="h-64 bg-wedding-moss/20 flex items-center justify-center border-b border-white/40">
                    <MapPin className="w-12 h-12 text-wedding-forest opacity-30" />
                </div>

                <div className="p-8 md:p-12">
                    <h3 className="text-2xl font-serif text-wedding-forest mb-2">The Forest Barn</h3>
                    <p className="text-wedding-forest/70 font-sans mb-6">
                        Sat Dragomirna, Comuna Mitocu Dragomirnei, Jud. Suceava <br/>
                        (Lângă Mănăstirea Dragomirna)
                    </p>

                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-wedding-forest text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-wedding-rose transition-all shadow-lg"
                    >
                        <Navigation className="w-4 h-4" />
                        Vezi pe Hartă / Navigrează
                    </a>
                </div>
            </div>
        </section>
    );
}
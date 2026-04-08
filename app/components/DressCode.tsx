"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const colorGroups = [
    {
        id: "green",
        name: "Matcha Green",
        mainHex: "#A9B890",
        shades: [
            { name: "Light Sage", hex: "#CFDAC8" },
            { name: "Sage Green", hex: "#B2C2A4" },
            { name: "Dark Green", hex: "#3B5B44" }
        ]
    },
    {
        id: "pink",
        name: "Dusty Pink",
        mainHex: "#E8B4B8",
        shades: [
            { name: "Peach Pink", hex: "#F5C6B5" },
            { name: "Blush", hex: "#F1C1C6" },
            { name: "Raspberry Pink", hex: "#CE4A7E" }
        ]
    },
    {
        id: "yellow",
        name: "Butter Yellow",
        mainHex: "#FDF1B8",
        shades: [
            { name: "Pale Yellow", hex: "#FDF5CA" },
            { name: "Vanilla Custard", hex: "#F3E5AB" },
            { name: "Curds & Whey", hex: "#E5D3B3" }
        ]
    },
    {
        id: "blue",
        name: "Baby Blue",
        mainHex: "#C1D5E9",
        shades: [
            { name: "Ice Blue", hex: "#DDE6EE" },
            { name: "Dusty Blue", hex: "#A8B8CC" },
            { name: "Steel Blue", hex: "#8A9AAB" }
        ]
    }
];

export default function DressCode() {
    const [activeColor, setActiveColor] = useState<string | null>(null);

    const selectedGroup = colorGroups.find(c => c.id === activeColor);

    return (
        <section className="w-full bg-wedding-moss py-24 md:py-32 px-6 text-wedding-cream">
            <FadeIn id="dress-code" className="max-w-4xl mx-auto text-center">

                {/* Titlu și descriere */}
                <h2 className="text-4xl md:text-5xl font-serif mb-2 text-white">Dress Code</h2>
                <p className="font-sans text-white/80 tracking-widest uppercase text-[10px] md:text-xs font-bold mb-8">
                    (Opțional - dar ne-ar bucura enorm)
                </p>
                <p className="font-sans text-white/90 leading-relaxed text-lg max-w-2xl mx-auto mb-16">
                    Pentru a completa atmosfera magică a locației Forest Barn, vă sugerăm o ținută de tip <span className="font-bold text-white">Garden Formal</span>. Dacă doriți să vă asortați cu tematica noastră de vară, vă propunem o paletă de culori pastelate, calde sau vibrante.
                    <br /><br />
                    Am pregătit mai jos o selecție interactivă cu nuanțele noastre preferate. Alegeți o culoare pentru inspirație!
                </p>

                {/* Cardul Interactiv */}
                <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-6 md:p-12 shadow-2xl text-wedding-text max-w-2xl mx-auto">
                    <h3 className="font-serif text-2xl mb-8">Paleta Culorilor</h3>

                    {/* Bulele Principale - Am adăugat shrink-0 și am redus gap-ul la 4 pe mobil */}
                    <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 mb-4">
                        {colorGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => setActiveColor(group.id === activeColor ? null : group.id)}
                                className={`relative rounded-full shrink-0 transition-all duration-300 border border-black/5 ${
                                    activeColor === group.id
                                        ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ring-4 ring-offset-4 ring-wedding-rose scale-110 shadow-lg z-10"
                                        : "w-16 h-16 md:w-20 md:h-20 hover:scale-110 shadow-md hover:shadow-lg opacity-80 hover:opacity-100"
                                            // ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ring-2 ring-offset-2 md:ring-4 md:ring-offset-4 ring-wedding-rose scale-110 shadow-lg z-10"
                                            // : "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 hover:scale-110 shadow-md hover:shadow-lg opacity-80 hover:opacity-100"
                                }`}
                                style={{ backgroundColor: group.mainHex }}
                                aria-label={group.name}
                            />
                        ))}
                    </div>

                    {/* Zona care se extinde */}
                    <AnimatePresence>
                        {selectedGroup && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pt-8 mt-4 border-t border-wedding-text/10">
                                    <div className="mb-6">
                                        <p className="font-serif text-2xl text-wedding-rose mb-1">{selectedGroup.name}</p>
                                        <p className="font-sans text-xs uppercase tracking-widest opacity-60 font-bold">{selectedGroup.mainHex}</p>
                                    </div>

                                    <p className="font-sans text-xs uppercase tracking-widest mb-6 opacity-70">Nuanțe complementare</p>

                                    {/* Am redus gap-ul și aici pe mobil, ca să nu se spargă pe rândul următor și am pus shrink-0 */}
                                    <div className="flex justify-center gap-4 sm:gap-6 md:gap-10">
                                        {selectedGroup.shades.map((shade, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-3 group cursor-default">
                                                <div
                                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0 shadow-md border border-black/5 group-hover:scale-110 transition-transform duration-300"
                                                    style={{ backgroundColor: shade.hex }}
                                                />
                                                <div className="text-center">
                                                    <p className="font-sans text-[10px] font-bold uppercase tracking-wider opacity-80 whitespace-nowrap">{shade.name}</p>
                                                    <p className="font-sans text-[9px] opacity-50">{shade.hex}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </FadeIn>
        </section>
    );
}
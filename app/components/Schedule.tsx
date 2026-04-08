"use client";

import { Heart, Utensils, Cake } from "lucide-react";

const events = [
    {
        time: "14:00",
        title: "Cununia Religioasă",
        desc: "Momentul în care spunem „Da”.",
        icon: <Heart className="w-5 h-5" />,
    },
    {
        time: "16:00",
        title: "Masa",
        desc: "Bucate alese, și socializare.",
        icon: <Utensils className="w-5 h-5" />,
    },
    {
        time: "23:00",
        title: "Tortul",
        desc: "Momentul dulce al serii.",
        icon: <Cake className="w-5 h-5" />,
    },
];

export default function Schedule() {
    return (
        // Am adăugat py-12 pe mobil și py-16 pe desktop pentru a lăsa spațiu sus și jos
        <section className="w-full max-w-4xl mx-auto px-6 py-12 md:py-2">
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-text text-center mb-4">
                Programul Zilei
            </h2>
            <p className="text-center text-wedding-text/60 italic mb-12 font-sans">
                *Programul final va fi confirmat în curând
            </p>

            <div className="relative border-l-2 border-wedding-moss/50 ml-4 md:mx-auto md:max-w-xs">
                {events.map((event, index) => (
                    <div key={index} className="mb-12 ml-8 relative group">
                        {/* Bula cu iconița de pe axa timpului */}
                        <div className="absolute -left-12.75 top-0 bg-wedding-pink border-[3px] border-wedding-cream w-10 h-10 rounded-full flex items-center justify-center text-wedding-rose shadow-md group-hover:scale-110 transition-transform duration-300">
                            {event.icon}
                        </div>

                        {/* Caseta evenimentului */}
                        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300">
                            <span className="font-sans font-bold text-wedding-rose text-xs tracking-widest uppercase mb-2 block">
                                {event.time}
                            </span>
                            <h3 className="text-2xl font-serif text-wedding-text mb-2">
                                {event.title}
                            </h3>
                            <p className="text-wedding-text/80 font-sans text-sm leading-relaxed">
                                {event.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
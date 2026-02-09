"use client";

import { GlassWater, Heart, Music, Utensils } from "lucide-react";

const events = [
    {
        time: "16:00",
        title: "Cununia Religioasă",
        desc: "Momentul în care spunem 'Da'.",
        icon: <Heart className="w-5 h-5" />,
    },
    {
        time: "18:00",
        title: "Cocktail",
        desc: "Băuturi răcoritoare și socializare.",
        icon: <GlassWater className="w-5 h-5" />,
    },
    {
        time: "19:30",
        title: "Petrecerea",
        desc: "Cină, dans și voie bună până dimineața.",
        icon: <Music className="w-5 h-5" />,
    },
];

export default function Schedule() {
    return (
        <section className="py-20 w-full max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-serif text-wedding-forest text-center mb-4">
                Programul Zilei
            </h2>
            <p className="text-center text-wedding-forest/60 italic mb-12 font-sans">
                *Programul final va fi confirmat în curând
            </p>

            <div className="relative border-l-2 border-wedding-forest/20 ml-4 md:mx-auto md:max-w-xs">
                {events.map((event, index) => (
                    <div key={index} className="mb-12 ml-8 relative">
                        <div className="absolute -left-[51px] top-0 bg-wedding-pink border-2 border-wedding-forest/30 w-10 h-10 rounded-full flex items-center justify-center text-wedding-forest">
                            {event.icon}
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-sm">
              <span className="font-sans font-bold text-wedding-rose text-xs tracking-widest uppercase">
                {event.time}
              </span>
                            <h3 className="text-xl font-serif text-wedding-forest mt-1">
                                {event.title}
                            </h3>
                            <p className="text-wedding-forest/70 font-sans text-sm mt-1">
                                {event.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
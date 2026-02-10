"use client";

import Image from "next/image";

export default function Gallery() {
    // Lista ta de imagini din folderul /public/images/
    // Poți adăuga aici mai multe după ce le uploadezi
    const photos = [
        { src: "/images/noi.jpg", alt: "Izabela și Adelin la munte" },
        // Adaugă aici restul pozelor pe măsură ce le ai
    ];

    return (
        <section className="py-20 w-full max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-serif text-wedding-forest text-center mb-12">
                Momentele Noastre
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="group relative aspect-4/5 overflow-hidden rounded-4xl border-8 border-white shadow-xl transition-transform hover:scale-[1.01]"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill // Face imaginea să umple containerul
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0} // Prima poză se încarcă cu prioritate
                        />
                        {/* Overlay discret la hover */}
                        <div className="absolute inset-0 bg-wedding-forest/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            <p className="text-center mt-12 text-wedding-forest/50 italic font-serif">
                {"„Fiecare poză spune o parte din povestea noastră...”"}
            </p>
        </section>
    );
}
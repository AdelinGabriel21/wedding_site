"use client";

import Image from "next/image";

export default function Gallery() {
    // Am mapat exact numele fișierelor tale, respectând extensiile (.jpg, .jpeg, .JPEG)
    const photos = [
        { src: "/images/gallery/1.jpg", alt: "Moment 1" },
        { src: "/images/gallery/2.jpg", alt: "Moment 2" },
        { src: "/images/gallery/3.jpg", alt: "Moment 3" },
        { src: "/images/gallery/4.jpeg", alt: "Moment 4" },
        { src: "/images/gallery/5.jpeg", alt: "Moment 5" },
        { src: "/images/gallery/6.jpg", alt: "Moment 6" },
        { src: "/images/gallery/7.jpg", alt: "Moment 7" },
        { src: "/images/gallery/8.JPEG", alt: "Moment 8" },
    ];

    return (
        <div className="w-full text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-text mb-4">
                Momentele Noastre
            </h2>
            <p className="text-wedding-text/60 italic mb-10 md:mb-16 font-sans">
                „Fiecare poză spune o parte din povestea noastră...”
            </p>

            {/* Grid-ul galeriei */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-4xl md:rounded-[2.5rem] border-4 border-white/80 shadow-md hover:shadow-xl transition-all duration-500"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            // Optimizare pentru a încărca dimensiunile corecte pe ecrane mici/mari
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {/* Overlay fin la hover pentru a păstra coerența culorilor */}
                        <div className="absolute inset-0 bg-wedding-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
}
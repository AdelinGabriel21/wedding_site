"use client";

import { useState, useEffect } from "react";
import { ArrowUp, CalendarHeart } from "lucide-react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToRsvp = () => {
        const element = document.getElementById("rsvp");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end gap-3 z-40 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
        >
            {/* Butonul de Back to Top - Acum deasupra */}
            <button
                onClick={scrollToTop}
                className="bg-white/90 backdrop-blur-md text-wedding-text p-3 rounded-full shadow-lg border border-white/50 hover:bg-wedding-moss hover:text-white transition-colors"
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5" />
            </button>

            {/* Buton "Confirmă Prezența" - Bulă rotundă pe mobil, extins pe desktop */}
            <button
                onClick={scrollToRsvp}
                className="flex items-center justify-center gap-2 bg-wedding-rose text-white p-3 md:px-5 md:py-3 rounded-full shadow-xl hover:bg-wedding-text hover:scale-105 transition-all"
                aria-label="Confirmă Prezența"
            >
                <CalendarHeart className="w-5 h-5" />
                <span className="hidden md:inline font-sans text-[10px] tracking-widest uppercase font-bold">
                    Confirmă Prezența
                </span>
            </button>
        </div>
    );
}
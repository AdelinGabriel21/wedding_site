"use client";

import { useState, useEffect } from "react";
import { ArrowUp, CalendarHeart } from "lucide-react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Arată butoanele după ce dăm scroll mai jos de Hero
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
            {/* Buton "Confirmă Prezența" Plutitor */}
            <button
                onClick={scrollToRsvp}
                className="flex items-center gap-2 bg-wedding-rose text-white px-5 py-3 rounded-full shadow-xl hover:bg-wedding-text hover:scale-105 transition-all"
            >
                <CalendarHeart className="w-4 h-4" />
                <span className="font-sans text-[10px] tracking-widest uppercase font-bold">Confirmă Prezența</span>
            </button>

            {/* Butonul de Back to Top tradițional */}
            <button
                onClick={scrollToTop}
                className="bg-white/90 backdrop-blur-md text-wedding-text p-3 rounded-full shadow-lg border border-white/50 hover:bg-wedding-moss hover:text-white transition-colors"
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </div>
    );
}
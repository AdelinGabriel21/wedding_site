"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Aproximăm 80% din înălțimea ecranului ca punct de trecere spre "Povestea Noastră"
            const heroHeight = window.innerHeight * 0.8;

            // 1. Logica pentru fundal (când primește aspectul de "sticlă")
            setIsScrolled(currentScrollY > 50);

            // 2. Logica pentru Show / Hide
            if (currentScrollY < heroHeight) {
                // Cât timp suntem pe videoclipul principal, bara stă mereu pe ecran
                setIsVisible(true);
            } else {
                // Am trecut de prima secțiune, activăm ascunderea inteligentă
                const delta = currentScrollY - lastScrollY;

                // Ignorăm mișcările de scroll foarte mici (sub 12px) ca să prevenim "glitch"-urile
                // când utilizatorul mișcă doar un pic degetul în sus și în jos
                if (Math.abs(delta) > 12) {
                    if (delta > 0) {
                        // Scroll în JOS -> Ascundem
                        setIsVisible(false);
                        setIsMobileMenuOpen(false); // Închidem meniul automat pentru UX curat
                    } else {
                        // Scroll în SUS -> Arătăm
                        setIsVisible(true);
                    }
                }
            }

            // Actualizăm poziția (prevenim valorile negative de la efectul de "bounce" din Safari)
            lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navItems = [
        { label: "Acasă", id: "home" },
        { label: "Program", id: "schedule" },
        { label: "Locație", id: "location" },
        { label: "Dress Code", id: "dress-code" },
        { label: "Galerie", id: "gallery" },
        { label: "Contact", id: "contact" },
    ];

    const isSolid = isScrolled || isMobileMenuOpen;

    return (
        // Aici am adăugat animația care mută bara complet în sus (-translate-y-[150%]) când isVisible este false
        <div
            className={`fixed top-0 left-0 w-full z-50 px-4 pt-4 md:px-8 md:pt-3 pointer-events-none flex justify-center transition-transform duration-500 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-[150%]"
            }`}
        >
            <nav
                className={`pointer-events-auto relative w-full max-w-6xl mx-auto flex items-center justify-between transition-all duration-500 ${
                    isSolid
                        ? "bg-white/95 backdrop-blur-md shadow-xl rounded-full px-6 md:px-10 py-3 border border-white/50"
                        : "bg-transparent px-2 md:px-4 py-4"
                }`}
            >
                {/* LOGO-UL */}
                <div
                    onClick={() => scrollToSection("home")}
                    className="cursor-pointer flex items-center"
                >
                    <Image
                        src={isSolid ? "/images/logo-black.png" : "/images/logo.png"}
                        alt="Logo Izabela & Adelin"
                        width={120}
                        height={48}
                        priority
                        className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${!isSolid ? "drop-shadow-lg" : ""}`}
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all ${
                                isSolid
                                    ? "text-wedding-text opacity-70 hover:opacity-100 hover:text-wedding-rose"
                                    : "text-white opacity-80 drop-shadow-sm hover:drop-shadow-md hover:opacity-100"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    {/* Buton RSVP Highlighted */}
                    <button
                        onClick={() => scrollToSection("rsvp")}
                        className="bg-wedding-rose text-white font-sans text-xs tracking-[0.2em] uppercase font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-wedding-text hover:shadow-lg transition-all"
                    >
                        RSVP
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden transition-transform active:scale-95 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={`w-6 h-6 transition-colors ${isSolid ? "text-wedding-text" : "text-white"}`} />
                    ) : (
                        <Menu className={`w-6 h-6 transition-colors ${isSolid ? "text-wedding-text" : "text-white"}`} />
                    )}
                </button>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="md:hidden absolute top-[calc(100%+1rem)] left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl py-8 flex flex-col items-center gap-6 border border-wedding-pink/50"
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="font-sans text-sm tracking-[0.2em] uppercase font-bold text-wedding-text hover:text-wedding-rose transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollToSection("rsvp")}
                                className="bg-wedding-rose text-white font-sans text-sm tracking-[0.2em] uppercase font-bold px-8 py-3 rounded-full shadow-md hover:bg-wedding-text transition-all mt-2"
                            >
                                RSVP
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
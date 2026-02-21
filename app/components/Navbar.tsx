"use client";

import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Acasă", href: "#home" },
    { name: "Program", href: "#schedule" },
    { name: "Locație", href: "#location" },
    { name: "Dress Code", href: "#dress-code" },
    { name: "Galerie", href: "#gallery" },
    { name: "Contact", href: "#contact" },
    { name: "RSVP", href: "#rsvp" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isSolid = scrolled || isOpen;

    const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);

        // Funcția separată de scroll
        const performScroll = () => {
            if (element) {
                const navbarHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };

        // AICI E MAGIA:
        if (isOpen) {
            // Dacă suntem pe mobil și meniul e deschis:
            setIsOpen(false); // 1. Închidem meniul
            setTimeout(performScroll, 300); // 2. Așteptăm 300ms (cât durează animația de ieșire) apoi facem scroll
        } else {
            // Dacă suntem pe desktop:
            performScroll(); // Facem scroll instantaneu
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isSolid ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">

                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, "#home")}
                    className={`font-serif text-2xl font-bold transition-colors duration-300 cursor-pointer ${
                        isSolid ? "text-wedding-forest" : "text-white"
                    }`}
                >
                    I&A
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 cursor-pointer ${
                                isSolid
                                    ? "text-wedding-forest hover:text-wedding-rose"
                                    : "text-white hover:text-white/70"
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className={`md:hidden transition-colors duration-300 p-2 -mr-2 ${
                        isSolid ? "text-wedding-forest" : "text-white"
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-lg border-b border-wedding-pink overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    // Am adăugat block, w-full și py-4 pentru a face TOATĂ lățimea rândului apăsabilă
                                    className="block w-full py-4 text-sm uppercase tracking-widest text-wedding-forest font-bold cursor-pointer active:text-wedding-rose transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
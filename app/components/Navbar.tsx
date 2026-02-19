"use client";

import { useState, useEffect } from "react";
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

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="font-serif text-2xl text-wedding-forest font-bold">I&A</a>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-xs uppercase tracking-widest text-wedding-forest hover:text-wedding-rose transition-colors font-bold">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-wedding-forest" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-lg border-b border-wedding-pink"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-widest text-wedding-forest font-bold">
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
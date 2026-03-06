"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
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

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <div
                    onClick={() => scrollToSection("home")}
                    className={`font-serif text-2xl cursor-pointer ${isScrolled ? "text-wedding-text" : "text-white drop-shadow-md"}`}
                >
                    I & A
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`font-sans text-xs tracking-[0.2em] uppercase font-bold hover:opacity-100 transition-opacity ${
                                isScrolled ? "text-wedding-text opacity-70" : "text-white opacity-80 drop-shadow-sm hover:drop-shadow-md"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    {/* Buton RSVP Highlighted */}
                    <button
                        onClick={() => scrollToSection("rsvp")}
                        className="bg-wedding-rose text-white font-sans text-xs tracking-[0.2em] uppercase font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-wedding-text hover:shadow-lg transition-all"
                    >
                        RSVP
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={`w-6 h-6 ${isScrolled ? "text-wedding-text" : "text-white"}`} />
                    ) : (
                        <Menu className={`w-6 h-6 ${isScrolled ? "text-wedding-text" : "text-white"}`} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-wedding-pink shadow-xl py-6 flex flex-col items-center gap-6">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="font-sans text-sm tracking-[0.2em] uppercase font-bold text-wedding-text"
                        >
                            {item.label}
                        </button>
                    ))}
                    {/* Buton RSVP Highlighted pe Mobile */}
                    <button
                        onClick={() => scrollToSection("rsvp")}
                        className="bg-wedding-rose text-white font-sans text-sm tracking-[0.2em] uppercase font-bold px-8 py-3 rounded-full shadow-md"
                    >
                        RSVP
                    </button>
                </div>
            )}
        </nav>
    );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { grantDirectAccess } from "../actions/auth";

export default function InvitationPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-wedding-pink flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-wedding-cream">

            {/* Text ajutător care dispare la click */}
            <motion.div
                animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -20 : 0 }}
                className="absolute top-12 md:top-20 text-wedding-text text-center pointer-events-none z-50"
            >
                <h1 className="font-serif text-3xl md:text-4xl mb-2">Ați primit o invitație!</h1>
                <p className="font-sans text-xs tracking-widest uppercase opacity-70">Apasă pe sigiliu pentru a deschide</p>
            </motion.div>

            {/* Am mărit înălțimea containerului pentru a face loc animației (h-[600px] / h-[700px]) */}
            <div className="relative w-full max-w-3xl h-150 md:h-175 flex items-center justify-center mt-12">

                {/* --- INVITAȚIA REALĂ CARE IESE DIN PLIC (Acum are z-30, stă deasupra!) --- */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            // Pleacă de jos (din interiorul plicului)
                            initial={{ opacity: 0, y: 80, scale: 0.8 }}
                            // Urcă DOAR puțin (y: -40), astfel încât să nu mai iasă de pe ecran
                            animate={{ opacity: 1, y: -40, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="absolute z-30 w-[90%] max-w-md h-120 sm:h-150 bg-white rounded-xl shadow-2xl overflow-hidden border border-white/50"
                        >
                            <Image
                                src="/images/Invitatie.png" // sau .jpg, depinde cum ai salvat-o
                                alt="Invitație Izabela & Adelin"
                                fill
                                className="object-contain p-2"
                                priority
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- PLICUL (Imaginile PNG) - z-20 (stă sub invitație) --- */}
                <motion.div
                    // Când se deschide, plicul coboară MULT mai jos (y: 160) și se estompează ca să lase invitația să iasă în evidență
                    animate={isOpen ? { y: 160, scale: 0.9, opacity: 0.4 } : { y: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute z-20 transition-transform duration-300 ${!isOpen ? "cursor-pointer hover:scale-105 hover:-translate-y-2 drop-shadow-2xl" : "pointer-events-none"}`}
                    onClick={() => setIsOpen(true)}
                >
                    {/* Dimensiunile plicului mult mărite: w-[350px] pe telefon, w-[550px] pe laptop */}
                    <div className="relative w-87.5 h-87.5 md:w-137.5 md:h-137.5">
                        <Image
                            src={isOpen ? "/images/envelope_open.png" : "/images/envelope_closed.png"}
                            alt="Plic Invitație"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </motion.div>

            </div>

            {/* Butonul de redirecționare - Apare după ce animația e gata */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute bottom-8 z-50 w-full px-6 flex justify-center"
                    >
                        <form action={grantDirectAccess}>
                            <button type="submit" className="bg-wedding-text text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-wedding-rose transition-colors shadow-2xl hover:scale-105 active:scale-95 border border-white/20">
                                Confirmă Prezența pe Site
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
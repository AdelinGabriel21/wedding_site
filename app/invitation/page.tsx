"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { grantDirectAccess } from "../actions/auth";

export default function InvitationPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Verificăm dacă ecranul este mai mic de 768px (breakpoint-ul standard pentru telefoane)
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Rulăm o dată la încărcarea paginii
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const startScale = isMobile ? 0.55 : 0.65;
    const startY = isMobile ? 65 : 80;

    // Plicul rămâne pe loc. Când invitația vine spre ecran (pasul 4),
    // plicul se estompează lin și se duce puțin în spate (efect de adâncime).
    const envelopeAnimation = isOpen ? {
        y: [0, 0, 0, 0],
        rotate: [0, 0, 0, 0],
        opacity: [1, 1, 1, 0],
        scale: [1, 1, 1, 0.9]
    } : { y: 0, rotate: 0, opacity: 1, scale: 1 };

    // Fața plicului (buzunarul) trebuie să dispară INSTANT înainte ca invitația
    // să înceapă să coboare înapoi. Invitația ajunge la apogeu la time=0.45,
    // deci fața plicului dispare brusc la time=0.37-0.38 (snap, nu fade).
    const envelopeFrontAnimation = isOpen ? {
        y: [0, 0, 0, 0, 0],
        rotate: [0, 0, 0, 0, 0],
        // Rămâne 100% vizibil până la 0.37, apoi sare instant la 0 la 0.38
        opacity: [1, 1, 1, 0, 0],
        scale: [1, 1, 1, 1, 0.9]
    } : { y: 0, rotate: 0, opacity: 1, scale: 1 };

    const envelopeFrontTransition = {
        duration: 4.8,
        // 0.37 → 0.38: snap instant, invitația e clar în aer la acest moment
        // Încă înainte de apogeul invitației (0.45)
        times: [0, 0.10, 0.37, 0.38, 1],
        ease: ["linear", "linear", "linear", "linear"] as any
    };

    // Sincronizarea este cheia: 2.4 secunde total.
    // [0, 0.1, 0.4, 0.6, 1] înseamnă pași la 0s, 0.24s, 0.96s, 1.44s și 2.4s.
    const sharedTransition = {
        duration: 4.8,
        // Avem doar 4 puncte cheie acum:
        // 0.10 - Așteaptă
        // 0.45 - Ajunge la apogeu (sus de tot)
        // 1.00 - Aterizează pe ecran perfect sincronizat
        times: [0, 0.10, 0.45, 1],
        ease: ["linear", "easeOut", "easeInOut"] as any
    };

    return (
        <div className="h-dvh bg-wedding-pink flex flex-col items-center justify-center relative overflow-hidden selection:bg-wedding-cream">

            {/* Preîncărcăm imaginile care apar după click (invitația + plicul deschis)
                ca să fie deja în cache-ul browserului când pornește animația */}
            <div aria-hidden="true" className="absolute w-0 h-0 overflow-hidden pointer-events-none">
                <Image src="/images/Invitatie.png" alt="" width={1} height={1} priority />
                <Image src="/images/envelope_open_back.png" alt="" width={1} height={1} priority />
                <Image src="/images/envelope_open_front.png" alt="" width={1} height={1} priority />
            </div>

            {/* Text ajutător */}
            <motion.div
                animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -50 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-8 md:top-24 text-wedding-text text-center pointer-events-none z-50"
            >
                <h1 className="font-serif text-3xl md:text-4xl mb-2">Ați primit o invitație!</h1>
                <p className="font-sans text-xs tracking-widest uppercase opacity-70">Apasă pe sigiliu pentru a deschide</p>
            </motion.div>

            {/* Containerul central */}
            <div className="relative w-full max-w-3xl flex-1 flex items-center justify-center -mt-8 md:mt-0">

                {/* --- STRATUL 1 (Z-10): SPATELE PLICULUI --- */}
                <motion.div
                    animate={envelopeAnimation}
                    transition={sharedTransition}
                    className={`absolute z-10 w-[320px] h-80 md:w-112.5 md:h-112.5 transition-transform duration-300 ${!isOpen ? "cursor-pointer hover:scale-105 hover:-translate-y-2 drop-shadow-2xl" : ""}`}
                    onClick={() => !isOpen && setIsOpen(true)}
                >
                    {/* Plicul închis dispare instant când se dă click */}
                    <Image
                        src="/images/envelope_closed.png"
                        alt="Plic Închis"
                        fill
                        sizes="(max-width: 768px) 320px, 450px"
                        priority
                        className={`object-contain transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}
                    />
                    {/* Spatele plicului deschis (cu clapa sus) apare */}
                    <Image
                        src="/images/envelope_open_back.png"
                        alt="Plic Deschis Spate"
                        fill
                        sizes="(max-width: 768px) 320px, 450px"
                        priority
                        className={`object-contain transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    />
                </motion.div>


                {/* --- STRATUL 2 (Z-20): INVITAȚIA --- */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: startY, rotate: 90, scale: startScale }}
                            animate={{
                                opacity: [0, 1, 1, 1],
                                // Pe desktop: apogeu mai mic (-180 vs -230) ca să nu iasă din viewport,
                                // și aterizare la -40 (mai sus) pentru spațiu sub buton
                                y: isMobile
                                    ? [startY, startY, -230, -25]
                                    : [startY, startY, -180, -40],
                                // La apogeu, o lăsăm să se încline foarte puțin (de la 90 la 85 de grade)
                                // Asta elimină senzația de obiect rigid și începe mișcarea de rotație mai devreme
                                rotate: [90, 90, 85, 0],
                                // La apogeu, începe deja să crească milimetric (+ 0.05) ca mișcarea să fie cursivă
                                scale: [startScale, startScale, startScale + 0.05, 1]
                            }}
                            transition={sharedTransition}
                            className="absolute z-20 w-[85%] max-w-85 md:max-w-100 aspect-12/17 bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-white pointer-events-none"
                        >
                            <Image
                                src="/images/Invitatie.png"
                                alt="Invitație Izabela & Adelin"
                                fill
                                sizes="(max-width: 768px) 85vw, 400px"
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* --- STRATUL 3 (Z-30): FAȚA PLICULUI (BUZUNARUL) --- */}
                <motion.div
                    animate={envelopeFrontAnimation}
                    transition={envelopeFrontTransition}
                    className="absolute z-30 w-[320px] h-80 md:w-112.5 md:h-112.5 pointer-events-none"
                >
                    <Image
                        src="/images/envelope_open_front.png"
                        alt="Plic Deschis Față"
                        fill
                        sizes="(max-width: 768px) 320px, 450px"
                        priority
                        className={`object-contain transition-opacity duration-200 ${isOpen ? "opacity-100 drop-shadow-md" : "opacity-0"}`}
                    />
                </motion.div>

            </div>

            {/* Butonul de redirecționare */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        // Apare grațios abia după ce animația principală s-a calmat (la 2.2 secunde)
                        transition={{ delay: 3.8, type: "spring", stiffness: 100, damping: 15 }}
                        className="absolute bottom-4 md:bottom-8 z-50 w-full px-6 flex justify-center"
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
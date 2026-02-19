"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
}

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} // Începe invizibil și puțin mai jos
            whileInView={{ opacity: 1, y: 0 }} // Când ajunge pe ecran
            viewport={{ once: true, margin: "-100px" }} // Se animă o singură dată
            transition={{
                duration: 0.8,
                delay: delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
}
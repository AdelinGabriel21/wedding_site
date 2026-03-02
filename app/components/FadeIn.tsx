"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// 1. Am adăugat className ca fiind opțional (?)
interface FadeInProps {
    children: ReactNode;
    className?: string;
}

// 2. Extragem className din proprietăți
export default function FadeIn({ children, className = "" }: FadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={className} // 3. Îl aplicăm aici!
        >
            {children}
        </motion.div>
    );
}
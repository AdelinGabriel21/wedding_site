"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// 1. Am adăugat "id" ca proprietate opțională
interface FadeInProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

// 2. Extragem "id" din proprietăți
export default function FadeIn({ children, className = "", id }: FadeInProps) {
    return (
        <motion.div
            id={id} // 3. Îi dăm id-ul elementului HTML pentru ca meniul să știe unde să facă scroll
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
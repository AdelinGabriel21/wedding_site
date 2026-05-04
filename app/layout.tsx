import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"; // <-- 1. Importul nou
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Izabela & Adelin | 2026",
    description: "Vă așteptăm la nunta noastră!",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ro" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
        <body className="antialiased font-sans">
        {children}

        <Analytics />
        <SpeedInsights /> {/* <-- 2. Componenta nouă */}
        </body>
        </html>
    );
}
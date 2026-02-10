import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

// 1. Definim fonturile
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair", // Numele variabilei CSS
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat", // Numele variabilei CSS
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
        // 2. Aplicăm variabilele pe tag-ul html
        <html lang="ro" className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
        <body className="antialiased font-sans">
        {children}
        </body>
        </html>
    );
}
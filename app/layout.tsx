import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

// Configure Playfair Display for that high-end wedding feel
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair", // This matches the variable in globals.css
});

// Configure Montserrat for clean, readable details
const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat", // This matches the variable in globals.css
});

export const metadata: Metadata = {
    title: "Our Wedding | 2026",
    description: "Join us for our special day.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}
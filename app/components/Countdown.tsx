"use client";

import { useEffect, useState } from "react";

// Updated to August 9, 2026
const TARGET_DATE = new Date("2026-08-09T14:00:00");

export default function Countdown() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0,
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
        });

        const calculateTime = () => {
            const now = new Date();
            const difference = TARGET_DATE.getTime() - now.getTime();
            if (difference <= 0) return;

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => {
            cancelAnimationFrame(frame);
            clearInterval(timer);
        };
    }, []);

    if (!mounted) return <div className="h-32" />;

    return (
        <div className="flex gap-3 md:gap-6 justify-center items-center py-10 animate-in fade-in duration-1000">
            <TimeUnit value={timeLeft.days} label="Zile" />
            <TimeUnit value={timeLeft.hours} label="Ore" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Sec" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white/20 border-white/30 backdrop-blur-sm border w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl shadow-sm">
                <span className="text-2xl md:text-4xl font-serif text-white">
                    {value.toString().padStart(2, "0")}
                </span>
            </div>
            <span className="mt-2 text-[10px] uppercase tracking-widest text-white/70 font-bold">
                {label}
            </span>
        </div>
    );
}
"use client";

// 1. Am adus SyntheticEvent în loc de FormEvent
import { useState, SyntheticEvent } from "react";
import { verifyPassword } from "../actions/auth";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [error, setError] = useState("");

    // 2. Folosim SyntheticEvent aici
    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await verifyPassword(formData);
        if (result?.error) setError(result.error);
    };

    return (
        <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center px-6">
            <div className="bg-white/60 backdrop-blur-md p-10 rounded-4xl border border-wedding-pink shadow-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-wedding-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-wedding-forest w-8 h-8" />
                </div>
                <h1 className="text-3xl font-serif text-wedding-forest mb-2">Acces Privat</h1>
                <p className="font-sans text-wedding-forest/70 mb-8 text-sm">
                    Acest site este rezervat invitaților noștri. Te rugăm să introduci codul de acces primit.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Parola de acces"
                        className="w-full px-6 py-4 rounded-full border border-wedding-pink bg-white/50 text-wedding-forest focus:outline-none focus:ring-2 focus:ring-wedding-rose transition-all text-center tracking-widest"
                        required
                    />
                    {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

                    <button type="submit" className="w-full bg-wedding-forest text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wedding-rose transition-colors shadow-lg">
                        Intră pe site
                    </button>
                </form>
            </div>
        </div>
    );
}
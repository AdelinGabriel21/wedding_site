"use client";

import { useState, SyntheticEvent } from "react";
import { verifyPassword } from "../actions/auth";
import { Lock, Eye, EyeOff } from "lucide-react"; // Am importat iconițele pentru ochi

export default function LoginPage() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Starea pentru a ascunde/arăta parola

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await verifyPassword(formData);
        if (result?.error) setError(result.error);
    };

    return (
        <div className="min-h-screen bg-wedding-bg flex flex-col items-center justify-center px-6">

            <div className="bg-wedding-cream/80 backdrop-blur-md p-10 rounded-4xl border border-white/40 shadow-xl max-w-md w-full text-center">

                <div className="w-16 h-16 bg-wedding-moss/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-wedding-text w-8 h-8" />
                </div>

                <h1 className="text-3xl font-serif text-wedding-text mb-2">Acces Privat</h1>

                <p className="font-sans text-wedding-text/70 mb-8 text-sm">
                    Acest site este rezervat invitaților noștri. Te rugăm să introduci codul de acces primit.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Container relativ pentru a putea poziționa ochiul în dreapta */}
                    <div className="relative w-full">
                        <input
                            // Schimbăm tipul dinamic între password și text
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Parola de acces"
                            // Am adăugat pr-12 (padding-right) ca textul să nu intre sub butonul de ochi
                            className="w-full px-6 py-4 pr-12 rounded-full border border-white/50 bg-white/80 text-wedding-text focus:outline-none focus:ring-2 focus:ring-wedding-rose transition-all text-center tracking-widest"
                            required
                        />

                        {/* Butonul care comută vizibilitatea */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-wedding-text/50 hover:text-wedding-rose transition-colors p-2"
                            aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

                    <button type="submit" className="w-full bg-wedding-rose text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-wedding-text transition-colors shadow-lg mt-2">
                        Intră pe site
                    </button>
                </form>
            </div>
        </div>
    );
}
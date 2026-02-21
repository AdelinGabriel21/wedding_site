import { grantDirectAccess } from "../actions/auth";
import { Mail } from "lucide-react";

// Ascundem pagina de Google
export const metadata = {
    robots: { index: false, follow: false }
};

export default function InvitationPage() {
    return (
        <div className="min-h-screen bg-wedding-pink flex flex-col items-center justify-center px-6 selection:bg-wedding-cream">
            <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-t-[3rem] rounded-b-xl shadow-2xl relative border-x-4 border-t-4 border-wedding-cream">

                {/* Aici poți pune o poză (o captură) a invitației fizice */}
                <div className="aspect-3/4 bg-wedding-cream/30 border border-wedding-moss/30 rounded-2xl flex flex-col items-center justify-center mb-8 p-6 text-center">
                    <Mail className="w-12 h-12 text-wedding-forest/30 mb-4" />
                    <p className="font-serif text-wedding-forest text-xl italic mb-2">„Te invităm să ne fii alături...”</p>
                    <p className="text-xs font-sans text-wedding-forest/50 uppercase tracking-widest">
                        [Aici va fi imaginea invitației voastre reale]
                    </p>
                </div>

                {/* Butonul Magic - Când apasă pe el, apelează server action-ul, iau cookie-ul și sunt trimiși pe Home */}
                <form action={grantDirectAccess}>
                    <button type="submit" className="w-full bg-wedding-forest text-white px-8 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform shadow-xl">
                        Deschide Invitația & RSVP
                    </button>
                </form>
            </div>
        </div>
    );
}
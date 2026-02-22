"use client";

import { useState, SyntheticEvent } from "react";
import { supabase } from "../lib/supabase";
import { User, Users, Plus, Trash2, CheckCircle2 } from "lucide-react";

type Child = {
    id: string;
    nume: string;
    prenume: string;
    varsta: string;
    meniu: string;
    mentiuni_meniu: string;
};

export default function RsvpForm() {
    // Stări pentru progres
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [tipCompletare, setTipCompletare] = useState<'mine' | 'insotitor' | null>(null);

    // Stări comune
    const [prezent, setPrezent] = useState<boolean | null>(null);
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [varsta, setVarsta] = useState("");

    // 1. MODIFICARE: Meniul implicit este acum Vegetarian
    const [meniu, setMeniu] = useState("Vegetarian");

    const [mentiuni, setMentiuni] = useState("");
    const [observatii, setObservatii] = useState("");

    // Stări specifice "Pentru mine"
    const [telefon, setTelefon] = useState("");

    // Stări specifice "Pentru însoțitor"
    const [numeInsotit, setNumeInsotit] = useState("");
    const [prenumeInsotit, setPrenumeInsotit] = useState("");

    // Stări Copii
    const [hasCopii, setHasCopii] = useState(false);
    const [copii, setCopii] = useState<Child[]>([]);

    const handleAddChild = () => {
        setCopii([...copii, { id: Date.now().toString(), nume: "", prenume: "", varsta: "", meniu: "Meniu Copil", mentiuni_meniu: "" }]);
    };

    const handleRemoveChild = (id: string) => {
        setCopii(copii.filter((c) => c.id !== id));
    };

    const handleChildChange = (id: string, field: keyof Child, value: string) => {
        setCopii(copii.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        // 1. Inserăm Adultul în baza de date
        const { data: rsvpData, error: rsvpError } = await supabase
            .from('rsvps')
            .insert([{
                tip_completare: tipCompletare,
                prezent: prezent,
                nume,
                prenume,
                varsta: varsta ? parseInt(varsta) : null,
                meniu,
                mentiuni_meniu: mentiuni,
                alte_observatii: observatii,
                telefon: tipCompletare === 'mine' ? telefon : null,
                nume_insotit: tipCompletare === 'insotitor' ? numeInsotit : null,
                prenume_insotit: tipCompletare === 'insotitor' ? prenumeInsotit : null
            }])
            .select()
            .single();

        if (rsvpError) {
            console.error(rsvpError);
            setStatus('error');
            return;
        }

        // 2. Inserăm Copiii (dacă există și dacă a confirmat că vine)
        if (prezent && hasCopii && copii.length > 0 && tipCompletare === 'mine') {
            const copiiToInsert = copii.map(c => ({
                rsvp_id: rsvpData.id,
                nume: c.nume,
                prenume: c.prenume,
                varsta: parseInt(c.varsta) || 0,
                meniu: c.meniu,
                mentiuni_meniu: c.mentiuni_meniu
            }));

            const { error: copiiError } = await supabase.from('rsvp_copii').insert(copiiToInsert);
            if (copiiError) console.error(copiiError);
        }

        // Salvăm ID-ul în browser pentru a putea face funcția de "Editare" ulterior
        localStorage.setItem('rsvp_id', rsvpData.id);
        setStatus('success');
    };

    // Dacă a trimis cu succes
    if (status === 'success') {
        return (
            <div className="bg-white/80 backdrop-blur-md border border-wedding-pink p-12 rounded-[2.5rem] shadow-xl text-center max-w-lg mx-auto">
                <CheckCircle2 className="w-20 h-20 text-wedding-moss mx-auto mb-6" />
                <h3 className="text-3xl font-serif text-wedding-forest mb-4">Mulțumim!</h3>
                <p className="font-sans text-wedding-forest/80 mb-8">
                    {prezent ? "Abia așteptăm să sărbătorim împreună!" : "Ne pare rău că nu poți ajunge, dar ne vom gândi la tine!"}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto text-left font-sans text-wedding-forest">

            {/* ETAPA 1: Alegerea tipului de formular */}
            {!tipCompletare && (
                <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-lg border border-wedding-pink/50 text-center">
                    <h3 className="text-2xl font-serif mb-8">Pentru cine completezi formularul?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button onClick={() => setTipCompletare('mine')} className="flex flex-col items-center gap-4 p-8 border-2 border-wedding-pink hover:border-wedding-rose bg-white/50 hover:bg-white transition-all rounded-3xl cursor-pointer group">
                            <User className="w-12 h-12 text-wedding-rose/50 group-hover:text-wedding-rose transition-colors" />
                            <span className="font-bold tracking-widest uppercase text-sm">Pentru mine</span>
                        </button>
                        <button onClick={() => setTipCompletare('insotitor')} className="flex flex-col items-center gap-4 p-8 border-2 border-wedding-pink hover:border-wedding-rose bg-white/50 hover:bg-white transition-all rounded-3xl cursor-pointer group">
                            <Users className="w-12 h-12 text-wedding-rose/50 group-hover:text-wedding-rose transition-colors" />
                            <span className="font-bold tracking-widest uppercase text-sm">Pentru un însoțitor<br/><span className="text-[10px] opacity-70">(Plus One)</span></span>
                        </button>
                    </div>
                </div>
            )}

            {/* ETAPA 2: Formularul propriu-zis */}
            {tipCompletare && (
                <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md p-6 md:p-12 rounded-[2.5rem] shadow-lg border border-wedding-pink/50 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    <div className="flex justify-between items-center border-b border-wedding-pink/30 pb-4 mb-8">
                        <h3 className="text-2xl font-serif italic">
                            {tipCompletare === 'mine' ? "Datele Tale" : "Date Însoțitor"}
                        </h3>
                        <button type="button" onClick={() => setTipCompletare(null)} className="text-xs font-bold uppercase tracking-widest text-wedding-rose hover:text-wedding-forest transition-colors">
                            Înapoi
                        </button>
                    </div>

                    {/* Prezența - Cea mai importantă */}
                    <div className="space-y-4 bg-white/50 p-6 rounded-2xl border border-wedding-pink/30">
                        <label className="block text-sm font-bold uppercase tracking-widest">Vei fi prezent(ă)? *</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${prezent === true ? 'border-wedding-moss bg-wedding-moss/10 text-wedding-moss font-bold' : 'border-wedding-pink/50 bg-white hover:border-wedding-moss/50'}`}>
                                <input type="radio" name="prezent" required checked={prezent === true} onChange={() => setPrezent(true)} className="hidden" />
                                Da, cu drag!
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${prezent === false ? 'border-red-400 bg-red-50 text-red-600 font-bold' : 'border-wedding-pink/50 bg-white hover:border-red-200'}`}>
                                <input type="radio" name="prezent" required checked={prezent === false} onChange={() => setPrezent(false)} className="hidden" />
                                Nu pot ajunge
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest pl-2">Nume *</label>
                            <input type="text" required value={nume} onChange={(e) => setNume(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest pl-2">Prenume *</label>
                            <input type="text" required value={prenume} onChange={(e) => setPrenume(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose transition-colors" />
                        </div>
                    </div>

                    {/* Secțiune Condițională Adulți */}
                    {tipCompletare === 'mine' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Telefon *</label>
                                <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Vârstă</label>
                                <input type="number" value={varsta} onChange={(e) => setVarsta(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose" />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-wedding-pink/20 p-6 rounded-2xl space-y-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-wedding-rose text-center">Pe cine însoțești?</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest pl-2">Numele persoanei *</label>
                                    <input type="text" required value={numeInsotit} onChange={(e) => setNumeInsotit(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest pl-2">Prenumele persoanei *</label>
                                    <input type="text" required value={prenumeInsotit} onChange={(e) => setPrenumeInsotit(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Partea de Meniu e necesară doar dacă vine la nuntă */}
                    {prezent && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Meniu Preferat</label>
                                <select value={meniu} onChange={(e) => setMeniu(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose appearance-none">
                                    {/* 2. MODIFICARE: Doar opțiunile Vegetarian și Vegan pt Adulți */}
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan (De Post)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Alergii sau Restricții Alimentare</label>
                                <textarea value={mentiuni} onChange={(e) => setMentiuni(e.target.value)} rows={2} placeholder="Ex: Fără gluten, alergie la alune..." className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose resize-none" />
                            </div>

                            {/* SECȚIUNEA COPII - 3. MODIFICARE: Se afișează DOAR dacă e "Pentru Mine" */}
                            {tipCompletare === 'mine' && (
                                <div className="pt-6 border-t border-wedding-pink/30 space-y-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" checked={hasCopii} onChange={(e) => setHasCopii(e.target.checked)} className="w-5 h-5 rounded border-wedding-pink text-wedding-moss focus:ring-wedding-moss" />
                                        <span className="font-bold uppercase tracking-widest text-sm group-hover:text-wedding-rose transition-colors">Vin împreună cu copii</span>
                                    </label>

                                    {hasCopii && (
                                        <div className="space-y-6 pl-4 md:pl-8 border-l-2 border-wedding-pink/50">
                                            {copii.map((copil, index) => (
                                                <div key={copil.id} className="bg-white/70 p-6 rounded-2xl border border-wedding-pink/50 relative group shadow-sm">
                                                    <button type="button" onClick={() => handleRemoveChild(copil.id)} className="absolute -top-3 -right-3 bg-white border border-red-200 text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-sm">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>

                                                    <p className="text-xs font-bold text-wedding-rose mb-4 uppercase tracking-widest">Copil #{index + 1}</p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <input type="text" required placeholder="Nume" value={copil.nume} onChange={(e) => handleChildChange(copil.id, 'nume', e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-wedding-pink/50 bg-white" />
                                                        <input type="text" required placeholder="Prenume" value={copil.prenume} onChange={(e) => handleChildChange(copil.id, 'prenume', e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-wedding-pink/50 bg-white" />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input type="number" required placeholder="Vârstă" value={copil.varsta} onChange={(e) => handleChildChange(copil.id, 'varsta', e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-wedding-pink/50 bg-white" />
                                                        <select value={copil.meniu} onChange={(e) => handleChildChange(copil.id, 'meniu', e.target.value)} className="w-full px-4 py-2 text-sm rounded-xl border border-wedding-pink/50 bg-white">
                                                            {/* 4. MODIFICARE: Optiunile de meniu pentru copii */}
                                                            <option value="Meniu Copil">Meniu Special Copil</option>
                                                            <option value="Vegetarian">Vegetarian (Meniu Adult)</option>
                                                            <option value="Vegan">Vegan (Meniu Adult)</option>
                                                            <option value="Fara Meniu">Fără Meniu (Sugar/Bebeluș)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}

                                            <button type="button" onClick={handleAddChild} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wedding-moss hover:text-wedding-rose transition-colors py-2">
                                                <Plus className="w-4 h-4" /> Adaugă încă un copil
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Observații Generale */}
                    <div className="space-y-2 pt-6 border-t border-wedding-pink/30">
                        <label className="text-xs font-bold uppercase tracking-widest pl-2">Alte Observații (Ex: Nevoi speciale, dedicatii muzicale)</label>
                        <textarea value={observatii} onChange={(e) => setObservatii(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-wedding-pink/50 bg-white focus:outline-none focus:border-wedding-rose resize-none" />
                    </div>

                    {status === 'error' && <p className="text-red-500 text-sm font-bold text-center">A apărut o eroare. Te rugăm să încerci din nou.</p>}

                    <button disabled={status === 'loading' || prezent === null} type="submit" className="w-full bg-wedding-forest text-white px-8 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-wedding-rose transition-colors shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                        {status === 'loading' ? 'Se trimite...' : 'Trimite Răspunsul'}
                    </button>
                </form>
            )}
        </div>
    );
}
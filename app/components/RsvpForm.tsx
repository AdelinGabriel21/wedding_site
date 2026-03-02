"use client";

import { useState, useEffect, SyntheticEvent } from "react";
import { supabase } from "../lib/supabase";
import { User, Users, Plus, Trash2, CheckCircle2, Edit2 } from "lucide-react";

type Child = {
    id: string;
    nume: string;
    prenume: string;
    varsta: string;
    meniu: string;
    mentiuni_meniu: string;
};

type SupabaseChildData = {
    id: string;
    nume: string;
    prenume: string;
    varsta: number | null;
    meniu: string;
    mentiuni_meniu: string | null;
};

export default function RsvpForm() {
    const [status, setStatus] = useState<'idle' | 'fetching' | 'loading' | 'success' | 'error'>('idle');
    const [existingId, setExistingId] = useState<string | null>(null);

    const [tipCompletare, setTipCompletare] = useState<'mine' | 'insotitor' | null>(null);

    const [prezent, setPrezent] = useState<boolean | null>(null);
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [varsta, setVarsta] = useState("");
    const [meniu, setMeniu] = useState("Vegetarian");
    const [mentiuni, setMentiuni] = useState("");
    const [observatii, setObservatii] = useState("");

    const [telefon, setTelefon] = useState("");
    const [numeInsotit, setNumeInsotit] = useState("");
    const [prenumeInsotit, setPrenumeInsotit] = useState("");

    const [hasCopii, setHasCopii] = useState(false);
    const [copii, setCopii] = useState<Child[]>([]);

    const fetchExistingRsvp = async (id: string) => {
        setStatus('fetching');
        const { data, error } = await supabase
            .from('rsvps')
            .select('*, rsvp_copii(*)')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Eroare la aducerea datelor vechi:", error);
            localStorage.removeItem('rsvp_id');
            setStatus('idle');
            return;
        }

        if (data) {
            setExistingId(data.id);
            setTipCompletare(data.tip_completare as 'mine' | 'insotitor');
            setPrezent(data.prezent);
            setNume(data.nume);
            setPrenume(data.prenume);
            setVarsta(data.varsta ? data.varsta.toString() : "");
            setMeniu(data.meniu);
            setMentiuni(data.mentiuni_meniu || "");
            setObservatii(data.alte_observatii || "");
            setTelefon(data.telefon || "");
            setNumeInsotit(data.nume_insotit || "");
            setPrenumeInsotit(data.prenume_insotit || "");

            if (data.rsvp_copii && data.rsvp_copii.length > 0) {
                setHasCopii(true);
                setCopii(data.rsvp_copii.map((c: SupabaseChildData) => ({
                    id: c.id,
                    nume: c.nume,
                    prenume: c.prenume,
                    varsta: c.varsta ? c.varsta.toString() : "",
                    meniu: c.meniu,
                    mentiuni_meniu: c.mentiuni_meniu || ""
                })));
            }
            setStatus('success');
        } else {
            localStorage.removeItem('rsvp_id');
            setStatus('idle');
        }
    };

    useEffect(() => {
        const savedId = localStorage.getItem('rsvp_id');
        if (savedId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchExistingRsvp(savedId).catch(console.error);
        }
    }, []);

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

        const rsvpPayload = {
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
        };

        let currentRsvpId = existingId;

        if (existingId) {
            const { error: updateError } = await supabase
                .from('rsvps')
                .update(rsvpPayload)
                .eq('id', existingId as string);

            if (updateError) {
                console.error(updateError);
                setStatus('error');
                return;
            }

            await supabase.from('rsvp_copii').delete().eq('rsvp_id', existingId as string);

        } else {
            const { data: rsvpData, error: insertError } = await supabase
                .from('rsvps')
                .insert([rsvpPayload])
                .select()
                .single();

            if (insertError) {
                console.error(insertError);
                setStatus('error');
                return;
            }
            currentRsvpId = rsvpData.id;
            setExistingId(currentRsvpId);
            localStorage.setItem('rsvp_id', currentRsvpId as string);
        }

        if (prezent && hasCopii && copii.length > 0 && tipCompletare === 'mine') {
            const copiiToInsert = copii.map(c => ({
                rsvp_id: currentRsvpId as string,
                nume: c.nume,
                prenume: c.prenume,
                varsta: parseInt(c.varsta) || 0,
                meniu: c.meniu,
                mentiuni_meniu: c.mentiuni_meniu
            }));

            const { error: copiiError } = await supabase.from('rsvp_copii').insert(copiiToInsert);
            if (copiiError) console.error(copiiError);
        }

        setStatus('success');
    };

    if (status === 'fetching') {
        return (
            <div className="bg-wedding-cream p-10 md:p-14 rounded-4xl shadow-lg border border-white/40 text-center animate-pulse w-full">
                <div className="w-12 h-12 border-4 border-wedding-pink border-t-wedding-rose rounded-full animate-spin mx-auto mb-4" />
                <p className="text-wedding-text font-serif italic">Se încarcă răspunsul tău...</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="bg-wedding-cream p-10 md:p-14 rounded-4xl shadow-lg border border-white/40 text-center w-full">
                <CheckCircle2 className="w-20 h-20 text-wedding-rose mx-auto mb-6" />
                <h3 className="text-3xl font-serif text-wedding-text mb-4">Mulțumim, {nume}!</h3>
                <p className="font-sans text-wedding-text/90 mb-8 font-medium">
                    {prezent ? "Am înregistrat confirmarea ta. Abia așteptăm să sărbătorim împreună!" : "Am înregistrat răspunsul tău. Ne pare rău că nu poți ajunge, dar ne vom gândi la tine!"}
                </p>

                <button
                    onClick={() => setStatus('idle')}
                    className="flex items-center justify-center gap-2 mx-auto text-xs font-bold uppercase tracking-widest text-wedding-rose hover:text-wedding-text transition-colors bg-white px-6 py-3 rounded-full shadow-sm"
                >
                    <Edit2 className="w-4 h-4" />
                    Editează Răspunsul
                </button>
            </div>
        );
    }

    return (
        <div className="w-full text-left font-sans text-wedding-text">
            {!tipCompletare && (
                <div className="bg-wedding-cream p-10 md:p-14 rounded-4xl shadow-lg border border-white/40 text-center">
                    <h3 className="text-2xl font-serif mb-8 text-wedding-text">Pentru cine completezi formularul?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button onClick={() => setTipCompletare('mine')} className="flex flex-col items-center gap-4 p-8 border-2 border-transparent hover:border-wedding-rose bg-white transition-all rounded-3xl cursor-pointer group shadow-sm hover:shadow-md">
                            <User className="w-12 h-12 text-wedding-rose group-hover:scale-110 transition-transform" />
                            <span className="font-bold tracking-widest uppercase text-sm text-wedding-text">Pentru mine</span>
                        </button>
                        <button onClick={() => setTipCompletare('insotitor')} className="flex flex-col items-center gap-4 p-8 border-2 border-transparent hover:border-wedding-rose bg-white transition-all rounded-3xl cursor-pointer group shadow-sm hover:shadow-md">
                            <Users className="w-12 h-12 text-wedding-rose group-hover:scale-110 transition-transform" />
                            <span className="font-bold tracking-widest uppercase text-sm text-wedding-text">Pentru un însoțitor<br/><span className="text-[10px] opacity-70">(Plus One)</span></span>
                        </button>
                    </div>
                </div>
            )}

            {tipCompletare && (
                <form onSubmit={handleSubmit} className="bg-wedding-cream p-8 md:p-14 rounded-4xl shadow-lg border border-white/40 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center border-b border-wedding-text/10 pb-6 mb-8">
                        <h3 className="text-3xl font-serif italic text-wedding-text">
                            {tipCompletare === 'mine' ? "Datele Tale" : "Date Însoțitor"}
                        </h3>
                        <button type="button" onClick={() => setTipCompletare(null)} className="text-xs font-bold uppercase tracking-widest text-wedding-rose hover:text-wedding-text transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm">
                            Înapoi
                        </button>
                    </div>

                    <div className="space-y-4 bg-wedding-pink/30 p-8 rounded-3xl border border-white/50">
                        <label className="block text-sm font-bold uppercase tracking-widest text-wedding-text">Vei fi prezent(ă)? *</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${prezent === true ? 'border-wedding-moss bg-wedding-moss text-white font-bold shadow-md' : 'border-transparent bg-white/70 hover:bg-white'}`}>
                                <input type="radio" name="prezent" required checked={prezent === true} onChange={() => setPrezent(true)} className="hidden" />
                                Da, cu drag!
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${prezent === false ? 'border-wedding-rose bg-wedding-rose text-white font-bold shadow-md' : 'border-transparent bg-white/70 hover:bg-white'}`}>
                                <input type="radio" name="prezent" required checked={prezent === false} onChange={() => setPrezent(false)} className="hidden" />
                                Nu pot ajunge
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest pl-2">Nume *</label>
                            <input type="text" required value={nume} onChange={(e) => setNume(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose transition-colors shadow-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest pl-2">Prenume *</label>
                            <input type="text" required value={prenume} onChange={(e) => setPrenume(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose transition-colors shadow-sm" />
                        </div>
                    </div>

                    {tipCompletare === 'mine' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Telefon *</label>
                                <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose transition-colors shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Vârstă</label>
                                <input type="number" value={varsta} onChange={(e) => setVarsta(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose transition-colors shadow-sm" />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-wedding-pink/20 p-8 rounded-3xl space-y-6 border border-white/50">
                            <p className="text-xs font-bold uppercase tracking-widest text-wedding-rose text-center">Pe cine însoțești?</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest pl-2">Numele persoanei *</label>
                                    <input type="text" required value={numeInsotit} onChange={(e) => setNumeInsotit(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest pl-2">Prenumele persoanei *</label>
                                    <input type="text" required value={prenumeInsotit} onChange={(e) => setPrenumeInsotit(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose shadow-sm" />
                                </div>
                            </div>
                        </div>
                    )}

                    {prezent && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Meniu Preferat</label>
                                <select value={meniu} onChange={(e) => setMeniu(e.target.value)} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose appearance-none shadow-sm text-wedding-text">
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan (De Post)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest pl-2">Alergii sau Restricții Alimentare</label>
                                <textarea value={mentiuni} onChange={(e) => setMentiuni(e.target.value)} rows={2} placeholder="Ex: Fără gluten, alergie la alune..." className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose resize-none shadow-sm" />
                            </div>

                            {tipCompletare === 'mine' && (
                                <div className="pt-8 border-t border-wedding-text/10 space-y-6">
                                    <label className="flex items-center gap-3 cursor-pointer group bg-wedding-pink/20 p-5 rounded-2xl border border-white/50 hover:bg-wedding-pink/40 transition-colors w-fit">
                                        <input type="checkbox" checked={hasCopii} onChange={(e) => setHasCopii(e.target.checked)} className="w-5 h-5 rounded border-wedding-rose text-wedding-rose focus:ring-wedding-rose" />
                                        <span className="font-bold uppercase tracking-widest text-sm text-wedding-text">Vin împreună cu copii</span>
                                    </label>

                                    {hasCopii && (
                                        <div className="space-y-6 pl-2 md:pl-6 border-l-2 border-wedding-pink">
                                            {copii.map((copil, index) => (
                                                <div key={copil.id} className="bg-white/50 p-6 md:p-8 rounded-3xl relative group shadow-sm border border-white/60">
                                                    <button type="button" onClick={() => handleRemoveChild(copil.id)} className="absolute -top-3 -right-3 bg-white text-wedding-rose p-2.5 rounded-full hover:bg-wedding-rose hover:text-white hover:scale-110 transition-all shadow-md">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>

                                                    <p className="text-xs font-bold text-wedding-rose mb-4 uppercase tracking-widest">Copil #{index + 1}</p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <input type="text" required placeholder="Nume" value={copil.nume} onChange={(e) => handleChildChange(copil.id, 'nume', e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose shadow-sm" />
                                                        <input type="text" required placeholder="Prenume" value={copil.prenume} onChange={(e) => handleChildChange(copil.id, 'prenume', e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose shadow-sm" />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input type="number" required placeholder="Vârstă" value={copil.varsta} onChange={(e) => handleChildChange(copil.id, 'varsta', e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose shadow-sm" />
                                                        <select value={copil.meniu} onChange={(e) => handleChildChange(copil.id, 'meniu', e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose shadow-sm text-wedding-text">
                                                            <option value="Meniu Copil">Meniu Special Copil</option>
                                                            <option value="Vegetarian">Vegetarian (Meniu Adult)</option>
                                                            <option value="Vegan">Vegan (Meniu Adult)</option>
                                                            <option value="Fara Meniu">Fără Meniu (Sugar/Bebeluș)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}

                                            <button type="button" onClick={handleAddChild} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wedding-rose hover:text-wedding-text transition-colors py-2 bg-white px-5 rounded-full shadow-sm hover:shadow-md">
                                                <Plus className="w-4 h-4" /> Adaugă copil
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    <div className="space-y-2 pt-8 border-t border-wedding-text/10">
                        <label className="text-xs font-bold uppercase tracking-widest pl-2">Alte Observații</label>
                        <textarea value={observatii} onChange={(e) => setObservatii(e.target.value)} rows={2} className="w-full px-5 py-4 rounded-xl border-none bg-white focus:outline-none focus:ring-2 focus:ring-wedding-rose resize-none shadow-sm" />
                    </div>

                    {status === 'error' && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-3 rounded-xl border border-red-100">A apărut o eroare. Te rugăm să încerci din nou.</p>}

                    <button disabled={status === 'loading' || prezent === null} type="submit" className="w-full bg-wedding-rose text-white px-8 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-wedding-text transition-colors shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                        {status === 'loading' ? 'Se salvează...' : existingId ? 'Actualizează Răspunsul' : 'Trimite Răspunsul'}
                    </button>
                </form>
            )}
        </div>
    );
}
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Funcția care verifică parola manuală
export async function verifyPassword(formData: FormData) {
    const password = formData.get("password");

    // AICI SETEZI PAROLA VOASTRĂ
    if (password === "August2026") {
        (await cookies()).set("wedding_access", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // Cookie-ul expiră în 30 de zile
            path: "/",
        });
        redirect("/");
    } else {
        return { error: "Parolă incorectă. Încearcă din nou." };
    }
}

// Funcția pentru accesul direct (din Plicul Digital sau QR Code)
export async function grantDirectAccess() {
    (await cookies()).set("wedding_access", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });
    redirect("/");
}
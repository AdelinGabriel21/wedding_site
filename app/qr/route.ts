import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Aceasta este o rută API invizibilă.
// Când cineva scanează QR-ul, intră pe /qr, primește cookie-ul instant și e aruncat pe site.
export async function GET() {
    (await cookies()).set("wedding_access", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });

    redirect("/#home");
}
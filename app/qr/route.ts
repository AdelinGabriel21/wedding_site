import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    // Luăm parametrul "secret" din URL
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get("secret");

    // Aici pui parola reală a site-ului tău ("August2026")
    const parolaCorecta = "August2026";

    // Verificăm dacă link-ul conține parola corectă
    if (secret === parolaCorecta) {
        (await cookies()).set("wedding_access", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        redirect("/#home");
    } else {
        // Dacă cineva tastează doar /qr fără parolă, îl trimitem la login!
        redirect("/login");
    }
}
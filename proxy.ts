import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const hasAccess = request.cookies.has('wedding_access');
    const path = request.nextUrl.pathname;

    // 1. Scoatem '/invitation' din rutele complet publice
    const isPublicPage = path.startsWith('/login') || path.startsWith('/qr');

    const isStaticAsset = path.startsWith('/_next') || path.startsWith('/videos') || path.startsWith('/images') || path.includes('favicon.ico');

    if (isStaticAsset) return NextResponse.next();

    // 2. Adăugăm logica specifică pentru /invitation
    if (path.startsWith('/invitation')) {
        const secret = request.nextUrl.searchParams.get('secret');

        // Dacă nu are cookie ȘI nu are nici parola corectă în link, îl trimitem la login
        if (!hasAccess && secret !== 'August2026') {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Dacă are parola în URL (ex: /invitation?secret=August2026)
        // sau are deja acces, îl lăsăm să vadă animația.
        return NextResponse.next();
    }

    // 3. Protecția generală pentru restul paginilor
    if (!hasAccess && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. Dacă are deja acces și intră pe /login, îl trimitem pe Home
    if (hasAccess && path === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
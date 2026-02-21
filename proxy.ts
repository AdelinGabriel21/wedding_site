import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // 1. Verificăm dacă utilizatorul are cookie-ul de acces
    const hasAccess = request.cookies.has('wedding_access');
    const path = request.nextUrl.pathname;

    // 2. Definim paginile care sunt publice (nu necesită parolă)
    const isPublicPage = path.startsWith('/login') || path.startsWith('/invitation') || path.startsWith('/qr');

    // 3. Lăsăm fișierele statice (imagini, video, css) să se încarce liber
    const isStaticAsset = path.startsWith('/_next') || path.startsWith('/videos') || path.startsWith('/images') || path.includes('favicon.ico');

    if (isStaticAsset) return NextResponse.next();

    // 4. Dacă nu are acces și încearcă să intre pe o pagină protejată
    if (!hasAccess && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 5. Dacă are deja acces și încearcă să intre pe /login, îl trimitem pe Home
    if (hasAccess && path === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === '/' ||
    path === '/login' ||
    path === '/signup' ||
    path === '/verifyemail';

  const token = await getToken({ req: request });

  // logged-in user public page pe gaya → dashboard bhejo
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dash', request.url));
  }

  // non-logged-in user protected page pe gaya → sign-in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/dos',
    '/home',
    '/profiles',
    '/dash',
    '/start',
    '/password',
    '/update',
  ],
};

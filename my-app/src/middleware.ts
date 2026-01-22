import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === '/sign-up' ||
    path === '/sign-in' ||
    path === '/verify' ||
    path === '/';

  const token = await getToken({ req: request });

  // logged-in user public page pe gaya → dashboard bhejo
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // non-logged-in user protected page pe gaya → sign-in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Dos',
    '/Home',
    '/login',
    '/profiles',
    '/signup',
    '/start',
    '/verifyemail',
    '/dash',
    '/password',
    '/update',
  ],
};

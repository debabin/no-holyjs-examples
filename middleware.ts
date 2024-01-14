import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIE } from '@/utils';
import { getProfile } from '@/utils/api/requests';

export async function middleware(request: NextRequest) {
  console.log('@', request.url);
  if (request.url.includes('/api')) {
    const sessionIdCookie = cookies().get(COOKIE.SESSION_ID);
    console.log('@', sessionIdCookie);
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  const sessionIdCookie = cookies().get(COOKIE.SESSION_ID);

  if (!request.url.includes('/auth') && !sessionIdCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (sessionIdCookie) {
    await getProfile().catch(() => NextResponse.redirect(new URL('/auth', request.url)));
  }

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders
    }
  });

  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}

export const config = {
  matcher: ['/((?!_next).*)(.+)']
};

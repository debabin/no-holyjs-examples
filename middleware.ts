import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders
    }
  });

  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}

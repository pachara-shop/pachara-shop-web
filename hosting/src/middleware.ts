import { NextRequest, NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';

const authMiddleware: NextMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();
  response.headers.set('X-Request-Timestamp', new Date().toISOString());

  const authToken = request.cookies.get('session_token');
  if (!authToken) {
    console.warn('No token found');
  }

  if (pathname.startsWith('/dashboard')) {
    // Logic for Dashboard routes
    response.headers.set('X-Admin-Login', 'true');
  }
  if (pathname.startsWith('/api')) {
    console.warn(authToken);
    // Logic for API routes
    response.headers.set('X-API-Key', 'abcd1234');
    if (authToken?.value) {
      // console.warn(authToken.value);
      request.headers.set('Authorization', 'Bearer ' + authToken.value);
      // response.headers.set('Authorization', 'Bearer ' + authToken.value);
    }
  }

  return response;
};

export default authMiddleware;

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};

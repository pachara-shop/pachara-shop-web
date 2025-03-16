import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const authToken = request.cookies.get('session_token');
  if (!authToken) {
    console.warn('No token found');
  }

  if (pathname.startsWith('/dashboard') && authToken) {
    response.headers.set('X-Admin-Login', 'true');
  } else {
    response.headers.set('X-Admin-Login', 'false');
    // Redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    // url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

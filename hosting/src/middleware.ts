import { NextRequest, NextResponse } from 'next/server';

const loginPath = '/admin/login';
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = req.cookies.get('session_token')?.value;
  console.warn('[nextUrl.pathname]', nextUrl.pathname);

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!admin/login|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

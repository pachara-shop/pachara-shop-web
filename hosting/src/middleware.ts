import { NextResponse } from 'next/server';

export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!admin/login|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

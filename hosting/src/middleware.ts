import { NextRequest, NextResponse } from 'next/server';
const protectedRoutes = ['/manage'];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  console.warn('next.path', nextUrl.pathname);

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  // if (isProtectedRoute) {
  // if (!token) {
  // const url = req.nextUrl.clone();
  // url.pathname = '/admin/login';
  // return NextResponse.redirect(url);
  // }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

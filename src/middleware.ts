import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/learnings',
  '/progress',
  '/resources',
  '/skills',
  '/schedule',
  '/attendance',
]

const DOSEN_PREFIXES = ['/dosen']
const ADMIN_PREFIXES = ['/admin']

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Protected routes (any authenticated user)
  const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))
  if (isProtected && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Dosen routes (any authenticated user — role check done at page level via AuthContext)
  const isDosenRoute = DOSEN_PREFIXES.some(prefix => pathname.startsWith(prefix))
  if (isDosenRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Admin routes
  const isAdminRoute = ADMIN_PREFIXES.some(prefix => pathname.startsWith(prefix))
  if (isAdminRoute && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Auth routes (redirect to dashboard if already logged in)
  if (pathname === '/login' || pathname === '/register') {
    if (authToken) {
      return NextResponse.redirect(new URL('/dashboard/home', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/learnings/:path*',
    '/progress/:path*',
    '/resources/:path*',
    '/skills/:path*',
    '/schedule/:path*',
    '/attendance/:path*',
    '/dosen/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}
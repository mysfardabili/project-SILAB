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
  const userRole = request.cookies.get('user-role')?.value
  const { pathname } = request.nextUrl

  // Protected routes (any authenticated user)
  const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix))
  if (isProtected && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Dosen routes — must be logged in AND have role=dosen
  const isDosenRoute = DOSEN_PREFIXES.some(prefix => pathname.startsWith(prefix))
  if (isDosenRoute) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (userRole && userRole !== 'dosen') {
      // Redirect to correct dashboard based on role
      const dest = userRole === 'admin' ? '/admin/dashboard' : '/dashboard/home'
      return NextResponse.redirect(new URL(dest, request.url))
    }
  }

  // Admin routes — must be logged in AND have role=admin
  const isAdminRoute = ADMIN_PREFIXES.some(prefix => pathname.startsWith(prefix))
  if (isAdminRoute) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (userRole && userRole !== 'admin') {
      // Redirect to correct dashboard based on role
      const dest = userRole === 'dosen' ? '/dosen/dashboard' : '/dashboard/home'
      return NextResponse.redirect(new URL(dest, request.url))
    }
  }

  // Auth routes (redirect to correct dashboard if already logged in)
  if (pathname === '/login' || pathname === '/register') {
    if (authToken) {
      if (userRole === 'dosen') return NextResponse.redirect(new URL('/dosen/dashboard', request.url))
      if (userRole === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
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


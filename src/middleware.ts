import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Auth routes (redirect to dashboard if already logged in)
  if (pathname === '/login' || pathname === '/register') {
    if (authToken) {
      return NextResponse.redirect(new URL('/dashboard/home', request.url))
    }
  }

  return NextResponse.next()
}

// Config to specify which routes this middleware applies to
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
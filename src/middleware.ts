import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export const publicRoutes = ['/', '/login']
const publicApiRoutes = ['/api/auth/login']

async function handleApiAuth(request: NextRequest, token: string | undefined) {
  const { pathname } = request.nextUrl
  const isPublicApiRoute = publicApiRoutes.some(apiRoute => pathname.startsWith(apiRoute))
  if (isPublicApiRoute) {
    return NextResponse.next()
  }

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Não autorizado' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'Token inválido' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function handlePageAuth(request: NextRequest, token: string | undefined) {
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)
  if (isPublicRoute) {
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    const userId = payload.userId as string
    const headers = new Headers(request.headers)
    headers.set('x-user-id', userId)
    return NextResponse.next({ request: { headers } })
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  if (pathname.startsWith('/api')) {
    return handleApiAuth(request, token)
  } else {
    return handlePageAuth(request, token)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
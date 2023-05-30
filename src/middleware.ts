import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { pathname, origin } = request.nextUrl
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })
  console.log('MIDDLEWARE SESSION', session)

  if (pathname === '/login' || pathname === '/signup') {
    if (session) return NextResponse.redirect(`${origin}`)
    return NextResponse.next()
  }

  if (!session)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)

  if (pathname.includes('/customerintakeform')) {
    if (!session.customerIntakeFormSubmited) {
      return NextResponse.next()
    }
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/invoice`)
  }
  if (pathname.includes('/invoice')) {
    if (session.customerIntakeFormSubmited) {
      return NextResponse.next()
    }
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/customerintakeform`
    )
  }
}

export const config = {
  matcher: [
    '/',
    '/customerintakeform/:path*',
    '/invoice/:path*',
    '/login/:path*',
    '/signup/:path*',
  ],
}

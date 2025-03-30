import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const session = await getSession()

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log("🔥", { token, session, pathname: req.nextUrl.pathname })
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  } else if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function middleware(req: NextApiRequest) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });

  //@ts-ignore
  const { pathname } = req.nextUrl;

  if (pathname.includes('/api/auth') || token) {
      return NextResponse.next();
  }

  if (!token && pathname != "/login") {
      return NextResponse.redirect('/login')
  }
}

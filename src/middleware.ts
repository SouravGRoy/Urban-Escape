import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return NextResponse.redirect(new URL("/?error=Please login first to access this route", req.url));
  return res;
}

export const config = {
  matcher: ['/addHome/:path*', '/dashboard/:path*'],
};
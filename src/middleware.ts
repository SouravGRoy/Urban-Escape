import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

  try {
    const supabase = createServerComponentClient({ cookies });
    // Fetch and check user data
    const { data: session } = await supabase.auth.getSession();
    // Handle authentication state
    if (!session?.session?.user) {
      const url = new URL("/?error=Please login first to access this route", request.url);
      return NextResponse.redirect(url);
    }
    // Access authenticated user data if needed
    const user = session?.session.user; // Use user data for further logic if required
    // Additional logic for authenticated users (optional)
    // ...
  } catch (error) {
    console.error('Error in middleware:', error);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/addHome/:path*', '/dashboard/:path*'],
};

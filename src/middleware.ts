import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_EMAIL || '';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(
    { req, res },
    { supabaseUrl, supabaseKey }
  );

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Supabase middleware session error', error);
  }

  const sessionEmail = data.session?.user.email;
  const isProtectedPath = req.nextUrl.pathname.startsWith('/my-tasks');

  if (isProtectedPath && (!sessionEmail || sessionEmail !== allowedEmail)) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/my-tasks/:path*'],
};

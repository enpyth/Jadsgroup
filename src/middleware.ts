import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');

  if (host?.startsWith('market.')) {
    return NextResponse.rewrite(new URL('/properties/', req.url));
  }

  return NextResponse.next();
}

// 仅拦截根路径的访问
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};

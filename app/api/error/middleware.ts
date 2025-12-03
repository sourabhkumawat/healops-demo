import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    return new NextResponse(JSON.stringify({
      message: 'This endpoint is not available in production'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/error/:path*'
};

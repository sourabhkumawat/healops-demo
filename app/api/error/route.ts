import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For testing purposes only - should be removed in production
    return new NextResponse(JSON.stringify({
      message: 'Error endpoint is disabled in production'
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({
      message: 'Internal Server Error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

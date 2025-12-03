import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Validation Error Test Endpoint' }, { status: 400 });
}

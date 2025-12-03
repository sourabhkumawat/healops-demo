import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'This is a test validation error' },
    { status: 400 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'This is a test validation error' },
    { status: 400 }
  );
}
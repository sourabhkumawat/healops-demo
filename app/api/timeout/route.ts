import { NextResponse } from 'next/server';

export async function GET() {
    // Simulate a timeout error - throw error to be captured by HealOps
    throw new Error(
        'Request timeout: The request took too long to process (>5s) (TIMEOUT_ERROR)'
    );
}

import { NextResponse } from 'next/server';

export async function GET() {
    // Simulate a database connection error - throw error to be captured by HealOps
    throw new Error(
        'Database connection failed: Unable to connect to PostgreSQL database at localhost:5432 (DB_CONNECTION_ERROR)'
    );
}

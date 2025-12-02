import { NextResponse } from 'next/server';

export async function GET() {
    // Realistic database error scenarios that developers commonly encounter

    // Simulate connection pool exhaustion - common in production
    const errorType = Math.random() > 0.5 ? 'connection' : 'query';

    if (errorType === 'connection') {
        // Realistic: Connection pool exhausted
        const error = new Error(
            'Connection pool exhausted: Too many concurrent database connections'
        );
        (error as any).code = 'ECONNREFUSED';
        (error as any).errno = -61;
        (error as any).syscall = 'connect';
        (error as any).address = '127.0.0.1';
        (error as any).port = 5432;
        throw error;
    } else {
        // Realistic: SQL syntax error - common developer mistake
        // Simulating a query with incorrect syntax or missing parameter
        const userId = undefined; // Developer forgot to extract from request

        // This would be the actual query that fails
        const query = `SELECT * FROM users WHERE id = ${userId} AND status = 'active'`;
        // Real error: SQL syntax error or parameter binding issue

        const error = new Error(
            `Database query failed: column "undefined" does not exist`
        );
        (error as any).code = '42703'; // PostgreSQL error code for undefined column
        (error as any).severity = 'ERROR';
        (error as any).detail = `Query: ${query}`;
        (error as any).hint = 'Perhaps you meant to reference the column "id".';
        throw error;
    }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Realistic validation error: Missing required fields or invalid data types
    // Common issue: Frontend sends incomplete data or wrong format

    try {
        const body = await request.json();

        // Simulating validation logic that developers often forget
        if (!body.email) {
            const error = new Error('Validation failed: Email is required');
            (error as any).statusCode = 400;
            (error as any).field = 'email';
            (error as any).code = 'VALIDATION_ERROR';
            throw error;
        }

        // Realistic: Type validation error
        if (typeof body.age !== 'number' || body.age < 0) {
            const error = new Error(
                'Validation failed: Age must be a positive number'
            );
            (error as any).statusCode = 400;
            (error as any).field = 'age';
            (error as any).code = 'VALIDATION_ERROR';
            (error as any).received = typeof body.age;
            (error as any).expected = 'number';
            throw error;
        }

        // Realistic: Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            const error = new Error('Validation failed: Invalid email format');
            (error as any).statusCode = 400;
            (error as any).field = 'email';
            (error as any).code = 'VALIDATION_ERROR';
            (error as any).value = body.email;
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        // Realistic: Error handling that might throw another error
        if (error.code === 'VALIDATION_ERROR') {
            throw error; // Re-throw validation errors
        }

        // Realistic: JSON parsing error
        if (error instanceof SyntaxError) {
            const parseError = new Error('Invalid JSON in request body');
            (parseError as any).statusCode = 400;
            (parseError as any).code = 'PARSE_ERROR';
            (parseError as any).originalError = error.message;
            throw parseError;
        }

        throw error;
    }
}

export async function GET() {
    // For GET requests, simulate a validation error scenario
    const error = new Error(
        'Validation failed: Missing required query parameter "userId"'
    );
    (error as any).statusCode = 400;
    (error as any).code = 'VALIDATION_ERROR';
    (error as any).missingParams = ['userId'];
    throw error;
}



import { NextResponse } from 'next/server';

export async function GET() {
    // Realistic timeout scenario: External API call that hangs
    // Common issue: Third-party service is slow or unresponsive

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
        // Simulating a call to external payment API that times out
        const response = await fetch(
            'https://api.payment-service.com/process',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer token_here'
                },
                body: JSON.stringify({
                    amount: 100,
                    currency: 'USD',
                    customerId: 'cust_123'
                }),
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            // Realistic timeout error with context
            const timeoutError = new Error(
                'Request timeout: External payment API did not respond within 5 seconds'
            );
            (timeoutError as any).code = 'ETIMEDOUT';
            (timeoutError as any).endpoint =
                'https://api.payment-service.com/process';
            (timeoutError as any).timeout = 5000;
            throw timeoutError;
        }

        throw error;
    }
}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Realistic authentication/authorization errors
    // Common scenarios: Expired tokens, invalid credentials, insufficient permissions

    const authHeader = request.headers.get('authorization');

    // Simulate different auth error scenarios
    const errorScenario = Math.floor(Math.random() * 3);

    if (!authHeader) {
        // Realistic: Missing authorization header
        const error = new Error(
            'Authentication required: Missing Authorization header'
        );
        (error as any).statusCode = 401;
        (error as any).code = 'UNAUTHORIZED';
        (error as any).wwwAuthenticate = 'Bearer realm="api"';
        throw error;
    }

    if (errorScenario === 0) {
        // Realistic: Expired JWT token
        const error = new Error('Authentication failed: Token has expired');
        (error as any).statusCode = 401;
        (error as any).code = 'TOKEN_EXPIRED';
        (error as any).expiredAt = new Date(Date.now() - 3600000).toISOString();
        (error as any).currentTime = new Date().toISOString();
        throw error;
    } else if (errorScenario === 1) {
        // Realistic: Invalid token signature
        const error = new Error(
            'Authentication failed: Invalid token signature'
        );
        (error as any).statusCode = 401;
        (error as any).code = 'INVALID_TOKEN';
        (error as any).reason = 'Token signature verification failed';
        throw error;
    } else {
        // Realistic: Insufficient permissions (403 Forbidden)
        const error = new Error(
            'Authorization failed: Insufficient permissions to access this resource'
        );
        (error as any).statusCode = 403;
        (error as any).code = 'FORBIDDEN';
        (error as any).requiredPermission = 'admin:write';
        (error as any).userPermission = 'user:read';
        throw error;
    }
}

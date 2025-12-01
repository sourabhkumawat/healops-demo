'use client';

import { useEffect } from 'react';

// Generate OpenTelemetry trace ID (32 hex characters = 16 bytes)
function generateTraceId(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

// Generate OpenTelemetry span ID (16 hex characters = 8 bytes)
function generateSpanId(): string {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

// Convert timestamp to nanoseconds (OpenTelemetry format)
function toNanoseconds(timestamp: number): number {
    return timestamp * 1000000; // milliseconds to nanoseconds
}

// Client-side error handler that sends errors to HealOps endpoint in OpenTelemetry format
function sendErrorToHealOps(error: Error, errorType: string = 'error') {
    const apiKey = process.env.NEXT_PUBLIC_HEALOPS_API_KEY;
    const endpoint =
        process.env.NEXT_PUBLIC_HEALOPS_ENDPOINT ||
        'https://engine.healops.ai/otel/errors';

    if (!apiKey) {
        console.warn('HealOps API key not configured');
        return;
    }

    const now = Date.now();
    const nowNanos = toNanoseconds(now);
    const traceId = generateTraceId();
    const spanId = generateSpanId();

    // Format error as OpenTelemetry span (following OTel specification)
    const span = {
        traceId: traceId, // 32 hex chars (16 bytes)
        spanId: spanId, // 16 hex chars (8 bytes)
        parentSpanId: null,
        name: error.name || 'Error',
        timestamp: nowNanos, // Timestamp in nanoseconds (number)
        startTime: nowNanos,
        endTime: nowNanos,
        status: {
            code: 2, // 2 = ERROR (0=UNSET, 1=OK, 2=ERROR)
            message: error.message
        },
        attributes: {
            // Standard OpenTelemetry semantic conventions
            'error.type': errorType,
            'error.name': error.name,
            'error.message': error.message,
            // Browser context
            'user_agent.original':
                typeof window !== 'undefined'
                    ? window.navigator.userAgent
                    : undefined,
            'url.full':
                typeof window !== 'undefined'
                    ? window.location.href
                    : undefined,
            'url.path':
                typeof window !== 'undefined'
                    ? window.location.pathname
                    : undefined
        },
        events: [
            {
                name: 'exception', // Standard OpenTelemetry exception event name
                time: nowNanos,
                attributes: {
                    // Standard OpenTelemetry exception attributes
                    'exception.type': error.name || 'Error',
                    'exception.message': error.message,
                    'exception.stacktrace': error.stack || ''
                }
            }
        ],
        resource: {
            // Standard OpenTelemetry resource attributes
            'service.name': 'healops-nextjs-demo-client',
            'service.namespace': 'frontend',
            'telemetry.sdk.name': 'healops-client',
            'telemetry.sdk.language': 'javascript',
            'telemetry.sdk.version': '1.0.0'
        }
    };

    // Create OpenTelemetry payload matching backend format
    const otelPayload = {
        apiKey: apiKey, // API key in payload, not headers
        serviceName: 'healops-nextjs-demo-client',
        spans: [span]
    };

    // Send to HealOps endpoint
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(otelPayload)
    }).catch((err) => {
        console.error('Failed to send error to HealOps:', err);
    });
}

// Initialize client-side error tracking
export function initClientTracing() {
    if (typeof window === 'undefined') return;

    // Set up global error handlers for client-side errors
    window.addEventListener('error', (event) => {
        console.error('Global error caught:', event.error);
        if (event.error) {
            sendErrorToHealOps(event.error, 'javascript-error');
        }
    });

    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        const error =
            event.reason instanceof Error
                ? event.reason
                : new Error(String(event.reason));
        sendErrorToHealOps(error, 'unhandled-promise-rejection');
    });

    console.log('✅ HealOps client-side error tracking initialized');
}

// Hook to initialize client-side tracing
export function useClientTracing() {
    useEffect(() => {
        initClientTracing();
    }, []);
}

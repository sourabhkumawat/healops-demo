'use client';

import { useEffect } from 'react';
import { initHealOpsLogger } from '@sourabhkumawat0105/healops-opentelemetry/browser';

// Initialize HealOps logger for client-side error tracking
// initHealOpsLogger automatically catches:
// - Unhandled JavaScript errors
// - Unhandled promise rejections
// - HTTP errors (4xx, 5xx responses)
// - Network errors
// - Console errors (if interceptConsole is true)
// No manual tracking needed - the logger handles everything automatically

let initialized = false;

// Initialize client-side error tracking
export function initClientTracing() {
    if (typeof window === 'undefined') return;

    // Only initialize once
    if (initialized) return;

    const apiKey = process.env.NEXT_PUBLIC_HEALOPS_API_KEY;
    if (!apiKey) {
        console.warn('HealOps API key not configured');
        return;
    }

    // Initialize logger with automatic error catching
    // interceptConsole: true means console.error() will also be sent to HealOps
    initHealOpsLogger(
        {
            apiKey: apiKey,
            serviceName: 'healops-nextjs-demo-client',
            source: 'browser'
        },
        true // Enable console interception for automatic error catching
    );

    initialized = true;
    console.log('✅ HealOps client-side error tracking initialized');
}

// Hook to initialize client-side tracing
export function useClientTracing() {
    useEffect(() => {
        initClientTracing();
    }, []);
}

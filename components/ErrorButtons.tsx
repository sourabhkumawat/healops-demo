'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertCircle,
    Database,
    Clock,
    Loader2,
    Shield,
    FileX
} from 'lucide-react';

type ErrorType =
    | 'js-error'
    | 'db-error'
    | 'timeout'
    | 'client-js-error'
    | 'client-promise-error'
    | 'validation-error'
    | 'auth-error';

interface ErrorState {
    loading: boolean;
    result: string | null;
    isError: boolean;
}

export function ErrorButtons() {
    const [states, setStates] = useState<Record<ErrorType, ErrorState>>({
        'js-error': { loading: false, result: null, isError: false },
        'db-error': { loading: false, result: null, isError: false },
        timeout: { loading: false, result: null, isError: false },
        'client-js-error': { loading: false, result: null, isError: false },
        'client-promise-error': {
            loading: false,
            result: null,
            isError: false
        },
        'validation-error': { loading: false, result: null, isError: false },
        'auth-error': { loading: false, result: null, isError: false }
    });

    const triggerError = async (type: ErrorType, endpoint?: string) => {
        setStates((prev) => ({
            ...prev,
            [type]: { loading: true, result: null, isError: false }
        }));

        // Handle client-side errors
        if (type === 'client-js-error') {
            setStates((prev) => ({
                ...prev,
                [type]: {
                    loading: false,
                    result: 'Client-side JavaScript error triggered',
                    isError: true
                }
            }));
            // Realistic error: Accessing property on undefined/null
            // Common mistake: Not checking if data exists before accessing nested properties
            setTimeout(() => {
                const userData = null; // Simulating failed API response
                const userName = userData.profile.name; // TypeError: Cannot read property 'profile' of null
                console.log(userName); // This never executes
            }, 0);
            return;
        }

        if (type === 'client-promise-error') {
            setStates((prev) => ({
                ...prev,
                [type]: {
                    loading: false,
                    result: 'Client-side promise rejection triggered',
                    isError: true
                }
            }));
            // Realistic error: Unhandled promise rejection from async operation
            // Common mistake: Forgetting to handle errors in async/await or .then() chains
            setTimeout(() => {
                fetch('/api/nonexistent-endpoint')
                    .then((response) => response.json())
                    .then((data) => {
                        // This promise chain doesn't have .catch() - error will be unhandled
                        const result = data.items.map((item: any) => item.id);
                        return result;
                    });
                // Missing .catch() handler - promise rejection will be unhandled
            }, 0);
            return;
        }

        // Handle server-side errors (API routes)
        if (!endpoint) return;

        try {
            // Special handling for validation error (POST request)
            const fetchOptions: RequestInit =
                type === 'validation-error'
                    ? {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: '', age: 'invalid' }) // Invalid data to trigger validation error
                      }
                    : { method: 'GET' };

            const response = await fetch(endpoint, fetchOptions);
            const data = await response
                .json()
                .catch(() => ({ error: 'Unknown error' }));

            if (!response.ok) {
                setStates((prev) => ({
                    ...prev,
                    [type]: {
                        loading: false,
                        result:
                            data.error ||
                            data.message ||
                            `HTTP ${response.status}: ${response.statusText}`,
                        isError: true
                    }
                }));
            } else {
                setStates((prev) => ({
                    ...prev,
                    [type]: {
                        loading: false,
                        result: 'Success (unexpected)',
                        isError: false
                    }
                }));
            }
        } catch (error) {
            setStates((prev) => ({
                ...prev,
                [type]: {
                    loading: false,
                    result:
                        error instanceof Error
                            ? error.message
                            : 'Network error',
                    isError: true
                }
            }));
        }
    };

    const buttonConfig = [
        {
            type: 'js-error' as ErrorType,
            label: 'Null Reference Error',
            endpoint: '/api/error',
            icon: AlertCircle,
            variant: 'destructive' as const
        },
        {
            type: 'db-error' as ErrorType,
            label: 'Database Error',
            endpoint: '/api/db-error',
            icon: Database,
            variant: 'destructive' as const
        },
        {
            type: 'timeout' as ErrorType,
            label: 'API Timeout',
            endpoint: '/api/timeout',
            icon: Clock,
            variant: 'destructive' as const
        },
        {
            type: 'validation-error' as ErrorType,
            label: 'Validation Error',
            endpoint: '/api/validation-error',
            icon: FileX,
            variant: 'destructive' as const
        },
        {
            type: 'auth-error' as ErrorType,
            label: 'Auth Error',
            endpoint: '/api/auth-error',
            icon: Shield,
            variant: 'destructive' as const
        },
        {
            type: 'client-js-error' as ErrorType,
            label: 'Client TypeError',
            endpoint: undefined,
            icon: AlertCircle,
            variant: 'destructive' as const
        },
        {
            type: 'client-promise-error' as ErrorType,
            label: 'Unhandled Promise',
            endpoint: undefined,
            icon: AlertCircle,
            variant: 'destructive' as const
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {buttonConfig.map(
                    ({ type, label, endpoint, icon: Icon, variant }, index) => (
                        <motion.div
                            key={type}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                variant={variant}
                                size="lg"
                                className="w-full h-auto py-4 flex flex-col gap-2"
                                onClick={() => triggerError(type, endpoint)}
                                disabled={states[type].loading}
                            >
                                {states[type].loading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <Icon className="h-6 w-6" />
                                )}
                                <span className="text-sm font-semibold">
                                    {label}
                                </span>
                            </Button>
                        </motion.div>
                    )
                )}
            </div>

            {/* Results Display */}
            <div className="space-y-3">
                {Object.entries(states).map(([type, state]) => {
                    if (!state.result) return null;
                    return (
                        <motion.div
                            key={type}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800"
                        >
                            <Badge
                                variant={
                                    state.isError ? 'destructive' : 'success'
                                }
                            >
                                {state.isError ? 'ERROR' : 'SUCCESS'}
                            </Badge>
                            <div className="flex-1">
                                <p className="text-sm text-zinc-300 font-mono">
                                    {state.result}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

'use client';

import { useClientTracing } from '@/lib/tracing-client';

export function ClientTracingProvider({
    children
}: {
    children: React.ReactNode;
}) {
    useClientTracing();
    return <>{children}</>;
}

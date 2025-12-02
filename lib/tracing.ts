import { initHealOpsOTel } from '@sourabhkumawat0105/healops-opentelemetry';

// Initialize HealOps OpenTelemetry SDK
// This automatically handles:
// - Unhandled errors
// - Promise rejections
// - HTTP errors
// - Auto-instrumentation of Express, HTTP, and other Node.js libraries
initHealOpsOTel({
    apiKey: process.env.NEXT_PUBLIC_HEALOPS_API_KEY!,
    serviceName: 'healops-nextjs-demo'
});

console.log('✅ HealOps OpenTelemetry SDK initialized');

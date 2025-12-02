'use client';

import { motion } from 'framer-motion';
import { DemoCard } from '@/components/DemoCard';
import { ErrorButtons } from '@/components/ErrorButtons';
import { Badge } from '@/components/ui/badge';
import { Activity, Shield, Zap, Code2 } from 'lucide-react';

export default function Home() {
    const serviceName = 'healops-nextjs-demo';
    const sdkVersion = '1.0.0';

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Shield className="h-12 w-12 text-green-500" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                            HealOps
                        </h1>
                    </div>
                    <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
                        Next.js OpenTelemetry Demo
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Professional demonstration of HealOps OpenTelemetry SDK
                        integration. Trigger realistic developer errors and see
                        how they're automatically captured and sent to HealOps.
                    </p>
                </motion.div>

                {/* Status Card */}
                <div className="max-w-4xl mx-auto mb-12">
                    <DemoCard
                        title="SDK Status"
                        description="Current HealOps OpenTelemetry configuration"
                        delay={0.2}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
                                <Activity className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-xs text-zinc-400">
                                        Status
                                    </p>
                                    <Badge variant="success" className="mt-1">
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
                                <Code2 className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="text-xs text-zinc-400">
                                        Service Name
                                    </p>
                                    <p className="text-sm font-mono text-zinc-100 mt-1">
                                        {serviceName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                <div>
                                    <p className="text-xs text-zinc-400">
                                        SDK Version
                                    </p>
                                    <p className="text-sm font-mono text-zinc-100 mt-1">
                                        {sdkVersion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DemoCard>
                </div>

                {/* Error Demonstration Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <DemoCard
                        title="Error Demonstration"
                        description="Click the buttons below to trigger realistic errors that developers commonly encounter. All errors are automatically captured by HealOps OpenTelemetry SDK with full context and stack traces."
                        delay={0.4}
                    >
                        <ErrorButtons />
                    </DemoCard>
                </div>

                {/* Features Grid */}
                <div className="max-w-6xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-2xl font-semibold text-center mb-8 text-zinc-100"
                    >
                        What This Demo Shows
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DemoCard
                            title="Automatic Error Capture"
                            description="Realistic developer errors are automatically captured and sent to HealOps"
                            delay={0.6}
                        >
                            <div className="space-y-2 text-sm text-zinc-400">
                                <p>✓ Null reference errors</p>
                                <p>✓ Type errors & undefined access</p>
                                <p>✓ Unhandled promise rejections</p>
                            </div>
                        </DemoCard>

                        <DemoCard
                            title="API Error Monitoring"
                            description="Track realistic API, database, and validation errors"
                            delay={0.7}
                        >
                            <div className="space-y-2 text-sm text-zinc-400">
                                <p>✓ Database connection failures</p>
                                <p>✓ SQL query errors</p>
                                <p>✓ Validation & auth errors</p>
                                <p>✓ External API timeouts</p>
                            </div>
                        </DemoCard>

                        <DemoCard
                            title="Real-time Telemetry"
                            description="All errors are sent to HealOps in real-time with full context"
                            delay={0.8}
                        >
                            <div className="space-y-2 text-sm text-zinc-400">
                                <p>✓ Stack traces</p>
                                <p>✓ Request context</p>
                                <p>✓ Performance metrics</p>
                            </div>
                        </DemoCard>
                    </div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16 text-zinc-500 text-sm"
                >
                    <p>
                        Built with Next.js 14 • Powered by{' '}
                        <span className="text-green-500 font-semibold">
                            HealOps OpenTelemetry SDK
                        </span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

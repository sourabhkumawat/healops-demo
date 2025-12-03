'use client';

import { motion } from 'framer-motion';
import { DemoCard } from '@/components/DemoCard';
import { ErrorButtons } from '@/components/ErrorButtons';
import { Badge } from '@/components/ui/badge';
import { Activity, Shield, Zap, Code2 } from 'lucide-react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
    const serviceName = 'healops-nextjs-demo';
    const sdkVersion = '1.0.0';

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
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
                            Next.js Demo
                        </h2>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            Professional demonstration of HealOps SDK
                            integration. Trigger realistic developer errors and see
                            how they're automatically captured and sent to HealOps.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto mb-12">
                        <DemoCard
                            title="SDK Status"
                            description="Current HealOps configuration"
                            delay={0.2}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Service Name:</span>
                                    <Badge variant="outline">{serviceName}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">SDK Version:</span>
                                    <Badge variant="outline">{sdkVersion}</Badge>
                                </div>
                            </div>
                        </DemoCard>
                    </div>
                    
                    <ErrorButtons />
                </div>
            </div>
        </ErrorBoundary>
    );
}
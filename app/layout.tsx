import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientTracingProvider } from '@/components/ClientTracingProvider';

// Initialize HealOps  on server-side
if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../lib/tracing');
}

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

export const metadata: Metadata = {
    title: 'HealOps Next.js Demo |  Integration',
    description:
        'Professional demo showcasing HealOps  SDK integration in Next.js 14',
    keywords: ['HealOps', '', 'Error Monitoring', 'Next.js', 'Demo']
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} font-sans antialiased bg-black text-zinc-50`}
            >
                <ClientTracingProvider>{children}</ClientTracingProvider>
            </body>
        </html>
    );
}

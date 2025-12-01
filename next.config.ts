import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    reactCompiler: true,
    // Webpack config for when using --webpack flag
    webpack: (config, { isServer }) => {
        // Exclude Node.js modules from client bundle
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
                assert: false,
                os: false,
                path: false
            };
        }
        return config;
    },
    // Turbopack config (Next.js 16 default)
    // Since client-side no longer imports Node.js SDK, this is mainly for compatibility
    turbopack: {}
};

export default nextConfig;

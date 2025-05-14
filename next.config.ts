import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ],
        loader: 'custom',
        loaderFile: './src/utils/supabase/supabase-image-loader.js'
    },
    async rewrites() {
        return [
            {
                source: '/ingest/static/:path*',
                destination: 'https://us-assets.i.posthog.com/static/:path*'
            },
            {
                source: '/ingest/:path*',
                destination: 'https://us.i.posthog.com/:path*'
            },
            {
                source: '/ingest/decide',
                destination: 'https://us.i.posthog.com/decide'
            }
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true
};

export default withBundleAnalyzer(nextConfig);

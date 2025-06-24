import svgrConfig from '@repo/svgr-config';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    turbopack: svgrConfig.turbopack,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/main',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [new URL('https://images.unsplash.com/**')],
    },
};

export default nextConfig;

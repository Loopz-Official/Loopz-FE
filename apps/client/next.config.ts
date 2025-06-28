import svgrConfig from '@repo/svgr-config';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: svgrConfig.webpack,
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
                destination: '/auth/login',
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [new URL('https://static.loopz.co.kr/**')],
    },
};

export default nextConfig;

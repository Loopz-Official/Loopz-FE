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
                destination: '/auth/login',
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.loopz.co.kr',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;

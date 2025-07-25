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
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.loopz.co.kr',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                // For test server object detail image (추후 삭제 필요)
                protocol: 'https',
                hostname: 'loopz.co.kr',
                port: '',
                pathname: '/**',
                search: '',
            },
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
                pathname: '/dn/**',
            },
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
                pathname: '/dn/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ssl.pstatic.net',
                pathname: '/**',
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;

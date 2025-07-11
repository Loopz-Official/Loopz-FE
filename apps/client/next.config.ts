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
                protocol: 'https',
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
    },
};

export default nextConfig;

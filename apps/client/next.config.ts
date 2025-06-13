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
};

export default nextConfig;

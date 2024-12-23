import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['flagcdn.com', 'upload.wikimedia.org'],
    },
};

export default nextConfig;

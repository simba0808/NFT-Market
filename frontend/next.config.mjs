/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    domains: ['ipfs.infura.io'],
  },
};

export default nextConfig;

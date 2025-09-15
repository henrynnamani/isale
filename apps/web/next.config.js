/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  images: {
    domains: ['i.pinimg.com', 'www.pinterest.com'],
  },
};

module.exports = nextConfig;

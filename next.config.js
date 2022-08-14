/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    domains: ["images.unsplash.com", "gateway.pinata.cloud"],
  },
};

module.exports = nextConfig;

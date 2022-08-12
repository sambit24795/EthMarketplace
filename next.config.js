/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    domains: ["placeimg.com", "eincode.mypinata.cloud"],
  },
};

module.exports = nextConfig;

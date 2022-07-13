/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // runtime: 'experimental-edge',
  //runtime: 'nodejs',
  images: {
    domains: ['images.unsplash.com', 'ylgcsafpqtxyjlnyjlei.supabase.co', ''],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  experimental: {
    images: {
      // allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;

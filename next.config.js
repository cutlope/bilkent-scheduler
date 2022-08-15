/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    nextScriptWorkers: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scrapers/generate-sitemap");
    }

    return config;
  },
};

module.exports = nextConfig;

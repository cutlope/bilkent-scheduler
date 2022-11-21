/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    nextScriptWorkers: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scrapers/generate-sitemap");
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/gpa",
        destination: "/courses",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

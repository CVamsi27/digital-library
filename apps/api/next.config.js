/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["prisma"],
  transpilePackages: ["types"],
  transpilePackages: ["zod-schemas"],
};

module.exports = nextConfig;

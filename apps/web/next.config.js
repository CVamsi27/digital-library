/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  transpilePackages: ["types"],
  transpilePackages: ["prisma"],
  transpilePackages: ["zod-schemas"],
};

module.exports = nextConfig;

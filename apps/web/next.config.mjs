/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "types", "prisma", "zod-schemas", "trpc", "lib"],
};

export default nextConfig;

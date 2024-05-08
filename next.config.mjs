/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["kinoticket.uz", "185.196.213.181"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/psy",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

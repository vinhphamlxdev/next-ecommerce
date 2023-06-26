/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    // formats: ["image/webp"],
    minimumCacheTTL: 60,
    // disableStaticImages: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

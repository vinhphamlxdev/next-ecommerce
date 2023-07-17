/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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

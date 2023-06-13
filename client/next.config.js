/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "assets.vercel.com",
      //   port: "",
      //   pathname: "/image/upload/**",
      // },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

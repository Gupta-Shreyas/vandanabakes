/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  allowedDevOrigins: ['172.20.166.201', 'localhost:3000'],
};
export default nextConfig;

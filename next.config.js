/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/v2/:path*",
        destination: "https://api-pub.bitfinex.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

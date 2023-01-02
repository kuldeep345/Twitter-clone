/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["rb.gy"]
  },
  eslint: {
    ignoreDuringBuilds: true,
},
}

module.exports = nextConfig

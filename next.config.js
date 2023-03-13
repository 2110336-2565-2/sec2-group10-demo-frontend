/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'picsum.photos', 'media4.giphy.com', 'ibb.co', 'i.ibb.co'],
  },
}

module.exports = nextConfig

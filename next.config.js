/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com"
      },
      {
        hostname: "cloud.appwrite.io"
      }
    ]
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: `/api/auth/:path*`,
          destination: `${process.env.NEXT_PUBLIC_PORTAL_URL}${process.env.NEXT_PUBLIC_PORTAL_BASE_PATH}/api/auth/:path*`,
        },
        {
          source: `/api/auth/:path*`,
          destination: `${process.env.NEXT_PUBLIC_PORTAL_URL}${process.env.NEXT_PUBLIC_PORTAL_BASE_PATH}/api/auth/:path*`,
        },
        {
          source: '/api/payment/:path*',
          destination: `${process.env.NEXT_PUBLIC_PORTAL_URL}${process.env.NEXT_PUBLIC_PORTAL_BASE_PATH}/api/payment/:path*`,
        }
      ]
    }
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'www.hilton.com']
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-c7a22068052144a5805830c30d280128.r2.dev',
        pathname: '/products/52d3d853-d765-471b-8fce-58b5c151603e/**',
      },
    ],
    minimumCacheTTL: 86400,
  },
  async rewrites() {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/[\r\n]/g, '').replace(/\/$/, '')
    if (!adminUrl) return []
    return { afterFiles: [
      { source: '/admin', destination: `${adminUrl}/admin` },
      { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
      { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
    ] }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['lodash', 'next-themes', 'zustand', 'gray-matter', 'date-fns'],
    turbo: {
      rules: {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      }
    }
  }
};

export default nextConfig;

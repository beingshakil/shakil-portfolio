/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint is run separately; skip it during `next build` so deploy hosts
    // don't fail on ESLint config serialization issues.
    ignoreDuringBuilds: true,
  },
  images: {
    // Tool/skill logos are SVGs; allow next/image to serve them safely.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Blog images uploaded through Sanity Studio.
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'searchaly.com',
      },
      {
        protocol: 'https',
        hostname: 'quranmazid.com',
      },
      {
        protocol: 'https',
        hostname: 'ihadis.com',
      },
      {
        protocol: 'https',
        hostname: 'www.rsautomart.shop',
      },
    ],
  },
};

export default nextConfig;

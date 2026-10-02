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
    ],
  },
};

export default nextConfig;

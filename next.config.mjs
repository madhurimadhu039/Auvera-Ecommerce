/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/category/:slug", destination: "/categories/:slug" },
      { source: "/beauty-skincare", destination: "/categories/beauty" },
      { source: "/electronics-gadgets", destination: "/categories/electronics" },
      { source: "/fashion-lifestyle", destination: "/categories/fashion" },
      { source: "/shop", destination: "/products" },
      { source: "/search", destination: "/products" },
    ];
  },
};

export default nextConfig;

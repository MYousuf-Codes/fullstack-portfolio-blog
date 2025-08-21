const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.qsbsexpert.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // ✅ added for Ayesha Khan
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ added for Ahmed & Zainab
      },
      {
        protocol: "https",
        hostname: "i.dawn.com", // ✅ added for Usman Sheikh
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

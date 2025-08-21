/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://myousaf-codes.vercel.app", // Your live site
  generateRobotsTxt: true, // (will create robots.txt too)
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/404"], // exclude error pages
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/*"] }, // block API routes
    ],
    additionalSitemaps: [
      "https://myousaf-codes.vercel.app/sitemap.xml",
    ],
  },
};

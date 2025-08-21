const { createClient } = require("@sanity/client");

// ✅ Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  useCdn: true, // faster + cached since this is read-only
});

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://myousaf-codes.vercel.app", // ✅ dynamic for local/prod
  generateRobotsTxt: true,
  changefreq: "weekly", // daily is aggressive unless your site updates that often
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404", "/500"], // exclude error pages

  additionalPaths: async (config) => {
    let posts = [];
    try {
      // ✅ fetch blog posts with last updated date
      posts = await client.fetch(
        `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
      );
    } catch (err) {
      console.error("❌ Failed to fetch posts from Sanity:", err);
    }

    // Convert blog posts → sitemap entries
    const postPaths = await Promise.all(
      posts.map((post) =>
        config.transform(config, `/blog/${post.slug}`, {
          lastmod: post._updatedAt,
          changefreq: "weekly",
          priority: 0.8,
        })
      )
    );

    // ✅ Add static routes with priority
    const staticPaths = await Promise.all(
      [
        { url: "/", priority: 1.0 },
        { url: "/about", priority: 0.9 },
        { url: "/blog", priority: 0.9 },
        { url: "/authors", priority: 0.9 },
        { url: "/contact", priority: 0.9 },
        { url: "/projects", priority: 0.9 },
        { url: "/services", priority: 0.9 },
        { url: "/services/web-development", priority: 0.9 },
        { url: "/services/ai-chatbot-development", priority: 0.9 },
        { url: "/services/seo-performance-optimization", priority: 0.9 },
        { url: "/tutorials", priority: 0.9 },
      ].map((route) =>
        config.transform(config, route.url, {
          lastmod: new Date().toISOString(),
          changefreq: "monthly",
          priority: route.priority,
        })
      )
    );

    return [...staticPaths, ...postPaths];
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/*"] }, // don’t let crawlers waste budget on APIs
    ],
  },
};

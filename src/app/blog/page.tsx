import React from "react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import BlogPostsList from "@/components/BlogPostsList";
import { Metadata } from "next";

// Function to get featured posts for metadata
async function getFeaturedPostsForMetadata() {
  try {
    const featuredPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        title,
        mainImage
      }
    `);
    
    // Generate OG image URLs from the posts' main images
    return featuredPosts.map((post: { title: string; mainImage: SanityImageSource }) => ({
      ...post,
      imageUrl: post.mainImage ? urlForImage(post.mainImage)?.url() || '' : ''
    }));
  } catch (error) {
    console.error("Error fetching featured posts for metadata:", error);
    return [];
  }
}
// Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const featuredPosts = await getFeaturedPostsForMetadata();
  
  // Get the first featured post image for OG image, or use default
  const ogImageUrl = featuredPosts.length > 0 && featuredPosts[0].imageUrl 
    ? featuredPosts[0].imageUrl 
    : "images/placeholder.png";
  
  return {
    title: 'Blog | Latest Articles and Insights',
    description: 'Explore the latest articles about web development, programming, and technology on our blog.',
    keywords: 'web development, programming, technology, blog, articles, tutorials',
    openGraph: {
      title: 'Blog | Latest Articles and Insights',
      description: 'Explore the latest articles about web development, programming, and technology on our blog.',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Blog | Latest Articles and Insights',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Latest Articles and Insights',
      description: 'Explore the latest articles about web development, programming, and technology on our blog.',
      images: [ogImageUrl],
    },
  };
}

// Types
interface Author {
  _id: string;
  name: string;
  image: SanityImageSource;
  bio: string;
  slug: { current: string };
}

interface Category {
  title: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: SanityImageSource;
  publishedAt: string;
  readingTime: string;
  categories: Category[];
  author: Author;
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string; // URL for the OG image
}

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        author->{
          _id,
          name,
          image,
          bio,
          slug
        },
        categories[]->{
          title
        },
        "excerpt": array::join(string::split(pt::text(body[0...200]), "")[0..200], "") + "...",
        "readingTime": string(round(length(pt::text(body)) / 200)) + " min read",
        metaTitle,
        metaDescription,
        keywords,
        canonicalUrl
      }
    `);
    
    // Process posts to add OG image URLs
    return posts.map((post: Post) => {
      // Generate OG image URL from the post's main image
      const ogImage = post.mainImage ? urlForImage(post.mainImage)?.url() || "/images/placeholder.png" : null;
      return { ...post, ogImage };
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const categories = ["All", ...new Set(posts.flatMap(post => post.categories.map(cat => cat.title)))];

    return (
    <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Latest from the{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {`Explore the latest articles about web development, programming, and technology.`}
          </p>
        </div>

        {/* Blog Posts with Category Filter */}
        <BlogPostsList posts={posts} categories={categories} />
      </div>
    </div>
  );
}
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaCalendar, FaClock, FaArrowRight } from "react-icons/fa";
import { urlForImage } from "@/sanity/lib/image";
import BlogCategoryFilter from "./BlogCategoryFilter";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
  mainImage: SanityImageSource;
  publishedAt: string;
  author: Author;
  categories: Category[];
  excerpt: string;
  readTime?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

interface BlogPostsListProps {
  posts: Post[];
  categories: string[];
}

export default function BlogPostsList({ posts, categories }: BlogPostsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.categories.some(cat => cat.title === selectedCategory));

  return (
    <>
      <BlogCategoryFilter 
        categories={categories} 
        onCategoryChange={setSelectedCategory} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredPosts.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <h3 className="text-xl text-slate-600">No posts found in this category</h3>
            <p className="text-slate-500 mt-2">Try selecting a different category</p>
          </div>
        ) : (
          filteredPosts.map((post: Post) => (
            <motion.div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.ogImage || (urlForImage(post.mainImage)?.url() || "/images/placeholder.png")}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.title}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-medium"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-indigo-500" />
                    <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-indigo-500" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900 dark:text-white hover:text-indigo-500 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {post.author.image && (
                      <Link href={`/authors/${post.author.slug.current}`}>
                        <Image
                          src={urlForImage(post.author.image)?.url() || "/images/placeholder.png"}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    )}
                    <Link 
                      href={`/authors/${post.author.slug.current}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {post.author.name}
                    </Link>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors group"
                  >
                    Read More <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
} 
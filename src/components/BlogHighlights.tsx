"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../lib/sanity';
import { urlForImage } from '../lib/sanityImage';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface Author {
  _id: string;
  name: string;
  image: SanityImageSource;
  slug: {
    current: string;
  };
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  mainImage: SanityImageSource;
  publishedAt: string;
  readingTime: string;
  categories: { title: string }[];
  author: Author;
}

const BlogHighlights: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 2;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc)[0...4] {
          _id,
          title,
          slug,
          "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body[0...200]), "")[0..200], "") + "..."),
          mainImage,
          publishedAt,
          "readingTime": round(length(pt::text(body)) / 5 / 180) + " min read",
          "categories": categories[]->{ title },
          author->{
            _id,
            name,
            image,
            slug
          }
        }`;

        const fetchedPosts = await client.fetch(query);
        setPosts(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getPostsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-5xl font-bold text-slate-900 mb-4">
          Blog {" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Highlights
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
              <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-4">
        Blog {" "}
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Highlights
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {getPostsForCurrentPage().map((post) => (
          <motion.div
            key={post._id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {post.categories && post.categories.map((category) => (
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
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-indigo-500" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900 dark:text-white hover:text-indigo-500 transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {post.author && post.author.image && (
                    <Link href={`/authors/${post.author.slug.current}`}>
                      <Image
                        src={urlForImage(post.author.image).url() || "/images/placeholder.png" }
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full hover:opacity-80 transition-opacity"
                      />
                    </Link>
                  )}
                  {post.author && (
                    <Link
                      href={`/authors/${post.author.slug.current}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {post.author.name}
                    </Link>
                  )}
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
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogHighlights;

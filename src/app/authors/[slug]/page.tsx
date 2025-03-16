import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCalendar, FaClock, FaArrowRight } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { client } from "../../../lib/sanity";
import { urlForImage } from "../../../lib/sanityImage";
import type { Metadata } from 'next';
import type { PortableTextBlock } from '@portabletext/types';

// Author interface
interface Author {
  _id: string;
  name: string;
  tagline?: string;
  slug: {
    current: string;
  };
  image: any;
  bio: PortableTextBlock[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
  role: string;
}

// Post interface for author's posts
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage: any;
  excerpt: string;
  readingTime?: string;
  categories?: { title: string }[];
}

// Portable Text components
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }: any) => {
      if (!children || (Array.isArray(children) && children.length === 0)) {
        return <br />;
      }
      return (
        <p className="mb-4 text-slate-600 dark:text-slate-300">{children}</p>
      );
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-indigo-600 hover:text-indigo-500 underline"
        >
          {children}
        </Link>
      );
    },
  },
};

// Generate metadata for SEO
export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getAuthor(slug);
  
  if (!data) {
    return {
      title: 'Author Not Found',
      description: 'The requested author profile could not be found.',
    };
  }

  const { author } = data;
  
  return {
    title: `${author.name} - Author Profile | Expert Writer and Contributor`,
    description: `Learn more about ${author.name}, ${author.role}. Read their articles and contributions.`,
    openGraph: {
      title: `${author.name} - Author Profile`,
      description: `Learn more about ${author.name}, ${author.role}. Read their articles and contributions.`,
      type: 'profile',
      images: [
        {
          url: urlForImage(author.image)?.url() || '/placeholder-avatar.jpg',
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
    },
  };
}

// Fetch author data from Sanity CMS
async function getAuthor(slug: string): Promise<{ author: Author; posts: Post[] } | null> {
  try {
    const author = await client.fetch(`
      *[_type == "author" && slug.current == $slug][0]{
        _id,
        name,
        slug,
        image,
        bio,
        role,
        socialLinks
      }
    `, { slug });

    if (!author) return null;

    const posts = await client.fetch(`
      *[_type == "post" && author._ref == $authorId] | order(publishedAt desc)[0...3]{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "readingTime": round(length(pt::text(body)) / 5 / 180) + " min read",
        "categories": categories[]->{ title },
        "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body[0...200]), "")[0..200], "") + "...")
      }
    `, { authorId: author._id });

    return { author, posts };
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

// Format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function AuthorPage({ params: { slug } }: { params: { slug: string } }) {
  const data = await getAuthor(slug);
  
  if (!data) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Author Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">The author you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Authors</span>
          </Link>
        </div>
      </div>
    );
  }
  
  const { author, posts } = data;

  return (
    <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/authors"
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
        >
          <FaArrowLeft className="text-sm group-hover:translate-x-[-2px] transition-transform" />
          <span>Back to Authors</span>
        </Link>

        {/* Author Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 md:p-12 shadow-lg mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Author Image */}
            <div className="w-40 h-40 relative flex-shrink-0">
              <Image
                src={urlForImage(author.image).url()}
                alt={author.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            
            {/* Author Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 text-center md:text-left">
                {author.name}
              </h1>
              
              <p className="text-lg text-indigo-600 dark:text-indigo-400 mb-4 text-center md:text-left">
                {author.role}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 mb-6 justify-center md:justify-start">
                {author.socialLinks?.github && (
                  <a 
                    href={author.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-3 rounded-full"
                    aria-label={`${author.name}'s GitHub profile`}
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {author.socialLinks?.linkedin && (
                  <a 
                    href={author.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-3 rounded-full"
                    aria-label={`${author.name}'s LinkedIn profile`}
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {author.socialLinks?.twitter && (
                  <a 
                    href={author.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-3 rounded-full"
                    aria-label={`${author.name}'s Twitter profile`}
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                )}
                {author.socialLinks?.email && (
                  <a 
                    href={`mailto:${author.socialLinks.email}`}
                    className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-3 rounded-full"
                    aria-label={`Email ${author.name}`}
                  >
                    <FaEnvelope className="w-5 h-5" />
                  </a>
                )}
              </div>
              
              {/* Author Bio */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <PortableText value={author.bio} components={portableTextComponents} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        {posts.length > 0 && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Recent Articles by{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {author.name}
            </span>
          </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={urlForImage(post.mainImage)?.url() || '/placeholder.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                        {post.readingTime && (
                          <div className="flex items-center gap-2">
                            <FaClock className="text-indigo-500" />
                            <span>{post.readingTime}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-end">
                        <span className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors group">
                          Read More <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { format } from "date-fns";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaClock } from "react-icons/fa";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/types";
import { Metadata } from "next";

// Interfaces`
interface Author {
  _id: string;
  name: string;
  image: SanityImageSource;
  bio: PortableTextBlock[];
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
  body: PortableTextBlock[];
  readTime?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  excerpt?: string;
  ogImage?: string;
}

interface Props {
  params: {
    slug: string;
  };
}

// PortableText Components with optional children prop
const portableTextComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value)?.url() || "/image/placeholder.png"}
            alt={value.alt || "Image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
        <code>{value?.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-slate-600 dark:text-slate-300">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-500 underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-slate-600 dark:text-slate-300">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-slate-600 dark:text-slate-300">{children}</li>
    ),
  },
};

// Fetch Post
async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
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
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          }
        },
        "readTime": string(round(length(pt::text(body)) / 200)) + " min read",
        metaTitle,
        metaDescription,
        keywords,
        canonicalUrl,
        excerpt
      }`,
      { slug }
    );

    if (post) {
      return {
        ...post,
        ogImage: post.mainImage ? urlForImage(post.mainImage)?.url() || "/images/placeholder.png" : null,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description:
      post.metaDescription ||
      post.excerpt ||
      `Read ${post.title} by ${post.author?.name || "Unknown Author"}`,
    keywords: post.keywords?.join(", "),
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.ogImage
        ? [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: post.ogImage ? [post.ogImage] : [],
    },
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  };
}

// Blog Post Page Component
export default async function BlogPost({ params: { slug } }: Props) {
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-xl text-slate-600 mb-8 dark:text-black">
            {`The post you're looking for doesn't exist or has been removed.`}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

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
          href="/blog"
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
        >
          <FaArrowLeft className="text-sm group-hover:translate-x-[-2px] transition-transform" />
          <span>Back to blog</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <span
                key={category.title}
                className="px-4 py-2 bg-indigo-500 text-ba rounded-full text-sm font-medium"
              >
                {category.title}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Link href={`/authors/${post.author.slug.current}`}>
                  <Image
                    src={
                      urlForImage(post.author.image)?.url() ||
                      "/images/placeholder.png"
                    }
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full hover:opacity-80 transition-opacity"
                  />
                </Link>
              )}
              <Link
                href={`/authors/${post.author.slug.current}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {post.author.name}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-indigo-500" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "MMMM d, yyyy")}
              </time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <FaClock className="text-indigo-500" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Image */}
        <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={
              post.ogImage ||
              (urlForImage(post.mainImage)?.url() || "/images/placeholder.png" )
            }
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none mb-16 dark:prose-invert dark:text-black">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-slate-600 dark:text-black">
              No content available for this post.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

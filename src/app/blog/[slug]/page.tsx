import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaClock } from "react-icons/fa";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/types";
import AuthorBio from "./AuthorBio";
import { Metadata } from "next";

// Update Author interface: bio is now an array of PortableTextBlock
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
  body: PortableTextBlock[]; // Expected to be an array
  readTime?: string;
  // SEO fields
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

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value)?.url() || "/placeholder.jpg"}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    code: ({ value }: any) => (
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
        <code>{value.code}</code>
      </pre>
    ),
  },
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
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold mb-2 mt-4">{children}</h4>
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
    code: ({ children }: any) => (
      <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded">
        {children}
      </code>
    ),
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
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-slate-600 dark:text-slate-300">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-slate-600 dark:text-slate-300">{children}</li>
    ),
  },
};

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
      // Generate OG image URL from the post's main image
      const ogImage = post.mainImage ? urlForImage(post.mainImage)?.url() || '' : '';
      return { ...post, ogImage };
    }
    
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
  
  // Use SEO fields if available, otherwise fall back to regular fields
  const title = post.metaTitle || post.title;
  const authorName = post.author?.name || 'Unknown Author';
  const description = post.metaDescription || post.excerpt || `Read ${post.title} by ${authorName}`;
  const keywords = post.keywords?.join(', ');
  
  // Use the pre-generated ogImage
  const imageUrl = post.ogImage || '';
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(imageUrl && {
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    ...(post.canonicalUrl && {
      alternates: {
        canonical: post.canonicalUrl,
      },
    }),
  };
}

export default async function BlogPost({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
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
                className="px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-medium"
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
                    src={urlForImage(post.author.image)?.url() || "/placeholder-avatar.jpg"}
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
            src={post.ogImage || (urlForImage(post.mainImage)?.url() || "/placeholder.jpg")}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none mb-16 dark:prose-invert">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-slate-600 dark:text-slate-300">
              No content available for this post.
            </p>
          )}
        </div>

        {/* Author Bio */}
        {post.author.bio && <AuthorBio author={post.author} />}
      </div>
    </div>
  );
}

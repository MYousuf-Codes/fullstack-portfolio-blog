import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { client } from "../../../lib/sanity";
import { urlForImage } from "../../../lib/sanityImage";

// Author interface
interface Author {
  _id: string;
  name: string;
  tagline?: string;
  slug: {
    current: string;
  };
  image: any;
  bio: any[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
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
export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const author = await getAuthor(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }
  
  return {
    title: `${author.name} | Author Profile`,
    description: `Learn more about ${author.name}, one of our talented content creators.`,
    openGraph: {
      title: `${author.name} | Author Profile`,
      description: `Learn more about ${author.name}, one of our talented content creators.`,
      type: 'profile',
      images: [
        {
          url: urlForImage(author.image).url(),
          width: 800,
          height: 600,
          alt: author.name,
        },
      ],
    },
  };
}

// Fetch author data from Sanity CMS
async function getAuthor(slug: string): Promise<Author | null> {
  const query = `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    tagline,
    slug,
    image,
    bio,
    "socialLinks": {
      "twitter": twitter,
      "github": github,
      "linkedin": linkedin,
      "email": email
    }
  }`;
  
  return await client.fetch(query, { slug });
}

// Fetch author's posts from Sanity CMS
async function getAuthorPosts(authorId: string): Promise<Post[]> {
  const query = `*[_type == "post" && references($authorId)] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt
  }`;
  
  return await client.fetch(query, { authorId });
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
  const author = await getAuthor(slug);
  
  if (!author) {
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
  
  const authorPosts = await getAuthorPosts(author._id);

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
              
              {author.tagline && (
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 text-center md:text-left">
                  {author.tagline}
                </p>
              )}
              
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

        {/* Author's Posts */}
        {authorPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Articles by {author.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {authorPosts.map((post) => (
                <Link 
                  href={`/blog/${post.slug.current}`}
                  key={post._id}
                  className="group"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:translate-y-[-5px]">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlForImage(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {formatDate(post.publishedAt)}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-indigo-500 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-medium">Read Article</span>
                        <span className="text-indigo-600">→</span>
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

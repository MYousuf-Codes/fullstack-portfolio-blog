import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { client } from "../../lib/sanity";
import { urlForImage } from "../../lib/sanityImage";

// Define the Author interface
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
  };
}

// Metadata for SEO
export const metadata = {
  title: 'Our Authors | MYousuf-Codes',
  description: 'Meet our talented team of writers and content creators who bring you insightful articles and tutorials.',
  openGraph: {
    title: 'Our Authors | MYousuf-Codes',
    description: 'Meet our talented team of writers and content creators who bring you insightful articles and tutorials.',
    type: 'website',
  },
};

// Fetch authors from Sanity CMS
async function getAuthors(): Promise<Author[]> {
  const query = `*[_type == "author"] {
    _id,
    name,
    tagline,
    slug,
    image,
    bio,
    "socialLinks": {
      "twitter": twitter,
      "github": github,
      "linkedin": linkedin
    }
  }`;
  
  return await client.fetch(query);
}


export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group"
        >
          <FaArrowLeft className="text-sm group-hover:translate-x-[-2px] transition-transform" />
          <span>Back to home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Our {" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Authors
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            The talented writers and content creators who bring you insightful articles and tutorials
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {authors.map((author) => (
            <Link 
              href={`/authors/${author.slug.current}`}
              key={author._id}
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:translate-y-[-5px] p-6">
                <div className="flex flex-col items-center">
                  {/* Author Image */}
                  <div className="w-24 h-24 relative mb-4">
                    <Image
                      src={urlForImage(author.image).url()}
                      alt={author.name}
                      fill
                      className="rounded-full object-cover border-2 border-indigo-100 shadow"
                    />
                  </div>
                  
                  {/* Author Info */}
                  <h2 className="text-xl font-semibold mb-1 group-hover:text-indigo-500 transition-colors text-center">
                    {author.name}
                  </h2>
                  
                  {author.tagline && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 text-center">
                      {author.tagline}
                    </p>
                  )}
                  
                  {/* Social Links */}
                  <div className="flex gap-3 mb-5 justify-center">
                    {author.socialLinks?.github && (
                      <a 
                        href={author.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-2 rounded-full"
                        aria-label={`${author.name}'s GitHub profile`}
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    )}
                    {author.socialLinks?.twitter && (
                      <a 
                        href={author.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-2 rounded-full"
                        aria-label={`${author.name}'s Twitter profile`}
                      >
                        <FaTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {author.socialLinks?.linkedin && (
                      <a 
                        href={author.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors bg-slate-100 dark:bg-slate-700 p-2 rounded-full"
                        aria-label={`${author.name}'s LinkedIn profile`}
                      >
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <div className="w-full border-t border-slate-200 dark:border-slate-700 pt-4 mt-auto">
                    <div className="flex items-center justify-center">
                      <span className="text-indigo-600 font-medium text-sm">View Profile</span>
                      <span className="text-indigo-600 ml-2">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
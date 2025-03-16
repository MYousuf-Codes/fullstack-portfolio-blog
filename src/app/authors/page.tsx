import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import type { Metadata } from 'next';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Our Authors | Expert Writers and Contributors',
  description: 'Meet our team of expert writers, developers, and contributors who bring you the latest insights and tutorials.',
  openGraph: {
    title: 'Our Authors | Expert Writers and Contributors',
    description: 'Meet our team of expert writers, developers, and contributors who bring you the latest insights and tutorials.',
    type: 'website',
  },
};

interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
  bio: any[];
  shortBio: string;
  role: string;
  socialLinks: SocialLinks;
}

async function getAuthors(): Promise<Author[]> {
  try {
    const authors = await client.fetch(`
      *[_type == "author"] {
        _id,
        name,
        slug,
        image,
        "shortBio": coalesce(shortBio, array::join(string::split(pt::text(bio[0...150]), "")[0..150], "") + "..."),
        bio,
        role,
        socialLinks
      }
    `);
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="min-h-screen pt-36 pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Authors
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our team of expert writers and developers bringing you the latest insights,
            tutorials, and tech news.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link 
              key={author._id}
              href={`/authors/${author.slug.current}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  {/* Author Image */}
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={urlForImage(author.image)?.url() || '/placeholder-avatar.jpg'}
                      alt={author.name}
                      fill
                      className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Author Info */}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {author.name}
                  </h2>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">
                    {author.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {author.shortBio}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-4 text-gray-400 mb-6">
                    {author.socialLinks?.github && (
                      <a 
                        href={author.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={20} />
                      </a>
                    )}
                    {author.socialLinks?.twitter && (
                      <a 
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {author.socialLinks?.linkedin && (
                      <a 
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaLinkedin size={20} />
                      </a>
                    )}
                  </div>

                  {/* View Profile Button */}
                  <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors duration-200 group-hover:shadow-md flex items-center justify-center gap-2">
                    View Profile
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
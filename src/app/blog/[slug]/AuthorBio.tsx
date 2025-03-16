'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/types";
import { useState } from "react";

interface Author {
  name: string;
  image: SanityImageSource;
  bio: PortableTextBlock[];
}

interface AuthorBioProps {
  author: Author;
}

// Reuse the same portableTextComponents from the parent component
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

export default function AuthorBio({ author }: AuthorBioProps) {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg mb-16">
      <div className="flex flex-col items-center text-center">
        {/* Author Image */}
        {author.image && (
          <div className="mb-6">
            <Image
              src={urlForImage(author.image)?.url() || "/placeholder-avatar.jpg"}
              alt={author.name}
              width={96}
              height={96}
              className="rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
            />
          </div>
        )}

        {/* Author Name */}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {author.name}
        </h3>

        {/* Author Title or Role */}
        <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
          Technical Writer & Developer
        </p>

        {/* Bio Content */}
        <div className="max-w-2xl mx-auto">
          <div className={`prose prose-slate dark:prose-invert overflow-hidden transition-all duration-300 ${showFullBio ? 'max-h-none' : 'max-h-24'}`}>
            <PortableText value={author.bio} components={portableTextComponents} />
          </div>

          {/* Read More Button */}
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mx-auto transition-colors"
          >
            {showFullBio ? (
              <>
                Show Less <FaChevronUp className="text-sm" />
              </>
            ) : (
              <>
                Read More <FaChevronDown className="text-sm" />
              </>
            )}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-6">
          <Link
            href="#"
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 
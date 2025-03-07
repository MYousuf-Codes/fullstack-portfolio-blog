import React from 'react';

const PostDetails: React.FC = () => {
    return (
        <div>
           // Generate a Post Detail Page for a Next.js 15 project using TypeScript, Sanity CMS, and Tailwind CSS. This page should display detailed information for a single blog post. The content should be fetched dynamically from Sanity CMS based on the slug of the post. The page should include the following components:"

            Post Detail Page Requirements:
            Title: Display the full title of the post.
            Featured Image: Show the mainImage with its alternative text.
            Categories: List the categories associated with the post from the categories field.
            Author: Show the author's name and any relevant information (e.g., bio).
            Published Date: Display the publishedAt field.
            Body: Render the full content from the body field (use rich text formatting).
            Code Highlighting: Implement syntax highlighting for any code blocks within the body.
            SEO Meta Tags: Dynamically generate meta tags (like title and description) for SEO based on the post content.
            Back to Blog Button: Include a button to navigate back to the blog's main page.
            Routing: Use Next.js dynamic routing (app/blog/[slug]/page.tsx) for handling different blog posts based on the slug.
            Server-Side Rendering (SSR) or Static Site Generation (SSG) for optimal performance.
        </div>
    );
};

export default PostDetails;
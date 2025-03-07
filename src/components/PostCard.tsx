import React from 'react';

const PostCard: React.FC = () => {
    return (
        <div>
           // Generate a Post Card component for a Next.js 15 project using TypeScript, Sanity CMS, and Tailwind CSS. The card should be dynamically populated with data fetched from Sanity CMS using the provided post schema. The component should be responsive, accessible, and optimized for performance. Include the following fields in the card layout:"

            Card Requirements:
            Featured Image: The image from the mainImage field in the post schema.
            Category: Display the category for the post from the categories field (use category.title).
            Title: Display the title field.
            Excerpt: Show a short excerpt of the post’s content or a brief summary.
            Read Time: Display an estimated read time (readTime).
            Author: Show the author field with the author's name.
            Date: Display the post's publishedAt date.
            "Read More" Button: Link to the full post page.
            Design: Use ShadCN UI and Tailwind CSS for styling.
            Responsive Design: Ensure the card is responsive across different screen sizes, using a grid layout for multiple posts.
        </div>
    );
};

export default PostCard;
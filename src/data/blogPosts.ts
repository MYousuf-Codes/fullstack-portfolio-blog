export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding TypeScript Generics with Real-World Examples",
    excerpt: "Deep dive into TypeScript generics with practical examples and best practices for building type-safe applications.",
    category: "TypeScript",
    date: "2024-03-15",
    readTime: "8 min read",
    imageUrl: "/blog/typescript-generics.jpg",
    slug: "understanding-typescript-generics"
  },
  {
    id: 2,
    title: "Modern CSS Layout Techniques You Should Know",
    excerpt: "Explore the power of CSS Grid, Flexbox, and Container Queries for building responsive layouts in 2024.",
    category: "CSS",
    date: "2024-03-10",
    readTime: "6 min read",
    imageUrl: "/blog/css-layout.jpg",
    slug: "modern-css-layout-techniques"
  },
  {
    id: 3,
    title: "Building a REST API with Node.js and Express",
    excerpt: "Step-by-step guide to creating a RESTful API using Node.js, Express, and MongoDB with best practices.",
    category: "JavaScript",
    date: "2024-03-05",
    readTime: "10 min read",
    imageUrl: "/blog/nodejs-api.jpg",
    slug: "building-rest-api-nodejs"
  }
]; 
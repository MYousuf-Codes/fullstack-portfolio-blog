export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Full-Stack CRM for ISP",
    description: "A full-stack CRM for ISP to manage customers, orders, activations, and support requests.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI",  "PostgreSQL", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes",
    liveUrl: "https://wancom-accounts-isp.vercel.app/",
    imageUrl: "/images/crm.png"
  },
  {
    id: 2,
    title: "Full-Stack E-Commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Sanity", "Redu", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes/comforty-furnitures",
    liveUrl: "https://comforty-furniture.vercel.app/",
    imageUrl: "/images/ecommerce.png"
  },
  {
    id: 3,
    title: "Full-Stack Blog Platform",
    description: "An AI-powered image generation tool using DALL-E API with custom prompt engineering.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI", "Firebase"],
    githubUrl: "https://github.com/MYousuf-Codes/tech-blog",
    liveUrl: "https://mytech-blog.vercel.app/",
    imageUrl: "/images/blog.png"
  },
]; 
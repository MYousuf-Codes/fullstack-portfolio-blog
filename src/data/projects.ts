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
    description: "A full-stack CRM for ISP to manage customers, orders, activations, and support requests. Private Repo",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI",  "PostgreSQL", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes",
    liveUrl: "https://wancom-accounts-isp.vercel.app/",
    imageUrl: "/images/crm.png"
  },
  {
    id: 2,
    title: "Figma to Full-Stack E-Commerce",
    description: "A full-stack E-commerce platform with user authentication, product management, and payment integration.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Sanity", "ShadCn UI", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes/comforty-furnitures",
    liveUrl: "https://comforty-furnitures.vercel.app/",
    imageUrl: "/images/ecommerce.png"
  },
  {
    id: 3,
    title: "Full-Stack Blog",
    description: "A blog platform with sanity integration, post management, and comment system.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI", "Redux Toolkit", "Sanity"],
    githubUrl: "https://github.com/MYousuf-Codes/tech-blog",
    liveUrl: "https://mytech-blog.vercel.app/",
    imageUrl: "/images/blog.png"
  },
];
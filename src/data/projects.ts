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
    title: "Full-Stack CRM | Developed for ISP",
    description: "A full-stack CRM for Internet Service Provider (ISP) to manage customers, orders, activations, and support requests. Private Repo",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI",  "PostgreSQL", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes",
    liveUrl: "https://wancom-accounts-isp.vercel.app/",
    imageUrl: "/images/crm.png"
  },
  {
    id: 2,
    title: "Hackathon | Figma to Full-Stack E-Commerce",
    description: "A full-stack E-commerce platform with user authentication, product management, and payment integration.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Sanity", "ShadCn UI", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes/comforty-furnitures",
    liveUrl: "https://comforty-furnitures.vercel.app/",
    imageUrl: "/images/ecommerce.png"
  },
  {
    id: 3,
    title: "Resume Builder",
    description: "Professional and Job-winning Resume, jsut with few clicks.",
    techStack: ["HTML", "CSS", "TypeScript", "JavaScript", "TS DOM"],
    githubUrl: "https://github.com/MYousuf-Codes/Static-Interactive-Resmue",
    liveUrl: "https://static-interactive-resmue.vercel.app/resume.html",
    imageUrl: "/images/resume-builder.png"
  },
  // {
  //   id: 4,
  //   title: "TechOtics | Upwork Agency Website",
  //   description: "Service Website developed for the international Upwork Agency. Private Repo",
  //   techStack: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCn UI", "Sanity"],
  //   githubUrl: "",
  //   liveUrl: "https://techotics.co/",
  //   imageUrl: "/images/upwork.png"
  // },
  {
    id: 4,
    title: "Full-Stack Blog",
    description: "A blog platform with sanity integration, post management, and comment system.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI", "Redux Toolkit", "Sanity"],
    githubUrl: "https://github.com/MYousuf-Codes/tech-blog",
    liveUrl: "https://mytech-blog.vercel.app/",
    imageUrl: "/images/blog.png"
  },
];
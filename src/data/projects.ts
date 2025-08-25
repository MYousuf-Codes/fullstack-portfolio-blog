export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  images?: string[]; 
  category: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  status: "completed" | "in-progress" | "planned";
  duration: string;
  slug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "XWindow Solution | Figma to Next.js",
    description: "Converted a Figma design into a fully functional, responsive, and pixel-perfect Next.js website.",
  longDescription: "This project involved transforming a Figma design into a fully functional website using Next.js. The main objective was achieving pixel-perfect accuracy and ensuring responsiveness across devices while maintaining smooth user interactions and fast performance. The project also included implementing authentication, a simple CMS-like structure, and payment integration.",
  techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI", "PostgreSQL", "Auth.js", "Stripe"],
  githubUrl: "https://github.com/myousuf-codes",
  liveUrl: "https://xwindowsolution.com/",
  images: [
    "/images/xwindowsolution.png",
  ],
  category: "Figma to Next.js",
  features: [
    "Pixel-perfect Figma to Next.js conversion",
    "Responsive design across all devices",
    "Authentication system with Auth.js",
    "Stripe payment integration",
    "Database integration with PostgreSQL",
    "Modern UI with ShadCn components",
    "SEO-friendly and optimized performance"
  ],
  challenges: [
    "Ensuring pixel-perfect accuracy from Figma to code",
    "Managing responsive breakpoints for mobile-first layout",
    "Integrating Auth.js with PostgreSQL smoothly",
    "Handling Stripe payment flow securely",
    "Balancing performance with high-quality visuals"
  ],
  learnings: [
    "Best practices for pixel-perfect Figma to Next.js implementation",
    "Deeper understanding of Auth.js with custom databases",
    "Practical experience integrating Stripe payments",
    "Optimizing performance with Next.js image & routing",
    "Using ShadCn UI for scalable and consistent design"
  ],
  status: "completed",
  duration: "3 days",
  slug: "xwindowsolution"
},
  {
    id: 2,
    title: "Hackathon | Figma to Full-Stack E-Commerce",
    description: "A full-stack E-commerce platform with user authentication, product management, and payment integration.",
    longDescription: "A complete e-commerce solution built from Figma designs during a hackathon. Features include user authentication, product catalog management, shopping cart functionality, order processing, and secure payment integration. The platform uses Sanity as a headless CMS for content management and includes an admin panel for product and order management.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Sanity", "ShadCn UI", "Auth.js", "Stripe"],
    githubUrl: "https://github.com/myousuf-codes/comforty-furnitures",
    liveUrl: "https://comforty-furnitures.vercel.app/",
    images: [
      "/images/ecommerce.png",
    ],
    category: "E-Commerce Platform",
    features: [
      "User Authentication & Profiles",
      "Product Catalog with Categories",
      "Shopping Cart & Wishlist",
      "Secure Checkout Process",
      "Order Management",
      "Admin Dashboard",
      "Responsive Design",
      "SEO Optimization"
    ],
    challenges: [
      "Converting Figma designs to pixel-perfect UI",
      "Implementing complex product filtering",
      "Managing cart state across sessions",
      "Optimizing performance for large catalogs"
    ],
    learnings: [
      "Headless CMS integration with Sanity",
      "Advanced Next.js routing and SSR",
      "E-commerce best practices",
      "Payment processing workflows"
    ],
    status: "completed",
    duration: "1 month",
    slug: "figma-ecommerce-platform"
  },
  {
    id: 3,
    title: "Resume Builder",
    description: "Professional and Job-winning Resume, just with a few clicks.",
    longDescription: "An interactive resume builder that allows users to create professional resumes quickly and efficiently. Features multiple templates, real-time preview, PDF export functionality, and dynamic form handling. Built with vanilla TypeScript for optimal performance and includes drag-and-drop functionality for section reordering.",
    techStack: ["HTML", "CSS", "TypeScript", "JavaScript", "TS DOM"],
    githubUrl: "https://github.com/MYousuf-Codes/Static-Interactive-Resmue",
    liveUrl: "https://static-interactive-resmue.vercel.app/resume.html",
    images: [
      "/images/resume-builder.png"
    ],
    category: "Productivity Tool",
    features: [
      "Multiple Resume Templates",
      "Real-time Preview",
      "PDF Export",
      "Drag & Drop Sections",
      "Auto-save Functionality",
      "Responsive Design",
      "Print Optimization",
      "Data Validation"
    ],
    challenges: [
      "Creating pixel-perfect PDF exports",
      "Implementing drag-and-drop with vanilla JS",
      "Managing complex form state",
      "Ensuring cross-browser compatibility"
    ],
    learnings: [
      "Advanced TypeScript DOM manipulation",
      "PDF generation techniques",
      "Performance optimization without frameworks",
      "Accessible form design patterns"
    ],
    status: "completed",
    duration: "2 weeks",
    slug: "interactive-resume-builder"
  },
  {
    id: 4,
    title: "Full-Stack Blog Platform",
    description: "A blog platform with Sanity integration, post management, and comment system.",
    longDescription: "A modern blogging platform built with Next.js and Sanity CMS. Features include rich text editing, image optimization, comment system, social sharing, SEO optimization, and a clean reading experience. The platform includes an admin interface for content management and analytics dashboard for tracking engagement.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "ShadCn UI", "Redux Toolkit", "Sanity"],
    githubUrl: "https://github.com/MYousuf-Codes/tech-blog",
    liveUrl: "https://mytech-blog.vercel.app/",
    images: [
      "/images/blog.png",
    ],
    category: "Content Management System",
    features: [
      "Rich Text Editor",
      "Image Optimization",
      "Comment System",
      "Social Sharing",
      "SEO Optimization",
      "Tag Management",
      "Search Functionality",
      "Analytics Dashboard"
    ],
    challenges: [
      "Implementing rich text editor with Sanity",
      "Optimizing performance for content-heavy pages",
      "Building complex comment threading",
      "SEO optimization for dynamic content"
    ],
    learnings: [
      "Advanced Sanity CMS patterns",
      "Content delivery optimization",
      "Social media integration",
      "Analytics implementation"
    ],
    status: "completed",
    duration: "1.5 months",
    slug: "fullstack-blog-platform"
  }
];
export interface TechLogo {
  src: string;
  alt: string;
  priority: boolean;
  isNextJS?: boolean;
}

export const techLogos: TechLogo[] = [
  { 
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
    alt: "HTML5",
    priority: true
  },
  { 
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
    alt: "CSS3",
    priority: true
  },
  { 
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    alt: "JavaScript",
    priority: true
  },
  { 
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", 
    alt: "TypeScript",
    priority: true
  },
  { 
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
    alt: "React",
    priority: true
  },
  { 
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", 
    alt: "Next.js",
    isNextJS: true,
    priority: true
  },
  { 
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
    alt: "Tailwind CSS",
    priority: true
  }
]; 
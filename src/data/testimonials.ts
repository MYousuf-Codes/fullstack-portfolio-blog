export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string; // Profile photo
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "One of the most dedicated developers I've worked with. Their attention to detail and problem-solving skills are exceptional.",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechInnovate",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    quote: "Delivered our project ahead of schedule with all requirements met. Their communication throughout the process was excellent.",
    name: "Michael Chen",
    role: "CTO",
    company: "StartupVision",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    quote: "A true professional who consistently delivers high-quality code. Their expertise in React and Next.js transformed our application.",
    name: "Emily Rodriguez",
    role: "Frontend Lead",
    company: "WebSolutions",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    quote: "Exceptional problem solver with a deep understanding of both frontend and backend technologies. Always goes the extra mile.",
    name: "David Kim",
    role: "Engineering Director",
    company: "InnovateTech",
    imageUrl: "https://randomuser.me/api/portraits/men/75.jpg"
  }
]; 
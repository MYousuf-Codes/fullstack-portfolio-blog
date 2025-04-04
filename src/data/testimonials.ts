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
    name: "Ayesha Khan",
    role: "Product Manager",
    company: "TechVision Pakistan",
    imageUrl: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    id: 2,
    quote: "Delivered our project ahead of schedule with all requirements met. Their communication throughout the process was excellent.",
    name: "Ahmed Raza",
    role: "CTO",
    company: "PakSoft Solutions",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    quote: "A true professional who consistently delivers high-quality code. Their expertise in React and Next.js transformed our application.",
    name: "Zainab Ali",
    role: "Frontend Lead",
    company: "Web Experts Pakistan",
    imageUrl: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  {
    id: 4,
    quote: "Exceptional problem solver with a deep understanding of both frontend and backend technologies. Always goes the extra mile.",
    name: "Usman Sheikh",
    role: "Engineering Director",
    company: "Innovate Pakistan",
    imageUrl: "https://randomuser.me/api/portraits/men/60.jpg"
  }
];

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
    quote: "One of the most dedicated developers I have worked with. Their attention to detail and problem-solving skills are exceptional.",
    name: "Ayesha Khan",
    role: "Product Manager",
    company: "TechVision Pakistan",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681074963522-00ca908dce4e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    quote: "Delivered our project ahead of schedule with all requirements met. Their communication throughout the process was excellent.",
    name: "Ahmed Raza",
    role: "CTO",
    company: "PakSoft Solutions",
    imageUrl: "https://images.unsplash.com/photo-1601730263526-229807bd34cc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    quote: "A true professional who consistently delivers high-quality code. Their expertise in React and Next.js transformed our application.",
    name: "Zainab Ali",
    role: "Frontend Lead",
    company: "Web Experts Pakistan",
    imageUrl: "https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    quote: "Exceptional problem solver with a deep understanding of both frontend and backend technologies. Always goes the extra mile.",
    name: "Usman Sheikh",
    role: "Engineering Director",
    company: "Innovate Pakistan",
    imageUrl: "https://i.dawn.com/primary/2015/09/55e75b43a6966.jpg?r=1709406299"
  }
];

import CTA from "@/components/CTA";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import SkillsExpertise from "@/components/SkillsExpertise";
import Testimonials from "@/components/Testimonials";
import BlogHighlights from "@/components/BlogHighlights";
import TechLogos from "@/components/TechLogos";

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 relative">
      <Hero />
      <TechLogos />
      <FeaturedProjects  />
      <SkillsExpertise />
      <BlogHighlights />
      <Testimonials />
      <CTA />
      <NewsLetter />
    </main>
  );
}

export default Home;


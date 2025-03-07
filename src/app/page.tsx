import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechLogos from "@/components/TechLogos";

function Home() {
  return (
    <main className="bg-gray-900 min-h-screen">
      <Header />
      <Hero />
      <TechLogos />
    </main>
  );
}

export default Home;

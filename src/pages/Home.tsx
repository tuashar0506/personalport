import { useReveal } from "@/hooks/useReveal";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Education from "@/sections/Education";
import GithubActivity from "@/sections/GithubActivity";
import Contact, { Footer } from "@/sections/Contact";

export default function Home() {
  const ref = useReveal();

  return (
    <div ref={ref} className="min-h-screen bg-ink text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

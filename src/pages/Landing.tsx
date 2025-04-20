import {Navbar} from "@/components/layouts/Navbar";
import {Footer} from "@/components/layouts/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { KnowledgeSection } from "@/components/landing/KnowledgeSection";
import { TechMindsSection } from "@/components/landing/TechMindsSection";
import { JoinSection } from "@/components/landing/JoinSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <KnowledgeSection />
        <TechMindsSection />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
}

import {Navbar} from "@/components/client/layouts/Navbar";
import {Footer} from "@/components/client/layouts/Footer";
import { HeroSection } from "@/components/client/landing/HeroSection";
import { KnowledgeSection } from "@/components/client/landing/KnowledgeSection";
import { TechMindsSection } from "@/components/client/landing/TechMindsSection";
import { JoinSection } from "@/components/client/landing/JoinSection";

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

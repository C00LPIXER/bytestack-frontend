import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import reading_animation from "@/assets/animations/blog-reading-animation.json";

export const KnowledgeSection = () => (
  <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="md:flex justify-center hidden">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <Lottie animationData={reading_animation} loop={true} />
        </div>
      </div>
      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Share Knowledge, Earn Bits!
        </h1>
        <p className="text-base sm:text-lg leading-relaxed">
          Write blogs, share your expertise, and connect with a vibrant
          community of developers and tech enthusiasts. Earn{" "}
          <span className="font-medium">Bits</span> for premium content, get
          recognized for your insights, and unlock exclusive blogs that help you
          level up.
        </p>
        <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3 ">
          <Button
            className="h-12 border-2 border-gray-400 sm:px-5 sm:py-2 text-sm sm:text-base"
            variant="outline"
          >
            Start Writing
          </Button>
          <Button className="h-12 border-2 border-gray-400 dark:border-gray-500 sm:px-5 sm:py-2 text-sm sm:text-base">
            Get Premium Blogs
          </Button>
        </div>
      </div>
    </div>
  </section>
);

import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import header_animation from "@/assets/animations/header-animation.json";

export const HeroSection = () => (
  <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-24 dark:text-white bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-[#1e1e1e]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="text-center md:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          From Bits to Epic Bytes!
        </h1>
        <p className="text-base sm:text-lg leading-relaxed">
          Welcome to ByteStack, the ultimate hub for all things tech! Dive into
          cutting-edge AI research, cybersecurity, software development,
          hardware hacks, and more. Spark real-time discussions, level up your
          skills, and connect with a vibrant community.
        </p>
        <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3 ">
          <Button className="h-12 border-2 border-gray-400 sm:px-5 sm:py-2 text-sm sm:text-base">
            Get Started Free
          </Button>
          <Button
            // size="lg"
            variant="outline"
            className="h-12 border-2 border-gray-400 dark:border-gray-500 sm:px-5 sm:py-2 text-sm sm:text-base"
          >
            Subscribe - $15/Month
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <Lottie animationData={header_animation} loop={true} />
        </div>
      </div>
    </div>
  </section>
);

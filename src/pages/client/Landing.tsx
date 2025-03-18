import { Shield, Brain, Code } from "lucide-react";
import Navbar from "@/components/client/layouts/Navbar";
import Footer from "@/components/client/layouts/Footer";
import Lottie from "lottie-react";
import header_animation from "@/assets/animations/header-animation.json";
import reading_animation from "@/assets/animations/blog-reading-animation.json";
import { TechCard } from "@/components/client/cards/TechCard";

export default function LandingPage() {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar />
      <div className="flex flex-col dark:bg-black pt-12">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-24 dark:text-white bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-[#1e1e1e]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
                From Bits to Epic Bytes!
              </h1>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Welcome to ByteStack, the ultimate hub for all things tech! Dive
                into cutting-edge AI research, cybersecurity, software
                development, hardware hacks, and more. Spark real-time
                discussions, level up your skills, and connect with a vibrant
                community.
              </p>
              <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
                <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-900 dark:hover:bg-gray-200">
                  Get Started Free
                </button>
                <button className="border border-black text-black dark:border-white dark:text-white px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 dark:hover:bg-gray-900">
                  Subscribe - $15/Month
                </button>
              </div>
            </div>

            {/* Right Animation/Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Lottie animationData={header_animation} loop={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Share Knowledge Section */}
        <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content - Animation */}
            <div className="md:flex justify-center hidden">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <Lottie animationData={reading_animation} loop={true} />
              </div>
            </div>

            {/* Right Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
                Share Knowledge, Earn Bits!
              </h1>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Write blogs, share your expertise, and connect with a vibrant
                community of developers and tech enthusiasts. Earn{" "}
                <span className="font-medium">Bits</span> for premium content,
                get recognized for your insights, and unlock exclusive blogs
                that help you level up.
              </p>
              <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
                <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-900 dark:hover:bg-gray-200">
                  Start Writing
                </button>
                <button className="border border-black text-black dark:border-white dark:text-white px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  Get Premium Blogs
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Minds Section */}
        <section className="py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-[#1e1e1e]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              ByteStack Welcomes All Tech Minds
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <TechCard
                icon={<Shield className="w-8 h-8 mr-3" />}
                title="Cybersecurity Experts"
                description="Stay updated on the latest cyber threats, ethical hacking techniques, and advanced security measures to protect digital assets."
              />
              <TechCard
                icon={<Brain className="w-8 h-8 mr-3" />}
                title="AI Innovators"
                description="Dive deep into machine learning, neural networks, and AI-driven applications shaping the future of technology."
              />
              <TechCard
                icon={<Code className="w-8 h-8 mr-3" />}
                title="Developers"
                description="Master programming languages, frameworks, and software development best practices to build cutting-edge applications."
              />
            </div>
          </div>
        </section>

        {/* Join Revolution Section */}
        <section className="py-12 pb-24 px-6 md:px-12 lg:px-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join the ByteStack Tech Revolution
            </h2>
            <p className="text-lg mb-8">
              Ready to take your tech passion to the next level? Sign up for
              free, explore blogs on cybersecurity, AI, and more, and see why
              tech lovers are joining ByteStack.
            </p>
            <div className="flex flex-row flex-wrap justify-center gap-3">
              <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-800 dark:hover:bg-gray-200">
                Sign Up Now
              </button>
              <button className="border border-black text-black dark:border-white dark:text-white px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                Learn More About Bits
              </button>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

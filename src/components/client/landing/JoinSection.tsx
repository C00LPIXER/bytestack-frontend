import { Button } from "@/components/ui/button";

export const JoinSection = () => (
  <section className="py-12 pb-24 px-6 md:px-12 lg:px-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <h2 className="text-3xl font-bold">Join the ByteStack Tech Revolution</h2>
      <p className="text-lg">
        Ready to take your tech passion to the next level? Sign up for free,
        explore blogs on cybersecurity, AI, and more, and see why tech lovers
        are joining ByteStack.
      </p>
      <div className="flex flex-row flex-wrap justify-center gap-3 ">
        <Button className="h-12 border-2 border-gray-400 sm:px-5 sm:py-2 text-sm sm:text-base">
          Sign Up Now
        </Button>
        <Button
          className="h-12 border-2 border-gray-400 dark:border-gray-500 sm:px-5 sm:py-2 text-sm sm:text-base"
          variant="outline"
        >
          Learn More About Bits
        </Button>
      </div>
    </div>
  </section>
);

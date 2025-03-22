import { Footer } from "@/components/client/layouts/Footer";
import { Navbar } from "@/components/client/layouts/Navbar";
import Lottie from "lottie-react";
import notfound_light from "@/assets/animations/notfound-light.json";
import notfound_dark from "@/assets/animations/notfound-dark.json";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NotFount = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center dark:bg-black dark:text-white">
        <div className="flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="block dark:hidden">
                <Lottie animationData={notfound_dark} loop={true} />
              </div>
              <div className="hidden dark:block">
                <Lottie animationData={notfound_light} loop={true} />
              </div>
            </div>
            <div className="text-center mt-4">
              <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Oops! The page you're looking for doesn't exist.
              </p>
              <Button 
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

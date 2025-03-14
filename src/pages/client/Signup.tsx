import { useState } from "react";
import { Eye, EyeOff, Github } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/client/layouts/Navbar";
import Logo from "@/components/shared/Logo";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-12 dark:bg-black dark:text-white">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Join ByteStack —<br />
            From Bits to Epic Bytes!
          </h1>
          <p className="text-base mb-6">
            Become part of the ultimate tech community! Sign up to explore
            premium blogs on cybersecurity, AI, software, hardware, and beyond.
            Share your expertise, engage in real-time discussions, and start
            earning Bits for your contributions. With a 7-day free trial,
            there's no better time to stack your tech wisdom. Let's get started!
          </p>
          <p className="text-sm italic mb-4">
            Enjoy a 7-day free trial with full access—subscribe later for
            $15/month or $120/year!
          </p>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Log In {" "}
            </Link>
            to continue!
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              {/* <div> */}
              <Logo width={"150px"} height={"35px"} />
              {/* </div> */}
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Create Your ByteStack Account
              </p>
            </div>

            <form className="space-y-4 w-full">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full border rounded-md p-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full border rounded-md p-2 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Create Account
              </Button>

              <div className="flex gap-4 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

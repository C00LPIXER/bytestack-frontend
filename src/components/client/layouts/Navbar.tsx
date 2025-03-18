import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black text-white shadow-lg z-50 backdrop-blur-md drop-shadow-[0_10px_50px_rgba(255,255,255,0.2)]"
    >
      <div className="flex items-center gap-2">
        <div className="w-40">
          <Link to="/">
            <img src="/icon.svg" alt="Logo" />
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/blogs" className="text-white hover:text-gray-300">
          Blogs
        </Link>
        <Link to="/topics" className="text-white hover:text-gray-300">
          Topics
        </Link>
        <Link to="/login" className="text-white hover:text-gray-300">
          Login
        </Link>
        <Link to="/signup" className="text-white hover:text-gray-300">
          Sign Up
        </Link>
        {mounted && (
          <button
            onClick={toggleTheme}
            className="text-white hover:text-gray-300 p-2 rounded-md"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-4 top-16 w-48 bg-black text-white shadow-lg rounded-md"
              >
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link to="/blogs" onClick={() => setMobileMenuOpen(false)}>
                      Blogs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/topics" onClick={() => setMobileMenuOpen(false)}>
                      Topics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Sign in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </div>
    </motion.nav>
  );
};

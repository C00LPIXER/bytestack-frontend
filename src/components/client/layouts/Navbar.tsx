import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

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

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white drop-shadow-[0_5px_50px_rgba(255,255,255,0.2)]">
      <div className="flex items-center gap-2">
        <div className="w-40">
          <img src="/icon.svg" alt="Logo" />
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Link to="/blogs" className="text-white hover:text-gray-300">
          Blogs
        </Link>
        <Link to="/topics" className="text-white hover:text-gray-300">
          Topics
        </Link>
        <Link to="/login" className="text-white hover:text-gray-300">
          Sign in
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
        <Link to="/signup">
          <Button className="bg-white text-black hover:bg-gray-200 rounded-md">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-black text-white">
            <DropdownMenuItem>
              <Link to="/blogs">Blogs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/topics">Topics</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/login">Sign in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/signup">Sign Up</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;

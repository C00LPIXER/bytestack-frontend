import { Navbar } from "@/components/client/layouts/Navbar";
import { HeroSection } from "@/components/client/landing/HeroSection";
import { BlogList } from "@/components/client/blogs/BlogList";
import { Sidebar } from "@/components/client/layouts/Sidebar";
import { Footer } from "@/components/client/layouts/Footer";
import { BlogPostData } from "@/types/blog";

const blogPosts: BlogPostData[] = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      role: "Senior WebAssembly Developer",
      avatar: "",
    },
    title: "Understanding WebAssembly: A Deep Dive",
    description:
      "Explore the fundamentals of WebAssembly and how it's transforming web performance...",
    publishedDate: "May 15, 2023",
    readTime: "8 min read",
    likes: 128,
    comments: 24,
    bookmarks: 350,
  },
  {
    id: "2",
    author: {
      name: "Alex Rivera",
      role: "Frontend Developer",
      avatar: "",
    },
    title: "Microservices Architecture: Best Practices",
    description:
      "Learn how to design and implement scalable microservice architectures...",
    publishedDate: "May 10, 2023",
    readTime: "12 min read",
    likes: 95,
    comments: 17,
    bookmarks: 210,
  },
  {
    id: "3",
    author: {
      name: "Sarah Kim",
      role: "Security Researcher",
      avatar: "",
    },
    title: "Understanding Cyber Sec: A Deep Dive",
    description:
      "Explore the fundamentals of security and how it's revolutionizing web performance...",
    publishedDate: "May 8, 2023",
    readTime: "10 min read",
    likes: 76,
    comments: 34,
    bookmarks: 183,
  },
  {
    id: "4",
    author: {
      name: "Kevin Evans",
      role: "Full Stack Developer",
      avatar: "",
    },
    title: "Mastering React Server Components",
    description:
      "Learn how to leverage the power of React Server Components...",
    publishedDate: "May 5, 2023",
    readTime: "15 min read",
    likes: 145,
    comments: 32,
    bookmarks: 267,
  },
];

export const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <div className="flex-1 py-6 px-6 md:px-12 lg:pb-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <BlogList
              posts={blogPosts}
              onTabChange={(tab) => console.log(`Tab changed to: ${tab}`)}
              onSearch={(query) => console.log(`Search query: ${query}`)}
            />
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

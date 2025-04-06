import { Navbar } from "@/components/client/layouts/Navbar";
import { Sidebar } from "@/components/client/layouts/Sidebar";
import { Footer } from "@/components/client/layouts/Footer";
import { BlogPostData } from "@/types/blog";
import { BloggerData, TopicData, FeedType } from "@/types/feed";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { BloggersResponse, getBloggers } from "@/service/client/api/clientApi";
import { BlogCard } from "@/components/client/blogs/BlogCard";
import { BloggerCard } from "@/components/client/cards/BloggerCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { Pagination } from "@/components/shared/Pagination";
import { useDebounce } from "@/hooks/useDebounce";

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
    author: { name: "John Doe", role: "Frontend Developer", avatar: "" },
    title: "React Best Practices",
    description: "Tips for optimizing your React applications...",
    publishedDate: "Apr 10, 2023",
    readTime: "6 min read",
    likes: 95,
    comments: 15,
    bookmarks: 200,
  },
];

const topics: TopicData[] = [
  { name: "Web3.0", articles: 234, authors: 45 },
  { name: "Cloud Native", articles: 189, authors: 32 },
  { name: "AI/ML", articles: 312, authors: 56 },
  { name: "DevOps", articles: 150, authors: 25 },
  { name: "Frontend", articles: 200, authors: 40 },
];

export const FeedsPage = () => {
  const [activeTab, setActiveTab] = useState<FeedType>("blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [bloggers, setBloggers] = useState<BloggerData[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const bloggersMutation = useMutation<
    BloggersResponse,
    Error,
    { query: string; page: number; pageSize: number }
  >({
    mutationFn: ({ query, page, pageSize }) =>
      getBloggers(query, page, pageSize),
    onSuccess: (response) => {
      setBloggers(response.data);
    },
  });

  const handleTabChange = (tab: FeedType) => {
    setActiveTab(tab);
    setPage(1);
    setSearchQuery("");
    if (tab === "bloggers") {
      bloggersMutation.mutate({ query: "", page, pageSize });
    }
  };

  useEffect(() => {
    if (activeTab === "bloggers") {
      setPage(1);
      bloggersMutation.mutate({
        query: debouncedSearchQuery,
        page: 1,
        pageSize,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const getDisplayedItems = () => {
    switch (activeTab) {
      case "blogs":
        return blogPosts;
      case "bloggers":
        return bloggers;
      case "topics":
        return topics;
      default:
        return [];
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (activeTab === "bloggers") {
      bloggersMutation.mutate({ query: searchQuery, page: newPage, pageSize });
    }
  };

  const totalItems = bloggersMutation.data?.meta?.total || 0;
  const displayedItems = getDisplayedItems();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-28 px-6 md:px-12 lg:pb-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 px-4 sm:px-6 md:px-0">
            <SearchBar
              placeholder="Search blogs, bloggers, or topics..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-4 w-full border-b pb-3 border-gray-200 dark:border-gray-700"
              tabs={[
                { label: "Blogs", value: "blogs" },
                { label: "Bloggers", value: "bloggers" },
                { label: "Topics", value: "topics" },
              ]}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            <div className="space-y-6">
              {displayedItems.length > 0 ? (
                displayedItems.map((item) => {
                  if ("title" in item) {
                    return (
                      <BlogCard key={item.id} {...(item as BlogPostData)} />
                    );
                  } else if ("name" in item && "_id" in item) {
                    return (
                      <BloggerCard
                        key={item._id}
                        {...(item as BloggerData)}
                        // onFollow={() => console.log("object")}
                      />
                    );
                  } else if ("articles" in item) {
                    return (
                      <div
                        key={item.name}
                        className="border-b border-gray-200 dark:border-gray-700 py-4"
                      >
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.articles} articles • {item.authors} authors
                        </p>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Nothing found
                </p>
              )}
              {activeTab === "bloggers" && (
                <Pagination
                  page={page}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

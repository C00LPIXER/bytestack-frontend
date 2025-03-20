import { JSX, useState } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { BlogCard } from "./BlogCard";
import { Button } from "@/components/ui/button";

interface Tab {
  label: string;
  value: string;
  icon?: JSX.Element;
}

interface BlogPostData {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  likes: number;
  comments: number;
  bookmarks: number;
}

interface BlogListProps {
  posts: BlogPostData[];
  tabs?: Tab[];
  onTabChange?: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export const BlogList = ({
  posts,
  tabs = [
    { label: "Free", value: "free" },
    { label: "Premium", value: "premium" },
    { label: "Popular", value: "popular" },
    { label: "My Tech Stack", value: "mystack" },
  ],
  onTabChange,
  onSearch,
}: BlogListProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "free");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="md:col-span-2 px-4 sm:px-6 md:px-0">
      <SearchBar
        placeholder="Search articles, topics, or authors..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 w-full"
      />
      {tabs.length > 0 && (
        <div className="flex gap-1 sm:gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant="ghost"
              className={`pb-1 sm:pb-2 px-2 sm:px-3 text-[10px] sm:text-xs md:text-sm whitespace-nowrap ${
                activeTab === tab.value
                  ? "border-b-2 border-black dark:border-white font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
              onClick={() => handleTabChange(tab.value)}
            >
              {tab.icon && <span className="mr-1 text-[10px] sm:text-xs md:text-sm">{tab.icon}</span>}
              {tab.label}
            </Button>
          ))}
        </div>
      )}
      <div className="space-y-6">
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
        <div className="text-center pt-4">
          <Button className="w-full  bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-sm">
            See all Blogs
          </Button>
        </div>
      </div>
    </div>
  );
};
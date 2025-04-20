import { UserCard } from "../cards/UserCard";
import { Button } from "@/components/ui/button";

interface FeaturedBlogger {
  name: string;
  role?: string;
  avatar: string;
}

interface TrendingTopic {
  name: string;
  articles: number;
  authors: number;
}

const featuredBloggers: FeaturedBlogger[] = [
  { name: "David Kim", avatar: "https://placehold.co/200x200" },
  { name: "Jessica Chen", avatar: "https://placehold.co/200x200" },
  { name: "Michael Lee", role: "DevOps Engineer", avatar: "https://placehold.co/200x200" },
];

const trendingTopics: TrendingTopic[] = [
  { name: "Web3.0", articles: 234, authors: 45 },
  { name: "Cloud Native", articles: 189, authors: 32 },
  { name: "AI/ML", articles: 312, authors: 56 },
];

const topicsToFollow: string[] = [
  "Programming",
  "AI & Machine Learning",
  "Mobile Development",
  "Cloud Computing",
];

export const Sidebar = () => {
  return (
    <div className="space-y-8 md:col-span-1">
      <div>
        <h3 className="font-bold mb-4">Featured Bloggers</h3>
        <div className="space-y-3">
          {featuredBloggers.map((blogger, index) => (
            <UserCard
              key={index}
              name={blogger.name}
              role={blogger.role}
              avatar={blogger.avatar}
              showFollowButton={false}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-4">Trending Topics</h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index}>
              <p className="text-sm font-medium">{topic.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {topic.articles} articles • {topic.authors} authors
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Topics to Follow</h3>
          <Button variant="link" className="text-xs text-gray-500 dark:text-gray-400 p-0">
            Explore Topics
          </Button>
        </div>
        <div className="space-y-3">
          {topicsToFollow.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-sm">{topic}</p>
              <Button variant="link" className="text-xs text-blue-600 dark:text-blue-400 p-0">
                + Follow
              </Button>
            </div>
          ))}
          <div className="text-center mt-2">
            <Button variant="link" className="text-xs text-gray-500 dark:text-gray-400 p-0">
              See More Topics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
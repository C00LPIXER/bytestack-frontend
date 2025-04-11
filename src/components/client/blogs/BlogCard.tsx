import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  author?: {
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
  onLike?: () => void;
  onComment?: () => void;
  onBookmark?: () => void;
  className?: string;
}

export const BlogCard = ({
  author,
  title,
  description,
  publishedDate,
  readTime,
  likes,
  comments,
  bookmarks,
  onLike,
  onComment,
  onBookmark,
  className,
}: BlogCardProps) => {
  return (
    <div
      className={`border-b border-gray-200 dark:border-gray-700 py-2 hover: ${className}`}
    >
      {author && (
        <div className="flex items-center mb-4">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {author.role}
            </p>
          </div>
        </div>
      )}
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Published: {publishedDate} • {readTime}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className="text-gray-500 dark:text-gray-400 text-xs hover:text-red-500"
          >
            <Heart className="h-4 w-4 mr-1" />
            <span>{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onComment}
            className="text-gray-500 dark:text-gray-400 text-xs hover:text-blue-500"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            className="text-gray-500 dark:text-gray-400 text-xs hover:text-yellow-500"
          >
            <Bookmark className="h-4 w-4 mr-1" />
            <span>{bookmarks}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

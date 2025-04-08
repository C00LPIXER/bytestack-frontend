import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react"; // Added icons for stats
import { Link } from "react-router-dom";
import Follows from "../profile/Follows";

interface BloggerCardProps {
  _id: string;
  name: string;
  headline?: string;
  avatar: string;
  bio?: string;
  slug: string;
  totalPosts?: number;
  followers?: number;
  onFollow?: () => void;
  className?: string;
  isFollower: boolean;
  isFollowed: boolean;
  onFollowChange?: (isNowFollowed: boolean) => void;
}

export const BloggerCard = ({
  _id,
  name,
  headline,
  avatar,
  bio,
  slug,
  totalPosts = 0,
  followers = 0,
  onFollow,
  className,
  isFollowed,
  isFollower,
  onFollowChange,
}: BloggerCardProps) => {
  return (
    <div
      className={`border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          {headline && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {headline}
            </p>
          )}
        </div>
        {onFollow && (
          <Follows
            isFollower={isFollower}
            isFollowing={isFollowed}
            id={_id}
            size="sm"
            className="ml-2 text-xs whitespace-nowrap"
            onFollowChange={onFollowChange}
          />
        )}
      </div>
      {bio && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {bio}
        </p>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            {totalPosts} Posts
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {followers} Followers
          </span>
        </div>
        <Link to={`/u/${slug}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-blue-600 dark:text-blue-400"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

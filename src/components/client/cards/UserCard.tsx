import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";

interface UserCardProps {
  name: string;
  role?: string;
  avatar?: string;
  posts?: number;
  followers?: string;
  onFollow?: () => void;
  showFollowButton?: boolean;
  className?: string;
}

export const UserCard = ({
  name,
  role,
  avatar,
  posts,
  followers,
  onFollow,
  showFollowButton = true,
  className,
}: UserCardProps) => {
  return (
    <div className={`flex justify-between ${className}`}>
      <div className="flex flex-1 min-w-0">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex justify-start items-center mx-3">
          <div className="text-left min-w-0">
            <h3 className="font-semibold text-base truncate">{name}</h3>
            {role && (
              <p className="text-xs text-gray-500 pb-2 dark:text-gray-400 truncate">{role}</p>
            )}
            {(posts || followers) && (
              <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400 space-x-2 mt-1">
                {posts && (
                  <span className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {posts} blogs
                  </span>
                )}
                {followers && (
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {followers} followers
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showFollowButton && (
        <Button
          onClick={onFollow}
          className="max-h-7 text-sm px-3 py-1 flex-shrink-0"
        >
          Follow
        </Button>
      )}
    </div>
  );
};
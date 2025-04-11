import { Button } from "@/components/ui/button";
import { useFollowUser, useUnfollowUser } from "@/hooks/useFollow";
import { useState } from "react";

interface IFollows {
  id: string;
  size: "sm" | "icon" | "lg";
  className?: string;
  isFollowing: boolean;
  isFollower: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const Follows = ({
  id,
  size,
  isFollowing,
  isFollower,
  className,
  onFollowChange,
  variant = "default",
}: IFollows) => {
  const [isFollow, setFollow] = useState(isFollowing);
  const { mutate: followUser, isPending: isFollowingPending } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowingPending } =
    useUnfollowUser();

  const handleClick = () => {
    if (isFollow) {
      unfollowUser(id, {
        onSuccess: () => {
          setFollow(false);
          onFollowChange?.(false);
        },
      });
    } else {
      followUser(id, {
        onSuccess: () => {
          setFollow(true);
          onFollowChange?.(true);
        },
      });
    }
  };

  const getButtonLabel = () => {
    if (isFollow) return "Unfollow";
    if (!isFollow && isFollower) return "Follow Back";
    return "Follow";
  };

  return (
    <Button
      size={size}
      className={className}
      onClick={handleClick}
      variant={variant}
      disabled={isFollowingPending || isUnfollowingPending}
    >
      {getButtonLabel()}
    </Button>
  );
};

export default Follows;

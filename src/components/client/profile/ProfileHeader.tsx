import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import {
  Globe,
  Github,
  Twitter,
  Settings,
  Flag,
  UserMinus,
  Bell,
  BellOff,
  MoreVerticalIcon,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileHeaderSkeleton } from "../skeletons/ProfileHeaderSkeleton";
import Follows from "./Follows";
import { formatNumber } from "@/utils/FormatNumber";
import { FollowsModal } from "./FollowsModal";
import { useState } from "react";

interface IProfileHeader {
  profile: User | null;
  followers: number;
  followings: number;
  isCurrentUser: boolean;
  isFollowing: boolean;
  isFollower: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

export const ProfileHeader = ({
  profile,
  isCurrentUser,
  followers,
  followings,
  onFollowChange,
  isFollowing,
  isFollower,
}: IProfileHeader) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState<"followings" | "followers">("followings");

  const getLinkIcon = (url: string) => {
    if (url.includes("github.com")) {
      return <Github className="h-4 w-4" />;
    } else if (url.includes("twitter.com")) {
      return <Twitter className="h-4 w-4" />;
    } else if (url.includes("linkedin.com")) {
      return <Linkedin className="h-4 w-4" />;
    } else {
      return <Globe className="h-4 w-4" />;
    }
  };

  const handleTabOpen = (tab: "followings" | "followers") => {
    setTab(tab);
    setIsModalOpen(true);
  };

  if (!profile) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
      <FollowsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={profile._id}
        initialTab={tab}
      />
      <div className="flex flex-row items-start gap-8 mb-3">
        {/* Avatar - left-aligned on all devices */}
        <div className="flex justify-start">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white dark:border-gray-800 shadow-md">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-3xl font-semibold bg-primary/10">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          <div className="flex flex-row items-center gap-4 mb-1 justify-between">
            <h1 className="sm:text-2xl font-bold text-gray-900 dark:text-white text-left">
              {profile.name}
            </h1>

            <div className="flex justify-start gap-2">
              {isCurrentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="h-4 w-4 mr-2" />
                      Notification Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <BellOff className="h-4 w-4 mr-2" />
                      Mute Comments
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <div className="hidden md:flex">
                    <Follows
                      isFollowing={isFollowing}
                      id={profile._id}
                      className="w-24"
                      size="sm"
                      isFollower={isFollower}
                      onFollowChange={onFollowChange}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-[34px]">
                        <MoreVerticalIcon />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div className="md:hidden">
                        <DropdownMenuItem>
                          <Follows
                            isFollowing={isFollowing}
                            id={profile._id}
                            className="w-full"
                            size="sm"
                            variant="outline"
                            isFollower={isFollower}
                            onFollowChange={onFollowChange}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </div>

                      <DropdownMenuItem>
                        <Flag className="h-4 w-4 mr-2" />
                        Report User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Block User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {/* Stats - followers, following, posts in a row */}
          <div className="flex justify-start gap-6 mb-4">
            <div
              className="flex items-center gap-2 text-left cursor-pointer"
              onClick={() => handleTabOpen("followings")}
            >
              <span className="block font-bold text-gray-900 dark:text-white md:text-lg text-sm">
                {formatNumber(followings)}
              </span>
              <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">
                Following
              </span>
            </div>
            <div
              className="flex items-center gap-2 text-left cursor-pointer"
              onClick={() => handleTabOpen("followers")}
            >
              <span className="block font-bold text-gray-900 dark:text-white md:text-lg text-sm">
                {formatNumber(followers)}
              </span>
              <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">
                Followers
              </span>
            </div>
            <div className="flex items-center gap-2 text-left">
              <span className="block font-bold text-gray-900 dark:text-white md:text-lg text-sm">
                {formatNumber(200000)}
              </span>
              <span className="md:text-sm text-xs text-gray-500 dark:text-gray-400">
                Posts
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Headline */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-left">
          {profile.headline}
        </p>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-left">
          {profile.bio}
        </p>

        {/* Links and Join Date */}
        <div className="flex flex-wrap justify-start gap-2 text-xs text-gray-500 dark:text-gray-400">
          {profile.links &&
            profile.links.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/80 px-2 py-1 rounded-md"
              >
                {getLinkIcon(link)}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link.replace(/https?:\/\/(www\.)?/, "").split("/")[0]}
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

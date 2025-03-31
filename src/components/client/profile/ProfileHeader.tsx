import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import {
  Globe,
  Calendar,
  UserPlus,
  Github,
  Twitter,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

interface IProfileHeader {
  profile: User;
  isCurrentUser: boolean;
}

export const ProfileHeader = ({ profile, isCurrentUser }: IProfileHeader) => {
  const getLinkIcon = (url: string) => {
    if (url.includes("github.com")) {
      return <Github className="h-4 w-4" />;
    } else if (url.includes("twitter.com")) {
      return <Twitter className="h-4 w-4" />;
    } else {
      return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="dark:bg-transparent p-6 mb-6 border-b-2">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-400 shadow">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback className="text-3xl font-semibold">
            {profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {profile.headline}
              </p>
            </div>

            {isCurrentUser ? (
              <Link to="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            ) : (
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Follow
              </Button>
            )}
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-300">{profile.bio}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
            {profile.links &&
              profile.links.map((link, index) => (
                <div key={index} className="flex items-center gap-1">
                  {getLinkIcon(link)}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.replace(/https?:\/\//, "")}
                  </a>
                </div>
              ))}

            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                Joined{" "}
                {profile.createdAt &&
                  new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex items-center mr-6">
          <span className="font-bold text-gray-900 dark:text-white">180</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">
            Following
          </span>
        </div>
        <div className="flex items-center mr-6">
          <span className="font-bold text-gray-900 dark:text-white">400</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">
            Followers
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-900 dark:text-white">200</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">Blogs</span>
        </div>
      </div>
    </div>
  );
};

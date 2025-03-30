import { Footer } from "@/components/client/layouts/Footer";
import { Navbar } from "@/components/client/layouts/Navbar";
import { ProfileHeader } from "@/components/client/profile/ProfileHeader";
// import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";

export const user: User = {
  _id: "1234567890abcdef",
  name: "John Doe",
  email: "johndoe@example.com",
  avatar: "https://example.com/avatar.jpg",
  headline: "Software Engineer",
  bio: "Passionate about building scalable web applications.",
  links: ["https://github.com/johndoe", "https://linkedin.com/in/johndoe"],
  isBlogger: false,
  isSubscribed: true,
  subType: "monthly",
  subEndDate: new Date("2024-12-31"),
  trialEndDate: null,
  followedTopics: ["JavaScript", "TypeScript", "React"],
  techInterests: ["Web Development", "Cloud Computing", "AI"],
  searchHistory: ["best TypeScript tutorials", "React state management"],
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-10-01"),
  lastLogin: new Date("2023-10-15"),
  isBanned: false,
};

export const Profile = () => {
  // const { user, isAuthenticated, logout } = useAuth();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-1 pt-20 px-6 md:px-12 lg:pb-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader profile={user} isCurrentUser={false} />
          <ProfileHeader profile={user} isCurrentUser={true} />
        </div>
      </div>
      <Footer />
    </>
  );
};

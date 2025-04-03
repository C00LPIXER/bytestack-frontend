import { Footer } from "@/components/client/layouts/Footer";
import { Navbar } from "@/components/client/layouts/Navbar";
import { ProfileHeader } from "@/components/client/profile/ProfileHeader";
import { useAuth } from "@/hooks/useAuth";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-1 pt-20 px-6 md:px-12 lg:pb-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
        <div className="max-w-7xl mx-auto">
          {user && <ProfileHeader profile={user} isCurrentUser={true} />}
          {user && <ProfileHeader profile={user} isCurrentUser={false} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

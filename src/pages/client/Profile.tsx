import { Footer } from "@/components/client/layouts/Footer";
import { Navbar } from "@/components/client/layouts/Navbar";
import { ProfileHeader } from "@/components/client/profile/ProfileHeader";
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/service/client/api/clientApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const { user } = useAuth();
  const { slug } = useParams();

  const profileMutation = useMutation({
    mutationFn: getProfile,
    onSuccess: (response) => {
      setProfile(response.user);
    },
  });

  useEffect(() => {
    if (slug) {
      profileMutation.mutate(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-1 pt-20 px-6 md:px-12 lg:pb-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
        <div className="max-w-7xl mx-auto">
          {user && (
            <ProfileHeader
              profile={profile}
              isCurrentUser={profile?.slug === user.slug}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

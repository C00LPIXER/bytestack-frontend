import { Footer } from "@/components/client/layouts/Footer";
import { Navbar } from "@/components/client/layouts/Navbar";
import { ProfileHeader } from "@/components/client/profile/ProfileHeader";
import { useAuth } from "@/hooks/useAuth";
import { getProfile, ProfileResponse } from "@/service/client/api/clientApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { user } = useAuth();
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery<ProfileResponse>({
    queryKey: ["profile", slug],
    queryFn: () => getProfile(slug!),
    enabled: !!slug,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const handleFollowChange = (newIsFollowing: boolean) => {
    queryClient.setQueryData(
      ["profile", slug],
      (oldData: ProfileResponse | undefined) => {
        if (oldData) {
          return {
            ...oldData,
            followers: newIsFollowing
              ? oldData.followers + 1
              : oldData.followers - 1,
            isFollowing: newIsFollowing,
          };
        }
        return oldData;
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-1 pt-24 px-6 md:px-12 lg:pb-24 dark:text-white bg-gradient-to-b from-gray-100 to-white dark:from-[#1e1e1e] dark:to-black">
        <div className="max-w-7xl mx-auto">
          {user && data && (
            <ProfileHeader
              profile={data?.user}
              followers={data?.followers}
              followings={data?.following}
              isCurrentUser={data?.user.slug === user.slug}
              isFollowing={data?.isFollowing}
              isFollower={data?.isFollower}
              onFollowChange={handleFollowChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

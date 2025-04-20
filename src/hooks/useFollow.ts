import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow, unfollow } from "@/service/api/clientApi";
import { ProfileResponse } from "@/service/api/clientApi";

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => follow(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData(
        ["profile", id],
        (old: ProfileResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            isFollowing: true,
            followers: old.followers + 1,
          };
        }
      );
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unfollow(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData(
        ["profile", id],
        (old: ProfileResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            isFollowing: false,
            followers: old.followers - 1,
          };
        }
      );
    },
  });
};

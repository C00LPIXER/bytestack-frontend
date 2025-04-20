import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser, clearUser } from "@/redux/slices/authSlice";
import { fetchUser, logout as logoutApi } from "@/service/api/clientApi";

export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userData = await fetchUser();
      if (userData) {
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
      return userData;
    },
    enabled: !!user, // Only fetch if user is already in Redux
    retry: false, 
    refetchOnMount: false, // Fetch on mount if enabled
    refetchOnWindowFocus: false, //automatic refetch when switching tabs
    refetchInterval: user ? 5 * 60 * 1000 : false, // 5 minutes if logged in
    staleTime: 0,
  });

  const isAuthenticated = !!user;

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(clearUser());
      queryClient.removeQueries({ queryKey: ["user"] });
      window.location.href = "/login";
    },
    onError: (error) => console.error("Logout failed:", error),
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout: logoutMutation.mutate,
    refetch,
  };
};

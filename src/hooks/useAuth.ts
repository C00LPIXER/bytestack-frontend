import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser, clearUser } from "@/redux/slices/authSlice";
import { fetchUser, logout as logoutApi } from "@/service/client/api/authApi";
import { useEffect } from "react";

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
    initialData: user,
    retry: false,
    enabled: !!user, // Only fetch if user is present in Redux
  });

  // Ensure the query runs after rehydration
  useEffect(() => {
    if (!user && !isLoading) {
      refetch(); // Refetch user data if not present in Redux
    }
  }, [user, isLoading, refetch]);

  const isAuthenticated = !!user;

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      dispatch(clearUser());
      queryClient.setQueryData(["user"], null);
      localStorage.removeItem("persist:root");
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout: logoutMutation.mutate,
  };
};
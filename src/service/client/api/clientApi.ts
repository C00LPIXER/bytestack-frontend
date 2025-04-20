import { clientAxiosInstance } from "@/api/clientAxios";
import { clearUser } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import { BlogPostData } from "@/types/blog";
import { ErrorResponse } from "@/types/error";
import { BloggerData } from "@/types/feed";
import { User } from "@/types/user";
import { toast } from "sonner";
interface ApiResponse {
  message: string;
  success: boolean;
}

interface SigninResponse extends ApiResponse {
  user: User;
}

export interface ProfileResponse extends ApiResponse {
  user: User;
  followers: number;
  following: number;
  isFollowing: boolean;
  isFollower: boolean;
}
export interface BloggersResponse extends ApiResponse {
  success: boolean;
  data: BloggerData[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  message: string;
}

export interface GetFollows extends ApiResponse {
  followersCount: number;
  isFollower: boolean;
  isFollowing: true;
  _id: string;
  name: string;
  avatar: string;
  slug: string;
}

export const sendOtp = async (
  email: string,
  type: string
): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post("/auth/send-otp", {
    email,
    type,
  });
  return response.data;
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  otp: string;
}): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post("/auth/signup", data);
  return response.data;
};

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post("/auth/forgot-password", {
    email,
    type: "forgot-password",
  });
  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post("/auth/reset-password", data);
  return response.data;
};

export const signin = async (data: {
  email: string;
  password: string;
}): Promise<SigninResponse> => {
  const response = await clientAxiosInstance.post("/auth/login", data);
  return response.data;
};

export const googleOAuthLogin = async (
  code: string
): Promise<SigninResponse> => {
  const response = await clientAxiosInstance.post<SigninResponse>(
    "/auth/google",
    { code }
  );
  return response.data;
};

export const gitHubOAuthLogin = async (
  code: string
): Promise<SigninResponse> => {
  const response = await clientAxiosInstance.post<SigninResponse>(
    "/auth/github",
    { code }
  );
  return response.data;
};

export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await clientAxiosInstance.get("/profile");
    return response.data.user;
  } catch (error) {
    if (
      (error as ErrorResponse).response?.status === 401 ||
      (error as ErrorResponse).response?.status === 403
    ) {
      toast.error((error as ErrorResponse).message);
      store.dispatch(clearUser());
      window.location.href = "/login";
    }
  }
  return null;
};

export const logout = async (): Promise<void> => {
  await clientAxiosInstance.post("/auth/logout");
};

export const updateProfile = async (
  data: Partial<User>
): Promise<ProfileResponse> => {
  const response = await clientAxiosInstance.put<ProfileResponse>(
    "/profile",
    data
  );
  return response.data;
};

export const getProfile = async (slug: string): Promise<ProfileResponse> => {
  const response = await clientAxiosInstance.get<ProfileResponse>(
    `/profile/u/${slug}`
  );
  return response.data;
};

export const getBloggers = async (
  query: string,
  page: number,
  pageSize: number
): Promise<BloggersResponse> => {
  const response = await clientAxiosInstance.get<BloggersResponse>(
    `/profile/bloggers?page=${page}&search=${query}&limit=${pageSize}`
  );
  return response.data;
};

export const follow = async (id: string): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post<ApiResponse>(
    `/profile/${id}/follow`
  );
  return response.data;
};

export const unfollow = async (id: string): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post<ApiResponse>(
    `/profile/${id}/unfollow`
  );
  return response.data;
};

export const getFollows = async (
  type: string,
  query: string,
  page: number,
  pageSize: number
): Promise<GetFollows[]> => {
  const response = await clientAxiosInstance.get<GetFollows[]>(
    `/profile/relation/${type}?page=${page}&search=${query}&limit=${pageSize}`
  );

  return response.data;
};

export const newBlog = async (blog: BlogPostData): Promise<BlogPostData> => {
  const response = await clientAxiosInstance.post("/blog", blog);
  return response.data;
};

export const getBlogBySlug = async (
  slug: string
): Promise<{ data: BlogPostData }> => {
  const response = await clientAxiosInstance.get(`/blog/${slug}`);
  return response.data;
};

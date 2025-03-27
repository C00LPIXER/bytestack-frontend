import { clientAxiosInstance } from "@/api/clientAxios";
import { User } from "@/types/user";
interface ApiResponse {
  message: string;
  success: boolean;
}

interface SigninResponse extends ApiResponse {
  user: User;
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

export const fetchUser = async (): Promise<User | null> => {
  const response = await clientAxiosInstance.get("/users/me");
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await clientAxiosInstance.post("/auth/logout");
};

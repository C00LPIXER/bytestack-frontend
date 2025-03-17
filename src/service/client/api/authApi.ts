import { clientAxiosInstance } from "@/api/client.axios";

interface ApiResponse {
  status: number;
  message: string;
  success: boolean;
}

export const sendOtp = async (
  email: string,
  type: string
): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post(
    "/auth/send-otp",
    {
      email,
      type,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  otp: string;
}): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post("/auth/signup", data, {
    withCredentials: true,
  });
  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  password: string;
  otp: string;
}): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post(
    "/auth/forgot-password",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

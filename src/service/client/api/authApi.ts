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
      withCredentials: true, // Important for cross-origin cookies or sessions
    }
  );
  console.log(email, type);
  return response.data;
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  otp: string;
}): Promise<ApiResponse> => {
  const response = await clientAxiosInstance.post("/auth/signup", data, {
    withCredentials: true, // Important for cross-origin cookies or sessions
  });
  return response.data;
};

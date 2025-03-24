import adminAxios from "@/api/adminAxios";
import { LoginResponse } from "@/types/auth";

export const adminSignin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await adminAxios.post<LoginResponse>("/admin/login", {
    email,
    password,
  });
  return response.data;
};

export const adminLogout = async (): Promise<void> => {
  await adminAxios.post("/admin/logout");
};
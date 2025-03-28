import adminAxios from "@/api/adminAxios";
import { LoginResponse } from "@/types/auth";
import { User } from "@/types/user";

export const adminSignin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await adminAxios.post<LoginResponse>("/admin/login", {
    email,
    password,
  });
  return response.data;
};

export const adminLogout = async (): Promise<void> => {
  await adminAxios.post("/admin/logout");
};

export const fetchUsers = async (
  page: number,
  limit: number,
  search: string,
  status?: string
): Promise<{ users: User[]; total: number }> => {
  try {
    const response = await adminAxios.get("/admin/users", {
      params: { page, limit, search, status },
    });
    return {
      users: response.data.data,
      total: response.data.meta.total,
    };
  } catch {
    throw new Error("Failed to fetch users");
  }
};

export const updateUser = async (
  userId: string,
  data: { isBanned?: boolean }
): Promise<void> => {
  try {
    await adminAxios.patch(`/admin/users/${userId}`, data);
  } catch {
    throw new Error("Failed to update user");
  }
};

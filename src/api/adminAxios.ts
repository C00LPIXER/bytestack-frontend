import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { RefreshTokenResponse } from "@/types/auth";

const adminAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

adminAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      (error.response?.data as { message?: string })?.message ===
        "Access token missing in cookies" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post<RefreshTokenResponse>(
          `${import.meta.env.VITE_PRIVATE_API_URI}/admin/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.data.success) {
          return adminAxios(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("persist:adminAuth");
        await axios.post(
          `${import.meta.env.VITE_PRIVATE_API_URI}/admin/logout`,
          {},
          { withCredentials: true }
        );
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    if (
      error.response?.status === 403 &&
      (error.response?.data as { message?: string })?.message ===
        "Admin access required"
    ) {
      localStorage.removeItem("persist:adminAuth");
      await axios.post(
        "${import.meta.env.VITE_PRIVATE_API_URI}/admin/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default adminAxios;

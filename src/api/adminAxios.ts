import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { RefreshTokenResponse } from "@/types/auth";

const adminAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

adminAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If the error is a 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to avoid infinite loops

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post<RefreshTokenResponse>(
          `${import.meta.env.VITE_PRIVATE_API_URI}/admin/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.data.success) {
          // Retry the original request with the new access token (set in cookie)
          return adminAxios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // If refresh fails, log out the admin
        localStorage.removeItem("persist:root");
        window.location.href = "/admin/login";
        await axios.post(
          "${import.meta.env.VITE_PRIVATE_API_URI}/admin/logout",
          {},
          { withCredentials: true }
        );
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;

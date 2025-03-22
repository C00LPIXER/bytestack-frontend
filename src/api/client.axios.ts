import axios, { AxiosError, AxiosInstance } from "axios";

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

const refreshAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

clientAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    const skipRefreshFor = ["/auth/login"];
    const shouldSkipRefresh = skipRefreshFor.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh &&
      ((error.response.data as { message: string })?.message ===
        "Invalid or expired token" ||
        (error.response.data as { message: string })?.message ===
          "Access token not found")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshAxiosInstance.post(
          "/auth/refresh-token"
        );

        if (refreshResponse.status === 200) {
          return clientAxiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("persist:root");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { clientAxiosInstance };

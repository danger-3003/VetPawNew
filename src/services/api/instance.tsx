import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const api = axios.create({
  baseURL: "https://vetpaw-dashboard.netlify.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getCookie("token") as string | undefined;
  if (token && !config.url?.includes("/auth") && !config.url?.includes("/signup")) {
    // Attach token only for requests other than login/signup
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      if (typeof window !== "undefined" && !error.config?.url?.includes("/auth")) {
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export const clearAuthToken = () => {
  deleteCookie("token");
};

export default api;

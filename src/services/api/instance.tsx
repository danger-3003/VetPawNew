import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const api = axios.create({
  baseURL: "https://vetpaw-dashboard.netlify.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// ✅ Attach token if present (no Bearer)
api.interceptors.request.use((config) => {
  const token = getCookie("token") as string | undefined;
  if (token && !config.url?.includes("/login") && !config.url?.includes("/signup")) {
    // Attach token only for requests other than login/signup
    config.headers.Authorization = token;
  }
  return config;
});

// ✅ Utility: clear token
export const clearAuthToken = () => {
  deleteCookie("token");
};

export default api;

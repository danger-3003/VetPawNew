"use client";

import { ThemeState } from "@/components/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => {
      const applyTheme = (theme: "light" | "dark" | undefined) => {
        document.documentElement.classList.toggle("dark", theme === "dark");
      };

      return {
        theme: "light",
        setTheme: () => {
          const current = get().theme;
          const newTheme = current === "light" ? "dark" : "light";
          applyTheme(newTheme);
          set({ theme: newTheme });
        },
        initializeTheme: () => {
          const savedTheme = get().theme;
          applyTheme(savedTheme);
        },
      };
    },
    {
      name: "theme-storage", // key in localStorage
    }
  )
);

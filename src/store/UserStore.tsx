"use client"

import { User, userStoreType } from "@/components/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const userStore = create<userStoreType>()(
  persist(
    (set) => ({
      user: null,
      addUser: (user: User) => {
        set({ user: user });
      },
      removeUser: () => {
        set({ user: null });
      }
    }),
    {
      name: "user-storage",
    }
  )
)
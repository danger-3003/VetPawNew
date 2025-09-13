"use client";

import { CartState } from "@/components/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartCount: 0,

      initialCart: (count: number) => {
        set({ cartCount: count });
      },

      addToCart: () => {
        set({ cartCount: get().cartCount + 1 });
      },

      removeFromCart: () => {
        if (get().cartCount > 0) {
          set({ cartCount: get().cartCount - 1 });
        }
      },

      clearCart: () => set({ cartCount: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);

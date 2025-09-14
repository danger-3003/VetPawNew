'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { handleNavigate } from "@/utils/Navigate";
import { clearAuthToken } from "@/services/api/instance";
import { useCartStore } from "@/store/CartStore";

export function useProfileUrls() {
  const router = useRouter();
  const pathname = usePathname();
  const { initialCart } = useCartStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetId = sessionStorage.getItem("scrollToId");
    if (targetId && pathname === "/") {
      let attempts = 0;
      const maxAttempts = 20;

      const tryScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          sessionStorage.removeItem("scrollToId");
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        } else {
          sessionStorage.removeItem("scrollToId");
        }
      };
      setTimeout(tryScroll, 100);
    }
  }, [pathname]);

  const scrollOrNavigate = (id: string) => {
    if (typeof window === "undefined") return;

    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with id '${id}' not found on home page.`);
      }
    } else {
      sessionStorage.setItem("scrollToId", id);
      router.push("/");
    }
  };

  const urls = [
    {
      title: "Home",
      click: () => scrollOrNavigate("homeSection"),
    },
    {
      title: "Bookings",
      click: () => handleNavigate("bookings"),
    },
    {
      title: "Profile",
      click: () => handleNavigate("profile"),
    },
    {
      title: "Logout",
      click: () => {
        scrollOrNavigate("homeSection");
        clearAuthToken();
        initialCart(0);
      },
    }
  ];

  return urls;
}
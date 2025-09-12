"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { useThemeStore } from "@/store/ThemeStore";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useThemeStore();
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Apply theme class when it changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!theme) {
      setTheme();
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Number(progress.toFixed(1)));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme, setTheme]);

  return (
    <>
      <Navbar scrollProgress={scrollProgress} />
      <div ref={bodyRef}>{children}</div>
      <Footer />
    </>
  );
}

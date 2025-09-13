"use client";

import React from "react";
import { Rocket, Star, Zap } from "lucide-react";
import LinkButton from "./ui/Button/LinkButton";
import { usePathname, useRouter } from "next/navigation";
import BlurText from "./ui/Texts/BlurText";

export default function Hero() {
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <>
      <section id="homeSection" className="relative flex flex-col items-center justify-center pt-32 sm:pt-28 pb-16 px-6 text-center h-screen max-h-[70rem] sm:max-h-[60rem] text-text">
        {/* Badge */}
        <div className="mb-10 flex items-center gap-2 rounded-full border border-orange-300/60 px-4 py-1 text-sm text-orange-500 shadow-sm">
          <Rocket className="h-4 w-4" />
          <span>New Products Available Now</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl flex items-center justify-center flex-wrap">
          <BlurText
            text="Welcome to"
            delay={50}
            animateBy="words"
            direction="top"
            className=""
          />
          <BlurText
            text="VetPaw"
            delay={50}
            animateBy="words"
            direction="top"
            className="bg-gradient-to-r from-orange-300 to-red-500 bg-clip-text text-transparent"
          />
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-orange-700 dark:text-orange-200">
          At {" "}<span className="font-semibold text-orange-600 text-xl">VetPaw Medicine Manufacturers</span> ,
          we are dedicated to advancing animal health and well-being through safe, effective, and innovative veterinary medicines.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex items-center gap-4 flex-row">
          <LinkButton
            text="About"
            target="_self"
            onClick={() => { scrollOrNavigate("aboutSection") }}
            className="px-7 py-1.5 w-28 sm:w-36"
          />
          <LinkButton
            href="/"
            text="Products"
            target="_self"
            onClick={() => { scrollOrNavigate("productsSection") }}
            className="px-7 py-1.5 w-28 sm:w-36"
          />
        </div>

        {/* Stats */}
        <div className="mt-20 flex items-center justify-center flex-wrap gap-8 sm:flex-row sm:gap-16">
          <div>
            <p className="text-2xl font-bold text-orange-600">5K+</p>
            <p className="text-sm text-gray-600 dark:text-white">Happy Customers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-500">10+</p>
            <p className="text-sm text-gray-600 dark:text-white">Products</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">99.9%</p>
            <p className="text-sm text-gray-600 dark:text-white">Satisfaction</p>
          </div>
        </div>

        {/* Decorative Icons */}
        <Zap className="absolute left-10 top-24 h-6 w-6 text-orange-400/70 animate-pulse opacity-35" />
        <Star className="absolute left-8 bottom-20 h-6 w-6 text-orange-400/70 animate-ping opacity-35" />
        <Star className="absolute right-10 top-28 h-6 w-6 text-orange-400/70 animate-spin opacity-35" />
      </section>
    </>
  );
}

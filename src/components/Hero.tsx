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
      <section id="homeSection" className="relative flex flex-col items-center justify-center pt-40 pb-28 px-6 text-center text-text">
        {/* Badge */}
        <div data-aos="fade-up" className="mb-10 flex items-center gap-2 rounded-full border border-white/60 px-4 py-1 text-sm text-white shadow-sm">
          <Rocket className="h-4 w-4" />
          <span>New Products Available Now</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl flex items-center justify-center flex-wrap">
          <BlurText
            text="Welcome to"
            delay={50}
            animateBy="words"
            direction="bottom"
            className="text-white"
          />
          <BlurText
            text="VetPaw"
            delay={50}
            animateBy="words"
            direction="bottom"
            className="bg-gradient-to-r from-orange-300 to-red-500 bg-clip-text text-transparent"
          />
        </h1>

        {/* Description */}
        <p data-aos="fade-up" data-aos-delay="100" className="mt-6 max-w-2xl text-white">
          At {" "}<span className="font-semibold text-orange-400 text-xl">VetPaw Medicine Manufacturers</span> ,
          we are dedicated to advancing animal health and well-being through safe, effective, and innovative veterinary medicines.
        </p>

        {/* CTA Buttons */}
        <div data-aos="fade-up" data-aos-delay="100" className="mt-8 flex items-center gap-4 flex-row">
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
          <div data-aos="fade-up" data-aos-delay="100">
            <p className="text-2xl font-bold text-orange-300">5K+</p>
            <p className="text-sm text-white">Happy Customers</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <p className="text-2xl font-bold text-red-500">10+</p>
            <p className="text-sm text-white">Products</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <p className="text-2xl font-bold text-orange-300">99.9%</p>
            <p className="text-sm text-white">Satisfaction</p>
          </div>
        </div>

        {/* Decorative Icons */}
        <Zap className="absolute left-10 top-24 h-6 w-6 text-orange-400 animate-pulse" />
        <Star className="absolute left-8 bottom-20 h-6 w-6 text-orange-400 animate-ping" />
        <Star className="absolute right-10 top-28 h-6 w-6 text-orange-400 animate-spin" />
      </section>
    </>
  );
}

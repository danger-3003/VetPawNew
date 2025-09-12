import { LinkButtonProps } from "@/components/types/types";
import React from "react";

function LinkButton({ text, onClick, href, target, className }: LinkButtonProps) {
  return (
    <>
      {
        href ?
          <a
            href={href}
            onClick={onClick}
            target={target}
            className={`relative inline-flex items-center justify-center overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group cursor-pointer text-sm md:text-base ${className}`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-600 via-orange-500 to-red-400"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-red-300 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white font-poppins font-light md:font-normal w-max">
              {text}
            </span>
          </a>
          :
          <div
            onClick={onClick}
            className={`relative inline-flex items-center justify-center overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group cursor-pointer text-sm md:text-base ${className}`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-600 via-orange-500 to-red-400"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-red-300 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white font-poppins font-light md:font-normal w-max">
              {text}
            </span>
          </div>
      }
    </>

  );
}

export default LinkButton;

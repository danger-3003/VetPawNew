"use client";
import { HeadingProps, TextProps } from "@/components/types/types";
import React from "react";


export const Text: React.FC<TextProps> = ({ children, onClick, className = "", ...rest }) => {
  return (
    <p
      onClick={onClick}
      className={`text-sm sm:text-base font-poppins ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
};

export const Heading: React.FC<HeadingProps> = ({ children, className = "", ...rest }) => {
  return (
    <h2
      className={`font-poppins ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
};

import { Metadata } from "next";
import React, { ReactNode } from "react";

interface ProductsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Veterinary Products | VetPaw",
  description: "Explore VetPaw's wide range of veterinary medicines and animal health products. Safe, effective, and trusted solutions for vets, farmers, and pet owners.",
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
}

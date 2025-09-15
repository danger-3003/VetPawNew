import { Metadata } from "next";
import React, { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "User Profile | VetPaw",
  description: "Explore VetPaw's wide range of veterinary medicines and animal health products. Safe, effective, and trusted solutions for vets, farmers, and pet owners.",
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
}

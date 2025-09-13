import { Metadata } from "next";
import React, { ReactNode } from "react";

interface ContactLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Contact Us | VetPaw",
  description: "Get in touch with VetPaw for inquiries about veterinary medicines, animal health solutions, or customer support. We're here to help vets, farmers, and pet owners.",
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
}

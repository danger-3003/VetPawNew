import { Metadata } from "next";
import React, { ReactNode } from "react";

interface CheckoutLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Checkout cart | VetPaw",
  description: "Get in touch with VetPaw for inquiries about veterinary medicines, animal health solutions, or customer support. We're here to help vets, farmers, and pet owners.",
};

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
}

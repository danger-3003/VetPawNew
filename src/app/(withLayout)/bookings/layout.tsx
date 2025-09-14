import { Metadata } from "next";
import React, { ReactNode } from "react";

interface BookingsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Your bookings | VetPaw",
  description: "Get in touch with VetPaw for inquiries about veterinary medicines, animal health solutions, or customer support. We're here to help vets, farmers, and pet owners.",
};

export default function BookingsLayout({ children }: BookingsLayoutProps) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
}

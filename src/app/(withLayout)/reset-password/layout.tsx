import { Metadata } from "next";
import React, { ReactNode } from "react";

interface ResetPasswordlayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Reset password | VetPaw",
  description: "Get in touch with VetPaw for inquiries about veterinary medicines, animal health solutions, or customer support. We're here to help vets, farmers, and pet owners.",
};

export default function ResetPasswordlayout({ children }: ResetPasswordlayoutProps) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
}

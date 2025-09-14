import { MouseEventHandler, ReactNode } from "react";

export interface ClickOutsideProps {
  onClickOutside: (event: MouseEvent) => void;
  children: ReactNode;
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export interface ThemeState {
  theme: "light" | "dark" | undefined;
  setTheme: () => void;
  initializeTheme: () => void;
}

export interface LinkButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  className?: string;
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export interface OurValuesType {
  title: string;
  img: string;
}

export interface ToasterType {
  status: boolean;
  message: string;
  showToast: boolean;
}

export interface CartState {
  cartCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
  clearCart: () => void;
  initialCart: (count: number) => void;
};


export interface User {
  _id: string;
  name: string;
  email: string;
  password: string; // hashed password
  phone: string;
  address: string;
  proofOfRole: string; // URL to uploaded proof
  role: "retailer" | "admin" | "customer" | string; // extendable
  verified: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
  otp?: string; // optional because not always present
}

export interface userStoreType {
  user: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
}
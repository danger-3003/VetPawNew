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
  initialCart: (count: number) => void;
  addToCart: (quantity?: number) => void;
  removeFromCart: (quantity?: number) => void;
  setCart: (count: number) => void;
  clearCart: () => void;
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

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  product?: {
    images: string[];
  };
};

export interface Address {
  name: string;
  email: string;
  phone: string;
  doorNo: string;
  address: string;
  city: string;
};

export interface Booking {
  _id: string;
  products: Product[];
  gstAmount: number;
  totalAmount: number;
  grandAmount: number;
  discount: number;
  address: Address;
  status: string;
  paymentMethod: string;
  createdAt: string;
  orderId: string;
};

export interface IndividualProps {
  bookingsData: Booking | null;
  setIndividual: React.Dispatch<React.SetStateAction<boolean>>;
}
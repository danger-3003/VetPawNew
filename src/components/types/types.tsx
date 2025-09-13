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
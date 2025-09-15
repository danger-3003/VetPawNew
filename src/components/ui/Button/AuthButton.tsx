import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-7 py-1 rounded bg-orange-400  dark:font-medium hover:bg-orange-500 hover:dark:bg-orange-500 text-sm transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

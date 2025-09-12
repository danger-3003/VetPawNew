import { IconButtonProps } from "@/components/types/types";
import React from "react";

function IconButton({ children, onClick, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className ?? ""} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;

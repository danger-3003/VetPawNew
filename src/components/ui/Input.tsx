import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700 dark:text-text">{label}</label>
      <input
        {...props}
        className={`border border-gray-300 dark:bg-zinc-800 text-text rounded px-3 py-1 outline-none focus:ring-1 focus:ring-orange-500 ${className}`}
      />
    </div>
  );
};

export default Input;

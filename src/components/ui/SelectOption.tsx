import React from "react";

type OptionType = {
  value: string;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: OptionType[];
};

const Select: React.FC<SelectProps> = ({ label, options, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700 dark:text-text">{label}</label>
      <select
        {...props}
        className={`border border-gray-300 dark:bg-zinc-800 text-text rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

import React, { useState } from "react";

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string; 
  error?: string; 
  onClick?: () => void;
  icon?: any;
  readOnly?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  onClick,
  icon,
  readOnly = false, 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`block w-full bg-white border border-gray-300 rounded-md py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-700 ${
          isFocused || value ? "pt-5" : ""
        } font-sans ${error ? "text-error" : "border-gray-300"}`}
      />
      <label
        className={`absolute left-3 top-2 transition-all duration-200 ease-in-out ${
          isFocused || value ? "text-black-500 text-xs" : "text-gray-500"
        } font-sans`}
      >
        {label}
      </label>

      {error && <p className="text-error text-xs mt-1">{error}</p>}

      <span className="absolute right-3 top-3 cursor-pointer" onClick={onClick}>
        {icon}
      </span>
    </div>
  );
};

export default FloatingInput;

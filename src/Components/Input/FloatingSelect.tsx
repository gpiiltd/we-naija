import React, { useState } from "react";

interface OptionProps {
  value: string;
  label: string;
}
interface FloatingSelectProps {
  label: string;
  options: OptionProps[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  readOnly?: boolean;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  readOnly = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: OptionProps) => {
    onChange(option.label);
    setIsOpen(false);
  };

  // const selectedLabel =
  //   options.find((option) => option.value === value)?.label || "";

  return (
    <div className="relative mb-6">
      <div
        aria-readonly={readOnly}
        className={`block w-full bg-white border   rounded-md py-2 px-3 text-gray-700  cursor-pointer ${
          isFocused || value ? "pt-5" : "py-5"
        } font-normal ${error ? "text-error" : isFocused ? "border-green-500 ring-1 ring-green-500 " : "border-gray-300"}`}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setIsOpen(false);
        }}
      >
        {value}
        {!readOnly && (
          <div className="absolute right-3 top-5 transform -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 9l6 6 6-6"
              />
            </svg>
          </div>
        )}
      </div>

      {isOpen && !readOnly && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 text-gray-700 rounded-md overflow-y-auto max-h-40">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-100 py-2 px-3"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      <label
        className={`absolute left-3 top-2 transition-all duration-200 ease-in-out ${
          isFocused || value ? " text-xs" : "text-gray-400"
        } font-normal`}
      >
        {label}
      </label>
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FloatingSelect;

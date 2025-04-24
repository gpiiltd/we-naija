import React from "react";
import { FiCheck } from "react-icons/fi";

type RadioButtonProps = {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selectedValue, onChange }) => {
  const isSelected = selectedValue === value;

  return (
    <div
      className={`flex justify-between items-center border p-4 rounded-lg ${
        isSelected ? "shadow-lg border-primary_green" : "shadow"
      }`}
    >
      <span>{label}</span>
      <div className="relative w-5 h-5">
        <input
          type="radio"
          name="fruit"
          value={value}
          onChange={() => onChange(value)}
          checked={isSelected}
          className="absolute w-full h-full appearance-none border-2 rounded-full checked:border-[#007A61] checked:bg-[#007A61] cursor-pointer"
        />
        {isSelected && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">
            <FiCheck color="#EEEEEE" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioButton;

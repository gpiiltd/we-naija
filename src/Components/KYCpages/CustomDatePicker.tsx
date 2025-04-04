import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <div className="relative w-80 p-4 bg-white shadow-lg rounded-lg">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Select Date
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="MMMM yyyy"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        calendarClassName="shadow-lg rounded-lg p-4 bg-white"
        popperPlacement="bottom-start"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        inline
      />
      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          onClick={() => onChange(null)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
          onClick={() =>
            alert(
              `Selected date: ${
                selectedDate ? format(selectedDate, "dd/MM/yyyy") : "None"
              }`
            )
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CustomDatePicker;

import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleDateChange = (date: Date | null) => {
    onChange(date);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Input field to trigger modal */}
      <input
        type="text"
        placeholder="Date of birth"
        readOnly
        value={selectedDate ? selectedDate.toDateString() : ""}
        onClick={() => setIsOpen(true)}
        className="w-full p-2 border rounded-md cursor-pointer"
      />

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-80 p-4 bg-white shadow-lg rounded-lg">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={onChange}
              dateFormat="dd/MM/yyyy"
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
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={() => handleDateChange(selectedDate)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;

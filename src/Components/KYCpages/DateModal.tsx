import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (date: string) => void;
}

const DateModal: React.FC<DateModalProps> = ({
  isOpen,
  onClose,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleApply = () => {
    if (selectedDate) {
      // Format date as YYYY-MM-DD
      const formattedDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1,
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
      onDateSelect?.(formattedDate);
      onClose();
      console.log("formattedDate", formattedDate);
    }
    // // Format date as DD-MM-YYYY
    // const formattedDate = `${String(selectedDate.getDate()).padStart(
    //   2,
    //   "0"
    // )}-${String(selectedDate.getMonth() + 1).padStart(
    //   2,
    //   "0"
    // )}-${selectedDate.getFullYear()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          dateFormat="dd-MM-yyyy"
          className="border border-gray-300 rounded-md w-full"
        />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="bg-teal-500 text-white rounded-md px-4 py-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;

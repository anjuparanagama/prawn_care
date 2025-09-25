"use client";
import { useState } from "react";
import { FaRegCalendarAlt, FaDownload } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Header() {

  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(2025, 4, 8),
      endDate: new Date(2025, 4, 20),
      key: "selection",
    },
  ]);

  const formattedRange = `${format(range[0].startDate, "dd MMM yyyy")} - ${format(
    range[0].endDate,
    "dd MMM yyyy"
  )}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    try {
      const startDate = format(range[0].startDate, "yyyy-MM-dd");
      const endDate = format(range[0].endDate, "yyyy-MM-dd");
      const res = await fetch(`/api/sales/downloadpdf?start=${startDate}&end=${endDate}`);
      if (!res.ok) throw new Error("Failed to download PDF");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Sales.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error downloading PDF: " + error.message);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 mx-auto w-full">
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C00B8]">Sales</h1>
        <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 items-center">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <FaRegCalendarAlt className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">{formattedRange}</span>
          </button>
          <button
              onClick={handleDownload}
              className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200">
            <FaDownload className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">Download PDF</span>
          </button>
        </div>
      </div>

      {showCalendar && (
        <div className="mb-4 sm:mb-6 lg:mb-8 overflow-x-auto bg-white rounded-lg shadow-sm border">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

export default Header;

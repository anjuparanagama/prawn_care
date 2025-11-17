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
      startDate: new Date(2025, 9, 8),
      endDate: new Date(2025, 4, 20),
      key: "selection",
    },
  ]);

  const formattedRange = `${format(range[0].startDate, " dd MMM yyyy")} - ${format(
    range[0].endDate,
    "dd MMM yyyy"
  )}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => { /*Updates the form value when the user types*/
    try {
      const startDate = format(range[0].startDate, "yyyy-MM-dd");       /*Takes the selected start date and formats it like: 2025-05-08.*/ 
      const endDate = format(range[0].endDate, "yyyy-MM-dd");           /*Takes the selected end date and formats it the same way.*/
      const res = await fetch(`/api/sales/downloadpdf?start=${startDate}&end=${endDate}`); /*Sends a request to your backend to get the PDF file for the selected dates. */
      if (!res.ok) throw new Error("Failed to download PDF"); /*If the server did not respond correctly, stop and show an error.*/
      const blob = await res.blob(); /*Takes the server’s response and converts it into a file object (PDF)*/

      const url = window.URL.createObjectURL(blob);/*Creates a temporary download link for the PDF file.*/
      const a = document.createElement("a");/*Creates a hidden download button in the browser.*/ 
      a.href = url;
      a.download = "Sales.pdf";
      document.body.appendChild(a);/*Adds the hidden button to the page.*/ 
      a.click();/*Clicks the hidden button automatically to start download.*/ 
      document.body.removeChild(a);/*Removes the button after clicking (clean-up).*/ 
      window.URL.revokeObjectURL(url);/*Deletes the temporary file link to free memory.*/ 
    } catch (error) {
      alert("Error downloading PDF: " + error.message);/**/
    }
  };

  return (
    <div className="p-3 sm:p-4 mx-auto w-full">
      <div className="flex justify-between items-center sm:mb-6 lg:mb-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C00B8]">Sales</h1>
        <div className="flex flex-row gap-2 sm:gap-3 lg:gap-2 items-center">
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
        <div className="mb-4 sm:mb-6 lg:mb-8 overflow-x-auto bg-amber-50 rounded-lg shadow-sm border">
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

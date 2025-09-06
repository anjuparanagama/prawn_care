"use client";
import { useState } from "react";
import { FaRegCalendarAlt, FaDownload } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";

function Header() {
  const [startDate, setStartDate] = useState("2025-04-08");
  const [endDate, setEndDate] = useState("2025-05-08");

  const handleDownloadReport = async () => {
    try {
      // Fetch sales data based on the selected date range
      const response = await fetch(`/api/sales/sales?start=${startDate}&end=${endDate}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Create a PDF document
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Sales Report", 10, 10);
      doc.setFontSize(12);
      doc.text(`From: ${startDate}`, 10, 20);
      doc.text(`To: ${endDate}`, 10, 30);

      // Add sales data to the PDF
      let y = 40; // Starting position for the data
      data.forEach((item) => {
        doc.text(`Order ID: ${item.Order_ID}, Customer: ${item.Customer}, Amount: Rs. ${item.Amount}`, 10, y);
        y += 10; // Move down for the next line
      });

      // Save the PDF
      doc.save("sales_report.pdf");
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="pt-6 px-4 flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C00B8]">Sales</h2>
      <div className="flex items-center gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1 text-black"
        />
        <span className="mx-2">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1 text-black"
        />
        <button 
              onClick={handleDownloadReport}
              className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200">
            <FaDownload className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">Export</span>
          </button>
      </div>
    </div>
  );
}

export default Header;

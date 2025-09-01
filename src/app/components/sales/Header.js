"use client";
import { useState } from "react";
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
    <div className="p-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-600">Sales</h2>
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
          type="button" 
          className="border rounded text-black px-2 py-1 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleDownloadReport} // Call the download function on click
        >
          <FiDownload className="mr-2" />
          Export
        </button>
      </div>
    </div>
  );
}

export default Header;

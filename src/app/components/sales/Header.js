"use client";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";

function Header() {
  const [startDate, setStartDate] = useState("2025-04-08");
  const [endDate, setEndDate] = useState("2025-05-08");

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
  
>
  <FiDownload className="mr-2" />
  Export
</button>
      </div>
    </div>
  );
}

export default Header;
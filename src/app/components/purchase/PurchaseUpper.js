"use client";

import { useState } from "react";
import { FaRegCalendarAlt, FaDownload } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Bottom from "./PurchaseBottom";

export default function PurchasingPage() {
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

  const [formData, setFormData] = useState({
    itemId: "",
    seller: "",
    date: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updating purchase data:", formData);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header with buttons on the right */}
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C00B8]">Purchasing</h1>
        <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 items-center">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            <FaRegCalendarAlt className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">{formattedRange}</span>
          </button>
          <button className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200">
            <FaDownload className="text-gray-600 text-xs sm:text-sm" />
            <span className="font-medium">Export</span>
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

      <div className="bg-[#DDE6FF] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 lg:mb-6">
        <h2 className="text-center text-[#0019FA] italic text-sm sm:text-base lg:text-lg font-medium">Purchased Items</h2>
      </div>

      <div className="bg-white rounded-md shadow-md p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 min-[1023px]:grid-cols-2 gap-4 sm:gap-6 mt-3 sm:mt-4 px-2 sm:px-4 min-[1023px]:px-8">
          {/* Left column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Item ID</label>
              <input
                type="text"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter item ID"
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Seller</label>
              <input
                type="text"
                name="seller"
                value={formData.seller}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter seller name"
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 mt-2 sm:mt-7">
              <button
                onClick={handleUpdate}
                className="bg-[#0616F9] text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <Bottom />
    </div>
  );
}

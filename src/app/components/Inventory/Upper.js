'use client';
import { useState } from 'react';

export default function InventoryPage() {
  const [itemID, setItemID] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');

  const handleUpdate = () => {
    console.log({ itemID, qty, date });
    // Add your update logic here
  };

  return (
    <div className="bg-gray-100 ">
      {/* Main content */}
      <div className="w-full p-3 sm:p-4 md:p-6 bg-gray-50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1C00B8]">Inventory</h1>
          <button className="flex items-center gap-1 px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm hover:bg-gray-100 transition-colors">
            <span>⬇</span>
            <span className="font-bold">Export</span>
          </button>
        </div>

        {/* Update Items Header */}
        <div className="bg-[#DDE6FF] rounded-md p-3 mb-4">
          <h2 className="text-center text-[#0019FA] italic text-sm font-medium sm:text-base">Update Items</h2>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-md shadow-md p-3 sm:p-4 md:p-6">
          <div className="mt-2 sm:mt-4">
            {/* Mobile Layout (stacked) */}
            <div className="flex flex-col space-y-4 sm:space-y-6">
              
              {/* Desktop/Tablet: Two columns, Mobile: Single column */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                
                {/* Left Column */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Item ID */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[80px] lg:min-w-[100px]">
                      Item ID
                    </label>
                    <input
                      type="text"
                      value={itemID}
                      onChange={(e) => setItemID(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter Item ID"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[80px] lg:min-w-[100px]">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Quantity */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[80px] lg:min-w-[100px]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter Quantity"
                    />
                  </div>

                  {/* Update Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="min-w-0 sm:min-w-[80px] lg:min-w-[100px]"></div>
                    <button
                      onClick={handleUpdate}
                      className="w-full sm:flex-1 lg:w-60 bg-[#0616F9] text-white px-4 py-2 sm:py-2.5 rounded-md hover:bg-blue-600 transition-colors font-medium text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
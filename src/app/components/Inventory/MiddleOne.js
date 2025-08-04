'use client';
import { useState } from 'react';

export default function AddInventory() {
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    console.log('Adding Item:', { itemName, qty, date });
  };

  return (
    <div className="bg-gray-100 ">
      {/* Main content */}
      <div className="w-full p-3 sm:p-4 md:p-6 bg-gray-50">

        {/* New Items Header */}
        <div className="bg-blue-100 rounded-md p-3 mb-2 sm:mb-3">
          <h2 className="text-center text-[#0019FA] italic text-sm sm:text-base font-medium">
            New Items
          </h2>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-md shadow-md p-3 sm:p-4 md:p-6">
          <div className="mt-0">

            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {/* Left Column */}
                <div className="space-y-4 lg:space-y-5">
                  {/* Item Name */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[100px] lg:min-w-[120px]">Item Name</label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter item name"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[100px] lg:min-w-[120px]">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 lg:space-y-5">
                  {/* Quantity */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[100px] lg:min-w-[120px]">Quantity</label>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter quantity"
                      min="0"
                    />
                  </div>

                  {/* Add Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="min-w-0 sm:min-w-[100px] lg:min-w-[120px]"></div>
                    <button
                      onClick={handleAdd}
                      className="w-full sm:flex-1 lg:w-60 bg-[#0616F9] text-white px-6 py-2.5 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors font-medium text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                    >
                      ADD ITEM
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <div className="space-y-5">
                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Item ID</label>
                  <input
                    type="number"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter item name"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter quantity"
                    min="0"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Add Button */}
                <div className="pt-0">
                  <button
                    onClick={handleAdd}
                    className="w-full bg-[#0616F9] text-white px-6 py-3 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors font-medium text-base focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                  >
                    ADD ITEM
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {(itemName || qty || date) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  {itemName && <div><span className="font-medium">Item Name:</span> {itemName}</div>}
                  {qty && <div><span className="font-medium">Quantity:</span> {qty}</div>}
                  {date && <div><span className="font-medium">Date:</span> {date}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

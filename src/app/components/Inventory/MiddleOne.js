'use client';
import { useState } from 'react';

export default function AddInventory() {
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');
  const [type, setType] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) {
      alert("Please enter an item name");
      return;
    }

    if (!qty || parseInt(qty) < 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (!type) {
      alert("Please select a type");
      return;
    }

    try {
      const res = await fetch("/api/inventory/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName, qty, type }),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      
      if (data.success) {
        alert(data.message || "Item added successfully");
        setItemName('');
        setType('');
        setQty('');
      } else {
        alert(data.message || "Error adding item. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("Server returned")) {
        alert("Server error. Please check if the backend is running.");
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="bg-white ">
      <div className="w-full sm:p-4 md:p-6 -mt-8 pt-[-20px]">
        <div className="bg-blue-100 rounded-md p-3 mb-2 sm:mb-3">
          <h2 className="text-center text-blue-900 italic text-sm sm:text-base font-medium">
            New Items
          </h2>
        </div>

        <div className="bg-white rounded-md shadow-md p-3 sm:p-4 md:p-6">
          <div className="mt-0">
            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="space-y-4 lg:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium sm:min-w-[100px] lg:min-w-[120px]">Item Name</label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium sm:min-w-[100px] lg:min-w-[120px]">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="prawns">Prawns</option>
                      <option value="feeds">Feeds</option>
                      <option value="equipments">Equipments</option>
                      <option value="medicine">Medicine</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium sm:min-w-[100px] lg:min-w-[120px]">Quantity</label>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter quantity"
                      min="0"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="sm:min-w-[100px] lg:min-w-[120px]"></div>
                    <button
                      onClick={handleAdd}
                      className="w-full sm:flex-1 lg:w-60 bg-[#0616F9] text-white px-6 py-2.5 rounded-md hover:bg-blue-600">
                      ADD ITEM
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="block sm:hidden space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                  placeholder="Enter quantity"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm"
                >
                  <option value="">Select type</option>
                  <option value="prawns">Prawns</option>
                  <option value="feeds">Feeds</option>
                  <option value="equipments">Equipments</option>
                  <option value="medicine">Medicine</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="min-w-0 sm:min-w-[80px] lg:min-w-[100px]"></div>
                    <button
                      onClick={handleAdd}
                      className="w-full bg-[#0616F9] text-white font-medium text-sm px-6 py-3 rounded-md hover:bg-blue-600">
                      Add Item
                    </button>
                  </div>
            </div>

            {/* Preview Section */}
            {(itemName || qty || type) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium mb-2">Preview:</h3>
                <div className="text-xs space-y-1">
                  {itemName && <div><span className="font-medium">Item Name:</span> {itemName}</div>}
                  {qty && <div><span className="font-medium">Quantity:</span> {qty}</div>}
                  {type && <div><span className="font-medium">Type:</span> {type}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

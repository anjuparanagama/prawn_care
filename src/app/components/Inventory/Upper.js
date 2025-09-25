'use client';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [id, setItemID] = useState('');
  const [qty, setQty] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);

  const [idIssue, setIdIssue] = useState('');
  const [qtyIssue, setQtyIssue] = useState('');
  const [dateIssue, setDateIssue] = useState('');

  // Calculate min and max dates (5 days before today up to today)
  const getMinDate = () => {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);
    return fiveDaysAgo.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Input validation
    if (!id) {
      alert("Please select an item to update");
      return;
    }

    if (!qty || isNaN(qty) || parseInt(qty) < 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      const res = await fetch(`/api/inventory/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty, date }),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        alert(data.message || "Item updated successfully");
        setItemID('');
        setQty('');
        setDate('');
      } else {
        alert(data.message || "Error updating item. Please try again.");
      }

    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("Server returned")) {
        alert("Server error. Please check if the backend is running.");
      } else if (error.message.includes("Unexpected token")) {
        alert("Server error: Invalid response format. Please check if the backend is running correctly.");
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  const handleIssue = async (e) => {
    e.preventDefault();

    // Input validation
    if (!idIssue) {
      alert("Please select an item to issue");
      return;
    }

    if (!qtyIssue || isNaN(qtyIssue) || parseInt(qtyIssue) < 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (!dateIssue) {
      alert("Please select a date");
      return;
    }

    try {
      const res = await fetch(`/api/inventory/issue/${idIssue}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: qtyIssue, date: dateIssue }),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        alert(data.message || "Item issued successfully");
        setIdIssue('');
        setQtyIssue('');
        setDateIssue('');
      } else {
        alert(data.message || "Error issuing item. Please try again.");
      }

    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("Server returned")) {
        alert("Server error. Please check if the backend is running.");
      } else if (error.message.includes("Unexpected token")) {
        alert("Server error: Invalid response format. Please check if the backend is running correctly.");
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  useEffect(() => {
    fetch("/api/inventory/items")
    .then((res) => res.json())
    .then((data) => {
      if (data && Array.isArray(data)) {
        setItems(data);
        // Don't automatically select first item - let user choose
      }
    })
    .catch((err) => console.log("Error fetching items:", err));
  }, []);

    const download = () => {
      window.open("http://localhost:5000/api/inventory/downloadpdf", "_blank")
      alert("Download successfully")
    };

  return (
    <div className="bg-white">
      {/* Main content */}
      <div className="w-full p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <h1 className="text-2xl font-bold text-[#1C00B8]">Inventory</h1>
          <button onClick={download} className="flex items-center gap-1 px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-gray-100 transition-colors">
            <p>Download Inventory report : </p>
            <span>⬇</span>
            <span>Export</span>
          </button>
        </div>

        {/*Issue Items Header */}
        <div className="bg-[#DDE6FF] rounded-md p-3 mb-4">
          <h2 className="text-center text-blue-900 italic text-sm font-medium sm:text-base">Issue Items</h2>
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
                    <select
                      value={idIssue}
                      onChange={(e) => setIdIssue(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-l-4 border-gray-300 rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    >
                      <option value="">Select an Item</option>
                      {items.length === 0 ? (
                        <option value="">Loading...</option>
                      ) : (
                        items.map((item) => (
                          <option key={item.item_id} value={item.item_id}>
                            {item.item_id} - {item.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm font-medium min-w-0 sm:min-w-[80px] lg:min-w-[100px]">
                      Date
                    </label>
                    <input
                      type="date"
                      value={dateIssue}
                      onChange={(e) => setDateIssue(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full sm:flex-1 lg:w-60 border border-l-4 border-gray-300 rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-gray-200 focus:border-transparent"
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
                      value={qtyIssue}
                      onChange={(e) => setQtyIssue(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-l-4 border-gray-300 rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                      placeholder="Enter Quantity"
                    />
                  </div>

                  {/* Update Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="min-w-0 sm:min-w-[80px] lg:min-w-[100px]"></div>
                    <button
                      onClick={handleIssue}
                      className="w-full bg-[#0616F9] text-white font-medium text-sm px-6 py-3 rounded-md hover:bg-blue-600">
                      Issue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Items Header */}
        <div className="bg-[#DDE6FF] rounded-md p-3 mt-8 mb-4">
          <h2 className="text-center text-blue-900 italic text-sm font-medium sm:text-base">Update Items</h2>
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
                    <select
                      value={id}
                      onChange={(e) => setItemID(e.target.value)}
                      className="w-full sm:flex-1 lg:w-60 border border-l-4 border-gray-300 rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    >
                      <option value="">Select an Item</option>
                      {items.length === 0 ? (
                        <option value="">Loading...</option>
                      ) : (
                        items.map((item) => (
                          <option key={item.item_id} value={item.item_id}>
                            {item.item_id} - {item.name}
                          </option>
                        ))
                      )}
                    </select>
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
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full sm:flex-1 lg:w-60 border border-l-4 border-gray-300 rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-gray-200 focus:border-transparent"
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
                      className="w-full sm:flex-1 lg:w-60 border border-l-4 border-gray-300 rounded-md px-2 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                      placeholder="Enter Quantity"
                    />
                  </div>

                  {/* Update Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="min-w-0 sm:min-w-[80px] lg:min-w-[100px]"></div>
                    <button
                      onClick={handleUpdate}
                      className="w-full bg-[#0616F9] text-white font-medium text-sm px-6 py-3 rounded-md hover:bg-blue-600">
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

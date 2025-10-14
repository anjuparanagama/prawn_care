"use client";
import React, { useState, useEffect } from "react";

export default function Salestable() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} - ${month} - ${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sales/sales");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRows(data);
        setFilteredRows(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleSeeAll = () => {
    // Implement the logic for "See All" if needed
    console.log("See All clicked");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Desktop and Tablet View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  ORDER ID
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  CUSTOMER
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  DATE
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-3 lg:px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  AMOUNT
                </th>
                <th className="px-3 lg:px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRows.map((row, index) => (
                <tr
                  key={row.Order_ID ? String(row.Order_ID) : `fallback-${index}`}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="px-3 lg:px-6 py-4 text-sm font-medium text-gray-900">
                    {row.Order_ID}
                  </td>
                  <td className="px-3 lg:px-6 py-4 text-sm text-gray-700">
                    {row.Customer}
                  </td>
                  <td className="px-3 lg:px-6 py-4 text-sm text-gray-500">
                    {formatDate(row.Order_Date)}
                  </td>
                  <td className="px-3 lg:px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        row.Status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : row.Status === "Cancelled"
                          ? "bg-red-200 text-red-800"
                          : row.Status === "New"
                          ? "bg-yellow-200 text-yellow-800"
                          : row.Status === "Processing"
                          ? "bg-blue-200 text-blue-800"
                          : row.Status === "Delivered"
                          ? "bg-purple-200 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.Status}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-4 text-sm text-gray-800 text-right">
                    Rs. {(row.Amount || 0).toLocaleString()}
                  </td>
                  <td className="px-3 lg:px-6 py-4 text-sm text-gray-800 text-right">
                    {row.Quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden">
          <div className="bg-blue-100 px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-900">Sales Orders</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredRows.map((row, index) => (
              <div key={row.Order_ID ? String(row.Order_ID) : `fallback-${index}`} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {row.Order_ID}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(row.Order_Date)}</span>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      row.Status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : row.Status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : row.Status === "New"
                        ? "bg-yellow-200 text-yellow-800"
                        : row.Status === "Processing"
                        ? "bg-blue-200 text-blue-800"
                        : row.Status === "Delivered"
                        ? "bg-purple-200 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {row.Status}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-700">{row.Customer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Amount</span>
                    <span className="text-sm font-medium text-gray-900">
                      Rs. {(row.Amount || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Quantity</span>
                    <span className="text-sm font-medium text-gray-900">
                      {row.Quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="text-center text-sm font-medium py-3 text-gray-600 border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200" 
          onClick={handleSeeAll}
        >
          See All
        </div>
      </div>
    </div>
  );
}

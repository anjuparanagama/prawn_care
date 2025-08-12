"use client";
import React, { useState, useEffect } from "react";

function createData(Order_ID, Customer, Date, Status, Amount, Quantity) {
  return { Order_ID, Customer, Date, Status, Amount, Quantity };
}

const initialRows = [
  createData("ORD01", "rms. Ltd", "2025/04/01", "New", 25000, "500 Kg"),
  createData("ORD02", "rms. Ltd", "2025/04/01", "Processing", 25000, "500 Kg"),
  createData("ORD03", "rms. Ltd", "2025/04/01", "Completed", 25000, "500 Kg"),
  createData("ORD04", "wn", "2025-05-23", "Delivered", 50.00, "1 Kg"),
  createData("ORD05", "Javis", "2025-05-24", "Cancelled", 180.75, "4 Kg"),
];

export default function Ordertable() {
  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);

  useEffect(() => {
    setFilteredRows(rows); // Initial load
  }, []);

  const handleFilter = ({ searchTerm, selectedStatus }) => {
    let filtered = [...rows];
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        row.Customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.Order_ID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus && selectedStatus !== "") {
      filtered = filtered.filter((row) => row.Status === selectedStatus);
    }
    setFilteredRows(filtered);
  };

  return (
    <div className="w-full mx-auto p-8 pt-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  MER
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  DATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  AMOUNT
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRows.map((row, index) => (
                <tr
                  key={row.Order_ID + index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.Customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.Date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        row.Status === "Delivered" || row.Status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : row.Status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : row.Status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {typeof row.Amount === "number"
                      ? row.Amount.toFixed(2)
                      : row.Amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {row.Quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
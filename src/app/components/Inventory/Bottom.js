"use client";

import * as React from 'react';

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showAll, setShowAll] = React.useState(false);

  React.useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch('/api/inventory/table');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRows(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  if (loading) {
    return <div className="w-full p-3 sm:p-4 md:p-6 bg-gray-50">Loading inventory data...</div>;
  }

  if (error) {
    return <div className="w-full p-3 sm:p-4 md:p-6 bg-gray-50 text-red-600">Error: {error}</div>;
  }

  const displayedRows = showAll ? rows : rows.slice(0, 5);

  return (
    <div className="w-full p-3 sm:p-4 md:p-6">
      {/* Universal Table for All Devices */}
      <div className="bg-white rounded-lg shadow-sm overflow-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Inventory ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Item Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedRows.map((row, index) => (
              <tr key={row.itemID || row.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.itemID || row.item_id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{row.itemName || row.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {row.Quantity || row.quantity} {(row.Quantity || row.quantity) < ((row.threshold || 0) + 25) ? '  ⚠️' : ''}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="px-4 py-4 text-center">
                <button
                  className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Show Less' : 'See All'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )};

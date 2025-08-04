import React from 'react';

const PurchaseBottom = () => {
  const purchaseData = [
    ["PR01", "Feeds - small", "2025/04/01", "John Farms. Ltd", "500 Kg", "Rs. 10,000"],
    ["PR02", "Feeds - Large", "2025/04/01", "John Farms. Ltd", "250 Kg", "Rs. 8,000"],
    ["PR03", "Feeding buckets", "2025/04/01", "John Farms. Ltd", "5", "Rs. 15,000"],
  ];

  return (
    <div className="bg-blue-100 rounded shadow overflow-x-auto mt-6">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="bg-blue-200 text-left">
            <th className="px-4 py-2">Purch. ID</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">Seller</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {purchaseData.map((row, idx) => (
            <tr key={idx} className="border-t">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-2">
                  {i === 4 ? <strong>{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center py-2 font-medium cursor-pointer hover:underline">
        See All
      </div>
    </div>
  );
};

export default PurchaseBottom;

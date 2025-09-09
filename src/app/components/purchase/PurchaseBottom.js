"use client";

import React , { useState, useEffect }from 'react';

export const PurchaseBottom = () => {

  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await fetch('/api/purchase/purchased-items-details');
        if (!response.ok) {
          throw new Error('Failed to fetch purchase data');
        }
        const data = await response.json();
        // Map API data to table format
        const formattedData = data.map(item => [
          item.supply_order_id,
          item.name,
          new Date(item.order_date).toISOString().split('T')[0], // Format date to YYYY-MM-DD
          item.supplier_name,
          item.quantity, // Assuming quantity is a string or can be displayed as is
          `Rs. ${item.price.toLocaleString()}` // Format price with Rs. and commas
        ]);
        setPurchaseData(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPurchaseData();
  }, []);

  return (
    <div className="bg-blue-100 rounded shadow overflow-x-auto mt-6">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="bg-blue-200 text-left">
            <th className="px-4 py-2">Purch. ID</th>
            <th className="px-4 py-2">Item name</th>
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">SUPPlier</th>
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

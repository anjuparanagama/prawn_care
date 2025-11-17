'use client';

import { FaChartLine, FaBox, FaExclamationTriangle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function DashboardCards() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);

  // State to hold previous values for calculations
  const [prevTotalRevenue, setPrevTotalRevenue] = useState(0);
  const [prevNewOrders, setPrevNewOrders] = useState(0);
  const [prevLowStockItems, setPrevLowStockItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch revenue
      const revenueResponse = await fetch('/api/dashboard/revenue');
      const revenueData = await revenueResponse.json();
      const newTotalRevenue = revenueData.totalRevenue;

      // Fetch new orders
      const ordersResponse = await fetch('/api/dashboard/orders');
      const ordersData = await ordersResponse.json();
      const newNewOrders = ordersData.newOrders;

      // Fetch low stock items
      const stockResponse = await fetch('/api/dashboard/low-stock');
      const stockData = await stockResponse.json();
      const newLowStockItems = stockData.lowStockItems;

      // Update previous values before setting new values
      setPrevTotalRevenue(totalRevenue);
      setPrevNewOrders(newOrders);
      setPrevLowStockItems(lowStockItems);

      // Set new values
      setTotalRevenue(newTotalRevenue);
      setNewOrders(newNewOrders);
      setLowStockItems(newLowStockItems);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Revenue */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-500">Total Revenue</h4>
          <FaChartLine className="text-xl text-blue-500" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">{totalRevenue}</p>
          <span className="text-xs text-blue-500">+{revenueChange.toFixed(2)}%</span>
        </div>
      </div>

      {/* New Orders */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-500">New Orders</h4>
          <FaBox className="text-xl text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">{newOrders}</p>
          <span className="text-xs text-green-500">+{ordersChange.toFixed(2)}%</span>
        </div>
      </div>

      {/* Low Stock Items */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-500">Low Stock Items</h4>
          <FaExclamationTriangle className="text-xl text-red-500" />
        </div>
        <div className="flex items-center justify-between"> 
          <p className="text-xl font-bold">{lowStockItems}</p>
          <span className="text-xs text-red-500">{stockChange} items</span>
        </div>
      </div>
    </div>
  );
}

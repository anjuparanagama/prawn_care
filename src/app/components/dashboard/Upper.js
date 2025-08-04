'use client';

import { FaChartLine, FaBox, FaExclamationTriangle } from "react-icons/fa";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Revenue */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-500">Total Revenue</h4>
          <FaChartLine className="text-xl text-blue-500" />
        </div>
        <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Rs. 100,000</p>
        <span className="text-xs text-blue-500">+50.5%</span>
        </div>
      </div>

      {/* New Orders */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-500">New Orders</h4>
          <FaBox className="text-xl text-green-500" />
        </div>
        <div className="flex items-center justify-between">
        <p className="text-xl font-bold">20</p>
        <span className="text-xs text-green-500">+18.2%</span></div>
      </div>

      {/* Low Stock Items */}
      <div className="p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-gray-500">Low Stock Items</h4>
          <FaExclamationTriangle className="text-xl text-red-500" />
        </div>
        <div className="flex items-center justify-between"> 
        <p className="text-xl font-bold">3</p>
        <span className="text-xs text-red-500">-2 items</span>
        </div>
      </div>
    </div>
  );
}

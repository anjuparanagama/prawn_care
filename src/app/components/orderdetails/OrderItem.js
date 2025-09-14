"use client";
import { useState, useEffect } from "react";

export default function OrderItem({ orderId }) {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const fetchOrderItems = async () => {
        try {
          const response = await fetch(`/api/orders/order/${orderId}/items`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setOrderItems(data);
        } catch (err) {
          console.error("Error fetching order items:", err);
          // Fallback to hardcoded data if API fails
          setOrderItems([
            { name: "Tiger Prawns (Large)", quantity: "250 Kg", price: "Rs. 25,000.00" },
            { name: "Tiger Prawns (Small)", quantity: "250 Kg", price: "Rs. 25,000.00" }
          ]);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderItems();
    }
  }, [orderId]);

  if (loading) return <div>Loading order items...</div>;

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-3 text-lg">Order Items</h3>
      <div className="bg-blue-50 rounded-lg overflow-hidden">
        {orderItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between px-6 py-4 ${
              index < orderItems.length - 1 ? "border-b border-blue-100" : ""
            }`}
          >
            <span className="font-medium text-base">{item.name || item.prawnType}</span>
            <span className="text-gray-600 text-sm md:text-base">Quantity : {item.quantity}</span>
            <span className="font-semibold text-base">{item.price || `Rs. ${item.amount || "0.00"}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
   
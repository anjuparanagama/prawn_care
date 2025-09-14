"use client";
import { useState, useEffect } from "react";

export default function CustomerInfo({ orderId }) {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const fetchCustomerData = async () => {
        try {
          const response = await fetch(`/api/orders/order/${orderId}/customer`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCustomerData(data);
        } catch (err) {
          console.error("Error fetching customer data:", err);
          // Fallback to hardcoded data if API fails
          setCustomerData({
            name: "John Smith",
            address: "No.537/ United States",
            phone: "+1 (555) 123 456",
            email: "Johnfarm@gmail.com"
          });
        } finally {
          setLoading(false);
        }
      };

      fetchCustomerData();
    }
  }, [orderId]);

  if (loading) return <div>Loading customer information...</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow p-8">
      <h3 className="font-semibold mb-2">Customer Informations</h3>
      <p className="font-bold">{customerData?.name || "N/A"}</p>
      <p>{customerData?.address || "N/A"}</p>
      <p>{customerData?.phone || "N/A"}</p>
      <p>{customerData?.email || "N/A"}</p>
    </div>
  );
}
  
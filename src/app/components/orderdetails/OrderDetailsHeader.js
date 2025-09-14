"use client";
import { FaFileInvoice, FaPrint, FaDownload } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function OrderDetailsHeader({ orderId }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const fetchOrderData = async () => {
        try {
          const response = await fetch(`/api/orders/order/${orderId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          data.paymentStatus = data.paymentReceipt ? "Paid" : "Pending";
          setOrderData(data);
        } catch (err) {
          console.error("Error fetching order data:", err);
          // Fallback to hardcoded data if API fails
          setOrderData({
            orderId: orderId,
            orderDate: "05 April, 2025 09.30 am",
            paymentStatus: "Pending",
            paymentMethod: "Online Payment"
          });
        } finally {
          setLoading(false);
        }
      };

      fetchOrderData();
    }
  }, [orderId]);
  if (loading) return <div>Loading order details...</div>;

  return (
    <>
      {/* Header row: title + button group */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Order Details</h2>
        <div className="inline-flex gap-2">
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <FaFileInvoice className="w-4 h-4" />
            Invoice
          </button>
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <FaPrint className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-bold text-lg">#{orderData?.orderId || orderId}</p>
          <p className="text-sm text-gray-600 mt-2">Payment Status:</p>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
            orderData?.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {orderData?.paymentStatus || "Pending"}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-600">Order date</p>
          <p className="font-bold text-lg">{orderData?.orderDate ? (() => {
            const date = new Date(orderData.orderDate);
            return `${date.getFullYear()}-${date.toLocaleString('default', { month: 'long' })}-${date.getDate().toString().padStart(2, '0')}`;
          })() : "Loading..."}</p>
          {orderData?.paymentReceipt ? (
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = `/api/orders/order/${orderId}/receipt`;
                const ext = orderData.paymentReceipt.split('.').pop();
                link.download = `receipt_${orderId}.${ext}`;
                link.click();
              }}
              className="mt-4 flex items-center gap-2 text-blue-600 py-2 text-sm font-medium hover:text-blue-700 transition cursor-pointer"
            >
              <FaDownload className="w-4 h-4" />
              Download Payment Receipt
            </button>
          ) : (
            <p className="text-sm text-gray-600 mt-2">No receipt available</p>
          )}
        </div>
      </div>
      {/* Divider */}
      <hr className="my-6" />
      {/* Order Items header will go here in your main page */}
    </>
  );
}

"use client";
import { useState, useEffect } from "react";

export default function OrderStatus({ orderId }) {
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [approvedOrRejected, setApprovedOrRejected] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrderStatus = async () => {
        try {
          const response = await fetch(`/api/orders/order/${orderId}/status`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setOrderStatus(data.status || "Pending");
        } catch (err) {
          console.error("Error fetching order status:", err);
        }
      };

      const fetchApprovalStatus = async () => {
        try {
          const response = await fetch(`/api/orders/order/${orderId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setApprovedOrRejected(data.approved_or_rejected || null);
        } catch (err) {
          console.error("Error fetching approval status:", err);
        }
      };

      const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchOrderStatus(), fetchApprovalStatus()]);
        setLoading(false);
      };

      fetchData();
    }
  }, [orderId]);

  const handleAction = async (action) => {
    setActionLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/order/${orderId}/approve_reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update order status");
      }
      setApprovedOrRejected(action);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading order status...</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow p-8">
      <h3 className="font-semibold mb-2">Order Status</h3>
      <p className="mb-4">Current Status: <strong>{orderStatus}</strong></p>
      {(orderStatus === "New" || orderStatus === "Processing") && !approvedOrRejected && (
        <div className="flex items-center space-x-4">
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            disabled={actionLoading}
          >
            <option value="">Select Action</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
            onClick={() => selectedAction && handleAction(selectedAction)}
            disabled={actionLoading || !selectedAction}
          >
            Submit
          </button>
        </div>
      )}
      {approvedOrRejected && (
        <p className="mt-4 font-semibold">
          Order has been {approvedOrRejected}.
        </p>
      )}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
    </div>
  );
}

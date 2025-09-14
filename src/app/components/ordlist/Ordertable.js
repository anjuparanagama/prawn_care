"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Searchbar from "./Searchbar"; // Adjust the import path as necessary


function createData(Order_ID, Customer, PrawnType, Status, Amount, Quantity) {
    return { Order_ID, Customer, PrawnType, Status, Amount, Quantity };
}

export default function OrderTable() {
    const router = useRouter();
    const [rows, setRows] = useState([]); // Initialize as an empty array
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/orders/order-table");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched orders data:", data); // Debug log
                
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received");
                }
                
                const formattedData = data.map(order =>
                    createData(
                        order.Order_ID || order.order_id,
                        order.Customer || order.customer,
                        order.PrawnType || order.prawnType,
                        order.Status || order.status,
                        order.Amount || order.amount,
                        order.Quantity || order.quantity
                    )
                );
                setRows(formattedData);
                setFilteredRows(formattedData);
            } catch (err) {
                setError(`Error fetching orders: ${err.message}`);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleFilter = ({ searchTerm, selectedStatus }) => {
        const filtered = rows.filter((row) => {
            const matchesSearchTerm = row.Customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      row.Order_ID.toString().includes(searchTerm);
            const matchesStatus = selectedStatus ? row.Status === selectedStatus : true;
            return matchesSearchTerm && matchesStatus;
        });
        setFilteredRows(filtered);
    };

    const handleRowClick = (orderId) => {
        router.push(`/Orders/${orderId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-[1200px] mx-5 px-6 p-3">
            <Searchbar onFilter={handleFilter} />
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-blue-100 text-black">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    PRAWN TYPE
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
                                    key={row.Order_ID ? String(row.Order_ID) : `fallback-${index}`}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                                    onClick={() => handleRowClick(row.Order_ID)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {row.Order_ID}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {row.Customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {row.PrawnType}
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

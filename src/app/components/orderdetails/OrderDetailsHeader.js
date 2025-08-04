import { FaFileInvoice, FaPrint } from "react-icons/fa";

export default function OrderDetailsHeader() {
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
          <p className="font-bold text-lg">#ORD_01</p>
          <p className="text-sm text-gray-600 mt-2">Payment Status:</p>
          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Paid
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-600">Order date</p>
          <p className="font-bold text-lg">05 April , 2025 09.30 am</p>
          <p className="text-sm text-gray-600 mt-2">Payment Method</p>
          <p className="font-semibold">Online Payment</p>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-6" />
      {/* Order Items header will go here in your main page */}
    </>
  );
}

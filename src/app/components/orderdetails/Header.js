import { FaFileInvoice, FaPrint } from "react-icons/fa";

export default function Header() {
  return (
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
  );
}

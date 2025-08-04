export default function OrderStatus() {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow p-8">
        <h3 className="font-semibold mb-2">Order Status</h3>
        <select className="border p-2 w-full rounded mb-4">
          <option>Approved</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold">
          Approve Order
        </button>
      </div>
    );
  }
  
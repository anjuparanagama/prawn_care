export default function OrderItem() {
    return (
      <div className="mt-4">
        <h3 className="font-semibold mb-3 text-lg">Order Items</h3>
        <div className="bg-blue-50 rounded-lg overflow-hidden">
          {/* First item */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-blue-100">
            <span className="font-medium text-base">Tiger Prawns (Large)</span>
            <span className="text-gray-600 text-sm md:text-base">Quantity : 250 Kg</span>
            <span className="font-semibold text-base">Rs. 25,000.00</span>
          </div>
          {/* Second item */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
            <span className="font-medium text-base">Tiger Prawns (Small)</span>
            <span className="text-gray-600 text-sm md:text-base">Quantity : 250 Kg</span>
            <span className="font-semibold text-base">Rs. 25,000.00</span>
          </div>
        </div>
      </div>
    );
  }
   
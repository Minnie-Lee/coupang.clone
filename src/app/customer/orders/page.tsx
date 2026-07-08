export default function CustomerOrders() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-md">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y">
          {/* Order Item */}
          <div className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Order #ORD-001</h3>
                <p className="text-sm text-gray-500">July 8, 2026</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Delivered
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Product Name</p>
                  <p className="text-sm text-gray-500">Vendor: ABC Store</p>
                  <p className="text-sm text-gray-500">Qty: 2 × ₩50,000</p>
                </div>
                <p className="font-semibold text-gray-900">₩100,000</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Subtotal: ₩100,000</p>
                <p className="text-sm text-gray-500">Shipping: ₩3,000</p>
                <p className="font-semibold text-gray-900">Total: ₩103,000</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

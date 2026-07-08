export default function OrderDetail() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order #ORD-001</h2>
      
      <div className="space-y-6">
        {/* Order Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Order Status</h3>
              <p className="text-sm text-gray-500">Last updated: July 8, 2026</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
              Delivered
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>Order Placed</span>
            <span>Processing</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>
        
        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Shipping Information</h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Recipient:</span> John Doe
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> 010-1234-5678
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Address:</span> 123 Main St, Seoul, South Korea
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Tracking Number:</span> KR123456789
            </p>
          </div>
        </div>
        
        {/* Order Items by Vendor */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
          
          <div className="space-y-6">
            {/* Vendor Group */}
            <div>
              <div className="flex items-center space-x-2 mb-4 pb-4 border-b">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">A</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">ABC Store</p>
                  <p className="text-sm text-gray-500">Vendor</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Product Name 1</p>
                    <p className="text-sm text-gray-500">Qty: 2</p>
                    <p className="text-sm text-gray-500">₩50,000 each</p>
                  </div>
                  <p className="font-semibold text-gray-900">₩100,000</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₩100,000</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping Fee</span>
              <span>₩3,000</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-lg mt-2">
              <span>Total</span>
              <span>₩103,000</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Contact Support
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
}

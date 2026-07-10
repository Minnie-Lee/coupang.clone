export default function SellerSettlements() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settlement History</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Settlement Summary</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium text-gray-900">Total Sales</p>
              <p className="text-sm text-gray-500">Lifetime</p>
            </div>
            <p className="text-xl font-bold text-blue-600">₩0</p>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium text-gray-900">Commission</p>
              <p className="text-sm text-gray-500">10% of sales</p>
            </div>
            <p className="text-xl font-bold text-red-600">₩0</p>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
            <div>
              <p className="font-medium text-gray-900">Net Amount</p>
              <p className="text-sm text-gray-500">After commission</p>
            </div>
            <p className="text-xl font-bold text-green-600">₩0</p>
          </div>
        </div>
        
        <p className="text-gray-500 mt-6">No settlement history</p>
      </div>
    </div>
  );
}

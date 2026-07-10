export default function SellerInventory() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Stock Levels</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Bulk Update
          </button>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <p className="text-yellow-800">⚠️ No low stock alerts</p>
        </div>
        
        <p className="text-gray-500">No inventory data</p>
      </div>
    </div>
  );
}

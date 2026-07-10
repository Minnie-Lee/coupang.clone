export default function AdminProducts() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Monitoring</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Category Distribution</h3>
          <p className="text-gray-500">No data available</p>
        </div>
        
        <p className="text-gray-500">No products found</p>
      </div>
    </div>
  );
}

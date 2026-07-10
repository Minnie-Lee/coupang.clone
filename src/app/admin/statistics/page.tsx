export default function AdminStatistics() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics & Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Analysis</h3>
          <p className="text-gray-500">No sales data available</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Performance</h3>
          <p className="text-gray-500">No vendor data available</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Behavior</h3>
          <p className="text-gray-500">No customer data available</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Server Status</span>
              <span className="text-green-600">Healthy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">API Response</span>
              <span className="text-green-600">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

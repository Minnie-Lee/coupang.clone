export default function AdminVendors() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Management</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
              Pending
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
              Approved
            </button>
            <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">
              Suspended
            </button>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <p className="text-yellow-800">⚠️ No pending vendor approvals</p>
        </div>
        
        <p className="text-gray-500">No vendors found</p>
      </div>
    </div>
  );
}

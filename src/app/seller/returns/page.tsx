export default function SellerReturns() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Return & Refund Management</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Return Requests</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm">
              Pending
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
              Approved
            </button>
            <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">
              Rejected
            </button>
          </div>
        </div>
        
        <p className="text-gray-500">No return requests</p>
      </div>
    </div>
  );
}

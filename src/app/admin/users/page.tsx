export default function AdminUsers() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4 flex space-x-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
            All
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
            Customers
          </button>
          <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
            Sellers
          </button>
          <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm">
            Admins
          </button>
        </div>
        
        <p className="text-gray-500">No users found</p>
      </div>
    </div>
  );
}

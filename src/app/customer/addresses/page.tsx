export default function CustomerAddresses() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Addresses</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add New Address
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Address Card */}
        <div className="bg-white rounded-lg shadow p-6 border-2 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Default
                </span>
              </div>
              <p className="text-gray-600">010-1234-5678</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
            </div>
          </div>
          <div className="text-gray-700">
            <p>123 Main St, Apt 456</p>
            <p>Seoul, South Korea</p>
            <p>12345</p>
          </div>
        </div>
        
        {/* Another Address Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Jane Doe</h3>
              <p className="text-gray-600">010-9876-5432</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
              <button className="text-green-600 hover:text-green-800 text-sm">
                Set as Default
              </button>
            </div>
          </div>
          <div className="text-gray-700">
            <p>789 Oak Ave</p>
            <p>Busan, South Korea</p>
            <p>67890</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerRecommendations() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
      
      <div className="space-y-8">
        {/* Based on Purchase History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Based on Your Purchase History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-semibold">A</span>
                  </div>
                  <span className="text-xs text-gray-500">ABC Store</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Product Name</h4>
                <p className="text-sm font-bold text-gray-900">₩50,000</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Based on Wishlist */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Based on Your Wishlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs font-semibold">B</span>
                  </div>
                  <span className="text-xs text-gray-500">XYZ Store</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Product Name</h4>
                <p className="text-sm font-bold text-gray-900">₩75,000</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Products */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-semibold">C</span>
                  </div>
                  <span className="text-xs text-gray-500">123 Store</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Product Name</h4>
                <p className="text-sm font-bold text-gray-900">₩120,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

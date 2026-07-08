export default function CustomerWishlist() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wishlist Item */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-semibold">A</span>
              </div>
              <span className="text-sm text-gray-500">ABC Store</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Product Name</h3>
            <p className="text-lg font-bold text-gray-900 mb-4">₩50,000</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Add to Cart
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>
        
        {/* More items would be rendered here */}
      </div>
      
      {false && (
        <div className="text-center py-12">
          <p className="text-gray-500">Your wishlist is empty</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}

export default function SellerPricing() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Promotions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Adjustments</h3>
          <p className="text-gray-500">No price adjustments</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discount Rules</h3>
          <p className="text-gray-500">No discount rules configured</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Promotion Campaigns</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Campaign
          </button>
          <p className="text-gray-500 mt-4">No active campaigns</p>
        </div>
      </div>
    </div>
  );
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">Seller Portal</h1>
            <div className="flex space-x-4">
              <a href="/seller/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/seller/products" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
              <a href="/seller/inventory" className="text-gray-600 hover:text-gray-900">
                Inventory
              </a>
              <a href="/seller/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="/seller/settlements" className="text-gray-600 hover:text-gray-900">
                Settlements
              </a>
              <a href="/seller/returns" className="text-gray-600 hover:text-gray-900">
                Returns
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

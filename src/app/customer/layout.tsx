export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">Customer Portal</h1>
            <div className="flex space-x-4">
              <a href="/customer/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </a>
              <a href="/customer/orders" className="text-gray-600 hover:text-gray-900">
                Orders
              </a>
              <a href="/customer/wishlist" className="text-gray-600 hover:text-gray-900">
                Wishlist
              </a>
              <a href="/customer/addresses" className="text-gray-600 hover:text-gray-900">
                Addresses
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

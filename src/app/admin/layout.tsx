export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
            <div className="flex space-x-4">
              <a href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/admin/vendors" className="text-gray-600 hover:text-gray-900">
                Vendors
              </a>
              <a href="/admin/products" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
              <a href="/admin/users" className="text-gray-600 hover:text-gray-900">
                Users
              </a>
              <a href="/admin/permissions" className="text-gray-600 hover:text-gray-900">
                Permissions
              </a>
              <a href="/admin/statistics" className="text-gray-600 hover:text-gray-900">
                Statistics
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

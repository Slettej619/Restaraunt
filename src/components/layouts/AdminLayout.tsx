import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeProvider';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const primaryColor = theme?.brand_identity.colors.primary || '#333';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>Jules Admin</h1>
          <p className="text-xs text-gray-500">Unified Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100 font-medium text-gray-700">
            Dashboard
          </Link>
          <Link href="/admin/pos" className="block px-4 py-2 rounded hover:bg-gray-100 font-medium text-gray-700">
            POS Terminal
          </Link>
          <Link href="/admin/inventory" className="block px-4 py-2 rounded hover:bg-gray-100 font-medium text-gray-700">
            Inventory & Menu
          </Link>
          <Link href="/admin/staff" className="block px-4 py-2 rounded hover:bg-gray-100 font-medium text-gray-700">
            Staff & Roles
          </Link>
          <Link href="/admin/builder" className="block px-4 py-2 rounded hover:bg-gray-100 font-medium text-gray-700">
            Menu Builder
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button className="w-full py-2 text-sm text-red-600 hover:text-red-800">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};

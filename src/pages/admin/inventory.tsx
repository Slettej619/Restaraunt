import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';

const MOCK_INVENTORY = [
  { id: '1', name: 'Classic Burger', price: 12.99, stock: 45, category: 'Mains', status: 'Active' },
  { id: '2', name: 'Veggie Taco', price: 9.50, stock: 12, category: 'Mains', status: 'Low Stock' },
  { id: '3', name: 'Spicy Poke Bowl', price: 14.99, stock: 8, category: 'Mains', status: 'Active' },
  { id: '4', name: 'Fries', price: 4.50, stock: 200, category: 'Sides', status: 'Active' },
  { id: '5', name: 'Cola', price: 2.50, stock: 50, category: 'Drinks', status: 'Active' },
];

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = MOCK_INVENTORY.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add New Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/3 px-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock Level</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-gray-500">{item.category}</td>
                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Low Stock' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

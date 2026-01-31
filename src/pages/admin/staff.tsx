import React from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';

const MOCK_STAFF = [
  { id: '1', name: 'John Doe', role: 'Manager', email: 'john@bistro.com', status: 'Active' },
  { id: '2', name: 'Jane Smith', role: 'Cashier', email: 'jane@bistro.com', status: 'On Shift' },
  { id: '3', name: 'Mike Ross', role: 'Chef', email: 'mike@bistro.com', status: 'Offline' },
];

export default function StaffManagement() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff & Roles</h1>
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
          + Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_STAFF.map(staff => (
          <div key={staff.id} className="bg-white p-6 rounded-lg shadow border flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
              {staff.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{staff.name}</h3>
              <p className="text-sm text-gray-500">{staff.role}</p>
              <div className="flex items-center mt-1">
                <div className={`h-2 w-2 rounded-full mr-2 ${staff.status === 'On Shift' ? 'bg-green-500' : staff.status === 'Active' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-400">{staff.status}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
               ...
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4">Role Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 border rounded bg-gray-50">
                  <h3 className="font-bold mb-2">Manager</h3>
                  <ul className="list-disc list-inside text-gray-600">
                      <li>Full POS Access</li>
                      <li>Inventory Edit</li>
                      <li>Financial Reports</li>
                      <li>Staff Scheduling</li>
                  </ul>
              </div>
              <div className="p-4 border rounded bg-gray-50">
                  <h3 className="font-bold mb-2">Cashier</h3>
                  <ul className="list-disc list-inside text-gray-600">
                      <li>POS Access</li>
                      <li>Void Transaction (Limit $50)</li>
                      <li>View Menu</li>
                  </ul>
              </div>
               <div className="p-4 border rounded bg-gray-50">
                  <h3 className="font-bold mb-2">Kitchen</h3>
                  <ul className="list-disc list-inside text-gray-600">
                      <li>KDS View Only</li>
                      <li>Mark Item Complete</li>
                  </ul>
              </div>
          </div>
      </div>
    </AdminLayout>
  );
}

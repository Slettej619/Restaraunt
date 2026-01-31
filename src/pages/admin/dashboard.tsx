import React from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Sales", value: "$12,450", change: "+12%" },
          { title: "Active Orders", value: "24", change: "Live" },
          { title: "Inventory Alerts", value: "3 Items", change: "Low Stock" },
          { title: "Staff Active", value: "8", change: "On Shift" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
            <span className={`text-xs font-bold px-2 py-1 rounded mt-2 inline-block ${card.change.includes('+') || card.change === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {card.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border h-96">
          <h2 className="text-xl font-bold mb-4">Sales Analytics</h2>
          <div className="flex items-center justify-center h-full text-gray-400">
            [Chart Component Placeholder]
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border h-96">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <ul className="space-y-4">
             {[1,2,3,4,5].map(i => (
                 <li key={i} className="flex justify-between border-b pb-2">
                     <span>Order #{1000 + i}</span>
                     <span className="font-bold">$45.00</span>
                 </li>
             ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

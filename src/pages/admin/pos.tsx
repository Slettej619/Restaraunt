import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { useCartStore } from '../../lib/store';
import { useTheme } from '../../contexts/ThemeProvider';

// Reusing MOCK_MENU from MenuViewer for now, ideally this comes from a shared hook
const POS_MENU = [
  { id: '1', name: 'Classic Burger', price: 12.99, category: 'Mains' },
  { id: '2', name: 'Veggie Taco', price: 9.50, category: 'Mains' },
  { id: '3', name: 'Spicy Poke Bowl', price: 14.99, category: 'Mains' },
  { id: '4', name: 'Fries', price: 4.50, category: 'Sides' },
  { id: '5', name: 'Cola', price: 2.50, category: 'Drinks' },
];

export default function POSTerminal() {
  const { items, total, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
  const { theme } = useTheme();
  const [splitCount, setSplitCount] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(POS_MENU.map(i => i.category)))];
  const filteredMenu = activeCategory === 'All' ? POS_MENU : POS_MENU.filter(i => i.category === activeCategory);

  const handleTransaction = async () => {
      // Call the API we built earlier
      const response = await fetch('/api/pos/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              items: items.map(i => ({ price: i.price, quantity: i.quantity, taxable: true })),
              tip_percentage: 0,
              split_count: splitCount
          })
      });
      const data = await response.json();
      alert(`Transaction Processed!\nTotal: $${data.total}\nPer Person: $${data.per_person_share}`);
      clearCart();
  };

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-100px)] gap-6">
        {/* Menu Grid */}
        <div className="flex-1 flex flex-col">
           <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
               {categories.map(cat => (
                   <button
                       key={cat}
                       onClick={() => setActiveCategory(cat)}
                       className={`px-4 py-2 rounded-full border ${activeCategory === cat ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                   >
                       {cat}
                   </button>
               ))}
           </div>
           <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2">
               {filteredMenu.map(item => (
                   <button
                       key={item.id}
                       onClick={() => addItem({ ...item, quantity: 1 })}
                       className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-start h-32 justify-between"
                   >
                       <span className="font-bold text-lg">{item.name}</span>
                       <span className="text-gray-500">${item.price.toFixed(2)}</span>
                   </button>
               ))}
           </div>
        </div>

        {/* Current Order / Bill */}
        <div className="w-96 bg-white shadow-lg rounded-lg flex flex-col">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                <h2 className="text-xl font-bold">Current Order</h2>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>Table #4</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {items.length === 0 && <p className="text-center text-gray-400 mt-10">No items added.</p>}
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">${item.price} x {item.quantity}</div>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                             <button onClick={() => removeItem(item.id)} className="text-red-500">x</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="mb-4">
                    <label className="text-sm block mb-1">Split Bill</label>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setSplitCount(Math.max(1, splitCount - 1))} className="bg-gray-200 px-3 rounded">-</button>
                        <span className="font-bold">{splitCount}</span>
                        <button onClick={() => setSplitCount(splitCount + 1)} className="bg-gray-200 px-3 rounded">+</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button className="py-3 bg-red-100 text-red-700 rounded font-bold" onClick={clearCart}>
                        Cancel
                    </button>
                    <button
                        className="py-3 bg-green-600 text-white rounded font-bold"
                        onClick={handleTransaction}
                    >
                        Charge
                    </button>
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

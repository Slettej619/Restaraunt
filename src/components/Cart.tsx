import React from 'react';
import { useCartStore } from '../lib/store';
import { useTheme } from '../contexts/ThemeProvider';

// Merging logic from QuickCart (structure) and yuiyuuuu (Redux-style updates)
export const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem } = useCartStore();
  const { theme } = useTheme();

  // Styles derived from theme or default
  const primaryColor = theme?.brand_identity.colors.primary || '#000';
  const glassLevel = theme?.brand_identity.ux_tokens.glassmorphism || 'none';

  return (
    <div className={`p-4 rounded-lg shadow-xl ${glassLevel === 'medium' ? 'backdrop-blur-md bg-white/30' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>Your Order</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center space-x-2">
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded object-cover" />}
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  {item.mods && item.mods.length > 0 && (
                      <p className="text-xs text-gray-500 italic">{item.mods.join(', ')}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >-</button>
                <span>{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >+</button>
                <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                >x</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
            className="w-full mt-4 py-3 text-white font-bold rounded-lg transition-colors"
            style={{ backgroundColor: primaryColor }}
        >
          Checkout with Google Pay
        </button>
      </div>
    </div>
  );
};

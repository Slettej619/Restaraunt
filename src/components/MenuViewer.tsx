import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../contexts/ThemeProvider';
import { useCartStore } from '../lib/store';

// Mock Data - in real life this comes from Firestore
const MOCK_MENU = [
  { id: '1', name: 'Classic Burger', price: 12.99, description: 'Juicy beef patty', image: '/assets/burger.png', model: '/assets/burger.glb' },
  { id: '2', name: 'Veggie Taco', price: 9.50, description: 'Fresh seasonal veggies', image: '/assets/taco.png', model: '/assets/taco.glb' },
  { id: '3', name: 'Spicy Poke Bowl', price: 14.99, description: 'Tuna, spicy mayo', image: '/assets/poke.png', model: '/assets/poke.glb' },
];

const ModelViewer = ({ modelPath }: { modelPath: string }) => {
  return (
    <mesh rotation={[0, Date.now() / 1000, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export const MenuViewer: React.FC = () => {
  const { theme, loading } = useTheme();
  const { addItem } = useCartStore();
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  useEffect(() => {
    if (theme?.modules?.r3f_menu) {
      setViewMode('3d');
    } else {
        setViewMode('2d');
    }
  }, [theme]);

  if (loading) return <div>Loading Experience...</div>;

  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: theme?.brand_identity.typography.font_family_heading }}>
          Menu
        </h1>
        {theme?.modules?.r3f_menu && (
            <button
                onClick={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
                className="px-4 py-2 border rounded"
            >
                Switch to {viewMode === '2d' ? '3D' : '2D'}
            </button>
        )}
      </div>

      {viewMode === '3d' && theme?.modules?.r3f_menu ? (
        <div className="w-full h-96 bg-gray-100 rounded-lg mb-8 relative">
           <Canvas>
             <ambientLight intensity={0.5} />
             <pointLight position={[10, 10, 10]} />
             <ModelViewer modelPath={MOCK_MENU[0].model} />
           </Canvas>
           <div className="absolute bottom-4 left-4 text-sm text-gray-500">
               * Interactive Volumetric Menu (Placeholder Cube)
           </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MENU.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Fallback image if 3D not active or just thumbnail */}
                <span className="text-gray-400">Image: {item.name}</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price}</span>
                <button
                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price, quantity: 1 })}
                    className="px-4 py-2 text-white rounded transition-transform hover:scale-105"
                    style={{ backgroundColor: theme?.brand_identity.colors.primary }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

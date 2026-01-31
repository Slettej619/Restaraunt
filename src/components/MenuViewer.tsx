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

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(MOCK_MENU.map(i => 'Mains')))]; // Mock category for now

  const filteredMenu = MOCK_MENU.filter(item => {
      const matchesTab = activeTab === 'All' || 'Mains' === activeTab; // Mock category check
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
  });

  if (loading) return <div>Loading Experience...</div>;

  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold" style={{ fontFamily: theme?.brand_identity.typography.font_family_heading }}>
          Menu
        </h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-full bg-gray-50 flex-1"
            />
            {theme?.modules?.r3f_menu && (
                <button
                    onClick={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
                    className="px-4 py-2 border rounded whitespace-nowrap"
                >
                    {viewMode === '2d' ? '3D View' : '2D View'}
                </button>
            )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === cat ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={{ backgroundColor: activeTab === cat ? theme?.brand_identity.colors.primary : undefined }}
              >
                  {cat}
              </button>
          ))}
      </div>

      {viewMode === '3d' && theme?.modules?.r3f_menu ? (
        <div className="w-full h-96 bg-gray-100 rounded-lg mb-8 relative border-4 border-white shadow-xl overflow-hidden">
           <Canvas>
             <ambientLight intensity={0.5} />
             <pointLight position={[10, 10, 10]} />
             <ModelViewer modelPath={MOCK_MENU[0].model} />
           </Canvas>
           <div className="absolute bottom-4 left-4 text-sm text-gray-500 bg-white/80 px-2 py-1 rounded backdrop-blur">
               Drag to rotate • Pinch to zoom
           </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg bg-white group hover:shadow-xl transition-all">
            <div className="h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
                {/* Simulated Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                     <span className="text-white font-bold">Quick View</span>
                </div>
                <span className="text-gray-400">Image: {item.name}</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price}</span>
                <button
                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price, quantity: 1 })}
                    className="px-4 py-2 text-white rounded-lg font-medium transition-transform active:scale-95"
                    style={{ backgroundColor: theme?.brand_identity.colors.primary }}
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

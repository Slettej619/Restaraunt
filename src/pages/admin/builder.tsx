import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { useTheme } from '../../contexts/ThemeProvider';

export default function MenuBuilder() {
  const { theme } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme || {
    brand_identity: {
      colors: { primary: '#000000', secondary: '#ffffff' },
      typography: { font_family_heading: 'Inter', font_family_body: 'Inter' }
    }
  });

  const handleColorChange = (key: string, value: string) => {
    setLocalTheme({
      ...localTheme,
      brand_identity: {
        ...localTheme.brand_identity,
        colors: {
          ...localTheme.brand_identity.colors,
          [key]: value
        }
      }
    });
  };

  const handleSave = async () => {
    // Call the theme update API
    const res = await fetch('/api/theme/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localTheme)
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Visual Menu Builder</h1>
        <div className="space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">Preview</button>
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Publish Changes
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-1 space-y-6">
           {/* Brand Colors */}
           <div className="bg-white p-6 rounded shadow border">
               <h3 className="font-bold mb-4">Brand Identity</h3>
               <div className="space-y-4">
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                       <div className="flex items-center mt-1">
                           <input
                               type="color"
                               value={localTheme.brand_identity.colors.primary}
                               onChange={(e) => handleColorChange('primary', e.target.value)}
                               className="h-8 w-8 rounded overflow-hidden border-0 p-0"
                           />
                           <input
                               type="text"
                               value={localTheme.brand_identity.colors.primary}
                               onChange={(e) => handleColorChange('primary', e.target.value)}
                               className="ml-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                       </div>
                   </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                       <div className="flex items-center mt-1">
                           <input
                               type="color"
                               value={localTheme.brand_identity.colors.secondary}
                               onChange={(e) => handleColorChange('secondary', e.target.value)}
                               className="h-8 w-8 rounded overflow-hidden border-0 p-0"
                           />
                           <input
                               type="text"
                               value={localTheme.brand_identity.colors.secondary}
                               onChange={(e) => handleColorChange('secondary', e.target.value)}
                               className="ml-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                       </div>
                   </div>
               </div>
           </div>

           {/* Typography */}
           <div className="bg-white p-6 rounded shadow border">
               <h3 className="font-bold mb-4">Typography</h3>
               <div className="space-y-4">
                   <div>
                       <label className="block text-sm font-medium text-gray-700">Heading Font</label>
                       <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                           <option>Inter</option>
                           <option>Bebas Neue</option>
                           <option>Playfair Display</option>
                           <option>Roboto Mono</option>
                       </select>
                   </div>
               </div>
           </div>

           {/* Modules */}
           <div className="bg-white p-6 rounded shadow border">
               <h3 className="font-bold mb-4">Active Modules</h3>
               <div className="space-y-2">
                   <label className="flex items-center space-x-2">
                       <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                       <span>3D Menu (R3F)</span>
                   </label>
                   <label className="flex items-center space-x-2">
                       <input type="checkbox" className="rounded text-indigo-600" />
                       <span>AI Sommelier</span>
                   </label>
                   <label className="flex items-center space-x-2">
                       <input type="checkbox" className="rounded text-indigo-600" />
                       <span>Reviews & Ratings</span>
                   </label>
               </div>
           </div>
        </div>

        {/* Live Preview (Mockup) */}
        <div className="lg:col-span-2 bg-gray-100 rounded-xl border-4 border-gray-300 p-4 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 bg-gray-200 px-2 py-1 rounded text-xs">Live Preview: Mobile</div>

            {/* Phone Frame */}
            <div className="w-[375px] h-[667px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-gray-800 relative">
                {/* Header */}
                <div
                    className="h-16 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: localTheme.brand_identity.colors.primary }}
                >
                    {localTheme.brand_identity.name || 'Your Brand'}
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        Hero Banner
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                         {[1,2,3].map(i => (
                             <div key={i} className="h-20 w-20 bg-gray-50 rounded-lg flex-shrink-0"></div>
                         ))}
                    </div>
                    <div className="space-y-2">
                        {[1,2].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 border rounded">
                                <div className="h-10 w-10 bg-gray-200 rounded"></div>
                                <div className="flex-1 ml-3">
                                    <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
                                    <div className="h-2 bg-gray-100 w-1/4 rounded mt-1"></div>
                                </div>
                                <div
                                    className="h-6 w-16 rounded text-white text-xs flex items-center justify-center"
                                    style={{ backgroundColor: localTheme.brand_identity.colors.primary }}
                                >
                                    Add
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 w-full h-16 border-t bg-white flex justify-around items-center text-xs text-gray-400">
                    <span>Home</span>
                    <span>Menu</span>
                    <span>Cart</span>
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

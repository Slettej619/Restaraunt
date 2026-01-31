import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';

export default function QRGenerator() {
  const [tableNumber, setTableNumber] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleGenerate = () => {
      // In a real app, this would be your production domain
      const baseUrl = 'https://jules-engine.app';
      const url = `${baseUrl}/?table=${tableNumber}`;
      setGeneratedUrl(url);
  };

  const handlePrint = () => {
      window.print();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">QR Code Engine</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white p-6 rounded-lg shadow border flex-1">
            <h2 className="text-xl font-bold mb-4">Generate Table Code</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Table / Location ID</label>
                    <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. 12 or Patio-4"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-2"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={!tableNumber}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300"
                >
                    Generate QR
                </button>
            </div>
        </div>

        {generatedUrl && (
            <div className="bg-white p-6 rounded-lg shadow border flex-1 flex flex-col items-center justify-center text-center">
                <div className="mb-4 p-4 bg-white border-4 border-black rounded-lg inline-block">
                    {/* Placeholder for QR Code since we can't depend on 'qrcode.react' without install */}
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedUrl)}`}
                        alt="QR Code"
                        className="w-48 h-48"
                    />
                </div>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all mb-4">
                    {generatedUrl}
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(generatedUrl)}`;
                            link.download = `table-${tableNumber}.png`;
                            link.target = '_blank';
                            link.click();
                        }}
                        className="text-blue-600 hover:underline"
                    >
                        Download PNG
                    </button>
                    <button
                        onClick={handlePrint}
                        className="text-gray-600 hover:underline"
                    >
                        Print Label
                    </button>
                </div>
            </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">How this works</h3>
          <p className="text-blue-700 text-sm">
              Each QR code appends a <code>?table=ID</code> query parameter to your menu URL.
              The <strong>Order Flow Service</strong> captures this ID and automatically associates any orders placed with that location.
              This enables "Order to Table" functionality without staff intervention.
          </p>
      </div>
    </AdminLayout>
  );
}

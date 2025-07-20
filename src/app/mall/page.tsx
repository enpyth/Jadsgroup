"use client";

import { useState } from "react";
import Image from "next/image";

// Temporary merchant data
const tempMerchants: Merchant[] = [
  {
    id: "merchant-1",
    office_id: "J01",
    rent_price: 10000,
    size: 100,
    name: "Starbucks",
    description: "description",
    state: "occupied" as const,
    position: { x: 80, y: 324, width: 36, height: 24 },
  },
  {
    id: 'merchant-2',
    office_id: 'J02',
    rent_price: 10000,
    size: 100,
    name: 'KFC',
    description: 'description',
    state: 'occupied' as const,
    position: { x: 120, y: 326, width: 34, height: 22 }
  },
  {
    id: 'merchant-3',
    office_id: 'J03',
    rent_price: 10000,
    size: 100,
    name: 'McDonalds',
    description: 'description',
    state: 'occupied' as const,
    position: { x: 159, y: 325, width: 32, height: 22 }
  },
  {
    id: 'merchant-4',
    office_id: 'J04',
    rent_price: 10000,
    size: 100,
    name: 'Pizza Hut',
    description: 'description',
    state: 'occupied' as const,
    position: { x: 191, y: 325, width: 32, height: 22 }
  },
  {
    id: 'merchant-5',
    office_id: 'J05',
    rent_price: 10000,
    size: 100,
    name: 'Subway',
    description: 'description',
    state: 'occupied' as const,
    position: { x: 229, y: 325, width: 32, height: 22 }
  },
  {
    id: 'merchant-6',
    office_id: 'J06',
    rent_price: 10000,
    size: 100,
    name: '',
    description: 'description',
    state: 'available' as const,
    position: { x: 270, y: 294, width: 34, height: 43 }
  },
];

interface Merchant {
  id: string;
  office_id: string;
  rent_price: number;
  size: number;
  name: string;
  description: string;
  state: "available" | "occupied";
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export default function MallPage() {
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setClickPosition({ x, y });

    // Check if the click position is in a merchant area
    const clickedMerchant = tempMerchants.find((merchant) => {
      const { position } = merchant;
      return (
        x >= position.x &&
        x <= position.x + position.width &&
        y >= position.y &&
        y <= position.y + position.height
      );
    });

    setSelectedMerchant(clickedMerchant || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Map of the mall</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative inline-block">
            {/* Mall Map */}
            <div className="relative cursor-pointer" onClick={handleImageClick}>
              <Image
                src="/map-main.png"
                alt="map"
                width={800}
                height={600}
                className="border border-gray-300 rounded-lg"
              />

              {/* Merchant Area Overlay - Only show border when hovering */}
              {tempMerchants.map((merchant) => (
                <div
                  key={merchant.id}
                  className={`absolute border-2 border-transparent hover:border-blue-400 hover:bg-blue-400 hover:bg-opacity-10 transition-all duration-200`}
                  style={{
                    left: `${merchant.position.x}px`,
                    top: `${merchant.position.y}px`,
                    width: `${merchant.position.width}px`,
                    height: `${merchant.position.height}px`,
                  }}
                  title={`Click to view ${merchant.office_id} details`}
                />
              ))}

              {/* Click Position Indicator */}
              {clickPosition && (
                <div
                  className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg pointer-events-none"
                  style={{
                    left: `${clickPosition.x - 8}px`,
                    top: `${clickPosition.y - 8}px`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Merchant Information */}
          {selectedMerchant && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-900">
                  {selectedMerchant.office_id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedMerchant.state === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedMerchant.state === "available" ? "Available" : "Occupied"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Rent</div>
                  <div className="text-xl font-bold text-green-600">
                    ¥{selectedMerchant.rent_price.toLocaleString()}/month
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Area</div>
                  <div className="text-xl font-bold text-blue-600">
                    {selectedMerchant.size} ㎡
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Merchant Name</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedMerchant.name}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">State</div>
                  <div
                    className={`text-lg font-semibold ${
                      selectedMerchant.state === "available"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {selectedMerchant.state === "available" ? "Available" : "Occupied"}
                  </div>
                </div>
              </div>

              {/* Merchant */}
              {selectedMerchant.state === "occupied" &&
                selectedMerchant.name && (
                  <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
                    <div className="text-sm text-gray-600 mb-2">Merchant</div>
                    <div className="text-lg font-semibold text-blue-900">
                      {selectedMerchant.name}
                    </div>
                  </div>
                )}

              {/* Description */}
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="text-sm text-gray-600 mb-2">Description</div>
                <div className="text-gray-900">
                  {selectedMerchant.description}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {tempMerchants.length}
                </div>
                <div className="text-sm text-gray-600">Total Merchants</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                  {tempMerchants.filter((m) => m.state === "available").length}
                </div>
                <div className="text-sm text-gray-600">Available Merchants</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {tempMerchants.filter((m) => m.state === "occupied").length}
                </div>
                <div className="text-sm text-gray-600">Occupied Merchants</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Instructions
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click on the area of the map to view the merchant details</li>
              <li>• When hovering, the area will be highlighted</li>
              <li>• The red dot shows your click position</li>
              <li>• Information includes: rent, area, merchant ID, merchant (if any)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

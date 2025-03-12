'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('any');
  const [priceRange, setPriceRange] = useState('any');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 构建搜索查询
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType !== 'any') params.append('type', propertyType);
    if (priceRange !== 'any') params.append('price', priceRange);
    
    // 导航到搜索结果页面
    router.push(`/properties/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-1">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
        <div className="flex-1 p-3">
          <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder=""
            className="w-full p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="md:w-48 p-3 border-t md:border-t-0 md:border-l border-gray-200">
          <label htmlFor="property-type" className="block text-xs font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="property-type"
            className="w-full p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-gray-700 bg-white"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        
        <div className="md:w-48 p-3 border-t md:border-t-0 md:border-l border-gray-200">
          <label htmlFor="price-range" className="block text-xs font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            id="price-range"
            className="w-full p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none text-gray-700 bg-white"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="0-300000">Under $300,000</option>
            <option value="300000-500000">$300,000 - $500,000</option>
            <option value="500000-750000">$500,000 - $750,000</option>
            <option value="750000-1000000">$750,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>
        
        <div className="p-3 flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
} 
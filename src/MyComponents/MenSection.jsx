import React, { useState, useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { useOutletContext } from 'react-router-dom';

const MenSection = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { handleAddToCart, allProducts } = useOutletContext();

  useEffect(() => {
    document.title = "Men's Collection | ShopperStop";
  }, []);

  const menProducts = allProducts.filter(product => product.gender === 'men');

  const filteredProducts = menProducts.filter((product) =>
    categoryFilter === 'all' ? true : product.category === categoryFilter
  );

  const availableCategories = ['all', ...new Set(menProducts.map((p) => p.category))];

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-white drop-shadow mb-10 animate-fade-in-up">
        Men's Collection
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-8 flex justify-center">
        <select
          className="border border-white text-black bg-white px-4 py-2 rounded-lg shadow-lg  hover:bg-white transition-all duration-300"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {availableCategories.map((category) => (
            <option key={category} value={category} className="text-black">
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-[index*100]"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-contain bg-blue-50 transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x400?text=Image+Not+Found';
                  }}
                />
              </div>

              <div className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-semibold text-slate-800">
                  {product.name}
                </h3>
                <p className="text-amber-600 text-lg font-bold">{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <TiShoppingCart className="text-xl" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white text-lg col-span-full">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default MenSection;

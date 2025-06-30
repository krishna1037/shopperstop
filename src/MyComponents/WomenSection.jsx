import React, { useState, useEffect } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { useOutletContext } from 'react-router-dom';

const WomenSection = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { handleAddToCart, allProducts } = useOutletContext();

  useEffect(() => {
    document.title = "Women's Collection | ShopperStop";
  }, []);

  const womenProducts = allProducts.filter(product => product.gender === 'women');

  const filteredProducts = womenProducts.filter((product) =>
    categoryFilter === 'all' ? true : product.category === categoryFilter
  );

  const availableCategories = ['all', ...new Set(womenProducts.map((p) => p.category))];

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-white mb-10 tracking-wide drop-shadow-lg">
        Women's Collection
      </h2>

      <div className="mb-10 flex justify-center">
        <select
          className="border px-4 py-2 rounded-lg shadow bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group flex flex-col overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-contain bg-pink-50 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x400?text=Image+Not+Found';
                  }}
                />
              </div>

              <div className="p-4 flex flex-col gap-3 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-pink-600 text-lg font-bold">{product.price}</p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200"
                >
                  <TiShoppingCart className="text-xl" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white col-span-full text-lg">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default WomenSection;

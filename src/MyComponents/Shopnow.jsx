import React, { useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { useOutletContext, useLocation } from 'react-router-dom';

const Shop = () => {
  const { handleAddToCart, allProducts } = useOutletContext();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const urlSearchTerm = queryParams.get('search') || '';

  const productsToDisplay = allProducts.filter((product) => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesUrlSearch = urlSearchTerm
      ? product.name.toLowerCase().includes(urlSearchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesUrlSearch;
  });

  const availableCategories = ['all', ...new Set(allProducts.map((p) => p.category))];

  return (
   <div className="min-h-screen bg-linear-to-r/decreasing from-indigo-500 to-teal-400 py-10 px-4 sm:px-6 lg:px-20">

<div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 drop-shadow-md animate-fade-in">
          All Products
        </h2>

        <div className="flex justify-center mb-12">
          <select
            className="border border-gray-300 rounded-md px-5 py-3 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsToDisplay.length > 0 ? (
            productsToDisplay.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition duration-500 hover:shadow-2xl hover:scale-[1.03] cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover object-top transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x400?text=Image+Not+Found';
                  }}
                />
                <div className="p-5 flex flex-col gap-3 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-amber-600 text-lg font-bold">{product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    <TiShoppingCart className="text-2xl" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full text-lg">
              No products found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React, { useEffect, useState, useCallback } from "react";
import Logo from "../assets/Logo.png";
import { IoSearch } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import allProducts from "./productsGlobal";

const Maincontent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ShopperStop - Home";
  }, []);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("shopper_cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddToCartAlert, setShowAddToCartAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("shopper_cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedUser = localStorage.getItem("shopper_username");
    if (savedUser) setUsername(savedUser);
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem("shopper_username", username);
    } else {
      localStorage.removeItem("shopper_username");
    }
  }, [username]);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Show alert
    setShowAddToCartAlert(true);
    setTimeout(() => setShowAddToCartAlert(false), 3000);
  }, []);

  const updateCartItemQuantity = useCallback((productId, newQuantity) => {
    setCartItems((prevItems) =>
      newQuantity <= 0
        ? prevItems.filter((item) => item.id !== productId)
        : prevItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
    );
  }, []);

  const removeCartItem = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(String(item.price).replace(/[^\d.]/g, "")) || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedDiscount(0);
  }, []);

  const handleLogout = () => {
    setUsername("");
    alert("Logged out successfully.");
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  const triggerSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowSearchResults(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchResultClick = () => {
    setSearchTerm("");
    setShowSearchResults(false);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Add to Cart Alert */}
      {showAddToCartAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-md">
          Product added to cart!
        </div>
      )}

      <header className="bg-gray-300 shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-800 whitespace-nowrap"
          >
            <img
              src={Logo}
              alt="ShopperStop Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/40x40?text=Logo";
              }}
            />
            ShopperStop
          </Link>

          {/* Centered Nav Links */}
          <nav className="hidden md:flex items-center gap-4 font-semibold text-slate-800 flex-wrap mx-auto">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/mens" className="hover:text-blue-600">Men</Link>
            <Link to="/women" className="hover:text-blue-600">Women</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
            {!username ? (
              <Link to="/LoginSignup" className="hover:text-blue-600">Login/Signup</Link>
            ) : (
              <div className="flex items-center gap-2">
                <FaUserCircle />
                <span>{username}</span>
                <button onClick={handleLogout} className="text-sm text-red-700 underline">Logout</button>
              </div>
            )}
          </nav>

          {/* Desktop Search and Cart */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-amber-50 w-full rounded-full border px-4 py-2 pr-10 focus:ring-2 focus:ring-amber-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600"
                onClick={triggerSearch}
              >
                <IoSearch />
              </button>

              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow max-h-60 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop?search=${product.name}`}
                      onClick={handleSearchResultClick}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover"
                      />
                      <div>
                        <p>{product.name}</p>
                        <p className="text-sm text-amber-600">{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative text-2xl text-slate-800">
              <TiShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Cart + Toggle */}
          <div className="md:hidden flex items-center gap-4 ml-auto">
            <Link to="/cart" className="relative text-2xl text-slate-800">
              <TiShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </Link>
            <button onClick={toggleMobileMenu} className="text-2xl text-slate-800">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-300 px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2 font-semibold text-slate-800">
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
              <Link to="/mens" onClick={closeMobileMenu}>Men</Link>
              <Link to="/women" onClick={closeMobileMenu}>Women</Link>
              <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
              {!username ? (
                <Link to="/LoginSignup" onClick={closeMobileMenu}>Login/Signup</Link>
              ) : (
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <span>{username}</span>
                  <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="text-sm text-red-700 underline">Logout</button>
                </div>
              )}
            </nav>

            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white w-full rounded-full border px-4 py-2 pr-10 focus:ring-2 focus:ring-amber-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600" onClick={triggerSearch}>
                <IoSearch />
              </button>

              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow max-h-60 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop?search=${product.name}`}
                      onClick={handleSearchResultClick}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover" />
                      <div>
                        <p>{product.name}</p>
                        <p className="text-sm text-amber-600">{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet
          context={{
            handleAddToCart,
            cartItems,
            updateCartItemQuantity,
            removeCartItem,
            setUsername,
            searchTerm,
            allProducts,
            getCartTotal,
            appliedDiscount,
            setAppliedDiscount,
            clearCart,
          }}
        />
      </main>
    </>
  );
};

export default Maincontent;

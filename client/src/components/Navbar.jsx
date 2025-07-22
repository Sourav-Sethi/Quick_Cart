import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 py-3 bg-gradient-to-r from-primary to-purple-500/80 bg-opacity-80 backdrop-blur-lg shadow-xl border-b border-white/30 transition-all">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
          {/* Cart icon in black */}
          <path
            d="M7.5 21C8.32843 21 9 20.3284 9 19.5C9 18.6716 8.32843 18 7.5 18C6.67157 18 6 18.6716 6 19.5C6 20.3284 6.67157 21 7.5 21Z"
            fill="#232323"
          />
          <path
            d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z"
            fill="#232323"
          />
          <path
            d="M3.5 4H5.5L6.5 6M6.5 6L9 14H17L20 6H6.5Z"
            stroke="#232323"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 14L8 16H19"
            stroke="#232323"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
          Quick<span className="text-yellow-200">Cart</span>
        </span>
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        <NavLink to="/" className="text-base font-semibold hover:text-yellow-200 transition text-white">
          Home
        </NavLink>
        <NavLink to="/products" className="text-base font-semibold hover:text-yellow-200 transition text-white">
          All Products
        </NavLink>
        <NavLink to="/" className="text-base font-semibold hover:text-yellow-200 transition text-white">
          Contact
        </NavLink>
        {/* Search Bar */}
        <div className="relative flex items-center bg-white/40 border border-white/30 rounded-full px-4 py-1.5 ml-4 w-64 transition focus-within:ring-2 focus-within:ring-yellow-200">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-white text-sm text-white"
            type="text"
            placeholder="Search products..."
          />
          <button className="ml-2">
            <img src={assets.search_icon} alt="search" className="w-5 h-5 opacity-70" />
          </button>
        </div>
        {/* Cart Icon with Badge */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer group">
          <img src={assets.nav_cart_icon} alt="cart" className="w-7 opacity-90" />
          <span className="absolute -top-2 -right-3 flex items-center justify-center text-xs font-bold text-white bg-yellow-400 w-5 h-5 rounded-full animate-bounce shadow-md border-2 border-white">
            {getCartCount()}
          </span>
        </div>
        {/* User Login/Logout */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="ml-4 px-8 py-2 bg-yellow-400 hover:bg-yellow-300 transition text-white font-bold rounded-full shadow cursor-pointer"
          >
            Login
          </button>
        ) : (
          <div className="relative group ml-4">
            <img src={assets.profile_icon} className="w-10 cursor-pointer ring-2 ring-yellow-200 rounded-full" alt="user profile" />
            <ul className="absolute top-12 right-0 bg-white shadow-lg border border-gray-100 py-3 w-44 rounded-xl text-base opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
              <li onClick={() => navigate("my-orders")} className="px-4 py-2 hover:bg-yellow-100 cursor-pointer rounded">
                My Orders
              </li>
              <li onClick={logout} className="px-4 py-2 hover:bg-yellow-100 cursor-pointer rounded">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-4 md:hidden">
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-7 opacity-90" />
          <span className="absolute -top-2 -right-3 flex items-center justify-center text-xs font-bold text-white bg-yellow-400 w-5 h-5 rounded-full animate-bounce shadow-md border-2 border-white">
            {getCartCount()}
          </span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-2 rounded-full bg-white/80 hover:bg-yellow-100 shadow">
          <img src={assets.menu_icon} alt="menu" className="w-7" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-primary to-purple-500/90 shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/30">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 px-6 py-6 text-white">
          <NavLink to="/" onClick={() => setOpen(false)} className="py-2 font-semibold hover:text-yellow-200">
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="py-2 font-semibold hover:text-yellow-200">
            All Products
          </NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)} className="py-2 font-semibold hover:text-yellow-200">
              My Orders
            </NavLink>
          )}
          <NavLink to="/" onClick={() => setOpen(false)} className="py-2 font-semibold hover:text-yellow-200">
            Contact
          </NavLink>
          <div className="border-t border-white/30 my-3"></div>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="w-full px-6 py-2 bg-yellow-400 hover:bg-yellow-300 transition text-white font-bold rounded-full text-base cursor-pointer"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="w-full px-6 py-2 bg-yellow-400 hover:bg-yellow-300 transition text-white font-bold rounded-full text-base cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Store, User, LogOut } from 'lucide-react';
import { setSearchQuery } from '../store/productSlice';
import { logout } from '../store/userslice';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const searchQuery = useSelector(state => state.products.searchQuery);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-400">
          <Store className="w-6 h-6" />
          <span>DevShop</span>
        </Link>

        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-300">Hi, {user.name}</span>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate('/');
                }}
                className="p-2 bg-slate-800 hover:bg-red-600 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-2 rounded-lg font-medium transition"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
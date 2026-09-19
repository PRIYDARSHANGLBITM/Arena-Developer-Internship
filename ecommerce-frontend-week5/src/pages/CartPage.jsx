import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-slate-500 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-indigo-600 font-medium">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border">
                <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-slate-500 text-sm">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="p-1 border rounded"><Minus className="w-4 h-4" /></button>
                  <span className="font-medium text-sm">{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="p-1 border rounded"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border h-fit space-y-3">
            <h2 className="text-lg font-bold border-b pb-2">Order Summary</h2>
            <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
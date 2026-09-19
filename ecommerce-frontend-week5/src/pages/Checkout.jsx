import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({ name: '', address: '', city: '', zip: '', cardNumber: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    alert("Order Placed Successfully!");
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-8 rounded-xl border">
      <h2 className="text-2xl font-bold mb-6">Checkout & Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input required type="text" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Shipping Address</label>
          <input required type="text" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, address: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input required type="text" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, city: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input required type="text" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, zip: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input required type="text" placeholder="1234 5678 9012 3456" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
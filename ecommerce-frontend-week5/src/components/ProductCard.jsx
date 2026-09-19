import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-lg font-bold text-slate-800 mt-1">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1 text-amber-500 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
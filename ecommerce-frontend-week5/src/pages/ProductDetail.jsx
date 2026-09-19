import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProductById } from '../services/api';
import { addToCart } from '../store/cartSlice';
import { Star, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductById(id).then(data => {
      setProduct(data);
      setSelectedImg(data.images[0]);
    });
  }, [id]);

  if (!product) return <div className="p-8 text-center">Loading product...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border">
        <div>
          <img src={selectedImg} alt={product.name} className="w-full h-80 object-cover rounded-lg mb-4" />
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setSelectedImg(img)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${selectedImg === img ? 'border-indigo-600' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase">{product.category}</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{product.name}</h1>
          <div className="flex items-center gap-1 my-2 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{product.rating}</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 my-4">${product.price.toFixed(2)}</p>
          <p className="text-slate-600 text-sm mb-6">{product.description}</p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
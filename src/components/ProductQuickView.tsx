import React, { useState } from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes.length ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors.length ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  if (!product) return null;
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    };
    
    addToCart(cartItem);
    onClose();
  };
  
  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto max-h-[90vh] overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col md:flex-row max-h-[90vh]">
            {/* Product Image */}
            <div className="md:w-1/2 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-6 overflow-y-auto">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <div className="mt-2 flex items-center">
                  {product.originalPrice ? (
                    <>
                      <p className="text-xl font-medium text-burgundy-600">${product.price.toFixed(2)}</p>
                      <p className="ml-2 text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</p>
                      <p className="ml-2 text-white bg-red-500 text-xs px-2 py-1 rounded">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {/* Color selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 border rounded-md text-sm ${
                          selectedColor === color
                            ? 'border-burgundy-600 bg-burgundy-50 text-burgundy-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        } transition-colors`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size selection */}
              {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button className="text-sm font-medium text-burgundy-600 hover:text-burgundy-500">
                      Size guide
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-md min-w-[40px] text-sm ${
                          selectedSize === size
                            ? 'border-burgundy-600 bg-burgundy-50 text-burgundy-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        } transition-colors`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center border border-gray-300 rounded-md w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-burgundy-600"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-burgundy-600"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500"
                >
                  <ShoppingBag size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className="flex items-center justify-center px-6 py-3 border rounded-md shadow-sm text-burgundy-600 bg-white hover:bg-burgundy-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500"
                >
                  <Heart
                    size={20}
                    className={`mr-2 ${inWishlist ? 'fill-burgundy-600' : ''}`}
                  />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-burgundy-600 hover:text-burgundy-800 font-medium"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;
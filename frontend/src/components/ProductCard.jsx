import React from "react";
import { ShoppingCart, ChevronsUpDown } from "lucide-react";
import { userStore } from "../store/userStore";
import {toast} from "react-hot-toast";
import { cartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = userStore();
  const { addToCart } = cartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }else{
      addToCart(product);
      
    }
    
    console.log("added");
  };
  console.log(product);
  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <div className="relative w-full h-60 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
          loading="lazy"
          onLoad={() => console.log('Image loaded successfully:', product.name)}
          onError={(e) => {
            console.error('Image failed to load:', product.image);
          }}
        />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ${product.price}
            </span>
          </p>
        </div>
          <div className="flex items-center gap-3">
        <button
          className="flex-1 flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-colors"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={20} className="mr-2" />
          Add to cart
        </button>
        <Link to={`/products/${product._id}`} className="flex-1 flex items-center justify-center rounded-lg border border-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300">
          <ChevronsUpDown size={20} className="mr-2" />
          View Details
        </Link>
          </div>
      </div>
    </div>
  );
};

export default ProductCard;

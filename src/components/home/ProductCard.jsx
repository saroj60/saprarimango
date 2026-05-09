import React, { useState } from 'react';
import { MapPin, ArrowRight, Star, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product: tree }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(tree);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-[32px] overflow-hidden border border-nature-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group"
    >
      <Link to={`/shop/${tree.id}`} className="relative aspect-[4/3] overflow-hidden block">
        <img 
          src={tree.image} 
          alt={tree.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {tree.rating}
        </div>
        <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {tree.category}
        </div>
      </Link>

      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-2 mb-2">
          <Link to={`/shop/${tree.id}`} className="hover:text-primary transition-colors">
            <h3 className="text-base sm:text-xl font-bold text-nature-950 truncate w-full sm:w-auto">{tree.name}</h3>
          </Link>
          <span className="text-sm sm:text-lg font-extrabold text-primary whitespace-nowrap">Rs.{tree.price}</span>
        </div>
        
        <div className="flex items-center gap-1 text-nature-500 text-[10px] sm:text-sm mb-3 sm:mb-4">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="truncate">{tree.location}</span>
        </div>

        <p className="text-nature-600 text-[11px] sm:text-sm mb-4 sm:mb-6 line-clamp-2">
          {tree.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-nature-50 pt-3 sm:pt-4 gap-4">
          <button 
            onClick={handleAddToCart}
            className={`flex-grow flex items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              isAdded 
                ? 'bg-secondary text-white' 
                : 'bg-primary text-white hover:bg-nature-900 shadow-md hover:shadow-primary/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="bag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <Link 
            to={`/shop/${tree.id}`}
            className="bg-nature-100 text-primary p-2.5 sm:p-3 rounded-xl hover:bg-nature-200 transition-colors"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;



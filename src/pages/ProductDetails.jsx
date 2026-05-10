import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar, 
  Weight, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  Sun,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const product = useMemo(() => {
    return products.find(p => p.id.toString() === id);
  }, [id, products]);

  const isMango = product?.category !== "Pickle Supplies";
  const minQuantity = isMango ? 5 : 1;
  
  const [quantity, setQuantity] = useState(minQuantity);

  useEffect(() => {
    if (product) {
      setQuantity(isMango ? 5 : 1);
    }
  }, [product, isMango]);

  const handleDecrease = () => {
    if (quantity > minQuantity) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const totalPrice = product ? (parseInt(product.price.toString().replace(/,/g, '')) * quantity).toLocaleString() : 0;

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold text-nature-950 mb-4">Variety Not Found</h1>
        <p className="text-nature-600 mb-8">The variety you're looking for might have been moved or doesn't exist.</p>
        <Link to="/shop" className="text-primary font-bold hover:underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-nature-600 hover:text-primary transition-colors font-medium mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=800'} 
                alt={product.name} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=800'; }}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-bold text-nature-900">{product.rating}</span>
                <span className="text-nature-400 text-sm border-l border-nature-200 pl-2">Verified Variety</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-nature-50 border border-nature-100 cursor-pointer hover:border-primary transition-all">
                  <img src={product.image || 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=800'} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=800'; }} alt="Thumbnail" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-8">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {product.category} Variety
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-nature-950 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 text-nature-500 mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">{product.location}</span>
              </div>
              <p className="text-lg text-nature-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-nature-50 p-6 rounded-3xl border border-nature-100 flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-primary">
                  <Weight className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-nature-400 uppercase font-bold tracking-wider">Net Weight</p>
                  <p className="text-xl font-bold text-nature-950">{product.specs?.weight || '5 KG'}</p>
                </div>
              </div>
              <div className="bg-nature-50 p-6 rounded-3xl border border-nature-100 flex items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-secondary">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-nature-400 uppercase font-bold tracking-wider">Harvest</p>
                  <p className="text-xl font-bold text-nature-950">{product.specs?.harvestTime?.split(' ')[0] || 'Seasonal'}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4 mb-10">
              <h3 className="text-xl font-bold text-nature-900 border-b border-nature-100 pb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-nature-400" />
                  <span className="text-nature-500">Grade:</span>
                  <span className="font-bold text-nature-800">{product.specs?.grade || 'Premium'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-nature-400" />
                  <span className="text-nature-500">Ripeness:</span>
                  <span className="font-bold text-nature-800">{product.specs?.ripeness || 'Ready'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-nature-400" />
                  <span className="text-nature-500">Origin:</span>
                  <span className="font-bold text-nature-800">Organic Farm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-nature-400" />
                  <span className="text-nature-500">Shipping:</span>
                  <span className="font-bold text-nature-800">{product.specs?.delivery || 'Handled'}</span>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-nature-950 p-8 rounded-[32px] text-white flex flex-col items-stretch gap-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-nature-400 text-sm font-bold uppercase mb-1">{isMango ? 'Price per KG' : 'Unit Price'}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white/80">Rs.{product.price}</span>
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="bg-nature-900 rounded-2xl p-2 flex items-center border border-nature-800">
                  <button 
                    onClick={handleDecrease}
                    disabled={quantity <= minQuantity}
                    className="p-3 rounded-xl hover:bg-nature-800 text-nature-300 disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="w-20 text-center font-bold text-xl">
                    {quantity} <span className="text-sm text-nature-400">{isMango ? 'KG' : ''}</span>
                  </div>
                  <button 
                    onClick={handleIncrease}
                    className="p-3 rounded-xl hover:bg-nature-800 text-nature-300 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="h-px bg-nature-800 w-full"></div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-nature-400 text-sm font-bold uppercase mb-1">Total Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-accent">Rs.{totalPrice}</span>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3 group"
                >
                  Add to Cart
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

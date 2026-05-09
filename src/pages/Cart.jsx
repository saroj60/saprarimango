import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ChevronLeft,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-nature-50/30 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[40px] shadow-xl border border-nature-100 text-center max-w-md w-full"
        >
          <div className="bg-nature-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-nature-300">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-nature-950 mb-4">Your cart is empty</h1>
          <p className="text-nature-600 mb-10">Looks like you haven't picked any mango varieties yet.</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-nature-900 transition-all shadow-lg hover:shadow-primary/20 w-full"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-nature-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-nature-950 mb-2">Shopping Cart</h1>
            <p className="text-nature-600 font-medium">You have {cartCount} items in your basket</p>
          </div>
          <Link to="/shop" className="text-primary font-bold flex items-center gap-2 hover:underline">
            <ChevronLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => {
                const isMango = item.category !== "Pickle Supplies";
                const minQuantity = isMango ? 5 : 1;
                
                return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white p-4 sm:p-6 rounded-[32px] border border-nature-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                >
                  <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold text-nature-950 mb-1">{item.name}</h3>
                    <p className="text-nature-500 text-sm mb-4">{item.location}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-1 font-bold text-primary">
                       <span>Rs.{item.price} {isMango ? '/ KG' : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-nature-50 rounded-xl border border-nature-100 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-nature-600 disabled:opacity-30"
                        disabled={item.quantity <= minQuantity}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-16 text-center font-bold text-nature-900">{item.quantity} <span className="text-sm font-normal text-nature-500">{isMango ? 'KG' : ''}</span></span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-nature-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-nature-100 shadow-sm">
              <h3 className="text-2xl font-bold text-nature-950 mb-8">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-nature-600">
                  <span>Subtotal</span>
                   <span className="font-bold text-nature-900">Rs.{cartTotal.toLocaleString()}</span>
                </div>

              </div>

              <div className="pt-6 border-t border-nature-50 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-nature-500 font-bold uppercase tracking-wider text-xs">Total Amount</span>
                   <span className="text-3xl font-black text-primary">Rs.{cartTotal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-nature-900 transition-all shadow-xl hover:shadow-primary/20"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-nature-950 p-8 rounded-[40px] text-white">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Secure Checkout</h4>
                    <p className="text-xs text-nature-400">SSL Encrypted Payment Processing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Truck className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Priority Support</h4>
                    <p className="text-xs text-nature-400">Get 24/7 dedicated support for your orders</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <RotateCcw className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Harvest Guarantee</h4>
                    <p className="text-xs text-nature-400">100% replacement in case of crop failure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

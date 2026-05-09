import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  MapPin, 
  Package,
  CheckCircle2,
  ArrowLeft,
  Lock,
  PhoneCall,
  Navigation
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLocating, setIsLocating] = useState(false);

  const subtotal = cartTotal;
  const total = cartTotal;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    landmark: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (cart.length === 0 && !success) {
    return (
      <div className="pt-40 pb-24 text-center">
        <Package className="w-16 h-16 text-nature-200 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-nature-950 mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-primary font-bold hover:underline">Go shop mangoes</Link>
      </div>
    );
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        
        if (data && data.address) {
          const detectedCity = data.address.city || data.address.town || data.address.village || data.address.county || '';
          const addressParts = [];
          if (data.address.road) addressParts.push(data.address.road);
          if (data.address.suburb) addressParts.push(data.address.suburb);
          if (data.address.neighbourhood) addressParts.push(data.address.neighbourhood);
          
          setFormData(prev => ({
            ...prev,
            address: addressParts.length > 0 ? addressParts.join(', ') : (data.display_name?.split(',').slice(0, 2).join(', ') || '')
          }));
          
          setErrors(prev => ({ ...prev, address: '' }));
        }
      } catch (error) {
        console.error("Error detecting location:", error);
        alert("Failed to detect location. Please enter manually.");
      } finally {
        setIsLocating(false);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      alert("Failed to get your location. Please ensure location permissions are granted.");
      setIsLocating(false);
    });
  };

  const validateStep = (currentStep) => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = "Full name is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.address) newErrors.address = "Shipping address is required";
      if (!formData.landmark) newErrors.landmark = "Landmark is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1)) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Create real orders for each item in cart
      cart.forEach(item => {
        createOrder(user?.id || 'guest', user?.name || formData.name, item, item.quantity || 1, {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          landmark: formData.landmark,
          zip: formData.zip
        });
      });

      // Construct WhatsApp Message
      let message = `🥭 *New Saptari Mango Order!* 🥭\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}\n`;
      message += `Landmark: ${formData.landmark}\n\n`;
      message += `*Order Items:*\n`;
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.quantity || 1}x (Rs.${item.price})\n`;
      });
      message += `\n*Total Amount:* Rs.${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}\n\n`;
      message += `Please confirm my order.`;

      const whatsappUrl = `https://wa.me/9779815769007?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1500);
  };

  if (success) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-white text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
           <h1 className="text-4xl font-black text-nature-950 mb-4">Order Placed!</h1>
          <p className="text-nature-600 mb-10 text-lg leading-relaxed">
            Your order has been submitted successfully. Please ensure you have sent the WhatsApp message to <span className="font-bold text-nature-900">+977 9815769007</span> for approval and coordination. You can track the status in your dashboard.
          </p>
          <div className="flex flex-col gap-4">
            <Link 
              to="/dashboard" 
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-nature-950 transition-all shadow-xl shadow-primary/20"
            >
              Track Your Order
            </Link>
            <Link to="/shop" className="text-nature-500 font-bold hover:text-primary transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-nature-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Form */}
          <div className="lg:flex-[2]">
              <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-nature-950 flex items-center gap-3">
                          <MapPin className="w-6 h-6 text-primary" />
                          Shipping Details
                        </h2>
                        <button
                          type="button"
                          onClick={detectLocation}
                          disabled={isLocating}
                          className="flex items-center gap-2 text-sm font-bold bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary/20 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                          {isLocating ? 'Detecting...' : 'Detect Location'}
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-nature-700 uppercase tracking-wider">Full Name</label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({...formData, name: e.target.value});
                              if (errors.name) setErrors({...errors, name: ''});
                            }}
                            className={`w-full bg-nature-50 border ${errors.name ? 'border-red-500' : 'border-nature-100'} px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all`}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-nature-700 uppercase tracking-wider">Phone Number</label>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({...formData, phone: e.target.value});
                              if (errors.phone) setErrors({...errors, phone: ''});
                            }}
                            placeholder="e.g. 9812345678"
                            className={`w-full bg-nature-50 border ${errors.phone ? 'border-red-500' : 'border-nature-100'} px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all`}
                          />
                          {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-nature-700 uppercase tracking-wider">Address</label>
                        <input 
                          type="text" 
                          value={formData.address}
                          onChange={(e) => {
                            setFormData({...formData, address: e.target.value});
                            if (errors.address) setErrors({...errors, address: ''});
                          }}
                          className={`w-full bg-nature-50 border ${errors.address ? 'border-red-500' : 'border-nature-100'} px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all`}
                          placeholder="Tol, House No."
                        />
                        {errors.address && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.address}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-nature-700 uppercase tracking-wider">Landmark</label>
                        <input 
                          type="text" 
                          value={formData.landmark}
                          onChange={(e) => {
                            setFormData({...formData, landmark: e.target.value});
                            if (errors.landmark) setErrors({...errors, landmark: ''});
                          }}
                          className={`w-full bg-nature-50 border ${errors.landmark ? 'border-red-500' : 'border-nature-100'} px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all`}
                          placeholder="Nearby famous place"
                        />
                        {errors.landmark && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.landmark}</p>}
                      </div>
                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-nature-900 transition-all flex items-center justify-center gap-3 mt-8 shadow-xl shadow-primary/20 disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : 'Order via WhatsApp'}
                        {!loading && <ChevronRight className="w-5 h-5" />}
                      </button>
                    </div>
              </form>
            </div>

          {/* Sidebar Summary */}
          <div className="lg:flex-1">
            <div className="bg-white rounded-[40px] border border-nature-100 p-8 shadow-sm top-32 sticky">
              <h3 className="text-xl font-bold text-nature-950 mb-6">Summary</h3>
              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" />
                    <div className="flex-grow">
                      <p className="text-sm font-bold text-nature-950">{item.name}</p>
                       <p className="text-xs text-nature-400 font-medium">Rs.{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-nature-50">
                <div className="flex justify-between text-sm">
                  <span className="text-nature-400 font-bold">Subtotal</span>
                  <span className="text-nature-900 font-bold">Rs.{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xl font-black pt-4 border-t border-nature-100">
                  <span className="text-nature-950">Total</span>
                  <span className="text-primary">Rs.{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
               <div className="mt-8 bg-nature-50 p-4 rounded-2xl flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-bold text-nature-600 uppercase tracking-widest leading-tight">
                  Support: 9815769007 (Call to Confirm)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

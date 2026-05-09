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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLocating, setIsLocating] = useState(false);

  const subtotal = cartTotal;
  const total = cartTotal;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
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
            city: detectedCity,
            address: addressParts.length > 0 ? addressParts.join(', ') : (data.display_name?.split(',').slice(0, 2).join(', ') || '')
          }));
          
          setErrors(prev => ({ ...prev, city: '', address: '' }));
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
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.address) newErrors.address = "Shipping address is required";
      if (!formData.city) newErrors.city = "City is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to complete your booking.");
      navigate('/login');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Create real orders for each item in cart
      cart.forEach(item => {
        createOrder(user.id, user.name, item, item.quantity || 1, {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
          city: formData.city,
          zip: formData.zip
        });
      });

      // Construct WhatsApp Message
      let message = `🥭 *New Saptari Mango Order!* 🥭\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${formData.name}\n`;
      message += `Phone: ${formData.phone}\n`;
      message += `Address: ${formData.address}, ${formData.city}\n\n`;
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
            {/* Steps Header */}
            <div className="flex items-center gap-4 mb-10">
              {[
                { n: 1, text: 'Shipping' },
                { n: 2, text: 'Verify' },
                { n: 3, text: 'Review' }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= s.n ? 'bg-primary text-white' : 'bg-nature-100 text-nature-400'
                  }`}>
                    {step > s.n ? <CheckCircle2 className="w-5 h-5" /> : s.n}
                  </div>
                  <span className={`text-sm font-bold ${step >= s.n ? 'text-nature-900' : 'text-nature-400'}`}>
                    {s.text}
                  </span>
                  {s.n < 3 && <div className={`w-10 h-[2px] ${step > s.n ? 'bg-primary' : 'bg-nature-100'}`} />}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[40px] border border-nature-100 p-8 md:p-12 shadow-sm">
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
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
                      {!user && (
                        <div className="bg-nature-50 p-4 rounded-2xl flex items-center gap-3 text-sm text-nature-600 border border-nature-100">
                          <Lock className="w-4 h-4 text-primary" />
                          <span>Please <Link to="/login" className="text-primary font-bold">Login</Link> to save your order to your account.</span>
                        </div>
                      )}
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
                          <label className="text-xs font-bold text-nature-700 uppercase tracking-wider">Email</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({...formData, email: e.target.value});
                              if (errors.email) setErrors({...errors, email: ''});
                            }}
                            className={`w-full bg-nature-50 border ${errors.email ? 'border-red-500' : 'border-nature-100'} px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all`}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
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
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-nature-700 uppercase tracking-wider">City</label>
                          <input 
                            type="text" 
                            value={formData.city}
                            onChange={(e) => {
                              setFormData({...formData, city: e.target.value});
                              if (errors.city) setErrors({...errors, city: ''});
                            }}
                            placeholder="Kathmandu"
                            className={`w-full bg-nature-50 border ${errors.city ? 'border-red-500' : 'border-nature-100'} px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all`}
                          />
                          {errors.city && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{errors.city}</p>}
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
                      <button 
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-nature-900 transition-all flex items-center justify-center gap-3 mt-8 shadow-xl shadow-primary/20"
                      >
                        Continue to Payment
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center py-8">
                        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <PhoneCall className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-black text-nature-950 mb-4">WhatsApp Verification</h2>
                        <p className="text-nature-600 mb-8 max-w-sm mx-auto">
                          When you place your order, you will be redirected to WhatsApp to send your order details to our team directly.
                        </p>
                        
                        <a 
                          href="tel:9815769007" 
                          className="inline-flex items-center gap-4 bg-nature-950 text-white px-8 py-4 rounded-3xl font-black text-xl hover:bg-primary transition-all shadow-2xl shadow-nature-900/20 group"
                        >
                          <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          9815769007
                        </a>
                      </div>

                      <div className="bg-nature-50 p-6 rounded-[32px] border border-nature-100 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-xl border border-nature-100 mt-1">
                          <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-nature-900 mb-1">Manual Verification Policy</p>
                          <p className="text-xs text-nature-500 leading-relaxed">
                            Your order will be saved as "Processing" until our team approves it after the call. No online payment is required here.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button 
                          type="button" 
                          onClick={handleBack}
                          className="flex-grow bg-nature-50 text-nature-600 py-5 rounded-2xl font-bold hover:bg-nature-100 transition-all border border-nature-100"
                        >
                          Back
                        </button>
                        <button 
                          type="button"
                          onClick={handleNext}
                          className="flex-[2] bg-primary text-white py-5 rounded-2xl font-bold hover:bg-nature-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                        >
                          Continue to Review
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-2xl font-bold text-nature-950 mb-6 flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        Review & Confirm
                      </h2>
                      
                      <div className="space-y-6">
                        <div className="bg-nature-50/50 p-6 rounded-3xl border border-nature-100">
                          <h3 className="text-xs font-bold text-nature-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                             Shipping To
                          </h3>
                          <p className="font-bold text-nature-900">{formData.name}</p>
                          <p className="text-nature-600 text-sm">{formData.address}</p>
                        </div>

                        <div className="bg-nature-50/50 p-6 rounded-3xl border border-nature-100">
                          <h3 className="text-xs font-bold text-nature-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                             Verification Method
                          </h3>
                          <p className="font-bold text-nature-900 flex items-center gap-2">
                            <PhoneCall className="w-4 h-4 text-primary" />
                            WhatsApp Order (+977 9815769007)
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button 
                          type="button" 
                          onClick={handleBack}
                          className="flex-grow bg-nature-50 text-nature-600 py-5 rounded-2xl font-bold hover:bg-nature-100 transition-all border border-nature-100"
                        >
                          Back
                        </button>
                         <button 
                          type="submit"
                          disabled={loading}
                          className="flex-[2] bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-nature-950 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-50"
                        >
                           {loading ? 'Placing Order...' : `Place Order (Rs.${total.toLocaleString(undefined, { maximumFractionDigits: 0 })})`}
                          {!loading && <CheckCircle2 className="w-6 h-6" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
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

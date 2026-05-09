import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight,
  Droplets,
  Sun,
  Thermometer,
  History,
  CheckCircle2,
  Clock,
  ArrowRight,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrders();
  const [activeTab, setActiveTab] = useState('Overview');
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const userOrders = getUserOrders(user?.id);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const orderStats = [
    { label: 'Total Orders', value: userOrders.length.toString(), icon: History, color: 'text-blue-500' },
    { label: 'Pending Delivery', value: userOrders.filter(o => o.status === 'Processing').length.toString(), icon: Clock, color: 'text-orange-500' },
    { label: 'Items Shipped', value: userOrders.filter(o => o.status === 'Shipped').length.toString(), icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Support Status', value: 'Active', icon: Bell, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-nature-50/30 flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-nature-100 p-4 lg:p-6 flex flex-col pt-24 lg:pt-32">
        <nav className="flex-grow space-y-2">
          {['Overview', 'My Orders', 'Support'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-nature-500 hover:bg-nature-50 hover:text-primary'
              }`}
            >
              <div className="flex-shrink-0">
                {item === 'Overview' && <Leaf className="w-5 h-5" />}
                {item === 'My Orders' && <History className="w-5 h-5" />}
                {item === 'Support' && <Settings className="w-5 h-5" />}
              </div>
              <span className="hidden lg:block">{item}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:block">Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-10 pt-24 lg:pt-32">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-nature-950">Hello, {user?.name || 'Mango Lover'}!</h1>
            <p className="text-nature-600 mt-1">Ready for some fresh mangoes?</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white p-3 rounded-2xl border border-nature-100 text-nature-500 hover:text-primary transition-all relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black">
              {user?.name?.[0] || 'U'}
            </div>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="space-y-10">
            {/* Quick Order Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {orderStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[32px] border border-nature-100 shadow-sm"
                >
                  <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                  <p className="text-nature-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-xl font-black text-nature-950">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-nature-950">Your Mango Orders</h2>
                  <Link to="/shop" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Shop More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {userOrders.map((rental) => (
                    <motion.div 
                      key={rental.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-4 lg:p-6 rounded-[32px] border border-nature-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4 lg:gap-6">
                        <img src={rental.image} className="w-16 lg:w-24 h-16 lg:h-24 rounded-2xl object-cover" />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg lg:text-xl font-black text-nature-950">{rental.productName}</h3>
                              <p className="text-nature-500 text-sm flex items-center gap-1">
                                <Package className="w-3 h-3" /> Order #{rental.id}
                              </p>
                            </div>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                              {rental.status}
                            </span>
                          </div>
                          
                          <div className="mt-4 flex flex-col gap-1">
                            <p className="text-[10px] font-black text-nature-400 uppercase">Status Update</p>
                            <p className="text-xs font-bold text-nature-700">
                              {rental.status === 'Processing' ? 'We are checking the quality of your mangoes.' : 'Your mangoes are on the way to your doorstep!'}
                            </p>
                          </div>
                        </div>
                        <button className="bg-nature-50 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {userOrders.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-nature-200">
                      <Leaf className="w-12 h-12 text-nature-100 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-nature-950">No orders placed yet</h3>
                      <p className="text-nature-500 mb-6">Explore our varieties and place your first order.</p>
                      <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-xl font-bold inline-block">
                        Explore Shop
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Info Sidebar */}
              <div className="bg-nature-950 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <History className="w-6 h-6 text-primary" />
                    Support & Help
                  </h2>
                  <div className="space-y-6">
                    <p className="text-nature-400 text-sm">Need help with your order? Our support team is available 24/7 to assist you.</p>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <h4 className="font-bold mb-2">Delivery Policy</h4>
                      <p className="text-xs text-nature-500">All orders are shipped within 24-48 hours of quality check. Express shipping available for premium varieties.</p>
                    </div>
                    <Link to="/contact" className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-all">
                      Contact Support
                    </Link>
                  </div>
                </div>
                
                {/* Background Shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -ml-16 -mb-16" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;

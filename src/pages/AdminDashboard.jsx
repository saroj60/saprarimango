import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Leaf, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit,
  CheckCircle2,
  Clock,
  DollarSign,
  History,
  Package
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();
  const { orders, updateOrderStatus: approveOrder } = useOrders();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('Overview');

  
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Removed progress updates for fruit shop pivot

  if (!user || user.role !== 'admin') {
    return null;
  }



  const totalRevenue = orders.reduce((acc, r) => {
    const amount = r.amount ? r.amount.toString().replace(',', '') : '0';
    return acc + (parseInt(amount) || 0);
  }, 0);

  const stats = [
    { title: 'Total Revenue', value: `Rs.${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-primary', trend: '+12.5%' },
    { title: 'Total Orders', value: orders.length.toString(), icon: Package, color: 'bg-secondary', trend: 'Live' },
    { title: 'Mango Inventory', value: products.length.toString(), icon: Leaf, color: 'bg-accent', trend: 'Live' },
    { title: 'Store Status', value: 'Open', icon: CheckCircle2, color: 'bg-nature-900', trend: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-nature-50/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-nature-950 text-white p-6 hidden lg:flex flex-col border-r border-nature-800">
        <div className="flex items-center gap-2 mb-10 px-2 pt-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Saptari Mango Admin</span>
          </Link>
        </div>

        <nav className="flex-grow space-y-2">
          {['Overview', 'Inventory', 'Orders', 'Reports'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-nature-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item === 'Overview' && <BarChart3 className="w-5 h-5" />}
              {item === 'Inventory' && <Leaf className="w-5 h-5" />}
              {item === 'Orders' && <Clock className="w-5 h-5" />}
              {item === 'Reports' && <History className="w-5 h-5" />}
              {item}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-10 pt-24 lg:pt-32">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-nature-950">Admin {activeTab}</h1>
            <p className="text-nature-600">Managing the natural ecosystem</p>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === 'Inventory' && (
              <Link 
                to="/admin/products/new"
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-nature-950 transition-all shadow-lg hover:shadow-primary/20"
              >
                <Plus className="w-5 h-5" />
                Add New Variety
              </Link>
            )}
          </div>
        </header>

        {activeTab === 'Overview' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[32px] border border-nature-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg shadow-nature-900/10`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full">{stat.trend}</span>
                  </div>
                  <p className="text-nature-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-extrabold text-nature-950">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 bg-white rounded-[40px] border border-nature-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-nature-50 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-nature-950">Recent Orders</h3>
                  <button onClick={() => setActiveTab('Orders')} className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-nature-50/50 text-nature-500 text-[10px] font-bold uppercase tracking-widest">
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">ID</th>
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Product Variety</th>
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Customer</th>
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Phone</th>
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-right text-[10px] font-bold uppercase tracking-widest tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-nature-50">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="text-sm text-nature-700 hover:bg-nature-50/30 transition-colors">
                          <td className="px-8 py-5 font-bold text-nature-900">#{order.id}</td>
                          <td className="px-8 py-5">{order.productName}</td>
                          <td className="px-8 py-5 font-medium">{order.userName}</td>
                          <td className="px-8 py-5 text-xs text-nature-500">{order.phone || 'N/A'}</td>
                          <td className="px-8 py-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              order.status === 'Approved' || order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 
                              order.status === 'Pending' || order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            {(order.status === 'Pending' || order.status === 'Processing') && (
                              <button 
                                onClick={() => approveOrder(order.id, 'Shipped')}
                                className="bg-primary text-white p-2 rounded-lg hover:bg-nature-950 transition-all shadow-lg shadow-primary/20"
                                title="Mark as Shipped"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-8 py-10 text-center text-nature-400">No orders yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Inventory' && (
          <div className="bg-white rounded-[40px] border border-nature-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-nature-50/50 text-nature-500 text-[10px] font-bold uppercase tracking-widest">
                    <th className="px-8 py-4">Image</th>
                    <th className="px-8 py-4">Product Variety</th>
                    <th className="px-8 py-4">Location</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4">Pack Size</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nature-50">
                  {products.map((product) => (
                    <tr key={product.id} className="text-sm text-nature-700 hover:bg-nature-50/30 transition-colors">
                      <td className="px-8 py-4">
                        <img src={product.image || 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=800'} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=800'; }} className="w-12 h-12 rounded-xl object-cover" />
                      </td>
                      <td className="px-8 py-4 font-bold text-nature-900">{product.name}</td>
                      <td className="px-8 py-4">{product.location}</td>
                      <td className="px-8 py-4">
                        <span className="bg-nature-50 text-nature-500 px-3 py-1 rounded-full text-[10px] font-bold">{product.category}</span>
                      </td>
                      <td className="px-8 py-4 font-black text-primary">Rs. {product.price}</td>
                      <td className="px-8 py-4 font-medium">{product.yield}</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/admin/products/${product.id}/edit`}
                            className="p-2 text-nature-400 hover:text-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-nature-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="bg-white rounded-[40px] border border-nature-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-nature-50/50 text-nature-500 text-[10px] font-bold uppercase tracking-widest">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Product</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Phone</th>
                    <th className="px-8 py-4">Address</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nature-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="text-sm text-nature-700 hover:bg-nature-50/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-nature-900">#{order.id}</td>
                      <td className="px-8 py-5">{order.productName}</td>
                      <td className="px-8 py-5 font-medium">{order.userName}</td>
                      <td className="px-8 py-5 text-nature-500">{order.phone || 'N/A'}</td>
                      <td className="px-8 py-5 text-nature-500 max-w-[200px] truncate" title={order.address}>{order.address || 'N/A'}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {order.status === 'Processing' && (
                          <button 
                            onClick={() => approveOrder(order.id, 'Shipped')}
                            className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-nature-950 transition-all shadow-lg shadow-primary/20"
                          >
                            Mark Shipped
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-nature-400">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No orders to manage yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

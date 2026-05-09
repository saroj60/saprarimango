import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Lock, Mail, ArrowRight, ShieldAlert, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      try {
        login(email, password);
        navigate('/admin/dashboard');
      } catch (err) {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-nature-50/50 p-4">
      {/* Background Decorative Blobs */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[40px] shadow-2xl border border-nature-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-nature-900/10 pointer-events-none" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-white/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
            <p className="text-nature-100 text-sm opacity-80">Secure access to Saptari Mango management</p>
          </div>

          {/* Form */}
          <div className="p-10">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 text-red-700 text-sm"
              >
                <ShieldAlert className="w-5 h-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-nature-50 border border-nature-100 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                    placeholder="admin@saptarimango.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-nature-50 border border-nature-100 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm px-1">
                <label className="flex items-center gap-2 text-nature-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-nature-200 text-primary focus:ring-primary" />
                  Remember me
                </label>
                <button type="button" className="text-primary font-bold hover:underline">Forgot password?</button>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-nature-900 transition-all shadow-xl hover:shadow-primary/30 active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex gap-3 text-xs text-nature-600">
              <AlertCircle className="w-5 h-5 text-secondary shrink-0" />
              <p>Demo Credentials:<br /><span className="font-bold text-nature-900">admin@saptarimango.com / admin123</span></p>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-nature-400 text-sm">
          Protected by Saptari Mango Security Protocol. <br />
          © 2026 NatureTrust Management
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

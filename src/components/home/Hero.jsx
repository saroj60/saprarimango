import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nature-50 rounded-l-[100px] -z-10 hidden lg:block" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-nature-100 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Leaf className="w-4 h-4" />
              <span>Directly from Farm to Your Doorstep</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-nature-950 leading-tight mb-6">
              Elite Mangoes, <br />
              <span className="text-secondary">Delivered Fresh.</span>
            </h1>
            
            <p className="text-lg text-nature-700 mb-10 max-w-lg leading-relaxed">
              Experience the authentic taste of premium mangoes hand-picked from the finest orchards. No intermediaries, just pure nature delivered straight to your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop"
                className="bg-primary text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg hover:bg-nature-800 transition-all shadow-xl hover:shadow-primary/30 group"
              >
                Shop Mangoes
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about"
                className="bg-white border-2 border-nature-200 text-nature-800 px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg hover:border-primary/50 transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Stats/Badges */}
            <div className="grid grid-cols-3 gap-6 mt-12 border-t border-nature-100 pt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">2.5k+</span>
                <span className="text-sm text-nature-500">Orders Shipped</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">12k+</span>
                <span className="text-sm text-nature-500">KG Harvested</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">98%</span>
                <span className="text-sm text-nature-500">Happy Users</span>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/assets/images/farm_hero.png" 
                alt="Lush Mango Tree" 
                className="w-full aspect-[4/5] object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating Info Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-nature-100"
            >
              <div className="bg-accent/20 p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-bold text-nature-800">Verified Quality</p>
                <p className="text-[10px] text-nature-500">100% Organic Standards</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-nature-100"
            >
              <div className="bg-primary/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-nature-800">Fast Delivery</p>
                <p className="text-[10px] text-nature-500">Real-time Tracking</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

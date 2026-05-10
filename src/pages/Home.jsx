import React from 'react';
import ProductCard from '../components/home/ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products } = useProducts();
  const popularProducts = products.filter(p => p.category !== "Pickle Supplies");
  return (
    <main>
      
      {/* Featured Varieties Section */}
      <section className="py-24 bg-nature-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-nature-950 mb-4">Our Varieties</h2>
              <p className="text-nature-600 max-w-xl">
                Explore our selection of premium, hand-picked mangoes. Fresh from our orchards to your table.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="hidden sm:block text-primary font-bold hover:underline"
            >
              View All Varieties
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link 
              to="/shop" 
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold w-full block"
            >
              View All Varieties
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainable Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
                Empowering Farmers, <br />
                Enriching Tables.
              </h2>
              <p className="text-nature-100 text-lg mb-8 leading-relaxed">
                Our model ensures that farmers get paid upfront for the harvest, reducing their market risks and allowing them to focus on what they do best: growing the finest produce.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-bold text-accent mb-2">100%</h4>
                  <p className="text-sm text-nature-200 uppercase tracking-wider font-bold">Organic Practice</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-accent mb-2">Direct</h4>
                  <p className="text-sm text-nature-200 uppercase tracking-wider font-bold">Farmer Support</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?auto=format&fit=crop&q=80&w=800" 
                alt="Mango farmer" 
                className="rounded-[40px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

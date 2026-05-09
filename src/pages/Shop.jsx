import React, { useState, useMemo } from 'react';
import ProductCard from '../components/home/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const mangoCategories = ["All", "Premium", "Popular", "Exotic", "Value"];

const Shop = () => {
  const { products: allProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [shopMode, setShopMode] = useState("Mangoes");

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const isPickle = product.category === "Pickle Supplies";
      if (shopMode === "Mangoes" && isPickle) return false;
      if (shopMode === "Pickles" && !isPickle) return false;

      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.location && product.location.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && (shopMode === "Pickles" || matchesCategory);
    }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return parseFloat(a.price.toString().replace(',', '')) - parseFloat(b.price.toString().replace(',', ''));
      if (sortBy === "Price: High to Low") return parseFloat(b.price.toString().replace(',', '')) - parseFloat(a.price.toString().replace(',', ''));
      if (sortBy === "Rating") return parseFloat(b.rating) - parseFloat(a.rating);
      return 0;
    });
  }, [allProducts, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-nature-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-nature-950 mb-4">The Mango Shop</h1>
          <p className="text-nature-600">Select from our premium varieties of hand-picked mangoes and traditional pickle supplies.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center md:justify-start mb-10">
          <div className="bg-white p-1.5 rounded-2xl inline-flex border border-nature-100 shadow-sm">
            <button
              onClick={() => { setShopMode("Mangoes"); setSelectedCategory("All"); }}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${
                shopMode === "Mangoes" ? "bg-primary text-white shadow-md" : "text-nature-600 hover:text-nature-950"
              }`}
            >
              Fresh Mangoes
            </button>
            <button
              onClick={() => { setShopMode("Pickles"); setSelectedCategory("All"); }}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${
                shopMode === "Pickles" ? "bg-primary text-white shadow-md" : "text-nature-600 hover:text-nature-950"
              }`}
            >
              Pickle Supplies
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nature-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by variety, location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-nature-100 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-primary transition-colors shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-400 hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-nature-100 px-6 py-4 rounded-2xl font-bold text-nature-700 hover:border-primary transition-all shadow-sm focus:outline-none"
              >
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {shopMode === "Mangoes" && (
            <div className="flex flex-wrap gap-2">
              {mangoCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-white text-nature-600 border border-nature-100 hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-nature-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-nature-950 mb-2">No mangoes found</h3>
              <p className="text-nature-600 mb-8">Try adjusting your search or filters to find your favorite variety.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;

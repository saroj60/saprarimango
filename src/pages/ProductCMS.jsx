import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Upload,
  Info,
  ListPlus
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const ProductCMS = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();
  const { user } = useAuth();
  
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(() => {
    if (isEditing) {
      const productToEdit = products.find(p => String(p.id) === String(id));
      if (productToEdit) {
        return {
          ...productToEdit,
          specs: {
            harvestTime: '', grade: '', weight: '', ripeness: '', delivery: '',
            ...(productToEdit.specs || {})
          }
        };
      }
    }
    return {
      name: '',
      location: '',
      price: '',
      yield: '',
      category: 'Popular',
      image: '',
      description: '',
      specs: {
        harvestTime: '',
        grade: '',
        weight: '',
        ripeness: '',
        delivery: ''
      }
    };
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    if (isEditing) {
      const productToEdit = products.find(p => String(p.id) === String(id));
      if (!productToEdit) {
        // Product not found, go back
        navigate('/admin');
      }
    }
  }, [id, isEditing, products, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(parseInt(id), formData);
    } else {
      addProduct(formData);
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-nature-50/30 pt-24 lg:pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="bg-white p-3 rounded-xl shadow-sm text-nature-500 hover:text-primary transition-colors border border-nature-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-nature-950">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-nature-600">Product Content Management System</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-nature-950 transition-all shadow-lg shadow-primary/20"
          >
            <Save className="w-5 h-5" />
            {isEditing ? 'Save Changes' : 'Publish Product'}
          </button>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Form */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-nature-100 space-y-6"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-nature-50">
                <Info className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-nature-950">Basic Information</h2>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700">Product Name *</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="e.g. Alphonso Mango (Premium Box)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Price (Rs.) *</label>
                  <input 
                    required
                    type="text" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="e.g. 500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Category *</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  >
                    <option value="Premium">Premium</option>
                    <option value="Popular">Popular</option>
                    <option value="Exotic">Exotic</option>
                    <option value="Value">Value</option>
                    <option value="Pickle Supplies">Pickle Supplies</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700">Description *</label>
                <textarea 
                  required
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                  placeholder="Describe the product, its flavor profile, and unique selling points..."
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-nature-100 space-y-6"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-nature-50">
                <ListPlus className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-nature-950">Detailed Specifications</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Harvest Time</label>
                  <input 
                    type="text" 
                    name="harvestTime"
                    value={formData.specs.harvestTime}
                    onChange={handleSpecChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="e.g. March - June"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Grade / Quality</label>
                  <input 
                    type="text" 
                    name="grade"
                    value={formData.specs.grade}
                    onChange={handleSpecChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="e.g. A++ Export Quality"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Weight Specification</label>
                  <input 
                    type="text" 
                    name="weight"
                    value={formData.specs.weight}
                    onChange={handleSpecChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="e.g. 1 KG"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Ripeness</label>
                  <input 
                    type="text" 
                    name="ripeness"
                    value={formData.specs.ripeness}
                    onChange={handleSpecChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="e.g. Semi-Ripe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Delivery Time</label>
                  <input 
                    type="text" 
                    name="delivery"
                    value={formData.specs.delivery}
                    onChange={handleSpecChange}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="e.g. Same Day Delivery"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Form */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-nature-100 space-y-6"
            >
              <h2 className="text-xl font-bold text-nature-950 border-b border-nature-50 pb-4">Media</h2>
              
              <div className="space-y-4">
                {formData.image ? (
                  <div className="relative rounded-3xl overflow-hidden border-4 border-nature-50 shadow-lg group aspect-square">
                    <img 
                      src={formData.image} 
                      alt="Product Preview" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1629197520635-16570fbd0799?w=400'; }}
                    />
                    <div className="absolute inset-0 bg-nature-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-nature-50 rounded-3xl border-2 border-dashed border-nature-200 flex flex-col items-center justify-center text-nature-400 gap-3">
                    <ImageIcon className="w-10 h-10 opacity-50" />
                    <span className="text-sm font-medium">No Image Selected</span>
                  </div>
                )}

                <div className="space-y-4 pt-4">
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-400" />
                    <input 
                      type="text" 
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full bg-nature-50 border border-nature-100 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:border-primary text-sm"
                      placeholder="Paste image URL..."
                    />
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden" 
                      id="product-image-upload-cms"
                    />
                    <label 
                      htmlFor="product-image-upload-cms"
                      className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-nature-50 border-2 border-dashed border-nature-200 rounded-2xl text-nature-500 font-bold text-sm cursor-pointer hover:bg-nature-100 hover:border-primary transition-all group-hover:text-primary"
                    >
                      <Upload className="w-5 h-5" />
                      Upload from Computer
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-nature-100 space-y-6"
            >
              <h2 className="text-xl font-bold text-nature-950 border-b border-nature-50 pb-4">Origin & Supply</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700">Source Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="e.g. Saptari, Nepal"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700">Pack Yield</label>
                <input 
                  type="text" 
                  name="yield"
                  value={formData.yield}
                  onChange={handleInputChange}
                  className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="e.g. 1 KG"
                />
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCMS;

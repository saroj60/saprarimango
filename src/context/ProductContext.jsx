import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });
      
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
  };

  const addProduct = async (newProduct) => {
    const productData = { 
      ...newProduct, 
      rating: "5.0",
      specs: newProduct.specs || {
        harvestTime: "Seasonal",
        grade: "Standard Quality",
        weight: "5 KG Box",
        ripeness: "Semi-Ripe",
        delivery: "Same Day Delivery"
      }
    };

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      console.error('Error adding product:', error);
    } else if (data) {
      setProducts(prev => [data[0], ...prev]);
    }
  };

  const updateProduct = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from('products')
      .update(updatedFields)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating product:', error);
    } else if (data) {
      setProducts(prev => prev.map(product => 
        product.id === id ? data[0] : product
      ));
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

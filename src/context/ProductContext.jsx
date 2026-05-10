import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts = [];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('saptarimango_inventory_v2');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      console.error('Error parsing products from localStorage:', e);
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem('saptarimango_inventory_v2', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithId = { 
      ...newProduct, 
      id: Date.now(), 
      rating: "5.0",
      specs: newProduct.specs || {
        harvestTime: "Seasonal",
        grade: "Standard Quality",
        weight: "5 KG Box",
        ripeness: "Semi-Ripe",
        delivery: "Same Day Delivery"
      }
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedFields } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

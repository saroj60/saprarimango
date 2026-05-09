import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts = [

  {
    id: 1,
    name: "Alphonso Mango (Premium Box)",
    location: "Saptari, Nepal",
    price: "500",
    yield: "1 KG",
    rating: "4.9",
    category: "Premium",
    image: "/assets/images/alphonso_tree.png",
    description: "The King of Mangoes. Hand-picked at perfect maturity. These Alphonso mangoes are known for their golden yellow skin and fiberless, buttery pulp with a rich aroma.",
    specs: {
      harvestTime: "March - June",
      grade: "A++ Export Quality",
      weight: "1 KG",
      ripeness: "Semi-Ripe (Matures in 2 days)",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 2,
    name: "Kesar Mango (Standard Box)",
    location: "Saptari, Nepal",
    price: "380",
    yield: "1 KG",
    rating: "4.8",
    category: "Popular",
    image: "/assets/images/kesar_fruit.png",
    description: "Known for its distinct saffron aroma and intense sweetness. These Kesar mangoes are sourced directly from the foothills of Girnar, ensuring authentic flavor.",
    specs: {
      harvestTime: "April - July",
      grade: "Standard Grade",
      weight: "1 KG",
      ripeness: "Ready to Eat",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 3,
    name: "Imampasand (Royal Variety)",
    location: "Saptari, Nepal",
    price: "800",
    yield: "1 KG",
    rating: "5.0",
    category: "Exotic",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800",
    description: "Large, heart-shaped mango with a unique spicy-sweet flavor profile and paper-thin skin. Truly a royal treat for mango enthusiasts.",
    specs: {
      harvestTime: "May - July",
      grade: "Premium Selection",
      weight: "1 KG",
      ripeness: "Ready to Eat",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 4,
    name: "Banganapalli (Bulk Pack)",
    location: "Saptari, Nepal",
    price: "215",
    yield: "1 KG",
    rating: "4.7",
    category: "Value",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=800",
    description: "Large-sized mango with a sweet aroma and thin skin. Excellent for juices and shakes. Our Banganapalli mangoes are sourced from verified sustainable orchards.",
    specs: {
      harvestTime: "April - June",
      grade: "Standard Grade",
      weight: "1 KG",
      ripeness: "Semi-Ripe",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 5,
    name: "Dasheri Mango (Sweet Pack)",
    location: "Saptari, Nepal",
    price: "260",
    yield: "1 KG",
    rating: "4.8",
    category: "Popular",
    image: "https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?auto=format&fit=crop&q=80&w=800",
    description: "Famous for its unique sweet flavor and slender shape. These Dasheri mangoes are a northern Indian favorite, perfect for snacks and desserts.",
    specs: {
      harvestTime: "June - August",
      grade: "Standard Grade",
      weight: "1 KG",
      ripeness: "Ready to Eat",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 6,
    name: "Hapus (Connoisseur Box)",
    location: "Saptari, Nepal",
    price: "750",
    yield: "1 KG",
    rating: "5.0",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?auto=format&fit=crop&q=80&w=800",
    description: "Top-tier Devgad Alphonso. The gold standard for mango connoisseurs. Grown specifically on the rocky terrain of Devgad for the most intense flavor.",
    specs: {
      harvestTime: "March - May",
      grade: "A+++ Select Export",
      weight: "1 KG",
      ripeness: "Semi-Ripe",
    }
  },
  {
    id: 7,
    name: "Raw Green Mangoes (For Pickle)",
    location: "Saptari, Nepal",
    price: "499",
    yield: "3 KG Box",
    rating: "4.9",
    category: "Pickle Supplies",
    image: "https://plus.unsplash.com/premium_photo-1675039871348-4a61db7a6bd5?auto=format&fit=crop&q=80&w=800",
    description: "Firm, sour, and perfectly unripe green mangoes specifically chosen for making traditional pickles. Crisp texture and high acidity.",
    specs: {
      harvestTime: "March - May",
      grade: "A Grade Raw",
      weight: "3 KG",
      ripeness: "Raw/Unripe",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 8,
    name: "Cold-Pressed Mustard Oil",
    location: "Saptari, Nepal",
    price: "350",
    yield: "1 Litre",
    rating: "4.8",
    category: "Pickle Supplies",
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=800",
    description: "100% pure, unadulterated cold-pressed mustard oil. The essential preservative and flavor base for authentic homemade mango pickles.",
    specs: {
      harvestTime: "Year Round",
      grade: "Premium Cold-Pressed",
      weight: "1 Litre",
      ripeness: "N/A",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 9,
    name: "Traditional Pickle Masala Blend",
    location: "Saptari, Nepal",
    price: "299",
    yield: "500g Pack",
    rating: "5.0",
    category: "Pickle Supplies",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    description: "Our secret family recipe spice blend. Contains perfectly roasted and ground fenugreek, fennel, mustard seeds, turmeric, and red chili.",
    specs: {
      harvestTime: "Freshly Ground",
      grade: "A++ Authentic",
      weight: "500g",
      ripeness: "N/A",
      delivery: "Same Day Delivery"
    }
  },
  {
    id: 10,
    name: "Ceramic / Glass Curing Jar (Martaban)",
    location: "Saptari, Nepal",
    price: "899",
    yield: "3 Litre Capacity",
    rating: "4.7",
    category: "Pickle Supplies",
    image: "https://images.unsplash.com/photo-1585241936939-f1947b1c3132?auto=format&fit=crop&q=80&w=800",
    description: "Traditional sun-curing jar. Non-reactive inner surface ensures your pickle ferments and matures perfectly without spoiling.",
    specs: {
      harvestTime: "N/A",
      grade: "Food Grade",
      weight: "1.5 KG (Empty)",
      ripeness: "N/A",
      delivery: "Same Day Delivery"
    }
  }

];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('saptarimango_inventory_master');
      let parsed = saved ? JSON.parse(saved) : initialProducts;
      
      // Force sync data for initial core products to ensure new specs are used
      if (saved) {
        parsed = parsed.map(p => {
          const initial = initialProducts.find(i => String(i.id) === String(p.id));
          if (initial && Number(p.id) <= 10) {
            return { ...p, ...initial }; 
          }
          return p;
        });
        
        // Add missing initial products
        initialProducts.forEach(initial => {
          if (!parsed.find(p => String(p.id) === String(initial.id))) {
            parsed.push(initial);
          }
        });
      }
      return parsed;
    } catch (e) {
      console.error('Error parsing products from localStorage:', e);
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem('saptarimango_inventory_master', JSON.stringify(products));
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

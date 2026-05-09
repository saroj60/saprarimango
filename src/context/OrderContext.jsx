import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('saptarimango_orders_master');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing orders from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('saptarimango_orders_master', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (userId, userName, product, quantity = 1, shippingDetails = {}) => {
    const newOrder = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      userId,
      userName: shippingDetails.name || userName,
      productId: product.id,
      productName: product.name,
      status: 'Processing',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: (parseFloat(product.price.toString().replace(',', '')) * quantity).toLocaleString(),
      quantity,
      image: product.image,
      // Enhanced shipping details
      phone: shippingDetails.phone || '',
      address: shippingDetails.address || '',
      email: shippingDetails.email || '',
      city: shippingDetails.city || '',
      zip: shippingDetails.zip || ''
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };
  
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => 
      String(o.id) === String(orderId) ? { ...o, status } : o
    ));
  };

  const getUserOrders = (userId) => orders.filter(o => o.userId === userId);

  return (
    <OrderContext.Provider value={{ 
      orders, 
      createOrder, 
      updateOrderStatus,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

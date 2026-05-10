import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import ProductCMS from './pages/ProductCMS';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/common/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-nature-50/10">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products/new" element={<ProductCMS />} />
                    <Route path="/admin/products/:id/edit" element={<ProductCMS />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={
                      <div className="pt-32 pb-24 text-center">
                        <h1 className="text-4xl font-black text-nature-950 mb-4">404</h1>
                        <p className="text-nature-600">Page not found. Back to <a href="/" className="text-primary hover:underline">Home</a></p>
                      </div>
                    } />
                  </Routes>
                </main>
              </div>
            </Router>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;

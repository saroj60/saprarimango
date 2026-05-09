import React from 'react';
import { Leaf, Twitter, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nature-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Saptari Mango Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform bg-white p-1 rounded-lg" />
              <span className="text-2xl font-bold tracking-tight">Saptari Mango</span>
            </Link>
            <p className="text-nature-400 leading-relaxed text-sm">
              Premium farm-fresh mangoes delivered straight from our orchards to your doorstep. Experience the real taste of the king of fruits.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-nature-900 rounded-lg hover:bg-accent hover:text-nature-950 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-nature-900 rounded-lg hover:bg-accent hover:text-nature-950 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-nature-900 rounded-lg hover:bg-accent hover:text-nature-950 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Mango Varieties', 'Shop Now', 'Sustainable Farming', 'Wholesale'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-nature-400 hover:text-accent transition-colors text-sm font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span className="text-nature-400 text-sm">Opposite side of Green Park, Delhi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-nature-400 text-sm">+91 91523 00486</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-nature-400 text-sm">support@saptarimango.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Newsletter</h4>
            <p className="text-nature-400 text-sm">Stay Updated on the Next Harvest.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-nature-900 border border-nature-800 p-3 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
              />
              <button className="bg-accent text-nature-950 font-bold p-3 rounded-xl hover:bg-white transition-all text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nature-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-nature-500 text-xs">
          <p>© 2024 Saptari Mango. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-accent">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

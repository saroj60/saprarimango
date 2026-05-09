import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'hello@saptarimango.com', desc: 'Queries in 24h' },
    { icon: Phone, label: 'Call Us', value: '+91 98765 43210', desc: 'Mon-Sat, 9am-6pm' },
    { icon: MapPin, label: 'Visit Us', value: 'Orchard Valley, Bangalore', desc: 'Green HQ, Farm Road' },
  ];

  return (
    <div className="pt-32 pb-24 bg-nature-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black text-nature-950 mb-6 underline decoration-primary decoration-8 underline-offset-8">Get In Touch</h1>
            <p className="text-nature-600 text-lg">Have questions about our rental process or want to visit our farms? We'd love to hear from you.</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-nature-100 shadow-sm flex items-start gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-nature-400 uppercase tracking-widest mb-1">{info.label}</p>
                  <p className="text-lg font-black text-nature-950 mb-1">{info.value}</p>
                  <p className="text-sm text-nature-500">{info.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <div className="bg-nature-950 p-10 rounded-[40px] text-white">
              <h3 className="text-xl font-bold mb-6">Follow Our Journey</h3>
              <div className="flex gap-4">
                {[Twitter, Instagram, Facebook].map((Icon, i) => (
                  <button key={i} className="bg-white/10 p-4 rounded-2xl hover:bg-primary transition-all">
                    <Icon className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[50px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-nature-100">
            <h2 className="text-3xl font-black text-nature-950 mb-10 flex items-center gap-4">
              <MessageSquare className="w-8 h-8 text-primary" />
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Full Name</label>
                  <input 
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-nature-700">Email Address</label>
                  <input 
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700">Subject</label>
                <input 
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all"
                  placeholder="Inquiry about Alphonso Mango bulk orders"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-nature-700">Message</label>
                <textarea 
                  required
                  rows="5"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-nature-50 border border-nature-100 px-6 py-4 rounded-2xl focus:outline-none focus:border-primary transition-all resize-none"
                  placeholder="Tell us what you're looking for..."
                />
              </div>

              <button 
                type="submit"
                className={`w-full py-5 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3 transition-all ${
                  submitted ? 'bg-green-500' : 'bg-primary hover:bg-nature-900 shadow-xl hover:shadow-primary/30'
                }`}
              >
                {submitted ? (
                  <>Sent Successfully!</>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-24 aspect-[21/9] rounded-[60px] overflow-hidden grayscale contrast-125 border-8 border-white shadow-2xl relative">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-8 py-4 rounded-full shadow-2xl animate-bounce">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

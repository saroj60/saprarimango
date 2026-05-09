import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Mangoes Delivered', value: '12k+' },
    { label: 'Happy Customers', value: '8.5k' },
    { label: 'Organic Farms', value: '24' },
    { label: 'Partner Orchards', value: '450' },
  ];

  const values = [
    {
      title: "Sustainable Growth",
      desc: "Our farming practices prioritize soil health and biodiversity, ensuring long-term fertility and premium fruit quality.",
      icon: Leaf
    },
    {
      title: "Direct connection",
      desc: "We bridge the gap between urban families and rural orchards, fostering a deep respect for how our food is grown.",
      icon: Users
    },
    {
      title: "Radical Transparency",
      desc: "From sapling to harvest, every step is documented and shared with our community of mango lovers.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
            <h1 className="text-5xl lg:text-7xl font-black text-nature-950 leading-tight mb-8">
              Rooted in <span className="text-primary">Purpose</span>, Grown with Love.
            </h1>
            <p className="text-nature-600 text-lg leading-relaxed mb-10 max-w-xl">
              Saptari Mango started with a simple idea: everyone should have access to premium, farm-fresh mangoes. We connect mango lovers with sustainable orchards, bringing the authentic taste of the king of fruits straight to your doorstep.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <h3 className="text-3xl font-black text-nature-950">{stat.value}</h3>
                  <p className="text-nature-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[60px] overflow-hidden rotate-3 shadow-2xl shadow-primary/20">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-xl border border-nature-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-nature-400 uppercase">Global Goal</p>
                  <p className="text-lg font-black text-nature-950">Net Zero by 2030</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-nature-950 py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Why We Do This</h2>
          <p className="text-nature-400 max-w-2xl mx-auto">We're more than just a fruit delivery company. We're a movement towards conscious consumption and sustainable agriculture.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
          {values.map((value, i) => {
            const IconComponent = value.icon;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 p-10 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="bg-primary p-4 rounded-2xl w-fit mb-8 group-hover:rotate-12 transition-transform">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-nature-400 leading-relaxed">{value.desc}</p>
            </motion.div>
          )})}
        </div>
      </section>

      {/* Call to action */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-nature-950 p-12 md:p-20 rounded-[60px] text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready for fresh mangoes?</h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">Experience the joy of hand-picked, farm-fresh mangoes delivered straight to your doorstep.</p>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-4 bg-white text-nature-950 px-12 py-5 rounded-[24px] font-black text-xl hover:bg-primary hover:text-white transition-all shadow-2xl"
              >
                Start Shopping Mangoes
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
            {/* Abstract decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nature-900/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

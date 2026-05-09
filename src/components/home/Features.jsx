import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Thermometer, Truck, MapPin } from 'lucide-react';

const features = [
  {
    icon: <MousePointer2 className="w-8 h-8" />,
    title: "Choose Variety",
    description: "Browse through our collection of premium mango varieties like Alphonso, Kesar, and Hapus.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: <Thermometer className="w-8 h-8" />,
    title: "Quality Check",
    description: "Every box is hand-picked and checked for peak ripeness and quality before shipment.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Farm to Fork",
    description: "Direct delivery from our orchards to your doorstep, ensuring zero delay in freshness.",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Direct Sourcing",
    description: "Know exactly which orchard your mangoes came from. Transparent and ethical sourcing.",
    color: "bg-purple-50 text-purple-600"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-nature-950 mb-4"
          >
            How Saptari Mango Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-nature-600 max-w-2xl mx-auto"
          >
            Bringing the authentic orchard experience to your doorstep with total transparency and care.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[32px] border border-nature-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-nature-900 mb-3">{feature.title}</h3>
              <p className="text-nature-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

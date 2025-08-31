import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Hammer, Factory, Warehouse, Map, Home, PaintBucket, Wrench, Building } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        </div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
          </div>
          <div className="mt-6 h-4 bg-gray-200 rounded-full w-1/3"></div>
        </div>
      </div>
    ))}
  </div>
);

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Building2,
      title: 'Commercial Buildings',
      description: 'State-of-the-art office complexes and shopping centers with modern amenities.',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg'
    },
    {
      icon: Factory,
      title: 'Pre-fabricated Buildings',
      description: 'Quick-to-deploy, cost-effective building solutions for various purposes.',
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg'
    },
    {
      icon: Home,
      title: 'Residential Villas',
      description: 'Luxurious custom-designed villas with premium finishes and amenities.',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    },
    {
      icon: Factory,
      title: 'Industrial Projects',
      description: 'Large-scale industrial facilities and manufacturing units.',
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg'
    },
    {
      icon: Warehouse,
      title: 'Cold Storages',
      description: 'Temperature-controlled storage facilities for perishable goods.',
      image: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg'
    },
    {
      icon: Warehouse,
      title: 'Godowns',
      description: 'Spacious warehouses for efficient storage and logistics operations.',
      image: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg'
    },
    {
      icon: Hammer,
      title: 'Renovations',
      description: 'Complete makeover and upgrading of existing structures.',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg'
    },
    {
      icon: Map,
      title: 'Roads and Buildings',
      description: 'Infrastructure development including roads and public buildings.',
      image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg'
    },
    {
      icon: PaintBucket,
      title: 'Interior & Exterior Works',
      description: 'Comprehensive interior design and exterior finishing services.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    },
    {
      icon: Wrench,
      title: 'Welding & Engineering',
      description: 'Specialized welding and engineering solutions for construction.',
      image: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg'
    },
    {
      icon: Building,
      title: 'High-Rise Towers',
      description: 'Towering skyscrapers with cutting-edge architecture and safety features.',
      image: 'https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction solutions tailored to meet your specific needs
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute bottom-4 left-4 text-white z-10"
                >
                  <service.icon className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </motion.div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center gap-2"
                >
                  Learn More
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Factory, Home, Warehouse, Map, Hammer, PaintBucket, Wrench } from 'lucide-react';

interface CategoryPageProps {
  category: string;
}

const categoryData = {
  commercial: {
    title: 'Commercial Buildings',
    icon: Building2,
    description: 'State-of-the-art commercial complexes designed for modern businesses',
    features: [
      'Modern Office Spaces',
      'Retail Complexes',
      'Shopping Malls',
      'Hotels & Hospitality',
      'Mixed-use Developments'
    ],
    benefits: [
      'Energy-efficient Design',
      'Smart Building Technology',
      'Sustainable Materials',
      'Premium Amenities',
      'Strategic Locations'
    ],
    image: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg'
  },
  prefab: {
    title: 'Pre-fabricated Buildings',
    icon: Factory,
    description: 'Quick-to-deploy, cost-effective building solutions for various purposes',
    features: [
      'Rapid Construction',
      'Modular Design',
      'Customizable Layouts',
      'Factory-made Components',
      'Easy Installation'
    ],
    benefits: [
      'Cost-effective',
      'Time-efficient',
      'Quality Control',
      'Minimal Waste',
      'Environmentally Friendly'
    ],
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg'
  },
  residential: {
    title: 'Residential Villas',
    icon: Home,
    description: 'Luxurious custom-designed villas with premium finishes and amenities',
    features: [
      'Custom Designs',
      'Premium Finishes',
      'Smart Home Integration',
      'Landscaped Gardens',
      'Security Systems'
    ],
    benefits: [
      'Personalized Spaces',
      'Modern Amenities',
      'Energy Efficiency',
      'Premium Location',
      'High-end Finishes'
    ],
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'
  },
  industrial: {
    title: 'Industrial Projects',
    icon: Factory,
    description: 'Large-scale industrial facilities and manufacturing units',
    features: [
      'Manufacturing Units',
      'Processing Plants',
      'Assembly Lines',
      'Storage Facilities',
      'Loading Bays'
    ],
    benefits: [
      'Efficient Layout',
      'Safety Features',
      'Modern Equipment',
      'Scalable Design',
      'Regulatory Compliance'
    ],
    image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg'
  },
  storage: {
    title: 'Cold Storages & Godowns',
    icon: Warehouse,
    description: 'Temperature-controlled storage facilities and warehouses',
    features: [
      'Temperature Control',
      'Humidity Management',
      'Storage Systems',
      'Loading Equipment',
      'Security Measures'
    ],
    benefits: [
      'Preservation Quality',
      'Inventory Management',
      'Cost Efficiency',
      'Easy Access',
      'Modern Facilities'
    ],
    image: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg'
  },
  renovation: {
    title: 'Renovations',
    icon: Hammer,
    description: 'Complete makeover and upgrading of existing structures',
    features: [
      'Structural Updates',
      'Modern Amenities',
      'Energy Upgrades',
      'Interior Redesign',
      'Exterior Refresh'
    ],
    benefits: [
      'Value Addition',
      'Modern Features',
      'Energy Savings',
      'Better Functionality',
      'Enhanced Aesthetics'
    ],
    image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg'
  },
  infrastructure: {
    title: 'Roads and Buildings',
    icon: Map,
    description: 'Infrastructure development including roads and public buildings',
    features: [
      'Road Construction',
      'Bridge Development',
      'Public Buildings',
      'Urban Planning',
      'Infrastructure Design'
    ],
    benefits: [
      'Better Connectivity',
      'Public Safety',
      'Modern Infrastructure',
      'Sustainable Design',
      'Community Development'
    ],
    image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg'
  },
  interior: {
    title: 'Interior & Exterior Works',
    icon: PaintBucket,
    description: 'Comprehensive interior design and exterior finishing services',
    features: [
      'Interior Design',
      'Exterior Finishing',
      'Custom Solutions',
      'Material Selection',
      'Color Consultation'
    ],
    benefits: [
      'Aesthetic Appeal',
      'Functionality',
      'Quality Materials',
      'Professional Finish',
      'Custom Design'
    ],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  },
  engineering: {
    title: 'Welding & Engineering Works',
    icon: Wrench,
    description: 'Specialized welding and engineering solutions for construction',
    features: [
      'Structural Welding',
      'Custom Fabrication',
      'Engineering Design',
      'Quality Testing',
      'Safety Standards'
    ],
    benefits: [
      'Professional Quality',
      'Custom Solutions',
      'Safety Compliance',
      'Durability',
      'Expert Workmanship'
    ],
    image: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg'
  }
};

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const data = categoryData[category as keyof typeof categoryData];
  if (!data) return null;

  const { title, icon: Icon, description, features, benefits, image } = data;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Icon className="w-12 h-12 text-blue-800" />
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800">{title}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Key Features</h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 mt-8"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Benefits</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Get a Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryPage;
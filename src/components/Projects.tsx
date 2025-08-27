import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Factory, Home, Warehouse, Map, Hammer, PaintBucket, Wrench } from 'lucide-react';

const Projects = () => {
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'commercial', name: 'Commercial', icon: Building2 },
    { id: 'residential', name: 'Residential', icon: Home },
    { id: 'industrial', name: 'Industrial', icon: Factory },
    { id: 'infrastructure', name: 'Infrastructure', icon: Map },
    { id: 'renovation', name: 'Renovation', icon: Hammer },
    { id: 'interior', name: 'Interior', icon: PaintBucket },
    { id: 'engineering', name: 'Engineering', icon: Wrench },
    { id: 'storage', name: 'Storage', icon: Warehouse }
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern Office Complex',
      category: 'commercial',
      image: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg',
      location: 'Downtown Business District',
      year: 2023,
      description: 'A state-of-the-art office complex featuring sustainable design and smart building technology.'
    },
    {
      id: 2,
      title: 'Luxury Villa Development',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      location: 'Suburban Heights',
      year: 2023,
      description: 'Premium residential villas with custom designs and high-end finishes.'
    },
    {
      id: 3,
      title: 'Manufacturing Facility',
      category: 'industrial',
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg',
      location: 'Industrial Park',
      year: 2022,
      description: 'Large-scale manufacturing facility with advanced automation systems.'
    },
    {
      id: 4,
      title: 'Highway Extension',
      category: 'infrastructure',
      image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg',
      location: 'Metro Region',
      year: 2023,
      description: 'Major highway extension project improving regional connectivity.'
    },
    {
      id: 5,
      title: 'Historic Building Renovation',
      category: 'renovation',
      image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg',
      location: 'City Center',
      year: 2022,
      description: 'Careful restoration of a historic building preserving its architectural heritage.'
    },
    {
      id: 6,
      title: 'Corporate Interior Design',
      category: 'interior',
      image: 'https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg',
      location: 'Tech Park',
      year: 2023,
      description: 'Modern interior design for a leading tech company headquarters.'
    },
    {
      id: 7,
      title: 'Steel Structure Bridge',
      category: 'engineering',
      image: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg',
      location: 'River District',
      year: 2022,
      description: 'Complex engineering project connecting two major districts.'
    },
    {
      id: 8,
      title: 'Cold Storage Facility',
      category: 'storage',
      image: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg',
      location: 'Logistics Hub',
      year: 2023,
      description: 'Temperature-controlled storage facility for perishable goods.'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our diverse portfolio of successful construction projects
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category.id ? 'bg-blue-800 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              {category.name}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 text-white z-10"
                  >
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center gap-2"
                  >
                    View Details
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
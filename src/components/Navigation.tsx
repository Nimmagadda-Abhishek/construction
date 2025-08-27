import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Building2, Factory, Home, Warehouse, Map, Hammer, PaintBucket, Wrench } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      href: '#',
      subItems: [
        { name: 'Commercial Buildings', href: '/services/commercial', icon: Building2 },
        { name: 'Pre-fabricated Buildings', href: '/services/prefab', icon: Factory },
        { name: 'Residential Villas', href: '/services/residential', icon: Home },
        { name: 'Industrial Projects', href: '/services/industrial', icon: Factory },
        { name: 'Cold Storages & Godowns', href: '/services/storage', icon: Warehouse },
        { name: 'Renovations', href: '/services/renovation', icon: Hammer },
        { name: 'Roads and Buildings', href: '/services/infrastructure', icon: Map },
        { name: 'Interior & Exterior Works', href: '/services/interior', icon: PaintBucket },
        { name: 'Welding & Engineering', href: '/services/engineering', icon: Wrench }
      ]
    },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="fixed w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="/"
            className="text-2xl font-bold text-blue-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            UdayMegaStructureLLp
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <span className="text-gray-700 hover:text-blue-800 transition-colors">
                      {item.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl py-2 mt-2"
                        >
                          {item.subItems.map((subItem) => (
                            <motion.a
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <subItem.icon className="w-5 h-5 text-blue-800" />
                              {subItem.name}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    href={item.href}
                    className="text-gray-700 hover:text-blue-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <motion.button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <div className="py-2">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full text-gray-700 py-2"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4"
                          >
                            {item.subItems.map((subItem) => (
                              <motion.a
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center gap-3 py-2 text-gray-700"
                                whileHover={{ x: 5 }}
                              >
                                <subItem.icon className="w-5 h-5 text-blue-800" />
                                {subItem.name}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.a
                      href={item.href}
                      className="block text-gray-700 py-2"
                      whileHover={{ x: 5 }}
                    >
                      {item.name}
                    </motion.a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
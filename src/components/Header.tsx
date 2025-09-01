import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigationItems } from './navigationItems';
const logoUrl = new URL('../assets/logo.jpeg', import.meta.url).href;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            onClick={scrollToTop}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-3">
              <img
                src={logoUrl}
                alt="Uday Mega Structures LLP"
                onError={() => setLogoError(true)}
                className="h-10 w-10 rounded bg-white/90 p-1 object-contain shadow"
              />
              <span className={`font-bold text-lg hidden md:block ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                Uday Mega Structures LLP
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <span className={`font-medium transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
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
                    className={`font-medium transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-blue-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-blue-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
            >
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
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
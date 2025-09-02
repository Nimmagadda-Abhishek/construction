import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import logo from '../assets/footer.png';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61580316743981' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: 'https://www.instagram.com/udaymegastructuresllp/' },
    { icon: Youtube, href: 'https://www.youtube.com/@UdaymegastructuresLLP' },
  ];

  const quickLinks = [
    'About Us', 'Our Services', 'Projects', 'Contact'
  ];

  const services = [
    'Commercial Construction', 'Infrastructure Development', 'Industrial Projects', 'Project Management', 'Safety & Compliance', 'Logistics & Supply'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col space-y-2 mb-4">
              <img
                src={logo}
                alt="Uday Megastructures LLP"
                className="h-[250px] w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building the future through innovative engineering and exceptional craftsmanship. Your trusted partner for premium infrastructure solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-800 p-2 rounded-lg hover:bg-orange-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={scrollToTop}
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={scrollToTop}
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-orange-500" />
                <span className="text-gray-300">402,4th floor,Flat No.1559&1760A, KPHB state, 9th Phase,<br />Hyderabad, Telangana 500085</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-gray-300">9494054102</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-orange-500" />
                <span className="text-gray-300">info@udaymegastructuresllp.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-blue-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-300">
            © 2024 udaymegastructuresllp. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Designed and developed by <a href="https://asiandigitalworld.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">Asian Digital World</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
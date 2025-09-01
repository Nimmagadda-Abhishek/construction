import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Building, Target } from 'lucide-react';
import logo from '../assets/logo.png';
import constructionTeam from '../assets/logo.jpeg';

const About = () => {
  const stats = [
    { icon: Building, number: '500+', label: 'Projects Completed' },
    { icon: Users, number: '1000+', label: 'Expert Team Members' },
    { icon: Award, number: '50+', label: 'Industry Awards' },
    { icon: Target, number: '25+', label: 'Years of Excellence' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={logo} alt="Uday Mega Structures LLP" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                <h2 className="text-4xl md:text-5xl font-bold text-blue-800">
                  About Uday Megha Structure
                </h2>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Established in 2024, Uday Megha Structure is a forward-looking company built on a strong vision of innovation, quality, and trust. With a mission to create impactful ventures that add value to society, we are committed to excellence in everything we do.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                The company is led by Mrs. K. Suneetha, a seasoned entrepreneur with over 20 years of industry experience. Her leadership, expertise, and dedication to growth form the foundation of Uday Megha Structure. Guided by her vision, the company continues to expand into new opportunities with the same principles of integrity, quality, and customer satisfaction.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At Uday Megha Structure, we believe in building more than just projects—we build trust, relationships, and a legacy for the future.
                <br />
                Uday Megha Structure – Strong Vision. Strong Future.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Learn More About Us
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={constructionTeam}
                alt="Construction team"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Members Section */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-blue-800 mb-4">Meet Our Leadership</h3>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Our experienced leaders bring decades of combined expertise in construction and project management.</p>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Team Member 1 */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-bold text-gray-800">KVR RAO</h4>
                <p className="text-orange-500 font-medium mb-2">DIRECTOR</p>
                <p className="text-gray-600">25+ years of experience in construction management and large-scale project delivery.</p>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-bold text-gray-800">SUNEETHA</h4>
                <p className="text-orange-500 font-medium mb-2">DIRECTOR</p>
                <p className="text-gray-600">20+ years of experience in construction operations and process optimization.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
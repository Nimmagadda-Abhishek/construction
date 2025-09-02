import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const images = [
    "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
      setIsLoading(false);
    };

    preloadImages();
  }, [images]);

  // Handle image transitions
  useEffect(() => {
    if (isLoading) return;
    
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentImageIndex, isLoading, images.length]);

  // Preload next image
  useEffect(() => {
    if (isLoading) return;
    setNextImageIndex((currentImageIndex + 1) % images.length);
  }, [currentImageIndex, images.length, isLoading]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Preload next image */}
      <div className="hidden">
        <img src={images[nextImageIndex]} alt="" />
      </div>
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={`image-${currentImageIndex}`}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${images[currentImageIndex]}")`,
            }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.6, 0.05, 0.1, 0.99] }
            }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.6, ease: [0.6, 0.05, 0.1, 0.99] }
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.5,
                transition: { duration: 0.4 }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo and Debug Info */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-4">
        <img 
          src="/src/assets/logo.jpeg" 
          alt="Company Logo" 
          className="h-12 w-auto rounded-full border-2 border-white shadow-lg"
        />
        <div className="text-white text-sm bg-black bg-opacity-50 p-2 rounded">
          Image: {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Navigation Dots */}
      

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Building the{' '}
          <span className="text-orange-500">Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
        >
          Premium infrastructure solutions for modern cities. We create lasting legacies through innovative engineering and exceptional craftsmanship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-600 transition-colors"
          >
            Our Projects
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.a
            href="https://www.youtube.com/@UdaymegastructuresLLP"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-white hover:text-blue-800 transition-all inline-flex"
          >
            <Play className="w-5 h-5" />
            Watch Video
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CategoryPage from './components/CategoryPage';
import About from './components/About';
import Success from './components/Success';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <Services />
                  <Projects />
                  <Contact />
                </motion.div>
              }
            />
            <Route
              path="/services/commercial"
              element={<CategoryPage category="commercial" />}
            />
            <Route
              path="/services/prefab"
              element={<CategoryPage category="prefab" />}
            />
            <Route
              path="/services/residential"
              element={<CategoryPage category="residential" />}
            />
            <Route
              path="/services/industrial"
              element={<CategoryPage category="industrial" />}
            />
            <Route
              path="/services/storage"
              element={<CategoryPage category="storage" />}
            />
            <Route
              path="/services/renovation"
              element={<CategoryPage category="renovation" />}
            />
            <Route
              path="/services/infrastructure"
              element={<CategoryPage category="infrastructure" />}
            />
            <Route
              path="/services/interior"
              element={<CategoryPage category="interior" />}
            />
            <Route
              path="/services/engineering"
              element={<CategoryPage category="engineering" />}
            />
            <Route
              path="/projects"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Projects />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Contact />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <About />
                </motion.div>
              }
            />
            <Route
              path="/success"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Success />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
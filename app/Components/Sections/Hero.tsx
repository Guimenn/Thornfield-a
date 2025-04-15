"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Crafted with Tradition
            </h3>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-amber-100 mb-6">
              Exceptional Single Malt Whisky
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Discover the perfect harmony of tradition and innovation in every bottle of our premium single malt whisky.
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors duration-300"
              >
                Explore Our Range
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-amber-600 text-amber-100 hover:bg-amber-900/30 rounded-full transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            {/* Imagem de teste temporária */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
              <span className="text-amber-100 text-2xl font-serif">Whisky Bottle</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            
            {/* Decorative frame */}
            <div className="absolute inset-0 rounded-2xl border border-amber-600/20"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-amber-500 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-amber-600 rounded-full"
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 
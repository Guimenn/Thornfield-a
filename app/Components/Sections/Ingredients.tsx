"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const ingredients = [
  {
    title: "Barley",
    description: "We source the finest Scottish barley, carefully selected for its quality and flavor profile.",
    image: "/ingredients/barley.jpg",
    icon: "🌾",
    details: "Our barley is grown in the fertile fields of Scotland, where the climate and soil conditions create the perfect environment for producing high-quality grain."
  },
  {
    title: "Water",
    description: "Pure Scottish water from our own spring, rich in minerals and perfect for whisky production.",
    image: "/ingredients/water.jpg",
    icon: "💧",
    details: "The water flows through ancient rock formations, naturally filtering and enriching it with essential minerals that contribute to the whisky's character."
  },
  {
    title: "Yeast",
    description: "Specially cultivated yeast strains that create our signature flavor profile.",
    image: "/ingredients/yeast.jpg",
    icon: "🦠",
    details: "Our yeast strains have been carefully developed over generations, creating the perfect conditions for fermentation and flavor development."
  },
  {
    title: "Oak Casks",
    description: "Premium American and European oak casks that impart rich flavors and color.",
    image: "/ingredients/casks.jpg",
    icon: "🪵",
    details: "We use a combination of first-fill bourbon casks and sherry casks, each contributing unique characteristics to the final product."
  }
];

export default function Ingredients() {
  return (
    <section className="bg-[#0A0501] py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Quality Ingredients
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-100 md:text-6xl mb-4">
            Our Raw Materials
          </h2>
          <div className="w-24 h-[1px] bg-amber-700/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden">
                  {/* Imagem de teste temporária */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
                    <span className="text-amber-100 text-2xl font-serif">{ingredient.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-900/80 backdrop-blur-sm flex items-center justify-center border border-amber-600/30">
                    <span className="text-2xl">{ingredient.icon}</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h4 className="text-2xl font-serif text-amber-100 mb-2">{ingredient.title}</h4>
                  <p className="text-gray-300 mb-4">{ingredient.description}</p>
                  <p className="text-gray-400 text-sm">{ingredient.details}</p>
                </div>
              </div>

              {/* Decorative frame */}
              <div className="absolute inset-0 rounded-2xl border border-amber-600/10 group-hover:border-amber-400/50 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            We believe that great whisky starts with great ingredients. That's why we're committed to sourcing only the finest raw materials for our production.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
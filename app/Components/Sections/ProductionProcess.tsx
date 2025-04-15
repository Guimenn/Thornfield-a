"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const processSteps = [
  {
    title: "Malting",
    description: "Our barley is carefully malted to develop the perfect enzymes for fermentation.",
    image: "/process/malting.jpg",
    icon: "🌾"
  },
  {
    title: "Mashing",
    description: "The malted barley is ground and mixed with hot water to extract fermentable sugars.",
    image: "/process/mashing.jpg",
    icon: "⚗️"
  },
  {
    title: "Fermentation",
    description: "Yeast is added to convert sugars into alcohol, creating our distinctive wash.",
    image: "/process/fermentation.jpg",
    icon: "🦠"
  },
  {
    title: "Distillation",
    description: "The wash is distilled in copper pot stills to create our signature spirit.",
    image: "/process/distillation.jpg",
    icon: "🔥"
  },
  {
    title: "Maturation",
    description: "The spirit is aged in carefully selected oak casks to develop its character.",
    image: "/process/maturation.jpg",
    icon: "🪵"
  },
  {
    title: "Bottling",
    description: "Each bottle is hand-filled and labeled with the utmost care and attention.",
    image: "/process/bottling.jpg",
    icon: "🍾"
  }
];

export default function ProductionProcess() {
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
            Craftsmanship
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-100 md:text-6xl mb-4">
            Our Production Process
          </h2>
          <div className="w-24 h-[1px] bg-amber-700/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
                  {/* Imagem de teste temporária */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
                    <span className="text-amber-100 text-2xl font-serif">{step.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Step icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-900/80 backdrop-blur-sm flex items-center justify-center border border-amber-600/30">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>

                <div className="flex-1 p-6 bg-amber-900/10 rounded-b-2xl border border-amber-600/10 group-hover:border-amber-400/50 transition-all duration-500">
                  <h4 className="text-2xl font-serif text-amber-100 mb-2">{step.title}</h4>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
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
            Our production process combines traditional methods with modern innovation, ensuring the highest quality in every bottle.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
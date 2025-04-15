"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const awards = [
  {
    title: "World Whisky Awards",
    year: "2023",
    category: "Best Single Malt",
    description: "Recognized for our exceptional 18-year-old expression, showcasing perfect balance and complexity.",
    image: "/awards/world-whisky.jpg",
    icon: "🏆"
  },
  {
    title: "International Spirits Challenge",
    year: "2022",
    category: "Double Gold Medal",
    description: "Awarded for our innovative cask finishing program and exceptional quality across our range.",
    image: "/awards/isc.jpg",
    icon: "🥇"
  },
  {
    title: "San Francisco World Spirits",
    year: "2021",
    category: "Best in Show",
    description: "Our limited edition cask strength expression received the highest honor in the competition.",
    image: "/awards/sfws.jpg",
    icon: "🌟"
  },
  {
    title: "Whisky Magazine",
    year: "2020",
    category: "Distillery of the Year",
    description: "Recognized for our commitment to quality, innovation, and sustainable practices.",
    image: "/awards/whisky-magazine.jpg",
    icon: "🏅"
  }
];

export default function Awards() {
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
            Excellence Recognized
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-100 md:text-6xl mb-4">
            Awards & Accolades
          </h2>
          <div className="w-24 h-[1px] bg-amber-700/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-[16/9] rounded-t-2xl overflow-hidden">
                  {/* Imagem de teste temporária */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
                    <span className="text-amber-100 text-2xl font-serif">{award.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Award icon */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-amber-900/80 backdrop-blur-sm flex items-center justify-center border border-amber-600/30">
                    <span className="text-3xl">{award.icon}</span>
                  </div>
                </div>

                <div className="flex-1 p-8 bg-amber-900/10 rounded-b-2xl border border-amber-600/10 group-hover:border-amber-400/50 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-2xl font-serif text-amber-100">{award.title}</h4>
                    <span className="text-amber-500">{award.year}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-amber-500 font-medium">{award.category}</span>
                  </div>
                  
                  <p className="text-gray-300">{award.description}</p>
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
            These prestigious awards reflect our unwavering commitment to quality and innovation in whisky production. Each recognition motivates us to continue pushing the boundaries of excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
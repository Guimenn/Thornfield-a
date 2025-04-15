"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const heritageTimeline = [
  {
    year: "1823",
    title: "The Beginning",
    description: "Our distillery was founded in the Scottish Highlands, where the pure water and fertile land provided the perfect conditions for whisky production.",
    image: "/heritage/founding.jpg",
    icon: "🏰"
  },
  {
    year: "1890",
    title: "Expansion",
    description: "The distillery expanded its operations, introducing new copper pot stills and increasing production capacity while maintaining traditional methods.",
    image: "/heritage/expansion.jpg",
    icon: "⚗️"
  },
  {
    year: "1950",
    title: "Modernization",
    description: "While embracing modern technology, we preserved our traditional craftsmanship, ensuring the quality and character of our whisky remained unchanged.",
    image: "/heritage/modernization.jpg",
    icon: "🏭"
  },
  {
    year: "2000",
    title: "Global Recognition",
    description: "Our whiskies gained international acclaim, winning numerous awards and establishing our reputation as a premium single malt producer.",
    image: "/heritage/recognition.jpg",
    icon: "🏆"
  }
];

export default function Heritage() {
  return (
    <section className="bg-[#0A0501] py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Our Legacy
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-100 md:text-6xl mb-4">
            A Rich Heritage
          </h2>
          <div className="w-24 h-[1px] bg-amber-700/50 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-amber-600/20"></div>

          <div className="space-y-32">
            {heritageTimeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    {/* Imagem de teste temporária */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
                      <span className="text-amber-100 text-2xl font-serif">{event.title}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Year badge */}
                    <div className="absolute top-4 left-4 bg-amber-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-600/30">
                      <span className="text-amber-100 font-medium">{event.year}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 md:left-0 top-1/2 transform -translate-x-1/2 md:-translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 border-2 border-amber-900"></div>
                    
                    <div className="text-center md:text-left pl-8 md:pl-12">
                      <div className="text-4xl mb-4">{event.icon}</div>
                      <h4 className="text-2xl font-serif text-amber-100 mb-2">{event.title}</h4>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            For over two centuries, we have been crafting exceptional single malt whisky, preserving traditional methods while embracing innovation. Our heritage is the foundation of our commitment to quality and excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
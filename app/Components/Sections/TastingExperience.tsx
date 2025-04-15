"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const tastingNotes = [
  {
    category: "Nose",
    description: "Rich aromas of honey, vanilla, and dried fruit with subtle hints of oak and spice.",
    notes: ["Honey", "Vanilla", "Dried Fruit", "Oak", "Spice"],
    image: "/tasting/nose.jpg",
    icon: "👃"
  },
  {
    category: "Palate",
    description: "Smooth and complex with layers of caramel, dark chocolate, and warming spices.",
    notes: ["Caramel", "Dark Chocolate", "Spice", "Orange Peel", "Toffee"],
    image: "/tasting/palate.jpg",
    icon: "👅"
  },
  {
    category: "Finish",
    description: "Long and satisfying with lingering notes of dried fruit and gentle oak.",
    notes: ["Dried Fruit", "Oak", "Spice", "Honey", "Vanilla"],
    image: "/tasting/finish.jpg",
    icon: "✨"
  }
];

export default function TastingExperience() {
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
            Sensory Journey
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-100 md:text-6xl mb-4">
            Tasting Experience
          </h2>
          <div className="w-24 h-[1px] bg-amber-700/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tastingNotes.map((note, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-square rounded-t-2xl overflow-hidden">
                  {/* Imagem de teste temporária */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
                    <span className="text-amber-100 text-2xl font-serif">{note.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category icon */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-amber-900/80 backdrop-blur-sm flex items-center justify-center border border-amber-600/30">
                    <span className="text-3xl">{note.icon}</span>
                  </div>
                </div>

                <div className="flex-1 p-8 bg-amber-900/10 rounded-b-2xl border border-amber-600/10 group-hover:border-amber-400/50 transition-all duration-500">
                  <h4 className="text-2xl font-serif text-amber-100 mb-4">{note.category}</h4>
                  <p className="text-gray-300 mb-6">{note.description}</p>
                  
                  <div className="space-y-4">
                    <h5 className="text-amber-500 font-medium">Tasting Notes</h5>
                    <div className="flex flex-wrap gap-2">
                      {note.notes.map((flavor, flavorIndex) => (
                        <span
                          key={flavorIndex}
                          className="px-3 py-1 rounded-full bg-amber-900/30 border border-amber-600/20 text-amber-100 text-sm"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>
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
            Each sip of our whisky tells a story of craftsmanship and tradition. From the first aroma to the lingering finish, experience the perfect balance of flavors that makes our whisky truly exceptional.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 
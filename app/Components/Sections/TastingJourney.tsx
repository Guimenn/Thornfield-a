"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function TastingJourney() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeNote, setActiveNote] = useState(0);

  const tastingNotes = [
    {
      id: 1,
      title: "Visual",
      description: "Um cativante tom âmbar-dourado com matizes de cobre que capturam e refletem a luz de forma sedutora em cada giro do copo.",
      icon: "/icons/visual.svg",
      color: "amber-600",
      image: "/images/tasting/visual.jpg"
    },
    {
      id: 2,
      title: "Olfativo",
      description: "Aromas complexos de frutas maduras, baunilha caramelizada e um toque sutil de carvalho tostado, com notas de mel e especiarias.",
      icon: "/icons/aroma.svg",
      color: "amber-700",
      image: "/images/tasting/aroma.jpg"
    },
    {
      id: 3,
      title: "Gustativo",
      description: "Entrada suave que evolui para uma textura aveludada, com camadas de caramelo, pêssego, nozes tostadas e um delicado toque defumado.",
      icon: "/icons/taste.svg",
      color: "amber-800",
      image: "/images/tasting/taste.jpg"
    },
    {
      id: 4,
      title: "Final",
      description: "Longo e memorável, com nuances de especiarias quentes, chocolate amargo e uma elegante nota amadeirada que persiste delicadamente.",
      icon: "/icons/finish.svg",
      color: "amber-900",
      image: "/images/tasting/finish.jpg"
    }
  ];

  const colors = {
    1: "from-amber-600 to-amber-700",
    2: "from-amber-700 to-amber-800",
    3: "from-amber-800 to-amber-900",
    4: "from-amber-900 to-amber-950"
  };
  
  const currentNote = tastingNotes[activeNote];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#0D0702] to-[#0A0501] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/noise.png')] opacity-15 bg-repeat bg-[length:200px_200px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(205,133,63,0.03),transparent_70%)]"></div>
        <div className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-amber-800/10 blur-[150px]"></div>
        <div className="absolute -left-64 bottom-1/4 w-96 h-96 rounded-full bg-amber-700/10 blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 text-amber-500 text-xs font-medium mb-4">
            SINTA O SABOR
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            Jornada Sensorial <span className="text-amber-500">Única</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Descubra as complexas camadas de sabores e aromas que compõem cada expressão 
            Thornfield, uma sinfonia sensorial meticulosamente orquestrada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-6 h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-amber-900/20"
          >
            <AnimatePresence>
              {tastingNotes.map((note, index) => (
                activeNote === index && (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={note.image}
                      alt={note.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colors[note.id as keyof typeof colors]} flex items-center justify-center mr-3`}>
                          <span className="text-white font-medium">{note.id}</span>
                        </div>
                        <h3 className="text-white text-3xl font-serif">
                          {note.title}
                        </h3>
                      </div>
                      <div className={`w-24 h-0.5 bg-gradient-to-r ${colors[note.id as keyof typeof colors]} mb-6`}></div>
                      <p className="text-gray-200 max-w-md text-lg leading-relaxed">
                        {note.description}
                      </p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="backdrop-blur-sm bg-black/20 rounded-xl p-8 border border-amber-900/10">
              <h3 className="text-2xl font-serif text-amber-100 mb-4">
                Desperte seus Sentidos
              </h3>
              <p className="text-gray-400 leading-relaxed">
                A degustação de um whisky premium transcende o simples ato de beber. 
                É uma experiência multissensorial que envolve visão, olfato, paladar 
                e até mesmo o tato ao sentir a textura no palato.
              </p>
            </div>
            
            <div className="space-y-3">
              {tastingNotes.map((note, index) => (
                <motion.button
                  key={note.id}
                  onClick={() => setActiveNote(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                  className={`w-full flex items-center p-5 rounded-xl transition-all duration-500 backdrop-blur-sm
                    ${activeNote === index 
                      ? `bg-gradient-to-r from-${note.color}/20 to-transparent border border-${note.color}/40 shadow-lg shadow-${note.color}/5`
                      : 'bg-black/10 hover:bg-black/20 border border-amber-900/5'
                    }`}
                >
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center mr-6 transition-all duration-500 ${
                    activeNote === index
                      ? `bg-gradient-to-br ${colors[note.id as keyof typeof colors]}`
                      : 'bg-black/40'
                  }`}>
                    <span className="text-white font-serif text-lg">{note.id}</span>
                  </div>
                  <div className="text-left">
                    <h4 className={`font-serif text-xl transition-all duration-500 ${
                      activeNote === index ? 'text-amber-100' : 'text-gray-400'
                    }`}>
                      {note.title}
                    </h4>
                    {activeNote === index && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-amber-500/80 text-sm mt-1"
                      >
                        Clique para explorar detalhes
                      </motion.p>
                    )}
                  </div>
                  <div className="ml-auto">
                    <svg 
                      className={`w-6 h-6 transition-all duration-500 ${activeNote === index ? 'text-amber-500' : 'text-gray-700'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeNote === index ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-6"
            >
             
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
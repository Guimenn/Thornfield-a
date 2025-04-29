"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

export default function AwardsShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeCategory, setActiveCategory] = useState("destaque");
  const [selectedAward, setSelectedAward] = useState(null);

  const categories = [
    { id: "destaque", name: "Destaques" },
    { id: "internacional", name: "Internacionais" },
    { id: "ouro", name: "Medalhas de Ouro" },
    { id: "sustentabilidade", name: "Sustentabilidade" }
  ];

  const awards = [
    {
      id: 1,
      title: "World Whisky of the Year",
      year: "2023",
      product: "Ultra Reserve 18 Anos",
      organization: "International Whisky Competition",
      image: "/awards/68.png",
      category: ["destaque", "internacional", "ouro"]
    },
    {
      id: 2,
      title: "Master Distiller do Ano",
      year: "2023",
      product: "Malcolm Fraser",
      organization: "Icons of Whisky",
      image: "/awards/76.png",
      category: ["destaque", "internacional"]
    },
    {
      id: 3,
      title: "Destilaria Sustentável",
      year: "2023",
      product: "Thornfield Distillery",
      organization: "Scotch Whisky Association",
      image: "/awards/70.png",
      category: ["destaque", "sustentabilidade"]
    },
    {
      id: 4,
      title: "Medalha Duplo Ouro",
      year: "2023",
      product: "Highland Glory 15 Anos",
      organization: "San Francisco World Spirits Competition",
      image: "/awards/71.png",
      category: ["destaque", "internacional", "ouro"]
    },
    {
      id: 5,
      title: "Inovação Sustentável",
      year: "2022",
      product: "Processo de Reciclagem de Água",
      organization: "Sustainable Spirits Initiative",
      image: "/awards/72.png",
      category: ["destaque", "sustentabilidade"]
    },
    {
      id: 6,
      title: "Embalagem Eco-friendly",
      year: "2021",
      product: "Linha Reserve Series",
      organization: "Green Packaging Awards",
      image: "/awards/73.png",
      category: ["sustentabilidade"]
    },
    {
      id: 7,
      title: "Compromisso Carbono Neutro",
      year: "2022",
      product: "Thornfield Distillery",
      organization: "Climate Positive Awards",
      image: "/awards/74.png",
      category: ["sustentabilidade"]
    },
    {
      id: 8,
      title: "Destilaria Verde",
      year: "2023",
      product: "Iniciativa Energia Renovável",
      organization: "Sustainable Spirits Coalition",
      image: "/awards/75.png",
      category: ["sustentabilidade"]
    },
    {
      id: 9,
      title: "World Whisky of the Year",
      year: "2024",
      product: "Obsidian Veil 20 anos",
      organization: "International Whisky Competition",
      image: "/awards/69.png",
      category: ["destaque", "internacional", "ouro"]
    }
  ];

  const filteredAwards = activeCategory === "destaque" 
    ? awards.filter(award => award.category.includes("destaque"))
    : awards.filter(award => award.category.includes(activeCategory));

  const handleCloseModal = () => {
    setSelectedAward(null);
  };

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#0A0501] to-[#0D0702] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/noise.png')] opacity-15 bg-repeat bg-[length:200px_200px]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Image 
            src="/textures/medal-pattern.svg"
            alt="Medal Pattern" 
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-amber-900/10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-amber-800/10 blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 text-amber-500 text-xs font-medium mb-4">
            RECONHECIMENTO GLOBAL
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            Premiações & <span className="text-amber-500">Distinções</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Nosso compromisso inabalável com a excelência tem sido reconhecido pelas
            mais prestigiadas instituições do mundo dos destilados premium.
          </p>
        </motion.div>

        {/* Elegant Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#171411]/70 to-[#0c0a08]/70 backdrop-blur-sm border border-amber-900/20 p-6 text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-500">9</span>
              <span className="text-gray-400 text-sm">Prêmios Totais</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#171411]/70 to-[#0c0a08]/70 backdrop-blur-sm border border-amber-900/20 p-6 text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-500">5</span>
              <span className="text-gray-400 text-sm">World Whisky<br/>Awards</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#171411]/70 to-[#0c0a08]/70 backdrop-blur-sm border border-amber-900/20 p-6 text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-500">4</span>
              <span className="text-gray-400 text-sm">Medalhas de Ouro</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#171411]/70 to-[#0c0a08]/70 backdrop-blur-sm border border-amber-900/20 p-6 text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-500">5</span>
              <span className="text-gray-400 text-sm">Reconhecimentos<br/>Sustentáveis</span>
            </div>
          </div>
          
        </motion.div>
        
        {/* Award Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-500 
                ${activeCategory === category.id 
                  ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-lg shadow-amber-900/20 scale-105' 
                  : 'bg-black/30 text-gray-400 hover:text-amber-100 backdrop-blur-sm border border-amber-900/10 hover:border-amber-800/30'}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredAwards.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.1 * i,
                  duration: 0.5
                }
              } : {}}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#171411]/80 to-[#0c0a08]/80 backdrop-blur-sm border border-amber-900/20 hover:border-amber-800/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-900/10 pb-2"
            >
              {/* Year badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 text-sm font-bold px-4 py-1 z-10 shadow-md transform origin-top-right group-hover:scale-110 transition-transform duration-300">
                {award.year}
              </div>
              
              <div className="p-6 pb-4">
                <div className="flex items-center justify-center h-32 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={140}
                    height={140}
                    quality={100}
                    priority
                    className="h-28 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-lg filter group-hover:brightness-110 group-hover:contrast-110 cursor-pointer"
                    onClick={() => setSelectedAward(award)}
                  />
                </div>
                
                <h4 className="text-xl font-serif text-amber-100 mb-2 text-center group-hover:text-amber-50 transition-colors duration-300">{award.title}</h4>
                <p className="text-amber-500 text-sm mb-3 text-center">{award.product}</p>
                
                <div className="flex justify-center items-center pt-4 border-t border-amber-900/20">
                  <span className="text-gray-500 text-xs">{award.organization}</span>
                </div>
              </div>

              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-2xl mx-auto mt-16 pt-12 border-t border-amber-900/20"
        >
          <p className="text-gray-400 text-sm italic">
            Embora sejamos uma destilaria jovem, fundada em 2018, nossa dedicação à tradição e inovação 
            nos rendeu reconhecimento significativo no mercado global de whiskies.
          </p>
        </motion.div>
      </div>

      {/* Modal para visualização expandida */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-gradient-to-br from-[#171411]/90 to-[#0c0a08]/90 p-6 rounded-xl border border-amber-900/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all duration-300 z-20"
                onClick={handleCloseModal}
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-amber-100">{selectedAward.title}</h3>
                <p className="text-amber-500">{selectedAward.product}</p>
              </div>
              
              <div className="relative overflow-hidden rounded-lg bg-black/30 flex items-center justify-center h-[70vh] max-h-[700px]">
                <div 
                  className="relative w-full h-full flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-amber-500/5 rounded-full blur-3xl opacity-30"></div>
                  <Image
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    width={800}
                    height={800}
                    quality={100}
                    priority
                    className="object-contain transition-all duration-300 drop-shadow-2xl max-h-full max-w-full"
                    style={{ 
                      objectFit: 'contain',
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
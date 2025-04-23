"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Awards() {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const majorAwards = [
    {
      id: 1,
      title: "World Whisky of the Year",
      year: "2023",
      product: "Royal Reserve 18 Anos",
      organization: "International Whisky Competition",
      image: "/images/awards/award-1.png",
      description: "O prestígio máximo no mundo do whisky, reconhecendo excepcional qualidade e caráter distintivo."
    },
    {
      id: 2,
      title: "Master Distiller do Ano",
      year: "2022",
      product: "Eleanor MacTavish",
      organization: "Icons of Whisky",
      image: "/images/awards/award-2.png",
      description: "Honrando a visão criativa e o talento excepcional por trás dos whiskys premiados Thornfield."
    },
    {
      id: 3,
      title: "Destilaria Sustentável",
      year: "2023",
      product: "Thornfield Distillery",
      organization: "Scotch Whisky Association",
      image: "/images/awards/award-3.png",
      description: "Reconhecimento pelo compromisso com práticas ambientais pioneiras e energia renovável."
    }
  ];

  const recentAwards = [
    {
      id: 1,
      title: "Medalha de Ouro",
      year: "2023",
      product: "Highland Glory 15 Anos",
      organization: "San Francisco World Spirits Competition"
    },
    {
      id: 2,
      title: "Medalha Duplo Ouro",
      year: "2023",
      product: "Royal Reserve 18 Anos",
      organization: "San Francisco World Spirits Competition"
    },
    {
      id: 3,
      title: "Medalha de Platina",
      year: "2023",
      product: "Thornfield Rare Antiquity",
      organization: "International Spirits Challenge"
    },
    {
      id: 4,
      title: "Menção Honrosa",
      year: "2023",
      product: "Thornfield Destilaria",
      organization: "Sustainable Spirits Initiative"
    },
    {
      id: 5,
      title: "Melhor Destilaria Inovadora",
      year: "2022",
      product: "Thornfield Destilaria",
      organization: "World Whisky Awards"
    },
    {
      id: 6,
      title: "Medalha de Ouro",
      year: "2022",
      product: "Aged Oak 12 Anos",
      organization: "International Wine & Spirit Competition"
    },
    {
      id: 7,
      title: "Top 10 Worldwide Whiskies",
      year: "2022",
      product: "Royal Reserve 18 Anos",
      organization: "Whisky Advocate"
    },
    {
      id: 8,
      title: "Melhor Single Malt Escocês",
      year: "2022",
      product: "Legacy Cask Strength",
      organization: "World Whiskies Awards"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const counterAnim = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} id="awards" className="relative py-24 bg-gradient-to-b from-[#0f0c08] to-[#0a0703] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/noise.png')] opacity-15 bg-repeat bg-[length:200px_200px]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <Image 
            src="/textures/award-pattern.svg"
            alt="Award Pattern" 
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute -right-32 top-1/3 w-96 h-96 rounded-full bg-amber-900/20 blur-[120px]"></div>
        <div className="absolute -left-32 top-2/3 w-64 h-64 rounded-full bg-amber-800/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">RECONHECIMENTO GLOBAL</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Premiações e Reconhecimentos</h2>
          <p className="text-gray-400">
            Nosso compromisso inabalável com a excelência e a qualidade tem sido reconhecido por especialistas e instituições 
            do mundo todo. Cada prêmio é um testemunho do nosso dedicado trabalho artesanal.
          </p>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: 1, 
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          } : { opacity: 0, scale: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#171411] to-[#0c0a08] rounded-lg p-6 text-center border border-amber-900/20">
            <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2">64</span>
            <span className="text-gray-400 text-sm">Prêmios Conquistados</span>
          </div>
          <div className="bg-gradient-to-br from-[#171411] to-[#0c0a08] rounded-lg p-6 text-center border border-amber-900/20">
            <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2">23</span>
            <span className="text-gray-400 text-sm">Medalhas de Ouro</span>
          </div>
          <div className="bg-gradient-to-br from-[#171411] to-[#0c0a08] rounded-lg p-6 text-center border border-amber-900/20">
            <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2">12</span>
            <span className="text-gray-400 text-sm">Reconhecimentos de Sustentabilidade</span>
          </div>
          <div className="bg-gradient-to-br from-[#171411] to-[#0c0a08] rounded-lg p-6 text-center border border-amber-900/20">
            <span className="block text-4xl md:text-5xl font-serif text-amber-500 mb-2">6</span>
            <span className="text-gray-400 text-sm">World Whisky Awards</span>
          </div>
        </motion.div>

        {/* Major Awards */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-serif text-white mb-12 text-center"
          >
            Premiações Principais
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {majorAwards.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 * i,
                    duration: 0.5,
                    ease: "easeOut"
                  }
                } : { opacity: 0, y: 40 }}
                className="bg-gradient-to-br from-[#171411] to-[#0c0a08] rounded-lg overflow-hidden border border-amber-900/40 relative group"
              >
                <div className="absolute top-0 right-0 -mt-5 -mr-5 w-28 h-28">
                  <div className="absolute inset-0 rotate-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-md"></div>
                  <div className="absolute inset-0 rotate-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-md"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-md flex items-center justify-center text-black font-bold text-lg">
                    {award.year}
                  </div>
                </div>

                <div className="p-8 pt-12">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <h4 className="text-xl font-serif text-white mb-3 text-center">{award.title}</h4>
                  <p className="text-amber-500 text-sm mb-4 text-center">{award.product}</p>
                  <p className="text-gray-400 text-sm mb-4 text-center">{award.description}</p>
                  
                  <div className="flex justify-center items-center mt-6 pt-6 border-t border-amber-900/20">
                    <span className="text-gray-500 text-xs">{award.organization}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pb-10"
        >
          <h3 className="text-2xl font-serif text-white mb-10 text-center">Reconhecimentos Recentes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAwards.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 * i,
                    duration: 0.5,
                    ease: "easeOut"
                  }
                } : { opacity: 0, y: 40 }}
                className="bg-gradient-to-b from-amber-900/5 to-transparent p-6 rounded-lg border border-amber-900/10 hover:border-amber-600/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-600/10 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-amber-500 text-xs">{award.year}</span>
                    <h4 className="text-white font-medium">{award.title}</h4>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-2">{award.product}</p>
                <p className="text-gray-500 text-xs">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 rounded-xl overflow-hidden relative"
        >
          <div className="absolute inset-0">
            <Image 
              src="/images/awards/award-banner.jpg" 
              alt="Award Banner" 
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          
          <div className="relative z-10 p-10 md:p-16 max-w-3xl">
            <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">EDIÇÃO PREMIADA</span>
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Experimente nossa seleção de whiskys premiados internacionalmente
            </h3>
            <p className="text-gray-300 mb-8">
              Desde nosso clássico Aged Oak 12 Anos até o extraordinário Royal Reserve 18 Anos, 
              nossa coleção de expressões premiadas está disponível para degustação e compra.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-md transition-colors">
                Explorar Coleção
              </button>
              <button className="px-8 py-3 border border-white/30 hover:border-white/60 text-white text-sm font-medium rounded-md transition-colors">
                Reservar Degustação
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
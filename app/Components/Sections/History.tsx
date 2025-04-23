"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function History() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const historyEvents = [
    {
      year: "1842",
      title: "Origens Humildes",
      description: "William Thornfield, um visionário das Terras Altas, estabelece uma pequena destilaria nas margens do rio Spey, utilizando técnicas tradicionais que aprendeu com seu pai e avô.",
      image: "/images/history/founding.jpg"
    },
    {
      year: "1897",
      title: "Reconhecimento Real",
      description: "A Rainha Vitória concede o Mandato Real à destilaria Thornfield após uma visita ao Castelo de Balmoral, onde provou e apreciou o single malt durante um jantar oficial.",
      image: "/images/history/royal-warrant.jpg"
    },
    {
      year: "1923",
      title: "Exportação Global",
      description: "Sob a liderança de Charles Thornfield, a destilaria expande suas operações e começa a exportar para os Estados Unidos, Europa e Ásia, estabelecendo uma reputação internacional.",
      image: "/images/history/export.jpg"
    },
    {
      year: "1954",
      title: "Inovação na Tradição",
      description: "A destilaria adota métodos aprimorados de maturação em barris, incluindo o pioneiro sistema de envelhecimento em barris previamente utilizados para Sherry e Porto.",
      image: "/images/history/innovation.jpg"
    },
    {
      year: "1978",
      title: "Prêmios e Reconhecimento",
      description: "O Thornfield 18 Anos é nomeado 'Melhor Whisky do Mundo' na primeira competição internacional de destilados, estabelecendo o padrão de excelência no setor.",
      image: "/images/history/awards.jpg"
    },
    {
      year: "2005",
      title: "Preservação Ambiental",
      description: "Implementação de práticas sustentáveis revolucionárias, incluindo um sistema de energia renovável próprio e técnicas de conservação de água que se tornaram referência no setor.",
      image: "/images/history/sustainability.jpg"
    },
    {
      year: "2022",
      title: "Herança Contínua",
      description: "A sexta geração da família Thornfield assume a liderança, honrando a tradição enquanto abraça a inovação e expande o portfólio com edições limitadas aclamadas pela crítica.",
      image: "/images/history/heritage.jpg"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-[#0b0906] to-[#0f0d0a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute left-0 top-0 w-1/3 h-full">
          <Image 
            src="/textures/old-paper.jpg" 
            alt="Textura de papel antigo" 
            fill
            className="object-cover object-right opacity-20"
          />
        </div>
        
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
          <Image 
            src="/textures/distillery.jpg" 
            alt="Textura de destilaria antiga" 
            fill
            className="object-cover object-left opacity-10"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">NOSSA HISTÓRIA</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Um Legado de Excelência</h2>
          <p className="text-gray-400">
            Há quase dois séculos, a destilaria Thornfield tem definido o padrão de excelência 
            no mundo dos whiskys premium. Nossa história é uma jornada de paixão, tradição e uma 
            busca incansável pela perfeição.
          </p>
        </motion.div>
        
        <div className="relative mt-20">
          {/* Linha do tempo */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-900/30 via-amber-700/50 to-amber-900/30 transform -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {historyEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0 ? "lg:rtl" : "lg:ltr"
                }`}
              >
                <div className={`relative z-10 lg:ltr lg:text-${index % 2 === 0 ? "left" : "right"}`}>
                  <div className="p-1 bg-gradient-to-br from-amber-700 to-amber-900/60 rounded-lg shadow-2xl">
                    <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden bg-black/30">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 bg-amber-700/80 text-white text-sm font-medium rounded mb-2">{event.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`relative z-10 lg:ltr ${
                  index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                }`}>
                  {/* Circle marker */}
                  <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-amber-700 rounded-full z-10 flex items-center justify-center shadow-lg shadow-amber-700/20">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className={`${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                    <h3 className="text-2xl font-serif text-white mb-3">{event.title}</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-amber-700 to-amber-500 mb-6"></div>
                    <p className="text-gray-400 mb-6">
                      {event.description}
                    </p>
                    <span className="text-amber-500 font-serif text-3xl font-light">{event.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <blockquote className="max-w-3xl mx-auto italic text-gray-300 text-xl font-serif">
            "A história não é apenas o que passou, mas também o que nos inspira para o futuro. Em cada gota de Thornfield, há quase dois séculos de conhecimento, tradição e inovação cuidadosa."
            <footer className="mt-4 text-sm text-amber-500 font-medium">
              — Elizabeth Thornfield, Mestre Destiladora
            </footer>
          </blockquote>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 text-center"
        >
          <a href="/historia" className="inline-flex items-center px-8 py-3 border-2 border-amber-700 text-amber-500 hover:bg-amber-700 hover:text-white transition-colors rounded-md text-sm font-medium group">
            <span>Explore Nossa História Completa</span>
            <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 
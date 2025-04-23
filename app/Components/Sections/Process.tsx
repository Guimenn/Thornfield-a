"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      id: 1,
      title: "Seleção dos Ingredientes",
      description: "Apenas os grãos de cevada mais premium, cultivados nas terras altas escocesas, são selecionados. Nossa água cristalina provém de nascentes naturais protegidas nas montanhas.",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Maltagem Tradicional",
      description: "Seguimos o método tradicional de maltagem em pisos, onde a cevada é germinada e depois seca sobre fogos de turfa, conferindo o característico sabor defumado.",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Fermentação Lenta",
      description: "Permitimos que a natureza siga seu curso. Nossa fermentação lenta, de até 120 horas em tinas de madeira, desenvolve um perfil aromático complexo e profundo.",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Destilação Dupla",
      description: "Nossos alambiques de cobre, alguns com mais de 100 anos, realizam uma destilação dupla, preservando apenas o 'coração' do destilado - a porção mais pura e saborosa.",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Maturação Paciente",
      description: "Nossos barris são selecionados individualmente de produtores de Sherry, Bourbon e vinho do Porto. A maturação ocorre por no mínimo 12 anos nas nossas caves históricas.",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Arte do Blending",
      description: "Nosso Mestre Blender, com décadas de experiência, seleciona e combina whiskys de diferentes barris para criar o perfil único e consistente que define Thornfield.",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-[#0f0d0a] to-[#0b0906] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute right-0 top-0 w-1/3 h-full">
          <Image
            src="/textures/cooper.jpg"
            alt="Textura de tanoaria"
            fill
            className="object-cover object-left opacity-20"
          />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" className="opacity-10">
            <pattern id="pattern-circles" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1" fill="none" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="0.5"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">NOSSO PROCESSO</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">A Arte da Destilação</h2>
          <p className="text-gray-400">
            Da seleção meticulosa dos ingredientes até o momento em que a garrafa é selada, cada etapa do nosso
            processo de produção é guiada por quase dois séculos de tradição, combinada com técnicas inovadoras
            que respeitam o legado, mas não temem o futuro.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Linha central do tempo */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-amber-900/0 via-amber-700/30 to-amber-900/0 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative md:grid md:grid-cols-2 items-center gap-8 ${
                  index % 2 === 0 ? "md:rtl" : "md:ltr"
                }`}
              >
                <div className={`relative z-10 md:text-${index % 2 === 0 ? "left" : "right"} md:ltr`}>
                  <div className={`mb-6 md:mb-0 bg-gradient-to-br from-amber-900/20 to-black/60 p-8 rounded-lg backdrop-blur-sm border border-amber-900/10 ${
                    index % 2 === 0 ? "ml-0 mr-0 md:ml-12 md:mr-4" : "ml-0 mr-0 md:mr-12 md:ml-4"
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 mr-4 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-serif text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                <div className={`hidden md:block relative ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                } md:ltr`}>
                  {/* Circle marker on timeline */}
                  <div className="absolute top-1/2 left-0 md:left-auto md:right-auto md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-6 h-6 bg-amber-600 rounded-full z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
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
          <a href="/destilaria" className="inline-flex items-center px-8 py-3 border-2 border-amber-700 text-amber-500 hover:bg-amber-700 hover:text-white transition-colors rounded-md text-sm font-medium group">
            <span>Conheça Nossa Destilaria</span>
            <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-gradient-to-br from-amber-900/20 to-black/60 p-8 rounded-lg backdrop-blur-sm border border-amber-900/10"
          >
            <div className="text-amber-500 mb-4">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-white mb-4">Artesanal e Tradicional</h3>
            <p className="text-gray-400">
              Nosso processo mantém técnicas artesanais tradicionais, realizadas à mão por artesãos com décadas de experiência. Esta abordagem preserva a autenticidade do nosso whisky.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-gradient-to-br from-amber-900/20 to-black/60 p-8 rounded-lg backdrop-blur-sm border border-amber-900/10"
          >
            <div className="text-amber-500 mb-4">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-white mb-4">Inovação Responsável</h3>
            <p className="text-gray-400">
              Embora respeitemos profundamente a tradição, não tememos a inovação. Incorporamos tecnologias modernas que melhoram a qualidade enquanto mantêm a essência do processo tradicional.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-gradient-to-br from-amber-900/20 to-black/60 p-8 rounded-lg backdrop-blur-sm border border-amber-900/10"
          >
            <div className="text-amber-500 mb-4">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-white mb-4">Sustentabilidade</h3>
            <p className="text-gray-400">
              Nosso processo é projetado para minimizar o impacto ambiental. Utilizamos energia renovável, reciclagem de água e práticas agrícolas sustentáveis para proteger a natureza escocesa.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MasterCraftsmanship() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const steps = [
    {
      id: 1,
      title: "Seleção de Ingredientes",
      description: "Grãos premium cultivados nas regiões mais férteis da Escócia, escolhidos manualmente por nossos especialistas.",
      icon: "/icons/grain.svg",
      color: "from-amber-700 to-amber-900"
    },
    {
      id: 2,
      title: "Destilação Meticulosa",
      description: "Processo de dupla destilação em alambiques de cobre tradicionais, seguindo técnicas centenárias.",
      icon: "/icons/distillation.svg",
      color: "from-amber-600 to-amber-800"
    },
    {
      id: 3,
      title: "Maturação em Barris Nobres",
      description: "Envelhecimento em barris selecionados de carvalho, anteriormente utilizados para envelhecer sherry espanhol e bourbon americano.",
      icon: "/icons/barrel.svg",
      color: "from-amber-700 to-amber-900"
    },
    {
      id: 4,
      title: "Harmonização Perfeita",
      description: "Blend meticuloso realizado por nosso Master Blender, criando perfis de sabor complexos e equilibrados.",
      icon: "/icons/blend.svg",
      color: "from-amber-800 to-amber-950"
    }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#0A0501] to-[#0D0702] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/noise.png')] opacity-15 bg-repeat bg-[length:200px_200px]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <Image 
            src="/textures/grain-pattern.svg"
            alt="Grain Pattern" 
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-amber-900/10 blur-[150px]"></div>
        <div className="absolute -left-64 bottom-1/4 w-96 h-96 rounded-full bg-amber-800/10 blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 text-amber-500 text-xs font-medium mb-4">
            TRADIÇÃO & EXCELÊNCIA
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            A <span className="text-amber-500">Arte</span> da Destilação
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Cada gota de Thornfield é resultado de um meticuloso processo artesanal, 
            que combina tradições ancestrais com técnicas modernas de precisão, 
            criando uma experiência sensorial incomparável.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 max-w-6xl mx-auto items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 relative rounded-xl overflow-hidden shadow-2xl shadow-amber-900/20 h-[600px]"
          >
            <Image
              src="/malcolm.png"
              alt="Master Distiller"
              fill
              className="object-cover rounded-xl object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            {/* Glass card overlay */}
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 p-8 border-t border-amber-700/20">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <span className="text-amber-400 text-sm tracking-wider mb-2 block">
                    EXPERTISE THORNFIELD
                  </span>
                  <h3 className="text-white text-2xl font-serif mb-2">
                  Malcolm Fraser
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Master Distiller, com mais de 30 anos de experiência na arte da destilação.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="md:col-span-7 flex flex-col">
           
            
            <div className="space-y-4 flex-grow">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 * i + 0.4 }}
                  className="bg-gradient-to-br from-[#1A1207]/80 to-[#0F0A04]/80 backdrop-blur-sm rounded-xl p-6 border border-amber-900/20 group hover:border-amber-800/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-900/10"
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/20 group-hover:shadow-amber-800/30 transition-all duration-500 group-hover:scale-110`}>
                      <span className="text-white font-serif font-bold text-lg">{step.id}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-amber-100 mb-2 group-hover:text-amber-50 transition-all duration-300">{step.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
} 
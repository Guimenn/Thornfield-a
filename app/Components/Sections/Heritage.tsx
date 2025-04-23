"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Heritage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });


  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0b0906] z-0"></div>
      
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="border-l-2 border-amber-700 pl-6">
                <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">NOSSA HERANÇA</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Uma Legacy de <br/> Excelência e <br/> Tradição Escocesa</h2>
                <p className="text-gray-400 max-w-lg">
                  Nas Highlands escocesas, entre vales nevoentos e rios cristalinos, nasceu em 1832 a destilaria Thornfield. 
                  Fundada por William Thornfield, ex-marinheiro e entusiasta das artes da destilação, nossa marca preserva 
                  até hoje os segredos e o conhecimento passados através de cinco gerações.
                </p>
              </div>
              
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-amber-700/60"></div>
                  <span className="text-white font-serif text-lg">Fundada em 2018</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-amber-700/60"></div>
                  <span className="text-white font-serif text-lg">Nova geração de destiladores</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-amber-700/60"></div>
                  <span className="text-white font-serif text-lg">Mais de 20 prêmios internacionais</span>
                </div>
              </div>
              
              <div className="mt-12">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-md transition-colors font-medium flex items-center gap-2"
                >
                  Nossa História
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-amber-900/30"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-amber-900/30"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <div className="relative h-[700px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/fotos-menu/1.png"
                  alt="Thornfield Distillery"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg p-6 border border-amber-900/20">
                    <h3 className="text-white font-serif text-xl mb-3">Destilaria Thornfield</h3>
                    <p className="text-gray-300 text-sm">
                      Situada nas montanhas das Highlands, nossa destilaria combina a arquitetura tradicional escocesa 
                      com tecnologia moderna, sempre respeitando os processos artesanais que definem nossos produtos.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </div>
    </section>
  );
} 
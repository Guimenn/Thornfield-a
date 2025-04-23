"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function BarrelAging() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const barrelTypes = [
    {
      name: "Ex-Bourbon",
      description: "Barris previamente utilizados para envelhecer bourbon americano conferem notas de baunilha, caramelo e coco ao nosso whisky.",
      image: "/barrels/bourbon.png",
      color: "amber"
    },
    {
      name: "Sherry Oloroso",
      description: "A influência dos barris de Sherry Oloroso espanhol adiciona ricas notas de frutas secas, especiarias e um perfil aveludado.",
      image: "/barrels/sherry.png",
      color: "red"
    },
    {
      name: "Carvalho Virgem",
      description: "Barris de primeiro uso trazem complexidade e estrutura tânica robusta, com notas intensas de madeira e especiarias.",
      image: "/barrels/virgin.png",
      color: "yellow"
    },
    {
      name: "Porto Ruby",
      description: "O acabamento em barris que envelheceram Porto Ruby proporciona nuances de frutas vermelhas maduras e um final adocicado.",
      image: "/barrels/port.png",
      color: "purple"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#0A0501] to-[#140D05] overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent"></div>
        <div className="absolute -right-24 top-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 bottom-1/4 w-72 h-72 bg-amber-900/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('/textures/wood-grain.png')]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-amber-500 font-medium tracking-wider mb-2"
          >
            O TEMPO COMO INGREDIENTE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            A Arte do Envelhecimento
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            O segredo da complexidade e do caráter excepcional do Thornfield está no meticuloso processo de envelhecimento em barris selecionados, onde o tempo trabalha sua magia.
          </motion.p>
        </div>

        {/* Imagem principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-5xl mx-auto mb-24"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-2xl">
            <Image
              src="/envelhecimento.png"
              alt="Warehouse de envelhecimento Thornfield"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60"></div>
            
            {/* Overlay de texto */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Armazém de Envelhecimento</h3>
                <p className="text-white/80 text-sm md:text-base">
                  Nossos barris descansam pacientemente no armazém histórico de Thornfield, onde as condições climáticas únicas das Highlands escocesas criam o ambiente perfeito para a maturação do whisky ao longo de décadas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tipos de barris */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl md:text-3xl font-serif text-center text-white mb-12"
          >
            A Influência dos Barris
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {barrelTypes.map((barrel, index) => (
              <motion.div
                key={barrel.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group relative bg-gray-900/30 border border-amber-900/20 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={barrel.image}
                    alt={barrel.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  
                  {/* Marca d'água estilizada */}
                  <div className="absolute top-4 right-4 opacity-30">
                    <svg className="w-16 h-16 text-amber-500/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-serif text-white mb-3">{barrel.name}</h4>
                  <p className="text-gray-400 text-sm">{barrel.description}</p>
                </div>
                
                {/* Indicador de cor de whisky */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Citação sobre envelhecimento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-24 py-12 px-6 border-t border-b border-amber-900/30 text-center"
        >
          <blockquote className="text-xl md:text-2xl font-serif text-white italic">
            "Um grande whisky não é feito, é esperado. O tempo é nosso mais valioso ingrediente."
          </blockquote>
          <div className="mt-4 text-amber-500">
            — Renan Queiroz, Co-fundador
          </div>
        </motion.div>

        {/* Infográfico do processo de envelhecimento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Seleção dos Barris",
                description: "Cada barril é minuciosamente selecionado por nosso Master Blender para garantir a qualidade e o perfil aromático desejado."
              },
              {
                number: "02",
                title: "Maturação Lenta",
                description: "Durante o processo de envelhecimento, o whisky respira através dos poros da madeira, ganhando complexidade e caráter."
              },
              {
                number: "03",
                title: "Monitoramento Contínuo",
                description: "Cada barril é regularmente provado e avaliado para determinar o momento perfeito de engarrafamento."
              }
            ].map((step, index) => (
              <div key={index} className="relative bg-gray-900/20 border border-amber-900/10 rounded-lg p-6 md:p-8">
                <div className="absolute -top-5 -left-5 bg-amber-700 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center font-serif shadow-lg">
                  {step.number}
                </div>
                <h4 className="text-xl text-white font-serif mb-4 mt-2">{step.title}</h4>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
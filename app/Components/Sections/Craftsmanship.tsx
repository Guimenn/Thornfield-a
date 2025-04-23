"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Craftsmanship() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const craftSteps = [
    {
      id: 1,
      title: "Seleção de Grãos",
      description: "Escolhemos apenas os melhores grãos escoceses, cultivados nas terras férteis das Highlands, para garantir a base perfeita para nosso whisky.",
      image: "/process/grains.jpg",
      icon: "🌾"
    },
    {
      id: 2,
      title: "Moagem e Maceração",
      description: "Nossos grãos passam por uma moagem precisa antes de serem macerados em água de nascente filtrada naturalmente pelas rochas graníticas dos montes Thornfield.",
      image: "/process/milling.jpg",
      icon: "💧"
    },
    {
      id: 3,
      title: "Fermentação Tradicional",
      description: "Utilizamos tanques de madeira de pinho escocês para a fermentação, que ocorre de forma lenta e cuidadosa por até 72 horas, desenvolvendo aromas complexos.",
      image: "/process/fermentation.jpg",
      icon: "🧪"
    },
    {
      id: 4,
      title: "Destilação Dupla",
      description: "Seguindo a tradição escocesa, nosso whisky passa por uma dupla destilação em alambiques de cobre, desenhados especificamente para criar o perfil aromático característico da Thornfield.",
      image: "/process/distillation.jpg",
      icon: "⚗️"
    },
    {
      id: 5,
      title: "Maturação Paciente",
      description: "Nossos barris são armazenados em caves centenárias onde o clima único das Highlands escocesas permite uma maturação lenta e constante, desenvolvendo sabores ricos e profundos.",
      image: "/process/maturation.jpg",
      icon: "🛢️"
    },
    {
      id: 6,
      title: "Blending Artesanal",
      description: "Nosso Mestre Blender, com mais de 40 anos de experiência, seleciona e combina cuidadosamente diferentes barris para criar o perfil único e consistente dos whiskys Thornfield.",
      image: "/process/blending.jpg",
      icon: "👨‍🔬"
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <section className="relative py-24 bg-[#080401] overflow-hidden">
      {/* Elementos decorativos e efeitos de fundo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image 
          src="/texture-wood.jpg" 
          alt="Textura de madeira" 
          fill 
          className="object-cover opacity-20 mix-blend-overlay"
        />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 text-amber-500 font-medium tracking-wider text-sm border-b border-amber-700/30"
          >
            TRADIÇÃO & EXCELÊNCIA
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mt-4 mb-6"
          >
            O Processo Artesanal Thornfield
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Cada gota do nosso whisky conta uma história de dedicação, paciência e tradição, herdada através de gerações de Mestres Destiladores da família Thornfield.
          </motion.p>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {craftSteps.map((step, i) => (
            <motion.div
              key={step.id}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              className="group relative bg-gradient-to-b from-amber-900/10 to-black/40 rounded-xl overflow-hidden backdrop-blur-sm border border-amber-900/10"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover brightness-75 transition-transform duration-700 group-hover:scale-110 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                
                <div className="absolute top-4 left-4 bg-amber-900/80 rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-sm border border-amber-600/30">
                  <span className="text-lg">{step.icon}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-900/50 border border-amber-700/30 flex items-center justify-center text-sm text-amber-300 font-medium">
                    {step.id}
                  </span>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-24 relative bg-gradient-to-r from-amber-900/20 to-black/60 rounded-xl overflow-hidden backdrop-blur-sm border border-amber-900/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-full min-h-[400px] overflow-hidden">
              <Image
                src="/master-distiller.jpg"
                alt="Mestre Destilador Thornfield"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-70 md:opacity-90"></div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-grow bg-amber-700/30"></div>
                <span className="text-amber-500 font-medium">MESTRE DESTILADOR</span>
                <div className="h-px flex-grow bg-amber-700/30"></div>
              </div>
              
              <h3 className="text-3xl font-serif text-white mb-6">Malcolm Thornfield</h3>
              
              <p className="text-gray-300 mb-8">
                "Um grande whisky não se faz apenas com técnica, mas com paixão e respeito pelo tempo. Cada barril guarda não apenas o destilado, mas as memórias, tradições e conhecimentos passados através de cinco gerações da minha família."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src="/signature.png"
                    alt="Assinatura Malcolm Thornfield"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">Malcolm Thornfield</div>
                  <div className="text-gray-400 text-sm">Mestre Destilador desde 1992</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
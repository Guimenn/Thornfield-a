"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const products = [
    {
      id: 1,
      name: "Royal Reserve 18",
      description: "Um single malt de caráter excepcional, maturado por 18 anos em barris de carvalho selecionados. Notas de mel, frutas secas e um toque sutil de especiarias o tornam verdadeiramente memorável.",
      price: "R$ 1.850",
      image: "/images/products/royal-reserve.png",
      color: "from-amber-900 to-amber-950",
      awards: ["World Whisky Awards 2022", "Spirit Masters Gold 2021"],
      featured: true
    },
    {
      id: 2,
      name: "Highland Glory 15",
      description: "Quinze anos de maturação paciente em barris de sherry resultam em um whisky com profundidade e complexidade únicas. Aromas de frutas maduras, nozes e chocolate escuro.",
      price: "R$ 1.390",
      image: "/images/products/highland-glory.png",
      color: "from-amber-800 to-amber-900",
      awards: ["International Spirits Challenge Silver"],
      featured: false
    },
    {
      id: 3,
      name: "Aged Oak 12",
      description: "Nossa expressão clássica de 12 anos, equilibrada e acessível. Caramelo, baunilha e um toque de carvalho tostado definem este whisky elegante que serve como uma excelente introdução ao mundo Thornfield.",
      price: "R$ 890",
      image: "/images/products/aged-oak.png",
      color: "from-yellow-800 to-amber-800",
      awards: [],
      featured: false
    },
    {
      id: 4,
      name: "Legacy Cask Strength",
      description: "Uma edição limitada não filtrada e em graduação de barril. Potente e vibrante, com 58.6% de teor alcoólico que realça seus sabores intensos de especiarias, frutas e mel.",
      price: "R$ 2.290",
      image: "/images/products/legacy-cask.png",
      color: "from-amber-950 to-stone-900",
      awards: ["Best Cask Strength 2023", "Spirits Business Platinum"],
      featured: true
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-[#0f0d0a] to-[#090807] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/grain.jpg')] bg-cover opacity-5"></div>
        <div className="absolute top-0 left-0 w-1/3 h-screen bg-gradient-to-br from-amber-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-screen bg-gradient-to-tl from-amber-900/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">NOSSA COLEÇÃO</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Expressões de Excelência</h2>
          <p className="text-gray-400">
            Cada garrafa Thornfield é o resultado de gerações de conhecimento, paixão e 
            um compromisso inabalável com a qualidade. Nossa coleção premium representa o 
            ápice da arte da destilação escocesa.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className={`relative rounded-lg overflow-hidden group transition-all duration-500 hover:shadow-xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-60 z-0`}></div>
              <div className="absolute inset-0 opacity-30 bg-[url('/textures/noise.png')] bg-repeat z-10"></div>
              
              <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 items-center p-8">
                <div className="md:col-span-5 relative flex items-center justify-center mb-8 md:mb-0">
                  <div className="relative h-[400px] w-full max-w-[200px] transform transition-all duration-700 group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                    
                    {/* Reflexo */}
                    <div className="absolute -bottom-6 left-0 right-0 h-8 bg-gradient-to-b from-white/20 to-transparent blur-sm transform scale-x-75"></div>
                  </div>
                </div>
                
                <div className="md:col-span-7 md:pl-6">
                  {product.featured && (
                    <span className="inline-block bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                      DESTAQUE
                    </span>
                  )}
                  
                  <h3 className="text-3xl font-serif text-white mb-3">
                    {product.name}
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-amber-500/70 mb-4"></div>
                  
                  <p className="text-gray-300 mb-6 text-sm">
                    {product.description}
                  </p>
                  
                  {product.awards.length > 0 && (
                    <div className="mb-6">
                      <p className="text-amber-400 text-xs font-medium mb-2">PRÊMIOS:</p>
                      <ul className="flex flex-wrap gap-2">
                        {product.awards.map((award, index) => (
                          <li key={index} className="text-white/80 text-xs bg-black/30 px-2 py-1 rounded">
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-white font-serif text-xl">{product.price}</span>
                    
                    <div className="space-x-3">
                      <button className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors">
                        Comprar Agora
                      </button>
                      <button className="px-4 py-2 border border-amber-700/70 hover:border-amber-600 text-amber-500 hover:text-amber-400 text-sm font-medium rounded transition-colors">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <a href="/colecao" className="inline-flex items-center px-8 py-3 border-2 border-amber-700 text-amber-500 hover:bg-amber-700 hover:text-white transition-colors rounded-md text-sm font-medium group">
            <span>Ver Coleção Completa</span>
            <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
        
        {/* Feature Banner - Edição Limitada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 relative rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
          <div className="absolute inset-0">
            <Image 
              src="/images/limited-edition-bg.jpg" 
              alt="Edição Limitada Thornfield" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="relative z-20 py-16 px-8 md:px-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-10 md:mb-0 md:pr-8">
              <span className="inline-block bg-amber-500/80 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                EDIÇÃO ESPECIAL LIMITADA
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Thornfield Rare Antiquity</h3>
              <p className="text-gray-300 mb-6">
                Uma expressão extraordinária e extremamente limitada, destilada em 1968 e maturada 
                por mais de cinco décadas em barris raros de carvalho espanhol. Apenas 200 garrafas disponíveis mundialmente.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-md transition-colors">
                  Reservar Agora
                </button>
                <button className="px-6 py-3 border border-white/30 hover:border-white/60 text-white text-sm font-medium rounded-md transition-colors">
                  Saber Mais
                </button>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="relative h-[350px] w-[180px]">
                <Image
                  src="/images/products/rare-antiquity.png"
                  alt="Thornfield Rare Antiquity"
                  fill
                  className="object-contain"
                />
                <div className="absolute -bottom-6 left-0 right-0 h-8 bg-gradient-to-b from-amber-500/20 to-transparent blur-sm transform scale-x-75"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
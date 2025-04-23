"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import whiskiesData from '../../data/whiskies.json';

export default function PopularWhiskies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [activeProduct, setActiveProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImagePath, setCurrentImagePath] = useState('');

  // Mapeando os dados do JSON para o formato necessário
  const whiskies = whiskiesData.whiskies.slice(0, 3).map((whisky, index) => {
    // Cores diferentes para cada whisky
    const colors = [
      { color: "from-amber-800 to-amber-900", glowColor: "amber-800/60" },
      { color: "from-amber-700 to-amber-800", glowColor: "amber-700/60" },
      { color: "from-amber-600 to-amber-700", glowColor: "amber-600/60" }
    ];
    
    // Log para verificar as propriedades de imagem
    console.log(`Whisky ${whisky.name}:`, {
      image_url: whisky.image_url,
    });
    
    return {
      ...whisky,
      color: colors[index % colors.length].color,
      glowColor: colors[index % colors.length].glowColor
    };
  });

  // Auto-rotate products every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveProduct((prev) => (prev + 1) % whiskies.length);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleProductChange = (index) => {
    if (activeProduct === index) return;
    setIsAnimating(true);
    setActiveProduct(index);
    setTimeout(() => setIsAnimating(false), 1000); // Match with animation duration
  };

  const currentProduct = whiskies[activeProduct];
  
  // Verificar se a URL da imagem está completa ou precisa de ajuste
  const getImageUrl = (whisky) => {
    // Verificar todas as possíveis propriedades de imagem, priorizando image_url
    const imageUrl = whisky.image_url || whisky.image;
    
    // Log para depuração
    console.log(`Whisky ${whisky.name} - URL encontrada:`, imageUrl);
    
    // Se não tiver imagem, use uma padrão
    if (!imageUrl) {
      console.log(`Whisky ${whisky.name} - Imagem não encontrada, usando padrão`);
      return "/images/products/default-whisky.png";
    }
    
    
    // Adicionar barra no início para garantir que é um caminho absoluto
    const finalUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    console.log(`Whisky ${whisky.name} - URL final:`, finalUrl);
    
    return finalUrl;
  };

  // Atualizar o caminho da imagem apenas uma vez na montagem do componente
  useEffect(() => {
    if (currentProduct) {
      const imgPath = getImageUrl(currentProduct);
      setCurrentImagePath(imgPath);
    }
  }, []); // Dependência vazia para executar apenas uma vez na montagem

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#0D0702] to-[#0A0501] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/noise.png')] opacity-15 bg-repeat bg-[length:200px_200px]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <Image 
            src="/textures/whisky-texture.svg"
            alt="Whisky Texture" 
            fill
            className="object-cover opacity-10"
          />
        </div>
        
        {/* Dynamic glow based on current product */}
        <motion.div 
          key={`glow-${currentProduct.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-amber-700/60 blur-[180px]"
          style={{ backgroundColor: currentProduct.glowColor.replace('/', ' ') }}
        ></motion.div>
        
        <motion.div 
          key={`glow2-${currentProduct.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-64 bottom-1/4 w-[400px] h-[400px] rounded-full bg-amber-700/60 blur-[150px]"
          style={{ backgroundColor: currentProduct.glowColor.replace('/', ' ') }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 text-amber-500 text-xs font-medium tracking-wider mb-5">
            SELEÇÃO PREMIADA
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Whiskys</span> Mais Famosos
          </h2>
          <div className="mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mb-6"></div>
          <p className="text-gray-400 leading-relaxed text-lg">
            Conheça os whiskys que tornaram a Thornfield mundialmente reconhecida. 
            Uma tradição de sabor e excelência em cada garrafa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-center">
          <motion.div
            key={`container-${currentProduct.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative h-[550px] w-[300px]">
              {/* Animated background glow effect */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1.05, opacity: 0.8 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 3
                }}
                className="absolute w-52 h-52 rounded-full blur-[120px] opacity-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  background: `linear-gradient(to bottom right, ${currentProduct.color.replace('from-', '').replace('to-', '')})` 
                }}
              ></motion.div>
              
              {/* Golden decorative elements */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-72 h-20 flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-amber-900/20 to-transparent rounded-full blur-md"
                ></motion.div>
              </div>
              
              {/* Product image with animations */}
              <AnimatePresence>
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative h-full w-full"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={currentImagePath}
                      alt={currentProduct.name}
                      className="h-[60vh] object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1, delayChildren: 0.2 }}
            key={`info-${currentProduct.id}`}
            className="lg:col-span-7 space-y-8"
          >
            <AnimatePresence>
              <motion.div
                key={`content-${currentProduct.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center space-x-4"
                >
                  <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-900/30 to-amber-700/20 text-amber-500 text-sm font-medium">
                    {currentProduct.year} Anos
                  </div>
                  <span className="text-amber-300/70 text-sm uppercase tracking-widest">{currentProduct.name}</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight"
                >
                  {currentProduct.name}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-24 h-0.5 bg-gradient-to-r from-amber-700 to-amber-500 mb-6"
                ></motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-300 leading-relaxed text-lg"
                >
                  {currentProduct.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
            >
              {currentProduct.tasting_notes.map((attribute, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                  className="flex items-center space-x-3 backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-amber-900/20 hover:border-amber-800/30 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-gray-300 text-sm">{attribute}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <a href="/colecao" 
                  className="group flex items-center justify-center bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 p-4 rounded-xl text-white shadow-lg shadow-amber-900/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-800/40 w-full"
                >
                  <span className="mr-3 font-medium">Ver Todos os Whiskys</span>
                  <span className="w-8 h-8 rounded-full bg-amber-700/40 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                
                <a href={`/produto/${currentProduct.id}`} 
                  className="group flex items-center justify-center bg-black/40 hover:bg-black/60 border border-amber-800/30 hover:border-amber-700/50 p-4 rounded-xl text-white transition-all duration-300 w-full"
                >
                  <span className="font-medium">Comprar Agora</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
            {whiskies.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductChange(index)}
                className={`group relative px-4 py-3 rounded-lg transition-all duration-500 ${
                  activeProduct === index 
                    ? 'bg-gradient-to-r from-amber-900/30 to-amber-800/30 border-amber-700/40' 
                    : 'bg-black/20 hover:bg-black/30 border-amber-900/10 hover:border-amber-800/30'
                } border backdrop-blur-sm`}
                aria-label={`Ver ${product.name}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${activeProduct === index ? 'bg-amber-600/30 border-2 border-amber-500' : 'bg-black/30 border border-amber-900/30 group-hover:border-amber-800/50'} transition-all duration-300`}>
                    <Image 
                      src={product.icon || "/icons-whisky/default-icon.svg"} 
                      alt={`${product.name} icon`}
                      width={24}
                      height={24}
                      className={`transition-all duration-300 ${activeProduct === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'}`}
                    />
                  </div>
                  <span className={`text-sm ${activeProduct === index ? 'text-amber-200' : 'text-gray-400 group-hover:text-gray-300'} transition-colors duration-300`}>
                    {product.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
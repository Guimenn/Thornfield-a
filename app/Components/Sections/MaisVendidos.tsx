'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Button from '../Ui/Button';

type Whisky = {
  id: string;
  name: string;
  description: string;
  image: string;
  image_url: string;
  year: number;
  price: number;
  tasting_notes: string[];
  icon: string;
  quantity: number;
};

export default function MaisVendidos() {
  const [whiskies, setWhiskies] = useState<Whisky[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0); // -1 para esquerda, 1 para direita
  const [isAnimating, setIsAnimating] = useState(false);

  // Buscar os whiskies do arquivo JSON
  useEffect(() => {
    const fetchWhiskies = async () => {
      try {
        const response = await fetch('/api/whiskies');
        const data = await response.json();
        
        // Filtrar apenas os whiskies com IDs 1, 2, 5 e 8
        const filteredWhiskies = data.whiskies.filter((whisky: Whisky) => 
          ['1', '2', '5', '8'].includes(whisky.id)
        );
        
        // Organizar na ordem correta
        const orderedWhiskies = ['1', '2', '5', '8'].map(id => 
          filteredWhiskies.find(whisky => whisky.id === id)
        ).filter(Boolean) as Whisky[];
        
        setWhiskies(orderedWhiskies);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar whiskies:', error);
        setIsLoading(false);
      }
    };

    fetchWhiskies();
  }, []);

  // Função para navegar para o próximo whisky
  const nextWhisky = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= whiskies.length ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Função para navegar para o whisky anterior
  const prevWhisky = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? whiskies.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Determinar os índices dos whiskies a serem exibidos
  const secondIndex = (currentIndex + 1) % whiskies.length;

  if (isLoading) {
    return (
      <div className="bg-black text-white py-20">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="w-6 h-6 border-t-2 border-amber-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Background elegante */}
      <div className="absolute inset-0 bg-[url('/textures/dark-grain.png')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-amber-950/5 to-black/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 gradient-text bg-gradient-to-r from-amber-300 to-amber-500">
            Whiskies Mais Vendidos
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Uma seleção exclusiva dos nossos whiskies premium mais procurados, cada um com caráter e perfil únicos.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Primeiro whisky visível */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`card-${currentIndex}`}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WhiskyCard 
                  whisky={whiskies[currentIndex]} 
                  index={0}
                  isReference={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Segundo whisky visível */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`card-${secondIndex}`}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WhiskyCard 
                  whisky={whiskies[secondIndex]} 
                  index={1}
                  isReference={secondIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegação */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button 
              onClick={prevWhisky}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-amber-600/30 text-amber-500 hover:bg-amber-900/20 transition-all duration-300 active:scale-95"
              aria-label="Whisky anterior"
              disabled={isAnimating}
            >
              <FiChevronLeft size={24} />
            </button>
            <div className="flex space-x-2">
              {whiskies.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex || idx === secondIndex 
                      ? 'bg-amber-500' 
                      : 'bg-amber-500/30'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextWhisky}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-amber-600/30 text-amber-500 hover:bg-amber-900/20 transition-all duration-300 active:scale-95"
              aria-label="Próximo whisky"
              disabled={isAnimating}
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de card para cada whisky
function WhiskyCard({ whisky, index, isReference }: { whisky: Whisky, index: number, isReference: boolean }) {
  return (
    <div className="group">
      <div className="relative overflow-hidden bg-gradient-to-b from-amber-950/50 w-[40vw] to-black/70 rounded-lg border border-amber-900/20 shadow-xl transition-all duration-500 h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          {/* Imagem do Whisky */}
          <div className="md:col-span-3 relative py-5 px-3 flex items-center justify-center h-full">
            <div className="relative h-72 w-full md:h-full md:w-full transform group-hover:scale-105 transition-transform duration-700">
              <Image 
                src={whisky.image_url} 
                alt={whisky.name} 
                fill
                className="object-cover w-[10vw] h-60"
              />
              <div className="absolute -inset-1 bg-amber-500/10 blur-lg rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
            </div>
          </div>
          
          {/* Informações do Whisky */}
          <div className="md:col-span-2 py-5 px-3 flex flex-col justify-center h-full">
            <div className="flex">
              <div className="flex items-center mb-2">
                <Image
                  src={whisky.icon}
                  alt="Ícone"
                  width={24}
                  height={24}
                  className="mr-2 mb-4 opacity-70"
                />
              </div>
              
              <h3 className="md:text-[1.1rem] font-serif mb-3 text-white group-hover:text-amber-300 transition-colors duration-300">
                {whisky.name}
              </h3>
            </div>
            
            <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
              {whisky.description}
            </p>
            
            {/* Notas de Degustação */}
            <div className="mb-4">
              <h4 className="text-amber-400 text-[0.8rem] uppercase tracking-wider mb-2">Notas de Degustação</h4>
              <div className="flex flex-wrap gap-2 max-h-[60px] overflow-hidden">
                {whisky.tasting_notes.map((note, idx) => (
                  <span 
                    key={idx} 
                    className="text-[0.7rem] inline-block px-2 py-1 bg-amber-900/30 text-amber-200 rounded-full border border-amber-800/20"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <Link href={`/product/${whisky.id}`}>
                <Button>
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

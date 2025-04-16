"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";


// Interface para a tipagem dos drinks
interface Drink {
  id: string;
  name: string;
  baseWhisky: string;
  notes: string[];
  recipe: string[];
  toque: string;
  estilo: string;
  baseId: string;
  tipo: string;
  ocasiao: string;
  image: string;
}

// Dados dos drinks
import drinksData from "../../data/drinks.json";

// Função para obter os whiskies do localStorage ou usar os padrões
const getWhiskiesFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedWhiskies = localStorage.getItem('whiskies');
    if (storedWhiskies) {
      return JSON.parse(storedWhiskies);
    }
  }
  return [];
};

// Extrair categorias únicas para os filtros
const drinks: Drink[] = drinksData.drinks;
const tipos = [...new Set(drinks.map(drink => drink.tipo))];
const ocasioes = [...new Set(drinks.map(drink => drink.ocasiao))];
const whiskies = [...new Set(drinks.map(drink => drink.baseWhisky))];

// Componente separado para o card de drink
const DrinkCard = ({ drink }: { drink: Drink }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <motion.div
      key={drink.id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/pages/drinks/${drink.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={drink.image}
            alt={drink.name}
            width={500}
            height={500}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-serif text-white">{drink.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm text-amber-500 bg-black/60 px-3 py-1 rounded-full">{drink.baseWhisky}</span>
              <span className="text-sm text-white/80 bg-black/60 px-3 py-1 rounded-full">{drink.tipo}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Drinks() {
  // Estados para os filtros
  const [selectedWhisky, setSelectedWhisky] = useState<string | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [selectedOcasiao, setSelectedOcasiao] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [storedWhiskies, setStoredWhiskies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const drinksPerPage = 9;
  
  // Referência para o hero
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Carregar os whiskies do localStorage quando o componente for montado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWhiskiesData = localStorage.getItem('whiskies');
      if (storedWhiskiesData) {
        setStoredWhiskies(JSON.parse(storedWhiskiesData));
      }
    }
  }, []);
  
  // Filtrar drinks baseado nos filtros selecionados e disponibilidade de estoque
  const filteredDrinks = drinks.filter(drink => {
    if (selectedWhisky && drink.baseWhisky !== selectedWhisky) return false;
    if (selectedTipo && drink.tipo !== selectedTipo) return false;
    if (selectedOcasiao && drink.ocasiao !== selectedOcasiao) return false;
    
    // Verificar se o whisky base está disponível em estoque
    if (storedWhiskies.length > 0) {
      const whiskyInStock = storedWhiskies.find(w => 
        w.name === drink.baseWhisky && w.quantity > 0
      );
      // Se não encontrar o whisky ou a quantidade for 0, não mostrar o drink
      if (!whiskyInStock) {
        return false;
      }
    }
    
    return true;
  });

  // Calcular páginas para paginação
  const totalPages = Math.ceil(filteredDrinks.length / drinksPerPage);
  
  // Obter drinks da página atual
  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = filteredDrinks.slice(indexOfFirstDrink, indexOfLastDrink);
  
  // Funções para navegar entre páginas
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handler para mudar filtros
  const handleFilterChange = (filterType: string, value: string) => {
    // Se clicar no mesmo valor já selecionado, limpa esse filtro
    if (
      (filterType === 'whisky' && selectedWhisky === value) ||
      (filterType === 'tipo' && selectedTipo === value) ||
      (filterType === 'ocasiao' && selectedOcasiao === value)
    ) {
      if (filterType === 'whisky') setSelectedWhisky(null);
      if (filterType === 'tipo') setSelectedTipo(null);
      if (filterType === 'ocasiao') setSelectedOcasiao(null);
    } else {
      // Caso contrário, aplica o novo filtro
      if (filterType === 'whisky') setSelectedWhisky(value);
      if (filterType === 'tipo') setSelectedTipo(value);
      if (filterType === 'ocasiao') setSelectedOcasiao(value);
    }
    
    // Resetar para a primeira página quando um filtro é alterado
    setCurrentPage(1);
  };

  // Efeito para o parallax no hero
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Limpar todos os filtros
  const clearFilters = () => {
    setSelectedWhisky(null);
    setSelectedTipo(null);
    setSelectedOcasiao(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[85vh] w-full flex items-center overflow-hidden"
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/drinks-images/banner.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollProgress * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
       
        {/* Content Layout */}
        <div className="relative z-10 w-full">
          <div className="max-w-[1920px] mx-auto px-8 md:px-12 h-full flex flex-col justify-center py-12">
            {/* Main Content */}
            <div className="flex flex-col items-start max-w-xl">
              {/* Brand Mark */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-amber-500 to-transparent"></div>
                  <span className="text-amber-500 text-sm tracking-[0.5em] font-light">THORNFIELD</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-serif tracking-wide text-white mb-8">
                  DRINKS
                </h1>
                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent"></div>
                  <p className="text-lg text-white/90 font-light leading-relaxed max-w-lg pl-6">
                    Explore nossas criações exclusivas que exaltam toda a complexidade e caráter dos whiskies Thornfield
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Filtros Redesenhados */}
      <div className="bg-gradient-to-r from-black via-black/95 to-black py-10 border-b border-amber-800/20 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-6">
            {/* Título e descrição */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-serif mb-2">Filtrar Drinks</h2>
              <div className="w-16 h-0.5 bg-amber-600/50 mx-auto"></div>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Filtro por Whisky */}
              <div className="w-full md:w-auto">
                <div 
                  className="flex items-center justify-between cursor-pointer border border-amber-700/30 hover:border-amber-600 transition-all duration-300 px-5 py-3 min-w-[220px]"
                  onClick={() => setActiveFilter(activeFilter === 'whisky' ? null : 'whisky')}
                >
                  <span className="text-amber-500">Base de Whisky</span>
                  <svg className={`w-4 h-4 fill-current text-amber-500 transition-transform ${activeFilter === 'whisky' ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
                
                <AnimatePresence>
                  {activeFilter === 'whisky' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-black/80 border-x border-b border-amber-700/30 divide-y divide-amber-800/20"
                    >
                      {whiskies.map(whisky => (
                        <div 
                          key={whisky}
                          className={`px-5 py-2 cursor-pointer hover:bg-amber-900/10 transition-colors duration-200 ${selectedWhisky === whisky ? 'bg-amber-800/20 text-amber-400' : 'text-white/80'}`}
                          onClick={() => handleFilterChange('whisky', whisky)}
                        >
                          {whisky}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Filtro por Tipo */}
              <div className="w-full md:w-auto">
                <div 
                  className="flex items-center justify-between cursor-pointer border border-amber-700/30 hover:border-amber-600 transition-all duration-300 px-5 py-3 min-w-[220px]"
                  onClick={() => setActiveFilter(activeFilter === 'tipo' ? null : 'tipo')}
                >
                  <span className="text-amber-500">Tipo de Drink</span>
                  <svg className={`w-4 h-4 fill-current text-amber-500 transition-transform ${activeFilter === 'tipo' ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
                
                <AnimatePresence>
                  {activeFilter === 'tipo' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-black/80 border-x border-b border-amber-700/30 divide-y divide-amber-800/20"
                    >
                      {tipos.map(tipo => (
                        <div 
                          key={tipo}
                          className={`px-5 py-2 cursor-pointer hover:bg-amber-900/10 transition-colors duration-200 ${selectedTipo === tipo ? 'bg-amber-800/20 text-amber-400' : 'text-white/80'}`}
                          onClick={() => handleFilterChange('tipo', tipo)}
                        >
                          {tipo}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Filtro por Ocasião */}
              <div className="w-full md:w-auto">
                <div 
                  className="flex items-center justify-between cursor-pointer border border-amber-700/30 hover:border-amber-600 transition-all duration-300 px-5 py-3 min-w-[220px]"
                  onClick={() => setActiveFilter(activeFilter === 'ocasiao' ? null : 'ocasiao')}
                >
                  <span className="text-amber-500">Ocasião</span>
                  <svg className={`w-4 h-4 fill-current text-amber-500 transition-transform ${activeFilter === 'ocasiao' ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
                
                <AnimatePresence>
                  {activeFilter === 'ocasiao' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-black/80 border-x border-b border-amber-700/30 divide-y divide-amber-800/20"
                    >
                      {ocasioes.map(ocasiao => (
                        <div 
                          key={ocasiao}
                          className={`px-5 py-2 cursor-pointer hover:bg-amber-900/10 transition-colors duration-200 ${selectedOcasiao === ocasiao ? 'bg-amber-800/20 text-amber-400' : 'text-white/80'}`}
                          onClick={() => handleFilterChange('ocasiao', ocasiao)}
                        >
                          {ocasiao}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Filtros ativos e botão limpar */}
            {(selectedWhisky || selectedTipo || selectedOcasiao) && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <span className="text-white/70 text-sm mr-2">Filtros ativos:</span>
                
                {selectedWhisky && (
                  <span className="inline-flex items-center bg-amber-900/30 border border-amber-700/40 text-amber-400 text-sm rounded-md px-3 py-1">
                    {selectedWhisky}
                    <button 
                      onClick={() => setSelectedWhisky(null)}
                      className="ml-2 text-amber-400/70 hover:text-amber-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {selectedTipo && (
                  <span className="inline-flex items-center bg-amber-900/30 border border-amber-700/40 text-amber-400 text-sm rounded-md px-3 py-1">
                    {selectedTipo}
                    <button 
                      onClick={() => setSelectedTipo(null)}
                      className="ml-2 text-amber-400/70 hover:text-amber-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {selectedOcasiao && (
                  <span className="inline-flex items-center bg-amber-900/30 border border-amber-700/40 text-amber-400 text-sm rounded-md px-3 py-1">
                    {selectedOcasiao}
                    <button 
                      onClick={() => setSelectedOcasiao(null)}
                      className="ml-2 text-amber-400/70 hover:text-amber-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                
                <button
                  onClick={clearFilters}
                  className="text-white/80 hover:text-white border border-amber-700/50 hover:border-amber-600 text-sm rounded-md px-3 py-1 transition-colors duration-300"
                >
                  Limpar todos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Grade de Drinks */}
      <div className="container mx-auto px-4 py-16">
        {filteredDrinks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-white/60">Nenhum drink encontrado com os filtros selecionados</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-sm text-sm tracking-wider uppercase"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <>
            {/* Título da página atual */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-serif mb-2">Nossas Receitas</h2>
              <p className="text-amber-500/80">Página {currentPage} de {totalPages}</p>
            </div>

            {/* Grid de drinks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDrinks.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
            
            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-sm ${currentPage === 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-amber-900/30 text-amber-500 hover:bg-amber-800/50'} transition-colors`}
                >
                  Anterior
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`w-10 h-10 rounded-sm ${currentPage === i + 1 ? 'bg-amber-600 text-white' : 'bg-black border border-amber-800/30 text-amber-500 hover:bg-amber-900/50'} transition-colors`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-sm ${currentPage === totalPages ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-amber-900/30 text-amber-500 hover:bg-amber-800/50'} transition-colors`}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Footer CTA */}
      <div className="relative py-20 bg-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "url('/pattern-dark.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Experimente Nossas Criações</h2>
          <p className="mx-auto max-w-2xl text-lg text-white/80 mb-10">
            Visite nossa destilaria em Edinburgo para experimentar todos estes drinks preparados com maestria por nossos mixologistas.
          </p>
          <Link
            href="/pages/produtos"
            className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
          >
            Conheça Nossos Whiskies
          </Link>
        </div>
      </div>
    </div>
  );
}
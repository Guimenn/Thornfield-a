"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
const drinks: Drink[] = [
  {
    id: "1",
    name: "Thornfield Flame",
    baseWhisky: "ULTRA RESERVE",
    notes: ["Canela", "Carvalho", "Especiarias"],
    recipe: [
      "50ml ULTRA RESERVE",
      "15ml licor de canela",
      "1 dash de bitters de laranja",
      "Finalize com casca de laranja flambada"
    ],
    toque: "Sirva em copo baixo com pedra grande de gelo e uma lasca de canela queimada",
    estilo: "Clássico com sofisticação rústica",
    baseId: "1",
    tipo: "Clássico",
    ocasiao: "Happy Hour",
    image: "/drinks-images/drink-1.png"
  },
  {
    id: "2",
    name: "Oak Noir",
    baseWhisky: "SHADOW OAK",
    notes: ["Chocolate", "Amoras", "Cravos"],
    recipe: [
      "50ml SHADOW OAK",
      "20ml licor de cacau",
      "20ml xarope de amora",
      "1 cravo-da-índia amassado"
    ],
    toque: "Decore com uma amora fresca e raspas de chocolate amargo",
    estilo: "Misterioso, intenso, ideal para noites longas",
    baseId: "2",
    tipo: "Doce",
    ocasiao: "Noite",
    image: "/drinks-images/drink-2.png"
  },
  {
    id: "3",
    name: "Golden Ember",
    baseWhisky: "MIDNIGHT GOLD",
    notes: ["Caramelo", "Gengibre", "Tabaco"],
    recipe: [
      "50ml MIDNIGHT GOLD",
      "15ml xarope de caramelo artesanal",
      "1 fatia fina de gengibre fresco",
      "Fumaça de folha de tabaco (opcional para defumar o copo)"
    ],
    toque: "Sirva em copo defumado, com gengibre cristalizado ao lado",
    estilo: "Marcante, para apreciadores ousados",
    baseId: "3",
    tipo: "Intenso",
    ocasiao: "Degustação",
    image: "/drinks-images/drink-3.png"
  },
  {
    id: "4",
    name: "Mist & Berry",
    baseWhisky: "BLUE MIST",
    notes: ["Blueberry", "Hortelã", "Eucalipto"],
    recipe: [
      "50ml BLUE MIST",
      "25ml licor de blueberry",
      "6 folhas de hortelã",
      "1 splash de água com gás levemente aromatizada de eucalipto"
    ],
    toque: "Sirva em taça alta com gelo e galho de hortelã fresco",
    estilo: "Refrescante, perfeito para dias claros",
    baseId: "4",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-4.png"
  },
  {
    id: "5",
    name: "Amber Hive",
    baseWhisky: "HONEY EMBER",
    notes: ["Mel", "Pêra", "Cravos"],
    recipe: [
      "50ml HONEY EMBER",
      "15ml licor de pêra",
      "1 colher de chá de mel",
      "1 cravo-da-índia"
    ],
    toque: "Sirva em taça pequena, finalize com uma fatia de pêra flambada no mel",
    estilo: "Doce, elegante e aconchegante",
    baseId: "5",
    tipo: "Doce",
    ocasiao: "Sobremesa",
    image: "/drinks-images/drink-5.png"
  },
  {
    id: "6",
    name: "Velvet Hearth",
    baseWhisky: "CRIMSON HEARTH",
    notes: ["Cereja", "Nozes", "Pimenta"],
    recipe: [
      "50ml CRIMSON HEARTH",
      "20ml licor de cereja",
      "1 noz moscada ralada por cima",
      "1 pitada de pimenta rosa moída"
    ],
    toque: "Sirva em copo estilo coupe, com cereja marasquino no fundo",
    estilo: "Aveludado e apaixonante",
    baseId: "6",
    tipo: "Frutado",
    ocasiao: "Celebração",
    image: "/drinks-images/drink-6.png"
  },
  {
    id: "7",
    name: "Green Essence",
    baseWhisky: "EMERALD WHISPER",
    notes: ["Maçã verde", "Hortelã", "Ervas"],
    recipe: [
      "50ml EMERALD WHISPER",
      "30ml suco de maçã verde natural",
      "10ml xarope de hortelã",
      "Raminho de alecrim batido"
    ],
    toque: "Sirva em copo longo com bastante gelo e uma fatia de maçã verde",
    estilo: "Herbal, jovem e revigorante",
    baseId: "7",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-7.png"
  },
  {
    id: "8",
    name: "Barrel Black",
    baseWhisky: "OBISIDIAN VEIL",
    notes: ["Café", "Especiarias", "Carvalho"],
    recipe: [
      "50ml OBISIDIAN VEIL",
      "25ml café espresso gelado",
      "10ml xarope de especiarias (canela, cardamomo, noz-moscada)"
    ],
    toque: "Sirva em copo baixo com borda de açúcar mascavo e cacau",
    estilo: "Intenso, direto, para os fortes",
    baseId: "8",
    tipo: "Intenso",
    ocasiao: "Noite",
    image: "/drinks-images/drink-8.png"
  },
  {
    id: "9",
    name: "Lunar Bloom",
    baseWhisky: "PHANTOM BLOOM",
    notes: ["Néctar da flor de lua", "Lavanda", "Açafrão"],
    recipe: [
      "50ml PHANTOM BLOOM",
      "20ml xarope de lavanda",
      "5 gotas de tintura de açafrão",
      "Água tônica floral (opcional)"
    ],
    toque: "Sirva em taça com pétalas comestíveis e gelo translúcido",
    estilo: "Etéreo, floral, memorável",
    baseId: "9",
    tipo: "Floral",
    ocasiao: "Especial",
    image: "/drinks-images/drink-9.png"
  }
];

// Extrair categorias únicas para os filtros
const whiskies = [...new Set(drinks.map(drink => drink.baseWhisky))];
const tipos = [...new Set(drinks.map(drink => drink.tipo))];
const ocasioes = [...new Set(drinks.map(drink => drink.ocasiao))];

export default function Drinks() {
  // Estados para os filtros
  const [selectedWhisky, setSelectedWhisky] = useState<string | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);
  const [selectedOcasiao, setSelectedOcasiao] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Referência para o hero
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Filtrar drinks baseado nos filtros selecionados
  const filteredDrinks = drinks.filter(drink => {
    if (selectedWhisky && drink.baseWhisky !== selectedWhisky) return false;
    if (selectedTipo && drink.tipo !== selectedTipo) return false;
    if (selectedOcasiao && drink.ocasiao !== selectedOcasiao) return false;
    return true;
  });

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
            backgroundImage: 'url("/whiskys-fundo/banner.png")',
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
     
      {/* Filtros com Dropdowns */}
      <div className="bg-black/90 py-10 border-b border-amber-800/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-white text-lg font-light">Filtrar receitas por:</span>
              
              {/* Dropdown para Whisky Base */}
              <div className="relative min-w-[220px]">
                <select
                  value={selectedWhisky || ''}
                  onChange={(e) => setSelectedWhisky(e.target.value || null)}
                  className="appearance-none w-full bg-white text-black py-3 px-4 pr-8 rounded-none focus:outline-none"
                >
                  <option value="">Todos os produtos</option>
                  {whiskies.map(whisky => (
                    <option key={whisky} value={whisky}>{whisky}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              
              {/* Dropdown para Tipo */}
              <div className="relative min-w-[220px]">
                <select
                  value={selectedTipo || ''}
                  onChange={(e) => setSelectedTipo(e.target.value || null)}
                  className="appearance-none w-full bg-white text-black py-3 px-4 pr-8 rounded-none focus:outline-none"
                >
                  <option value="">Todos os tipos</option>
                  {tipos.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              
              {/* Dropdown para Ocasião */}
              <div className="relative min-w-[220px]">
                <select
                  value={selectedOcasiao || ''}
                  onChange={(e) => setSelectedOcasiao(e.target.value || null)}
                  className="appearance-none w-full bg-white text-black py-3 px-4 pr-8 rounded-none focus:outline-none"
                >
                  <option value="">Todas as ocasiões</option>
                  {ocasioes.map(ocasiao => (
                    <option key={ocasiao} value={ocasiao}>{ocasiao}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              
              {/* Botão para limpar filtros */}
              {(selectedWhisky || selectedTipo || selectedOcasiao) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-amber-600 text-white transition-colors duration-300 hover:bg-amber-700"
                >
                  Limpar
                </button>
              )}
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrinks.map((drink) => {
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
                  <Link href={`/drinks/${drink.id}`} className="block">
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
            })}
          </div>
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
            href="/produtos"
            className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
          >
            Conheça Nossos Whiskies
          </Link>
        </div>
      </div>
    </div>
  );
} 
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Whisky {
  id: string;
  name: string;
  description: string;
  image: string;
  year: number;
  price: number;
  tasting_notes: string[];
  icon: string;
}

const whiskies: Whisky[] = [
  {
    id: "1",
    name: "ULTRA RESERVE",
    description: "Clássico e refinado, com notas profundas reveladas pelo carvalho nobre.",
    image: "/whiskys-fundo/10.png",
    year: 18,
    price: 599.90,
    tasting_notes: ["Canela", "Carvalho", "Especiarias"],
    icon: "/icons-whisky/tumbler-glass-svgrepo-com.svg"
  },
  {
    id: "2",
    name: "SHADOW OAK",
    description: "Misterioso e encorpado, um blend que carrega o legado da tradição.",
    image: "/whiskys-fundo/11.png",
    year: 18,
    price: 499.90,
    tasting_notes: ["Chocolate", "Amoras", "Cravos"],
    icon: "/icons-whisky/chocolate-svgrepo-com.svg"
  },
  {
    id: "3",
    name: "MIDNIGHT GOLD",
    description: "Defumado e intenso, com brilho dourado e presença marcante.",
    image: "/whiskys-fundo/12.png",
    year: 15,
    price: 229.90,
    tasting_notes: ["Caramelo", "Gengibre", "Tabaco"],
    icon: "/icons-whisky/gold-bar-svgrepo-com.svg"
  },
  {
    id: "4",
    name: "BLUE MIST",
    description: "Suave e fresco, inspirado na bruma das montanhas escocesas.",
    image: "/whiskys-fundo/13.png",
    year: 14,
    price: 119.90,
    tasting_notes: ["Blueberry", "Hortelã", "Eucalipto"],
    icon: "/icons-whisky/berry-cooking-food-svgrepo-com.svg"
  },
  {
    id: "5",
    name: "HONEY EMBER",
    description: "Doce e especiado, com calor sutil vindo dos barris europeus",
    image: "/whiskys-fundo/14.png",
    year: 16,
    price: 199.90,
    tasting_notes: ["Mel", "Pêra", "Cravos"],
    icon: "/icons-whisky/bee-illustration-2-svgrepo-com.svg"
  },
  {
    id: "6",
    name: "CRIMSON HEARTH",
    description: "Aveludado e vibrante, com notas que aquecem como um lar acolhedor.",
    image: "/whiskys-fundo/15.png",
    year: 17,
    price: 359.90,
    tasting_notes: ["Cereja", "Nozes", "Pimenta"],
    icon: "/icons-whisky/cherry-svgrepo-com.svg"
  },
  {
    id: "7",
    name: "EMERALD WHISPER",
    description: "Verde e herbal, com frescor elegante e alma atlântica.",
    image: "/whiskys-fundo/16.png",
    year: 15,
    price: 139.90,
    tasting_notes: ["Maçã verde", "Hortelã", "Ervas"],
    icon: "/icons-whisky/apple-5-svgrepo-com.svg"
  },
  {
    id: "8",
    name: "OBISIDIAN VEIL",
    description: "Cru e potente, engarrafado direto do barril, sem concessões.",
    image: "/whiskys-fundo/17.png",
    year: 20,
    price: 669.90,
    tasting_notes: ["Café", "Especiarias", "Carvalho"],
    icon: "/icons-whisky/coffee-grain-coffee-svgrepo-com.svg"
  },
  {
    id: "9",
    name: "PHANTOM BLOOM",
    description: "Florido e raro, um tributo delicado à história da Thornfield.",
    image: "/whiskys-fundo/18.png",
    year: 22,
    price: 899.90,
    tasting_notes: ["Néctar da flor de lua", "Lavanda", "Açafrão"],
    icon: "/icons-whisky/flower-ornament-svgrepo-com.svg"
  }
];

export default function Bebidas() {
  const [activeWhisky, setActiveWhisky] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [navFixed, setNavFixed] = useState(false);
  
  // Refs para os elementos de navegação e indicador
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const staticNavRef = useRef<HTMLDivElement>(null);

  // Função para atualizar a posição do indicador
  const updateIndicatorPosition = (whiskyId: string | null) => {
    if (!whiskyId || !navIndicatorRef.current) return;
    
    const activeButton = navItemsRef.current[whiskyId];
    if (!activeButton) return;

    // Obter a posição e largura do botão ativo
    const { offsetLeft, offsetWidth } = activeButton;
    
    // Atualizar a posição e largura do indicador
    // Adicionando uma pequena margem para centralizar melhor
    const indicatorWidth = offsetWidth * 0.6;
    const indicatorLeft = offsetLeft + (offsetWidth - indicatorWidth) / 2;
    
    navIndicatorRef.current.style.width = `${indicatorWidth}px`;
    navIndicatorRef.current.style.left = `${indicatorLeft}px`;
  };

  useEffect(() => {
    // Atualizar posição do indicador quando o whisky ativo mudar
    updateIndicatorPosition(activeWhisky);
  }, [activeWhisky]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
     
      // Verificando a posição da barra de navegação estática
      if (staticNavRef.current) {
        const navRect = staticNavRef.current.getBoundingClientRect();
        
        // Se o topo da nav estática atingir o topo da janela, fixamos a nav
        if (navRect.top <= 0) {
          setNavFixed(true);
          setHeaderVisible(false);
        } else {
          setNavFixed(false);
          setHeaderVisible(true);
        }
      }
     
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsHeroVisible(heroBottom > 0);
      }
     
      const currentPosition = window.scrollY + window.innerHeight / 3;
     
      if (heroRef.current && currentPosition < heroRef.current.offsetHeight) {
        setActiveWhisky(null);
        return;
      }
     
      for (const whiskyId in sectionsRef.current) {
        const section = sectionsRef.current[whiskyId];
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          if (top < window.innerHeight / 2 && bottom > window.innerHeight / 2) {
            setActiveWhisky(whiskyId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para rolar até a seção
  const scrollToSection = (whiskyId: string) => {
    setIsHeroVisible(false);
    setActiveWhisky(whiskyId);
    sectionsRef.current[whiskyId]?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
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
            transform: `translateY(${scrollProgress * 2}%)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
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
                  <span className="text-amber-500 text-sm tracking-[0.5em] font-light">EST. 1887</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-serif tracking-wide text-white mb-8">
                  THORNFIELD
                </h1>
                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent"></div>
                  <p className="text-lg text-white/90 font-light leading-relaxed max-w-lg pl-6">
                    Uma destilaria lendária nas Highlands escocesas, onde tradição e inovação se encontram para criar os mais extraordinários whiskies single malt.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-auto text-right space-y-2">
              <div className="text-amber-500/90 text-sm tracking-[0.3em] uppercase">
                Highlands, Scotland
              </div>
              <div className="text-white/50 text-xs tracking-[0.3em] uppercase">
                Single Malt Scotch Whisky
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de navegação fixa */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-[#0A0501]/95 backdrop-blur-sm border-b border-amber-900/40 shadow-xl transition-transform duration-300 ${
          navFixed ? 'translate-y-0' : 'translate-y-[-100%]'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="relative flex items-center justify-center w-full">
            <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar py-3 px-2 mx-auto">
              {whiskies.map((whisky) => (
                <button
                  key={whisky.id}
                  ref={(el) => { navItemsRef.current[whisky.id] = el; }}
                  onClick={() => scrollToSection(whisky.id)}
                  className={`group flex flex-col items-center justify-center text-center px-5 py-2 relative overflow-hidden ${
                    activeWhisky === whisky.id
                      ? `text-amber-500 font-semibold`
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border mb-2 ${
                    activeWhisky === whisky.id
                      ? `border-amber-500 bg-amber-500/10 text-amber-500`
                      : 'border-gray-700 bg-[#0A0501] text-white/70 group-hover:border-amber-500/40 group-hover:text-white/90'
                  } transition-all duration-300 ease-in-out transform ${
                    activeWhisky === whisky.id ? 'scale-110' : 'scale-100 group-hover:scale-105'
                  }`}>
                    {whisky.icon.startsWith('/') ? (
                      <Image
                        src={whisky.icon}
                        alt={`${whisky.name} icon`}
                        width={24}
                        height={24}
                        className={`transition-all duration-300 ${
                          activeWhisky === whisky.id ? 'drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]' : ''
                        }`}
                      />
                    ) : (
                      <span className="text-lg">{whisky.icon}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    activeWhisky === whisky.id
                      ? `text-amber-500 font-semibold`
                      : 'text-white/80 group-hover:text-white'
                  }`}>
                    {whisky.name}
                  </span>
                  
                  {/* Indicador de botão ativo - barrinha animada */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-[3px] transition-transform duration-500 ${
                      activeWhisky === whisky.id 
                        ? 'scale-x-100 bg-amber-500' 
                        : 'scale-x-0 group-hover:scale-x-[0.4] bg-transparent group-hover:bg-amber-600/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Barra de navegação posicionada após o hero */}
      <nav
        ref={staticNavRef}
        className={`bg-[#0A0501]/95 backdrop-blur-sm border-b mx-auto border-amber-900/40 shadow-xl transition-opacity duration-300 ${
          !navFixed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="relative flex items-center justify-center w-full">
            <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar py-3 px-2 mx-auto">
              {whiskies.map((whisky) => (
                <button
                  key={whisky.id}
                  ref={(el) => { navItemsRef.current[whisky.id] = el; }}
                  onClick={() => scrollToSection(whisky.id)}
                  className={`group flex flex-col items-center justify-center text-center px-5 py-2 relative overflow-hidden ${
                    activeWhisky === whisky.id
                      ? `text-amber-500 font-semibold`
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border mb-2 ${
                    activeWhisky === whisky.id
                      ? `border-amber-500 bg-amber-500/10 text-amber-500`
                      : 'border-gray-700 bg-[#0A0501] text-white/70 group-hover:border-amber-500/40 group-hover:text-white/90'
                  } transition-all duration-300 ease-in-out transform ${
                    activeWhisky === whisky.id ? 'scale-110' : 'scale-100 group-hover:scale-105'
                  }`}>
                    {whisky.icon.startsWith('/') ? (
                      <Image
                        src={whisky.icon}
                        alt={`${whisky.name} icon`}
                        width={24}
                        height={24}
                        className={`transition-all duration-300 ${
                          activeWhisky === whisky.id ? 'drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]' : ''
                        }`}
                      />
                    ) : (
                      <span className="text-lg">{whisky.icon}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    activeWhisky === whisky.id
                      ? `text-amber-500 font-semibold`
                      : 'text-white/80 group-hover:text-white'
                  }`}>
                    {whisky.name}
                  </span>
                  
                  {/* Indicador de botão ativo - barrinha animada */}
                  <div 
                    className={`absolute bottom-0 left-0 w-full h-[3px] transition-transform duration-500 ${
                      activeWhisky === whisky.id 
                        ? 'scale-x-100 bg-amber-500' 
                        : 'scale-x-0 group-hover:scale-x-[0.4] bg-transparent group-hover:bg-amber-600/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Whisky Sections */}
      <div className="relative">
        {whiskies.map((whisky, index) => {
          const isEven = index % 2 === 0;
          return (
            <section
              key={whisky.id}
              ref={(el: HTMLDivElement | null) => {
                sectionsRef.current[whisky.id] = el;
              }}
              id={whisky.id}
              className="relative h-screen max-h-[900px] flex items-center overflow-hidden border-b border-amber-500/10 mb-20"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <div className="relative h-full w-full">
                  <Image
                    src={whisky.image}
                    alt={whisky.name}
                    fill
                    className="object-cover object-center brightness-110"
                    priority={index < 3}
                    quality={80}
                  />
                  <div className={`absolute inset-0 ${
                    isEven 
                      ? 'bg-gradient-to-r from-black/80 via-black/60 to-transparent' 
                      : 'bg-gradient-to-l from-black/80 via-black/60 to-transparent'
                  }`}></div>
                </div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full">
                <div className="max-w-[1920px] mx-auto px-8 md:px-12">
                  <div className={`max-w-xl ${isEven ? 'ml-0' : 'ml-auto'}`}>
                    {/* Header with Icon */}
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 bg-black/40 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <Image
                          src={whisky.icon}
                          alt={`${whisky.name} icon`}
                          width={28}
                          height={28}
                          className="opacity-90"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-amber-500/90 text-sm tracking-[0.3em] font-light">N° {whisky.id.padStart(2, '0')}</span>
                          <div className="h-px w-16 bg-amber-500/40"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif tracking-wide text-white">
                          {whisky.name}
                        </h2>
                      </div>
                    </div>
                   
                    {/* Description and Details */}
                    <div className="space-y-8 mb-10">
                      <p className="text-xl text-white/90 font-light leading-relaxed">
                        {whisky.description}
                      </p>
                     
                      {/* Age and Price */}
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl text-amber-500 font-serif">{whisky.year}</span>
                          <span className="text-white/70 text-sm tracking-widest uppercase">Anos</span>
                        </div>
                        <div className="h-10 w-px bg-amber-500/30"></div>
                        <div className="text-white/90">
                          <span className="text-sm tracking-wider">R$</span>
                          <span className="text-2xl ml-1 font-light">{whisky.price.toFixed(2)}</span>
                        </div>
                      </div>
                   
                      {/* Tasting Notes */}
                      <div className="space-y-4">
                        <span className="text-white/50 text-xs tracking-widest uppercase">
                          Notas de Degustação
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {whisky.tasting_notes.map((note, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 text-sm tracking-wider border border-amber-500/20 text-white/80 bg-black/40 backdrop-blur-sm rounded-md"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                     
                    {/* Action Button */}
                    <button className="group relative px-6 py-3 overflow-hidden">
                      <div className="absolute inset-0 border-2 border-amber-500/30 group-hover:border-amber-500/50 transition-colors duration-300 rounded-md"></div>
                      <div className="absolute inset-[2px] bg-black/60 backdrop-blur-sm rounded-md"></div>
                      <span className="relative z-10 text-amber-500 group-hover:text-amber-400 tracking-widest uppercase text-sm transition-colors duration-300">
                        Saiba Mais
                      </span>
                    </button>
                  </div>
                </div>
              </div>

             
            </section>
          );
        })}
      </div>
    </div>
  );
}
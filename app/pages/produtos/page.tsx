"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import whiskiesData from "../../data/whiskies.json";
import Footer from "../../Components/Footer/Footer";
const whiskies = whiskiesData.whiskies;

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
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
       
        {/* Content Layout */}
        <div className="relative z-10 w-full">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex flex-col justify-center py-6 sm:py-12">
            {/* Main Content */}
            <div className="flex flex-col items-start max-w-xl">
              {/* Brand Mark */}
              <div className="mb-4 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-amber-500 to-transparent"></div>
                  <span className="text-amber-500 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] font-light">EST. 1887</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide text-white mb-4 sm:mb-8">
                  THORNFIELD
                </h1>
                <div className="relative">
                  <div className="absolute -left-3 sm:-left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent"></div>
                  <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-lg pl-3 sm:pl-6">
                    Uma destilaria lendária nas Highlands escocesas, onde tradição e inovação se encontram para criar os mais extraordinários whiskies single malt.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-auto text-right space-y-1 sm:space-y-2">
              <div className="text-amber-500/90 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Highlands, Scotland
              </div>
              <div className="text-white/50 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Single Malt Scotch Whisky
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de navegação fixa - oculta em telas menores */}
      <nav
        className={`fixed top-0 left-0 right-0 z-60 bg-[#0A0501]/95 backdrop-blur-sm border-b border-amber-900/40 shadow-xl transition-transform duration-300 hidden md:block ${
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

      {/* Barra de navegação posicionada após o hero - oculta em telas menores */}
      <nav
        ref={staticNavRef}
        className={`bg-[#0A0501]/95 backdrop-blur-sm border-b mx-auto border-amber-900/40 shadow-xl transition-opacity duration-300 hidden md:block ${
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
              className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-screen lg:max-h-[900px] flex items-center overflow-hidden border-b border-amber-500/10 mb-10 sm:mb-20"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <div className="relative h-full w-full">
                  <Image
                    src={whisky.image}
                    alt={whisky.name}
                    fill
                    sizes="100vw"
                    className="object-cover object-center brightness-[0.85] sm:brightness-100"
                    priority={index < 3}
                    quality={90}
                  />
                  <div className={`absolute inset-0 ${
                    isEven
                      ? 'bg-gradient-to-r from-black/90 via-black/70 to-transparent'
                      : 'bg-gradient-to-l from-black/90 via-black/70 to-transparent'
                  }`}></div>
                </div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full py-6 sm:py-0">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                  <div className={`max-w-xl ${isEven ? 'ml-0' : 'ml-auto'}`}>
                    {/* Header with Icon */}
                    <div className="flex items-start gap-3 sm:gap-6 mb-4 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-500/30 bg-black/40 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <Image
                          src={whisky.icon}
                          alt={`${whisky.name} icon`}
                          width={20}
                          height={20}
                          className="opacity-90"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                          <span className="text-amber-500/90 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-light">N° {whisky.id.padStart(2, '0')}</span>
                          <div className="h-px w-10 sm:w-16 bg-amber-500/40"></div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-wide text-white">
                          {whisky.name}
                        </h2>
                      </div>
                    </div>
                   
                    {/* Description and Details */}
                    <div className="space-y-4 sm:space-y-8 mb-6 sm:mb-10">
                      <p className="text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed">
                        {whisky.description}
                      </p>
                     
                      {/* Age and Price */}
                      <div className="flex items-center gap-4 sm:gap-8">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-3xl text-amber-500 font-serif">{whisky.year}</span>
                          <span className="text-white/70 text-xs sm:text-sm tracking-widest uppercase">Anos</span>
                        </div>
                        <div className="h-8 sm:h-10 w-px bg-amber-500/30"></div>
                        <div className="text-white/90">
                          <span className="text-xs sm:text-sm tracking-wider">R$</span>
                          <span className="text-xl sm:text-2xl ml-1 font-light">{whisky.price.toFixed(2)}</span>
                        </div>
                      </div>
                   
                      {/* Tasting Notes */}
                      <div className="space-y-2 sm:space-y-4">
                        <span className="text-white/50 text-[10px] sm:text-xs tracking-widest uppercase">
                          Notas de Degustação
                        </span>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {whisky.tasting_notes.map((note, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm tracking-wider border border-amber-500/20 text-white/80 bg-black/40 backdrop-blur-sm rounded-md"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                     
                    {/* Action Button */}
                    <Link href={`/pages/produtos/${whisky.id}`} className="group relative inline-block px-4 py-2 sm:px-6 sm:py-3 overflow-hidden">
                      <div className="absolute inset-0 border-2 border-amber-500/30 group-hover:border-amber-500/50 transition-colors duration-300 rounded-md"></div>
                      <div className="absolute inset-[2px] bg-black/60 backdrop-blur-sm rounded-md"></div>
                      <span className="relative z-10 text-amber-500 group-hover:text-amber-400 tracking-widest uppercase text-xs sm:text-sm transition-colors duration-300">
                        Saiba Mais
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
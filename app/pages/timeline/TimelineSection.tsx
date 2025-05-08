'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import React from 'react';

interface TimelineSectionProps {
  isVisible?: boolean;
  onComplete?: () => void;
}

const timelineData = [
  {
    year: '2018',
    image: '/timeline/timeline1.png',
    title: 'O Sonho Começa',
    description: 'Três amigos - Gabriel Palmieri, Renan Queiroz e Guimen - unidos pela paixão por destilados, começam a sonhar com a criação de um whisky único. Entre bares e destilarias, nasce a visão da Thornfield.'
  },
  {
    year: '2019',
    image: '/timeline/2019.png',
    title: 'A Busca pela Perfeição',
    description: 'Gabriel, o alquimista, mergulha nos segredos da destilação. Renan desenvolve a estratégia do negócio, enquanto Guimen trabalha na identidade da marca. Anos de pesquisa e experimentação começam.'
  },
  {
    year: '2020',
    image: '/timeline/2020.png',
    title: 'Processo Único',
    description: 'Após incontáveis testes, desenvolvem um processo de destilação único. Cada detalhe é minuciosamente estudado: o terroir da cevada, a pureza da água e o tempo exato de envelhecimento nos barris.'
  },
  {
    year: '2021',
    image: '/timeline/2021.png',
    title: 'A Fórmula Perfeita',
    description: 'Finalmente chegam à fórmula perfeita: um whisky encorpado, com notas marcantes de carvalho e um final aveludado. Nasce oficialmente a Thornfield, um nome que carrega força e mistério.'
  },
  {
    year: '2022',
    image: '/timeline/timeline5.png',
    title: 'O Lançamento',
    description: 'A Thornfield é apresentada ao mundo, não apenas como mais uma marca, mas como um ícone que representa a fusão entre o clássico e o moderno, a tradição e a ousadia.'
  },
  {
    year: '2023',
    image: '/whiskys-fundo/17.png',
    title: 'O Legado Continua',
    description: 'Hoje, a Thornfield é uma celebração da autenticidade e inovação. Cada garrafa carrega uma história de superação e o compromisso inabalável com a excelência na arte da destilação.'
  }
];

export default function TimelineSection({ isVisible, onComplete }: TimelineSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const goToSlide = (index: number) => {
    if (!isVisible || isTransitioning || index === activeSlide) return;

    // Se estiver na primeira imagem e tentar ir para trás, libera o scroll
    if (index < 0 && activeSlide === 0) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Se estiver na última imagem e tentar ir para frente, libera o scroll
    if (index >= timelineData.length && activeSlide === timelineData.length - 1) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Limita o índice aos limites da timeline
    const newIndex = Math.max(0, Math.min(index, timelineData.length - 1));
    
    setIsTransitioning(true);
    setActiveSlide(newIndex);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isVisible) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      const nextIndex = e.deltaY > 0 ? activeSlide + 1 : activeSlide - 1;
      goToSlide(nextIndex);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isVisible || isTransitioning) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        const nextIndex = deltaY > 0 ? activeSlide + 1 : activeSlide - 1;
        goToSlide(nextIndex);
        touchStartY.current = touchEndY;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || isTransitioning) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goToSlide(activeSlide + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goToSlide(activeSlide - 1);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart);
    section.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSlide, isTransitioning, isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen bg-black text-white overflow-hidden"
    >
      {/* Slides */}
      {timelineData.map((item, index) => (
        <div
          key={item.year}
          className={`
            absolute inset-0 w-full h-full transition-all duration-1000
            ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
        >
          {/* Background Estendido */}
          <div 
            className="absolute inset-0 transition-transform duration-1000 scale-110"
            style={{
              transform: `scale(${activeSlide === index ? '1.1' : '1.2'})
                         translateY(${activeSlide === index ? '0' : '10%'})`,
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover blur-sm"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* Container do Conteúdo */}
          <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center w-full">
              {/* Ano à Esquerda - Visível apenas em telas médias e grandes */}
              <div className="col-span-1 md:col-span-4 text-left hidden md:block">
                <div className={`transform transition-all duration-1000 delay-300 ${
                  activeSlide === index ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                }`}>
                  <div className="text-6xl sm:text-8xl lg:text-[12rem] font-serif leading-none opacity-80">
                    {item.year}
                  </div>
                </div>
              </div>

              {/* Imagem Central - Aumentada em telas pequenas */}
              <div className="col-span-1 md:col-span-4 relative aspect-[3/4] transform transition-all duration-1000 mt-16 md:mt-0">
                <div className={`relative w-full h-full transition-all duration-1000 ${
                  activeSlide === index ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Texto à Direita */}
              <div className="col-span-1 md:col-span-4">
                <div className={`transform transition-all duration-1000 delay-300 ${
                  activeSlide === index ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                }`}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-3 sm:mb-4 lg:mb-6">{item.title}</h2>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ano acima da imagem - Visível apenas em telas pequenas */}
          <div className="absolute top-8 left-0 right-0 text-center md:hidden z-20">
            <div className={`transform transition-all duration-1000 delay-300 ${
              activeSlide === index ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}>
              <div className="text-5xl sm:text-6xl font-serif leading-none opacity-80">
                {item.year}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicador de Navegação - Visível apenas em telas médias e grandes */}
      <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        {timelineData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`block w-2 sm:w-3 h-2 sm:h-3 my-1 sm:my-2 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Indicador de Navegação para mobile - Visível apenas em telas pequenas */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-50 md:hidden">
        {timelineData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`block w-2 h-2 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </section>
  );
} 

'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import TimelineSection from '../timeline/TimelineSection';
import Image from 'next/image';
import Footer from '../../Components/Footer/Footer';
export default function About() {
  const [isTimelineActive, setIsTimelineActive] = useState(false);
  const [isTimelineComplete, setIsTimelineComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState('/about/b84bd6cd9e4cedcdce6984ac99a1df74.avif');
  const [imageOpacity, setImageOpacity] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lastScrollPosition = useRef(0);
  const isScrollLocked = useRef(false);

  const handleImageChange = (newImage: string) => {
    setImageOpacity(0);
    setSelectedImage(newImage);
    setImageOpacity(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

      if (isInView && !isTimelineComplete) {
        if (!isScrollLocked.current) {
          isScrollLocked.current = true;
          setIsTimelineActive(true);
          window.scrollTo({
            top: window.scrollY + rect.top - window.innerHeight * 0.1,
            behavior: 'smooth'
          });
        }
      } else if (!isInView) {
        setIsTimelineActive(false);
        isScrollLocked.current = false;
        setIsTimelineComplete(false);
      }
    };

    const preventScroll = (e: WheelEvent) => {
      if (!timelineRef.current || !isTimelineActive) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

      if (isInView && !isTimelineComplete) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!timelineRef.current || !isTimelineActive) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

      if (isInView && !isTimelineComplete && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Space')) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTimelineComplete, isTimelineActive]);

  const handleTimelineComplete = () => {
    isScrollLocked.current = false;
    setIsTimelineComplete(true);
    setIsTimelineActive(false);
  };

  return (
    <main className="relative bg-black">
      {/* Seção Maghellan */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('/about/pattern.png')] opacity-5 z-0"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/about/tour_3.mp4" type="video/mp4" />
        </video>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Texto à Esquerda */}
            <div className="col-span-1 lg:col-span-6 animate-fade-in-left">
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="h-px w-8 sm:w-12 lg:w-16 bg-amber-500"></div>
                <span className="text-amber-500 font-light tracking-widest text-sm sm:text-base">NOSSA HISTÓRIA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 lg:mb-12 text-white tracking-tight animate-fade-in-up font-serif">THORNFIELD</h1>
              <div className="h-1 w-12 sm:w-16 lg:w-24 bg-amber-500 mb-4 sm:mb-6 lg:mb-8 animate-width-grow"></div>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300 font-light animate-fade-in-up max-w-2xl">
                A Thornfield nasceu do sonho de três amigos apaixonados por destilados. Gabriel Palmieri, Renan Queiroz e Guimen uniram suas visões para criar um whisky que fosse mais do que uma bebida, mas uma experiência inesquecível. O nome "Thornfield" é uma homenagem à nossa herança escocesa, representando a fusão perfeita entre tradição e inovação.
              </p>
              <div className="mt-8 sm:mt-10 lg:mt-12 flex items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex flex-col">
                  <span className="text-amber-500 text-xs sm:text-sm font-light tracking-widest">FUNDAÇÃO</span>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-light">2018</span>
                </div>
                <div className="h-8 sm:h-10 lg:h-12 w-px bg-amber-500/30"></div>
                <div className="flex flex-col">
                  <span className="text-amber-500 text-xs sm:text-sm font-light tracking-widest">LOCAL</span>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-light">São Paulo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Interativa - O Processo da Destilação */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('/about/pattern.png')] opacity-5 z-0"></div>
        
        {/* Elementos Flutuantes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[
            { width: 20, height: 20, left: 10, top: 20, delay: 0, duration: 10 },
            { width: 25, height: 25, left: 30, top: 40, delay: 1, duration: 12 },
            { width: 15, height: 15, left: 50, top: 60, delay: 2, duration: 14 },
            { width: 30, height: 30, left: 70, top: 80, delay: 3, duration: 16 },
            { width: 20, height: 20, left: 90, top: 30, delay: 4, duration: 18 },
            { width: 25, height: 25, left: 20, top: 50, delay: 0, duration: 12 },
            { width: 15, height: 15, left: 40, top: 70, delay: 1, duration: 14 },
            { width: 30, height: 30, left: 60, top: 90, delay: 2, duration: 16 },
            { width: 20, height: 20, left: 80, top: 40, delay: 3, duration: 18 },
            { width: 25, height: 25, left: 10, top: 60, delay: 4, duration: 10 }
          ].map((bubble, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-500/10 animate-float"
              style={{
                width: `${bubble.width}px`,
                height: `${bubble.height}px`,
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Conteúdo à Esquerda */}
            <div className="col-span-1 lg:col-span-6">
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="h-px w-8 sm:w-12 lg:w-16 bg-amber-500"></div>
                <span className="text-amber-500 font-light tracking-widest text-sm sm:text-base">A ARTE DA DESTILAÇÃO</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 lg:mb-12 text-white tracking-tight font-serif">
              <span>PROCESSO</span>
              </h1>
              <div className="h-1 w-12 sm:w-16 lg:w-24 bg-amber-500 mb-4 sm:mb-6 lg:mb-8"></div>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300 font-light mb-6 sm:mb-8 lg:mb-12 max-w-2xl">
                Cada gota de Thornfield é o resultado de um processo meticuloso que combina tradição e inovação. Nossa destilação é uma verdadeira alquimia moderna.
              </p>

              {/* Elementos Interativos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
                <div 
                  className="group cursor-pointer relative"
                  onMouseEnter={() => handleImageChange('/about/image_160160498.avif')}
                >
                  <div className="relative aspect-square bg-black/50 border border-amber-500/30 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors duration-300"></div>
                    <div className="absolute inset-0">
                      <Image
                        src="/about/image_160160498.avif"
                        alt="Seleção de Grãos"
                        fill
                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-amber-500 text-2xl sm:text-3xl lg:text-4xl font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300">1</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3 lg:mt-4">
                    <h3 className="text-lg sm:text-xl font-serif text-white mb-1 sm:mb-2">Seleção</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Selecionamos cuidadosamente os melhores grãos e malte para garantir a qualidade excepcional do nosso whisky.</p>
                  </div>
                </div>
                <div 
                  className="group cursor-pointer relative"
                  onMouseEnter={() => handleImageChange('/about/O-que-e-whisky5-768x423.webp')}
                >
                  <div className="relative aspect-square bg-black/50 border border-amber-500/30 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors duration-300"></div>
                    <div className="absolute inset-0">
                      <Image
                        src="/about/O-que-e-whisky5-768x423.webp"
                        alt="Processo de Destilação"
                        fill
                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-amber-500 text-2xl sm:text-3xl lg:text-4xl font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300">2</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3 lg:mt-4">
                    <h3 className="text-lg sm:text-xl font-serif text-white mb-1 sm:mb-2">Destilação</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Utilizamos alambiques de cobre tradicionais para uma destilação lenta e cuidadosa, preservando os aromas mais puros.</p>
                  </div>
                </div>
                <div 
                  className="group cursor-pointer relative"
                  onMouseEnter={() => handleImageChange('/about/TMP-DCS.avif')}
                >
                  <div className="relative aspect-square bg-black/50 border border-amber-500/30 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors duration-300"></div>
                    <div className="absolute inset-0">
                      <Image
                        src="/about/TMP-DCS.avif"
                        alt="Envelhecimento em Barris"
                        fill
                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-amber-500 text-2xl sm:text-3xl lg:text-4xl font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300">3</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-3 lg:mt-4">
                    <h3 className="text-lg sm:text-xl font-serif text-white mb-1 sm:mb-2">Envelhecimento</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Envelhecemos em barris de carvalho selecionados, onde o whisky adquire sua complexidade e caráter único.</p>
                  </div>
                </div>
              </div>

              {/* Barra de Progresso Interativa */}
              <div className="relative h-1 bg-black/50 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-progress"></div>
              </div>
            </div>

            {/* Imagem à direita */}
            <div className="col-span-1 lg:col-span-6 mt-8 lg:mt-0">
              <div className="relative aspect-square w-full h-full">
                <div className="absolute inset-0 bg-black/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={selectedImage}
                      alt="Processo de Destilação Thornfield"
                      fill
                      className="object-cover"

                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        ref={timelineRef} 
        className={`relative min-h-screen ${
          isTimelineActive 
            ? 'fixed top-0 left-0 w-full h-screen z-50 bg-black' 
            : ''
        }`}
        style={{
          position: isTimelineActive ? 'fixed' : 'relative'
        }}
      >
        <TimelineSection 
          isVisible={isTimelineActive}
          onComplete={handleTimelineComplete}
        />
      </section>
      {isTimelineActive && (
        <div style={{ height: '100vh' }} />
      )}

      {/* Seção Final */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('/about/pattern.png')] opacity-5 z-0"></div>
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url("/about/PROCESSO-THORNFIELD.avif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Espaço vazio à esquerda */}
            <div className="col-span-1 lg:col-span-6 hidden lg:block"></div>

            {/* Conteúdo à direita */}
            <div className="col-span-1 lg:col-span-6 animate-fade-in-right">
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="h-px w-8 sm:w-12 lg:w-16 bg-amber-500"></div>
                <span className="text-amber-500 font-light tracking-widest text-sm sm:text-base">PROCESSO</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 lg:mb-12 text-white tracking-tight animate-fade-in-up font-serif">THORNFIELD</h1>
              <div className="h-1 w-12 sm:w-16 lg:w-24 bg-amber-500 mb-4 sm:mb-6 lg:mb-8 animate-width-grow"></div>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-300 font-light animate-fade-in-up max-w-2xl">
                O processo de criação do Thornfield é uma verdadeira obra de arte. Envelhecido em barris de carvalho americano e europeu, cada garrafa carrega notas complexas de baunilha, caramelo e frutas secas, com um final suave e persistente.
              </p>
              <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="flex flex-col">
                  <span className="text-amber-500 text-xs sm:text-sm font-light tracking-widest">TEMPO</span>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-light">MIN.14 Anos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-amber-500 text-xs sm:text-sm font-light tracking-widest">TEOR</span>
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-light">43% Vol.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      
    </main>
  );
} 
'use client';
import { useState, useEffect} from 'react';
import AgeGate from './Components/VerificarIdade/page';
import Loading from './Components/UI/Loading/Loading';
import Button from './Components/UI/Button/Button';
import React from 'react';

export default function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ageVerifiedStorage = localStorage.getItem('ageVerified') === 'true';
      setIsAgeVerified(ageVerifiedStorage);
      setLoading(false);
    }, 1000);

    const handleAgeVerified = () => {
      setFadeOut(true);
      setTimeout(() => {
        setIsAgeVerified(true);
        setAnimationComplete(true);
      }, 500);
    };

    window.addEventListener('ageVerified', handleAgeVerified);

    return () => {
      window.removeEventListener('ageVerified', handleAgeVerified);
      clearTimeout(timer);
    };
  }, []);

  // useEffect separado para salvar no localStorage
  useEffect(() => {
    if (animationComplete) {
      localStorage.setItem('ageVerified', 'true');
    }
  }, [animationComplete]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {!isAgeVerified && <AgeGate />}
      {isAgeVerified && (
        <main className="text-white min-h-screen bg-white">
          {/* Hero Section remains unchanged */}
          <section className="section-hero relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#623316]/30 z-10"></div>
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-light mb-6">THORNFIELD</h1>
              <p className="text-xl md:text-2xl font-light mb-8">O WHISKY SINGLE MALT MAIS PREMIADO DO MUNDO</p>
              <Button>
                Discover the Estate
              </Button>
            </div>
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videoplayback.mp4" type="video/mp4" />
                {/* Fallback para imagem caso o vídeo não carregue */}
                <div className="w-full h-full bg-[url('/whisky-bg.jpg')] bg-cover bg-center"></div>
              </video>
            </div>
          </section>

          {/* Collection Section */}
          <section className="py-20 px-4 bg-black text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg tracking-widest text-amber-600 mb-4">COLLECTION</h3>
              <h2 className="text-5xl font-light mb-8 text-white">OUR SINGLE MALTS</h2>

              {/* Separador decorativo */}
              <div className="flex items-center justify-center gap-2 mb-12">
                <div className="w-2 h-2 bg-amber-600 rotate-45"></div>
                <div className="w-2 h-2 bg-amber-600"></div>
                <div className="w-2 h-2 bg-amber-600 rotate-45"></div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              From our signature ranges available globally to our special limited release whiskies, each with a rich story to tell. Each and every Thornfield single malt whisky reveals our unrivalled commitment to the mastery of wood and spirit since 1887.
              </p>

              <Button variant="primary">
                VIEW ALL
              </Button>
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-black">
            <div className="text-center py-20">
              <h3 className="text-lg tracking-widest text-amber-600 mb-4">EXPERIENCE</h3>
              <h2 className="text-5xl font-light mb-16 text-black">EXPERIENCE THORNFIELD</h2>
            </div>

            {/* Grid de cards */}
            <div className="max-w-[1800px] mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-24">
                {/* Coluna Esquerda */}
                <div className="space-y-24">
                  {[
                    {
                      image: '/imagens-1920/Imagem-1.png',
                      alt: 'Serves',
                      action: 'BOOK',
                      title: 'SERVES'
                    },
                    {
                      image: '/imagens-1920/Imagem-1.png',
                      alt: 'Estate Experiences',
                      action: 'BOOK',
                      title: 'ESTATE EXPERIENCES'
                    }
                  ].map((card, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative h-[80vh] overflow-hidden mb-8">
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-white">
                        <p className="text-sm tracking-widest text-amber-600 mb-3">{card.action}</p>
                        <h4 className="text-4xl font-light">{card.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coluna Direita */}
                <div className="space-y-24 md:mt-64">
                  {[
                    {
                      image: '/imagens-1920/Imagem-1.png',
                      alt: 'The Thornfield Society',
                      action: 'JOIN',
                      title: 'THE THORNFIELD SOCIETY'
                    },
                    {
                      image: '/imagens-1920/Imagem-1.png',
                      alt: 'Our Six Pillars',
                      action: 'DISCOVER',
                      title: 'OUR SIX PILLARS'
                    }
                  ].map((card, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative h-[80vh] overflow-hidden mb-8">
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-white">
                        <p className="text-sm tracking-widest text-amber-600 mb-3">{card.action}</p>
                        <h4 className="text-4xl font-light">{card.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nossa História */}
        </main>
      )}
    </div>
  );
}

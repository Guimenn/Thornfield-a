'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Button from '../Ui/Button'

const whiskys = [
  {
    id: 1,
    type: 'SINGLE MALT',
    name: 'Glenridge 12 Years',
    description:
      'A refined single malt with notes of honey, vanilla, and oak. Perfectly balanced with a smooth, lingering finish.',
    price: 89.0,
    oldPrice: null,
    image: '/fotos-menu-trans/Whisky-transparente.png',
    awards: ['Gold Medal - ISC 2023', 'Double Gold - SFWSC 2023'],
    tastingNotes: ['Honey', 'Vanilla', 'Oak', 'Citrus']
  },
  {
    id: 2,
    type: 'BLENDED',
    name: 'Highlander Reserve',
    description:
      'A harmonious blend of the finest malts, offering rich caramel and spice notes with a velvety texture.',
    price: 74.0,
    oldPrice: 82.0,
    image: '/fotos-menu-trans/21.png',
    awards: ['Best Blended - WWA 2023', 'Gold Medal - ISC 2023'],
    tastingNotes: ['Caramel', 'Spice', 'Dried Fruit', 'Toffee']
  },
  {
    id: 3,
    type: 'SCOTCH',
    name: 'Black Mountain',
    description:
      'Bold and complex, with deep smoky undertones and hints of dark chocolate and dried fruit.',
    price: 95.0,
    oldPrice: null,
    image: '/fotos-menu-trans/24.png',
    awards: ['Best Scotch - WWA 2023', 'Double Gold - SFWSC 2023'],
    tastingNotes: ['Smoke', 'Dark Chocolate', 'Dried Fruit', 'Spice']
  },
  {
    id: 4,
    type: 'BOURBON',
    name: 'Kentucky Gold',
    description:
      'Rich and full-bodied, featuring notes of vanilla, caramel, and toasted oak with a warm, spicy finish.',
    price: 110.0,
    oldPrice: 120.0,
    image: '/fotos-menu-trans/25.png',
    awards: ['Best Bourbon - WWA 2023', 'Gold Medal - ISC 2023'],
    tastingNotes: ['Vanilla', 'Caramel', 'Toasted Oak', 'Spice']
  },
]

export default function Collection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const handleNext = () => {
    if (currentIndex < whiskys.length - 2) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#070401] to-[#0A0601] overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-800/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-700/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-80"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-amber-500 font-medium tracking-wider mb-2"
          >
            INSPIRAÇÃO EM CADA GARRAFA
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Nossa Coleção de Whiskys
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Descubra nossa excepcional linha de whiskys premium, produzidos com os mais altos padrões de qualidade, combinando tradição e inovação.
          </motion.p>
        </div>

        {/* Grade de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whiskys.map((whisky, index) => (
            <motion.div
              key={whisky.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 aspect-[2/3] overflow-hidden bg-gradient-to-b from-amber-900/10 to-black/40 rounded-xl backdrop-blur-sm border border-amber-900/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full w-2/3">
                    <Image
                      src={whisky.image}
                      alt={whisky.name}
                      fill
                      className="object-contain transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-amber-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-600/20 text-xs text-amber-100 font-medium">
                    ${whisky.price}
                  </div>
                </div>
                
                {whisky.awards && (
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="bg-black/60 backdrop-blur-sm border-t border-amber-900/30 p-3 rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <div className="text-amber-500 text-lg">🏆</div>
                        <p className="text-amber-100 text-xs">{whisky.awards[0]}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-serif text-white mb-2">{whisky.name}</h3>
              <p className="text-gray-400 text-sm">{whisky.description}</p>
              
              <div className="mt-4">
                <button className="text-amber-500 text-sm font-medium hover:text-amber-400 transition-colors flex items-center gap-1">
                  Ver detalhes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Seção de destaque especial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-32 relative"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="aspect-video bg-gradient-to-r from-amber-900/30 to-black/70 overflow-hidden relative">
              <Image
                src="/flagship-bg.jpg"
                alt="Master Collection Background"
                fill
                className="object-cover mix-blend-overlay opacity-40"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              
              <div className="relative z-10 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="p-6 md:p-12 flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 border border-amber-600/30 rounded-full text-amber-400 text-xs font-medium mb-6">
                      EDIÇÃO LIMITADA
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                      Thornfield Master Collection
                    </h3>
                    
                    <p className="text-gray-300 mb-8">
                      Nossa série mais refinada, desenvolvida pelo nosso Mestre Destilador. Criada a partir de barris cuidadosamente selecionados e envelhecidos por mais de três décadas, cada garrafa é numerada e assinada à mão.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-50 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-900/20">
                        Reservar Agora
                      </button>
                      <button className="px-6 py-3 bg-transparent border border-amber-700/30 text-amber-500 font-medium rounded-lg hover:bg-amber-900/10 transition-all duration-300">
                        Saiba Mais
                      </button>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center p-12">
                    <div className="relative h-full max-h-96 w-full max-w-xs">
                      <Image
                        src="/products/master-collection.png"
                        alt="Thornfield Master Collection"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
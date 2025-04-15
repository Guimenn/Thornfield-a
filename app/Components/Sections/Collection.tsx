'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
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

export default function PopularWhisky() {
  const [currentIndex, setCurrentIndex] = useState(0)

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
    <section className="min-h-[80vh] bg-[#0A0501] px-6 md:px-45 py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-sm text-amber-500 font-medium tracking-widest mb-4">WHISKY</div>
          <h2 className="text-6xl font-serif text-amber-100">Popular Whisky</h2>
          <div className="h-px w-32 bg-gradient-to-r from-amber-600 to-amber-800 mt-6"></div>
        </motion.div>

        <div className="relative h-[65vh] overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {whiskys.map((whisky) => (
              <motion.div 
                key={whisky.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex h-full w-full md:w-1/2 flex-shrink-0 px-12 gap-8"
              >
                <div className="w-1/2 flex items-center justify-center group">
                  <div className="relative">
                    <Image
                      src={whisky.image}
                      alt={whisky.name}
                      width={1920}
                      height={1080}
                      className="h-[550px] w-auto object-cover drop-shadow-[0_10px_25px_rgba(255,186,66,0.1)] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating label */}
                    <div className="absolute -top-4 -right-4 bg-amber-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-600/30">
                      <span className="text-amber-100 font-medium">{whisky.type}</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                  <div>
                    <h3 className="text-3xl font-serif text-amber-100 mb-4">{whisky.name}</h3>
                    <p className="text-gray-400 my-6 text-base max-w-md">{whisky.description}</p>
                    
                    {/* Tasting Notes */}
                    <div className="mb-6">
                      <h4 className="text-amber-500 text-sm font-medium mb-3">Tasting Notes</h4>
                      <div className="flex flex-wrap gap-2">
                        {whisky.tastingNotes.map((note, index) => (
                          <span key={index} className="px-3 py-1 rounded-full bg-amber-900/30 border border-amber-600/20 text-amber-100 text-sm">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Awards */}
                    <div className="mb-6">
                      <h4 className="text-amber-500 text-sm font-medium mb-3">Awards</h4>
                      <div className="space-y-2">
                        {whisky.awards.map((award, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-400 text-sm">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-serif text-amber-100">${whisky.price}</span>
                      {whisky.oldPrice && (
                        <span className="text-lg text-gray-500 line-through">${whisky.oldPrice}</span>
                      )}
                    </div>
                    <Button variant="primary" className="w-fit group">
                      <span className="relative z-10">Add to Cart</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-amber-600/30 hover:border-amber-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === whiskys.length - 2}
            className="p-2 rounded-full border border-amber-600/30 hover:border-amber-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
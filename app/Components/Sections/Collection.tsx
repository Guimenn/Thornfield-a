'use client'

import Image from 'next/image'
import { useState } from 'react'

const whiskys = [
  {
    id: 1,
    type: 'SINGLE MALT',
    name: 'Glenridge 12 Years',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque vero voluptatem officiis. Voluptates, harum voluptatem! Eligendi',
    price: 89.0,
    oldPrice: null,
    image: '/fotos-menu-trans/Whisky-transparente.png',
  },
  {
    id: 2,
    type: 'BLENDED',
    name: 'Highlander Reserve',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque vero voluptatem officiis. Voluptates, harum voluptatem! Eligendi',
    price: 74.0,
    oldPrice: 82.0,
    image: '/fotos-menu-trans/21.png',
  },
  {
    id: 3,
    type: 'SCOTCH',
    name: 'Black Mountain',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, suscipit. Harum voluptatem! Eligendi',
    price: 95.0,
    oldPrice: null,
    image: '/fotos-menu-trans/24.png',
  },
  {
    id: 4,
    type: 'BOURBON',
    name: 'Kentucky Gold',
    description:
      'Lorem ipsum dolor sit amet consectetur. Tempora assumenda dolore facilis vitae. Eligendi!',
    price: 110.0,
    oldPrice: 120.0,
    image: '/fotos-menu-trans/25.png',
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
    <section className="min-h-[80vh] bg-[#0A0501] px-6 md:px-45 py-16">
      <div className="mb-12">
        <div className="text-sm text-amber-500 font-medium tracking-widest mb-4">WHISKY</div>
        <h2 className="text-6xl font-serif text-amber-100">Popular Whisky</h2>
      </div>

      <div className="relative h-[65vh] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {whiskys.map((whisky) => (
            <div 
              key={whisky.id} 
              className="flex h-full w-full md:w-1/2 flex-shrink-0 px-12 gap-5"
            >
              <div className="w-1/2 flex items-center justify-center ">
                <div>
                  <Image
                    src={whisky.image}
                    alt={whisky.name}
                    width={1920}
                    height={1080}
                    className="h-[550px] w-auto object-cover drop-shadow-[0_10px_25px_rgba(255,186,66,0.1)]"
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <div>
                  <p className="text-sm text-amber-500 font-medium tracking-widest mb-2">
                    {whisky.type}
                  </p>
                  <h3 className="text-3xl font-serif text-amber-100 mb-4">{whisky.name}</h3>
                  <p className="text-gray-400 my-6 text-base max-w-md">{whisky.description}</p>
                 
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute bottom-0 left-0 flex gap-4 mt-12">
          <button
            onClick={handlePrev}
            className="text-gray-400 hover:text-amber-600 disabled:text-gray-700"
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="text-gray-400 hover:text-amber-600 disabled:text-gray-700"
            disabled={currentIndex + 2 >= whiskys.length}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
          {Array(whiskys.length - 1).fill(0).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-amber-500' : 'bg-gray-600'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
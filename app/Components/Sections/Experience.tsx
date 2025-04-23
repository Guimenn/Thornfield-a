"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experiences = [
    {
      id: 1,
      title: "Tour Clássico",
      description: "Uma visita guiada completa à nossa destilaria histórica, passando pelo processo de produção, da malteação à maturação. Inclui degustação de três expressões selecionadas.",
      duration: "2 horas",
      price: "R$ 280",
      image: "/images/experiences/classic-tour.jpg",
      capacity: "Grupos de até 12 pessoas"
    },
    {
      id: 2,
      title: "Masterclass de Degustação",
      description: "Aprofunde seus conhecimentos sobre degustação de whisky com nosso Mestre Destilador. Um mergulho sensorial em seis de nossas expressões premiadas, incluindo algumas raridades.",
      duration: "3 horas",
      price: "R$ 450",
      image: "/images/experiences/tasting-masterclass.jpg",
      capacity: "Grupos de até 8 pessoas"
    },
    {
      id: 3,
      title: "Experiência VIP Exclusiva",
      description: "Um tour privativo e personalizado pela destilaria, com acesso a áreas restritas. Inclui degustação de expressões raras e a oportunidade de engarrafar sua própria garrafa direto do barril.",
      duration: "4 horas",
      price: "R$ 980",
      image: "/images/experiences/vip-experience.jpg",
      capacity: "Privativo (1-4 pessoas)"
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Uma experiência inesquecível que transcende a simples degustação. Cada momento na destilaria Thornfield é um mergulho na história e tradição do whisky escocês.",
      author: "Maria Rodrigues",
      role: "Sommelier de Destilados",
      image: "/images/testimonials/maria.jpg"
    },
    {
      id: 2,
      text: "O tour VIP foi simplesmente extraordinário. A oportunidade de extrair minha própria garrafa diretamente do barril foi o ponto alto de minha viagem à Escócia.",
      author: "Carlos Mendes",
      role: "Colecionador e Entusiasta",
      image: "/images/testimonials/carlos.jpg"
    },
    {
      id: 3,
      text: "A masterclass de degustação mudou completamente minha percepção sobre whisky. A atenção aos detalhes e o conhecimento compartilhado são incomparáveis.",
      author: "Ana Soares",
      role: "Crítica Gastronômica",
      image: "/images/testimonials/ana.jpg"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={ref} id="experience" className="relative py-24 bg-[#0a0806] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/textures/grain.jpg')] opacity-5 bg-cover"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-900/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-amber-900/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block text-amber-500 font-medium tracking-wider text-sm mb-4">VISITE-NOS</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Experiências Inesquecíveis</h2>
          <p className="text-gray-400">
            Convidamos você a mergulhar no mundo Thornfield através de experiências 
            cuidadosamente elaboradas. Cada visita à nossa destilaria revela segredos 
            centenários e oferece momentos que ficarão gravados em sua memória.
          </p>
        </motion.div>
        
        {/* Feature Image/Video Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl overflow-hidden mb-20 h-[500px]"
        >
          <div className="absolute inset-0">
            <Image 
              src="/images/experiences/distillery-panorama.jpg" 
              alt="Destilaria Thornfield" 
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl p-12">
              <h3 className="text-3xl font-serif text-white mb-4">Bem-vindo às Highlands Escocesas</h3>
              <p className="text-gray-300 mb-6">
                Situada entre colinas verdejantes e riachos cristalinos, a destilaria Thornfield 
                convida você a explorar nossas instalações históricas onde a tradição e a inovação 
                se encontram para criar alguns dos whiskys mais premiados do mundo.
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium rounded-md transition-colors group">
                <span>Assista ao Vídeo da Destilaria</span>
                <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Plaque element */}
          <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-sm border border-amber-900/30 p-4 rounded shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600">
                <Image
                  src="/images/logo-icon.png"
                  alt="Thornfield Icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-amber-500 font-medium text-sm">FUNDADA EM</p>
                <p className="text-white font-serif">1842</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Experiences */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl font-serif text-white mb-4 md:mb-0"
            >
              Nossos Tours Exclusivos
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <button className="px-6 py-3 border border-amber-700 text-amber-500 hover:bg-amber-700 hover:text-white transition-colors rounded-md text-sm font-medium">
                Visualizar Calendário
              </button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeIn}
                className="bg-gradient-to-br from-[#171411] to-[#0c0a08] rounded-lg overflow-hidden border border-amber-900/10 hover:border-amber-900/30 transition-all duration-300 group"
              >
                <div className="relative h-60">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-white text-xs font-medium">{exp.duration}</p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-amber-600 px-3 py-1 rounded-md">
                    <p className="text-black text-xs font-bold">{exp.price}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-serif text-white mb-3">{exp.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-amber-500/80 text-xs">{exp.capacity}</span>
                    
                    <button className="inline-flex items-center text-white/90 hover:text-amber-500 text-sm transition-colors">
                      <span>Reservar</span>
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pb-10"
        >
          <h3 className="text-2xl font-serif text-white mb-8 text-center">O que nossos visitantes dizem</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeIn}
                className="relative bg-gradient-to-b from-amber-900/10 to-transparent p-6 rounded-lg border border-amber-900/20"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-25">
                  <svg className="h-16 w-16 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 mb-6 relative z-10">{testimonial.text}</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-amber-500/80 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-[url('/textures/dark-wood.jpg')] bg-cover rounded-xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl font-serif text-white mb-4">Planeje sua Visita</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Reserve sua experiência exclusiva na destilaria Thornfield e descubra pessoalmente 
              a magia por trás de nossos whiskys premiados. Grupos privados e empresariais são bem-vindos.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-md transition-colors">
                Reservar Agora
              </button>
              <button className="px-8 py-3 border border-white/30 hover:border-white/60 text-white text-sm font-medium rounded-md transition-colors">
                Informações e FAQ
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-sm">Vale do Spey, Escócia, UK</span>
              </div>
              
              <div className="flex items-center">
                <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white text-sm">Seg-Sáb: 10h - 18h | Dom: 12h - 17h</span>
              </div>
              
              <div className="flex items-center">
                <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white text-sm">+44 1340 123 456</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

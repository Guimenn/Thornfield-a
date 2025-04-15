"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Experience() {
  const experiences = [
    {
      title: "SERVES",
      action: "BOOK",
      desc: "Discover the perfect way to enjoy our range",
      href: "/serves",
      image: "/imagens-main/blog-1.png"
    },
    {
      title: "ESTATE EXPERIENCES",
      action: "BOOK",
      desc: "Immerse yourself in the world of Thornfield",
      href: "/experiences",
      image: "/imagens-main/blog-3.png"
    },
    {
      title: "THE SOCIETY",
      action: "JOIN",
      desc: "Become a member of our exclusive society",
      href: "/society",
      image: "/imagens-main/blog-4.png"
    },
    {
      title: "OUR PILLARS",
      action: "DISCOVER",
      desc: "Learn about our whisky-making philosophy",
      href: "/pillars",
      image: "/imagens-main/blog-2.png"
    },
  ];

  return (
    <section className="bg-[#0A0501] py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.png")', backgroundSize: '200px' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="mb-4 text-lg uppercase tracking-widest bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Experience
          </h3>
          <h2 className="font-serif text-5xl font-light text-amber-100 md:text-6xl mb-4">
            Experience Thornfield
          </h2>
          <div className="w-24 h-[1px] bg-amber-700/50 mx-auto"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {experiences.map((item, i) => (
              <Link 
                key={i} 
                href={item.href} 
                className={`${i % 2 === 1 ? 'md:mt-32 lg:mt-48' : ''} ${i === 0 ? 'md:ml-0 lg:ml-0' : i === 1 ? 'md:ml-8 lg:ml-12' : i === 2 ? 'md:mr-8 lg:mr-12' : 'md:mr-0 lg:mr-0'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="group relative h-[800px] rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(255,191,0,0.15)] hover:shadow-[0_15px_40px_-10px_rgba(255,191,0,0.25)] transition-all duration-700 ease-in-out"
                >
                  {/* Imagem de fundo */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover z-0 scale-100 group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />

                  {/* Overlay com blend moderno */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 mix-blend-multiply pointer-events-none" />

                  {/* Borda animada */}
                  <div className="absolute inset-0 rounded-2xl border border-amber-600/10 group-hover:border-amber-400/50 transition-all duration-500 z-20" />

                  {/* Conteúdo */}
                  <div className="absolute inset-x-0 bottom-0 p-8 z-30">
                    <div className="inline-block mb-3 border-b border-amber-600/30 pb-1 group-hover:border-amber-500 transition-all duration-300">
                      <span className="text-amber-400 text-sm tracking-widest uppercase">{item.action}</span>
                    </div>
                    <h4 className="text-3xl font-serif font-light text-white mb-2 tracking-wide group-hover:text-amber-100 transition-all duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  {/* Efeito de hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Componente de botão "Voltar ao Topo"
const BackToTopButton = () => {
  // Lógica para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
};

const HeroSection = () => (
  <section className="relative flex h-screen items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-10 bg-black/40"></div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative z-20 mx-auto max-w-5xl px-4 text-center"
    >
      <h1 className="mb-6 font-serif text-6xl font-light tracking-wider md:text-8xl">
        THORNFIELD
      </h1>
      <p className="mb-8 text-xl font-light tracking-widestuppercase md:text-2xl">
        O WHISKY SINGLE MALT MAIS PREMIADO DO MUNDO
      </p>
      
    </motion.div>
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
        <Image
          src="/whisky-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </video>
    </div>
  </section>
);

export default HeroSection;

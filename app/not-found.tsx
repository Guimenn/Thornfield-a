'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-950 to-black px-4 py-8">
      {/* Logo */}
      <motion.div
        className="relative w-80 h-80 mb-6"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="/Goat.png"
          alt="Logo do site"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <div className="text-center">
        <motion.div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-amber-500 text-[12rem] font-light mb-2"
          >
            <h1>404</h1>
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-amber-200 text-2xl font-light mb-2"
        >
          Parece que o whisky acabou...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-amber-100 text-base font-light mb-6 max-w-md mx-auto"
        >
          Esta página está tão vazia quanto um copo de whisky derramado.
          Vamos voltar e encher um novo copo?
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-block bg-amber-900/50 text-amber-200 text-lg rounded-full px-6 py-3 hover:bg-amber-800/50 transition-all duration-300 border border-amber-700/30"
          >
            Voltar para o showroom
          </Link>
        </motion.div>
      </div>
    </main>
  );
} 
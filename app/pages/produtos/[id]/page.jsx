"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { defaultWhiskies as whiskies } from "../../../data/whiskies"; // Importando defaultWhiskies como whiskies
import React from "react";
import { ChevronLeft, Heart, Share2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { toast } from 'react-hot-toast';

export default function WhiskyDetalhe({ params }) {
  // Use React.use() to unwrap params if needed
  const unwrappedParams = React.use ? React.use(params) : params;
  const whiskyId = unwrappedParams.id;
  const [whisky, setWhisky] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    // Buscar o whisky pelo ID
    const foundWhisky = whiskies.find(w => w.id === whiskyId);
   
    if (foundWhisky) {
      setWhisky(foundWhisky);
    }
   
    setLoading(false);
  }, [whiskyId]);

  const handleAddToCart = () => {
    if (!whisky || quantity > whisky.quantity) return;
    
    // Adiciona o item ao carrinho
    addItem({
      id: whisky.id,
      name: whisky.name,
      price: whisky.price,
      quantity: quantity,
      image: whisky.image
    });
    
    // Atualiza o estado do whisky
    setWhisky(prev => ({ ...prev, quantity: prev.quantity - quantity }));
    
    // Mostra notificação de sucesso
    toast.success(`${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} de ${whisky.name} adicionada${quantity === 1 ? '' : 's'} ao carrinho`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-500 text-xl">Carregando...</div>
      </div>
    );
  }

  if (!whisky) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl text-amber-500 mb-6">Whisky não encontrado</h1>
        <Link href="/produtos" className="px-6 py-3 border border-amber-500/50 hover:bg-amber-500/10 text-amber-500 transition-all duration-300">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="pt-20">
        <div className="relative h-[70vh] overflow-hidden">
          {/* Botão de voltar */}
          <div className="absolute top-10 left-6 z-20">
            <Link
              href="/pages/produtos"
              className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-md border border-amber-500/30 text-amber-500 hover:bg-black/70 hover:text-amber-400 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg&quot" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Voltar</span>
            </Link>
          </div>
         
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={whisky.image}
              alt={whisky.name}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <Image
                    src={whisky.icon}
                    alt={`${whisky.name} icon`}
                    width={28}
                    height={28}
                    className="opacity-90"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-amber-500/90 text-sm tracking-[0.3em] font-light">N° {String(whisky.id).padStart(2, '0')}</span>
                    <div className="h-px w-16 bg-amber-500/40"></div>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-serif tracking-wide text-white">{whisky.name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Details */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif text-amber-500 mb-4">Descrição</h2>
                <p className="text-xl text-white/90 font-light leading-relaxed">
                  {whisky.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-amber-500 mb-4">Especificações</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-amber-500/20 bg-black/40 p-6 rounded-md backdrop-blur-sm">
                    <p className="text-white/50 text-sm tracking-wider uppercase mb-2">Idade</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl text-amber-500 font-serif">{whisky.year}</span>
                      <span className="text-white/70 text-sm tracking-widest uppercase ml-2">Anos</span>
                    </div>
                  </div>

                  <div className="border border-amber-500/20 bg-black/40 p-6 rounded-md backdrop-blur-sm">
                    <p className="text-white/50 text-sm tracking-wider uppercase mb-2">Preço</p>
                    <div className="text-white/90">
                      <span className="text-sm tracking-wider">R$</span>
                      <span className="text-3xl ml-1 font-light">{whisky.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-amber-500 mb-4">Notas de Degustação</h2>
                <div className="flex flex-wrap gap-3">
                  {whisky.tasting_notes.map((note, i) => (
                    <span
                      key={i}
                      className="px-5 py-3 text-base tracking-wider border border-amber-500/20 text-white/80 bg-black/40 backdrop-blur-sm rounded-md"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Seletor de Quantidade */}
              <div className="pt-4">
                <h2 className="text-2xl font-serif text-amber-500 mb-4">Quantidade</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="text-xl text-white/90">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(whisky.quantity || 10, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleAddToCart}
                  className="w-full md:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-medium tracking-wider uppercase text-sm transition-colors duration-300 rounded-md"
                  disabled={!whisky.quantity || whisky.quantity < 1 || quantity > whisky.quantity}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {whisky.quantity > 0 ? 
                    `Adicionar ao Carrinho (${whisky.quantity} em estoque)` : 
                    'Esgotado'}
                </button>
              </div>
            </div>

            {/* Right Column: Additional Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-serif text-amber-500 mb-4">Processo de Destilação</h2>
                <p className="text-white/80 leading-relaxed">
                  Nosso processo de destilação artesanal segue tradições escocesas centenárias,
                  utilizando alambiques de cobre cuidadosamente mantidos para preservar o caráter
                  único do nosso whisky. Cada lote é destilado lentamente, permitindo que apenas o
                  "coração" da destilação seja selecionado para o envelhecimento.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-amber-500 mb-4">Envelhecimento</h2>
                <p className="text-white/80 leading-relaxed">
                  Este {whisky.name} é envelhecido por {whisky.year} anos em barris selecionados
                  de carvalho americano e europeu, anteriormente utilizados para bourbon e sherry.
                  Nossos armazéns nas Highlands escocesas proporcionam condições ideais para o
                  desenvolvimento do perfil complexo e equilibrado deste whisky excepcional.
                </p>
              </div>

              <div className="border border-amber-500/20 bg-black/40 p-6 rounded-md backdrop-blur-sm">
                <h2 className="text-xl font-serif text-amber-500 mb-4">Recomendações do Mestre Destilador</h2>
                <p className="text-white/80 leading-relaxed">
                  Aprecie puro ou com algumas gotas de água para liberar todos os aromas.
                  Sirva em temperatura ambiente em um copo tulipa para concentrar os aromas
                  e permitir a completa apreciação do bouquet aromático.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
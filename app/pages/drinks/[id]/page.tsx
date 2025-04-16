"use client";

import React from 'react';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import drinksData from '../../../data/drinks.json';

// Interface para a tipagem dos drinks
interface Drink {
  id: string;
  name: string;
  baseWhisky: string;
  notes: string[];
  recipe: string[];
  toque: string;
  estilo: string;
  baseId: string;
  tipo: string;
  ocasiao: string;
  image: string;
}

// Dados dos drinks (mesmos da página principal)
const drinks: Drink[] = drinksData.drinks;

// Função para obter recomendações aleatórias
const getRandomRecommendations = (currentId: string, count: number = 3): Drink[] => {
  // Filtrar para remover o drink atual
  const otherDrinks = drinks.filter(drink => drink.id !== currentId);
  
  // Embaralhar o array
  const shuffled = [...otherDrinks].sort(() => 0.5 - Math.random());
  
  // Retornar os primeiros 'count' itens
  return shuffled.slice(0, count);
};

export default function DrinkDetail() {
  const router = useRouter();
  const [drink, setDrink] = useState<Drink | null>(null);
  const [recommendations, setRecommendations] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obter o ID da URL diretamente
    const path = window.location.pathname;
    const segments = path.split('/');
    const drinkId = segments[segments.length - 1];
    
    if (drinkId) {
      // Encontrar o drink pelo ID
      const foundDrink = drinks.find(d => d.id === drinkId);
      
      if (foundDrink) {
        setDrink(foundDrink);
        // Gerar recomendações aleatórias
        setRecommendations(getRandomRecommendations(drinkId));
      } else {
        // Redirecionar para página de drinks se não encontrar
        router.push('/pages/drinks');
      }
      
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-amber-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!drink) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section Redesenhada */}
      <div className="relative min-h-[85vh] bg-black">
        {/* Círculo decorativo */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-900/20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 py-12">
          {/* Espaço para posicionar elementos na parte superior */}
          <div className="h-24"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Informações do Drink - Lado Esquerdo */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Botão Voltar */}
                <div className="mb-6">
                  <Link href="/pages/drinks" className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Voltar para Drinks</span>
                  </Link>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-serif mb-6">{drink.name}</h1>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-amber-700/60 text-white px-4 py-1.5 rounded-full text-sm">{drink.tipo}</span>
                  <span className="bg-black/50 border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-sm">{drink.ocasiao}</span>
                </div>
                
                <p className="text-lg text-white/80 mb-8 max-w-lg">
                  {drink.estilo}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {drink.notes.map((note, index) => (
                    <span 
                      key={index} 
                      className="bg-black/40 border border-amber-800/30 px-4 py-1.5 rounded-full text-white/80"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/pages/produtos/${drink.baseId}`} 
                  className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
                >
                  Conheça o {drink.baseWhisky}
                </Link>
              </motion.div>
            </div>
            
            {/* Imagem do Drink - Lado Direito */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[600px]"
              >
                {/* Borda elegante com gradiente */}
                <div className="absolute inset-0 -m-[1.5%] bg-gradient-to-tr from-amber-900/40 via-amber-600/20 to-amber-800/30 rounded-lg blur-sm"></div>
                
                {/* Imagem do drink com borda */}
                <div className="relative z-10 p-[0.3%] bg-gradient-to-br from-amber-800/50 via-amber-700/30 to-amber-900/50 rounded-lg overflow-hidden">
                  <div className="bg-black rounded-lg overflow-hidden p-[0.8%]">
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      width={600}
                      height={800}
                      className="object-contain w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        {/* Seção de Receita */}
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-6">Receita</h2>
            <ul className="space-y-4 max-w-xl">
              {drink.recipe.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg">•</span>
                  <span className="text-white/90">{ingredient}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-4">Toque Especial</h2>
            <p className="text-white/90 italic max-w-2xl">{drink.toque}</p>
          </motion.div>
        </div>
        
        {/* Decoração */}
        <div className="my-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent"></div>
        </div>
      </div>
      
      {/* Recomendações */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-serif mb-10 text-center">Experimente Também</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <Link href={`/pages/drinks/${rec.id}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-serif text-white">{rec.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-amber-500 bg-black/60 px-3 py-1 rounded-full">{rec.tipo}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/pages/drinks"
            className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
          >
            Ver Todos os Drinks
          </Link>
        </div>
      </div>
    </div>
  );
}